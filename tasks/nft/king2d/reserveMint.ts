
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King2d,
    King2d__factory,
} from "../../../typechain"

task("king2d:reserve-mint", "reserve mint nft")
    .addOptionalParam("to", "address to mint to", "0")
    .addOptionalParam("batch", "batch size", "1")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const king2dAddress = (await hre.deployments.get("King2d")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) throw new Error("missing signer");

        const to = taskArguments.to === "0" ? signer.address : taskArguments.to;
        const king2d: King2d = King2d__factory.connect(king2dAddress, signer);
        if (taskArguments.batch === "1") {
            const res = await king2d.reserveMint(to);
            await res.wait();
        } else {
            const res = await king2d.reserveBatchMint(to, taskArguments.batch)
            await res.wait();
        }
        console.log(`Successfully reserve mint ${taskArguments.batch} king2d nft(s) to ${to}`);
});