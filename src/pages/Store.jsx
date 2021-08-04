import React from 'react';
import { GameContext } from '../utils/web3';
import { useContext, useEffect } from 'react';
import NFT from '../components/NFT';

const Store = () => {
  const { state, setState } = useContext(GameContext);

  useEffect(() => {
    if (state.loaded) {
      loadNFT();
    }
  }, [state.loaded]);

  const loadNFT = async () => {
    const nfts = [];
    // TODO: only show owned nfts
    try {
      const supply = await state.contract.methods.totalSupply().call();
      console.log(supply);
      for (let i = 0; i < supply; i++) {
        const nft = await state.contract.methods.tokenByIndex(i).call();
        const price = state.web3.utils.fromWei(
          await state.contract.methods.turtlesForSale(nft).call(),
          'ether'
        );
        console.log('price:' + price);
        const url = await state.contract.methods.tokenURI(nft).call();
        nfts.push({ url, price, page: 'store', tokenId: nft });
      }
    } catch (e) {
      console.log('nft fetch error');
    }
    nfts.push({ url: 'dummy', price: 0, page: 'store', tokenId: -1 });
    setState({ ...state, nfts });
  };

  const items =
    state.nfts.length > 0 ? (
      state.nfts.map((nft) => <NFT key={nft.tokenId} nft={nft} />)
    ) : (
      <div>loading</div>
    );

  return (
    <div>
      <center>
        <div
          className='d-flex justify-content-start '
          style={{ flexWrap: 'wrap' }}>
          {items}
        </div>
      </center>
    </div>
  );
};

export default Store;
