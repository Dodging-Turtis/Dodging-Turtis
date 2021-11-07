import React from 'react';
import { GameContext } from '../src/utils/web3';
import { useContext, useEffect } from 'react';
import NFT from '../src/components/nft';
import Load from '../src/components/load';

const Store = () => {
  const { state, setState } = useContext(GameContext);

  useEffect(() => {
    if (state.loaded) {
      loadNfts();
    }
  }, [state.loaded]);

  const loadNftById = async (i: number) => {
    const nft = parseInt(await state.contract.methods.tokenByIndex(i).call());
    const price = state.web3.utils.fromWei(
      await state.contract.methods.turtlesForSale(nft).call(),
      'ether'
    );
    console.log('nft:' + nft);
    const url = await state.contract.methods.tokenURI(nft).call();
    setState((state: any) => ({
      ...state,
      nfts: [...state.nfts, { url, price, page: 'store', tokenId: nft }],
    }));
  };

  const loadNfts = () => {
    state.contract.methods
      .totalSupply()
      .call()
      .then((supply: number) => {
        console.log(supply);
        for (let i = 0; i < supply; i++) {
          loadNftById(i);
        }
      })
      .catch(() => {
        console.log('nft fetch error');
      });
  };

  const items =
    state.nfts.length > 0 ? (
      state.nfts.map((nft: INft) => <NFT key={nft.tokenId} nft={nft} />)
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
