import { CAM_CENTER } from '../cfg/constants/design-constants';
import { CUSTOM_EVENTS } from '../cfg/constants/game-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class PauseResumeButton extends Phaser.GameObjects.Image {
  scene: AbstractScene;

  private wasPaused = false;

  clickTween: Phaser.Tweens.Tween | null = null;
  isEnabled = true;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x - scene.grs.designDim.width * 0.5 + 100, CAM_CENTER.y - scene.grs.resizeDim.height * 0.5 + 100, 'pause_button');
    this.scene = scene;

    this.addTouchHandler(true);
    this.handleHoverStates();
    this.scene.add.existing(this);
  }

  private addTouchHandler(onClickEnable = true): void {
    this.setInteractive();
    this.on('pointerdown', () => {
      if (!this.isEnabled) {
        return;
      }
      this.handleOnClick(onClickEnable);
      this.emit(CUSTOM_EVENTS.BUTTON_CLICKED, !this.wasPaused);
    });
  }

  private handleOnClick(onClickEnable: boolean): void {
    this.clickTween = this.scene.add.tween({
      targets: this,
      scale: { to: 0.95, from: 1 },
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 50,
      onComplete: () => {
        this.setScale(1);
        if (this.wasPaused) {
          this.setTexture('pause_button');
        } else {
          this.setTexture('resume_button');
        }
        this.wasPaused = !this.wasPaused;
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


  resizeAndRepositionElements(): void {
    this.setPosition(CAM_CENTER.x - this.scene.grs.designDim.width * 0.5 + 100, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.5 + 100)
  }
}
