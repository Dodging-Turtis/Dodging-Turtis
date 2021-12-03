import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { ObstacleGroup } from './ObstacleGroup';
import { ObstacleGenerator } from './ObstacleGenerator';

export class ObstacleManager {
  scene: AbstractScene;

  obstacleGenerator: ObstacleGenerator;
  obsGroups: Array<ObstacleGroup> = [];

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.obstacleGenerator = new ObstacleGenerator(this.scene);
    this.generateGroupsInitially();
  }

  cullGroups() {
    const height = this.scene.grs.resizeDim.height * 0.5;
    const firstPrefab = this.obsGroups[0];
    if (firstPrefab.y - firstPrefab.contHeight * 0.5 >= CAM_CENTER.y + height) {
      const obsGroup = this.obsGroups.shift();
      if (obsGroup) {
        this.obstacleGenerator.putObstacleContainer(obsGroup);
      }
      console.warn('culled');
    }
  }

  // Minimum y position of the last container before we generate a new container.
  generateNewObstacleGroup() {
    const thresholdHeight = CAM_CENTER.y - this.scene.grs.resizeDim.height * 2;
    const lastPrefab = this.obsGroups[this.obsGroups.length - 1];
    const lastPrefabTopEdgeY = lastPrefab.y - lastPrefab.contHeight * 0.5
    if (lastPrefabTopEdgeY >= thresholdHeight) {
      this.obsGroups.push(this.obstacleGenerator.getObstacleContainer(4, thresholdHeight));
      console.warn('generated');
    }
  }

  generateGroupsInitially() {
    let currentY = CAM_CENTER.y;
    const thresholdHeight = CAM_CENTER.y - this.scene.grs.resizeDim.height * 2;
    while(currentY >= thresholdHeight) {
      const newContainer = this.obstacleGenerator.getObstacleContainer(4, currentY);
      currentY -= newContainer.contHeight;
      this.obsGroups.push(newContainer);
    }
  }

  moveGroups(speed: number) {
    for (let i = this.obsGroups.length - 1; i >= 0; --i) {
      this.obsGroups[i].incY(speed);
    }
  }

  getCollidableObstaclesAndCollectibles() {
    const collidableObstacles = [];
    const collidableCollectibles = [];
    for (let i = 0; i < this.obsGroups.length; ++i) {
      if (this.obsGroups[i].y + this.obsGroups[i].contHeight * 0.5 >= CAM_CENTER.y) {
        collidableObstacles.push(...this.obsGroups[i].obstacles);
        collidableCollectibles.push(...this.obsGroups[i].collectibles);
      }
    }
    return { collidableObstacles, collidableCollectibles };
  }

  update(speed: number) {
    this.cullGroups();
    this.generateNewObstacleGroup();
    this.moveGroups(speed);
  }
}