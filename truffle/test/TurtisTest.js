const { assert } = require("chai");
const Turtis = artifacts.require("Turtis");
const truffleAssert = require("truffle-assertions");
const TurtisMarket = artifacts.require("TurtisMarket");
const BigNum = require("bignumber.js");
const Web3 = require("web3");
require("dotenv").config({ path: __dirname + "./../../.env" });

var web3 = new Web3("http://localhost:9545");
const privateKey = process.env.METAMASK_PRIVATE_KEY;
const walletAddress = "0x6f2953e6C13159d9278456888b47a968D241211f";

async function generateSig(tokenURI, addr, score) {
  const sig = web3.eth.accounts.sign(
    web3.utils.soliditySha3(score, addr, tokenURI),
    privateKey
  );
  return sig;
}

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
  describe("Turtis Mint", () => {
    it("should be able to mint NFT by generating signature & verifying valid signature on-chain", async () => {
      const { turtisContract, marketContract } = await bootstrapContract(
        accounts
      );

      await turtisContract.setSignedWalletAddress(walletAddress, {
        from: accounts[0],
      });

      // type of account[i] is string
      // type of score is int
      // type of tokenURI is string

      const score = 250;
      const IPFSHash =
        "bafyreickc6kv43f2vnrvycvqcj5zf2nwwdm7hvvsugrothpjge4hhp2pgy";
      const tokenURI = "ipfs://" + IPFSHash.toString() + "/metadata.json";

      const signature = await generateSig(
        tokenURI,
        accounts[2],
        score.toString()
      ); // parameters are used to sign a single transaction

      // const address = web3.eth.accounts.recover(signature); // the wallet address associated with the secret private key is retrieved here

      // new turtle is minted using the 'generateTurtle' function on-chain

      await turtisContract.generateTurtle(
        score,
        tokenURI,
        signature.v,
        signature.r,
        signature.s,
        {
          from: accounts[2],
        }
      );

      // after minting a turtle, nft count is increased by 1

      let nftCount = await turtisContract.totalSupply.call();
      assert.equal(parseInt(nftCount), 1, "NFT count is wrong");
    });

    it("should not be able to mint NFT by generating signature & verifying invalid data for signature on-chain", async () => {
      const { turtisContract, marketContract } = await bootstrapContract(
        accounts
      );

      await turtisContract.setSignedWalletAddress(walletAddress, {
        from: accounts[0],
      });

      // type of account[i] is string
      // type of score is int
      // type of tokenURI is string

      const score = 250;
      const IPFSHash =
        "bafyreickc6kv43f2vnrvycvqcj5zf2nwwdm7hvvsugrothpjge4hhp2pgy";
      const tokenURI = "ipfs://" + IPFSHash.toString() + "/metadata.json";

      const signature = await generateSig(
        tokenURI,
        accounts[2],
        score.toString()
      ); // parameters are used to sign a single transaction

      // const address = web3.eth.accounts.recover(signature); // the wallet address associated with the secret private key is retrieved here

      // new turtle is minted using the 'generateTurtle' function on-chain

      const invalidScore = 450;

      await truffleAssert.reverts(
        turtisContract.generateTurtle(
          invalidScore,
          tokenURI,
          signature.v,
          signature.r,
          signature.s,
          {
            from: accounts[2],
          }
        ),
        "Invalid signature"
      );

      // after minting a turtle, nft count is increased by 1

      let nftCount = await turtisContract.totalSupply.call();
      assert.equal(parseInt(nftCount), 0, "NFT count is wrong");
    });
  });
});
