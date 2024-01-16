
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:set-base-uri", "set nft metadata base uri")
    .addParam("uri", "base uri")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) throw new Error("missing signer");

        const king: King = King__factory.connect(kingAddress, signer);
        const baseURI = await king.baseTokenURI();
        const res = await king.setBaseURI(taskArguments.uri)
        await res.wait();
        console.log(`Successfully set base uri from ${baseURI} to ${taskArguments.uri}`);
});