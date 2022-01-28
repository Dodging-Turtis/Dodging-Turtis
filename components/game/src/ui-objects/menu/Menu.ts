import { CAM_CENTER } from '../../cfg/constants/design-constants';
import { TWEEN_EASING } from '../../cfg/constants/static-constants';
import { AbstractScene } from '../../scenes/AbstractScene';
import { NoButton } from './NoButton';
import { YesButton } from './YesButton';

export class Menu extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  base!: Phaser.GameObjects.Image;
  yesButton!: YesButton;
  noButton!: NoButton;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.addBase();
    this.yesButton = new YesButton(this.scene, -135, 90);
    this.noButton = new NoButton(this.scene, 135, 90);
    this.add([this.yesButton, this.noButton]);
    this.scene.add.existing(this);
  }

  private addBase() {
    this.base = this.scene.add.image(0, 0, 'main_menu_popup');
    this.add(this.base);
  }

  showMenu() {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      ease: TWEEN_EASING.BACK_EASE_OUT,
      duration: 350,
      onStart: () => {
        this.setScale(0);
        this.setVisible(true);
      },
      onComplete: () => {
        this.yesButton.isEnabled = true;
        this.noButton.isEnabled = true;
      }
    });
  }

  hideMenu() {
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      ease: TWEEN_EASING.BACK_EASE_IN,
      duration: 250,
      onComplete: () => {
        this.setVisible(false);
      }
    });
  }
}
