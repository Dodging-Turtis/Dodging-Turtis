import { observer } from 'mobx-react-lite';
import { storeAnnotation } from 'mobx/dist/internal';
import React from 'react';
import { useEffect, useState } from 'react';
import { useStore } from '../../mobx';
import NFT from '../nftcard';

const Store = observer(() => {
  const [page, setPage] = useState(1);
  const state = useStore();
  const nfts: INft[] = state.globalNfts;

  useEffect(() => {
    console.log('calling effetct');
    state.fetchGlobalNfts();
  }, [state]);

  const items =
    nfts.length > 0 ? (
      // nfts.map((nft: INft) => <NFT key={nft.tokenId} nft={nft} />)
      nfts.map((nft: INft) => {
        return (
          <div key={nft.tokenId}>
            {nft.owner}
            {nft.price}
            {nft.tokenId}
          </div>
        );
      })
    ) : (
      <div className='container-fluid position-absolute top-50 start-50 translate-middle'></div>
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
    </div>
  );
});

export default Store;
