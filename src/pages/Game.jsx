import React from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import styles from '../styles/Game.module.css';
import GameScene from '../scenes/GameScene';

const Game = () => {
  const state = {
    initialize: true,
    game: {
      width: '100%',
      height: '100%',
      type: Phaser.AUTO,
      scene: [GameScene],
      physics: {
        default: 'arcade',
      },
    },
  };

  const { initialize, game } = state;
  return (
    <IonPhaser
      game={game}
      initialize={initialize}
      className={styles.fullScreen}
    />
  );
};

export default Game;
