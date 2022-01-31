import Footer from '../components/footer';
import Navbar from '../components/navbar';

function roadmap() {
  return (
    <div className=' container w-screen h-screen font-primary'>
      <Navbar />
      <div className='w-full h-screen lg:px-96 bg-pattern py-5 mx-auto'>
        <iframe
          className=' w-full h-full mx-auto'
          src='https://docs.google.com/document/d/e/2PACX-1vSmvcS2FHe5XWIVMln2OUQ1sl6-KcHThXqoljNDBlFeXusK4WHL9iAyibtd7X-lJf0MOO-zqC2cyccK/pub?embedded=true'></iframe>
      </div>

      <Footer />
    </div>
  );
}

export default roadmap;
