import '../styles/Navbar.module.css';

function Navbar() {
  return (
    <div>
      <nav className='navbar'>
        <div className='container-fluid'>
          <button type='button' className='btn btn-dark'>
            Connect to wallet
          </button>

          <button type='button' className='btn btn-dark'>
            Publish
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
