import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
import nftlistSlice from './features/nftlistSlice';
  
  export const store = configureStore({
    reducer: {
    // Reducers
    NFTlists: nftlistSlice,
    },
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
   >;