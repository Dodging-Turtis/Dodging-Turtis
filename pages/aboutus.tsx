import Navbar from '../components/navbar';
import Footer from '../components/footer';
import logo from '../public/assets/logo.png';
import Image from 'next/image';

function Aboutus() {
  return (
    <div className='w-screen h-screen font-primary'>
      <Navbar />
      <div className='bg-pattern w-full h-full flex flex-row lg:px-16 px-4 '>
        <div className='w-full mx-auto text-center py-5'>
          <Image
            className=' mx-auto w-full'
            src={logo}
            alt='Logo'
            height={150}
            width={150}
          />
          <div className='py-5'>
            <h1>
              <u>About game</u>
            </h1>
          </div>
          <div className='py-5'>
            <u>#About team and how we started this project</u>
            <h1>
              As they say all it takes is a extraordinary idea and a zeal to
              follow it. We are all passionate developers, we met in a
              ETHOdyssey hackathon 2020, we had lots of different ideas that we
              were excited about building but among those one common thing was
              we wanted to make something simple and entertaining for everyone,
              and what more entertaing thing there is then games. We thought of
              many simple game ideas but this idea us off as we thought of it as
              something that everyone would like to play. After winning the
              hackathon we continue to build on it and we were fortunate enough
              to get support from Polygon and Filecoin. It gives us immense
              pleasure to show the world what we have been developing for last
              some months. We assure you, we are working everday to launch this
              game for everyone as soon as we can. If you would like to support
              us or you have anything to say to us please find us in any of the
              given links. We would love to hear from you!!
            </h1>
          </div>
          <div className='py-5'>
            <u>Team</u>
          </div>
          <div className='py-5'>
            <u>Contributors</u>
          </div>
          <div className='py-5'>
            Special thanks to these Organizations for giving us this opportunity
            <br />
            logo
            <br />
            1. Polygon 2. Filecoin 3.Devfolio
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;
