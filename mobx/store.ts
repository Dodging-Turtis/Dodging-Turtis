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

enum Order {
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
  sortFilter: Order = Order.LATEST;

  constructor() {
    makeAutoObservable(this);
    this.web3 = new Web3(RPC_URL);
    this.contract = new this.web3.eth.Contract(
      SmartContract.abi as AbiItem[],
      address
    );
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
    }
  }
}
