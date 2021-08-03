import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../utils/web3';
import '../styles/NFT.css';

const NFT = ({ nft: { url, price, page, tokenId } }) => {
  const { state, setState } = useContext(GameContext);
  const [name, setName] = useState('turtle');
  const [image, setImage] = useState('/assets/character.png');
  // TODO: speed x 100
  const [speed, setSpeed] = useState(5);
  const [nftPrice, setNftPrice] = useState(price);

  const nftClicked = () => {
    console.log(image);
    setState({ ...state, selectedNFT: { image, speed } });
  };

  console.log(page);

  const isPublished = () => {
    return nftPrice > 0;
  };

  useEffect(() => {
    if (url !== 'dummy') {
      const parsedUrl = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
      fetch(parsedUrl)
        .then((data) => data.json())
        .then((res) => {
          const parsedImage = res.image.replace(
            'ipfs://',
            'https://ipfs.io/ipfs/'
          );
          setName(res.name);
          setImage(parsedImage);
          setSpeed(parseFloat(res.attributes[0].value) / 100);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const publishNft = async () => {
    price = prompt('Enter the Amount in MATIC');
    if (price !== null) {
      const priceInWie = state.web3.utils.toWei(price, 'ether');
      try {
        state.contract.methods.putUpTurtleForSale(tokenId, priceInWie).send({
          from: state.account,
          gasPrice: state.web3.utils.toWei('0.01', 'ether'),
          gas: 2,
        });
      } catch (error) {
        console.log(error);
      }
      setNftPrice(price);
    }
  };

  function buyNft() {}

  const Store = (
    <div className='nft-text col align-self-center'>
      <button
        type='button'
        style={{
          width: '70px',
          height: '40px',
          margin: '5px',
          padding: '5px',
        }}
        className='btn btn-dark btn-sm'
        onClick={buyNft}>
        Buy
      </button>
    </div>
  );

  const publishedComp = (
    <div className='nft-text col align-self-center'>
      <h4>Published</h4>
    </div>
  );

  const notPublishedComp = (
    <div className='nft-text col align-self-center'>
      <button
        type='button'
        style={{
          width: '70px',
          height: '40px',
          margin: '5px',
          padding: '5px',
        }}
        className='btn btn-dark btn-sm'
        onClick={publishNft}>
        Publish
      </button>
      <h6>Name: {name}</h6>
      <h6>Speed:{speed}</h6>
    </div>
  );

  const check = <div>{isPublished() ? publishedComp : notPublishedComp}</div>;

  return (
    <div
      className='col-sm-6 col-lg-4 p-4'
      onClick={nftClicked}
      style={{ maxHeight: '500px', maxWidth: '350px' }}>
      <div className='card bg-light text-black '>
        <img src={image} className='card-img w-100' alt='abc' />
        {page === 'about' ? Store : check}
      </div>
    </div>
  );
};

export default NFT;
