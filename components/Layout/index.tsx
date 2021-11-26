import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GameContext } from '../../src/utils/web3';

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: '',
    nfts: [],
    userNfts: [],
    selectedNFT: { image: '/assets/character.png', speed: 100, tokenId: -1 },
    loaded: false,
  });

  useEffect(() => {
    if (!state.loaded && router.asPath !== '/') {
      alert('wallet not connected');
      router.push('/');
    }
  }, [state.loaded, router]);

  return (
    <GameContext.Provider value={{ state, setState }}>
      <div>{children}</div>
    </GameContext.Provider>
  );
};

export default Layout;
