import React, { useEffect } from 'react';
import '../styles/landing.css';
import Web3 from 'web3';
import { useState } from 'react';

const Landing = () => {
  const [account, setAccount] = useState('');

  function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }

    const web3 = window.web3;

    const accounts = web3.eth.getAccounts();
    setAccount({ account: accounts[0] });
  }

  return (
    <div>
      <div className='container landing-page-div'>
        <h1>Dodge the logs</h1>
        <h5>
          A simple game where you receive new characters if you reach new
          checkpoints which can further be sold on the NFT marketplace. To start
          the game, you will be given a free NFT which can’t be sold. You can
          also buy new characters from the marketplace
        </h5>
        <br></br>
        <br></br>
        <br></br>
        <button type='button' onClick={loadWeb3} class='btn btn-dark'>
          Connect to wallet
        </button>
      </div>
    </div>
  );
};

export default Landing;
