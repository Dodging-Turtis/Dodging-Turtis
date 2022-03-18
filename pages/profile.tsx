import { useStore } from '../mobx';
import { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import avtar from '../public/assets/website/avtar.webp';
import Image from 'next/image';
import Card from '../components/body/profilecard';
import LoadingCard from '../components/marketlayout/loadingcard';
import { useRouter } from 'next/router';
import { notify } from '../mobx/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const store = useStore();
  const [isLoading, setLoading] = useState(true);
  const nfts: IUserNftWithMetadata[] = store.userNftWithMetadata;
  const history = useRouter();

  const fetchData = useCallback(() => {
    setLoading(true);
    store.fetchUserNfts().then(() => setLoading(false));
  }, [store]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!store.walletConnected) {
      notify('danger', 'Wallet not connected');
      history.replace('/');
    }
  }, [store.walletConnected, history]);

  const cards = nfts.map((nft: IUserNftWithMetadata) => (
    <Card turtle={nft} key={nft.tokenId} />
  ));

  const dummyCards = [...Array(6)].map((_, index) => (
    <LoadingCard key={index} />
  ));

  return (
    <div className='w-full h-full font-primary'>
      <Navbar />
      <div className='bg-greyish h-full w-full px-16 py-16 flex flex-col'>
        <div>
          <div className='flex flex-col w-full h-full'>
            <div className=' bg-lightblue h-36 w-full rounded-t-xl'></div>
            <div className='flex lg:flex-row flex-col w-full px-8'>
              <div className='-mt-8 text-center'>
                <Image
                  className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
                  src={avtar}
                  alt='avtar'
                  height={125}
                  width={125}
                />
              </div>
              <div className='px-8 py-4'>
                <h1 className=' font-bold text-3xl'>Nickname</h1>
                <h1>Connected wallet address: {store.accountAddress}</h1>
              </div>
              <div className='py-4 px-8'>
                <button
                  onClick={() => history.push('/game')}
                  className='bg-lightblue border hover:scale-110 hover:brightness-105 border-lightblue rounded-lg p-3 text-blue font-bold text-2xl text-center'>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='h-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12'>
          {isLoading ? dummyCards : cards}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default observer(Profile);
