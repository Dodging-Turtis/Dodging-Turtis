import Image from 'next/image';
import { observer } from 'mobx-react-lite';

import avtar from '../../public/assets/website/avtar.webp';

const Card = ({ turtle }: { turtle: IMarketNftWithMetadata }) => {
  return (
    <div className='container mx-auto w-64 lg:m-5 my-2 text-center p-3 border-0 rounded-lg bg-whiteish font-primary'>
      <div className='px-2 flex flex-row w-full justify-start items-center'>
        <div className='h-full my-0 lg:px-2 '>
          {' '}
          <Image
            className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
            src={avtar}
            alt='avtar'
            height={35}
            width={35}
          />
        </div>
        <div className=' my-0'>
          {' '}
          <div className='text-left text-xl py-0 my-0'>
            {turtle.metadata.name}
          </div>
          <div className=' text-sm text-left -mt-1 py-0'>username</div>
        </div>
      </div>
      <div className='bg-blue w-cover border-0 rounded-lg'>
        <Image
          className='pt-5 mx-auto'
          src={turtle.metadata.image}
          blurDataURL='/assets/TurtlePlaceholder.png'
          placeholder='blur'
          alt='placeholder'
          width={220}
          height={240}
        />
        <button className='px-3 py-1 mb-2 mx-auto text-center bg-whiteish hover:scale-105 hover:brightness-105 rounded-full'>
          {turtle.price} MATIC
        </button>
      </div>
      <div className='text-xl w-full flex flex-row flex-wrap justify-center'>
        {turtle.metadata.attributes.map((attr) => (
          <div className='px-2' key={attr.trait_type}>
            {attr.trait_type}: {attr.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Card);