import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { SHORE_WIDTH } from '../../cfg/constants/game-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { Pawn } from '../Pawn';
import { Dock } from './Dock';
import { DockManager } from './DockManager';

export class ObstacleManager {
  scene: AbstractScene;

  dockManager: DockManager;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.dockManager = new DockManager(this.scene);
  }

  getCollidableObstacles(): Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.Image> {
    let collidableObstacles = [...this.dockManager.getCollidableObstacles()];
    return collidableObstacles;
  }

  update(speed: number) {
    this.dockManager.update(speed);
  }

}