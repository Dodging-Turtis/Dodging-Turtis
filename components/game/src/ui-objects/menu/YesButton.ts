import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from './../AbstractButton';

export class YesButton extends AbstractButton {

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, false, 'yes_button');
    this.isEnabled = false;
  }
}
