const TurtleCharacter = artifacts.require(
    "TurtleCharacter"
  );
  
  module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(TurtleCharacter);
    let trtl = await TurtleCharacter.deployed();
  };
  