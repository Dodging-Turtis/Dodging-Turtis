import { TWEEN_EASING } from '../../cfg/constants/static-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from '../AbstractButton';

export class MenuButton extends AbstractButton {
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, true, 'menu_button');
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
