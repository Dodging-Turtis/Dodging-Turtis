import React, { useEffect, useState } from 'react';
import 'phaser';
import { GameResizer } from '../src/utils/GameResizer';
import { BootScene } from '../src/scenes/BootScene';
import { GameScene } from '../src/scenes/GameScene';
import { AbstractScene } from '../src/scenes/AbstractScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  title: 'Dodging Turtis',
  banner: false,
  scale: {
    fullscreenTarget: 'app-root',
    mode: Phaser.Scale.NONE,
    width: 540,
    height: 960,
    autoRound: true,
  },
};

const addNewGame = (parent: HTMLDivElement) => {
  const newGame = new Phaser.Game({ ...config, parent });
  const gameResizer = new GameResizer(newGame);
  window.addEventListener('resize', () => {
    gameResizer.resize();
  });
  window.addEventListener('orientationchange', () => {
    // Added a time delay since it's observed that devicePixelRatio updates the next frame
    setTimeout(() => {
      gameResizer.resize();
    }, 1);
  });

  newGame.scene.add('boot', BootScene, true, { grs: gameResizer });
  newGame.scene.add('game', GameScene, false);

  // const startInterval = setInterval(() => {
    // if (newGame && newGame.scene && newGame.scene.scenes && newGame.scene.scenes[1]) {
      // clearInterval(startInterval);
      // (newGame.scene.scenes as AbstractScene[]).forEach((scene: AbstractScene) => {
      //   scene.grs = gameResizer;
      //   scene.attachHandlers();
      // });
      // newGame.scene.start('boot');
    // }
  // }, 50);

  return newGame;
}

const useGame = (
  containerRef: React.RefObject<HTMLDivElement>
): Phaser.Game | undefined => {
  const [game, setGame] = useState<Phaser.Game>();
  useEffect(() => {
    if (!game && containerRef.current) {
      const newGame = addNewGame(containerRef.current);
      setGame(newGame);
    }
    return () => {
      game?.destroy(true);
    };
  }, [containerRef, game]);
  return game;
};

export default useGame;
