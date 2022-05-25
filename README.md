# Dodging Turtis

![Turtis](https://user-images.githubusercontent.com/55662714/150418640-92754365-f2a5-410b-840d-65f1e95204ee.png)

> Dodging Turtis is an NFT based game which runs on the `POLYGON` network in the `Ethereum` Blockchain and is powered by decentralized `Chainlink` Oracles.

<br />

![Turtis](https://user-images.githubusercontent.com/55662714/150414116-cdc6c2e1-fca0-4c46-8242-b306f1292291.png)


## About the project

The game involves a Turtle character who dodges through the platforms coming towards it with increasing speed. The NFT here is the Turtle character. Everytime a row of blocks are dodged by the turtle, <b>10 points</b> are added to the score. The current game is over when the Turtle collides with any of the platforms.

Inorder to dodge through the blocks, the Turtle can move left or right using the arrow keys. The speed of the left and right movement of the Turtle varies for each Turtle NFT. The game is really fun to play and it can get really challenging as the speed of the platforms increase with time.

![Turtis](https://user-images.githubusercontent.com/55662714/150413926-84b65d7f-052f-4c0d-b1b0-09a8dcdb95cd.jpg)


The player is rewarded with a new random Turtle NFT everytime a new checkpoint score is reached by the user. The checkpoint score is atleast 110 more than the previous high score of the player.

![Turtis](https://user-images.githubusercontent.com/55662714/150415170-f281718d-d16f-4880-95ae-06f189135ab4.png)


Higher the score achieved for a new checkpoint, higher the `speed` of the NFT character that the user receives as a reward. More speed allows the player to move faster through the platforms and reach high score easily. Users would want to own NFTs with higher speed and hence it acts a selling point.

The NFTs are dynamic. Every new Turtle NFT has a unique name, randomized image and a random speed which is ranged according to the score achieved by the user. ERC721 standard is used for implementing the NFT. The symbol the Turtis NFT token is `TRTL`.

### Some of the randomly generated Turtles are as follows:

![Turtis](https://user-images.githubusercontent.com/55662714/150414723-1417bdd3-229d-4b66-b528-f66e1b999445.png)

![Turtis](https://user-images.githubusercontent.com/55662714/150417567-ebeea9d8-4daf-447c-b976-a59898621560.png)

<br>

![Turtis](https://user-images.githubusercontent.com/55662714/140104978-b4662328-fa0c-4e5f-84f5-d8c43bcaeef8.png)


The metadata for the NFT is stored in `FlieCoin` and `IPFS` using `nft.storage` using the [Custom API](https://github.com/DineshBS44/Turtis-API) and it returns the IPFS Hash to the smart contract using Chainlink Oracles.
<br>

<img src="https://user-images.githubusercontent.com/55662714/140105023-1ef74225-422d-461a-8fed-4e08c4120b49.png" alt="center" width="40" height="40"><br>

The DApp(Decentralized Application) which includes the Game is deployed to the `MATIC Mumbai Testnet`

Users can select any Turtle from the Turtles they own and play the game. The DApp also has an <b>NFT marketplace</b>. The users can buy and sell their NFTs inside the DApp. The users can also see the NFTs that are owned by other users even if they are not for sale.

![Turtis](https://user-images.githubusercontent.com/55662714/140105117-08ecfea2-a6d0-4c92-806e-ba7c8667df65.png)

## Working Demo of our DApp

The Application frontend is deployed to https://dodgingturtis.netlify.app/. Make sure you have Metamask installed in your browser and connect it to MATIC Mumbai Testnet using the Custom RPC option. Also, get some MATIC from the Faucet.

## Turtis contract

<a href="https://mumbai.polygonscan.com/address/0x22Ebc23a695F4fEcE850cEb8a38Df95BBf1011d5#contracts">Click here</a> to view the Turtis contract on Polygonscan

The contract <a href="https://mumbai.polygonscan.com/address/0x22Ebc23a695F4fEcE850cEb8a38Df95BBf1011d5#code">code</a> has been verified and it is visible on `mumbai.polygonscan.com`

## TurtisGameUserAuth contract

<a href="https://mumbai.polygonscan.com/address/0x87D83BBE86A224d5B27e330a9d5D1D62EC710512">Click here</a> to view the TurtisGameUserAuth contract on Polygonscan

The contract <a href="https://mumbai.polygonscan.com/address/0x87D83BBE86A224d5B27e330a9d5D1D62EC710512#code">code</a> has been verified and it is visible on `mumbai.polygonscan.com`

## Built With

- [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
- [Chainlink](https://chain.link/) - Chainlink's decentralized oracle network provides reliable, tamper-proof data for complex smart contracts
- [Polygon](https://polygon.technology/) - Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks and provides scalable solutions
- [Solidity](https://docs.soliditylang.org/en/v0.8.6/) - The most popular language for writing smart contracts
- [Phaser](https://phaser.io/) - An open source framework for building browser based games
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [nft.storage](https://nft.storage/) - Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin.
- [IPFS](https://ipfs.io/) - P2P network for storing and sharing files in a distributed file system
- [Filecoin](https://filecoin.io/) - A decentralized storage network to store humanity's most important information
- [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier
- [Alchemy](https://docs.alchemy.com/alchemy/documentation/apis/polygon-api) - To access a node which connects with Ethereum Blockchain on the Polygon Mumbai Testnet
- [Remix - Solidity IDE](https://remix.ethereum.org/) - To compile, test and deploy faster using Javascript VM
- [Visual Studio Code](https://code.visualstudio.com/) - Code Editor
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache) - Local blockchain for testing
- [Open Zeppelin ](https://openzeppelin.org/) - Open source Library of pre-built contracts
- [Metamask](https://metamask.io/) - Wallet Provider
- [Polygonscan](https://mumbai.polygonscan.com/) - View and keep track of transactions happening around a smart contract as well as view its code, read and write stuff to it

## The DApp User Interface

![Turtis](https://user-images.githubusercontent.com/55662714/140105241-1eb1c085-7e99-45b6-89f6-5a6f83086ef1.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Please make sure you've already installed NPM & Yarn packages, Truffle and enabled MetaMask extension in your browser.

If you don't have `yarn` installed, run the following command:

```
npm install -g yarn
```

If you don't have Truffle installed, run the following command:

```
npm install -g truffle
```

Please make sure that the Metamask wallet is connected to the `MATIC Mumbai Testnet` and has some MATIC tokens.

### Installing

A step by step guide to locally run the DApp

- First, get free API keys from [Alchemy](https://docs.alchemy.com/alchemy/documentation/apis/polygon-api) and [Polygonscan](https://polygonscan.com/)
- Clone this repository:

```
git clone https://github.com/Hardikag17/NFT-Game
```

- Install all the required packages using the following command

```
yarn
```

- Create a `.env` file and store the following contents in it and include API keys:

```
POLYGONSCAN_API_KEY="<Polygon API Key>"
MNEMONIC="<Enter your metamask seed phrase here>"
POLYGON_MUMBAI_RPC_URL="https://polygon-mumbai.g.alchemy.com/v2/<Alchemy API Key>"
```

- To launch the DApp, use the following command:

```
yarn start
```

## Libraries/services used

- **@truffle/hdwallet-provider** - Used to create a provider using Seed phrase(Mnemonic) and Alchemy RPC URL to connect to the Blockchain
- **web3** - To interact with the deployed smart contract on Polygon Mumbai Testnet
- **@chainlink/contracts** - To inherit ChainlinkClient contract to call an API using the decentralized Chainlink Oracles
- **@openzeppelin/contracts** - To inherit the ERC721 based contracts
- **phaser** - To build the game
- **react** - For creating the fronted DApp
- **@ion-phaser/react** - React specific wrapper for ion-phaser component
- **truffle-plugin-verify** - To verify the smart contract code on Polygonscan using its API
- **dotenv** - For managing data in .env files
- **solc** - For compiling solidity contracts
- **ganache-cli** - For running a local blockchain mostly used for testing purposes
- **mocha & chai** - To test the smart contracts written in solidity
- **solhint** - To lint solidity files
- **prettier & prettier-plugin-solidity** - To format the code

### Some versions of Frameworks and Libraries used in this project are

- **Truffle version** - 5.3.14
- **Solidity version** - 0.6.6
- **Node JS version** - 14.16.1
- **@truffle/hdwallet-provider version** - 1.4.1
- **web3 version** - 1.4.0

## Developers

- **Dinesh B S** [(@DineshBS44)](https://github.com/DineshBS44)
- **Hardik Agarwal** [(@Hardikag17)](https://github.com/Hardikag17)
- **Hritika M Kucheriya** [(@hritikamk)](https://github.com/hritikamk)
- **Suryashankar Das** [(@iamsdas)](https://github.com/iamsdas)

## Contributors

## License

Licensed under MIT License : https://opensource.org/licenses/MIT

<br>
<br>
