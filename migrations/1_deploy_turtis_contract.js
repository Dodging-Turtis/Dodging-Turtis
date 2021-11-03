const Turtis = artifacts.require("Turtis");

module.exports = async (deployer) => {
  await deployer.deploy(Turtis);
  let turtis = await Turtis.deployed();
};
