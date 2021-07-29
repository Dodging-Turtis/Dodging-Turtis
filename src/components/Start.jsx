import '../styles/Start.module.css';
function Start() {
  return (
    <div>
      <center>
        <div className='start'>
          <h4>
            <i>Best Score:</i>
          </h4>
          <div className='button'>
            <button type='button' class='btn btn-dark'>
              Play Now
            </button>
          </div>
          <div className='button'>
            <button type='button' class='btn btn-dark'>
              Leaderboard
            </button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Start;
