import '../styles/Navbar.module.css';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  return (
    <div>
      <nav className='navbar'>
        <div className='container-fluid'>
          <button
            type='button'
            className='btn btn-dark'
            onClick={() => {
              history.push('/Store');
            }}>
            Store
          </button>

          <button
            type='button'
            className='btn btn-dark'
            onClick={() => {
              history.push('/game');
            }}>
            Play Now
          </button>

          <button
            style={{ color: '#35DF31' }}
            type='button'
            className='btn btn-dark'>
            Connected to Wallet
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
