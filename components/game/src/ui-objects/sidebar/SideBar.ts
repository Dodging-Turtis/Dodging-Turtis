import { CAM_CENTER } from "../../cfg/constants/design-constants";
import { AbstractScene } from "../../scenes/AbstractScene";
import { MenuButton } from "./MenuButton";
import { PauseResumeButton } from "./PauseResumeButton";
import { SoundToggleButton } from "./SoundToggleButton";

export class SideBar extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  base!: Phaser.GameObjects.Image;
  pauseResumeButton!: PauseResumeButton;
  soundToggleButton!: SoundToggleButton;
  menuButton!: MenuButton;

  buttonProps = {
    sound: { threshold: 0.4, isShown: false },
    menu: { threshold: 0.75, isShown: false }
  }

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x - scene.grs.designDim.width * 0.5 + 100,
      CAM_CENTER.y - scene.grs.resizeDim.height * 0.5 + 100);
    this.scene = scene;

    this.addBaseImage();
    this.addPauseResumeButton();
    this.addSoundToggleButton();
    this.addMenuButton();
    this.scene.add.existing(this);
  }

  private addBaseImage() {
    this.base = this.scene.add.image(0, 0, 'side_bar');
    this.base.setOrigin(0.5, 0);
    this.base.setScale(0.75, 0);
    this.add(this.base);
  }

  private addPauseResumeButton() {
    this.pauseResumeButton = new PauseResumeButton(this.scene, 0, 0).setVisible(true);
    this.add(this.pauseResumeButton);
  }

  private addSoundToggleButton() {
    this.soundToggleButton = new SoundToggleButton(this.scene, 0, 90).setVisible(false);
    this.add(this.soundToggleButton);
  }

  private addMenuButton() {
    this.menuButton = new MenuButton(this.scene, 0, 175, 0, 0).setVisible(false);
    this.add(this.menuButton);
  }

  showEndMenuButton() {
    this.menuButton.showEndMenuButton();
    this.pauseResumeButton.setVisible(false);
  }

  showSideBar() {
    this.scene.tweens.add({
      targets: this.base,
      scaleY: 1,
      scaleX: 1,
      duration: 50,
      onUpdate: () => {
        if (!this.buttonProps.sound.isShown && this.base.scaleY > this.buttonProps.sound.threshold) {
          this.buttonProps.sound.isShown = true;
          this.soundToggleButton.setVisible(true);
          this.soundToggleButton.show();

        }
        if (!this.buttonProps.menu.isShown && this.base.scaleY > this.buttonProps.menu.threshold) {
          this.buttonProps.menu.isShown = true;
          this.menuButton.setVisible(true);
          this.menuButton.showNormalMenuButton();
        }
      }
    })
  }

  hideSideBar() {
    this.scene.tweens.add({
      targets: this.base,
      scaleY: 0,
      scaleX: 0.75,
      duration: 50,
      onUpdate: () => {
        if (this.buttonProps.sound.isShown && this.base.scaleY < this.buttonProps.sound.threshold) {
          this.buttonProps.sound.isShown = false;
          this.soundToggleButton.hide();
        }
        if (this.buttonProps.menu.isShown && this.base.scaleY < this.buttonProps.menu.threshold) {
          this.buttonProps.menu.isShown = false;
          this.menuButton.hide();
        }
      }
    })
  }

  resizeAndRepositionElements() {
    this.setPosition(CAM_CENTER.x + this.scene.grs.resizeDim.width * 0.375, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.4);
  }

}