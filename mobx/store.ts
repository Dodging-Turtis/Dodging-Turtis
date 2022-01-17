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
  nftList: IMarketItem[] = [];
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
    const globalNfts = [...this.nftList];
    switch (this.sortOrder) {
      case Order.PRICE_ASC:
        return globalNfts.sort((a, b) => a.price - b.price);
      case Order.PRICE_DSC:
        return globalNfts.sort((a, b) => b.price - a.price);
      case Order.OLDEST:
        return globalNfts.sort((a, b) => b.tokenId - a.tokenId);
      default:
        return globalNfts.sort((a, b) => a.tokenId - b.tokenId);
    }
  }

  async getUserNftsByPage(page: number) {
    let promises: Promise<IMetadata>[] = [];
    console.log('fetch by page');

    const fetchIpfs = async (url: string) => {
      url = url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
      const data = await fetch(url);
      return await data.json();
    };

    for (
      let index = page * 6;
      index < Math.min(this.userNftList.length, (page + 1) * 6);
      index++
    ) {
      let url = this.userNftList[index].tokenUri;
      promises.push(fetchIpfs(url));
    }

    return await Promise.all(promises);
  }

  updateSortOrder(order: Order) {
    if (order != this.sortOrder) {
      this.sortOrder = order;
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
          tokenId: parseInt(item.tokenId.toString()),
          itemId: parseInt(item.itemId.toString()),
          tokenUri: item.tokenURI,
        }));
      });
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
            tokenId: parseInt(item.tokenId.toString()),
            tokenUri: item.tokenURI,
          }));
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
