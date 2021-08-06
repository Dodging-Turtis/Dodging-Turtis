import React, { useContext, useEffect, useState } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import styles from '../styles/Game.module.css';
import GameScene from '../scenes/GameScene';
import { GameContext } from '../utils/web3';
import { useHistory } from 'react-router-dom';

const gameConfig = {
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
  const history = useHistory();
  const [init, setInit] = useState(false);
  const [ended, setEnded] = useState(false);
  const [game, setGame] = useState(null);

  const getInstance = () => {
    if (game.instance) {
      return Promise.resolve(game.instance);
    } else {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (game.instance) {
            clearInterval(interval);
            resolve(game.instance);
          }
        });
      }, 300);
    }
  };

  const endGame = (score, instance) => {
    if (score > localStorage.getItem('highScore')) {
      localStorage.setItem('highScore', score);
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
        history.push('/play');
      }
    }
  }, [state.loaded, init]);

  return (
    <IonPhaser game={game} initialize={init} className={styles.fullScreen} />
  );
};

export default Game;
