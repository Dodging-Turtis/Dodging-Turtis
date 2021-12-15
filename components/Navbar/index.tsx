import { useRouter } from 'next/router';
import { GameContext } from '../../src/utils/web3';
import { useContext, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const { state, setState } = useContext(GameContext);
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-white mb-3 font-primary'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <a
              className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black'
              href='#pablo'>
              Logo
            </a>
            <button
              className='text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <i className='fas fa-bars'></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id='example-navbar-danger'>
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='nav-item'>
                <button
                  className='fas fa-store-alt'
                  onClick={() => {
                    router.push('/store');
                  }}>
                  store
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='fas fa-play'
                  onClick={() => {
                    state.contract.methods
                      .userAddressToHighScore(state.account)
                      .call()
                      .then((highScore: string) => {
                        if (highScore.length === 0) highScore = '0';
                        setState({ ...state, highScore });
                        if (localStorage.getItem('highScore') == null)
                          localStorage.setItem('highScore', highScore);
                        router.push('/game');
                      });
                  }}>
                  play
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
