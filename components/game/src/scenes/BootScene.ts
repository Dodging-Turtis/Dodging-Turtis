import { AbstractScene } from './AbstractScene';
import { AssetsPreloader } from '../utils/AssetPreloader';
import { AudioManager } from '../core/AudioManager';
import { IInitGameData } from '../cfg/interfaces/IInitGameData';
import { GameResizer } from '../utils/GameResizer';
import { CAM_CENTER } from '../cfg/constants/design-constants';

export class BootScene extends AbstractScene {
  assetsPreloader: AssetsPreloader;


  constructor() {
    super('boot');
    this.assetsPreloader = new AssetsPreloader(this);
    console.warn('boot');
  }

  preload(): void {
    // Load all loading bar related assets here assets here
    this.assetsPreloader.loadBootSceneAssets();
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

    this.showLogo();

    this.audioManager = new AudioManager(this);
    this.audioManager.initBootAudio();

    this.handleLoadingProgress();
    this.handleSceneExit();
    // To load main game assets
    this.assetsPreloader.loadGameSceneAssets(this.initGameData.turtleUrl);

    // create the loading bar
  }

  showLogo(): void {
    // const glow = this.add.image(CAM_CENTER.x, CAM_CENTER.y, 'logo');
    // glow.setTintFill(0xffffff);
    // glow.setScale(1.05);
    // glow.setAlpha(1);
    const logo = this.add.image(CAM_CENTER.x, CAM_CENTER.y, 'logo').setScale(2);
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
      this.turnOffResizeHandler();
      this.assetsPreloader.createAnimations();
      console.warn('drawCount', (this.renderer as Phaser.Renderer.Canvas.CanvasRenderer).drawCount);
      this.scene.start('game', { grs: this.grs, initGameData: this.initGameData });
    });
  }
}
