import { EPowerUpType } from "../../cfg/enums/EPowerUpType";
import { AbstractScene } from "../../scenes/AbstractScene";
import { PowerUp } from "../abstract/PowerUp";

export class MovementSpeedPowerUp extends PowerUp {
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, 'movement_power');
    this.powerUpType = EPowerUpType.MOVEMENT_SPEED;
    this.playScaleInOutTween();
  }

  resetPowerUp(x: number, y: number) {
    super.resetPowerUp(x, y);
  }
}