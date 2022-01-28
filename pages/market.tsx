import { observer } from 'mobx-react-lite';
import { Order, useStore } from '../mobx';
import { useEffect, useState } from 'react';

import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Card from '../components/nftcard';

const Market = () => {
  const store = useStore();
  const [isLoading, setLoading] = useState(true);
  const nfts: IMarketNftWithMetadata[] = store.marketNftWithMetadata;

  const nextPage = () => {
    store.page++;
    store.fetchGLobalNftByPage();
  };

  useEffect(() => {
    console.log('effect called');

    setLoading(true);
    store.fetchGLobalNftByPage().then(() => setLoading(false));
  }, [store, store.accountAddress]);

  const cards = !isLoading ? (
    nfts.map((nft: IMarketNftWithMetadata) => (
      <Card turtle={nft} key={nft.tokenId} />
    ))
  ) : (
    <div className='container-fluid position-absolute top-50 start-50 translate-middle'>
      loading
    </div>
  );

  return (
    <div className='h-screen w-screen overflow-x-hidden font-primary'>
      <Navbar />
      <div className='bg-pattern w-full h-full lg:px-44 '>
        <input
          placeholder='Search'
          className='mt-10 p-2 w-full mx-auto border-2 rounded-md'></input>
        <h5 className='text-right m-1'>Sort By</h5>
        <div className='grid auto-cols-max md:grid-cols-3'>{cards}</div>
        <button onClick={() => store.connectToWallet()}>
          connect to wallet
        </button>
        <button onClick={() => store.mintNFT()}>mint nft</button>
        <button onClick={() => store.updateSortOrder(Order.OLDEST)}>
          sort
        </button>
        <button onClick={nextPage}>next</button>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Market);
