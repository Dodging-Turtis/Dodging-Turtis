import { CAM_CENTER } from '../cfg/constants/design-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export class Shore extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private leftShoreExtension!: Phaser.GameObjects.Rectangle;
  private leftShores: Array<Phaser.GameObjects.Image>;

  private rightShoreExtension!: Phaser.GameObjects.Rectangle;
  private rightShores: Array<Phaser.GameObjects.Image>;

  scollSpeed = 0.1;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.leftShores = [];
    this.rightShores = [];
    this.addLeftShoreExtension();
    this.addLeftShores();
    this.addRightShoreExtension();
    this.addRightShores();
    this.scene.add.existing(this);
  }

  private addLeftShoreExtension() {
    const { width, height } = this.scene.grs.designDim;
    let diffWidth = this.scene.grs.resizeDim.width - width;
    this.leftShoreExtension = this.scene.add.rectangle(
      -width * 0.5,
      0,
      diffWidth < 0 ? 0 : diffWidth,
      this.scene.grs.resizeDim.height,
      0xECDB8E
    );
    this.leftShoreExtension.setOrigin(1, 0.5);
    this.add(this.leftShoreExtension);
  }

  private addLeftShores() {
    const leftShoreInitialStartX = 1; // position times below screen height
    const { width, height } = this.scene.grs.designDim;
    for (let i = 0; i < 3; ++i) {
      this.leftShores[i] = this.scene.add.image(0, 0, 'beach');
      this.leftShores[i].x = -width * 0.5;
      if (i === 0) {
        this.leftShores[i].y = height * leftShoreInitialStartX;
      } else {
        this.leftShores[i].y = this.leftShores[i - 1].getTopCenter().y;
      }
      this.leftShores[i].setOrigin(0, 1);
    }
    this.add(this.leftShores);
  }

  private addRightShoreExtension() {
    const { width, height } = this.scene.grs.designDim;
    let diffWidth = this.scene.grs.resizeDim.width - width;
    this.rightShoreExtension = this.scene.add.rectangle(
      width * 0.5,
      0,
      diffWidth < 0 ? 0 : diffWidth,
      this.scene.grs.resizeDim.height,
      0xECDB8E
    );
    this.rightShoreExtension.setOrigin(0, 0.5);
    this.add(this.rightShoreExtension);
  }

  private addRightShores() {
    const rightShoreInitialStartX = 1.5; // position times below screen height
    const { width, height } = this.scene.grs.designDim;
    for (let i = 0; i < 3; ++i) {
      this.rightShores[i] = this.scene.add.image(0, 0, 'beach');
      this.rightShores[i].setFlipX(true);
      this.rightShores[i].x = width * 0.5;
      if (i === 0) {
        this.rightShores[i].y = height * rightShoreInitialStartX;
      } else {
        this.rightShores[i].y = this.rightShores[i - 1].getTopCenter().y;
      }
      this.rightShores[i].setOrigin(1, 1);
    }
    this.add(this.rightShores);
  }

  resizeAndRepositionElements() {
    const { width, height } = this.scene.grs.designDim;
    let diffWidth = this.scene.grs.resizeDim.width - width;
    console.warn('dff', diffWidth);
    if (diffWidth <= 0) {
      this.leftShoreExtension.setVisible(false);
      this.rightShoreExtension.setVisible(false);
    } else {
      this.leftShoreExtension.setVisible(true);
      this.rightShoreExtension.setVisible(true);
      this.leftShoreExtension.setDisplaySize(
        diffWidth,
        this.scene.grs.resizeDim.height
      );
      this.rightShoreExtension.setDisplaySize(
        diffWidth,
        this.scene.grs.resizeDim.height
      );
    }
  }

  private leftShoreScroll(speed: number) {
    const height = this.scene.grs.resizeDim.height; 
    for (let i = 0; i < 3; ++i) {
      if (this.leftShores[i].y > (height * 0.5) + this.leftShores[i].height) {
        const previousIndex = (i === 0) ? this.leftShores.length - 1 : i - 1;
        this.leftShores[i].y = this.leftShores[previousIndex].getTopCenter().y;
      }
      this.leftShores[i].y += speed;
    }
  }

  private rightShoreScroll(speed: number) {
    const height = this.scene.grs.resizeDim.height; 
    for (let i = 0; i < 3; ++i) {
      if (this.rightShores[i].y > (height * 0.5) + this.rightShores[i].height) {
        const previousIndex = (i === 0) ? this.rightShores.length - 1 : i - 1;
        this.rightShores[i].y = this.rightShores[previousIndex].getTopCenter().y;
      }
      this.rightShores[i].y += speed;
    }
  }

  scroll(speed: number) {
    this.leftShoreScroll(speed);
    this.rightShoreScroll(speed);
  }

  // update(delta: number) {
  //   this.scroll(delta * 0.1);
  // }
}
