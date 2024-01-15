
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"

const king__getOappConfig = async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    const kingAddress = (await hre.deployments.get("King")).address;
    await hre.run("oapp:get-config", {
        oappAddress: kingAddress,
        dstNetwork: taskArguments.dstNetwork,
    });
};

task("king:get-oapp-config", "layerzero bridge king")
    .addParam("dstNetwork", "destination network name")
    .setAction(king__getOappConfig);
