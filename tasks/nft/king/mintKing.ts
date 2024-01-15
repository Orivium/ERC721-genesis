
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:mint", "mint king nft")
    .addParam("tokenId", "token id of the nft")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) return;
        const king: King = King__factory.connect(kingAddress, signer);
        await king.mint(signer.address, taskArguments.tokenId);
        console.log(`Successfully minted king nft with tokenId ${taskArguments.tokenId} to ${signer.address}`);
});