import { observer } from 'mobx-react-lite';
import { useStore } from '../../mobx';
import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import Card from '../nftcard';
import LoadingCard from './loadingcard';

const MarketLayout = () => {
  const store = useStore();
  const [isLoading, setLoading] = useState(true);
  const nfts: IMarketNftWithMetadata[] = store.marketNftWithMetadata;

  const fetchData = useCallback(() => {
    setLoading(true);
    store.fetchGLobalNftByPage().then(() => setLoading(false));
  }, [store]);

  const sortOrderhandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const newOrder = parseInt(e.target.value);
    if (newOrder != store.sortOrder) {
      store.sortOrder = newOrder;
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, store.page]);

  const cards = nfts.map((nft: IMarketNftWithMetadata) => (
    <Card turtle={nft} key={nft.tokenId} />
  ));

  const dummyCards = [...Array(6)].map((_, index) => (
    <LoadingCard key={index} />
  ));

  return (
    <div>
      <select value={store.sortOrder} onChange={sortOrderhandler}>
        <option value='0'>price low to high</option>
        <option value='1'>price high to low</option>
        <option value='2'>latest first</option>
        <option value='3'>oldest first</option>
      </select>
      <div className='h-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full'>
        {isLoading ? dummyCards : cards}
      </div>
      <div className='flex justify-center items-center'>
        <button
          onClick={() => store.page--}
          className='bg-whiteish p-2 m-1 rounded-lg'>
          previous
        </button>
        <button
          onClick={() => store.page++}
          className='bg-whiteish p-2 m-1 rounded-lg'>
          next
        </button>
      </div>
    </div>
  );
};

export default observer(MarketLayout);
