import { EResizeState } from '../cfg/enums/EResizeState';
import { GameComponents } from '../game-objects/GameComponents';
import type { AbstractScene } from '../scenes/AbstractScene';

export const PAWN_RADIUS = 20;
export class GameManager {
  scene: AbstractScene;
  events: Phaser.Events.EventEmitter;

  gameComponents: GameComponents;
  currentResizeState: EResizeState;

  isGameStopped = false;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.events = new Phaser.Events.EventEmitter();
    this.currentResizeState = EResizeState.GAME;
    this.gameComponents = new GameComponents(this.scene);
    this.resizeAndRepositionElements();
    this.addEventHandlers();
  }

  private addEventHandlers() {
    this.gameComponents.pawn.on('pawn-dead', () => {
      this.gameComponents.resetCamera();
    });
    this.gameComponents.pawn.on('pawn-revived', () => {
      this.isGameStopped = false;
      this.gameComponents.tweenScrollSpeedBackToUsual();
    });
  }

  resizeAndRepositionElements(): void {
    this.gameComponents.resizeAndRepositionElements();
  }

  update(delta: number) {
    if (this.isGameStopped) {
      return;
    }

    if (this.checkCollision()) {
      this.handleDeath();
      console.log('collided');
      return;
    }

    this.gameComponents.update(delta);
  }

  handleDeath() {
    this.isGameStopped = true;
    this.gameComponents.handlePawnCollision();
  }

  checkCollision() {
    const pawn = this.gameComponents.pawn;
    const collidableObstacles = this.gameComponents.obstacleManager.getCollidableObstacles();

    for (let i = 0; i < collidableObstacles.length; ++i) {
      let testX = pawn.x;
      let testY = pawn.y;
      if (testX < collidableObstacles[i].getLeftCenter().x) {
        testX = collidableObstacles[i].getLeftCenter().x;        // left edge
      } else if (testX > collidableObstacles[i].getRightCenter().x) {
        testX = collidableObstacles[i].getRightCenter().x;     // right edge
      }

      if (testY < collidableObstacles[i].getTopCenter().y) {
        testY = collidableObstacles[i].getTopCenter().y;        // top edge
      } else if (testY > collidableObstacles[i].getBottomCenter().y) {
        testY = collidableObstacles[i].getBottomCenter().y;     // bottom edge
      }

      let distX = pawn.x - testX;
      let distY = pawn.y - testY;
      let distance = Math.sqrt((distX * distX) + (distY * distY));

      if (distance <= PAWN_RADIUS) {
        return true;
      }
    }
    return false;
  }
}
