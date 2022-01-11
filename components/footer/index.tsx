import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

library.add(fab);

const Footer = () => {
  return (
    <div className='w-full container flex flex-col h-64 pt-5 pb-5 font-primary'>
      <div className='w-full mx-auto'>
        <div className='lg:pl-20 lg:w-1/2 w-full inline-block mx-auto align-middle'>
          <table className='text-left mx-auto table-auto'>
            <tr>
              <td className='p-4'>
                <a href='#'>My Profile</a>
              </td>
              <td className='p-4'>
                <a href='#'>FAQs</a>
              </td>
              <td className='p-4'>
                <a href='#'>About us</a>
              </td>
            </tr>
            <tr>
              <td className='p-4'>
                <a href='#'>Market</a>
              </td>
              <td className='p-4'>
                <a href='#'>Community</a>
              </td>
              <td className='p-4'>
                <a href='#'>Roadmap</a>
              </td>
            </tr>
            <tr>
              <td className='p-4'>
                <a href='#'>Player's Docs</a>
              </td>
              <td className='p-4'>
                <a href='#'>Team</a>
              </td>
              <td className='p-4'>
                <a href='#'>For Developers</a>
              </td>
            </tr>
          </table>
        </div>
        <div className='lg:w-1/2 w-full lg:inline-block mx-auto p-2 text-2xl text-center'>
          <ul>
            <li className='inline-block px-2'>
              <FontAwesomeIcon icon={['fab', 'discord']} />
            </li>
            <li className='inline-block px-2'>
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </li>
            <li className='inline-block px-2'>
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </li>
            <li className='inline-block px-2'>
              <FontAwesomeIcon icon={['fab', 'instagram']} />
            </li>
            <li className='inline-block px-2'>
              <FontAwesomeIcon icon={faEnvelopeSquare} />
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
