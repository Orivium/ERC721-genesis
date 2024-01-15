
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:set-peer", "layerzero bridge king")
    .addParam("dstEid", "destination endpoint id")
    .addParam("peerAddress", "destination contract address")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) return;
        const king: King = King__factory.connect(kingAddress, signer);
        // convert peer address to bytes32
        const peerAddressBytes32 = hre.ethers.zeroPadValue(taskArguments.peerAddress, 32);
        console.log(`peerAddressBytes32: ${peerAddressBytes32}`);
        await king.setPeer(taskArguments.dstEid, peerAddressBytes32);
        console.log(`
Successfully set peer:
    destination endpoint id: ${taskArguments.dstEid}
    peer contract address: ${taskArguments.peerAddress}`
        );
});