
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"

import { endpoints, isSupportedNetwork } from "../../utils/layerzero";
import { EndpointV2__factory } from "../../typechain";

// todo fix me later
task("oapp:set-config", "layerzero bridge king")
    .addParam("dstNetwork", "destination network name")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    const kingAddress = (await hre.deployments.get("King")).address;
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    
    const networkName = hre.network.name;
    const destinationNetworkName: string = taskArguments.dstNetwork;
    
    if (!signer) throw new Error("missing signer");
    if (!isSupportedNetwork(networkName)) {
        throw new Error(`network ${hre.network.name} is not supported`);
    }
    if (!isSupportedNetwork(destinationNetworkName)) throw new Error(`destination network ${taskArguments.dstNetwork} is not supported`);
    
    const endpoint = endpoints[networkName];
    const destinationEndpoint = endpoints[destinationNetworkName];

    const { maxMessageSize, address } = destinationEndpoint.executor;
    const {
        confirmations,
        requiredDVNsCount,
        optionalDVNsCount,
        optionalDVNsThreshold,
        requiredDVNs,
        optionalDVNs,
    } = destinationEndpoint.securityStack;

    const endpointContract = EndpointV2__factory.connect(endpoint.address, signer);
    
    const abiCoder = new hre.ethers.AbiCoder();
    
    const executorConfig = abiCoder.encode(
        ['uint32', 'address'],
        [maxMessageSize, address],
    );
    const setConfigParamExecutor = {
        eid: destinationEndpoint.id,
        configType: 1, // todo replace with macro
        config: executorConfig,
    }
    
    const ulnConfig = abiCoder.encode(
        ['uint64', 'uint8', 'uint8', 'uint8', 'address[]', 'address[]'],
        [
            confirmations,
            requiredDVNsCount,
            optionalDVNsCount,
            optionalDVNsThreshold,
            requiredDVNs,
            optionalDVNs,
        ],
    );
        
    const setConfigParamSendUln = {
        eid: destinationEndpoint.id,
        configType: 2, // todo replace with macro
        config: ulnConfig,
    }

    console.log(`king address: ${kingAddress}`);
    console.log(`Endpoint address: ${endpoint.address}`);
    console.log(`Destination endpoint address: ${destinationEndpoint.address}`);
    console.log(`message library address: ${endpoint.messageLibrary.send}`);
    console.log(`Executor config: ${executorConfig}`);
    console.log(`ULN config: ${ulnConfig}`);
    
    const tx = await endpointContract.setConfig(
        kingAddress, endpoint.messageLibrary.send,
        [
            setConfigParamExecutor,
            setConfigParamSendUln,
        ]
    );

    await tx.wait();
    console.log("Successfully set config !");
});