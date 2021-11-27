import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { SHORE_WIDTH } from '../../cfg/constants/game-constants';
import { AbstractScene } from '../../scenes/AbstractScene';

export class Dock extends Phaser.GameObjects.Sprite {
  scene: AbstractScene;

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, 'dock');
    this.scene = scene;
    this.scale = 2.5;
    this.scene.add.existing(this);
  }

  sideToPlace(side: 'left' | 'right') {
    const width = this.scene.grs.designDim.width;
    if (side === 'left') {
      this.setOrigin(0.1, 0.5);
      this.x =  CAM_CENTER.x - width * 0.5 + SHORE_WIDTH;
    } else {
      this.setOrigin(0.9, 0.5);
      this.x =  CAM_CENTER.x + width * 0.5 - SHORE_WIDTH;
      this.setFlipX(true);
    }
  }

}
