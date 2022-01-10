import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function Body() {
  return (
    <div className='w-full flex flex-col '>
      <div className='bg-gradient-to-b from-lightblue to-sand'>
        {/* section-1 */}
        <div className='container w-2/4 text-center mx-auto lg:pt-96 pt-16'>
          <h1 className='font-bold text-3xl text-blue p-2'>
            Title gonna be here
          </h1>
          <p className='p-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
            scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
            imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
            faucibus amet, et. Massa sit in iaculis ornare.
          </p>
          <div className='container w-full mx-auto pt-2'>
            <button className='bg-lightblue border border-lightblue rounded-lg p-3 text-blue font-bold text-2xl text-center'>
              <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> Play Now
            </button>
          </div>
        </div>

        {/* section-2 */}
        <div className='container w-2/4 text-center mx-auto lg:pt-96 pt-16 pb-16'>
          <h1 className='font-bold text-3xl text-blue p-2'>
            Title gonna be here
          </h1>
          <p className='p-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
            scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
            imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
            faucibus amet, et. Massa sit in iaculis ornare.
          </p>
        </div>
      </div>

      {/* section-3 */}
      <div className='container w-full px-16 text-left pt-16 bg-greyish'>
        <h1 className='font-bold text-3xl text-blue p-2'>
          Title gonna be here
        </h1>
        <p className='p-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
          scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
          imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
          faucibus amet, et. Massa sit in iaculis ornare.
        </p>
        <div>
          <h1 className='text-5xl mx-auto'>Cards</h1>
        </div>
      </div>

      {/* section-4 */}
      <div className='container w-2/3 px-16 text-left pt-16  bg-whiteish'>
        <h1 className='font-bold text-3xl text-blue p-2'>
          Title gonna be here
        </h1>
        <p className='p-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
          scelerisque pretium ullamcorper in scelerisque id amet quam. Vivamus
          imperdiet imperdiet urna gravida pellentesque duis. Felis fringilla
          faucibus amet, et. Massa sit in iaculis ornare.
        </p>

        <button className='text-8xl text-center mx-auto p-10 text-lightblue'>
          <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default Body;
