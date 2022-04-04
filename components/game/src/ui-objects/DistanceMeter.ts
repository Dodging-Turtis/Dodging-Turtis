import { CAM_CENTER } from '../cfg/constants/design-constants';
import { GAME_FONT } from '../cfg/constants/game-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class DistanceMeter extends Phaser.GameObjects.Text {
  scene: AbstractScene;

  clickTween: Phaser.Tweens.Tween | null = null;
  isEnabled = true;

  distanceCovered = 0;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x - scene.grs.designDim.width * 0.5 + 250, CAM_CENTER.y - scene.grs.resizeDim.height * 0.5 + 100, `0m`, {
      fontFamily: GAME_FONT,
      fontSize: '48px',
      resolution: 3,
      color: '#FFFFFF',
    });
    this.scene = scene;

    this.setAlign('center');
    this.setOrigin(0.5);
    this.scene.add.existing(this);
  }

  distanceFormatter() {
    let distance = Math.floor(this.distanceCovered / 25);
    if (distance > 1000) {
      distance /= 1000;
      return `${distance.toFixed(2)}km`;
    }
    return `${distance}m`;
  }

  updateDistance(speed: number) {
    this.distanceCovered += speed;
    this.text = this.distanceFormatter();
  }

  reset(): void {
    this.distanceCovered = 0;
    this.text = this.distanceFormatter();
  }

  resizeAndRepositionElements(): void {
    this.setPosition(CAM_CENTER.x - this.scene.grs.designDim.width * 0.5 + 250, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.5 + 100)
  }
}
