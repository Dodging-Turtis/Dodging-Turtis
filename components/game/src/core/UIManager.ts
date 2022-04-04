import { CUSTOM_EVENTS, DEPTH } from '../cfg/constants/game-constants';
import { EPowerUpType } from '../cfg/enums/EPowerUpType';
import { EResizeState } from '../cfg/enums/EResizeState';
import type { AbstractScene } from '../scenes/AbstractScene';
import { CoreUI } from '../ui-objects/CoreUI';
import { DisplayPowerUp } from '../ui-objects/DisplayPowerUp';
import { DistanceMeter } from '../ui-objects/DistanceMeter';
import { Menu } from '../ui-objects/menu/Menu';
import { OverlayText } from '../ui-objects/OverlayText';
import { ResultScreen } from '../ui-objects/result/ResultScreen';
import { Logo } from '../ui-objects/sidebar/Logo';
import { SideBar } from '../ui-objects/sidebar/SideBar';
import { TurtleSelectionMenu } from '../ui-objects/TurtleSelectionMenu';
import { GameManager } from './GameManager';

const HUNGER_THRESHOLD = 500; //ms
const COLLECTIBLE_MULT = 100;
export class UIManager {
  scene: AbstractScene;
  private gameManager: GameManager;

  turtleSelectionMenu: TurtleSelectionMenu;
  sideBar!: SideBar;
  coreUI!: CoreUI;
  distanceMeter!: DistanceMeter;
  displayPowerUp!: DisplayPowerUp;
  menu!: Menu;
  resultScreen!: ResultScreen;
  logo!: Logo;
  overlayText!: OverlayText;

  hungerThreshold = HUNGER_THRESHOLD;

