import { DeployFunction } from "hardhat-deploy/types";
import dotenv from "dotenv";

dotenv.config();

const deployFunction: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (!deployer) throw new Error("missing deployer");

  await deploy("Testable_King2d", {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployFunction;
deployFunction.tags = ["test", "Testable_King2d"];
