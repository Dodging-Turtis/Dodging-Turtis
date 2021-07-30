import '../styles/Start.module.css';
import { useHistory } from 'react-router-dom';
import { GameContext } from '../utils/web3';
import { useContext, useEffect, useState } from 'react';
import NFT from '../components/NFT';

function Start() {
  const history = useHistory();
  const { state, setState } = useContext(GameContext);
  const idwithURL = new Map();

  useEffect(() => {
    if (state.loaded) {
      loadNFT();
    }
  }, [state.loaded, state.nfts.length]);

  const loadNFT = async () => {
    const nfts = [];
    // TODO: only show owned nfts
    const supply = await state.contract.methods.totalSupply().call();
    console.log(supply);
    for (let i = 0; i < supply; i++) {
      const nft = await state.contract.methods.tokenByIndex(i).call();
      const uri = await state.contract.methods.tokenURI(nft).call();
      nfts.push(uri);
      idwithURL.set(i, nfts[i]);
    }
    setState({ ...state, nfts });
  };

  const items = state.nfts.map((url, i) => <NFT key={i} url={url} />);

  return (
    <div>
      <center>
        <div className='start'>
          <h4>
            <i>Best Score:</i>
          </h4>
          <div className='button'>
            <button
              type='button'
              class='btn btn-dark'
              onClick={() => {
                history.push('/game');
              }}>
              Play Now
            </button>
          </div>
        </div>
        <div>{items}</div>
      </center>
    </div>
  );
}

export default Start;
