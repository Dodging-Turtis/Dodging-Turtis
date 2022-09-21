import Navbar from '../components/navbar';
import Footer from '../components/footer';
import logo from '../public/assets/logo.png';
import devfolio from '../public/assets/website/thanks/devfolio_light.png';
import filecoin from '../public/assets/website/thanks/filecoin_light.png';
import polygon from '../public/assets/website/thanks/polygon_light.png';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

library.add(fab);

//Images

import Hardik from '../public/assets/Team/Hardik.png';
import Suryashankar from '../public/assets/Team/Suryashankar.jpg';
import Dinesh from '../public/assets/Team/Dinesh.jpg';

function Aboutus() {
  const router = useRouter();

  const TeamMembers = [
    {
      Name: 'Hardik Agarwal',
      img: { Hardik },
      links: {
        github: 'https://github.com/hardikag17/',
        linkedIn: 'https://www.linkedin.com/in/hardik-agarwal17/',
        mail: 'mailto:hardikag17@gmail.com',
      },
    },
    {
      Name: 'Suryashankar Das',
      img: { Suryashankar },
      links: {
        github: 'https://github.com/iamsdas',
        linkedIn: 'https://linkedin.com/in/iamsdas',
        mail: 'mailto:suryashankardas.2002@gmail.com',
      },
    },
    {
      Name: 'Dinesh BS',
      img: { Dinesh },
      links: {
        github: 'https://github.com/hardikag17/',
        linkedIn: 'https://www.linkedin.com/in/hardik-agarwal17/',
        mail: 'mailto:hardikag17@gmail.com',
      },
    },
  ];

  const Contributors = [
    {
      Name: 'Quitalizner',
      links: {
        github: 'https://github.com/Quitalizner',
        mail: 'mailto:quitalizner@gmail.com',
      },
    },
    {
      Name: 'Rohit Baniya',
      links: {
        mail: 'mailto:suryashankardas.2002@gmail.com',
        LinkedIn: 'https://www.linkedin.com/in/krohitk/',
      },
    },
  ];

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
            <u>#how we started</u>
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
          <div className='py-10'>
            <u>#Team</u>
            <br /> <br />
            <div className='flex flex-row justify-around text-center'>
              {TeamMembers.map((i) => {
                return (
                  <div
                    key={i.Name}
                    className=' bg-greyish p-5 border-0 rounded-xl shadow-md shadow-dark w-fit'>
                    {/* <Image
                      className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
                      onClick={() => {
                        router.push('/');
                      }}
                      src={i.img}
                      height={125}
                      width={125}
                      alt='avtar'
                    /> */}
                    <h1>{i.Name}</h1>
                    <div className='w-full lg:inline-block mx-auto p-2 px-4 text-2xl text-center'>
                      <ul>
                        <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
                          <a href={i.links.github}>
                            <FontAwesomeIcon icon={['fab', 'github']} />
                          </a>
                        </li>
                        <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
                          <a href={i.links.linkedIn}>
                            {' '}
                            <FontAwesomeIcon icon={['fab', 'linkedin']} />
                          </a>
                        </li>
                        <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
                          <a href={i.links.mail}>
                            <FontAwesomeIcon icon={faEnvelopeSquare} />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='py-10'>
            <u>#Contributors</u>
            <div className='flex flex-row justify-around text-center'>
              {Contributors.map((i) => {
                return (
                  <div
                    key={i.Name}
                    className=' bg-greyish p-5 border-0 rounded-xl shadow-md shadow-dark w-fit'>
                    {/* <Image
                      className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
                      onClick={() => {
                        router.push('/');
                      }}
                      src={i.img}
                      height={125}
                      width={125}
                      alt='avtar'
                    /> */}
                    <h1>{i.Name}</h1>
                    <div className='w-full lg:inline-block mx-auto p-2 px-4 text-2xl text-center'>
                      <ul>
                        <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
                          <a href={i.links.github}>
                            <FontAwesomeIcon icon={['fab', 'github']} />
                          </a>
                        </li>
                        <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
                          <a href={i.links.LinkedIn}>
                            {' '}
                            <FontAwesomeIcon icon={['fab', 'linkedin']} />
                          </a>
                        </li>
                        <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
                          <a href={i.links.mail}>
                            <FontAwesomeIcon icon={faEnvelopeSquare} />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='py-10'>
            A Special thanks to following Organizations for supporting us!!
            <br />
            <br />
            <div className='flex lg:flex-row flex-col w-full lg:px-64 px-8 text-center justify-between'>
              <Image
                className=' m-3'
                src={devfolio}
                alt='Devfolio'
                width={160}
                height={75}
              />
              <Image
                className=' m-3'
                src={polygon}
                alt='Polygon'
                width={160}
                height={75}
              />
              <Image
                className=' m-3'
                src={filecoin}
                alt='Filecoin'
                width={160}
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
