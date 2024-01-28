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
    let multiSigWallet: HardhatEthersSigner;
    let merkleTree: MerkleTree;
    let ogMerkleTree: MerkleTree;
    let rootHash: string;
    let ogRootHash: string;

    const priceEth = ethers.parseEther("0.07");
    const wlPriceEth = ethers.parseEther("0.065");
    const ogPriceEth = ethers.parseEther("0.06");
    const amountOnSale = 4300n;
    const openSaleTimestamp = 1706468400n
    const whitelistSaleTimestamp = openSaleTimestamp - 7200n; // minus 2 hours
    const ogWhitelistSaleTimestamp = whitelistSaleTimestamp - 7200n; // minus 2 hours

    beforeEach(async () => {
        // i don't get why this is needed while using time.increaseTo ...
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

        const kingFactory: ContractFactory = await ethers.getContractFactory("King");
        king = <King>await kingFactory.deploy(
            rootHash,
            ogRootHash,
            multiSigWallet
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
                    await expect(king.connect(accounts[4]).purchaseOG(proof, { value: ogPriceEth - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });

                it("should revert if not oged", async () => {
                    // whitelisted but not oged
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseOG(proof, { value: ogPriceEth }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                    
                    // not whitelisted
                    const proof2 = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseOG(proof2, { value: ogPriceEth }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                });

                it("should accept if oged", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king.connect(accounts[4]).purchaseOG(proof, { value: ogPriceEth });
                    expect(await king.balanceOf(<string>accounts[4]?.address)).to.equal(1);
                });

                it("should send funds to fundsCollector", async () => {
                    const fundsCollector = await king.owner();
                    const balanceBefore = await ethers.provider.getBalance(fundsCollector);
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king.connect(accounts[4]).purchaseOG(proof, { value: ogPriceEth });
                    const balanceAfter = await ethers.provider.getBalance(fundsCollector);
                    expect(balanceAfter - balanceBefore).to.equal(ogPriceEth);
                });
            });
            describe("batch purchase", async () => {
                it("should revert if not enough funds", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await expect(king.connect(accounts[4]).purchaseBatchOG(2n, proof, { value: ogPriceEth * 2n - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });

                it("should revert if not oged", async () => {
                    // whitelisted but not oged
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseBatchOG(2n, proof, { value: ogPriceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                    
                    // not whitelisted
                    const proof2 = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseBatchOG(2n, proof2, { value: ogPriceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "OnlyOGWhitelist");
                });

                it("should accept if oged", async () => {
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king.connect(accounts[4]).purchaseBatchOG(2n, proof, { value: ogPriceEth * 2n });
                    expect(await king.balanceOf(<string>accounts[4]?.address)).to.equal(2);
                });

                it("should send funds to fundsCollector", async () => {
                    const fundsCollector = await king.owner();
                    const balanceBefore = await ethers.provider.getBalance(fundsCollector);
                    const proof = ogMerkleTree.getHexProof(ethers.keccak256(<string>accounts[4]?.address));
                    await king.connect(accounts[4]).purchaseBatchOG(2n, proof, { value: ogPriceEth * 2n });
                    const balanceAfter = await ethers.provider.getBalance(fundsCollector);
                    expect(balanceAfter - balanceBefore).to.equal(ogPriceEth * 2n);
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
                    await expect(king.connect(purchaser).purchaseWhitelist(proof, { value: wlPriceEth - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });
                it("should revert if not whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseWhitelist(proof, { value: wlPriceEth }))
                        .to.be.revertedWithCustomError(king, "OnlyWhitelist");
                });

                it("should accept if whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await king.connect(purchaser).purchaseWhitelist(proof, { value: wlPriceEth });
                    expect(await king.balanceOf(<string>purchaser?.address)).to.equal(1);
                });

                it("should send funds to fundsCollector", async () => {
                    const fundsCollector = await king.owner();
                    const balanceBefore = await ethers.provider.getBalance(fundsCollector);
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await king.connect(purchaser).purchaseWhitelist(proof, { value: wlPriceEth });
                    const balanceAfter = await ethers.provider.getBalance(fundsCollector);
                    expect(balanceAfter - balanceBefore).to.equal(wlPriceEth);
                });
            });
            describe("batch purchase", async () => {
                it("should revert if not enough funds", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await expect(king.connect(purchaser).purchaseBatchWhitelist(2n, proof, { value: wlPriceEth * 2n - 1n }))
                        .to.be.revertedWithCustomError(king, "InsufficientFunds");
                });
                it("should revert if not whitelisted", async () => {
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>accounts[6]?.address));
                    await expect(king.connect(accounts[6]).purchaseBatchWhitelist(2n, proof, { value: wlPriceEth * 2n }))
                        .to.be.revertedWithCustomError(king, "OnlyWhitelist");
                });

                it("should accept if whitelisted", async () => {
                    const senderAddress = <string>purchaser?.address;
                    const proof = merkleTree.getHexProof(ethers.keccak256(senderAddress));
                    await king.connect(purchaser).purchaseBatchWhitelist(2n, proof, { value: wlPriceEth * 2n });
                    expect(await king.balanceOf(senderAddress)).to.equal(2);
                });

                it("should send funds to fundsCollector", async () => {
                    const fundsCollector = await king.owner();
                    const balanceBefore = await ethers.provider.getBalance(fundsCollector);
                    const proof = merkleTree.getHexProof(ethers.keccak256(<string>purchaser?.address));
                    await king.connect(purchaser).purchaseBatchWhitelist(2n, proof, { value: wlPriceEth * 2n });
                    const balanceAfter = await ethers.provider.getBalance(fundsCollector);
                    expect(balanceAfter - balanceBefore).to.equal(wlPriceEth * 2n);
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

                it("should send funds to fundsCollector", async () => {
                    const fundsCollector = await king.owner();
                    const balanceBefore = await ethers.provider.getBalance(fundsCollector);
                    await king.connect(purchaser).purchase({ value: priceEth });
                    const balanceAfter = await ethers.provider.getBalance(fundsCollector);
                    expect(balanceAfter - balanceBefore).to.equal(priceEth);
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

                it("should send funds to fundsCollector", async () => {
                    const fundsCollector = await king.owner();
                    const balanceBefore = await ethers.provider.getBalance(fundsCollector);
                    await king.connect(purchaser).purchaseBatch(2n, { value: priceEth * 2n });
                    const balanceAfter = await ethers.provider.getBalance(fundsCollector);
                    expect(balanceAfter - balanceBefore).to.equal(priceEth * 2n);
                });
            });
        });

        describe("reserve", async () => {
            it("should mint 144 nfts to the oriviumMultiSig address from 4300 to 4444", async () => {
                const kingFactory: ContractFactory = await ethers.getContractFactory("King");
                const king: King = <King>await kingFactory.deploy(
                    rootHash,
                    ogRootHash,
                    multiSigWallet.address
                );
                expect(await king.balanceOf(multiSigWallet.address)).to.equal(144);
                expect(await king.ownerOf(4301)).to.equal(multiSigWallet.address);
                expect(await king.ownerOf(4444)).to.equal(multiSigWallet.address);
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

        describe("totalSupply", async () => {
            it("should return 144 after deploymen (reserved amoun)", async () => {
                expect(await king.totalSupply()).to.equal(144n);
            });
            it("should return amount of token minted", async () => {
                const purchasePromises: Promise<ContractTransactionResponse>[] = [];
                for (let i = 0n; i < 10n * 12n; i += 12n) {
                    purchasePromises.push(...[
                        king.connect(purchaser).purchaseBatch(4, { value: priceEth * 4n }),
                        king.connect(accounts[0]).purchaseBatch(4, { value: priceEth * 4n }),
                        king.connect(accounts[2]).purchaseBatch(4, { value: priceEth * 4n }),
                    ]);
                }
                await Promise.all(purchasePromises);
                expect(await king.totalSupply()).to.equal(144 + 120);
            });
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

        describe("ownership", async () => {
            it("should set owner to ORIVIUM_MULTI_SIG_WALLET", async () => {
                expect(await king.owner()).to.equal(accounts[0]?.address);
            });
        });
    });
});
