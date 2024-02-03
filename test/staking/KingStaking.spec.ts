import { expect } from "chai";

// import { time } from "@nomicfoundation/hardhat-network-helpers";
// import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers, deployments } from "hardhat";
import { Testable_King, Testable_King2d, KingStaking } from "@orivium/types";
import { ContractFactory } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("KingStaking", () => {
  let king: Testable_King;
  let staker: HardhatEthersSigner;
  let king2d: Testable_King2d;
  let kingStaking: KingStaking;

  // contract hyper parameters
  const MINIMUM_LOCK_TIME = 60n * 60n * 24n * 7n; // 7 days

  beforeEach(async () => {
    await deployments.fixture(["test"]);

    const accounts: HardhatEthersSigner[] = await ethers.getSigners();
    if (!accounts[3]) throw new Error("missing staker");

    [, , , staker] = accounts;
    king = await ethers.getContract("Testable_King");
    king2d = await ethers.getContract("Testable_King2d");

    const kingFactory: ContractFactory =
      await ethers.getContractFactory("KingStaking");
    kingStaking = <KingStaking>(
      await kingFactory.deploy(king.target, king2d.target)
    );
  });

  describe("King Staking", async () => {
    it("expose king address", async () => {
      expect(await kingStaking.king()).to.equal(king.target);
    });

    describe("Stake", async () => {
      beforeEach(async () => {
        await king.mint(staker.address, 1);
      });

      it("reverts with InvalidDataLength when no data not provided", async () => {
        await expect(
          king
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256)"
            ](staker.address, kingStaking.target, 1)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidDataLength");
      });

      it("reverts with InvalidDataLength when data is lower than 32 bytes", async () => {
        const bytes31data =
          "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd";
        await expect(
          king
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, bytes31data)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidDataLength");
      });

      it("reverts with InvalidDataLength when data is higher than 32 bytes", async () => {
        const bytes33data =
          "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef00";
        await expect(
          king
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, bytes33data)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidDataLength");
      });

      it("reverts if minimum lock time is lower than MINIMUM_LOCK_TIME", async () => {
        const lockTime = MINIMUM_LOCK_TIME - 1n;
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [lockTime]);
        await expect(
          king
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, data)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidMinimumLockTime");
      });

      it("store the stacking infos", async () => {
        const lockTime = MINIMUM_LOCK_TIME;
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [lockTime]);
        await king
          .connect(staker)
          [
            "safeTransferFrom(address,address,uint256,bytes)"
          ](staker.address, kingStaking.target, 1, data);
        expect(
          await kingStaking.stakingInfos(staker.address, king.target, 1)
        ).to.equal(lockTime);
      });
      it("emits a Staked event", async () => {
        const lockTime = MINIMUM_LOCK_TIME;
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [lockTime]);
        await expect(
          king
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, data)
        )
          .to.emit(kingStaking, "Staked")
          .withArgs(staker.address, king.target, 1, lockTime);
      });
    });

    describe("Unstake", async () => {
      beforeEach(async () => {
        await king.mint(staker.address, 1);
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [MINIMUM_LOCK_TIME]);
        await king
          .connect(staker)
          [
            "safeTransferFrom(address,address,uint256,bytes)"
          ](staker.address, kingStaking.target, 1, data);
      });

      it("reverts if not called by the staker", async () => {
        await expect(
          kingStaking.unstake(king.target, 1)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidOperator");
      });

      it("delete stacking infos", async () => {
        await kingStaking.connect(staker).unstake(king.target, 1);
        expect(
          await kingStaking.stakingInfos(staker.address, king.target, 1)
        ).to.equal(0);
      });

      it("emits an Unstaked event", async () => {
        await expect(kingStaking.connect(staker).unstake(king.target, 1))
          .to.emit(kingStaking, "Unstaked")
          .withArgs(staker.address, king.target, 1);
      });

      it("send the token back to the staker", async () => {
        await kingStaking.connect(staker).unstake(king.target, 1);
        expect(await king.ownerOf(1)).to.equal(staker.address);
      });
    });
  });

  describe("King2d Staking", () => {
    it("expose king2d address", async () => {
      expect(await kingStaking.king2d()).to.equal(king2d.target);
    });

    describe("Stake", () => {
      beforeEach(async () => {
        await king2d.mint(staker.address, 1);
      });

      it("reverts with InvalidDataLength when no data not provided", async () => {
        await expect(
          king2d
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256)"
            ](staker.address, kingStaking.target, 1)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidDataLength");
      });

      it("reverts with InvalidDataLength when data is lower than 32 bytes", async () => {
        const bytes31data =
          "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd";
        await expect(
          king2d
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, bytes31data)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidDataLength");
      });

      it("reverts with InvalidDataLength when data is higher than 32 bytes", async () => {
        const bytes33data =
          "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef00";
        await expect(
          king2d
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, bytes33data)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidDataLength");
      });

      it("reverts if minimum lock time is lower than MINIMUM_LOCK_TIME", async () => {
        const lockTime = MINIMUM_LOCK_TIME - 1n;
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [lockTime]);
        await expect(
          king2d
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, data)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidMinimumLockTime");
      });

      it("store the stacking infos", async () => {
        const lockTime = MINIMUM_LOCK_TIME;
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [lockTime]);
        await king2d
          .connect(staker)
          [
            "safeTransferFrom(address,address,uint256,bytes)"
          ](staker.address, kingStaking.target, 1, data);
        expect(
          await kingStaking.stakingInfos(staker.address, king2d.target, 1)
        ).to.equal(lockTime);
      });
      it("emits a Staked event", async () => {
        const lockTime = MINIMUM_LOCK_TIME;
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [lockTime]);
        await expect(
          king2d
            .connect(staker)
            [
              "safeTransferFrom(address,address,uint256,bytes)"
            ](staker.address, kingStaking.target, 1, data)
        )
          .to.emit(kingStaking, "Staked")
          .withArgs(staker.address, king2d.target, 1, lockTime);
      });
    });

    describe("Unstake", () => {
      beforeEach(async () => {
        await king2d.mint(staker.address, 1);
        const coder = new ethers.AbiCoder();
        const data = coder.encode(["uint256"], [MINIMUM_LOCK_TIME]);
        await king2d
          .connect(staker)
          [
            "safeTransferFrom(address,address,uint256,bytes)"
          ](staker.address, kingStaking.target, 1, data);
      });

      it("reverts if not called by the staker", async () => {
        await expect(
          kingStaking.unstake(king2d.target, 1)
        ).to.be.revertedWithCustomError(kingStaking, "InvalidOperator");
      });

      it("delete stacking infos", async () => {
        await kingStaking.connect(staker).unstake(king2d.target, 1);
        expect(
          await kingStaking.stakingInfos(staker.address, king2d.target, 1)
        ).to.equal(0);
      });

      it("emits an Unstaked event", async () => {
        await expect(kingStaking.connect(staker).unstake(king2d.target, 1))
          .to.emit(kingStaking, "Unstaked")
          .withArgs(staker.address, king2d.target, 1);
      });

      it("send the token back to the staker", async () => {
        await kingStaking.connect(staker).unstake(king2d.target, 1);
        expect(await king2d.ownerOf(1)).to.equal(staker.address);
      });
    });
  });

  describe("onERC721Received", () => {
    it("cannot be called directly", async () => {
      await expect(
        kingStaking.onERC721Received(staker.address, staker.address, 1, "0x")
      ).to.be.revertedWithCustomError(kingStaking, "InvalidOperator");
    });
  });
});
