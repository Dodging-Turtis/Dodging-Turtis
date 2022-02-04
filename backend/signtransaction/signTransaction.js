import Web3 from 'web3';

const web3 = new Web3();
const privateKey = process.env.METAMASK_PRIVATE_KEY;

export async function generateSig(score, walletAddress, tokenURI) {
  const hash = web3.utils.soliditySha3(score, walletAddress, tokenURI);

  if (!hash || !privateKey) {
    throw new Error('Empty args for signature');
  }

  return web3.eth.accounts.sign(hash, privateKey);
}
