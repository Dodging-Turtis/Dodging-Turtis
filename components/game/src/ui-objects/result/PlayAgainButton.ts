import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from '../AbstractButton';

export class PlayAgainButton extends AbstractButton {

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, false, 'play_again');
    this.isEnabled = false;
  }
}
