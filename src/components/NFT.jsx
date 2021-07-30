const NFT = ({ url }) => {
  return (
    <div className='col-sm-6 col-lg-4 p-4'>
      <div className='card bg-light text-black'>
        <img src={url} className='card-img w-100' alt='abc' />
      </div>
    </div>
  );
};

export default NFT;
