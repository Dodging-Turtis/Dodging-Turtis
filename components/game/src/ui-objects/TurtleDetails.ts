import { GAME_FONT } from "../cfg/constants/game-constants";
import { AbstractScene } from "../scenes/AbstractScene";

export class TurtleDetails extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  overlay!: Phaser.GameObjects.Image;

  turtleName!: Phaser.GameObjects.Text;
  id!: Phaser.GameObjects.Text;

  speedTitleText!: Phaser.GameObjects.Text;
  ageTitleText!: Phaser.GameObjects.Text;
  travelledTitleText!: Phaser.GameObjects.Text;
  dobTitleText!: Phaser.GameObjects.Text;

  speedText!: Phaser.GameObjects.Text;
  ageText!: Phaser.GameObjects.Text;
  travelledText!: Phaser.GameObjects.Text;
  dobText!: Phaser.GameObjects.Text;

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    this.addOverlay();
    this.addTexts();
    this.scene.add.existing(this);
  }

  private addOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'black_overlay');
    this.overlay.setOrigin(0.5);
    this.overlay.setAlpha(0.15);
    this.overlay.setDisplaySize(
      this.scene.grs.designDim.width * 0.275,
      this.scene.grs.resizeDim.height * 0.25
    );
    this.add(this.overlay);
  }

  private addTexts() {
    const titleConfig = {
      fontFamily: GAME_FONT,
      fontSize: '24px',
      resolution: 3,
      color: '#FFFFFF',
    }

    this.turtleName = this.scene.add.text(0, this.overlay.getTopCenter().y - 36, 'Name of Turtle', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.turtleName.setFontSize(48);
    this.id = this.scene.add.text(this.overlay.getBottomLeft().x + 36, this.overlay.getBottomCenter().y - 30, '#12441535', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.id.setFontSize(24);

    const titlePosX = this.overlay.getLeftCenter().x + 72;
    const textStartPosY = this.overlay.getLeftCenter().y - 84;

    const textYOffset = 42;

    this.speedTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 0, 'Speed:', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.ageTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 1, 'Age:', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.travelledTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 2, 'Travelled:', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.dobTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 3, 'DOB:', titleConfig).setAlign('left').setOrigin(0, 0.5);

    const textPosX = this.overlay.x + 64;

    titleConfig.fontSize = '32px';
    this.speedText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 0, '342', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.ageText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 1, '24 years', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.travelledText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 2, '342 kms', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.dobText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 3, '22-03-2021', titleConfig).setAlign('center').setOrigin(0.5, 0.5);

    this.add([
      this.turtleName,
      this.id,
      this.speedTitleText,
      this.ageTitleText,
      this.travelledTitleText,
      this.dobTitleText,
      this.speedText,
      this.ageText,
      this.travelledText,
      this.dobText
    ]);
  }

  updateTurtleDetails(details: IUserNftWithMetadata) {
    this.turtleName.text = details.metadata.name;
    this.id.text = `${details.tokenId}`;

    const speedAttrib = details.metadata.attributes.find((attrib) => {
      if (attrib.trait_type === 'speed') {
        return true;
      }
    })
    this.speedText.text = `${speedAttrib ? speedAttrib.value : 0}`;
    this.ageText.text = '35';
    this.travelledText.text = '125m';
    this.dobText.text = '09/09/9999';
  }


}