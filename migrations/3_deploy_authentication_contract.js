const TurtleGameUserAuth = artifacts.require("TurtleGameUserAuth");

const nickName = "greg";

module.exports = async (deployer) => {
  await deployer.deploy(TurtleGameUserAuth, nickName);
};
