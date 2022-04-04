import { CUSTOM_EVENTS } from '../cfg/constants/game-constants';
import { AbstractScene } from '../scenes/AbstractScene';

const HUNGER_INC = 5;
const HUNGER_DEC = 15;
export class HungerMeter extends Phaser.GameObjects.Image {
  scene: AbstractScene;

  hungerBar!: Phaser.GameObjects.Image;
  hungerValue = 0;

  currentColor = 'green';

  hungerBarPositionsX!: {
    full: number;
    yellow: number;
    orange: number;
    red: number;
    empty: number;
  }

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, 'hunger_bar_base');
    this.scene = scene;
    this.scene.add.existing(this);
  }

  setupHungerMeter() {
    this.addHungerBar();
    this.addHungerBarMask();
  }

  private addHungerBar() {
    this.hungerBar = this.scene.add.image(this.x, this.y, 'hunger_bar_green');
    this.hungerBarPositionsX = {
      full: this.hungerBar.x,
      yellow: this.hungerBar.x + 50,
      orange: this.hungerBar.x + 100,
      red: this.hungerBar.x + 150,
      empty: this.hungerBar.x + 220
    };
    this.hungerValue = this.hungerBarPositionsX.full;
    this.currentColor = 'green';
    this.parentContainer.add(this.hungerBar);
  }

  private addHungerBarMask() {
    // NOTE: Masks don't work on ShapeGameObjects in Canvas Mode.
    const shape = this.scene.make.graphics({});
    shape.setPosition(this.parentContainer.x - 200, this.parentContainer.y + 32.5);

    //  You have to begin a path for a Geometry mask to work
    shape.beginPath();

    shape.fillStyle(0xFFFFFF, 1.0);

    shape.moveTo(0, 0);
    shape.lineTo(275, 0);
    shape.lineTo(275, 34);
    shape.lineTo(18, 34);
    shape.lineTo(-8, 18);

    // These are also important for the mask to work
    shape.fillPath();
    shape.closePath();

    const mask = shape.createGeometryMask();
    this.hungerBar.setMask(mask);
  }

  decreaseHunger(count: number) {
    this.hungerValue -= HUNGER_DEC * count;
    if (this.hungerValue <= this.hungerBarPositionsX.full) {
      this.hungerValue = this.hungerBarPositionsX.full;
    }
    this.hungerBar.x = this.hungerValue;
    this.handleColorChange();
  }

  increaseHunger() {
    this.hungerValue += HUNGER_INC;
    if (this.hungerValue >= this.hungerBarPositionsX.empty) {
      this.hungerValue = this.hungerBarPositionsX.empty;
      this.emit(CUSTOM_EVENTS.PAWN_STARVED);
    }
    this.hungerBar.x = this.hungerValue;
    this.handleColorChange();
  }

  handleColorChange() {
    let color = 'green';
    if (this.hungerBar.x > this.hungerBarPositionsX.red) {
      color = 'red';
    } else if (this.hungerBar.x > this.hungerBarPositionsX.orange) {
      color = 'orange';
    } else if (this.hungerBar.x > this.hungerBarPositionsX.yellow) {
      color = 'yellow';
    }
    if (color !== this.currentColor) {
      this.hungerBar.setTexture(`hunger_bar_${color}`);
      this.currentColor = color;
    }
  }

  reset(): void {
    this.fillUpBar();
  }

  fillUpBar() {
    this.scene.tweens.add({
      targets: this.hungerBar,
      x: this.hungerBarPositionsX.full,
      duration: 400,
      onUpdate: () => {
        this.handleColorChange();
      },
      onComplete: () => {
        this.hungerValue = this.hungerBarPositionsX.full;
      }
    });
  }
}
