import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from './../AbstractButton';

export class NoButton extends AbstractButton {

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, false, 'no_button');
    this.isEnabled = false;
  }
}