  constructor(scene: AbstractScene, gameManager: GameManager) {
    this.scene = scene;
    this.gameManager = gameManager;
    this.turtleSelectionMenu = new TurtleSelectionMenu(this.scene).setDepth(DEPTH.ui);
    this.sideBar = new SideBar(this.scene).setVisible(false).setDepth(DEPTH.ui);
    this.overlayText = new OverlayText(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.coreUI = new CoreUI(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.distanceMeter = new DistanceMeter(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.displayPowerUp = new DisplayPowerUp(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.menu = new Menu(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.resultScreen = new ResultScreen(this.scene).setDepth(DEPTH.ui).setVisible(false);
    this.logo = new Logo(this.scene).setDepth(DEPTH.ui);
    this.addEventHandlers();
  }

  showTurtleSelection(initTurtlesData: Array<IUserNftWithMetadata>) {
    this.turtleSelectionMenu.populateTurtles(initTurtlesData, 0);
    this.turtleSelectionMenu.showMenu();
  }

  showGameUI() {
    this.sideBar.setVisible(true);
    this.coreUI.setVisible(true);
    this.distanceMeter.setVisible(true);
  }

  hideGameUI() {
    this.sideBar.setVisible(false);
    this.coreUI.setVisible(false);
    this.distanceMeter.setVisible(false);
  }

  private handlePauseResume() {
    if (this.gameManager.isGamePaused) {
      this.gameManager.handleGameResume();
      this.sideBar.hideSideBar();
      this.overlayText.hide();
      if (this.menu.visible) {
        this.menu.hideMenu();
      }
    } else {
      this.gameManager.handleGamePause();
      this.sideBar.showSideBar();
      this.overlayText.changeText('PAUSED');
      this.overlayText.show();
    }
  }

  private handleGameOver() {
    this.overlayText.changeText('GAME OVER');
    this.overlayText.show();
    this.gameManager.gameComponents.overlay.showOverlay();
    this.gameManager.gameComponents.resetCamera();
    this.gameManager.endGame();
    const highScore = this.scene.initGameData.highScore;
    const score = this.coreUI.score;
    this.scene.initGameData.endGameCB(score, this.distanceMeter.distanceCovered);
    this.resultScreen.updateResultDetails({ travelled: this.distanceMeter.text, score: this.coreUI.scoreText.text, isMintable: score > highScore, highScore: this.scene.initGameData.highScore })
    this.resultScreen.showResultScreen();
    this.hideGameUI();
    this.logo.showLogo();
  }

  private addEventHandlers() {
    this.coreUI.hungerMeter.on(CUSTOM_EVENTS.PAWN_STARVED, () => {
      this.gameManager.handleDeath();
    });
    this.gameManager.gameComponents.pawn.turtle.on(CUSTOM_EVENTS.PAWN_DEAD, () => {
      this.coreUI.decrementLives();
      if (this.coreUI.lives === 0) {
        this.handleGameOver();
      } else {
        this.coreUI.hungerMeter.fillUpBar();
        this.gameManager.gameComponents.startTurtleRevival();
      }
    });
    this.gameManager.events.on('collected', (count: number) => {
      this.coreUI.hungerMeter.decreaseHunger(count);
      this.coreUI.increaseScore(count * COLLECTIBLE_MULT);
    });
    this.gameManager.events.on('powerUp', (powerUpType: EPowerUpType, powerUpTex: string) => {
      if (powerUpType !== EPowerUpType.SCROLL_SLOW) {
        this.displayPowerUp.showPowerUpWithTimer(powerUpTex);
      } else {
        this.displayPowerUp.showPowerUp(powerUpTex);
      }
    });
    this.sideBar.pauseResumeButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.handlePauseResume();
    });
    this.sideBar.menuButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      if (!this.menu.visible) {
        this.menu.showMenu();
      }
    });
    this.menu.noButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.menu.hideMenu();
    });
    this.menu.yesButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.menu.hideMenu();
      this.gameManager.gameComponents.resetCamera();
      this.handlePauseResume();
      this.gameManager.endGame();
      this.hideGameUI();
      this.coreUI.reset();
      this.distanceMeter.reset();
      this.showTurtleSelection(this.scene.initGameData.initMetaData);
    });
    this.resultScreen.events.on(CUSTOM_EVENTS.GO_TO_HOME_CLICKED, () => {
      this.scene.initGameData.goHomeCB();
    });
    this.resultScreen.playAgainButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.resultScreen.hideResultScreen();
      this.gameManager.gameComponents.overlay.hideOverlay();
      this.overlayText.hide();
      this.coreUI.reset();
      this.distanceMeter.reset();
      this.showTurtleSelection(this.scene.initGameData.initMetaData);
    });
    this.scene.inputManager.events.on(CUSTOM_EVENTS.ESCAPE, () => {
      this.handlePauseResume();

      this.sideBar.pauseResumeButton.handleOnClick(true);
    });
    this.turtleSelectionMenu.on(CUSTOM_EVENTS.START_GAME, (speed: number, index: number) => {
      this.gameManager.gameComponents.pawn.changePawn(speed, index);
      this.gameManager.gameComponents.pawn.showPawnInitially();
    });
    this.gameManager.gameComponents.pawn.turtle.on(CUSTOM_EVENTS.PAWN_SPAWNED, () => {
      this.showGameUI();
      this.logo.hideLogo();
      this.gameManager.startGame();
    });
  }

  resizeAndRepositionElements(): void {
    if (this.gameManager.currentResizeState === EResizeState.GAME) {
      this.sideBar.resizeAndRepositionElements();
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
    if (!this.gameManager.gameComponents.pawn.turtle.isGhost && !this.gameManager.gameComponents.pawn.turtle.isInvincible) {
      this.hungerThreshold -= delta
      if (this.hungerThreshold <= 0) {
        this.coreUI.hungerMeter.increaseHunger();
        this.hungerThreshold = HUNGER_THRESHOLD;
      }
    }
    this.distanceMeter.updateDistance(this.gameManager.gameComponents.scrollSpeed);
    this.coreUI.increaseScore(this.gameManager.gameComponents.scrollSpeed);
  }
}
