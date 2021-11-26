import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IonPhaser } from '@ion-phaser/react';
import Phaser from 'phaser';

import { GameContext } from '../src/utils/web3';
import GameScene from '../src/scenes/GameScene';

const gameConfig: any = {
  width: '100%',
  height: '100%',
  type: Phaser.AUTO,
  scene: [GameScene],
  physics: {
    default: 'arcade',
  },
  instance: null,
};

const Game = () => {
  const { state } = useContext(GameContext);
  const router = useRouter();
  const [init, setInit] = useState(false);
  const [ended, setEnded] = useState(false);
  const [game, setGame] = useState<any>(null);

  const getInstance = () => {
    if (game?.instance) {
      return Promise.resolve(game.instance);
    } else {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (game.instance) {
            clearInterval(interval);
            resolve(game.instance);
          }
        }, 300);
      });
    }
  };

  const endGame = (score: number, instance: any) => {
    if (score > parseFloat(localStorage.getItem('highScore') ?? '0')) {
      localStorage.setItem('highScore', '' + score);
    }

    const currHighScore = parseInt(state.highScore);

    if (score - currHighScore > 100) {
      alert(
        `New high score of ${score}!!\nA mystery character is being created for you.\nCheck in after a few minutes`
      );
      try {
        state.contract.methods.requestNewRandomTurtle(score.toString()).send({
          from: state.account,
          gasPrice: state.web3.utils.toWei('50', 'Gwei'),
          gas: 500000,
        });
      } catch (e) {
        console.log('random turtle error');
        console.log(e);
      }
    }

    setEnded(true);
    setGame(null);
    setInit(false);

    try {
      instance?.destroy(true, false);
    } catch (e) {
      console.log('destroy error');
      console.log(e);
    }
  };

  useEffect(() => {
    if (state.loaded) {
      if (init && !ended) {
        console.log('starting game');
        getInstance().then((instance) => {
          instance.scene.scenes[0].events.emit('start-game', {
            url: state.selectedNFT.image,
            speed: state.selectedNFT.speed / 100,
            endGame,
          });
        });
      }
      if (!ended && !init) {
        console.log('init game');
        setGame(Object.assign({}, gameConfig));
        setInit(true);
      }
      if (ended) {
        console.log('rerouting');
        router.push('/home');
      }
    }
  }, [state.loaded, init]);

  return (
    <IonPhaser
      game={game}
      initialize={init}
      style={{ innerHeight: '100vh', overflow: 'hidden' }}
    />
  );
};

export default Game;
