import Navbar from '../components/navbar';
import Footer from '../components/footer';
import logo from '../public/assets/logo.png';
import devfolio from '../public/assets/website/thanks/devfolio_light.png';
import filecoin from '../public/assets/website/thanks/filecoin_light.png';
import polygon from '../public/assets/website/thanks/polygon_light.png';
import TeamCard from '../components/TeamCard';
import Image from 'next/image';

function Aboutus() {
  return (
    <div>
      <Navbar />
      <div className='bg-pattern w-full h-full flex flex-row lg:px-16 px-4  font-primary text-xl'>
        <div className='w-full mx-auto text-center py-5'>
          <Image
            className=' mx-auto w-full'
            src={logo}
            alt='Logo'
            height={150}
            width={150}
          />
          <div className='py-0'>
            <u>#About team and how we started this project</u>
            <br />
            <br />
            <h1 className='text-justify'>
              As they say all it takes is a extraordinary idea and a zeal to
              follow it. We are all passionate developers, we met in a
              ETHOdyssey hackathon 2020 organized by devfolio. we had lots of
              different ideas that we were excited about building but among
              those one common thing was we wanted to make something simple and
              entertaining for everyone, and what more entertaing there is then
              games. We wanted to make something fun that everyone can play,
              after thinking of many game ideas we came up with this. After
              winning the hackathon we continue to build on it and we were
              fortunate enough to get support from Polygon and Filecoin. It
              gives us immense pleasure to show the world what we have been
              developing for last few months. We assure you, we are working
              everday to launch this game for everyone on mainnet as soon as we
              can. If you would like to support us or you have something to say
              to us feel free to slide in any one of our DM&apos;s. We would
              love to hear from you!!
            </h1>
          </div>
          <div className='py-5'>
            <u>Team</u>
            <br /> <br />
            <div className='flex flex-row justify-around text-center'>
              <TeamCard />
            </div>
          </div>
          <div className='py-5'>
            <u>Contributors</u>
          </div>
          <div className='py-5'>
            A Special thanks to these Organizations for supporting us!!
            <br />
            <div className='flex lg:flex-row flex-col w-full lg:px-64 px-8 text-center justify-between'>
              <Image
                className=' m-3'
                src={devfolio}
                alt='Devfolio'
                width={150}
                height={75}
              />
              <Image
                className=' m-3'
                src={polygon}
                alt='Polygon'
                width={150}
                height={75}
              />
              <Image
                className=' m-3'
                src={filecoin}
                alt='Filecoin'
                width={150}
                height={75}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;
