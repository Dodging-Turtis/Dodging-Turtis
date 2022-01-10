import { CAM_CENTER, DESIGN_RES } from '../cfg/constants/design-constants';
import { ResizerType } from '../cfg/constants/static-constants';
import type { AbstractScene } from '../scenes/AbstractScene';
import { CameraResizer } from './CameraResizer';

interface IDisplaySize {
  width: number;
  height: number;
  top: number;
  bot: number;
  left: number;
  right: number;
}

export class GameResizer {
  game: Phaser.Game;

  private _gameDesignSize: IDisplaySize;
  private _gameResizeSize: IDisplaySize;

  private _camResizer: CameraResizer;

  isPortrait: boolean;
  resizerType: ResizerType = ResizerType.ZOOM_FIT_DPR;

  dpr = 0;

  constructor(game: Phaser.Game, dpr: number) {
    this.game = game;

    // Default: Landscape for the game. Change to portrait if the game is mainly designed in portrait
    const designRes = DESIGN_RES.portrait;

    this.dpr = dpr;

    this._gameDesignSize = {
      width: designRes.width,
      height: designRes.height,
      top: CAM_CENTER.y - designRes.height * 0.5,
      bot: CAM_CENTER.y + designRes.height * 0.5,
      left: CAM_CENTER.x - designRes.width * 0.5,
      right: CAM_CENTER.x + designRes.width * 0.5,
    };

    this._gameResizeSize = {
      width: 0,
      height: 0,
      top: 0,
      bot: 0,
      left: 0,
      right: 0,
    };

    this._camResizer = new CameraResizer(this.game, this._gameResizeSize);

    this.isPortrait = false;

    this.resize();
  }

  /** The dimensions of entire display area */
  get resizeDim(): IDisplaySize {
    return { ...this._gameResizeSize };
  }

  /** The dimensions of the design area (SAFE AREA) */
  get designDim(): IDisplaySize {
    return { ...this._gameDesignSize };
  }

  resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // if (w <= h) {
    //   this._gameDesignSize.width = DESIGN_RES.portrait.width;
    //   this._gameDesignSize.height = DESIGN_RES.portrait.height;
    // } else {
      this._gameDesignSize.height = DESIGN_RES.landscape.height;
      this._gameDesignSize.width = DESIGN_RES.landscape.width;
    // }

    this.isPortrait = w <= h;

    if (this.resizerType === ResizerType.FIT) {
      this.preserveARWithEmptyRegions(
        w,
        h,
        this._gameDesignSize.width,
        this._gameDesignSize.height
      );
    } else if (this.resizerType === ResizerType.ZOOM_FIT) {
      // this.dpr = 1;
      this._camResizer.preserveMainContentUsingZoom(w, h, this.dpr);
    } else if (this.resizerType === ResizerType.ZOOM_FIT_DPR) {
      // this.dpr = window.devicePixelRatio;
      this._camResizer.preserveMainContentUsingZoom(w, h, this.dpr);
    }
  }

  // Preserve the aspect ratio and fit to screen. Might add empty spaces to the sides of the canvas.
  private preserveARWithEmptyRegions(
    winWidth: number,
    winHeight: number,
    origWidth: number,
    origHeight: number
  ): void {
    const scale = Math.min(winWidth / origWidth, winHeight / origHeight);

    const newWidth = origWidth * scale;
    const newHeight = origHeight * scale;

    // scale the width and height of the css
    this.game.scale.canvas.style.width = `${Math.round(newWidth)}px`;
    this.game.scale.canvas.style.height = `${Math.round(newHeight)}px`;

    // center the game with css absolute values
    this.game.scale.canvas.style.top = `${Math.round(winHeight - newHeight) / 2}px`;
    this.game.scale.canvas.style.left = `${Math.round((winWidth - newWidth) / 2)}px`;

    this._gameResizeSize = {
      width: origWidth,
      height: origHeight,
      top: CAM_CENTER.y - origHeight * 0.5,
      bot: CAM_CENTER.y + origHeight * 0.5,
      left: CAM_CENTER.x - origWidth * 0.5,
      right: CAM_CENTER.x + origWidth * 0.5,
    };

    this.game.scale.emit('custom-resize');
  }

  setCamera(scene: AbstractScene): void {
    if (this.resizerType === ResizerType.FIT) {
      scene.cameras.main.centerOn(CAM_CENTER.x, CAM_CENTER.y);
    } else if (this.resizerType === ResizerType.ZOOM_FIT) {
      this._camResizer.setCameraSizeAndZoom(scene);
    } else if (this.resizerType === ResizerType.ZOOM_FIT_DPR) {
      this._camResizer.setCameraSizeAndZoom(scene);
    }
  }
}
