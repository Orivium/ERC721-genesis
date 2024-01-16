
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:withdraw", "withdraw funds from king contract")
    .setAction(async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) throw new Error("Signer not found");
        const balance = await signer.provider.getBalance(signer.address);
        const king: King = King__factory.connect(kingAddress, signer);
        const res = await king.withdraw();
        await res.wait();
        const newBalance = await signer.provider.getBalance(signer.address);
        const ethDiff = hre.ethers.formatEther(newBalance - balance);
        console.log(`Successfully withdrawn ${ethDiff} ETH`);
});