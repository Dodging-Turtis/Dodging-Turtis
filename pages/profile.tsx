import Footer from '../components/footer';
import Navbar from '../components/navbar';

function Profile() {
  return (
    <div className='h-screen w-full'>
      <Navbar />
      <div className='bg-pattern h-full w-full'>
        <h1>This is profile details.</h1>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
