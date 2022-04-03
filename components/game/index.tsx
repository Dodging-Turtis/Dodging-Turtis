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
      alert('game over');
      // const currHighScore = state.highScore;
      // if (score > parseFloat(localStorage.getItem('highScore') ?? '0'))
      //   localStorage.setItem('highScore', '' + score);
      // if (score - currHighScore > 100) {
      //   // alert(
      //   //   `New high score of ${score}!!\n
      //   //   A mystery character is being created for you.\n
      //   //   Check in after a few minutes`
      //   // );
      //   // try {
      //   //   state.contract.methods.requestNewRandomTurtle(score.toString()).send({
      //   //     from: state.account,
      //   //     gasPrice: state.web3.utils.toWei('50', 'Gwei'),
      //   //     gas: 500000,
      //   //   });
      //   // } catch (e) {
      //   //   console.error('random turtle error');
      //   //   console.error(e);
      //   // }
      // }
      // console.log(`game ended with score : ${score}`);
      // setEnded(true);
    },
    [state]
  );

  const goHomeCB = useCallback(
    () => {
      alert('go home');
    },
    [state]
  );

  const mintTurtisCB = useCallback(
    () => {
      alert('go home');
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
          highScore: 250,
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
