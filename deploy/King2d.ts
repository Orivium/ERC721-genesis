import { DeployFunction } from "hardhat-deploy/types";
import dotenv from "dotenv";

import { MerkleTree } from "merkletreejs";
import { getOGWhiteListedAddress, getWhiteListedAddress } from "../utils/whitelist";
import { multiSigWallets, isSupportedNetwork } from "../utils/multiSigWallet";

dotenv.config();

const deployFunction: DeployFunction = async({ getNamedAccounts, deployments, ethers, network, run }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    if (!deployer) throw new Error("missing deployer");
    if (!isSupportedNetwork(network.name)) throw new Error("unsupported network");

    const whitelist = await getWhiteListedAddress();
    const wlLeafs = whitelist.map((address) => ethers.keccak256(address));
    const wlMerkleTree = new MerkleTree(wlLeafs, ethers.keccak256, { sortPairs: true });
    const wlRootHash = wlMerkleTree.getHexRoot();

    const ogWhitelist = await getOGWhiteListedAddress();
    const ogLeafs = ogWhitelist.map((address) => ethers.keccak256(address));
    const ogMerkleTree = new MerkleTree(ogLeafs, ethers.keccak256, { sortPairs: true });
    const ogRootHash = ogMerkleTree.getHexRoot();

    const openSaleTimestamp = 1706369400; // Jan 27, 2024, 3:30:00 PM

    const multiSigWallet = multiSigWallets[network.name] ?? deployer;

    await deploy("King2d", {
        from: deployer,
        args: [
            wlRootHash,
            ogRootHash,
            openSaleTimestamp,
            multiSigWallet
        ],
        log: true,
        waitConfirmations: network.name === "hardhat" ? 0 : 2,
    });

    await run("verify:verify", {
        address: (await deployments.get("King2d")).address,
        contract: "contracts/token/ERC721/King2d.sol:King2d",
        constructorArguments: [
            wlRootHash,
            ogRootHash,
            openSaleTimestamp,
            multiSigWallet
        ],
    });
};

export default deployFunction;
deployFunction.tags = ['all', 'nft-genesis', 'King2d', 'main'];

