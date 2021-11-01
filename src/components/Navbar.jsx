import { useRouter } from 'next/router';
import { GameContext } from '../utils/web3';
import { useContext } from 'react';

function Navbar() {
  const router = useRouter();
  const { state, setState } = useContext(GameContext);
  return (
    <div>
      <nav className='navbar'>
        <div className=' store  container-fluid' style={{ fontSize: '50px' }}>
          <button
            className='fas fa-store-alt '
            onClick={() => {
              router.push('/store');
            }}>
            store
          </button>
          <button
            className='fas fa-play'
            onClick={() => {
              state.contract.methods
                .userAddressToHighScore(state.account)
                .call()
                .then((highScore) => {
                  if (highScore.length === 0) highScore = '0';
                  setState({ ...state, highScore });
                  if (localStorage.getItem('highScore') == null)
                    localStorage.setItem('highScore', parseInt(highScore));
                  router.push('/game');
                });
            }}>
            play
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
