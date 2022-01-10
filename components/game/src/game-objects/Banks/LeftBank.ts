import { CAM_CENTER } from '../../cfg/constants/design-constants';
import type { AbstractScene } from '../../scenes/AbstractScene';

export class LeftBank extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private extensions!: Array<Phaser.GameObjects.Image>;
  private banks: Array<Phaser.GameObjects.Image>;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.extensions = [];
    this.banks = [];
    this.addExtensions();
    this.addBanks();
    this.scene.add.existing(this);
  }

  private addExtensions() {
    const bankInitialStartY = 1; // position times below screen height
    const { width, height } = this.scene.grs.designDim;
    for (let i = 0; i < 3; ++i) {
      this.extensions[i] = this.scene.add.image(0, 0, 'fill_grass');
      this.extensions[i].x = -width * 0.5;
      if (i === 0) {
        this.extensions[i].y = height * bankInitialStartY;
      } else {
        this.extensions[i].y = this.extensions[i - 1].getTopCenter().y;
      }
      this.extensions[i].setOrigin(1, 1);
    }
    this.add(this.extensions);
  }

  private addBanks() {
    const bankInitialStartY = 1; // position times below screen height
    const { width, height } = this.scene.grs.designDim;
    for (let i = 0; i < 3; ++i) {
      this.banks[i] = this.scene.add.image(0, 0, 'left_bank_1');
      this.banks[i].x = -width * 0.5;
      if (i === 0) {
        this.banks[i].y = height * bankInitialStartY;
      } else {
        this.banks[i].y = this.banks[i - 1].getTopCenter().y;
      }
      this.banks[i].setOrigin(0, 1);
    }
    this.add(this.banks);
  }

  private extensionsScroll(speed: number) {
    const height = this.scene.grs.resizeDim.height;
    for (let i = 0; i < 3; ++i) {
      if (this.extensions[i].y > (height * 0.5) + this.extensions[i].height) {
        const previousIndex = (i === 0) ? this.extensions.length - 1 : i - 1;
        this.extensions[i].y = this.extensions[previousIndex].getTopCenter().y;
      }
      this.extensions[i].y += speed;
    }
  }

  private banksScroll(speed: number) {
    const height = this.scene.grs.resizeDim.height;
    for (let i = 0; i < 3; ++i) {
      if (this.banks[i].y > (height * 0.5) + this.banks[i].height) {
        const previousIndex = (i === 0) ? this.banks.length - 1 : i - 1;
        this.banks[i].y = this.banks[previousIndex].getTopCenter().y;
      }
      this.banks[i].y += speed;
    }
  }

  scroll(speed: number) {
    this.banksScroll(speed);
    this.extensionsScroll(speed);
  }
}
