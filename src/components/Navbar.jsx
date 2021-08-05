import '../styles/Navbar.module.css';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  return (
    <div>
      <nav className='navbar'>
        <div className=' store  container-fluid' style={{ fontSize: '50px' }}>
          <i
            class='fas fa-store-alt '
            onClick={() => {
              history.push('/Store');
            }}></i>

          <i
            class='fas fa-play'
            onClick={() => {
              history.push('/game');
            }}></i>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
