import { useSession, signIn, signOut } from 'next-auth/react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import Image from 'next/dist/client/image';
import metamask from '../public/assets/website/metamask.svg';
import avtar from '../public/assets/website/avtar.webp';

library.add(fab);

function Signup() {
  const { data: session } = useSession();
  const [verified, notverified] = useState(0);

  if (session) {
    return (
      <>
        Authorized with {session.user.email} <br />
        <button onClick={() => signOut()}>Deauthorize</button>
      </>
    );
  }

  const wallet = (
    <div className='h-full w-full flex flex-row'>
      <div className='bg-whiteish w-2/5 h-cover text-center mt-2 mb-16 border border-whiteish rounded-xl mx-auto'>
        <h1 className='text-4xl font-bold text-blue pt-10'>Create Account</h1>
        <h5 className='px-16 pt-2 text-grey font-semibold'>
          Everyone needs metamask account to play this game. If you don't have
          it, please make one using this{' '}
          <a href='https://metamask.io/'>
            <u>link</u>
          </a>
          .
        </h5>
        <br />
        <div>
          <h1 className='p-2 m-2'>Connect to metamask*</h1>
          <Image
            className='hover:scale-110 hover:brightness-105 cursor-pointer'
            src={metamask}
            alt='metamask icon'
            height={100}
            width={100}
          />
        </div>
        <br />
        <button
          onClick={() => notverified(1)}
          className='px-8 py-4 m-2 text-xl bg-lightblue border-0 rounded-2xl hover:scale-105 hover:brightness-105 cursor-pointer '>
          Verify
        </button>
        <br />
        <h5 className='px-16 pt-2 text-grey font-semibold'>
          By signing up, you agree to our <u>Terms of Service</u> and{' '}
          <u>Privacy Policy</u>
        </h5>
      </div>
    </div>
  );

  const email = (
    <div className='h-full w-full flex flex-row'>
      <div className='bg-whiteish w-2/5 h-cover text-center mt-2 mb-16 border border-whiteish rounded-xl mx-auto'>
        <h1 className='text-4xl font-bold text-blue pt-10'>Create Account</h1>
        <h5 className='px-16 pt-2 text-grey font-semibold'>
          Your email address is only used to send you important updates. Your
          nickname is how other players will identify you.
        </h5>
        <br />
        <form>
          <label>Nickname*</label>
          <input
            placeholder='eg: darth_vadar'
            className='p-2 m-2'
            required></input>
          <br />
          <label className='px-5'>Add Avtar</label>
          <br />

          <label for='file-upload'>
            <Image
              className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
              src={avtar}
              alt='avtar'
              height={100}
              width={100}
            />
          </label>
          <input
            id='file-upload'
            className='hidden'
            type='file'
            accept='image/*'
          />
          <br />
          <label className='p-2 m-2'>Your email address</label>
          <input placeholder='Your email address' className='p-2 m-2'></input>
          <button
            className='px-8 py-2 m-2 text-xl bg-lightblue border-0 rounded-2xl hover:scale-105 hover:brightness-105 cursor-pointer '
            onClick={() => signIn()}>
            Verify
          </button>
        </form>

        {/* <div className='flex flex-col flex-wrap text-center py-2 text-3xl'> */}
        {/* <ul>
            <li className='inline-block px-5'>
              <FontAwesomeIcon icon={['fab', 'discord']} />
            </li>
            <li className='inline-block px-5'>
              <FontAwesomeIcon icon={['fab', 'google']} />
            </li>
          </ul> */}

        {/* </div> */}
        <br />
        <button className='px-8 py-4 m-2 text-xl bg-lightblue border-0 rounded-2xl hover:scale-105 hover:brightness-105 cursor-pointer '>
          Finish
        </button>

        <h5 className='px-16 pt-2 text-grey font-semibold'>
          By signing up, you agree to our <u>Terms of Service</u> and{' '}
          <u>Privacy Policy</u>
        </h5>
      </div>
    </div>
  );

  return (
    <div className='container w-screen h-screen overflow-x-hidden font-primary'>
      <Navbar />
      <div className='bg-pattern h-full w-full flex flex-col'>
        <div className='w-3/5 mx-auto text-center font-semibold text-red pt-2'>
          <h1>
            This game is in beta stage of development and currently running on
            testnet. By signing in you are going to be the first community
            users, we request you to give feedback on the form you will be
            getting on your mail in few days or by contacting us on any of our
            social platforms.{' '}
          </h1>
          <h1>
            Kindly note turtles you earn are just for testing purposes and not
            in any way viable.
          </h1>
        </div>

        {verified ? email : wallet}
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
