import Footer from '../components/footer';
import Navbar from '../components/navbar';

function roadmap() {
  return (
    <div className=' container w-screen h-screen font-primary'>
      <Navbar />
      <div className='w-full h-full px-44 bg-pattern py-5 mx-auto'>
        {' '}
        Quaterly roadmap here
        <h1>Some key points for timeline</h1>
        <h1>Features addition</h1>
        <h1>Turtle coin launch</h1>
        <h1>Community events</h1>
      </div>

      <Footer />
    </div>
  );
}

export default roadmap;
