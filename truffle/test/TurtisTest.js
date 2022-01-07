const { assert } = require("chai");
const Turtis = artifacts.require("Turtis");
const truffleAssert = require("truffle-assertions");
const TurtisMarket = artifacts.require("TurtisMarket");
const BigNum = require("bignumber.js");

async function bootstrapContract(accounts) {
  const ownerTurtisContract = accounts[0];
  const ownerTurtisMarketContract = accounts[1];

  const marketContract = await TurtisMarket.new({
    from: ownerTurtisMarketContract,
  });

  const turtisContract = await Turtis.new(marketContract.address, {
    from: ownerTurtisContract,
  });

  return { turtisContract, marketContract };
}

contract("Turtis", (accounts) => {
  describe("Turtis NFT", () => {
    it("checking NFT count", async () => {
      const { turtisContract, marketContract } = await bootstrapContract(
        accounts
      );

      let nftCount = await turtisContract.totalSupply();
      assert.equal(parseInt(nftCount), 0, "NFT count is wrong");
    });
  });
});
