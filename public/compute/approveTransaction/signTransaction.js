const Web3 = require("web3");
require("dotenv").config({ path: __dirname + "./../../../.env" });

var web3 = new Web3("http://localhost:8545");
var privateKey = process.env.METAMASK_PRIVATE_KEY;

async function generateSig(message) {
  // console.log("Hashed message is " + web3.utils.soliditySha3(message));
  const sig = web3.eth.accounts.sign(
    web3.utils.soliditySha3(message),
    privateKey
  );

  // console.log("Signature : \n " + JSON.stringify(sig));
  const signature = sig.signature;
  // console.log("Sig: ", signature);
  return signature;
}

module.exports = { generateSig };
