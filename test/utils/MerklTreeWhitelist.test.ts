import { expect } from "chai";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { ContractFactory } from "ethers";

import { Testable_MerkleTreeWhitelist } from "@orivium/types";

describe("MerkleTreeWhitelist", () => {
  let merkleTreeWhitelist: Testable_MerkleTreeWhitelist;
  let merkleTree: MerkleTree;
  let ogMerkleTree: MerkleTree;

  const whitelisted: string[] = [];
  const ogWhitelisted: string[] = [];
  const notWhitelisted: string[] = [];

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    const addresses = accounts.map((account) => account.address);
    if (!addresses[0]) return;

    const l3 = Math.floor(addresses.length / 3);
    // ogWhitelisted addresses are also whitelisted
    ogWhitelisted.push(...addresses.slice(0, l3 * 2));
    whitelisted.push(...addresses.slice(l3, l3 * 2));
    notWhitelisted.push(...addresses.slice(l3 * 2));

    const leafNodes = whitelisted.map((address) => ethers.keccak256(address));
    merkleTree = new MerkleTree(leafNodes, ethers.keccak256, {
      sortPairs: true,
    });
    const rootHash = merkleTree.getHexRoot();

    const ogLeafNode = ogWhitelisted.map((address) =>
      ethers.keccak256(address)
    );
    ogMerkleTree = new MerkleTree(ogLeafNode, ethers.keccak256, {
      sortPairs: true,
    });
    const ogRootHash = ogMerkleTree.getHexRoot();

    const merkleTreeWhitelistFactory: ContractFactory =
      await ethers.getContractFactory("Testable_MerkleTreeWhitelist");
    merkleTreeWhitelist = <Testable_MerkleTreeWhitelist>(
      await merkleTreeWhitelistFactory.deploy(rootHash, ogRootHash)
    );
  });

  it("cannot be deployed with same root hash for og and whitelist", async () => {
    const leafNodes = whitelisted.map((address) => ethers.keccak256(address));
    merkleTree = new MerkleTree(leafNodes, ethers.keccak256, {
      sortPairs: true,
    });
    const rootHash = merkleTree.getHexRoot();

    const ogLeafNode = ogWhitelisted.map((address) =>
      ethers.keccak256(address)
    );
    ogMerkleTree = new MerkleTree(ogLeafNode, ethers.keccak256, {
      sortPairs: true,
    });
    const ogRootHash = ogMerkleTree.getHexRoot();

    const merkleTreeWhitelistFactory: ContractFactory =
      await ethers.getContractFactory("Testable_MerkleTreeWhitelist");
    await expect(
      merkleTreeWhitelistFactory.deploy(rootHash, rootHash)
    ).to.be.revertedWithCustomError(
      merkleTreeWhitelistFactory,
      "NotUniqueRootHash"
    );
    await expect(
      merkleTreeWhitelistFactory.deploy(ogRootHash, ogRootHash)
    ).to.be.revertedWithCustomError(
      merkleTreeWhitelistFactory,
      "NotUniqueRootHash"
    );
  });

  it("every address in the whitelist should be whitelisted", async () => {
    whitelisted.forEach(async (address) => {
      const proof = merkleTree.getHexProof(ethers.keccak256(address));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(await merkleTreeWhitelist.test_isWhitelisted(address, proof)).to.be
        .true;
    });
  });

  it("every address in the og whitelist should be whitelisted", async () => {
    ogWhitelisted.forEach(async (address) => {
      const proof = ogMerkleTree.getHexProof(ethers.keccak256(address));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(await merkleTreeWhitelist.test_isOGWhitelisted(address, proof)).to
        .be.true;
    });
  });

  it("every address not in the whitelist should not be whitelisted", async () => {
    const fakeProof = [
      "0x1234567890123456789012345678901234567890123456789012345678901234",
      "0x1234567890123456789012345678901234567890123456789012345678901234",
      "0x1234567890123456789012345678901234567890123456789012345678901234",
    ];
    notWhitelisted.forEach(async (address) => {
      const [isWhitelist, isOGWhitelist] = await Promise.all([
        merkleTreeWhitelist.test_isWhitelisted(address, fakeProof),
        merkleTreeWhitelist.test_isOGWhitelisted(address, fakeProof),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(isWhitelist).to.be.false;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(isOGWhitelist).to.be.false;
    });
  });

  describe("modifiers", () => {
    describe("onlyOG", () => {
      it("should revert if the caller is not og whitelisted", async () => {
        if (!notWhitelisted[0])
          throw new Error("notWhitelisted[0] is undefined");
        if (!whitelisted[0]) throw new Error("whitelisted[0] is undefined");
        const wlProof = merkleTree.getHexProof(
          ethers.keccak256(whitelisted[0])
        );
        const proof = ogMerkleTree.getHexProof(
          ethers.keccak256(notWhitelisted[0])
        );
        await expect(
          merkleTreeWhitelist
            .connect(await ethers.getSigner(notWhitelisted[0]))
            .test_OGReserved(proof)
        ).to.be.revertedWithCustomError(merkleTreeWhitelist, "OnlyOGWhitelist");
        await expect(
          merkleTreeWhitelist
            .connect(await ethers.getSigner(whitelisted[0]))
            .test_OGReserved(wlProof)
        ).to.be.revertedWithCustomError(merkleTreeWhitelist, "OnlyOGWhitelist");
      });

      it("should not revert if the caller is og whitelisted", async () => {
        if (!ogWhitelisted[0]) throw new Error("ogWhitelisted[0] is undefined");
        const proof = ogMerkleTree.getHexProof(
          ethers.keccak256(ogWhitelisted[0])
        );
        await expect(
          merkleTreeWhitelist
            .connect(await ethers.getSigner(ogWhitelisted[0]))
            .test_OGReserved(proof)
        ).to.not.be.reverted;
      });
    });

    describe("onlyWhitelisted", () => {
      it("should revert if the caller is not whitelisted", async () => {
        if (!notWhitelisted[0])
          throw new Error("notWhitelisted[0] is undefined");
        if (!ogWhitelisted[0]) throw new Error("ogWhitelisted[0] is undefined");
        const proof = ogMerkleTree.getHexProof(
          ethers.keccak256(notWhitelisted[0])
        );
        const ogProof = ogMerkleTree.getHexProof(
          ethers.keccak256(ogWhitelisted[0])
        );
        await expect(
          merkleTreeWhitelist
            .connect(await ethers.getSigner(notWhitelisted[0]))
            .test_WLReserved(proof)
        ).to.be.revertedWithCustomError(merkleTreeWhitelist, "OnlyWhitelist");
        await expect(
          merkleTreeWhitelist
            .connect(await ethers.getSigner(ogWhitelisted[0]))
            .test_WLReserved(ogProof)
        ).to.be.revertedWithCustomError(merkleTreeWhitelist, "OnlyWhitelist");
      });

      it("should not revert if the caller is whitelisted", async () => {
        if (!whitelisted[0]) throw new Error("whitelisted[0] is undefined");
        const proof = merkleTree.getHexProof(ethers.keccak256(whitelisted[0]));
        await expect(
          merkleTreeWhitelist
            .connect(await ethers.getSigner(whitelisted[0]))
            .test_WLReserved(proof)
        ).to.not.be.reverted;
      });
    });
  });
});
