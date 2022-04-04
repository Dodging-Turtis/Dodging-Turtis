import { AudioManager } from '../core/AudioManager';
import { GameManager } from '../core/GameManager';
import { InputManager } from '../core/InputManager';
import { UIManager } from '../core/UIManager';
import { LandscapeOrientation } from '../ui-objects/LandscapeOrientation';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
  private gameManager!: GameManager;
  private uiManager!: UIManager;
  private landscapeOrientation!: LandscapeOrientation;

  private elementsCreated = false;
  private preloadDone = false;

  constructor() {
    super('game');
  }

  preload(): void {
    this.landscapeOrientation = new LandscapeOrientation(this);
  }

  private createGameElements(): void {
    this.elementsCreated = true;
    this.audioManager = new AudioManager(this);
    this.audioManager.initGameAudio();
    this.audioManager.play('bgm');
    this.inputManager = new InputManager(this);
    this.gameManager = new GameManager(this);
    this.uiManager = new UIManager(this, this.gameManager);
    this.uiManager.showTurtleSelection(this.initGameData.initMetaData);
  }

  create(): void {
    this.preloadDone = true;
    if (this.grs.isPortrait) {
      this.landscapeOrientation.showScreen();
    } else {
      this.createGameElements();
    }
  }

  resizeAndRepositionElements(): void {
    if (this.grs.isPortrait && this.preloadDone) {
      this.landscapeOrientation.resizeAndRepositionElements();
      this.landscapeOrientation.showScreen();
      return;
    }
    if (this.preloadDone) {
      this.landscapeOrientation.hideScreen();
      if (!this.elementsCreated) {
        this.createGameElements();
      }
    }

    if (this.gameManager) {
      this.gameManager.resizeAndRepositionElements();
    }
    if (this.uiManager) {
      this.uiManager.resizeAndRepositionElements();
    }
  }

  update(time: number, delta: number): void {
    if (this.gameManager) {
      this.inputManager.update(delta);
      this.gameManager.update(delta);
      this.uiManager.update(delta);
    }
  }
}
