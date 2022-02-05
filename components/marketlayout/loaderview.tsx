const LoaderView = () => {
  const loadingCard = (
    <div className='bg-whiteish rounded-md py-6 px-4 space-y-4 flex flex-col'>
      <div className='bg-lightgrey animate-pulse py-6 rounded-md'></div>
      <div className='bg-lightgrey animate-pulse py-32 rounded-md'></div>
    </div>
  );

  return (
    <div className='h-full p-8 grid grid-cols-2 md:grid-cols-3 gap-10 w-full'>
      {loadingCard}
      {loadingCard}
      {loadingCard}
      {loadingCard}
      {loadingCard}
      {loadingCard}
    </div>
  );
};

export default LoaderView;
