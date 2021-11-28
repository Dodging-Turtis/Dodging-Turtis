import { CAM_CENTER } from '../cfg/constants/design-constants';
import { AbstractScene } from '../scenes/AbstractScene';


const BAR_WIDTH = 400;
const BAR_HEIGHT = 40;
export class HungerMeter extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private outline!: Phaser.GameObjects.Rectangle;
  private bar!: Phaser.GameObjects.Rectangle;

  hungerValue = BAR_WIDTH - 10;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;

    this.addOutline();
    this.addBar();
    this.scene.add.existing(this);
  }

  private addOutline() {
    const { height } = this.scene.grs.resizeDim;
    this.outline = this.scene.add.rectangle(
      0,
      height * 0.4,
      BAR_WIDTH,
      BAR_HEIGHT,
      0x000000,
      0
    );
    this.outline.setStrokeStyle(5, 0xFFFFFF);
    this.outline.setOrigin(0.5);
    this.add(this.outline);
  }

  private addBar() {
    const { height } = this.scene.grs.resizeDim;
    this.bar = this.scene.add.rectangle(
      0,
      height * 0.4,
      this.hungerValue,
      BAR_HEIGHT - 10,
      0xFFFFFF,
      1
    );
    this.bar.setOrigin(0.5);
    this.add(this.bar);
  }

  decreaseHungerBar() {
    this.hungerValue -= 20;
    if (this.hungerValue <= 0) {
      this.emit('pawn-starved');
    }
    this.bar.width = this.hungerValue;
  }

  increaseHungerBar(count: number) {
    this.hungerValue += 40 * count;
    if (this.hungerValue >= BAR_WIDTH - 10) {
      this.hungerValue = BAR_WIDTH - 10;
    }
    this.bar.width = this.hungerValue;
  }

  fillUpBar() {
    this.scene.tweens.add({
      targets: this.bar,
      width: BAR_WIDTH - 10,
      duration: 400,
      onComplete: () => {
        this.hungerValue = BAR_WIDTH - 10;
      }
    })
  }

  resizeAndRepositionElements(): void {
    const { height } = this.scene.grs.resizeDim;
    this.outline.y = height * 0.4;
    this.bar.y = height * 0.4;
  }
}
