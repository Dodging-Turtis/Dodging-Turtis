import { IInitGameData } from '../cfg/interfaces/IInitGameData';
import type { AudioManager } from '../core/AudioManager';
import { InputManager } from '../core/InputManager';
import type { GameResizer } from '../utils/GameResizer';

export abstract class AbstractScene extends Phaser.Scene {
  grs!: GameResizer;
  audioManager!: AudioManager;
  inputManager!: InputManager;

  initGameData!: IInitGameData;

  abstract resizeAndRepositionElements(): void;

  // gets called on each scene init automatically
  init(initData: { grs: GameResizer, initGameData: IInitGameData }): void {
    console.warn("init", initData);
    this.grs = initData.grs;
    this.initGameData = initData.initGameData;
    this.attachHandlers();
    this.grs.setCamera(this);
  }

  attachHandlers(): void {
    this.handleResize();
    this.attachErrorHandlers();
  }

  turnOffResizeHandler(): void {
    this.game.scale.off('custom-resize', this.resizeHandler, this);
  }

  private resizeHandler(): void {
    this.grs.setCamera(this);
    this.resizeAndRepositionElements();
  }

  private handleResize(): void {
    this.game.scale.on('custom-resize', this.resizeHandler, this);
  }

  private attachErrorHandlers(): void {
    this.load.once('loaderror', () => {
      this.load.reset();
      this.load.removeAllListeners();
      alert('file load error');
    });
  }
}
