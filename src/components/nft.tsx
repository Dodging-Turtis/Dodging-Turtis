import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../utils/web3';
import Load from './load';

const NFT = ({ nft: { url, price, page, tokenId } }: { nft: INft }) => {
  const { state, setState } = useContext(GameContext);
  const [name, setName] = useState('Default Turtle');
  const [image, setImage] = useState('/assets/character.png');
  const [speed, setSpeed] = useState(100);
  const [nftPrice, setNftPrice] = useState(price);
  const [loading, setLoading] = useState(true);

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
          setSpeed(parseFloat(res.attributes[0].value));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const publishNft = async () => {
    const input = prompt('Enter the Amount in MATIC');
    const price = input ?? '0';
    if (tokenId === -1) {
      alert('cannot publish default nft!');
    } else if (parseFloat(price) > 0) {
      const priceInWie = state.web3.utils.toWei(price, 'ether');
      try {
        await state.contract.methods
          .putUpTurtleForSale(tokenId, priceInWie)
          .send({
            from: state.account,
            gasPrice: state.web3.utils.toWei('50', 'Gwei'),
            gas: 60000,
          });
        setNftPrice(parseFloat(price));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const buyNft = () => {
    state.contract.methods.buyTurtle(tokenId).send({
      from: state.account,
      value: state.web3.utils.toWei((price + 0.0001).toString(), 'ether'),
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
      <img
        src={image}
        className='card-img w-100'
        alt='turtle'
        onLoad={() => {
          setLoading(false);
        }}
      />
    </div>
  );

  const selectedNftImage = (
    <div>
      <img
        src={image}
        className='card-img w-100'
        alt='abc'
        style={{ opacity: '0.3' }}
        onLoad={() => {
          setLoading(false);
        }}
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
      style={{
        maxHeight: '350px',
        maxWidth: '300px',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: '11%',
        marginTop: '0%',
      }}>
      <div
        className='position-relative top-50 start-50 translate-middle'
        style={{ display: loading ? 'block' : 'none', zIndex: 5 }}>
        <Load />
      </div>
      <div
        className='card bg-light text-black nft-card'
        style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {tokenId !== state.selectedNFT.tokenId || page === 'store'
          ? nftImage
          : selectedNftImage}
        <div
          style={{
            color: '#000',
          }}>
          <div
            style={{ fontSize: '25px', margin: '1%' }}
            className='d-flex justify-content-between'>
            <div className='p-2'>{name}</div>
            <div className='p-2'> {speed}</div>
          </div>
          <div>{isPublished() ? publishedComp : notPublishedComp}</div>
        </div>
      </div>
    </div>
  );
};

export default NFT;
