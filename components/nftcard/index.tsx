import Image from 'next/image';
import { observer } from 'mobx-react-lite';

const Card = ({ turtle }: { turtle: IMarketNftWithMetadata }) => {
  return (
    <div className='container w-72 text-center p-3 border-0 rounded-lg bg-whiteish font-primary'>
      <div className='text-xl px-2'>
        <h5 className='text-left text-2xl'>{turtle.metadata.name}</h5>
        <div className='flex flex-col'>
          <h6 className=' text-sm text-left py-1'>User image</h6>
        </div>
      </div>
      <div className='bg-blue w-cover border-0 rounded-lg'>
        <Image
          className='pt-5'
          src={turtle.metadata.image}
          blurDataURL='/assets/TurtlePlaceholder.png'
          placeholder='blur'
          alt='placeholder'
          width={220}
          height={240}
        />
        <button className='px-3 py-1 mb-2 mx-auto text-center bg-whiteish hover:bg-white rounded-full'>
          {turtle.price}
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
