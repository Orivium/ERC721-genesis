
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:purchase", "buy king nft")
    .addOptionalParam("batch", "batch size", "1")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) throw new Error("missing signer");

        const king: King = King__factory.connect(kingAddress, signer);
        if (taskArguments.batch === "1") {
            const res = await king.purchase(
                { value: await king.PRICE() }
            );
            await res.wait();
        } else {
            const res = await king.purchaseBatch(
                taskArguments.batch,
                { value: await king.PRICE() * BigInt(taskArguments.batch) }
            );
            await res.wait();
        }
        console.log(`Successfully purchased ${taskArguments.batch} king nft(s) by ${signer.address}`);
});