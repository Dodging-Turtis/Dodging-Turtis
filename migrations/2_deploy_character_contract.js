const TurtleCharacter = artifacts.require("TurtleCharacter");

module.exports = async (deployer) => {
  await deployer.deploy(TurtleCharacter);
};
