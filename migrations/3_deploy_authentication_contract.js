const UserAuth = artifacts.require("UserAuth");

module.exports = async (deployer, network, [defaultAccount]) => {
  await deployer.deploy(UserAuth);
  let auth = await TurtleCharacter.deployed();
};
