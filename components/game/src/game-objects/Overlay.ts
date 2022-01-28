import { CAM_CENTER } from '../cfg/constants/design-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export class Overlay extends Phaser.GameObjects.Image {
  scene: AbstractScene;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y, 'black_overlay');
    this.scene = scene;
    this.setOrigin(0.5);
    this.setAlpha(0);
    this.setVisible(false);
    this.scene.add.existing(this);
    this.resizeAndRepositionElements();
  }

  resizeAndRepositionElements(): void {
    this.setDisplaySize(
      this.scene.grs.resizeDim.width * 1.25,
      this.scene.grs.resizeDim.height * 1.25
    );
  }

  showOverlay() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0.6,
      duration: 400,
      ease: TWEEN_EASING.QUAD_EASE_OUT,
      onStart: () => {
        this.setVisible(true);
      }
    });
  }

  hideOverlay() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 400,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      onComplete: () => {
        this.setVisible(false);
      }
    })
  }
}
