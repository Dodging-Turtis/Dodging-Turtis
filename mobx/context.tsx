import { createContext, FC, useContext } from 'react';
import { GlobalStore } from './store';

const StoreContext = createContext<GlobalStore>({} as GlobalStore);

export const StoreProvider: FC = ({ children }) => (
  <StoreContext.Provider value={new GlobalStore()}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
