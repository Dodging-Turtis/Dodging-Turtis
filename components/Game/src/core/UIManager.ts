import { CUSTOM_EVENTS, DEPTH } from '../cfg/constants/game-constants';
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

    this.hungerMeter = new HungerMeter(this.scene).setDepth(DEPTH.ui);
    this.tapToPlay = new TapToPlay(this.scene).setDepth(DEPTH.ui);

    this.addEventHandlers();
  }

  private addEventHandlers() {
    this.hungerMeter.on('pawn-starved', () => {
      this.gameManager.handleDeath();
    });
    this.gameManager.gameComponents.pawn.on('pawn-dead', () => {
      this.hungerMeter.fillUpBar();
    });
    this.gameManager.events.on('collected', (count: number) => {
      this.hungerMeter.increaseHungerBar(count);
    });
  }

  resizeAndRepositionElements(): void {
    this.tapToPlay.resizeAndRepositionElements();
  }

  update(delta: number): void {
    if (this.gameManager.isGameStopped) {
      return;
    }
    this.hungerThreshold -= delta
    if (this.hungerThreshold <= 0) {
      this.hungerMeter.decreaseHungerBar();
      this.hungerThreshold = HUNGER_THRESHOLD;
    }
  }
}
