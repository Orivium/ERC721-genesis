
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King2d,
    King2d__factory,
} from "../../../typechain"

task("king2d:owner-of", "retrieve owner of king2d nft")
    .addParam("tokenId", "token id of the nft")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const king2dAddress = (await hre.deployments.get("King2d")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) return;
        const king2d: King2d = King2d__factory.connect(king2dAddress, signer);
        const ownerOf = await king2d.ownerOf(taskArguments.tokenId);
        console.log("Owner of King2d NFT", taskArguments.tokenId, "is", ownerOf);
});