import { CAM_CENTER } from '../cfg/constants/design-constants';
import { TAP_TO_PLAY_CONFIG } from '../cfg/constants/game-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class TapToPlay extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private background!: Phaser.GameObjects.Rectangle;
  private text!: Phaser.GameObjects.Text;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.addBackground();
    this.addText();
    this.addTouchHandler();
    this.scene.add.existing(this);
  }

  private addBackground() {
    const { width, height } = this.scene.grs.resizeDim;
    this.background = this.scene.add.rectangle(
      0,
      0,
      width,
      height,
      TAP_TO_PLAY_CONFIG.screenColor
    );
    this.background.setOrigin(0.5);
    this.add(this.background);
  }

  private addTouchHandler() {
    this.background.setInteractive().once('pointerdown', () => {
      this.hideScreen();
      this.emit('screen-tapped');
    });
  }

  private addText() {
    this.text = this.scene.add
      .text(0, 0, 'TAP TO PLAY', {
        fontFamily: 'Lato',
        fontSize: TAP_TO_PLAY_CONFIG.fontSize,
        resolution: 3,
        color: TAP_TO_PLAY_CONFIG.fontColor,
        shadow: {
          offsetX: 0,
          offsetY: 0,
          color: TAP_TO_PLAY_CONFIG.fontShadow,
          blur: 20,
          stroke: true,
          fill: true,
        },
        padding: {
          left: 0,
          right: 5,
          top: 0,
          bottom: 0,
        },
      })
      .setAlign('center')
      .setOrigin(0.5);
    this.add(this.text);
  }

  hideScreen(): void {
    this.setVisible(false);
  }

  showScreen(): void {
    this.setVisible(true);
  }

  resizeAndRepositionElements(): void {
    this.background.setDisplaySize(
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height
    );
  }
}
