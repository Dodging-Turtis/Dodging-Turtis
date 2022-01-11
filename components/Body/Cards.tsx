import Image from 'next/image';
import Turtle from '../../public/assets/TurtlePlaceholder.png';
function Cards() {
  return (
    <div className='w-1/4 container text-center p-2 border-2 rounded-lg'>
      <div className='text-xl'>User details</div>
      <Image
        className='bg-blue'
        src={Turtle}
        alt='placeholder'
        width={250}
        height={300}
      />
      <div className='text-xl'>Attributes</div>
    </div>
  );
}

export default Cards;
