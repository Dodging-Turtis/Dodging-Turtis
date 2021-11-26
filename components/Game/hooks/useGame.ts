import React, { useEffect, useState } from 'react';
import { Game, Types, AUTO } from 'phaser';
import GameScene from '../scenes/GameScene';

const config: Types.Core.GameConfig = {
  width: '100%',
  height: '100%',
  type: AUTO,
  scene: [GameScene],
  physics: {
    default: 'arcade',
  },
};

const useGame = (
  containerRef: React.RefObject<HTMLDivElement>
): Game | undefined => {
  const [game, setGame] = useState<Game>();
  useEffect(() => {
    if (!game && containerRef.current) {
      const newGame = new Game({ ...config, parent: containerRef.current });
      setGame(newGame);
    }
    return () => {
      game?.destroy(true);
    };
  }, [containerRef, game]);
  return game;
};

export default useGame;
