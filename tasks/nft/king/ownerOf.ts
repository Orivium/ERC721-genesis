
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:owner-of", "retrieve owner of king nft")
    .addParam("tokenId", "token id of the nft")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) return;
        const king: King = King__factory.connect(kingAddress, signer);
        const ownerOf = await king.ownerOf(taskArguments.tokenId).catch(() => "NOT_MINTED");
        console.log("Owner of King NFT", taskArguments.tokenId, "is", ownerOf);
});