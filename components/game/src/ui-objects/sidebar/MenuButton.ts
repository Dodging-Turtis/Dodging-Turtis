import { TWEEN_EASING } from '../../cfg/constants/static-constants';
import { IPosition } from '../../cfg/interfaces/IPosition';
import { AbstractScene } from '../../scenes/AbstractScene';
import { AbstractButton } from '../AbstractButton';

export class MenuButton extends AbstractButton {
  origPosition!: IPosition;
  endPosition!: IPosition;

  constructor(scene: AbstractScene, x: number, y: number, endX: number, endY: number) {
    super(scene, x, y, true, 'menu_button');
    this.origPosition = { x, y };
    this.endPosition = { x: endX, y: endY };
  }

  private show() {
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

  showNormalMenuButton() {
    this.setTexture('menu_button');
    this.setPosition(this.origPosition.x, this.origPosition.y);
    this.show();
  }

  showEndMenuButton() {
    this.setTexture('end_menu_button');
    this.setPosition(this.endPosition.x, this.endPosition.y);
    this.show();
  }

  hide() {
    this.setVisible(false);
  }
}
