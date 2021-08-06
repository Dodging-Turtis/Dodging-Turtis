import '../styles/Background.css';
function Background() {
  return (
    <div className='front-page-bg'>
      <div className='image ' style={{ maxHeight: '500px', maxWidth: '400px' }}>
        <img
          className='card-img w-100 row align-items-start'
          src='/images/indpattern10.png'
        />
      </div>
      <div className='image ' style={{ maxHeight: '500px', maxWidth: '400px' }}>
        {' '}
        <img
          className='card-img w-100 row align-items-start'
          src='/images/indpattern10.png'
        />
      </div>
      <div className='image' style={{ maxHeight: '500px', maxWidth: '400px' }}>
        {' '}
        <img
          className='card-img w-100 row align-items-start'
          src='/images/indpattern10.png'
        />
      </div>
      <div className='image' style={{ maxHeight: '500px', maxWidth: '400px' }}>
        {' '}
        <img
          className='card-img w-100 row align-items-start'
          src='/images/indpattern10.png'
        />
      </div>
    </div>
  );
}

export default Background;
