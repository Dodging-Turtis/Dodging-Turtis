import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useGame } from './hooks';
import { useStore } from '../../mobx';
import { notify } from '../../mobx/helpers';

const GameScreen = () => {
  const [ended, setEnded] = useState(false);
  const router = useRouter();
  const state = useStore();
  const parentEl = useRef<HTMLDivElement>(null);
  const { game, grs } = useGame(parentEl);

  const endGameCB = useCallback(
    (score: number, metersTravelled: number, choseToMint: boolean) => {
      if (state.walletConnected) {
        if (choseToMint) {
          state.mintNFT(score);
        }
      } else if (process.env.NODE_ENV === 'development') {
        console.log('end game cb is working but user not connected to wallet');
      }
    },
    [state]
  );

  const goHomeCB = useCallback(() => {
    router.push('/profile');
  }, [router]);

  const mintTurtisCB = useCallback(
    (score: number) => {
      state.mintNFT(score);
    },
    [state]
  );

  useEffect(() => {
    if (!state.walletConnected && process.env.NODE_ENV === 'production') {
      notify('danger', 'Wallet not connected');
      router.replace('/');
    }
  }, [state.walletConnected, router]);

  useEffect(() => {
    // if (state.loaded) {
    if (game && !ended) {
      console.log('starting game');
      game.scene.start('boot', {
        grs,
        initGameData: {
          highScore:
            process.env.NODE_ENV === 'development' && !state.walletConnected
              ? 250
              : state.highScore,
          endGameCB,
          mintTurtisCB,
          goHomeCB,
          initMetaData:
            process.env.NODE_ENV === 'development' && !state.walletConnected
              ? state.dummyUserNftWithMetadata
              : state.userNftWithMetadata,
        },
      });
    }
    if (ended) {
      console.log('rerouting');
      router.push('/home');
    }
    // }
  }, [game, state, ended, router, endGameCB, goHomeCB, mintTurtisCB, grs]);

  return (
    <>
      <div ref={parentEl} style={{ height: '100vh', overflow: 'hidden' }} />
      <div id='font-hack'>.</div>
    </>
  );
};

export default GameScreen;
