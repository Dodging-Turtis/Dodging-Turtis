import Footer from '../components/footer';
import Navbar from '../components/Navbar';
import Cards from '../components/body/Cards';
function market() {
  return (
    <div className='h-screen w-screen overflow-x-hidden font-primary'>
      <Navbar />
      <div className='bg-pattern w-full h-full lg:px-44 '>
        <input
          placeholder='Search'
          className='mt-10 p-2 w-full mx-auto border-2 rounded-md'></input>
        <h5 className='text-right m-1'>Sort By</h5>
        <div>
          <Cards />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default market;
