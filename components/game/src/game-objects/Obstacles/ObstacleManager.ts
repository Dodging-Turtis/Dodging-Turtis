import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { ObstacleGroup } from './ObstacleGroup';
import { ObstacleGenerator } from './ObstacleGenerator';
import { CONTAINER_GAP } from '../../cfg/constants/game-constants';

const PowerUpGenThreshold = {
  min: 10000,
  max: 20000,
}

export class ObstacleManager {
  scene: AbstractScene;

  obstacleGenerator: ObstacleGenerator;
  obsGroups: Array<ObstacleGroup> = [];

  powerUpGenThreshold = 0;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.obstacleGenerator = new ObstacleGenerator(this.scene);
    this.powerUpGenThreshold = PowerUpGenThreshold.min + Math.floor(Math.random() * (PowerUpGenThreshold.max - PowerUpGenThreshold.min + 1));
  }

  // Remove obstacle container that has scrolled out of the screen
  cullGroups() {
    const height = this.scene.grs.resizeDim.height * 0.5;
    const firstPrefab = this.obsGroups[0];
    if (firstPrefab.y - firstPrefab.contHeight * 0.75 >= CAM_CENTER.y + height) {
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
      let genPowerUp = false;
      if (this.powerUpGenThreshold <= 0) {
        this.powerUpGenThreshold = PowerUpGenThreshold.min + Math.floor(Math.random() * (PowerUpGenThreshold.max - PowerUpGenThreshold.min + 1));
        genPowerUp = true;
      }
      this.obsGroups.push(this.obstacleGenerator.getObstacleContainer(thresholdHeight, genPowerUp));
      console.warn('generated');
    }
  }

  // Generate few grips initially enough to fill up the threshold
  generateGroupsInitially() {
    let currentY = CAM_CENTER.y;
    const thresholdHeight = CAM_CENTER.y - this.scene.grs.resizeDim.height * 2;
    while (currentY >= thresholdHeight) {
      const newContainer = this.obstacleGenerator.getObstacleContainer(currentY, false);
      currentY -= newContainer.contHeight + CONTAINER_GAP;
      this.obsGroups.push(newContainer);
    }
  }

  // Scroll the obstacles
  moveGroups(speed: number) {
    for (let i = this.obsGroups.length - 1; i >= 0; --i) {
      this.obsGroups[i].incY(speed);
    }
  }

  // Get all obstacles, collectibles and powerups which can be considered for collision with the pawn
  getCollidables() {
    const collidableObstacles = [];
    const collidableCollectibles = [];
    const collidablePowerUps = [];
    for (let i = 0; i < this.obsGroups.length; ++i) {
      if (this.obsGroups[i].y + this.obsGroups[i].contHeight * 0.5 >= CAM_CENTER.y) {
        collidableObstacles.push(...this.obsGroups[i].obstacles);
        collidableCollectibles.push(...this.obsGroups[i].collectibles);
        if (this.obsGroups[i].powerUp.isDisplayed) {
          collidablePowerUps.push(this.obsGroups[i].powerUp);
        }
      }
    }
    return { collidableObstacles, collidableCollectibles, collidablePowerUps };
  }

  resetObstacleManager(): void {
    this.obsGroups.forEach((obsGroup) => {
      this.obstacleGenerator.putObstacleContainer(obsGroup);
    });
    this.obsGroups = [];
    this.powerUpGenThreshold = PowerUpGenThreshold.min + Math.floor(Math.random() * (PowerUpGenThreshold.max - PowerUpGenThreshold.min + 1));
  }

  update(dt: number, speed: number) {
    this.powerUpGenThreshold -= dt;
    this.cullGroups();
    this.generateNewObstacleGroup();
    this.moveGroups(speed);
  }
}