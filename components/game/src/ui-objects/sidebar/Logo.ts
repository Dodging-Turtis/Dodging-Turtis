import { CAM_CENTER } from "../../cfg/constants/design-constants";
import { AbstractScene } from "../../scenes/AbstractScene";

export class Logo extends Phaser.GameObjects.Image {
  scene: AbstractScene;
  constructor(scene: AbstractScene) {
    super(scene,
      CAM_CENTER.x - scene.grs.designDim.width * 0.5 + 100,
      CAM_CENTER.y - scene.grs.resizeDim.height * 0.5 + 125,
      'logo');
    this.scene = scene;
    this.scene.add.existing(this);
  }

  showLogo() {
    this.setVisible(true);
  }

  hideLogo() {
    this.setVisible(false);
  }

  resizeAndRepositionElements() {
    this.setPosition(CAM_CENTER.x - this.scene.grs.designDim.width * 0.5 + 100, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.5 + 125);
  }

}