import '../styles/Footer.css';

function Footer() {
  return (
    <div className='container-fluid position-fixed bottom-0 start-50 translate-middle-x footer'>
      <div className='row'>
        <div className='col-10'>
          <h4></h4>
          <h4>
            Despite what most people believe, turtles can never come out of
            their shells.
          </h4>
        </div>
        <div className='col-2'>
          <h2 style={{ color: '#242d3c' }}>Dodging Turtis</h2>
        </div>
        <center>
          <div className='col-12'>Made with 🖤 by DTech</div>
        </center>
      </div>
    </div>
  );
}

export default Footer;
