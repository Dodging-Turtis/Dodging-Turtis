import React from 'react';
import { GameContext } from '../utils/web3';
import { useContext, useEffect } from 'react';
import NFT from '../components/NFT';
import Load from '../components/Load';

const Store = () => {
  const { state, setState } = useContext(GameContext);

  useEffect(() => {
    if (state.loaded) {
      loadNfts();
    }
  }, [state.loaded]);

  const loadNftById = async (i) => {
    const nft = parseInt(await state.contract.methods.tokenByIndex(i).call());
    const price = state.web3.utils.fromWei(
      await state.contract.methods.turtlesForSale(nft).call(),
      'ether'
    );
    console.log('nft:' + nft);
    const url = await state.contract.methods.tokenURI(nft).call();
    setState((state) => ({
      ...state,
      nfts: [...state.nfts, { url, price, page: 'store', tokenId: nft }],
    }));
  };

  const loadNfts = () => {
    state.contract.methods
      .totalSupply()
      .call()
      .then((supply) => {
        console.log(supply);
        for (let i = 0; i < supply; i++) {
          loadNftById(i);
        }
      })
      .catch((e) => {
        console.log('nft fetch error');
      });
  };

  const items =
    state.nfts.length > 0 ? (
      state.nfts.map((nft) => <NFT key={nft.tokenId} nft={nft} />)
    ) : (
      <div className='container-fluid position-absolute top-50 start-50 translate-middle'>
        <center>
          <Load />
        </center>
      </div>
    );

  return (
    <div>
      <center>
        <div style={{ fontSize: '50px' }}>
          <i className='fas fa-store-alt '>Store</i>
        </div>
        <div
          className='d-flex justify-content-center '
          style={{ flexWrap: 'wrap' }}>
          {items}
        </div>
      </center>
    </div>
  );
};

export default Store;
