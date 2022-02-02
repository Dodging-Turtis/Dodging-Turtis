import Image from 'next/dist/client/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

import avtar from '../../public/assets/website/avtar.webp';
library.add(fab);

function TeamCard() {
  const router = useRouter();
  return (
    <div className=' bg-greyish p-5 border-0 rounded-xl shadow-md shadow-dark w-fit'>
      <Image
        className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
        onClick={() => {
          router.push('/');
        }}
        src={avtar}
        alt='avtar'
        height={125}
        width={125}
      />
      <h1>Name</h1>
      <div className='w-full lg:inline-block mx-auto p-2 px-4 text-2xl text-center'>
        <ul>
          <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
            <FontAwesomeIcon icon={['fab', 'github']} />
          </li>
          <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
            <FontAwesomeIcon icon={['fab', 'linkedin']} />
          </li>
          <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
            <FontAwesomeIcon icon={faEnvelopeSquare} />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default TeamCard;
