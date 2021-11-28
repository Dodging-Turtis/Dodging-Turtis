import { CUSTOM_EVENTS } from '../cfg/constants/game-constants';
import { STAR_FISH_RADIUS } from '../game-objects/Collectibles/CollectiblesManager';
import type { AbstractScene } from '../scenes/AbstractScene';
import { HungerMeter } from '../ui-objects/HungerMeter';
import { TapToPlay } from '../ui-objects/TapToPlay';
import { GameManager, PAWN_RADIUS } from './GameManager';

const HUNGER_THRESHOLD = 500; //ms
export class UIManager {
  scene: AbstractScene;
  private gameManager: GameManager;

  tapToPlay: TapToPlay;
  hungerMeter: HungerMeter;

  hungerThreshold = HUNGER_THRESHOLD;


  constructor(scene: AbstractScene, gameManager: GameManager) {
    this.scene = scene;
    this.gameManager = gameManager;

    this.hungerMeter = new HungerMeter(this.scene);
    this.tapToPlay = new TapToPlay(this.scene);

    this.addEventHandlers();
  }

  private addEventHandlers() {
    this.hungerMeter.on('pawn-starved', () => {
      this.gameManager.handleDeath();
    });
    this.gameManager.gameComponents.pawn.on('pawn-dead', () => {
      this.hungerMeter.fillUpBar();
    });
  }

  resizeAndRepositionElements(): void {
    this.tapToPlay.resizeAndRepositionElements();
  }

  update(delta: number): void {
    if (this.gameManager.isGameStopped) {
      return;
    }
    const collectedCount = this.getCollectedCount();
    if (collectedCount > 0) {
      this.hungerMeter.increaseHungerBar(collectedCount);
    }
    this.hungerThreshold -= delta
    if (this.hungerThreshold <= 0) {
      this.hungerMeter.decreaseHungerBar();
      this.hungerThreshold = HUNGER_THRESHOLD;
    }
  }

  getCollectedCount() {
    const pawn = this.gameManager.gameComponents.pawn;
    const collidableCollectibles = this.gameManager.gameComponents.collectibleManager.getCollidableCollectibles();

    let collectedCount = 0;
    for (let i = 0; i < collidableCollectibles.length; ++i) {

      let dx = (pawn.x + PAWN_RADIUS) - (collidableCollectibles[i].x + STAR_FISH_RADIUS);
      let dy = (pawn.y + PAWN_RADIUS) - (collidableCollectibles[i].y + STAR_FISH_RADIUS);
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < PAWN_RADIUS + STAR_FISH_RADIUS) {
          // collision detected!
          collidableCollectibles[i].playConsumeTween();
          ++collectedCount;
      }
    }
    return collectedCount;
  }
}
