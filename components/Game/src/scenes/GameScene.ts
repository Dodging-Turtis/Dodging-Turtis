import { CUSTOM_EVENTS } from '../cfg/constants/game-constants';
import { IDataConfig } from '../cfg/interfaces/IDataConfig';
import { AudioManager } from '../core/AudioManager';
import { GameManager } from '../core/GameManager';
import { UIManager } from '../core/UIManager';
import { LandscapeOrientation } from '../ui-objects/LandscapeOrientation';
import { GameResizer } from '../utils/GameResizer';
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

  init(initData: { grs: GameResizer, dataConfig?: IDataConfig }) {
    super.init(initData);
    if (initData.dataConfig) {
      console.warn('init game data config', initData.dataConfig);
    }
  }

  preload(): void {
    this.landscapeOrientation = new LandscapeOrientation(this);
  }

  private createGameElements(): void {
    this.elementsCreated = true;
    this.audioManager = new AudioManager(this);
    this.audioManager.initGameAudio();
    this.gameManager = new GameManager(this);
    this.uiManager = new UIManager(this, this.gameManager);
    this.uiManager.tapToPlay.once('screen-tapped', () => {
      // Start Game
    });
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
      this.landscapeOrientation.showScreen();
      return;
    }
    if (this.preloadDone) {
      this.landscapeOrientation.resizeAndRepositionElements();
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
      this.gameManager.update(delta);
    }
    if (this.uiManager) {
      this.uiManager.update(delta);
    }
  }
}
