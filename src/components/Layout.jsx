import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GameContext } from '../utils/web3';

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

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
    if (!state.loaded && location.pathname !== '/') {
      alert('wallet not connected');
      history.push('/');
    }

    if (state.loaded) {
      state.contract.events.NewTurtleGenerated((err, event) => {
        if (event) alert('random turtle generated');
      });
    }
  }, [state.loaded]);

  return (
    <GameContext.Provider value={{ state, setState }}>
      <div>{children}</div>
    </GameContext.Provider>
  );
};

export default Layout;
