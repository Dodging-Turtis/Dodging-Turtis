import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { TWEEN_EASING } from '../../cfg/constants/static-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { StarFish } from './StarFish';

export const STAR_FISH_RADIUS = 50;

export class CollectiblesManager {
  scene: AbstractScene;

  starFishes: Array<StarFish> = [];
  starFishCount = 10;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.addInitialstarFishes();
    this.playScaleInOutTween();
  }

  addInitialstarFishes() {
    const width = this.scene.grs.designDim.width;
    const height = this.scene.grs.resizeDim.height;
    const initX = CAM_CENTER.x - 250;
    const initY = CAM_CENTER.y - height * 0.5;
    for (let i = 0; i < 10; ++i) {
      this.starFishes[i] = new StarFish(this.scene, initX + Math.random() * 500, initY + i * 0.06 * height, Math.random() > 0.5 ? 'orange' : 'blue');
      this.starFishes[i].setData('consumed', false)
    }
  }

  playScaleInOutTween() {
    for (let i = 0; i < this.starFishCount; ++i) {
      this.scene.tweens.add({
        targets: [this.starFishes[i]],
        duration: 1000,
        yoyo: true,
        ease: TWEEN_EASING.QUART_EASE_IN,
        scale: `+=${0.5}`,
        repeat: -1,
        delay: Math.random() * 500
      })
    }
  }

  update(speed: number) {
    const height = this.scene.grs.resizeDim.height;
    const boundsY = CAM_CENTER.y + height * 0.5;
    const initY = CAM_CENTER.y - height * 0.5
    for (let i = this.starFishes.length - 1; i >= 0; --i) {
      this.starFishes[i].y += speed;
      if (!this.starFishes[i].getData('consumed') && this.starFishes[i].y >= boundsY + this.starFishes[i].displayHeight * 0.5) {
        this.starFishes[i].y = initY - this.starFishes[i].displayHeight * 0.5;
      }
    }
  }

  getCollidableCollectibles(): Array<StarFish> {
    const minThreshold = CAM_CENTER.y + this.scene.grs.designDim.height * 0.1;
    const collidableCollectibles = [];
    for (let i = 0; i < this.starFishes.length; i++) {
      if (this.starFishes[i].getBottomCenter().y >= minThreshold) {
        collidableCollectibles.push(this.starFishes);
      }
    }
    return this.starFishes;
  }

}