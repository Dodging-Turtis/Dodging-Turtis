import Footer from '../components/footer';
import Navbar from '../components/navbar';
import MarketLayout from '../components/marketlayout';

const Market = () => {
  return (
    <div className='w-screen overflow-x-hidden font-primary'>
      <Navbar />
      <div className='bg-pattern w-full h-full lg:px-44 mx-auto block'>
        <input
          placeholder='Search'
          className='mt-10 p-2 w-full mx-auto border-2 rounded-md'></input>
        <MarketLayout />
      </div>
      <Footer />
    </div>
  );
};

export default Market;
