import { AbstractScene } from '../scenes/AbstractScene';
import { AbstractButton } from './AbstractButton';

export class StartButton extends AbstractButton {
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, false, 'start_button');
  }

  resizeAndRepositionElements(): void {
    this.setPosition(this.scene.grs.designDim.width * 0.275, this.scene.grs.designDim.height * 0.35);
  }
}
