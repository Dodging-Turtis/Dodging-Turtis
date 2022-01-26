import { CUSTOM_EVENTS, DEPTH } from '../cfg/constants/game-constants';
import { EResizeState } from '../cfg/enums/EResizeState';
import type { AbstractScene } from '../scenes/AbstractScene';
import { CoreUI } from '../ui-objects/CoreUI';
import { DistanceMeter } from '../ui-objects/DistanceMeter';
import { PausedText } from '../ui-objects/PausedText';
import { PauseResumeButton } from '../ui-objects/PauseResumeButton';
import { TurtleSelectionMenu } from '../ui-objects/TurtleSelectionMenu';
import { GameManager } from './GameManager';

const HUNGER_THRESHOLD = 500; //ms
const COLLECTIBLE_MULT = 100;
export class UIManager {
  scene: AbstractScene;
  private gameManager: GameManager;

  turtleSelectionMenu: TurtleSelectionMenu;
  pauseResumeButton!: PauseResumeButton;
  coreUI!: CoreUI;
  distanceMeter!: DistanceMeter;
  pausedText!: PausedText;

  hungerThreshold = HUNGER_THRESHOLD;

  constructor(scene: AbstractScene, gameManager: GameManager) {
    this.scene = scene;
    this.gameManager = gameManager;
    this.turtleSelectionMenu = new TurtleSelectionMenu(this.scene).setDepth(DEPTH.ui);
    this.pauseResumeButton = new PauseResumeButton(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.pausedText = new PausedText(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.coreUI = new CoreUI(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.distanceMeter = new DistanceMeter(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.addEventHandlers();
  }

  showTurtleSelection() {
    this.turtleSelectionMenu.populateTurtles([1, 2, 3, 4, 5, 6], 4);
    this.turtleSelectionMenu.showMenu();
  }

  showGameUI() {
    this.pauseResumeButton.setVisible(true);
    this.coreUI.setVisible(true);
    this.distanceMeter.setVisible(true);
  }

  private handlePauseResume() {
    if (this.gameManager.isGamePaused) {
      this.gameManager.handleGameResume();
      this.pausedText.hide();
    } else {
      this.gameManager.handleGamePause();
      this.pausedText.show();
    }
  }

  private addEventHandlers() {
    this.coreUI.hungerMeter.on(CUSTOM_EVENTS.PAWN_STARVED, () => {
      this.gameManager.handleDeath();
    });
    this.gameManager.gameComponents.pawn.turtle.on(CUSTOM_EVENTS.PAWN_DEAD, () => {
      this.coreUI.hungerMeter.fillUpBar();
    });
    this.gameManager.events.on('collected', (count: number) => {
      this.coreUI.hungerMeter.decreaseHunger(count);
      this.coreUI.increaseScore(count * COLLECTIBLE_MULT);
    });
    this.pauseResumeButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.handlePauseResume();
    });
    this.scene.inputManager.events.on(CUSTOM_EVENTS.ESCAPE, () => {
      this.handlePauseResume();
      this.pauseResumeButton.handleOnClick(true);
    });
    this.turtleSelectionMenu.on(CUSTOM_EVENTS.START_GAME, (turtleDetails: any) => {
      this.gameManager.gameComponents.pawn.showPawnInitially();
    });
    this.gameManager.gameComponents.pawn.turtle.on(CUSTOM_EVENTS.PAWN_SPAWNED, () => {
      this.showGameUI();
      this.gameManager.startGame();
    });
  }

  resizeAndRepositionElements(): void {
    if (this.gameManager.currentResizeState === EResizeState.GAME) {
      this.pauseResumeButton.resizeAndRepositionElements();
      this.distanceMeter.resizeAndRepositionElements();
      this.coreUI.resizeAndRepositionElements();
    } else if (this.gameManager.currentResizeState === EResizeState.SELECTION_MENU) {
      this.turtleSelectionMenu.resizeAndRepositionElements();
    }
  }

  update(delta: number): void {
    if (this.gameManager.isGameStopped || this.gameManager.isGamePaused) {
      return;
    }
    this.hungerThreshold -= delta
    if (this.hungerThreshold <= 0) {
      this.coreUI.hungerMeter.increaseHunger();
      this.hungerThreshold = HUNGER_THRESHOLD;
    }
    this.distanceMeter.updateDistance(this.gameManager.gameComponents.scrollSpeed);
    this.coreUI.increaseScore(this.gameManager.gameComponents.scrollSpeed);
  }
}
