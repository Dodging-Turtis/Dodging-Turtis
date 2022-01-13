import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect, useState } from 'react';
import { useStore } from '../../mobx';

const Store = observer(() => {
  const state = useStore();
  const nfts: INft[] = state.userNftList;

  useEffect(() => {
    console.log('calling effetct');
    state.fetchUserNfts();
  }, [state, state.accountAddress]);

  const fetchIpfs = async (url: string) => {
    url = url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
    const data = await fetch(url);
    console.log(await data.json());
  };

  const items =
    nfts.length > 0 ? (
      nfts.map(async (nft: INft) => {
        return (
          <div key={nft.tokenId}>
            id:{nft.tokenId}attributes:{await fetchIpfs(nft.tokenUri)}
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
      <button
        onClick={() => {
          state.connectToWallet();
        }}>
        connect to wallet
      </button>
      <button
        onClick={() => {
          state.mintNFT();
        }}>
        mint nft
      </button>
    </div>
  );
});

export default Store;
