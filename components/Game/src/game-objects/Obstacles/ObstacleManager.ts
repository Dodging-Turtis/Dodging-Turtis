import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { SHORE_WIDTH } from '../../cfg/constants/game-constants';
import { AbstractScene } from '../../scenes/AbstractScene';

export class ObstacleManager {
  scene: AbstractScene;


  constructor(scene: AbstractScene) {
    this.scene = scene;
  }

  getCollidableObstacles(): Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.Image> {
    return [];
  }

  update(speed: number) {

  }

}