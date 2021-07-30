import React, { useContext, useEffect, useRef, useState } from 'react';
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

  const endGame = (number, instance) => {
    if (number > 100) {
      // do web3 call
    }
    setEnded(true);
    setGame(null);
    setInit(false);
    instance.destroy(false, false);
  };

  if (localStorage.getItem('highScore') == null)
    localStorage.setItem('highScore', 0);

  useEffect(() => {
    if (state.loaded) {
      if (init) {
        getInstance().then((instance) => {
          instance.scene.scenes[0].events.emit('start-game', {
            url: '/assets/character.png',
            speed: 2.5,
            endGame,
          });
        });
      } else if (!ended) {
        setGame(Object.assign({}, gameConfig));
        setInit(true);
      }
      if (ended) {
        history.push('/play');
      }
    }
    return () => {};
  }, [state.loaded, init]);

  return (
    <IonPhaser game={game} initialize={init} className={styles.fullScreen} />
  );
};

export default Game;
