import { CAM_CENTER } from '../cfg/constants/design-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export class Overlay extends Phaser.GameObjects.Rectangle {
  scene: AbstractScene;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y, scene.grs.resizeDim.width, scene.grs.resizeDim.height, 0x000000);
    this.scene = scene;
    this.setOrigin(0.5);
    this.setAlpha(0);
    this.setVisible(false);
    this.scene.add.existing(this);
  }

  resizeAndRepositionElements(): void {
    this.setDisplaySize(
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height
    );
  }

  showOverlay() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0.25,
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
