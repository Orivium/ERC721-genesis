# Orivium ERC721 Genesis Contracts 👑

Warning: This project is no longer maintained. Do not interact with the smart contracts or use this code in production. ⚠️

This project provides smart contracts, deployment scripts and custom Hardhat tasks to streamline testing, deployment, and overall development workflow of the Orivium ERC721 Genesis collection.

It includes
 - King NFT contract with multiple sale phases,
 - King2d contract with free minting for whitelist and OGs
 - Merkle tree-based whitelist management, and staking functionality
 - deployment scripts
 - custom Hardhat tasks to streamline testing, deployment, and overall development workflow

## Usage 💡

### Compile Contracts 🛠️
To compile the smart contracts, run:

```sh
yarn compile
```

### Run Tests ✅
To run the tests, use:

```sh
yarn test
```

### Deploy Contracts 🚀
To deploy the contracts, execute:

```sh
yarn deploy
```

### Start Local Node 🌐
To start a local Hardhat node, run:

```sh
yarn start:local
```

### Generate Typechain Types 📜
To generate Typechain types, use:

```sh
yarn typechain
```

## Tasks 🔧
Before using tasks, make sure to generate Typechain types:

```sh
yarn typechain
```

You can use the different tasks defined in the `tasks/` directory from the terminal,
to get the available tasks run:

```sh
npx hardhat --help
```
