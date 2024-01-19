import { DeployFunction } from "hardhat-deploy/types";
import dotenv from "dotenv";

import { MerkleTree } from "merkletreejs";
import { getOGWhiteListedAddress, getWhiteListedAddress } from "../utils/whitelist";
import { multiSigWallets, isSupportedNetwork } from "../utils/multiSigWallet";

dotenv.config();

const deployFunction: DeployFunction = async({ getNamedAccounts, deployments, network, ethers, run }) => {
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

    // TODO: set price before deployment
    const price = ethers.parseEther("0.0001");
    // TODO: set open sale timestamp before deployment
    const openSaleTimestamp = 1706457600; // Jan 28, 2024, 4:00:00 PM

    const multiSigWallet = multiSigWallets[network.name] ?? deployer;

    console.log(`deploying King with on ${network.name} network`);
    await deploy("King", {
        from: deployer,
        args: [
            wlRootHash,
            ogRootHash,
            price,
            openSaleTimestamp,
            multiSigWallet,
        ],
        log: true,
        waitConfirmations: network.name === "hardhat" ? 0 : 2,
    });

    if (!network.config.verify?.etherscan?.apiKey || process.env["VERIFY"] === "false") return;
    await run("verify:verify", {
        address: (await deployments.get("King")).address,
        contract: "contracts/token/ERC721/King.sol:King",
        constructorArguments: [
            wlRootHash,
            ogRootHash,
            price,
            multiSigWallet,
        ],
    });
};

export default deployFunction;
deployFunction.tags = ['all', 'nft-genesis', 'King', 'main'];

