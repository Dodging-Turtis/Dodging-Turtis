import { makeAutoObservable, runInAction } from 'mobx';
import type { AbiItem } from 'web3-utils';
import type { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import TurtisContract from '../truffle/abis/Turtis.json';
import MarketContract from '../truffle/abis/TurtisMarket.json';

const NET_ID = 80001;
const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL ??
  'https://rpc-endpoints.superfluid.dev/mumbai';

export enum Order {
  PRICE_ASC,
  PRICE_DSC,
  LATEST,
  OLDEST,
}

export class GlobalStore {
  web3: Web3;
  turtisContract: Contract;
  marketContract: Contract;
  accountAddress: string = '';
  highScore: number = 0;
  nftList: INft[] = [];
  userNftList: INft[] = [];
  walletConnected: boolean = false;
  sortOrder: Order = Order.LATEST;

  constructor() {
    makeAutoObservable(this);
    this.web3 = new Web3(RPC_URL);
    this.turtisContract = new this.web3.eth.Contract(
      TurtisContract.abi as AbiItem[],
      TurtisContract.networks[NET_ID].address
    );
    this.marketContract = new this.web3.eth.Contract(
      MarketContract.abi as AbiItem[],
      MarketContract.networks[NET_ID].address
    );
  }

  get globalNfts() {
    return this.nftList;
  }

  sortGlobalNfts() {
    switch (this.sortOrder) {
      case Order.PRICE_ASC:
        this.nftList.sort((a, b) => a.price - b.price);
        break;

      case Order.PRICE_DSC:
        this.nftList.sort((a, b) => b.price - a.price);
        break;

      case Order.OLDEST:
        this.nftList.sort((a, b) => b.tokenId - a.tokenId);
        break;

      default:
        this.nftList.sort((a, b) => a.tokenId - b.tokenId);
        break;
    }
  }

  sortUserlNfts() {
    switch (this.sortOrder) {
      case Order.PRICE_ASC:
        this.nftList.sort((a, b) => a.price - b.price);
        break;

      case Order.PRICE_DSC:
        this.nftList.sort((a, b) => b.price - a.price);
        break;

      case Order.OLDEST:
        this.nftList.sort((a, b) => b.tokenId - a.tokenId);
        break;

      default:
        this.nftList.sort((a, b) => a.tokenId - b.tokenId);
        break;
    }
  }

  updateSortOrder(order: Order) {
    if (order != this.sortOrder) {
      this.sortOrder = order;
      this.sortGlobalNfts();
      this.sortUserlNfts();
    }
  }

  async connectToWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.web3.setProvider(window.ethereum);
        const netId = await this.web3.eth.net.getId();
        if (netId !== NET_ID) {
          alert('wrong network');
        } else {
          const accountAddress = (await this.web3.eth.getAccounts())[0];
          runInAction(() => {
            this.accountAddress = accountAddress;
            this.turtisContract = new this.web3.eth.Contract(
              TurtisContract.abi as AbiItem[],
              TurtisContract.networks[NET_ID].address
            );
            this.marketContract = new this.web3.eth.Contract(
              MarketContract.abi as AbiItem[],
              MarketContract.networks[NET_ID].address
            );
            this.walletConnected = true;
          });
        }
      } catch (e) {
        console.error(e);
        alert('connection error');
      }
    } else alert('wallet not detected');
  }

  async fetchGlobalNfts() {
    const newNftCount = await this.turtisContract.methods.totalSupply().call();
    console.log(newNftCount);
    if (newNftCount !== this.nftList.length) {
      console.log('fetching nfts');
      const nftsData: any[] = await this.marketContract.methods
        .fetchMarketItems()
        .call();
      console.log(nftsData);
      runInAction(() => {
        this.nftList = nftsData.map((item) => ({
          price: parseFloat(
            this.web3.utils.fromWei(item.price.toString(), 'ether')
          ),
          owner: item.owner,
          seller: item.seller,
          tokenId: item.tokenId.toString(),
          tokenUri: item.tokenURI,
        }));
      });
      this.sortGlobalNfts();
    }
  }

  async fetchUserNfts() {
    if (this.accountAddress) {
      const newUserNftCount = await this.turtisContract.methods
        .balanceOf(this.accountAddress)
        .call();
      if (newUserNftCount !== this.userNftList.length) {
        const nftsData: any[] = await this.turtisContract.methods
          .getUserOwnedNFTs(this.accountAddress)
          .call();
        runInAction(() => {
          this.userNftList = nftsData.map((item) => ({
            // price: parseFloat(
            //   this.web3.utils.fromWei(item.price?.toString() ?? '0', 'ether')
            // ),
            // owner: item.owner,
            // seller: item.seller,
            tokenId: parseInt(item.tokenId.toString()),
            tokenUri: item.tokenURI,
            price: 0,
          }));
          this.sortUserlNfts();
        });
      }
    } else {
      console.log('wallet not connected');
    }
  }

  async mintNFT() {
    await this.turtisContract.methods
      .generateTurtle(
        300,
        'ipfs://bafyreiewc2ctsxcmmjs6c3yprc7xho723ur6ogihbiz4gqiq45g2v4o6vm/metadata.json',
        '0x1b',
        '0xc1cd758d8987b9b0e7f3ca8ae96ddaa27631a8cd0fa4a24e84e9c31e8a3b3b55',
        '0x63e648ecff13bf87d174b4294e083a50d0ae0e1c36a8b53be551fb6f09ad2c28'
      )
      .send({ from: this.accountAddress });
  }
}
