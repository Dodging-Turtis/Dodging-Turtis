import { AbstractScene } from './AbstractScene';
import { AssetsPreloader } from '../utils/AssetPreloader';
import { AudioManager } from '../core/AudioManager';
import { IDataConfig } from '../cfg/interfaces/IDataConfig';

export class BootScene extends AbstractScene {
  assetsPreloader: AssetsPreloader;

  dataConfig!: IDataConfig;

  constructor() {
    super('boot');
    this.assetsPreloader = new AssetsPreloader(this);
    console.warn('boot');
  }

  preload(): void {
    // Load all loading bar related assets here assets here
    this.assetsPreloader.loadBootSceneAssets();
    this.events.once('start-game', ({ turtleUrl, playerSpeed, endGameCB }: { [key: string]: any }) => {
      console.warn('config received', turtleUrl);
      this.loadTurtle(turtleUrl);
      this.dataConfig = {
        playerSpeed,
        endGameCB
      }
    });
  }

  loadTurtle(turtleUrl: string) {
    this.load.path = '';
    this.load.image('pawn', turtleUrl);
    this.load.start();
  }

  resizeAndRepositionElements(): void {
    //
  }

  create(): void {
    this.audioManager = new AudioManager(this);
    this.audioManager.initBootAudio();

    this.handleLoadingProgress();
    this.handleSceneExit();
    // To load main game assets
    this.assetsPreloader.loadGameSceneAssets();

    // create the loading bar
  }

  private handleLoadingProgress(): void {
    this.load.on('progress', (percentage: number) => {
      console.warn('percentage', percentage);
      // this.updateLoadingBar(percentage);
    });
  }

  // private updateLoadingBar(percentage: number): void {
  //   console.warn('percentage', percentage);
  // }

  private handleSceneExit(): void {
    this.load.on('complete', () => {
      if (!!this.dataConfig) {
        this.turnOffResizeHandler();
        this.assetsPreloader.createAnimations();
        this.scene.start('game', { grs: this.grs, dataConfig: this.dataConfig });
      }
    });
  }
}
