import { CAM_CENTER } from '../cfg/constants/design-constants';
import { BG_COLOR } from '../cfg/constants/game-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export class Background extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  background!: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    // this.addGradientBackground();
    this.addRectBackground();
    // this.addBackground();
    this.scene.add.existing(this);
  }

  private addBackground(): void {
    this.background = this.scene.add.image(0, 0, 'bg');
    this.background.setDisplaySize(
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height
    );
    this.background.setOrigin(0.5);
    this.add(this.background);
  }

  private addRectBackground(): void {
    this.background = this.scene.add.rectangle(
      0,
      0,
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height,
      BG_COLOR
    );
    this.background.setOrigin(0.5);
    this.add(this.background);
  }

  private addGradientBackground(): void {
    let { width, height } = this.scene.grs.resizeDim;

    const canvasTexture = this.scene.textures.createCanvas('buttonTexture', width, height);
    const context = canvasTexture.getContext();
    const gradient = context.createLinearGradient(width * 0.5, 0, width * 0.5, height);
    gradient.addColorStop(0, '#696969');
    gradient.addColorStop(1, '#C0C0C0');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    // Below is required only when running the game in WEBGL
    canvasTexture.refresh();

    // this.add.image(10, 100, 'buttonTexture');

    this.background = this.scene.add.image(0, 0, 'buttonTexture');
    this.background.setOrigin(0.5);
    this.add(this.background);
  }

  resizeAndRepositionElements(): void {
    console.warn('resize');
    this.background.setDisplaySize(
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height
    );
  }
}
