import { CAM_CENTER } from '../cfg/constants/design-constants';
import { LANDSCAPE_ORIENTATION_CONFIG } from '../cfg/constants/game-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class LandscapeOrientation extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private background!: Phaser.GameObjects.Rectangle;
  private image!: Phaser.GameObjects.Image;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.addBackground();
    this.addImage();
    this.setDepth(LANDSCAPE_ORIENTATION_CONFIG.depth);
    this.setVisible(false);
    this.addTouchHandler();
    this.scene.add.existing(this);
  }

  private addBackground() {
    const { width, height } = this.scene.grs.resizeDim;
    this.background = this.scene.add.rectangle(
      0,
      0,
      width,
      height,
      LANDSCAPE_ORIENTATION_CONFIG.screenColor
    );
    this.background.setOrigin(0.5);
    this.add(this.background);
  }

  private addTouchHandler() {
    this.background
      .setInteractive()
      .once('pointerdown', (pointer: any, x: any, y: any, event: Event) => {
        event.stopPropagation();
        console.warn('event', event);
      });
  }

  private addImage() {
    this.image = this.scene.add.image(0, 0, 'landscape-mode-white').setOrigin(0.5);
    this.image.setScale(0.75);
    this.add(this.image);
  }

  hideScreen(): void {
    this.setVisible(false);
  }

  showScreen(): void {
    this.setVisible(true);
  }

  resizeAndRepositionElements(): void {
    this.background.setDisplaySize(
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height
    );
  }
}
