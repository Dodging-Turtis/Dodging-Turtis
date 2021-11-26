import dynamic, { noSSR } from 'next/dynamic';

const GameScreen = dynamic(() => import('../components/Game'), { ssr: false });

const Game = () => {
  return GameScreen;
};

export default Game;
