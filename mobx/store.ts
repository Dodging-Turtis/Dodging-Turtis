import { makeAutoObservable, runInAction } from 'mobx';
import type { AbiItem } from 'web3-utils';
import type { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import {
  NET_ID,
  RPC_URL,
  Order,
  notify,
  fetchIpfs,
  sortNfts,
  dummyTurtle1,
  dummyTurtle2,
  dummyTurtle3,
  dummyTurtle4,
  dummyTurtle5,
} from './helpers';
import TurtisContract from '../truffle/abis/Turtis.json';
import MarketContract from '../truffle/abis/TurtisMarket.json';

export class GlobalStore {
  web3: Web3;
  turtisContract: Contract;
  marketContract: Contract;

  accountAddress: string = '';
  walletConnected: boolean = false;
  highScore: number = 0;
  sortOrder: Order = Order.LATEST;

  marketNftList: IMarketNft[] = [];
  userNftList: IUserNft[] = [];

  page: number = 0;
  marketNftWithMetadata: IMarketNftWithMetadata[] = [];
  userNftWithMetadata: IUserNftWithMetadata[] = [];
  dummyUserNftWithMetadata: IUserNftWithMetadata[] = [
    dummyTurtle1,
    dummyTurtle2,
    dummyTurtle3,
    dummyTurtle4,
    dummyTurtle5,
  ];

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

  async purchaseTurtle(id: number, price: number) {
    try {
      if (!this.walletConnected) throw new Error('Not connected to wallet');
      await this.marketContract.methods
        .createMarketSale(TurtisContract.networks[NET_ID].address, id)
        .send({
          from: this.accountAddress,
          value: this.web3.utils.toWei(price.toString(), 'ether'),
        });
      notify('success', 'Purchase Successfull');
    } catch (e) {
      notify('danger', (e as Error).message);
    }
  }

  async fetchGLobalNftByPage() {
    console.log('fetch global by page');

    await this.fetchGlobalNftsList();
    const nfts = sortNfts(this.marketNftList, this.sortOrder);
    const min = Math.min((this.page + 1) * 6, nfts.length);
    const promises: Promise<IMetadata>[] = [];
    const nftSlice: IMarketNft[] = [];
    for (let i = this.page * 6; i < min; i++) {
      promises.push(fetchIpfs(nfts[i].tokenUri));
      nftSlice.push(nfts[i]);
    }
    const metadata: IMetadata[] = await Promise.all(promises);
    const nftsWithMetadata: IMarketNftWithMetadata[] = nftSlice.map(
      (nft, index): IMarketNftWithMetadata => ({
        ...nft,
        metadata: metadata[index],
      })
    );

    runInAction(() => {
      this.marketNftWithMetadata = nftsWithMetadata;
    });
  }

  async fetchUserlNfts() {
    console.log('fetch user nfts with metadata');

    await this.fetchUserNftsList();
    const promises = [];
    const nftSlice: IUserNft[] = [];
    for (let i = 0; i < this.userNftList.length; i++) {
      promises.push(fetchIpfs(this.userNftList[i].tokenUri));
      nftSlice.push(this.userNftList[i]);
    }
    const metadata = await Promise.all(promises);
    const nftsWithMetadata: IUserNftWithMetadata[] = nftSlice.map(
      (nft, index): IUserNftWithMetadata => ({
        ...nft,
        metadata: metadata[index],
      })
    );

    runInAction(() => {
      this.userNftWithMetadata = nftsWithMetadata;
    });
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
        notify('danger', 'Connection error');
      }
    } else notify('danger', 'Wallet not detected');
  }

  async fetchGlobalNftsList() {
    console.log('fetch global nft');
    console.log(this.marketNftList.length);

    const newNftCount = await this.turtisContract.methods.totalSupply().call();
    if (newNftCount !== this.marketNftList.length) {
      const nftsData: any[] = await this.marketContract.methods
        .fetchMarketItems()
        .call();
      const uri = await Promise.all(
        nftsData.map((nft) =>
          this.turtisContract.methods.tokenURI(nft.tokenId).call()
        )
      );
      runInAction(() => {
        this.marketNftList = nftsData.map((item, index) => ({
          price: parseFloat(
            this.web3.utils.fromWei(item.price.toString(), 'ether')
          ),
          owner: item.owner,
          seller: item.seller,
          sold: item.sold,
          tokenId: parseInt(item.tokenId.toString()),
          itemId: parseInt(item.itemId.toString()),
          tokenUri: uri[index],
        }));
      });
    }
  }

  async fetchUserNftsList() {
    console.log('fetch user nft');

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
