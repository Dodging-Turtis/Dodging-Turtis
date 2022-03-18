import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../public/assets/logo.png';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../mobx';

const Navbar = () => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const state = useStore();

  return (
    <>
      <nav className='relative lg:max-h-16 flex flex-wrap items-center justify-between px-2 pt-1 mt-0 bg-white font-primary '>
        <div className='container mt-0 px-4 mx-auto flex flex-wrap items-center justify-between '>
          <div className='w-full mt-0 relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Image
              className='absolute -mt-10 cursor-pointer'
              src={logo}
              alt='Logo'
              height={150}
              width={150}
              onClick={() => {
                router.push('/');
              }}
            />

            <button
              className='text-black cursor-pointer text-xl leading-none px-3 pt-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center align-middle text-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id='example-navbar-danger'>
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto -pt-8 -mt-24 items-center'>
              <li className='nav-item px-3'>
                <button
                  className='rounded-full hover:brightness-105 text-right text-blue font-bold bg-purple text-white p-2 '
                  onClick={() => state.connectToWallet()}>
                  {state.walletConnected ? 'Connected' : 'Connect to wallet'}
                </button>
              </li>
              <li className='nav-item px-3'>
                <Link href='/market'>Shell Market</Link>
              </li>
              <li className='nav-item px-3'>
                <a href='#'>Leaderboard</a>
              </li>
              <li className='nav-item px-3'>
                <a href='#'>FAQ&apos;s</a>
              </li>
              <li className='nav-item px-3'>
                <Link href='/aboutus'>About</Link>
              </li>
              <li className='nav-item px-3'>
                <Link href='/signup'>Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default observer(Navbar);
