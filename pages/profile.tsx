import Footer from '../components/footer';
import Navbar from '../components/navbar';
import ProfileCard from '../components/body/profilecard';
import avtar from '../public/assets/website/avtar.webp';
import Image from 'next/image';

function Profile() {
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
                <h1>Connected wallet address: 0x0000000000000000</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='py-8 w-full flex flex-row items-center justify-between'>
          <hr />
          <div>
            <button className='px-4 py-2 m-2 text-xl bg-lightblue border-0 rounded-2xl '>
              My turtis
            </button>
            <button className='px-4 py-2 m-2 text-xl bg-lightblue border-0 rounded-2xl '>
              My NFT shop
            </button>
          </div>
          <div>
            <button>Sort By</button>
          </div>
          <hr />
        </div>
        <div>
          <ProfileCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
