import { NFTStorage, File } from 'nft.storage';
import {
  generateRandomTurtle,
  dummyTurtle,
  generateSig,
} from '../../../nftGeneration';

const apiKey = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { componentIndicesArray, imgdata } = await dummyTurtle();
    const { score, walletAddress } = JSON.parse(req.body);
    const characterName = 'Floppy Turtle';

    let speed = score;
    speed += parseInt(Math.random() * 51);

    const metadata = await client.store({
      name: characterName,
      description: 'A Turtle that is on a journey in the river',
      image: new File([imgdata], 'randomTurtle.png', { type: 'image/png' }),
      componentIndices: {
        eyes: componentIndicesArray[0],
        hands: componentIndicesArray[1],
        head: componentIndicesArray[2],
        legs: componentIndicesArray[3],
        shell: componentIndicesArray[4],
        shellOuter: componentIndicesArray[5],
        tail: componentIndicesArray[6],
      },
      attributes: [{ trait_type: 'speed', value: speed }],
    });

    const IPFSHash = metadata.ipnft;
    const tokenURI = 'ipfs://' + IPFSHash.toString() + '/metadata.json';

    const signature = await generateSig(
      score.toString(),
      walletAddress,
      tokenURI
    );

    res
      .status(200)
      .json({ ipfsHash: IPFSHash, signature: JSON.stringify(signature) });
  } else {
    res.status(404);
  }
}
