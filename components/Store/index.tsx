import React from 'react';
import { useEffect, useState } from 'react';
import NFT from '../NftCard';
import {
  useAppDispatch,
  useAppSelector,
  fetchNftByPage,
} from '../../src/redux';

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
};

export default Store;
