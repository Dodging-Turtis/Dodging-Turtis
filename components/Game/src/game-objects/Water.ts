import { CAM_CENTER } from '../cfg/constants/design-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export class Water extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  waterImages: Array<Phaser.GameObjects.Image> = [];

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.addImages();
    this.scene.add.existing(this);
  }

  private addImages(): void {
    const initialStartY = 1; // position times below screen height
    const { width, height } = this.scene.grs.designDim;
    for (let i = 0; i < 3; ++i) {
      this.waterImages[i] = this.scene.add.image(0, 0, 'water_1');
      if (i === 0) {
        this.waterImages[i].y = height * initialStartY;
      } else {
        this.waterImages[i].y = this.waterImages[i - 1].getTopCenter().y;
      }
      this.waterImages[i].setOrigin(0.5, 1);
    }
    this.add(this.waterImages);
  }

  private waterScroll(speed: number) {
    const height = this.scene.grs.resizeDim.height;
    for (let i = 0; i < 3; ++i) {
      if (this.waterImages[i].y > (height * 0.5) + this.waterImages[i].height) {
        const previousIndex = (i === 0) ? this.waterImages.length - 1 : i - 1;
        this.waterImages[i].y = this.waterImages[previousIndex].getTopCenter().y;
      }
      this.waterImages[i].y += speed;
    }
  }

  resizeAndRepositionElements() {

  }

  scroll(speed: number) {
    this.waterScroll(speed);
  }
}
