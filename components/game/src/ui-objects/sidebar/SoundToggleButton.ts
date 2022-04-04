import { TWEEN_EASING } from '../../cfg/constants/static-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from '../AbstractButton';

export class SoundToggleButton extends AbstractButton {
  private wasSoundOn = true;
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, true, 'sound_on');

    this.onClickComplete = () => {
      if (this.wasSoundOn) {
        this.setTexture('sound_off');
        this.scene.audioManager.turnOff();
      } else {
        this.setTexture('sound_on');
        this.scene.audioManager.turnOn();
      }
      this.wasSoundOn = !this.wasSoundOn;
    }
  }

  show() {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 50,
      onStart: () => {
        this.scale = 0;
        this.setVisible(true);
      },
      ease: TWEEN_EASING.BACK_EASE_OUT,
    })
  }

  hide() {
    this.setVisible(false);
  }
}
