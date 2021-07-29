const TurtisGameUserAuth = artifacts.require("TurtisGameUserAuth");

const nickName = "firstPlayer";

module.exports = async (deployer) => {
  await deployer.deploy(TurtisGameUserAuth, nickName);
  let auth = await TurtisGameUserAuth.deployed();
};
