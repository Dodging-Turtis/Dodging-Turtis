import { useContext } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { GameContext } from '../../src/utils/web3';
import { AbiItem } from 'web3-utils';
import SmartContract from '../../truffle/abis/Turtis.json';

const Landing = () => {
  const { state, setState } = useContext(GameContext);
  const router = useRouter();

  const initWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      try {
        const web3 = new Web3(window.ethereum);
        const account = (await web3.eth.getAccounts())[0];
        const netId = await web3.eth.net.getId();
        if (netId !== 80001)
          alert('Wrong network, please switch to the Matic Mumbai testnet!');
        else {
          const address = SmartContract.networks[netId].address;
          const contract = new web3.eth.Contract(
            SmartContract.abi as AbiItem[],
            address
          );
          setState({
            ...state,
            web3,
            contract,
            account,
            highScore: '0',
            loaded: true,
          });
          router.push('/home');
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert('web3 not detected');
    }
  };

  return (
    <div>
      <div className='container-fluid landing-page-div'>
        <span className='dot'></span>
        <span className='dot'></span>
        <span className='big-dot'></span>

        <div className='front'>
          <h1 className='poster-text'>
            <b>Dodging</b> Turtis
          </h1>
          <h5>May the fastest turtle win</h5>
          <br></br>
          <br></br>
          <br></br>
          <button
            type='button'
            onClick={initWeb3}
            className='btn btn-dark'
            style={{ width: '200px' }}>
            Connect to wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
