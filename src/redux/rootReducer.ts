import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import type { IRootState } from './store';
import type { AbiItem } from 'web3-utils';
import SmartContract from '../../truffle/abis/Turtis.json';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL ?? 'http://localhost:8085';
const NET_ID = 80001;

const initialState: IRootState = {
  web3: new Web3(RPC_URL),
  contract: null,
  walletConnected: false,
  accountName: null,
  accountAddress: null,
  nftCount: 0,
  userNftCount: 0,
  nftList: [],
  userNftList: [],
  highScore: 0,
  status: 'loading',
};

export const connectToWallet = createAsyncThunk(
  'state/connectToWallet',
  async (_, { getState }) => {
    const state = getState() as IRootState;
    let walletAddress = null;
    let walletConnected = false;
    let userNftCount = 0;

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        state.web3.setProvider(window.ethereum);
        walletAddress = (await state.web3.eth.getAccounts())[0];
        userNftCount = await state.contract?.methods
          .balanceOf(walletAddress)
          .call();
        const netId = await state.web3.eth.net.getId();
        if (netId !== NET_ID) alert('wrong network');
        else walletConnected = true;
      } catch (e) {
        console.error(e);
        alert('connection error');
      }
    } else alert('wallet not detected');

    return { walletAddress, walletConnected, userNftCount };
  }
);

export const initInfo = createAsyncThunk(
  'state/initInfo',
  async (_, { getState }) => {
    const state = getState() as IRootState;
    const address = SmartContract.networks[NET_ID].address;
    let nftCount = 0;
    let contract = null;

    try {
      contract = new state.web3.eth.Contract(
        SmartContract.abi as AbiItem[],
        address
      );
      nftCount = await contract.methods.totalSupply().call();
    } catch (e) {
      console.error(e);
    }

    return { contract, nftCount };
  }
);

const fetchNft = async (
  i: number,
  state: IRootState,
  page: string
): Promise<INft | null> => {
  try {
    const url = await state.contract?.methods.tokenURI(i).call();
    const price = parseFloat(
      state.web3.utils.fromWei(
        await state.contract?.methods.turtlesForSale(i).call(),
        'ether'
      )
    );
    const data = await (
      await fetch(url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/'))
    ).json();

    return {
      price,
      page,
      tokenId: i,
      attributes: data.attributes,
      url: data.image,
      name: data.name,
    };
  } catch (e) {
    console.error('metadata fetch failed for nft ' + i + 'with error ' + e);
    return null;
  }
};

export const fetchNftByPage = createAsyncThunk(
  'state/fetchNftByPage',
  async (page: number, { getState }) => {
    const state = getState() as IRootState;
    const promises: Promise<INft | null>[] = [];
    const count = Math.min(state.nftCount, page * 6);

    for (let i = state.nftList.length; i < count; i++)
      promises.push(fetchNft(i, state, 'store'));

    return [...(await Promise.all(promises))].flatMap((nft) =>
      nft ? [nft] : []
    );
  }
);

export const fetchUserNftByPage = createAsyncThunk(
  'state/fetchUserNftByPage',
  async (page: number, { getState }) => {
    const state = getState() as IRootState;
    const promises: Promise<INft | null>[] = [];
    const count = Math.min(state.userNftCount, page * 6);

    for (let i = state.userNftList.length; i < count; i++) {
      promises.push(
        (async (): Promise<INft | null> => {
          const id = await state.contract?.methods
            .tokenOfOwnerByIndex(state.accountAddress, i)
            .call();
          return await fetchNft(id, state, 'user');
        })()
      );
    }

    return [...(await Promise.all(promises))].flatMap((nft) =>
      nft ? [nft] : []
    );
  }
);

export const rootSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToWallet.fulfilled, (state, action) => {
      const { walletAddress, walletConnected, userNftCount } = action.payload;
      state.accountAddress = walletAddress ?? localStorage.getItem('address');
      state.walletConnected = walletConnected;
      state.userNftCount = userNftCount;
    });
    builder.addCase(initInfo.fulfilled, (state, action) => {
      const { contract, nftCount } = action.payload;
      state.contract = contract;
      state.nftCount = nftCount;
    });
    builder.addCase(fetchNftByPage.fulfilled, (state, action) => {
      const nfts = action.payload;
      state.nftList.push(...nfts);
    });
    builder.addCase(fetchUserNftByPage.fulfilled, (state, action) => {
      const nfts = action.payload;
      state.userNftList.push(...nfts);
    });
  },
});

export default rootSlice.reducer;
