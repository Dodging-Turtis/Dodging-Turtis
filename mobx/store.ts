import { makeAutoObservable } from 'mobx';
import type { AbiItem } from 'web3-utils';
import type { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import SmartContract from '../truffle/abis/Turtis.json';

const NET_ID = 80001;
const address = SmartContract.networks[NET_ID].address;
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
  contract: Contract;
  accountAddress: string = '';
  highScore: number = 0;
  nftList: INft[] = [];
  userNftList: INft[] = [];
  walletConnected: boolean = false;
  sortOrder: Order = Order.LATEST;

  constructor() {
    makeAutoObservable(this);
    this.web3 = new Web3(RPC_URL);
    this.contract = new this.web3.eth.Contract(
      SmartContract.abi as AbiItem[],
      address
    );
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
        this.accountAddress = (await this.web3.eth.getAccounts())[0];
        this.contract = new this.web3.eth.Contract(
          SmartContract.abi as AbiItem[],
          address
        );
        const netId = await this.web3.eth.net.getId();
        if (netId !== NET_ID) alert('wrong network');
        else this.walletConnected = true;
      } catch (e) {
        console.error(e);
        alert('connection error');
      }
    } else alert('wallet not detected');
  }

  async fetchGlobalNfts() {
    const newNftCount = await this.contract.methods.totalSupply().call();
    if (newNftCount !== this.nftList.length) {
      const nftsData: any[] =
        await this.contract.methods.fetchMarketItems.call();
      this.nftList = nftsData.map((item) => ({
        price: parseFloat(
          this.web3.utils.fromWei(item.price.toString(), 'ether')
        ),
        owner: item.owner,
        seller: item.seller,
        tokenId: item.tokenId.toString(),
      }));
      this.sortGlobalNfts();
    }
  }

  async fetchUserNfts() {
    const newUserNftCount = await this.contract.methods
      .balanceOf(this.accountAddress)
      .call();
    if (newUserNftCount !== this.userNftList.length) {
      const nftsData: any[] = await this.contract.methods.fetchUserNFTs.call();
      this.userNftList = nftsData.map((item) => ({
        price: parseFloat(
          this.web3.utils.fromWei(item.price.toString(), 'ether')
        ),
        owner: item.owner,
        seller: item.seller,
        tokenId: item.tokenId.toString(),
      }));
      this.sortUserlNfts();
    }
  }
}
