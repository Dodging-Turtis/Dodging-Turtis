import '../styles/Navbar.module.css';
import { useHistory } from 'react-router-dom';
import { GameContext } from '../utils/web3';
import { useContext } from 'react';

function Navbar() {
  const history = useHistory();
  const { state, setState } = useContext(GameContext);
  return (
    <div>
      <nav className='navbar'>
        <div className=' store  container-fluid' style={{ fontSize: '50px' }}>
          <i
            className='fas fa-store-alt '
            onClick={() => {
              history.push('/Store');
            }}></i>
          <i
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
                  history.push('/game');
                });
            }}></i>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
