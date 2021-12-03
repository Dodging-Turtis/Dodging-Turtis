import { CUSTOM_EVENTS, DEPTH } from '../cfg/constants/game-constants';
import type { AbstractScene } from '../scenes/AbstractScene';
import { HungerMeter } from '../ui-objects/HungerMeter';
import { PauseResumeButton } from '../ui-objects/PauseResumeButton';
import { TapToPlay } from '../ui-objects/TapToPlay';
import { GameManager, PAWN_RADIUS } from './GameManager';

const HUNGER_THRESHOLD = 500; //ms
export class UIManager {
  scene: AbstractScene;
  private gameManager: GameManager;

  pauseResumeButton: PauseResumeButton;
  tapToPlay: TapToPlay;
  hungerMeter: HungerMeter;

  hungerThreshold = HUNGER_THRESHOLD;


  constructor(scene: AbstractScene, gameManager: GameManager) {
    this.scene = scene;
    this.gameManager = gameManager;

    this.pauseResumeButton = new PauseResumeButton(this.scene).setDepth(DEPTH.ui);
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
    this.pauseResumeButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, (isPaused: boolean) => {
      if (isPaused) {
        this.gameManager.handleGamePause();
      } else {
        this.gameManager.handleGameResume();
      }
    });
  }

  resizeAndRepositionElements(): void {
    this.tapToPlay.resizeAndRepositionElements();
  }

  update(delta: number): void {
    if (this.gameManager.isGameStopped || this.gameManager.isGamePaused) {
      return;
    }
    this.hungerThreshold -= delta
    if (this.hungerThreshold <= 0) {
      this.hungerMeter.decreaseHungerBar();
      this.hungerThreshold = HUNGER_THRESHOLD;
    }
  }
}
