import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import Image from 'next/dist/client/image';
import metamask from '../public/assets/website/metamask.svg';
import avtar from '../public/assets/website/avtar.webp';
import ShortUniqueId from 'short-unique-id';
import axios from 'axios';

library.add(fab);
const uid = new ShortUniqueId({ length: 10 });

function Signup() {
  const [verified, notverified] = useState(0);
  const [nickName, setNickName] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>();
  const [walletAddress, setWalletAddress] = useState<any>('temp');
  const [preview, setPreview] = useState(
    avtar || URL.createObjectURL(selectedImage)
  );

  useEffect(() => {
    if (!selectedImage) {
      setPreview(avtar);
      return;
    }

    const objectUrl: any = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const NewUser = async () => {
    //first we will check if the user already exists
    //Registering new user

    var fd = new FormData();
    fd.append('wallet_address', walletAddress);
    fd.append('image', selectedImage);
    fd.append('username', uid());
    fd.append('nickname', nickName);

    // fetch('http://localhost:9000/users', {
    //   method: 'POST',
    //   body: fd,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    axios
      .post(`http://localhost:9000/users`, fd)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log('Successfully regisetred a new user');
        } else {
          console.log('There was a problem');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const wallet = (
    <div className='h-full w-full flex flex-row'>
      <div className='bg-whiteish lg:w-2/5 w-11/12 h-cover text-center mt-2 mb-16 border border-whiteish rounded-xl mx-auto'>
        <h1 className='text-4xl font-bold text-blue pt-10'>Create Account</h1>
        <h5 className='px-16 pt-2 text-grey font-semibold'>
          Everyone needs metamask account to play this game. If you don&apos;t
          have it, please make one using this
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
      <div className='bg-whiteish lg:w-2/5 w-11/12 h-cover text-center mt-2 mb-16 border border-whiteish rounded-xl mx-auto'>
        <h1 className='text-4xl font-bold text-blue pt-10'>Create Account</h1>
        <br />
        <form>
          <label className='px-5'>Add Avtar</label>
          <br />

          <label htmlFor='file-upload'>
            <Image
              className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
              src={preview}
              alt='avtar'
              height={100}
              width={100}
            />
          </label>
          <input
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setSelectedImage(e.target.files[0]);
              }
            }}
            id='file-upload'
            className='hidden'
            type='file'
            accept='image/*'
            required
          />
          <br />
          <label>Nickname*</label>
          <input
            onChange={(e) => {
              setNickName(e.target?.value);
            }}
            value={nickName}
            placeholder='eg: darth_vadar'
            className='p-2 m-2'
            required></input>
          <br />
        </form>{' '}
        <br />
        <button
          onClick={NewUser}
          className='px-8 py-4 m-2 text-xl bg-lightblue border-0 rounded-2xl hover:scale-105 hover:brightness-105 cursor-pointer '>
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
        <div className='lg:w-3/5 w-4/5 mx-auto text-center font-semibold text-red pt-2'>
          <h1>
            This game is in beta stage of development and currently running on
            testnet. By signing in you are going to be the first community
            users, we request you to support us by joining our community
            platforms and sending us your mail id in the footer for getting
            regular updates about the development and team.{' '}
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
