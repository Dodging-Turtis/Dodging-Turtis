import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect, useState } from 'react';
import { useStore, Order } from '../../mobx';

const Store = observer(() => {
  const store = useStore();
  const [isLoading, setLoading] = useState(true);
  const nfts: IMarketNftWithMetadata[] = store.marketNftWithMetadata;

  const nextPage = () => {
    store.page++;
    store.fetchGLobalNftByPage();
  };

  useEffect(() => {
    setLoading(true);
    store.fetchGLobalNftByPage().then(() => setLoading(false));
  }, [store, store.accountAddress]);

  const items = !isLoading ? (
    nfts.map((nft: IMarketNftWithMetadata, index: number) => {
      return (
        <div key={index}>
          <pre>{JSON.stringify(nft, null, 2)}</pre>
        </div>
      );
    })
  ) : (
    <div className='container-fluid position-absolute top-50 start-50 translate-middle'>
      loading
    </div>
  );

  return (
    <div>
      <div style={{ fontSize: '50px' }}>
        <i className='fas fa-store-alt '>Store</i>
      </div>
      <div
        className='d-flex justify-content-center '
        style={{ flexWrap: 'wrap' }}>
        {items}
      </div>
      <button onClick={() => store.connectToWallet()}>connect to wallet</button>
      <button onClick={() => store.mintNFT()}>mint nft</button>
      <button onClick={() => store.updateSortOrder(Order.OLDEST)}>sort</button>
      <button onClick={nextPage}>next</button>
    </div>
  );
});

export default Store;
