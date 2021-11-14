import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (mid) => mid({ serializableCheck: false }),
});

export interface IRootState {
  web3: Web3;
  contract: Contract | null;
  walletConnected: boolean;
  accountName: string | null;
  accountAddress: string | null;
  nftCount: number;
  userNftCount: number;
  nftList: INft[];
  userNftList: INft[];
  highScore: number;
  status: string;
}

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
