import { observer } from 'mobx-react-lite';
import { Order, useStore } from '../../mobx';
import { useEffect, useState } from 'react';

import Card from '../nftcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import turtles from '../../public/assets/website/turtles.svg';
import Image from 'next/image';
import LoadingCard from '../marketlayout/loadingcard';
import Link from 'next/link';

function Body() {
  const Router = useRouter();
  const store = useStore();
  const [isLoading, setLoading] = useState(true);
  const nfts: IMarketNftWithMetadata[] = store.marketNftWithMetadata.slice(
    0,
    4
  );

  useEffect(() => {
    setLoading(true);
    store.fetchGLobalNftByPage().then(() => setLoading(false));
  }, [store, store.accountAddress]);

  const cards = !isLoading
    ? nfts.map((nft: IMarketNftWithMetadata) => (
        <Card turtle={nft} key={nft.tokenId} />
      ))
    : [...Array(4)].map((_, index) => <LoadingCard key={index} />);

  return (
    <div className='w-full flex flex-col font-primary '>
      <div className='bg-website_bg bg-cover bg-center'>
        {/* section-1 */}
        <div className='container w-2/4 text-center mx-auto lg:pt-72 pt-44'>
          <h1 className='font-bold sm:text-7xl text-5xl text-blue p-2'>
            Dodging Turtis
          </h1>
          <p className='p-2 text-lg'>- May the Fastest Turtle Win -</p>
          <div className='container w-full mx-auto pt-2'>
            <button
              onClick={() => Router.push('/profile')}
              className='bg-lightblue border hover:scale-110 hover:brightness-105 border-lightblue rounded-lg p-3 text-blue font-bold text-2xl text-center'>
              <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> Play Now
            </button>
          </div>
        </div>

        {/* section-2 */}
        <div className='w-full px-5 sm:px-0 sm:w-3/4 text-center mx-auto lg:pt-96 pt-44 lg:pb-96 pb-44 lg:mb-20'>
          <h1 className='font-bold text-4xl sm:text-6xl text-center text-blue p-2'>
            About
          </h1>
          <p className='lg:p-2 text-xl sm:text-2xl'>
            Dodging Turtis is a turtle themed NFT based &quot;Play to earn&quot;
            game. Every Player gets personalized turtles of a random breed using
            which they can play the game. Players train their turtles to gain a
            higher response speed. Gradually, As the game forwards Player
            requires a better response speed turtle to score more. Players can
            BUY/SELL their turtles anytime in the shell marketplace.
          </p>
        </div>
      </div>

      {/* section-3 */}
      <div className=' w-full px-16 text-left pt-16 bg-greyish'>
        <h1 className='font-bold text-4xl text-blue p-2'>Market</h1>
        <p className='p-2 text-xl'>
          Shell Market is a place where players get the chance to BUY/SELL their
          Turtle NFT collectables.
        </p>
        <div className='flex flex-col justify-center py-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8'>
            {cards}
          </div>
          <div className='w-full flex justify-end pt-4'>
            <span className=' hover:scale-110 hover:brightness-105 cursor-pointer'>
              <Link href='/market'>More</Link>
              <hr className='h-1 text-blue bg-blue mb-0.5' />
            </span>
          </div>
        </div>
      </div>

      {/* section-4 */}
      <div className='lg:text-left text-center flex flex-col-reverse lg:flex-row w-full px-16 pt-16  bg-pattern'>
        <div className='lg:w-2/3 w-full mx-auto'>
          <h1 className='font-bold text-4xl text-blue'>Gameplay</h1>
          <p className='py-2 text-xl'>
            Currently the gameplay video is in development.
          </p>

          <button className='w-full text-9xl text-center mx-auto py-10 text-lightblue'>
            <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
          </button>
        </div>
        <div className='mx-auto lg:w-1/3 w-full'>
          <Image
            src={turtles}
            alt='Homepage turtles'
            height={450}
            width={450}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(Body);
