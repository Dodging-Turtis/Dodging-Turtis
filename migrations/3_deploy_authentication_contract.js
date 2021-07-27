const TurtleGameUserAuth = artifacts.require("TurtleGameUserAuth");

module.exports = async (deployer, network, [defaultAccount]) => {
  await deployer.deploy(TurtleGameUserAuth);
  let auth = await TurtleGameUserAuth.deployed();
};
