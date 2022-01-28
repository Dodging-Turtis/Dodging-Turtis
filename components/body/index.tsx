import DummyCard from './dummycard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import turtles from '../../public/assets/website/turtles.svg';
import Image from 'next/image';

function Body() {
  return (
    <div className='w-full flex flex-col font-primary '>
      <div className='bg-website_bg bg-cover bg-center'>
        {/* section-1 */}
        <div className='container w-2/4 text-center mx-auto lg:pt-96 pt-16'>
          <h1 className='font-bold text-3xl text-blue p-2'>
            Title gonna be here
          </h1>
          <p className='p-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
            scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
            imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
            faucibus amet, et. Massa sit in iaculis ornare.
          </p>
          <div className='container w-full mx-auto pt-2'>
            <button
              onClick={() => Router.push('/game')}
              className='bg-lightblue border border-lightblue rounded-lg p-3 text-blue font-bold text-2xl text-center'>
              <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> Play Now
            </button>
          </div>
        </div>

        {/* section-2 */}
        <div className='container w-2/4 text-center mx-auto lg:pt-96 pt-16 lg:pb-96 pb-44 lg:mb-20'>
          <h1 className='font-bold text-3xl text-blue p-2'>
            Title gonna be here
          </h1>
          <p className='p-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
            scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
            imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
            faucibus amet, et. Massa sit in iaculis ornare.
          </p>
        </div>
      </div>

      {/* section-3 */}
      <div className='container w-full px-16 text-left pt-16 bg-greyish'>
        <h1 className='font-bold text-3xl text-blue p-2'>
          Title gonna be here
        </h1>
        <p className='p-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
          scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
          imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
          faucibus amet, et. Massa sit in iaculis ornare.
        </p>
        <div className='container flex flex-row w-full p-5'>
          <DummyCard />
        </div>
      </div>

      {/* section-4 */}
      <div className='container lg:text-left text-center flex flex-col-reverse lg:flex-row w-full px-16 pt-16  bg-pattern'>
        <div className='lg:w-2/3 w-full mx-auto'>
          <h1 className='font-bold text-3xl text-blue py-2'>
            Title gonna be here
          </h1>
          <p className='py-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
            scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
            imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
            faucibus amet, et. Massa sit in iaculis ornare.
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

export default Body;
