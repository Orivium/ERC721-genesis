
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import {
    King,
    King__factory,
} from "../../../typechain"

task("king:lzbridge", "layerzero bridge king")
    .addParam("tokenId", "token id of the nft")
    .addParam("dstEid", "destination endpoint id")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const kingAddress = (await hre.deployments.get("King")).address;
        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];
        if (!signer) return;
        const king: King = King__factory.connect(kingAddress, signer);
        const coder = new hre.ethers.AbiCoder();
        const payload = coder.encode(['address', 'uint256'], [signer.address, BigInt(taskArguments.tokenId)]);
        const options = "0x0003010011010000000000000000000000000007a120";
        console.log(`payload: ${payload}`,
        taskArguments.dstEid,
        payload,
        options,
        false,);
        const _messagingFee = await king.quote(
            taskArguments.dstEid,
            payload,
            options,
            false,
        ).catch((e) => {
            console.log(e);
            throw e;
        });

        const messagingFee = {
            nativeFee: _messagingFee.nativeFee,
            lzTokenFee: _messagingFee.lzTokenFee,
        };

        console.log(`messaging fee: ${messagingFee}`);
        king.endpoint()
        const tx = await king.bridge(
            taskArguments.tokenId,
            taskArguments.dstEid,
            options,
            messagingFee,
            { value: messagingFee.nativeFee }
        );
        await tx.wait();

        console.log(`Successfully bridged king nft with tokenId ${taskArguments.tokenId} to ${signer.address}`);
});