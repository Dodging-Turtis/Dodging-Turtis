import { CUSTOM_EVENTS } from "../cfg/constants/game-constants";
import { TWEEN_EASING } from "../cfg/constants/static-constants";
import { AbstractScene } from "../scenes/AbstractScene";

export class SelectionArrow extends Phaser.GameObjects.Image {
  isEnabled = false;

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, 'left_arrow');
    this.alpha = 0.5;
    this.addTouchHandler(false);
    this.handleHoverStates();
  }

  private addTouchHandler(onClickEnable = true): void {
    this.setInteractive({useHandCursor: true});
    this.on('pointerdown', () => {
      if (!this.isEnabled) {
        return;
      }
      this.handleOnClick(onClickEnable);
      this.emit(CUSTOM_EVENTS.BUTTON_CLICKED);
    });
  }

  setEnabled(value: boolean) {
    if (value) {
      this.alpha = 1;
    } else {
      this.alpha = 0.5;
    }
    this.isEnabled = value;
  }

  handleOnClick(onClickEnable: boolean): void {
    this.scene.add.tween({
      targets: this,
      scale: { to: 0.95, from: 1 },
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 50,
      onComplete: () => {
        this.setScale(1);
        if (onClickEnable) {
          this.isEnabled = true;
        }
      },
    });
  }

  private handleHoverStates(): void {
    this.on('pointerover', () => {
      if (this.isEnabled) {
        this.handleOnHover();
      }
    });
    this.on('pointerout', () => {
      if (this.isEnabled) {
        this.handleOnHoverOut();
      }
    });
  }


  private handleOnHover(): void {
    this.scene.tweens.add({
      targets: this,
      scale: 1.05,
      duration: 25,
      ease: TWEEN_EASING.QUAD_EASE_IN,
    });
  }

  private handleOnHoverOut(): void {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 25,
      ease: TWEEN_EASING.QUAD_EASE_IN,
    });
  }

}