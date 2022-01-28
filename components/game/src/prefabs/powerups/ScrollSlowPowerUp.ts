import { EPowerUpType } from "../../cfg/enums/EPowerUpType";
import { AbstractScene } from "../../scenes/AbstractScene";
import { PowerUp } from "../abstract/PowerUp";

export class ScrollSlowPowerUp extends PowerUp {
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, 'slow_scroll_power');
    this.powerUpType = EPowerUpType.SCROLL_SLOW;
    this.playScaleInOutTween();
  }

  resetPowerUp(x: number, y: number) {
    super.resetPowerUp(x, y);
  }
}