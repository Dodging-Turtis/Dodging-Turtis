import '../styles/Start.module.css';
import { useHistory } from 'react-router-dom';
import { GameContext } from '../utils/web3';
import { useContext, useEffect } from 'react';
import NFT from '../components/NFT';

function Start() {
  const history = useHistory();
  const { state, setState } = useContext(GameContext);

  useEffect(() => {
    if (state.loaded) {
      loadNFT();
    }
  }, [state.loaded, state.nfts.length]);

  const loadNFT = async () => {
    const nfts = [];
    // TODO: only show owned nfts
    try {
      const supply = await state.contract.methods.totalSupply().call();
      console.log(supply);
      for (let i = 0; i < supply; i++) {
        const nft = await state.contract.methods.tokenByIndex(i).call();
        const price = await state.contract.methods.turtlesForSale(nft).call();
        console.log('price:' + price);
        const url = await state.contract.methods.tokenURI(nft).call();
        nfts.push({ url, price });
      }
    } catch (e) {
      console.log('nft fetch error');
      console.log(e);
    }
    nfts.push({ url: 'dummy', price: 0 });
    setState({ ...state, nfts });
  };

  const items =
    state.nfts.length > 1 ? (
      state.nfts.map((nft, i) => <NFT key={i} nft={nft} />)
    ) : (
      <div>loading</div>
    );

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
              className='btn btn-dark'
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
