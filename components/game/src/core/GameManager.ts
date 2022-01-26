import { CUSTOM_EVENTS } from '../cfg/constants/game-constants';
import { EInputDirection } from '../cfg/enums/EInputDirection';
import { EResizeState } from '../cfg/enums/EResizeState';
import { GameComponents } from '../game-objects/GameComponents';
import { Collectible } from '../prefabs/abstract/Collectible';
import type { AbstractScene } from '../scenes/AbstractScene';

export const PAWN_RADIUS = 20;
export const COLLECTIBLE_RADIUS = 50;

export class GameManager {
  scene: AbstractScene;
  events: Phaser.Events.EventEmitter;

  gameComponents: GameComponents;
  currentResizeState: EResizeState;

  isGameStopped = false;
  isGamePaused = false;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.events = new Phaser.Events.EventEmitter();
    this.currentResizeState = EResizeState.SELECTION_MENU;
    this.isGamePaused = true;
    this.gameComponents = new GameComponents(this.scene);
    this.resizeAndRepositionElements();
    this.addEventHandlers();
  }

  private addEventHandlers() {
    this.gameComponents.pawn.turtle.on(CUSTOM_EVENTS.PAWN_REVIVED, () => {
      this.isGameStopped = false;
      this.scene.inputManager.setInputEnabled(true);
      this.gameComponents.tweenScrollSpeedBackToUsual();
    });
  }

  startGame() {
    this.gameComponents.startGame();
    this.currentResizeState = EResizeState.GAME;
    this.isGamePaused = false;
  }

  handleDeath() {
    this.isGameStopped = true;
    this.scene.inputManager.setInputEnabled(false);
    this.scene.inputManager.setInputDirection(EInputDirection.NONE);
    this.gameComponents.handlePawnCollision();
  }

  handleGamePause() {
    this.isGamePaused = true;
    this.scene.tweens.pauseAll();
    this.gameComponents.overlay.showOverlay();
  }

  handleGameResume() {
    this.isGamePaused = false;
    this.scene.tweens.resumeAll();
    this.gameComponents.overlay.hideOverlay();
  }

  resizeAndRepositionElements(): void {
    this.gameComponents.resizeAndRepositionElements();
  }

  update(delta: number) {
    if (this.isGameStopped || this.isGamePaused) {
      return;
    }

    this.gameComponents.update(delta);

    if (!this.gameComponents.pawn.turtle.isGhost && this.checkCollision()) {
      this.handleDeath();
      return;
    }
  }

  checkCollision() {
    const pawn = this.gameComponents.pawn;
    const { collidableObstacles, collidableCollectibles } = this.gameComponents.obstacleManager.getCollidableObstaclesAndCollectibles();

    const count = this.getCollectedCount(collidableCollectibles);
    if (count > 0) {
      this.events.emit('collected', count);
    }

    for (let i = 0; i < collidableObstacles.length; ++i) {
      let testX = pawn.turtle.x;
      let testY = pawn.turtle.y;
      let posX = new Phaser.Math.Vector2();
      let posY = new Phaser.Math.Vector2();
      if (testX < collidableObstacles[i].getLeftCenter(posX).x) {
        testX = posX.x;        // left edge
      } else if (testX > collidableObstacles[i].getRightCenter(posX).x) {
        testX = posX.x;     // right edge
      }

      if (testY < collidableObstacles[i].getTopCenter(posY).y) {
        testY = posY.y;        // top edge
      } else if (testY > collidableObstacles[i].getBottomCenter(posY).y) {
        testY = posY.y;     // bottom edge
      }

      let distX = pawn.turtle.x - testX;
      let distY = pawn.turtle.y - testY;
      let distance = Math.sqrt((distX * distX) + (distY * distY));

      if (distance <= PAWN_RADIUS) {
        return true;
      }
    }
    return false;
  }

  getCollectedCount(collectibles: Array<Collectible>) {
    const pawn = this.gameComponents.pawn;

    let collectedCount = 0;
    for (let i = 0; i < collectibles.length; ++i) {
      if (collectibles[i].isConsumed) {
        continue;
      }
      let dx = (pawn.turtle.x + PAWN_RADIUS) - (collectibles[i].x + COLLECTIBLE_RADIUS);
      let dy = (pawn.turtle.y + PAWN_RADIUS) - (collectibles[i].y + COLLECTIBLE_RADIUS);
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < PAWN_RADIUS + COLLECTIBLE_RADIUS) {
        // collision detected!
        collectibles[i].playConsumeTween();
        ++collectedCount;
      }
    }
    return collectedCount;
  }
}
