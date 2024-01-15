
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:purchase", "buy king nft")
    .setAction(async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];

        const king: King = King__factory.connect(kingAddress, signer);
        const res = await king.purchase(
            { value: await king.PRICE() }
        );
        await res.wait();
        console.log(`king nft bought`);
});