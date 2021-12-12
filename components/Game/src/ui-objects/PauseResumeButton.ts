import { CAM_CENTER } from '../cfg/constants/design-constants';
import { AbstractScene } from '../scenes/AbstractScene';
import { AbstractButton } from './AbstractButton';

export class PauseResumeButton extends AbstractButton {
  private wasPaused = false;
  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x - scene.grs.designDim.width * 0.5 + 100, CAM_CENTER.y - scene.grs.resizeDim.height * 0.5 + 100, true, 'pause_button');

    this.onClickComplete = () => {
      if (this.wasPaused) {
        this.setTexture('pause_button');
      } else {
        this.setTexture('resume_button');
      }
      this.wasPaused = !this.wasPaused;
    }
  }

  resizeAndRepositionElements(): void {
    this.setPosition(CAM_CENTER.x - this.scene.grs.designDim.width * 0.5 + 100, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.5 + 100)
  }
}
