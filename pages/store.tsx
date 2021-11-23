import React from 'react';
import { useEffect, useState } from 'react';
import NFT from '../src/components/nft';
import Load from '../src/components/load';
import { useAppDispatch, useAppSelector } from '../src/redux/store';
import { fetchNftByPage } from '../src/redux/rootReducer';

const Store = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const nfts = useAppSelector((state) =>
    state.nftList.filter((nft) => nft.tokenId <= page * 6)
  );

  useEffect(() => {
    dispatch(fetchNftByPage(page));
  }, [page, dispatch]);

  const items =
    nfts.length > 0 ? (
      nfts.map((nft: INft) => <NFT key={nft.tokenId} nft={nft} />)
    ) : (
      <div className='container-fluid position-absolute top-50 start-50 translate-middle'>
        <Load />
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
    </div>
  );
};

export default Store;
