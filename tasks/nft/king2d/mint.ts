import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King2d,
    King2d__factory,
} from "../../../typechain"

task("king2d:mint", "mint king2d nft")
    .addParam("tokenId", "token id of the nft")
    .addParam("address", "address to mint to")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const king2dAddress = (await hre.deployments.get("King2d")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) return;
        const king2d: King2d = King2d__factory.connect(king2dAddress, signer);
        console.log("Mint King2d NFT", taskArguments.tokenId, "minted to", signer.address);
        await king2d.mint(signer.address, taskArguments.tokenId);
});