import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import styles from '../styles/Game.module.css';
import GameScene from '../scenes/GameScene';

const game = {
  width: '100%',
  height: '100%',
  type: Phaser.AUTO,
  scene: [GameScene],
  physics: {
    default: 'arcade',
  },
  instance: null,
};

function getInstance() {
  if (game.instance) {
    console.log('ready');
    return Promise.resolve(game.instance);
  } else {
    console.log('waiting');
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (game.instance) {
          clearInterval(interval);
          resolve(game.instance);
        }
      });
    }, 30);
  }
}

const Game = () => {
  const highScore = useRef(0);
  useEffect(() => {
    getInstance().then((instance) => {
      instance.scene.scenes[0].events.emit('start-game', {
        url: '/assets/character.png',
        highScore,
      });
    });
  }, []);
  return <IonPhaser game={game} className={styles.fullScreen} />;
};

export default Game;
