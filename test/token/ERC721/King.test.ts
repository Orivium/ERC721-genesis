import { expect } from 'chai';

import { time } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import {
    King,
} from "@orivium/types";
import MerkleTree from 'merkletreejs';
import type { ContractFactory, ContractTransactionResponse } from 'ethers';

describe('King ERC721', () => {
    let king: King;
    let accounts: HardhatEthersSigner[];
    let purchaser: HardhatEthersSigner;
    let merkleTree: MerkleTree;
    let ogMerkleTree: MerkleTree;
    let rootHash: string;
    let ogRootHash: string;

    const baseUri = "https://nft.orivium.io/nft/king/";
    const priceEth = ethers.parseEther("0.0001");
    const amountOnSale = 4000n;
    const totalSupply = 4444n;
    const openSaleTimestamp = 1706457600n
    const whitelistSaleTimestamp = openSaleTimestamp - 7200n; // minus 2hours
    const ogWhitelistSaleTimestamp = whitelistSaleTimestamp - 7200n; // minus 2hours

    beforeEach(async () => {
        // i don't get why this is needed while using time.increaseTo ...
        await ethers.provider.send("hardhat_reset");
        accounts = await ethers.getSigners();
        if (!accounts[1]) throw new Error("accounts[1] is undefined");
        purchaser = accounts[1];

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

        const kingFactory: ContractFactory = await ethers.getContractFactory("King");
        king = <King>await kingFactory.deploy(
            baseUri,
            rootHash,
            ogRootHash,
            priceEth
        );
    });

    describe("sale", async () => {
        describe("before sale opens", async () => {
            describe("single purchase", async () => {
                it("should revert open before sale opens", async () => {
                    await expect(king.connect(purchaser).purchase({ value: priceEth }))
                        .to.be.revertedWithCustomError(king, "SalePhaseNotStarted");
                });
                it("should revert whitelist before sale opens", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseWhitelist(proof, { value: priceEth }))
                        .to.be.revertedWithCustomError(king, "SalePhaseNotStarted");
                });
    
                it("should revert og before sale opens", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await expect(king.connect(accounts[4]).purchaseOG(proof, { value: priceEth }))
                        .to.be.revertedWithCustomError(king, "SalePhaseNotStarted");
                });
            });
            describe("batch purchase", async () => {
                it("should revert open before sale opens", async () => {
                    await expect(king.connect(purchaser).purchaseBatch(2n, { value: priceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "SalePhaseNotStarted");
                });
                it("should revert whitelist before sale opens", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseBatchWhitelist(2n, proof, { value: priceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "SalePhaseNotStarted");
                });
    
                it("should revert og before sale opens", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await expect(king.connect(accounts[4]).purchaseBatchOG(2n, proof, { value: priceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "SalePhaseNotStarted");
                });
            });
        });
        describe("og sale opens", async () => {
            beforeEach(async () => {
                await time.increaseTo(ogWhitelistSaleTimestamp);
            });
            describe("single purchase", async () => {
                it("should revert if not enough funds", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await expect(king.connect(accounts[4]).purchaseOG(proof, { value: priceEth - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });

                it("should revert if not oged", async () => {
                    // whitelisted but not oged
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseOG(proof, { value: priceEth }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                    
                    // not whitelisted
                    const proof2 = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseOG(proof2, { value: priceEth }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                });

                it("should accept if oged", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king.connect(accounts[4]).purchaseOG(proof, { value: priceEth });
                    expect(await king.balanceOf(<string>accounts[4]?.address)).to.equal(1);
                });
            });
            describe("batch purchase", async () => {
                it("should revert if not enough funds", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await expect(king.connect(accounts[4]).purchaseBatchOG(2n, proof, { value: priceEth * 2n - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });

                it("should revert if not oged", async () => {
                    // whitelisted but not oged
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseBatchOG(2n, proof, { value: priceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                    
                    // not whitelisted
                    const proof2 = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseBatchOG(2n, proof2, { value: priceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                });

                it("should accept if oged", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king.connect(accounts[4]).purchaseBatchOG(2n, proof, { value: priceEth * 2n });
                    expect(await king.balanceOf(<string>accounts[4]?.address)).to.equal(2);
                });
            });
        });
        describe("whitelist sale opens", async () => {
            beforeEach(async () => {
                await time.increaseTo(whitelistSaleTimestamp);
            });
            describe("single purchase", async () => {
                it("should revert if not enough funds", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseWhitelist(proof, { value: priceEth - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });
                it("should revert if not whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseWhitelist(proof, { value: priceEth }))
                        .to.be.revertedWithCustomError(king, "OnlyWhitelist");
                });

                it("should accept if whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await king.connect(purchaser).purchaseWhitelist(proof, { value: priceEth });
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(1);
                });
            });
            describe("batch purchase", async () => {
                it("should revert if not enough funds", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseBatchWhitelist(2n, proof, { value: priceEth * 2n - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });
                it("should revert if not whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseBatchWhitelist(2n, proof, { value: priceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "OnlyWhitelist");
                });

                it("should accept if whitelisted", async () => {
                    const senderAddress = <string>purchaser?.address;
                    const proof = merkleTree.getHexProof(ethers.keccak256(senderAddress));
                    await king.connect(purchaser).purchaseBatchWhitelist(2n, proof, { value: priceEth * 2n });
                    expect(await king.balanceOf(senderAddress)).to.equal(2);
                });
            });
        });

        describe("open sale opens", async () => {
            beforeEach(async () => {
                await time.increaseTo(openSaleTimestamp);
            });
            describe("single purchase", async () => {
                it("should revert if not enough funds", async () => {
                    await expect(king.connect(purchaser).purchase({ value: priceEth - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });

                it("should mint a king to the sender", async () => {
                    await king.connect(purchaser).purchase({ value: priceEth });
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(1);
                });

                it("should transfer funds to king contract address", async () => {
                    const balanceBefore = await ethers.provider.getBalance(king.target);
                    await king.connect(purchaser).purchase({ value: priceEth });
                    const balanceAfter = await ethers.provider.getBalance(king.target);
                    expect(balanceAfter - balanceBefore).to.equal(priceEth);
                });

                it("should emit a KingPurchased event", async () => {
                    await expect(king.connect(purchaser).purchase({ value: priceEth }))
                        .to.emit(king, "KingPurchased")
                        .withArgs(purchaser?.address, 1);
                });

                it("is possible to purchase several kings in a row", async () => {
                    await king.connect(purchaser).purchase({ value: priceEth });
                    await king.connect(purchaser).purchase({ value: priceEth });
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(2);
                });

                it("should revert if sold out", async () => {
                    const promises = [];
                    for (let i = 0n; i < amountOnSale; i += 1n) {
                        promises.push(king.connect(purchaser).purchase({ value: priceEth }));
                    }
                    await Promise.all(promises);
                    await expect(king.connect(purchaser).purchase({ value: priceEth }))
                        .to.be.revertedWithCustomError(king, "SoldOut");
                });
            });
            describe("batch purchase", async () => {
                it("should revert if not enough funds", async () => {
                    await expect(king.connect(purchaser).purchaseBatch(2n, { value: priceEth * 2n - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });

                it("should mint multiple kings to the sender", async () => {
                    await king.connect(purchaser).purchaseBatch(2n, { value: priceEth * 2n });
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(2);
                });

                it("should transfer funds to king contract address", async () => {
                    const balanceBefore = await ethers.provider.getBalance(king.target);
                    await king.connect(purchaser).purchaseBatch(2n, { value: priceEth * 2n });
                    const balanceAfter = await ethers.provider.getBalance(king.target);
                    expect(balanceAfter - balanceBefore).to.equal(priceEth * 2n);
                });

                it("should emit batchSize KingPurchased event", async () => {
                    await expect(king.connect(purchaser).purchaseBatch(2n, { value: priceEth * 2n }))
                        .to.emit(king, "KingPurchased")
                        .withArgs(purchaser?.address, 1)
                        .to.emit(king, "KingPurchased")
                        .withArgs(purchaser?.address, 2);
                });

                it("should revert if sold out", async () => {
                    const promises = [];
                    for (let i = 0n; i < amountOnSale - 1n; i += 20n) {
                        const amount = i + 20n > amountOnSale - 1n ? amountOnSale - 1n - i : 20n;
                        promises.push(king.connect(purchaser).purchaseBatch(amount, { value: priceEth * amount }));
                    }
                    await Promise.all(promises);
                    await expect(king.connect(purchaser).purchaseBatch(2n, { value: priceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "SoldOut");
                });
            });
        });

        describe("reserve", async () => {
            describe("single mint", async () => {
                it("should revert if not owner", async () => {
                    await expect(king.connect(purchaser).reserveMint(purchaser.address))
                        .to.be.revertedWithCustomError(king, "OwnableUnauthorizedAccount");
                });

                it("should mint a king to the recipient", async () => {
                    await king.reserveMint(purchaser.address);
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(1);
                });

                it("should emit a KingPurchased event", async () => {
                    await expect(king.reserveMint(purchaser.address))
                        .to.emit(king, "KingPurchased")
                        .withArgs(purchaser?.address, 4001);
                });

                it("is possible to mint several kings in a row", async () => {
                    await king.reserveMint(purchaser.address);
                    await king.reserveMint(purchaser.address);
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(2);
                });

                it("should revert when reaching total supply", async () => {
                    const promises = [];
                    for (let i = 4000n; i < totalSupply; i += 1n) {
                        promises.push(king.reserveMint(purchaser.address));
                    }
                    await Promise.all(promises);
                    await expect(king.reserveMint(purchaser.address))
                        .to.be.revertedWithCustomError(king, "SoldOut");
                });
            });

            describe("batch mint", async () => {
                it("should revert if not owner", async () => {
                    await expect(king.connect(purchaser).reserveMintBatch(purchaser.address, 2n))
                        .to.be.revertedWithCustomError(king, "OwnableUnauthorizedAccount");
                });

                it("should mint multiple kings to the recipient", async () => {
                    await king.reserveMintBatch(purchaser.address, 2n);
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(2);
                });

                it("should emit batchSize KingPurchased event", async () => {
                    await expect(king.reserveMintBatch(purchaser.address, 2n))
                        .to.emit(king, "KingPurchased")
                        .withArgs(purchaser?.address, 4001)
                        .to.emit(king, "KingPurchased")
                        .withArgs(purchaser?.address, 4002);
                });

                it("is possible to mint several kings in a row", async () => {
                    await king.reserveMintBatch(purchaser.address, 2n);
                    await king.reserveMintBatch(purchaser.address, 2n);
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(4);
                });

                it("should revert when reaching total supply", async () => {
                    const promises = [];
                    for (let i = 4000n; i < totalSupply - 1n; i += 20n) {
                        const amount = i + 20n > totalSupply - 1n ? totalSupply - 1n - i : 20n;
                        promises.push(king.reserveMintBatch(purchaser.address, amount));
                    }
                    await Promise.all(promises);
                    await expect(king.reserveMintBatch(purchaser.address, 2n))
                        .to.be.revertedWithCustomError(king, "SoldOut");
                });
            });
        });
    
        describe("withdraw", async () => {
            it("should revert if not owner", async () => {
                await expect(king.connect(purchaser).withdraw())
                    .to.be.revertedWithCustomError(king, "OwnableUnauthorizedAccount");
            });
    
            it("should transfer funds to owner", async () => {
                await time.increaseTo(openSaleTimestamp);
                await king.connect(purchaser).purchase({ value: priceEth });
                const ownerAddress = <string>accounts[0]?.address;
                const balanceBefore = await ethers.provider.getBalance(ownerAddress);
                const tx = await king.withdraw();
                const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
                if (!receipt) throw new Error("Fail to retrieve transaction receipt");
                const gasCost = receipt.gasUsed * receipt.gasPrice;
                const balanceAfter = await ethers.provider.getBalance(ownerAddress);
                expect(balanceAfter - balanceBefore).to.equal(priceEth - gasCost);
            });
        });
    });

    describe("implementation", async () => {
        beforeEach(async () => {
            await time.increaseTo(openSaleTimestamp);
        });
        it('has a name', async () => {
            expect(await king.name()).to.equal("King");
        });

        it('has a symbol', async () => {
            expect(await king.symbol()).to.equal("KING");
        });

        it("expose tokenURI once minted", async () => {
            await king.purchase({ value: priceEth });
            expect(await king.tokenURI(1)).to.equal("https://nft.orivium.io/nft/king/1");
        });

        describe("walletOfOwner", async () => {
            it("should return empty array if owner has no token", async () => {
                expect(await king.walletOfOwner(purchaser.address)).to.deep.equal([]);
            });

            it("should return array of token id owned by owner", async () => {
                const purchasePromises: Promise<ContractTransactionResponse>[] = [];
                const expectedTokenIds: bigint[] = [];
                for (let i = 0n; i < 10n * 12n; i += 12n) {
                    purchasePromises.push(...[
                        king.connect(purchaser).purchaseBatch(4, { value: priceEth * 4n }),
                        king.connect(accounts[0]).purchaseBatch(4, { value: priceEth * 4n }),
                        king.connect(accounts[2]).purchaseBatch(4, { value: priceEth * 4n }),
                    ]);
                    expectedTokenIds.push(...[i + 1n, i + 2n, i + 3n, i + 4n]);
                }
                await Promise.all(purchasePromises);
                expect(await king.walletOfOwner(purchaser.address)).to.deep.equal(expectedTokenIds);
            });
        });
    });
});
