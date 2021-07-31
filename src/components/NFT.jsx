import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../utils/web3';

const NFT = ({ url }) => {
  const { state, setState } = useContext(GameContext);
  const [name, setName] = useState('turtle');
  const [image, setImage] = useState('/assets/character.png');
  // TODO: speed x 100
  const [speed, setSpeed] = useState(5);

  function nftClicked() {
    console.log(image);
    setState({ ...state, selectedNFT: { image, speed } });
  }

  useEffect(() => {
    fetch(url)
      .then((data) =>
        data === 'dummy'
          ? { name, image, attributes: [{ value: speed * 100 }] }
          : data.json()
      )
      .then((res) => {
        setName(res.name);
        setImage(res.image);
        setSpeed(parseFloat(res.attributes[0].value) / 100);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className='col-sm-6 col-lg-4 p-4' onClick={nftClicked}>
      <div className='card bg-light text-black'>
        <img src={image} className='card-img w-100' alt='abc' />
      </div>
    </div>
  );
};

export default NFT;
