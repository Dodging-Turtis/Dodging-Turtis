import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect, useState } from 'react';
import { useStore } from '../../mobx';

const Store = observer(() => {
  const state = useStore();
  const [page, setPage] = useState<number>(0);
  const [nfts, setNfts] = useState<any>([]);

  useEffect(() => {
    state.fetchUserNfts();
  }, [state, state.accountAddress]);

  useEffect(() => {
    state.getUserNftsByPage(page).then((userNfts) => {
      setNfts(userNfts);
    });
  }, [setNfts, state, state.userNftList, page]);

  const items =
    nfts.length > 0 ? (
      nfts.map((nft: INft, index: number) => {
        return (
          <div key={index}>
            <pre>{JSON.stringify(nft, null, 2)}</pre>
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
      <button onClick={() => state.connectToWallet()}>connect to wallet</button>
      <button onClick={() => state.mintNFT()}>mint nft</button>
    </div>
  );
});

export default Store;
