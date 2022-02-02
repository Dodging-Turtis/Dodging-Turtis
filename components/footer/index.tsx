import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

library.add(fab);

const Footer = () => {
  return (
    <div className='w-full container flex flex-col h-64 pt-5 pb-5 font-primary'>
      <div className='w-full mx-auto'>
        <div className='lg:pl-20 lg:w-1/2 w-full inline-block mx-auto align-middle'>
          <table className='text-left mx-auto table-auto'>
            <tr>
              <td className='p-4'>
                <Link href='/profile'>My Profile</Link>
              </td>
              <td className='p-4'>
                <a href='#'>FAQs</a>
              </td>
              <td className='p-4'>
                <Link href='/aboutus'>About us</Link>
              </td>
            </tr>
            <tr>
              <td className='p-4'>
                <Link href='/market'>Market</Link>
              </td>
              <td className='p-4'>
                <Link href='#'>Community</Link>
              </td>
              <td className='p-4'>
                <Link href='/roadmap'>Roadmap</Link>
              </td>
            </tr>
            <tr>
              <td className='p-4' colSpan={3}>
                <Link href='https://github.com/Dodging-Turtis'>
                  For Developers
                </Link>
              </td>
            </tr>
          </table>
        </div>
        <div className='lg:w-1/2 w-full lg:inline-block mx-auto p-2 px-4 text-2xl text-center'>
          <ul>
            <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
              <a href='https://discord.gg/MTFPH8UU2Q'>
                <FontAwesomeIcon icon={['fab', 'discord']} />
              </a>
            </li>
            <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </li>
            <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </li>
            <li className='inline-block px-2 hover:scale-110 hover:brightness-105 cursor-pointer'>
              <a href='mailto:dodgingturtis@gmail.com'>
                <FontAwesomeIcon icon={faEnvelopeSquare} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='mx-auto mb-auto text-center'>
        <h1 className='inline-block p-2'>
          <a href='#'>Terms of use</a>
        </h1>
        <h1 className='inline-block p-2'>
          {' '}
          <a href='#'>Privacy Policy</a>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
