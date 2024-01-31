import { expect } from 'chai';
import fs from "fs"

import { time } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import {
    King2d,
} from "@orivium/types";
import MerkleTree from 'merkletreejs';
import type { ContractFactory, ContractTransactionResponse } from 'ethers';

describe('King2d ERC721', () => {
    let king2d: King2d;
    let accounts: HardhatEthersSigner[]
    let purchaser: HardhatEthersSigner;
    let multiSigWallet: HardhatEthersSigner;
    let merkleTree: MerkleTree;
    let ogMerkleTree: MerkleTree;
    let rootHash: string;
    let ogRootHash: string;

    const mintableSupply = 4300n;
    const openMintTimestamp = 1706868400n;
    const whitelistMintTimestamp = openMintTimestamp - 900n; // minus 2hours
    const ogWhitelistMintTimestamp = whitelistMintTimestamp - 900n; // minus 2hours
    const maxWalletAmount = 5n;

    beforeEach(async () => {
        await ethers.provider.send("hardhat_reset");
        accounts = await ethers.getSigners();
        if (!accounts[1]) throw new Error("accounts[1] is undefined");
        purchaser = accounts[1];

        if (!accounts[10]) throw new Error("accounts[10] is undefined");
        multiSigWallet = accounts[10];

        // create whitelist merkle tree
        const whitelist = accounts.slice(0, 6).map(account => account.address);
        const leafNodes = whitelist.map(address => ethers.keccak256(address));
        merkleTree = new MerkleTree(leafNodes, ethers.keccak256, { sortPairs: true });
        rootHash = merkleTree.getHexRoot();

        // create og merkle tree
        const ogWhitelist = accounts.slice(3, 6).map(account => account.address);
        const ogLeafNodes = ogWhitelist.map(address => ethers.keccak256(address));
        ogMerkleTree = new MerkleTree(ogLeafNodes, ethers.keccak256, { sortPairs: true });
        ogRootHash = ogMerkleTree.getHexRoot();

        const king2dFactory: ContractFactory = await ethers.getContractFactory("King2d");
        king2d = <King2d>await king2dFactory.deploy(
            rootHash,
            ogRootHash,
            openMintTimestamp,
            multiSigWallet,
        );
    });

    describe("mint", async () => {
        describe("before mint opens", async () => {
            beforeEach(async () => {
                await time.increaseTo(ogWhitelistMintTimestamp - 300n);
            });
            describe("single free mint", async () => {
                it("should revert open before mint opens", async () => {
                    await expect(king2d.connect(purchaser).freeMint())
                        .to.be.revertedWithCustomError(king2d, "MintPhaseNotStarted");
                });
                it("should revert whitelist before mint opens", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king2d.connect(purchaser).freeMintWhitelist(proof))
                        .to.be.revertedWithCustomError(king2d, "MintPhaseNotStarted");
                });
    
                it("should revert og before mint opens", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await expect(king2d.connect(accounts[4]).freeMintOG(proof))
                        .to.be.revertedWithCustomError(king2d, "MintPhaseNotStarted");
                });
            });
        });
        describe("og mint opens", async () => {
            beforeEach(async () => {
                await time.increaseTo(ogWhitelistMintTimestamp);
            });
            describe("single free mint", async () => {
                it("should revert if not oged", async () => {
                    // whitelisted but not oged
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king2d.connect(purchaser).freeMintOG(proof))
                        .to.be.revertedWithCustomError(king2d, "OnlyOGWhitelist");
                    
                    // not whitelisted
                    const proof2 = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king2d.connect(accounts[6]).freeMintOG(proof2, ))
                        .to.be.revertedWithCustomError(king2d, "OnlyOGWhitelist");
                });

                it("should accept if oged", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king2d.connect(accounts[4]).freeMintOG(proof);
                    expect(await king2d.balanceOf(<string>accounts[4]?.address)).to.equal(1);
                });

                it("can mint a single king2d", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king2d.connect(accounts[4]).freeMintOG(proof);
                    await expect(king2d.connect(accounts[4]).freeMintOG(proof))
                        .to.be.revertedWithCustomError(king2d, "MaxWLAmountMinted");
                });
            });
        });
        describe("whitelist mint opens", async () => {
            beforeEach(async () => {
                await time.increaseTo(whitelistMintTimestamp);
            });
            describe("single free mint", async () => {
                it("should revert if not whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king2d.connect(accounts[6]).freeMintWhitelist(proof))
                        .to.be.revertedWithCustomError(king2d, "OnlyWhitelist");
                });

                it("should accept if whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await king2d.connect(purchaser).freeMintWhitelist(proof);
                    expect(await king2d.balanceOf(<string>purchaser?.address)).to.equal(1);
                });

                it("can mint a single king2d", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await king2d.connect(purchaser).freeMintWhitelist(proof);
                    await expect(king2d.connect(purchaser).freeMintWhitelist(proof))
                        .to.be.revertedWithCustomError(king2d, "MaxWLAmountMinted");
                });
            });
        });

        describe("open mint opens", async () => {
            beforeEach(async () => {
                await time.increaseTo(openMintTimestamp);
            });
            describe("single free mint", async () => {
                it("should mint a king2d to the sender", async () => {
                    await king2d.connect(purchaser).freeMint();
                    expect(await king2d.balanceOf(<string>purchaser?.address)).to.equal(1);
                });

                it("should emit a King2dMinted event", async () => {
                    await expect(king2d.connect(purchaser).freeMint())
                        .to.emit(king2d, "King2dMinted")
                        .withArgs(purchaser?.address, 1);
                });

                it("it can mint a maximum of 5 king2d", async () => {
                    await Promise.all([
                        king2d.connect(purchaser).freeMint(),
                        king2d.connect(purchaser).freeMint(),
                        king2d.connect(purchaser).freeMint(),
                        king2d.connect(purchaser).freeMint(),
                        king2d.connect(purchaser).freeMint(),
                    ]);
                    await expect(king2d.connect(purchaser).freeMint())
                        .to.be.revertedWithCustomError(king2d, "MaxAmountMinted");
                });

                // skip, it does not work as expected
                it.skip("should revert if sold out", async () => {
                    const promises = [];
                    for (let i = 0n; i < mintableSupply; i += 1n) {
                        const newPk = ethers.Wallet.createRandom().privateKey;
                        const newSigner = await ethers.getSigner(newPk);
                        promises.push(king2d.connect(newSigner).freeMint());
                    }
                    await Promise.all(promises);
                    await expect(king2d.connect(purchaser).freeMint())
                        .to.be.revertedWithCustomError(king2d, "SoldOut");
                });
            });
            describe("batch free mint", async () => {
                it("should mint multiple king2ds to the sender", async () => {
                    await king2d.connect(purchaser).freeBatchMint(2n);
                    expect(await king2d.balanceOf(<string>purchaser?.address)).to.equal(2);
                });

                it("should emit batchSize King2dMinted event", async () => {
                    await expect(king2d.connect(purchaser).freeBatchMint(2n))
                        .to.emit(king2d, "King2dMinted")
                        .withArgs(purchaser?.address, 1)
                        .to.emit(king2d, "King2dMinted")
                        .withArgs(purchaser?.address, 2);
                });

                it("can mint a maximum of 5 king2d", async () => {
                    await king2d.connect(purchaser).freeBatchMint(5n);
                    await expect(king2d.connect(purchaser).freeBatchMint(1n))
                        .to.be.revertedWithCustomError(king2d, "MaxAmountMinted");
                });

                // skip, this test is not working as expected
                it.skip("should revert if sold out", async () => {
                    const fakeMaxAmount     = "0000000000000000000000000000000000000000000000000000000000000003"; // 3
                    const toReplaceConstant = "00000000000000000000000000000000000000000000000000000000000003e8"; // 1000
                    console.log(fakeMaxAmount);
                    const contractJson = fs.readFileSync(
                        `${__dirname}/../../../build/artifacts/contracts/token/ERC721/King2d_Implementation.sol/King2d_Implementation.json`
                    );
                    await ethers.provider.send("hardhat_setCode", [
                        king2d.target,
                        JSON.parse(contractJson.toString()).deployedBytecode.replaceAll(
                            toReplaceConstant,
                            fakeMaxAmount
                        ),
                    ]);
                    await king2d.connect(purchaser).freeBatchMint(2n);
                    await expect(king2d.connect(purchaser).freeBatchMint(2n))
                        .to.be.revertedWithCustomError(king2d, "SoldOut");
                });
            });
        });

    });
    describe("deployment", async () => {
        it("should mint 144 nfts to the oriviumMultiSig address from 4300 to 4444", async () => {
            const kingFactory: ContractFactory = await ethers.getContractFactory("King2d");
            const king: King2d = <King2d>await kingFactory.deploy(
                rootHash,
                ogRootHash,
                openMintTimestamp,
                multiSigWallet,
            );
            expect(await king.balanceOf(multiSigWallet.address)).to.equal(144);
            expect(await king.ownerOf(4301)).to.equal(multiSigWallet.address);
            expect(await king.ownerOf(4444)).to.equal(multiSigWallet.address);
        });

        it("should revert if multiSig address is zero address", async () => {
            const kingFactory: ContractFactory = await ethers.getContractFactory("King2d");
            await expect(kingFactory.deploy(
                rootHash,
                ogRootHash,
                openMintTimestamp,
                ethers.ZeroAddress,
            )).to.be.revertedWithCustomError(kingFactory, "MultiSigIsZeroAddress");
        });
    });

    describe("implementation", async () => {
        beforeEach(async () => {
            await time.increaseTo(openMintTimestamp);
        });
        it('has a name', async () => {
            expect(await king2d.name()).to.equal("King2d");
        });

        it('has a symbol', async () => {
            expect(await king2d.symbol()).to.equal("KING2D");
        });

        it("expose tokenURI once minted", async () => {
            await king2d.freeMint();
            expect(await king2d.tokenURI(1)).to.equal("https://nft.orivium.io/nft/king2d/1");
        });

        describe("walletOfOwner", async () => {
            it("should return empty array if owner has no token", async () => {
                expect(await king2d.walletOfOwner(purchaser.address)).to.deep.equal([]);
            });

            it("should return array of token id owned by owner", async () => {
                const purchasePromises: Promise<ContractTransactionResponse>[] = [];
                const expectedTokenIds: bigint[] = [];
                for (let i = 0n; i < 5n * 3n; i += 3n) {
                    purchasePromises.push(...[
                        king2d.connect(purchaser).freeMint(),
                        king2d.connect(accounts[0]).freeMint(),
                        king2d.connect(accounts[2]).freeMint(),
                    ]);
                    expectedTokenIds.push(i + 1n);
                }
                await Promise.all(purchasePromises);
                expect(await king2d.walletOfOwner(purchaser.address)).to.deep.equal(expectedTokenIds);
            });
        });

        describe("walletMintable", async () => {
            it("should return amount of mintable token for given wallet", async () => {
                let mintedAmount = 0n;
                while (mintedAmount < maxWalletAmount) {
                    expect(await king2d.walletMintable(purchaser.address)).to.equal(maxWalletAmount - mintedAmount);
                    await king2d.connect(purchaser).freeMint();
                    mintedAmount += 1n;
                }
                expect(await king2d.walletMintable(purchaser.address)).to.equal(0n);
            });
        });
    });
});
