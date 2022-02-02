import { EPowerUpType } from "../../cfg/enums/EPowerUpType";
import { AbstractScene } from "../../scenes/AbstractScene";
import { PowerUp } from "../abstract/PowerUp";

export class InvincibilityPowerUp extends PowerUp {
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, 'invincibility_power');
    this.powerUpType = EPowerUpType.INVINCIBILITY;
    this.playScaleInOutTween();
  }

  resetPowerUp(x: number, y: number) {
    super.resetPowerUp(x, y);
  }
}