import { observer } from 'mobx-react-lite';
import { Order, useStore } from '../../mobx';
import { useEffect, useState } from 'react';
import Card from '../nftcard';
import LoaderView from './loaderview';

const MarketLayout = () => {
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

  const cards = nfts.map((nft: IMarketNftWithMetadata) => (
    <Card turtle={nft} key={nft.tokenId} />
  ));

  return isLoading ? (
    <LoaderView />
  ) : (
    <div>
      <div className='grid auto-cols-max md:grid-cols-3'>{cards}</div>
      <button onClick={() => store.connectToWallet()}>connect to wallet</button>
      <button onClick={() => store.mintNFT()}>mint nft</button>
      <button onClick={() => store.updateSortOrder(Order.OLDEST)}>sort</button>
      <button onClick={nextPage}>next</button>
    </div>
  );
};

export default observer(MarketLayout);
