const LoadingCard = () => {
  return (
    <div className='bg-whiteish rounded-md p-3 px-4 space-y-2 flex flex-col w-2/3 mx-auto sm:w-full sm:mx-0 lg:mx-2'>
      <div className='flex justify-start items-center gap-3 w-full'>
        <div className='bg-lightgrey animate-pulse p-8 rounded-full'></div>
        <div className='space-y-1 flex-grow'>
          <div className='bg-lightgrey animate-pulse w-2/3 py-2 rounded-lg'></div>
          <div className='bg-lightgrey animate-pulse w-2/5 py-2 rounded-lg'></div>
        </div>
      </div>
      <div className='bg-lightgrey animate-pulse py-28 w-full rounded-md'></div>
      <div className='flex justify-center items-center'>
        <div className='bg-lightgrey animate-pulse py-4 w-1/3 rounded-full'></div>
      </div>
    </div>
  );
};

export default LoadingCard;
