const LoadingCard = () => {
  return (
    <div className='bg-whiteish rounded-md py-6 px-4 space-y-4 flex flex-col'>
      <div className='bg-lightgrey animate-pulse py-6 rounded-md'></div>
      <div className='bg-lightgrey animate-pulse py-32 rounded-md'></div>
    </div>
  );
};

export default LoadingCard;
