import { CAM_CENTER } from '../cfg/constants/design-constants';
import { CUSTOM_EVENTS } from '../cfg/constants/game-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export abstract class AbstractButton extends Phaser.GameObjects.Image {
  scene: AbstractScene;

  clickTween: Phaser.Tweens.Tween | null = null;
  isEnabled = true;

  onClickComplete: (() => void) | null = null;

  constructor(scene: AbstractScene, x: number, y: number, onClickEnable = true, texture: string) {
    super(scene, x, y, texture);
    this.scene = scene;

    this.addTouchHandler(onClickEnable);
    this.handleHoverStates();
    this.scene.add.existing(this);
  }

  private addTouchHandler(onClickEnable = true): void {
    this.setInteractive();
    this.on('pointerdown', () => {
      if (!this.isEnabled) {
        return;
      }
      this.scene.audioManager.play('click');
      this.isEnabled = false;
      this.handleOnClick(onClickEnable);
      this.emit(CUSTOM_EVENTS.BUTTON_CLICKED);
    });
  }

  handleOnClick(onClickEnable: boolean): void {
    this.clickTween = this.scene.add.tween({
      targets: this,
      scale: { to: 0.95, from: 1 },
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 50,
      onComplete: () => {
        this.setScale(1);
        if (this.onClickComplete) {
          this.onClickComplete();
        }
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
