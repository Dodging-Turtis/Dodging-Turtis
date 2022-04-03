import { CAM_CENTER } from '../cfg/constants/design-constants';
import { GAME_FONT } from '../cfg/constants/game-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class OverlayText extends Phaser.GameObjects.Text {

  scene: AbstractScene;

  constructor(scene: AbstractScene) {
    const titleConfig = {
      fontFamily: GAME_FONT,
      fontSize: '76px',
      resolution: 3,
      color: '#FFFFFF',
    }
    super(scene, CAM_CENTER.x, CAM_CENTER.y - scene.grs.designDim.height * 0.35, 'TEXT', titleConfig);
    this.scene = scene;
    this.setOrigin(0.5);
    this.scene.add.existing(this);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  changeText(text: string) {
    this.text = text;
  }

  resizeAndRepositionElements(): void {
    this.setPosition(CAM_CENTER.x - this.scene.grs.designDim.width * 0.5, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.5);
  }
}
