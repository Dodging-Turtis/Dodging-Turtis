import type { AbstractScene } from '../../scenes/AbstractScene';
import { LeftBank } from './LeftBank';
import { LeftGrass } from './LeftGrass';
import { RightBank } from './RightBank';
import { RightGrass } from './RightGrass';

export class BankManager {
  scene: AbstractScene;

  private leftBank: LeftBank;
  private leftGrass: LeftGrass;

  private rightBank: RightBank;
  private rightGrass: RightGrass;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.leftBank = new LeftBank(this.scene);
    this.leftGrass = new LeftGrass(this.scene);

    this.rightBank = new RightBank(this.scene);
    this.rightGrass = new RightGrass(this.scene);
  }

  scroll(speed: number) {
    this.leftBank.scroll(speed);
    this.leftGrass.scroll(speed);

    this.rightBank.scroll(speed);
    this.rightGrass.scroll(speed);
  }
}
