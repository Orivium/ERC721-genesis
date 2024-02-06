import { DeployFunction } from "hardhat-deploy/types";
import dotenv from "dotenv";

dotenv.config();

const deployFunction: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  network,
  run,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (!deployer) throw new Error("missing deployer");

  const king = await deployments.get("King");
  const king2d = await deployments.get("King2d");

  await deploy("KingStaking", {
    from: deployer,
    args: [king.address, king2d.address],
    log: true,
    waitConfirmations: network.name === "hardhat" ? 0 : 5,
  });

  if (network.name === "hardhat") return;

  await run("verify:verify", {
    address: (await deployments.get("King")).address,
    contract: "contracts/token/ERC721/King.sol:King",
    constructorArguments: [king.address, king2d.address],
  });
};

export default deployFunction;
deployFunction.tags = ["all", "KingStaking", "main"];
