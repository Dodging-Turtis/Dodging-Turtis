import '../styles/Start.module.css';
import { useHistory } from 'react-router-dom';
import { GameContext } from '../utils/web3';
import { useContext, useEffect } from 'react';
import NFT from '../components/NFT';

function Start() {
  const history = useHistory();

  const { state, setState } = useContext(GameContext);

  let items = [];
  var nftArrayLength = state.nfts.length;
  var i;
  const idwithURL = new Map();

  console.log(nftArrayLength);

  useEffect(() => {
    if (state.loded) {
      loadNFT();
      for (i = 0; i < nftArrayLength; i++) {
        items.push(
          <NFT
            id={i}
            url={state.nfts[i]}
            onClick={(i) => {
              nftClicked(i);
            }}
          />
        );
        idwithURL.set(i, state.nfts[i]);
      }
    }
  }, [state.loded]);

  function nftClicked(number) {
    var url = idwithURL.get(number);
    setState({ ...state, selectedNFT: url });
  }

  const loadNFT = async () => {
    const nfts = [];
    const supply = await state.contract.methods.totalSupply().call();
    for (let i = 0; i < supply; i++) {
      const nft = await state.contract.methods.tokenByIndex(i).call();
      const uri = await state.contract.methods.tokenURI(nft).call();
      nfts.push(uri);
    }
    setState({ ...state, nfts });
  };

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
