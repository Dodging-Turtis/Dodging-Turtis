import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { TWEEN_EASING } from '../../cfg/constants/static-constants';
import { AbstractScene } from '../../scenes/AbstractScene';

export class StarFish extends Phaser.GameObjects.Sprite {
  scene: AbstractScene;

  constructor(scene: AbstractScene, x: number, y: number, color: string) {
    super(scene, x, y, color + '_star_fish');
    this.scene = scene;
    this.scale = 2.5;
    this.scene.add.existing(this);
  }

  playConsumeTween() {
    const height = this.scene.grs.resizeDim.height;
    this.setData('consumed', true);
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      alpha: 0,
      ease: TWEEN_EASING.SINE_EASE_OUT,
      duration: 350,
      x: CAM_CENTER.x,
      y: CAM_CENTER.y + height * 0.4,
      onComplete: () => {
        this.x = CAM_CENTER.x - 250 + Math.random() * 500;
        this.y = CAM_CENTER.y - height * 0.5 - this.displayHeight * 0.5;
        this.setData('consumed', false);
        this.scale = 2.5;
        this.alpha = 1;
      }
    })
  }
}
