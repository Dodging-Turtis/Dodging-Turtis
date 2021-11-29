import 'phaser';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
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

  let resizeCB = () => {
    gameResizer.resize();
  }
  window.addEventListener('resize', resizeCB);

  let orientationCB = () => {
    // Added a time delay since it's observed that devicePixelRatio updates the next frame
    setTimeout(() => {
      gameResizer.resize();
    }, 1);
  }

  window.addEventListener('orientationchange', orientationCB);

  newGame.scene.add('boot', BootScene, false);
  newGame.scene.add('game', GameScene, false);

  return {
    newGame,
    resizeRemCB: () => {
      window.removeEventListener('resize', resizeCB);
    },
    orientationRemCB: () => {
      window.removeEventListener('orientationchange', orientationCB);
    },
    grs: gameResizer
  };
}

const useGame = (
  containerRef: React.RefObject<HTMLDivElement>
): { game: Phaser.Game | undefined, grs: GameResizer | undefined } => {
  const [game, setGame] = useState<Phaser.Game>();
  const resizeRemRef = useRef<Function>();
  const orientationRemRef = useRef<Function>();
  const grsRef = useRef<GameResizer>();

  useEffect(() => {
    if (containerRef.current && !game) {
      const {newGame, resizeRemCB, orientationRemCB, grs} = addNewGame(containerRef.current);
      resizeRemRef.current = resizeRemCB;
      orientationRemRef.current = orientationRemCB;
      grsRef.current = grs;
      setGame(newGame);
    }
    return () => {
      console.warn('remove game and listeners');
      game && game.destroy(true);
      resizeRemRef.current && resizeRemRef.current();
      orientationRemRef.current && orientationRemRef.current();
    };
  }, [containerRef]);
  return { game, grs: grsRef.current };
};

export default useGame;
