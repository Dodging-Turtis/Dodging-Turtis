import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from '../AbstractButton';

export class PauseResumeButton extends AbstractButton {
  private wasPaused = false;
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, true, 'pause_button');

    this.onClickComplete = () => {
      if (this.wasPaused) {
        this.setTexture('pause_button');
      } else {
        this.setTexture('resume_button');
      }
      this.wasPaused = !this.wasPaused;
    }
  }
}
