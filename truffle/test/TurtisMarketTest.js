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

async function mintNewTurtle(accounts, turtisContract, score, index, tokenURI) {
  const signature = await generateSig(
    tokenURI,
    accounts[index],
    score.toString()
  );
  await turtisContract.generateTurtle(
    score,
    tokenURI,
    signature.v,
    signature.r,
    signature.s,
    {
      from: accounts[index],
    }
  );
}

contract("TurtisMarket", (accounts) => {
  describe("Market Item", () => {
    it("should be able to create market item & retrieve", async () => {
      const { turtisContract, marketContract } = await bootstrapContract(
        accounts
      );
      await turtisContract.setSignedWalletAddress(walletAddress, {
        from: accounts[0],
      });
      const IPFSHash =
        "bafyreickc6kv43f2vnrvycvqcj5zf2nwwdm7hvvsugrothpjge4hhp2pgy";
      const tokenURI = "ipfs://" + IPFSHash.toString() + "/metadata.json";
      await mintNewTurtle(accounts, turtisContract, 250, 3, tokenURI);
      await mintNewTurtle(accounts, turtisContract, 350, 3, tokenURI);
      await mintNewTurtle(accounts, turtisContract, 450, 3, tokenURI);

      let nftCount = await turtisContract.totalSupply.call();
      // console.log("NFT count is " + nftCount);
      assert.equal(parseInt(nftCount), 3, "NFT count is wrong");

      await marketContract.createMarketItem(
        turtisContract.address,
        0,
        web3.utils.toWei("2", "ether"),
        {
          from: accounts[3],
          value: web3.utils.toWei("1", "ether"),
        }
      );
      await marketContract.createMarketItem(
        turtisContract.address,
        1,
        web3.utils.toWei("5", "ether"),
        {
          from: accounts[3],
          value: web3.utils.toWei("1", "ether"),
        }
      );

      let items = await marketContract.fetchMarketItems.call();
      items = await Promise.all(
        items.map(async (i) => {
          const _tokenUri = await turtisContract.tokenURI(i.tokenId);
          let item = {
            price: web3.utils.fromWei(i.price.toString(), "ether"),
            tokenId: i.tokenId.toString(),
            seller: i.seller,
            owner: i.owner,
            _tokenUri,
          };
          return item;
        })
      );
      // console.log("items are " + JSON.stringify(items));
      assert.equal(items.length, 2, "Items count is wrong");
    });

    it("should be able to buy NFT and retrive", async () => {
      const { turtisContract, marketContract } = await bootstrapContract(
        accounts
      );
      await turtisContract.setSignedWalletAddress(walletAddress, {
        from: accounts[0],
      });
      const IPFSHash =
        "bafyreickc6kv43f2vnrvycvqcj5zf2nwwdm7hvvsugrothpjge4hhp2pgy";
      const tokenURI = "ipfs://" + IPFSHash.toString() + "/metadata.json";
      await mintNewTurtle(accounts, turtisContract, 250, 3, tokenURI);
      await mintNewTurtle(accounts, turtisContract, 350, 3, tokenURI);
      await mintNewTurtle(accounts, turtisContract, 450, 3, tokenURI);

      let nftCount = await turtisContract.totalSupply.call();
      // console.log("NFT count is " + nftCount);
      assert.equal(parseInt(nftCount), 3, "NFT count is wrong");

      await marketContract.createMarketItem(
        turtisContract.address,
        0,
        web3.utils.toWei("2", "ether"),
        {
          from: accounts[3],
          value: web3.utils.toWei("1", "ether"),
        }
      );
      await marketContract.createMarketItem(
        turtisContract.address,
        1,
        web3.utils.toWei("5", "ether"),
        {
          from: accounts[3],
          value: web3.utils.toWei("1", "ether"),
        }
      );
      await marketContract.createMarketItem(
        turtisContract.address,
        2,
        web3.utils.toWei("7", "ether"),
        {
          from: accounts[3],
          value: web3.utils.toWei("1", "ether"),
        }
      );

      await marketContract.createMarketSale(turtisContract.address, 1, {
        from: accounts[4],
        value: web3.utils.toWei("2", "ether"),
      });
      await truffleAssert.reverts(
        marketContract.createMarketSale(turtisContract.address, 2, {
          from: accounts[4],
          value: web3.utils.toWei("4", "ether"),
        }),
        "Please submit the asking price in order to complete the purchase"
      );
      await marketContract.createMarketSale(turtisContract.address, 2, {
        from: accounts[4],
        value: web3.utils.toWei("5", "ether"),
      });

      let items = await marketContract.fetchUserNFTs.call(accounts[4]);
      items = await Promise.all(
        items.map(async (i) => {
          const _tokenUri = await turtisContract.tokenURI(i.tokenId);
          let item = {
            price: web3.utils.fromWei(i.price.toString(), "ether"),
            tokenId: i.tokenId.toString(),
            seller: i.seller,
            owner: i.owner,
            _tokenUri,
          };
          return item;
        })
      );

      // console.log("items are " + JSON.stringify(items));
      assert.equal(items.length, 2, "Items count is wrong");
    });
  });
});
