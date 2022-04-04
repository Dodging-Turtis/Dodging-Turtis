import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { CUSTOM_EVENTS, GAME_SOUNDS } from '../cfg/constants/game-constants';
import { EInputDirection } from '../cfg/enums/EInputDirection';
import { EPowerUpType } from '../cfg/enums/EPowerUpType';
import { EResizeState } from '../cfg/enums/EResizeState';
import { GameComponents } from '../game-objects/GameComponents';
import { Collectible } from '../prefabs/abstract/Collectible';
import { Obstacle } from '../prefabs/abstract/Obstacle';
import { PowerUp } from '../prefabs/abstract/PowerUp';
import type { AbstractScene } from '../scenes/AbstractScene';

export const PAWN_RADIUS = 20;
export const COLLECTIBLE_RADIUS = 50;
export const POWER_UP_RADIUS = 75;

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
    this.scene.inputManager.setInputEnabled(true);
    this.currentResizeState = EResizeState.GAME;
    this.isGamePaused = false;
    this.isGameStopped = false;
  }

  endGame() {
    this.scene.inputManager.setInputEnabled(false);
    this.gameComponents.endGame();
    this.isGamePaused = true;
    this.isGameStopped = true;
  }

  handleDeath() {
    this.isGameStopped = true;
    this.scene.audioManager.play('collision');
    this.scene.inputManager.setInputEnabled(false);
    this.scene.inputManager.setInputDirection(EInputDirection.NONE);
    this.gameComponents.handlePawnCollision();
  }

  handleGamePause() {
    this.isGamePaused = true;
    this.scene.tweens.pauseAll();
    this.scene.time.paused = true;
    this.gameComponents.overlay.showOverlay();
  }

  handleGameResume() {
    this.isGamePaused = false;
    this.scene.tweens.resumeAll();
    this.scene.time.paused = false;
    this.gameComponents.overlay.hideOverlay();
  }

  handlePowerUp(powerUpType: EPowerUpType, powerUpTex: string) {
    this.events.emit('powerUp', powerUpType, powerUpTex);
    console.error('powerUp', powerUpType);
    switch (powerUpType) {
      case EPowerUpType.INVINCIBILITY:
        this.gameComponents.pawn.playInvincibilityTween();
        break;
      case EPowerUpType.MOVEMENT_SPEED:
        this.gameComponents.pawn.increasePawnMovementSpeed();
        break;
      case EPowerUpType.SCROLL_SLOW:
        this.gameComponents.reduceScrollSpeed();
        break;
    }
    this.scene.audioManager.play('powerup');
  }

  resizeAndRepositionElements(): void {
    this.gameComponents.resizeAndRepositionElements();
  }

  update(delta: number) {
    if (this.isGameStopped || this.isGamePaused) {
      return;
    }

    this.gameComponents.update(delta);

    if (this.checkCollision()) {
      this.handleDeath();
      return;
    }
  }

  checkCollision() {
    const { collidableObstacles, collidableCollectibles, collidablePowerUps } = this.gameComponents.obstacleManager.getCollidables();

    const count = this.getCollectedCount(collidableCollectibles);
    if (count > 0) {
      this.events.emit('collected', count);
    }

    const powerUpCollected = this.getCollectedPowerUp(collidablePowerUps);
    if (powerUpCollected) {
      this.handlePowerUp(powerUpCollected.powerUpType, powerUpCollected.texture.key);
    }

    if (this.gameComponents.pawn.turtle.isGhost || this.gameComponents.pawn.turtle.isInvincible) {
      return false;
    }

    return this.checkForObstacleCollision(collidableObstacles);
  }

  private getCollectedCount(collectibles: Array<Collectible>) {
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
        collectibles[i].playConsumeTween(pawn.turtle.x, pawn.turtle.y);
        pawn.playConsumeTween();
        this.scene.audioManager.play('starFish');
        ++collectedCount;
      }
    }
    return collectedCount;
  }

  private getCollectedPowerUp(powerUps: Array<PowerUp>) {
    const pawn = this.gameComponents.pawn;

    for (let i = 0; i < powerUps.length; ++i) {
      if (!powerUps[i].isDisplayed || powerUps[i].isConsumed) {
        continue;
      }
      let dx = (pawn.turtle.x + PAWN_RADIUS) - (powerUps[i].x + POWER_UP_RADIUS);
      let dy = (pawn.turtle.y + PAWN_RADIUS) - (powerUps[i].y + POWER_UP_RADIUS);
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < PAWN_RADIUS + POWER_UP_RADIUS) {
        // collision detected!
        powerUps[i].playConsumeTween(pawn.turtle.x, pawn.turtle.y);
        return powerUps[i];
      }
    }
  }



  private checkForObstacleCollision(obstacles: Array<Obstacle>) {
    const pawn = this.gameComponents.pawn;

    for (let i = 0; i < obstacles.length; ++i) {
      let testX = pawn.turtle.x;
      let testY = pawn.turtle.y;
      let posX = new Phaser.Math.Vector2();
      let posY = new Phaser.Math.Vector2();
      if (testX < obstacles[i].getLeftCenter(posX).x) {
        testX = posX.x;        // left edge
      } else if (testX > obstacles[i].getRightCenter(posX).x) {
        testX = posX.x;     // right edge
      }

      if (testY < obstacles[i].getTopCenter(posY).y) {
        testY = posY.y;        // top edge
      } else if (testY > obstacles[i].getBottomCenter(posY).y) {
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
}
