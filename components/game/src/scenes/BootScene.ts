import { AbstractScene } from './AbstractScene';
import { AssetsPreloader } from '../utils/AssetPreloader';
import { AudioManager } from '../core/AudioManager';
import { IInitGameData } from '../cfg/interfaces/IInitGameData';
import { GameResizer } from '../utils/GameResizer';
import { CAM_CENTER } from '../cfg/constants/design-constants';
import { GAME_FONT } from '../cfg/constants/game-constants';

export class BootScene extends AbstractScene {
  assetsPreloader: AssetsPreloader;

  loadText!: Phaser.GameObjects.Text;


  constructor() {
    super('boot');
    this.assetsPreloader = new AssetsPreloader(this);
    console.warn('boot');
  }

  preload(): void {
    // Load all loading bar related assets here assets here
    this.addLoadText();
    this.assetsPreloader.loadBootSceneAssets();
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
    console.warn('init data', this.initGameData);
    this.assetsPreloader.loadGameSceneAssets(this.initGameData.initMetaData);

    // create the loading bar
  }

  showLogo(): void {
    // const glow = this.add.image(CAM_CENTER.x, CAM_CENTER.y, 'logo');
    // glow.setTintFill(0xffffff);
    // glow.setScale(1.05);
    // glow.setAlpha(1);
    const logo = this.add.image(CAM_CENTER.x, CAM_CENTER.y, 'logo').setScale(2);
  }

  private addLoadText(): void {
    const titleConfig = {
      fontFamily: GAME_FONT,
      fontSize: '36px',
      color: '#FFFFFF',
    }

    this.loadText = this.add.text(CAM_CENTER.x - 100, CAM_CENTER.y + 240, 'Loading: ', titleConfig).setAlign('center').setOrigin(0, 0.5);
  }

  private handleLoadingProgress(): void {
    this.load.on('progress', (percentage: number) => {
      this.loadText.text = `Loading: ${Math.round(percentage * 100)}`;
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
