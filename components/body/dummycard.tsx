import Image from 'next/image';
import Turtle from '../../public/assets/TurtlePlaceholder.png';

function DummyCard() {
  return (
    <div className='container w-72 text-center p-3 border-0 rounded-lg bg-whiteish font-primary'>
      <div className='text-xl px-2'>
        <h5 className='text-left text-2xl'>Turtle name</h5>
        <div className='flex flex-col'>
          <h6 className=' text-sm text-left py-1'>User image</h6>
        </div>
      </div>
      <div className='bg-blue w-cover border-0 rounded-lg'>
        <Image
          className='pt-5'
          src={Turtle}
          alt='placeholder'
          width={220}
          height={240}
        />
        <button className='px-3 py-1 mb-2 mx-auto text-center bg-whiteish hover:bg-white rounded-full'>
          logo Price MATIC
        </button>
      </div>
      <div className='text-xl w-full flex flex-row flex-wrap justify-center'>
        <div className='px-2'>Attribute 1</div>
        <div className='px-2'>Attribute 2</div>
        <div className='px-2'>Attribute 3</div>
        <div className='px-2'>Attribute 4</div>
      </div>
    </div>
  );
}

export default DummyCard;
