const fs = require("fs");
require("dotenv").config({ path: __dirname + "./../../../.env" });

const generateTurtle = require("./../../../public/compute/generateNFT/generateTurtle");
const signTransaction = require("./../../../public/compute/approveTransaction/signTransaction");
const NFTStorageModule = require("nft.storage");

const apiKey = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorageModule.NFTStorage({ token: apiKey });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const componentIndicesArray = await generateTurtle.generateRandomTurtle();

    const characterName = "Floppy Turtle";
    // console.log("Character name: " + characterName);

    var speed = parseInt(req.body.score);
    speed += parseInt(Math.random() * 51);
    // console.log("Speed: " + speed);

    const imgdata = fs.readFileSync(
      "./../../../public/compute/generateNFT/newNFTImage/newTurtle.png"
    );
    const metadata = await client.store({
      name: characterName,
      description: "A Turtle that is on a journey in the river",
      image: new File([imgdata], "randomTurtle.png", { type: "image/png" }),
      componentIndices: {
        eyes: componentIndicesArray[0],
        hands: componentIndicesArray[1],
        head: componentIndicesArray[2],
        legs: componentIndicesArray[3],
        shell: componentIndicesArray[4],
        shellOuter: componentIndicesArray[5],
        tail: componentIndicesArray[6],
      },
      attributes: [{ trait_type: "speed", value: speed }],
    });

    const IPFSHash = metadata.ipnft;

    const tokenURI = "ipfs://" + IPFSHash.toString() + "/metadata.json";

    const signature = await signTransaction.generateSig(
      req.body.score.toString(),
      req.body.walletAddress,
      tokenURI
    );

    req
      .status(200)
      .json({ ipfsHash: IPFSHash, signature: JSON.stringify(signature) });
  } else {
    req.status(404);
  }
}
