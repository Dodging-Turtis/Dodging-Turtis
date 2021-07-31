import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../utils/web3';
import '../styles/NFT.css';

const NFT = ({ nft: { url, price } }) => {
  const { state, setState } = useContext(GameContext);
  const [name, setName] = useState('turtle');
  const [image, setImage] = useState('/assets/character.png');
  // TODO: speed x 100
  const [speed, setSpeed] = useState(5);
  const [isShown, setIsShown] = useState(false);
  const isPublished = price > 0;

  function nftClicked() {
    console.log(image);
    setState({ ...state, selectedNFT: { image, speed } });
  }

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

  return (
    <div className='col-sm-6 col-lg-4 p-4' onClick={nftClicked}>
      <div className='card bg-light text-black'>
        <img src={image} className='card-img w-100' alt='abc' />
      </div>
      <div class='nft-text'>
        <button
          type='button'
          style={{
            width: '70px',
            height: '50px',
            margin: '5px',
            padding: '5px',
          }}
          className='btn btn-dark btn-sm'>
          Sell
        </button>
        <button
          type='button'
          style={{ width: '70px', height: '50px' }}
          className='btn btn-dark btn-sm'>
          Buy
        </button>
        <h6>Name: {name}</h6>
        <h6>Speed:{speed}</h6>
      </div>
    </div>
  );
};

export default NFT;
