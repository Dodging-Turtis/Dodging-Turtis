import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function signin() {
  return (
    <div className='container w-screen h-screen overflow-x-hidden font-primary'>
      <Navbar />
      <div className='bg-pattern h-full w-full flex flex-row'>
        <div className='bg-whiteish w-2/5 h-cover text-center mt-16 mb-16 border border-whiteish rounded-xl mx-auto'>
          <h1 className='text-4xl font-bold text-blue pt-10'>Create Account</h1>
          <h5 className='px-16 pt-2 text-grey font-semibold'>
            Your email address is only used to send you important updates. Your
            nickname is how other players will identify you.
          </h5>
          <form>
            <label>Add Avtar</label>
            <br />
            <label className='p-2 m-2'>Your email address</label>
            <input
              placeholder='Your email address'
              className='p-2 m-2'
              required></input>
            <br />
            <label>Nickname</label>
            <input
              placeholder='Your email address'
              className='p-2 m-2'
              required></input>
            <br />
          </form>
          <button className='px-8 py-4 m-2 text-xl bg-lightblue border-0 rounded-2xl '>
            Continue
          </button>
          <br />
          <br />
          <h2 className='py-2'>I already have a account</h2>
          <h2 className='py-2'>OR</h2>
          <h2 className='py-2'>Sign up using</h2>
          <h5 className='px-16 pt-2 text-grey font-semibold'>
            By signing up, you agree to our <u>Terms of Service</u> and{' '}
            <u>Privacy Policy</u>
          </h5>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default signin;
