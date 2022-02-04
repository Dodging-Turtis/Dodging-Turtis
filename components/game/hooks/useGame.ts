import 'phaser';
import React, { useEffect, useRef, useState } from 'react';
import { GameResizer } from '../src/utils/GameResizer';
import { BootScene } from '../src/scenes/BootScene';
import { GameScene } from '../src/scenes/GameScene';
import { GPU } from '../../../lib/gpu-browser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  title: 'Dodging Turtis',
  banner: false,
  scale: {
    fullscreenTarget: 'app-root',
    mode: Phaser.Scale.NONE,
    width: 1920,
    height: 1080,
    autoRound: true,
  },
  clearBeforeRender: false,
  fps: {
    smoothStep: true,
  },
};

const runPerformanceTest = () => {
  const gpu = new GPU();

  const multiplyMatrix = gpu
    .createKernel(function (a: any, b: any) {
      let sum = 0;
      for (let i = 0; i < 512; i++) {
        // @ts-ignore
        sum += a[this.thread.y][i] * b[i][this.thread.x];
      }
      return sum;
    })
    .setOutput([512, 512]);

  const k = getRandomMatrix(512);
  const testStart = performance.now();
  let performanceMeasure = [];
  let minPerformance = 1000000000000;
  let sum2 = 0;
  for (let i = 0; i < 5; i++) {
    const start = performance.now();
    multiplyMatrix(k, k);
    const end = performance.now();
    if (end - testStart > 1500) {
      return 1500;
    }
    const currentPerformance = end - start;
    sum2 += currentPerformance;
    performanceMeasure.push(end - start);
    if (minPerformance > currentPerformance) {
      minPerformance = currentPerformance;
    }
    if (minPerformance <= 80) {
      console.log('PERFORMANCE: ' + minPerformance);
      return minPerformance;
    }
  }
  console.log('RUN', minPerformance);
  performanceMeasure = performanceMeasure.map((val) => {
    return val;
  });
  const min = Math.min(...performanceMeasure);
  const result =
    '----------------------------\nBEST: ' +
    min +
    '\nALL: ' +
    performanceMeasure +
    '\nWORST: ' +
    Math.max(...performanceMeasure) +
    '\nSUM: ' +
    sum2 +
    '\n----------------------';
  console.warn('RESULT: ' + result);
  return min;
};

const getRandomMatrix = (size: number) => {
  const result = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(Math.floor(Math.random() * 100) + 1);
    }
    result.push(row);
  }
  return result;
};

const getRendererAndDPR = () => {
  const performance = runPerformanceTest();
  let dpr = window.devicePixelRatio;
  let rendererType = Phaser.AUTO;
  if (performance <= 80) {
    console.log('High Performance! 0% quality reduction');
  } else if (performance <= 160) {
    console.log('Moderate Performance! 20% quality reduction');
    dpr *= 0.8;
  } else {
    console.log('Low Performance! Switched to Canvas Mode');
    rendererType = Phaser.CANVAS;
  }

  if (
    navigator &&
    (navigator as any).deviceMemory &&
    (navigator as any).deviceMemory <= 2.5
  ) {
    rendererType = Phaser.CANVAS;
  }

  return { rendererType, dpr };
};

const addNewGame = (parent: HTMLDivElement) => {
  const { rendererType, dpr } = getRendererAndDPR();
  const newGame = new Phaser.Game({ ...config, type: rendererType, parent });
  const gameResizer = new GameResizer(newGame, dpr);

  let resizeCB = () => {
    gameResizer.resize();
  };
  window.addEventListener('resize', resizeCB);

  let orientationCB = () => {
    // Added a time delay since it's observed that devicePixelRatio updates the next frame
    setTimeout(() => {
      gameResizer.resize();
    }, 1);
  };

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
    grs: gameResizer,
  };
};

const useGame = (
  containerRef: React.RefObject<HTMLDivElement>
): { game: Phaser.Game | undefined; grs: GameResizer | undefined } => {
  const [game, setGame] = useState<Phaser.Game>();
  const resizeRemRef = useRef<Function>();
  const orientationRemRef = useRef<Function>();
  const grsRef = useRef<GameResizer>();

  useEffect(() => {
    if (containerRef.current && !game) {
      const { newGame, resizeRemCB, orientationRemCB, grs } = addNewGame(
        containerRef.current
      );
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
  }, [containerRef, game]);
  return { game, grs: grsRef.current };
};

export default useGame;
