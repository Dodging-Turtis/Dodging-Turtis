import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../utils/web3';
import '../styles/NFT.css';

const NFT = ({ nft: { url, price, page, tokenId } }) => {
  const { state, setState } = useContext(GameContext);
  const [name, setName] = useState('Default Turtle');
  const [image, setImage] = useState('/assets/character.png');
  // TODO: speed x 100
  const [speed, setSpeed] = useState(5);
  const [nftPrice, setNftPrice] = useState(price);

  const nftClicked = () => {
    if (page === 'main') {
      setState({ ...state, selectedNFT: { image, speed, tokenId } });
    }
  };

  const isPublished = () => {
    return nftPrice > 0;
  };

  useEffect(() => {
    if (url !== 'dummy') {
      let parsedUrl = url.replace('ipfs://', 'https://');
      parsedUrl = parsedUrl.replace(
        '/metadata.json',
        '.ipfs.cf-ipfs.com/metadata.json'
      );
      fetch(parsedUrl)
        .then((data) => data.json())
        .then((res) => {
          let parsedImage = res.image.replace('ipfs://', 'https://');
          parsedImage = parsedImage.replace(
            '/character.png',
            '.ipfs.cf-ipfs.com/character.png'
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
    if (tokenId == -1) {
      alert('cannot publish default nft!');
    } else if (price != null && price > 0) {
      const priceInWie = state.web3.utils.toWei(price, 'ether');
      try {
        await state.contract.methods
          .putUpTurtleForSale(tokenId, priceInWie)
          .send({
            from: state.account,
            gasPrice: state.web3.utils.toWei('50', 'Gwei'),
            gas: 60000,
          });
        setNftPrice(price);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const buyNft = () => {
    state.contract.methods.buyTurtle(tokenId).send({
      from: state.account,
      value: state.web3.utils.toWei(
        (parseFloat(price) + 0.0001).toString(),
        'ether'
      ),
      gasPrice: state.web3.utils.toWei('50', 'Gwei'),
      gas: 150000,
    });
  };

  const publishedComp = (
    <div className='nft-text col align-self-center'>
      {page === 'store' ? (
        <button type='button' className='btn btn-dark btn-sm' onClick={buyNft}>
          {price} MATIC
        </button>
      ) : (
        <button type='button' className='btn btn-dark btn-sm disabled'>
          Published
        </button>
      )}
    </div>
  );

  const notPublishedComp = (
    <div className='nft-text col align-self-center'>
      {page === 'store' ? (
        <button type='button' className='btn btn-dark btn-sm diasbled'>
          Not for sale
        </button>
      ) : (
        <button
          type='button'
          className='btn btn-dark btn-sm'
          onClick={publishNft}>
          Publish
        </button>
      )}
    </div>
  );

  const nftImage = (
    <div
      onClick={() => {
        nftClicked();
      }}>
      <img src={image} className='card-img w-100' alt='abc' />
    </div>
  );

  const selectedNftImage = (
    <div>
      <img
        src={image}
        className='card-img w-100'
        alt='abc'
        style={{ opacity: '0.3' }}
      />
      <div className='position-absolute top-50 start-50 translate-middle'>
        <b>
          <h3>selected</h3>
        </b>
      </div>
    </div>
  );

  return (
    <div
      className='col-sm-6 col-lg-4 p-4 '
      style={{ maxHeight: '400px', maxWidth: '350px', margin: '2%' }}>
      <div className='card bg-light text-black nft-card'>
        {tokenId == state.selectedNFT.tokenId ? selectedNftImage : nftImage}
        <center>
          <div
            style={{
              color: '#000',
            }}>
            <div
              style={{ fontSize: '25px', margin: '1%' }}
              class='d-flex justify-content-between'>
              <div class='p-2'>{name}</div>
              <div class='p-2'> {speed}</div>
            </div>
            <div>{isPublished() ? publishedComp : notPublishedComp}</div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default NFT;
