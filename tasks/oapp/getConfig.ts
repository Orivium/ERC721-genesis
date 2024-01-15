
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"

import { endpoints, isSupportedNetwork } from "../../utils/layerzero";
import { EndpointV2__factory } from "../../typechain";

task("oapp:get-config", "layerzero bridge king")
    .addParam("oappAddress", "oapp contract address")
    .addParam("dstNetwork", "destination network name")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {

    const oappAddress = taskArguments.oappAddress;
    const networkName = hre.network.name;
    const destinationNetworkName: string = taskArguments.dstNetwork;

    if (!isSupportedNetwork(networkName)) {
        throw new Error(`network ${hre.network.name} is not supported`);
    }
    if (!isSupportedNetwork(destinationNetworkName)) throw new Error(`destination network ${taskArguments.dstNetwork} is not supported`);
    
    console.log(`decoding oapp config for king nft ${oappAddress} from ${networkName} to ${destinationNetworkName}`);

    const decodeExecutorConfig = (executorConfig: string) => {
        const coder = new hre.ethers.AbiCoder();
        const executorConfigAbi = ['tuple(uint32 maxMessageSize, address executorAddress)'];
        const result = Object.values(coder.decode(executorConfigAbi, executorConfig))[0].toString().split(',');
        console.log(`\x1b[1m\x1b[33m maxMessageSize:\x1b[0m ${result[0]}`);
        console.log(`\x1b[1m\x1b[33m executorAddress:\x1b[0m ${result[1]}`);
    }

    const decodeUlnConfig = (ulnConfig: string) => {
        const coder = new hre.ethers.AbiCoder();
        const ulnConfigAbi = ['tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)'];
        const result = Object.values(coder.decode(ulnConfigAbi, ulnConfig))[0].toString().split(',');
        console.log(`\x1b[1m\x1b[33m confirmations:\x1b[0m ${result[0]}`);
        console.log(`\x1b[1m\x1b[33m requiredDVNCount:\x1b[0m ${result[1]}`);
        console.log(`\x1b[1m\x1b[33m optionalDVNCount:\x1b[0m ${result[2]}`);
        console.log(`\x1b[1m\x1b[33m optionalDVNThreshold:\x1b[0m ${result[3]}`);
        console.log(`\x1b[1m\x1b[33m requiredDVNs:\x1b[0m ${result[4]}`);
        console.log(`\x1b[1m\x1b[33m optionalDVNs:\x1b[0m ${result[5]}`);
    }

    const endpoint = endpoints[networkName];
    const destinationEndpoint = endpoints[destinationNetworkName];

    const endpointContract = EndpointV2__factory.connect(endpoint.address, hre.ethers.provider);
    
    try {
        const executorSendConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.send, destinationEndpoint.id, 1);
        console.log(`\n\x1b[1m\x1b[34mExecutor send config eid:\x1b[0m ${destinationEndpoint.id} (${destinationNetworkName})`);
        decodeExecutorConfig(executorSendConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mExecutor send config eid: ${destinationEndpoint.id} (${destinationNetworkName}) not found\x1b[0m`);
    }

    try {
        const ulnSendConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.send, destinationEndpoint.id, 2);
        console.log(`\n\x1b[1m\x1b[34mULN send config eid:\x1b[0m ${destinationEndpoint.id} (${destinationNetworkName})`);
        decodeUlnConfig(ulnSendConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mULN send config eid: ${destinationEndpoint.id} (${destinationNetworkName}) not found\x1b[0m`);
    }

    try {
        const executorReceiveConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.receive, destinationEndpoint.id, 1);
        console.log(`\n\x1b[1m\x1b[34mExecutor receive config eid:\x1b[0m ${destinationEndpoint.id} (${destinationNetworkName})`);
        decodeExecutorConfig(executorReceiveConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mExecutor receive config eid: ${destinationEndpoint.id} (${destinationNetworkName}) not found\x1b[0m`);
    }

    try {
        const ulnReceiveConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.receive, destinationEndpoint.id, 2);
        console.log(`\n\x1b[1m\x1b[34mULN receive config eid:\x1b[0m ${destinationEndpoint.id} (${destinationNetworkName})`);
        decodeUlnConfig(ulnReceiveConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mULN receive config eid: ${destinationEndpoint.id} (${destinationNetworkName}) not found\x1b[0m`);
    }



    try {
        const executorSendConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.send, endpoint.id, 1);
        console.log(`\n\x1b[1m\x1b[34mExecutor send config eid:\x1b[0m ${endpoint.id} (${networkName})`);
        decodeExecutorConfig(executorSendConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mExecutor send config eid: ${endpoint.id} (${networkName}) not found\x1b[0m`);
    }

    try {
        const ulnSendConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.send, endpoint.id, 2);
        console.log(`\n\x1b[1m\x1b[34mULN send config eid:\x1b[0m ${endpoint.id} (${networkName})`);
        decodeUlnConfig(ulnSendConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mULN send config eid: ${endpoint.id} (${networkName}) not found\x1b[0m`);
    }

    try {
        const executorReceiveConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.receive, endpoint.id, 1);
        console.log(`\n\x1b[1m\x1b[34mExecutor receive config eid:\x1b[0m ${endpoint.id} (${networkName})`);
        decodeExecutorConfig(executorReceiveConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mExecutor receive config eid: ${endpoint.id} (${networkName}) not found\x1b[0m`);
    }

    try {
        const ulnReceiveConfig = await endpointContract.getConfig(oappAddress, endpoint.messageLibrary.receive, endpoint.id, 2);
        console.log(`\n\x1b[1m\x1b[34mULN receive config eid:\x1b[0m ${endpoint.id} (${networkName})`);
        decodeUlnConfig(ulnReceiveConfig);
    } catch (e) {
        console.error(`\n\x1b[1m\x1b[31mULN receive config eid: ${endpoint.id} (${networkName}) not found\x1b[0m`);
    }
});
