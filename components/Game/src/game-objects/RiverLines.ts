import { CAM_CENTER } from '../cfg/constants/design-constants';
import { SHORE_WIDTH } from '../cfg/constants/game-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export class RiverLines extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  lightLines: Array<Phaser.GameObjects.Rectangle> = [];
  darkLines: Array<Phaser.GameObjects.Rectangle> = [];

  lineCount = 20;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x - scene.grs.designDim.width * 0.5 + SHORE_WIDTH, CAM_CENTER.y - scene.grs.resizeDim.height * 0.5);
    this.scene = scene;
    this.addLines();
    this.playFadeInOutTween();
    this.scene.add.existing(this);
  }

  addLines() {
    const width = this.scene.grs.designDim.width - SHORE_WIDTH * 2;
    const height = this.scene.grs.resizeDim.height;
    for (let i = 0; i < this.lineCount; ++i) {
      this.lightLines[i] = this.scene.add.rectangle(Math.random() * width, Math.random() * height, 6, 48, 0xFFFFFF).setAlpha(0.1);
      this.darkLines[i] = this.scene.add.rectangle(Math.random() * width, Math.random() * height, 8, 64, 0xFFFFFF).setAlpha(0.25);
    }
    this.add(this.lightLines);
    this.add(this.darkLines);
  }

  playFadeInOutTween() {
    for (let i = 0; i < this.lineCount; ++i) {
      this.scene.tweens.add({
        targets: [this.lightLines[i], this.darkLines[i]],
        duration: 500 + Math.random() * 1000,
        yoyo: true,
        ease: TWEEN_EASING.QUART_EASE_IN,
        alpha: `+=${Math.random() * 0.4}`,
        repeat: -1
      })
    }
  }

  resizeAndRepositionElements() {
  }

  scroll(speed: number) {
    const width = this.scene.grs.designDim.width - SHORE_WIDTH * 2;
    const height = this.scene.grs.resizeDim.height;
    const boundY = height;
    const initY = 0;
    for (let i = 0; i < this.lineCount; ++i) {
      this.lightLines[i].y += speed * 0.75;
      this.darkLines[i].y += speed;
      if (this.lightLines[i].y > boundY + this.lightLines[i].displayHeight * 0.5) {
        this.lightLines[i].y = initY;
      }
      if (this.darkLines[i].y > boundY + this.darkLines[i].displayHeight * 0.5) {
        this.darkLines[i].y = initY;
      }
    }
  }
}
