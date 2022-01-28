import Image from 'next/image';
import Turtle from '../../public/assets/TurtlePlaceholder.png';
import Speed from '../../public/assets/website/speed.svg';

function ProfileCard() {
  return (
    <div className='container w-72 text-center p-3 border-0 rounded-lg bg-whiteish font-primary'>
      <div className='text-xl px-2'>
        <h5 className='text-left text-xl'>#Turtle name</h5>
      </div>
      <div className='bg-blue w-cover border-0 rounded-lg p-2'>
        <Image
          className='pt-5'
          src={Turtle}
          alt='placeholder'
          width={220}
          height={240}
        />
        <div className='px-1 py-1 w-2/4 h-10 mx-auto flex flex-row bg-whiteish hover:bg-white rounded-full items-center justify-center'>
          <Image alt='speed logo' src={Speed} width={50} height={50} />
          <h1 className=' inline-block pl-2'>Speed</h1>
        </div>
      </div>
      <div className='text-xl w-full flex flex-row flex-wrap justify-center py-1'>
        <div className='px-2'>Attribute 1</div>
        <div className=' px-2'>Attribute 2</div>
      </div>
      <div className=' flex flex-row items-center w-full justify-center'>
        <div className='px-2'>Put on sale</div>
        <div className='px-4 py-1 text-xl bg-lightblue border-0 rounded-2xl shadow-blue shadow-[0_5px_0px]'>
          Play
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
