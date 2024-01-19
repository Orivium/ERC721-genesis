import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomiclabs/hardhat-solhint";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat';

import { EthGasReporterConfig } from "hardhat-gas-reporter/dist/src/types";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import 'hardhat-deploy-ethers';

// import "./tasks"

import dotenv from "dotenv";
dotenv.config()

// optional
const FORKING_BLOCK_NUMBER = parseInt(process.env["FORKING_BLOCK_NUMBER"] ?? "0");

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env["ETHERSCAN_API_KEY"] as string;
const REPORT_GAS = process.env["REPORT_GAS"]?.toLocaleLowerCase() === "true" ?? false;

const gasReporter: EthGasReporterConfig = {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    token: "ETH",
};

if (process.env["COINMARKETCAP_API_KEY"]) {
    gasReporter.coinmarketcap = process.env["COINMARKETCAP_API_KEY"];
}

const PRIVATE_KEY = process.env["PRIVATE_KEY"];
const BRIDGE_PRIVATE_KEY = process.env["BRIDGE_PRIVATE_KEY"];
const accounts = PRIVATE_KEY !== undefined && BRIDGE_PRIVATE_KEY !== undefined
    ? [PRIVATE_KEY, BRIDGE_PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 100000,
                details: {
                  yul: true // remove this when lz go 0.8.23
                }
            },
        },
    },
    networks: {
        hardhat: {
            hardfork: "merge",
            forking: {
                url: "https://ethereum.publicnode.com",
                blockNumber: FORKING_BLOCK_NUMBER,
                enabled: false,
            },
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        localNitro: {
            url: "http://localhost:8547",
            accounts: [
                "0xb6b15c8cb491557369f3c7d2c287b053eb229daa9c22138887752191c9520659",
                "e887f7d17d07cc7b8004053fb8826f6657084e88904bb61590e498ca04704cf2",
            ],
            chainId: 412346,
        },
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/zjuIquNLzxn5H_B38g54LDdcb_09NCLK",
            chainId: 11155111,
            accounts
        },
        arbitrumSepolia: {
            url: "https://arb-sepolia.g.alchemy.com/v2/j3r08NlNbfk1-JZJUYaGD-RU8-t68p3q",
            chainId: 421614,
            accounts
        },
        goerli: {
            url: "https://ethereum-goerli.publicnode.com",
            chainId: 5,
            accounts
        },
        arbitrumGoerli: {
            url: "https://arbitrum-goerli.publicnode.com",
            chainId: 421613,
            accounts
        },
        mainnet: {
            url: "https://ethereum.publicnode.com",
            chainId: 1,
            accounts
        },
        arbitrumOne: {
            url: "https://arbitrum-one.publicnode.com",
            chainId: 42161,
            accounts
        },
    },
    defaultNetwork: "hardhat",
    etherscan: {
        apiKey: {
            mainnet: ETHERSCAN_API_KEY,
            arbitrumOne: ETHERSCAN_API_KEY,

            goerli: ETHERSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY,
            arbitrumGoerli: ETHERSCAN_API_KEY,
        },
    },
    gasReporter,
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./build/cache",
        artifacts: "./build/artifacts",
    },
    mocha: {
        timeout: 300000, // 300 seconds max for running tests
    },
    typechain: {
      outDir: './typechain/src',
      target: 'ethers-v6',
      alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
      externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
      dontOverrideCompile: false // defaults to false
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        crowdsaleFundsCollector: {
            default: 1,
        },
        crowdsaleBuyer: {
            default: 2,
        },
        bridgeOperator: {
            default: 1,
        },
    },
};

export default config;
