import { CAM_CENTER } from '../cfg/constants/design-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class DistanceMeter extends Phaser.GameObjects.Text {
  scene: AbstractScene;

  private wasPaused = false;

  clickTween: Phaser.Tweens.Tween | null = null;
  isEnabled = true;

  distanceCovered = 1;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x - scene.grs.designDim.width * 0.5 + 250, CAM_CENTER.y - scene.grs.resizeDim.height * 0.5 + 100, '1m', {
      fontFamily: 'Lato',
      fontSize: '40px',
      resolution: 3,
      color: '#eeeeee',
    });
    this.scene = scene;

    this.setAlign('center');
    this.setOrigin(0.5);
    this.scene.add.existing(this);
  }

  updateDistance(speed: number) {
    this.distanceCovered += speed;
    this.text = `${Math.floor(this.distanceCovered / 10)}m`;
  }

  resizeAndRepositionElements(): void {
    this.setPosition(CAM_CENTER.x - this.scene.grs.designDim.width * 0.5 + 100, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.5 + 100)
  }
}
