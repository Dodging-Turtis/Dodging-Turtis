import { createContext, FC, useContext } from 'react';
import { GlobalStore } from './store';

const StoreContext = createContext<GlobalStore>({} as GlobalStore);
const globalStore = new GlobalStore();

export const StoreProvider: FC = ({ children }) => (
  <StoreContext.Provider value={globalStore}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
