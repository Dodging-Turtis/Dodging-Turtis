import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Web3 from 'web3';

import { GameContext } from '../utils/web3';
import SmartContract from '../abis/Turtis.json';
import '../styles/landing.css';

const Landing = () => {
  const { state, setState } = useContext(GameContext);
  const history = useHistory();

  const initWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      try {
        const web3 = new Web3(window.ethereum);
        const account = (await web3.eth.getAccounts())[0];
        console.log(account);
        const netId = await web3.eth.net.getId();
        const address = SmartContract.networks[netId].address;
        const contract = new web3.eth.Contract(SmartContract.abi, address);
        setState({ ...state, web3, contract, account, loaded: true });
      } catch (e) {
        alert(e);
      }
    } else {
      alert('web3 not detected');
    }
  };

  const loadWeb3 = () => {
    initWeb3().then(() => {
      history.push('/play');
    });
  };

  return (
    <div>
      <div className='container landing-page-div'>
        <h1 className='poster-text'>
          <b>Dodging</b> Turtis
        </h1>
        <h5>
          A simple game where you receive new characters if you reach new
          checkpoints which can further be sold on the NFT marketplace. To start
          the game, you will be given a free NFT which can’t be sold. You can
          also buy new characters from the marketplace
        </h5>
        <br></br>
        <br></br>
        <br></br>
        <button type='button' onClick={loadWeb3} className='btn btn-dark'>
          Connect to wallet
        </button>
      </div>
    </div>
  );
};

export default Landing;
