import '../styles/Navbar.module.css';

function Navbar() {
  return (
    <div>
      <nav class='navbar navbar-light bg-light'>
        <div class='container-fluid'>
          <button type='button' class='btn btn-dark'>
            Connect to wallet
          </button>

          <button type='button' class='btn btn-dark'>
            Publish
          </button>

          <button
            style={{ color: '#35DF31' }}
            type='button'
            class='btn btn-dark'>
            Connected to Wallet
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
