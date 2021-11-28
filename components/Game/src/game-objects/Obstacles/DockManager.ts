import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { Dock } from './Dock';

export class DockManager {
  scene: AbstractScene;
  
  docks: Array<Dock> = [];
  dockPool: Array<Dock> = [];

  constructor(scene: AbstractScene) {
    this.scene = scene;
    const width = this.scene.grs.designDim.width;
    this.addInitialDocks();
  }

  addInitialDocks() {
    const width = this.scene.grs.designDim.width;
    const height = this.scene.grs.resizeDim.height;
    for (let i = 0; i < 5; ++i) {
      this.docks[i] = new Dock(this.scene, 0, CAM_CENTER.y - height * 0.5 + i * 0.2 * height);
      this.docks[i].sideToPlace(Math.random() > 0.5 ? 'left' : 'right');
    }
  }

  update(speed: number) {
    const height = this.scene.grs.resizeDim.height;
    for (let i = this.docks.length - 1; i >= 0; --i) {
      this.docks[i].y += speed;
      if (this.docks[i].y >= CAM_CENTER.y + height * 0.5 + this.docks[i].displayHeight * 0.5) {
        this.dockPool.push(this.docks.splice(i, 1)[0]);
      }
    }
    this.checkAndPlaceDocks();
  }

  checkAndPlaceDocks() {
    const height = this.scene.grs.resizeDim.height;
    if (this.dockPool.length) {
      for (let i = this.dockPool.length - 1; i >= 0; --i) {
        const dock = this.dockPool.splice(i, 1)[0];
        dock.y = CAM_CENTER.y - height * 0.5 - this.docks[i].displayHeight * 0.5;
        dock.sideToPlace(Math.random() > 0.5 ? 'left' : 'right');
        this.docks.push(dock);
      }
    }
  }

  getCollidableObstacles() {
    const minThreshold = CAM_CENTER.y + this.scene.grs.designDim.height * 0.1;
    const collidableObstacles = [];
    for (let i = 0; i < this.docks.length; i++) {
      if (this.docks[i].getBottomCenter().y >= minThreshold) {
        collidableObstacles.push(this.docks);
      }
    }
    return this.docks;
  }
} 