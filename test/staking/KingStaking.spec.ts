import { expect } from 'chai';

// import { time } from "@nomicfoundation/hardhat-network-helpers";
// import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers, deployments } from 'hardhat';
import {
    Testable_King, Testable_King2d, KingStaking,
} from "@orivium/types";
import { ContractFactory } from 'ethers';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('KingStaking', () => {
    let king: Testable_King;
    let staker: HardhatEthersSigner;
    let king2d: Testable_King2d;
    let kingStaking: KingStaking;

    beforeEach(async () => {
        await deployments.fixture(['test']);

        const accounts = await ethers.getSigners();
        if (!accounts[3]) throw new Error("missing staker");

        staker = accounts[3];
        king = await ethers.getContract('Testable_King');
        king2d = await ethers.getContract('Testable_King2d');

        const kingFactory: ContractFactory = await ethers.getContractFactory("KingStaking");
        kingStaking = <KingStaking>await kingFactory.deploy(
            king.target,
            king2d.target
        );
    });

    describe("King Staking", () => {
        it("expose king address", async () => {
            expect(await kingStaking.king()).to.equal(king.target);
        });

        it("can receive king", async () => {
            await king.mint(staker.address, 1);
            await king.connect(staker).transferFrom(staker.address, kingStaking.target, 1);
            expect(await king.balanceOf(kingStaking.target)).to.equal(1);
        })
    });

    describe("King2d Staking", () => {
        it("expose king2d address", async () => {
            expect(await kingStaking.king2d()).to.equal(king2d.target);
        });

        it("can receive king2d", async () => {
            await king2d.mint(staker.address, 1);
            await king2d.connect(staker).transferFrom(staker.address, kingStaking.target, 1);
            expect(await king2d.balanceOf(kingStaking.target)).to.equal(1);
        });
    });
});