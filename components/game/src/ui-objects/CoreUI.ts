import { CAM_CENTER } from "../cfg/constants/design-constants";
import { GAME_FONT } from "../cfg/constants/game-constants";
import { TWEEN_EASING } from "../cfg/constants/static-constants";
import { AbstractScene } from "../scenes/AbstractScene";
import { HungerMeter } from "./HungerMeter";

const MAX_LIVES = 3;
export class CoreUI extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  hungerMeter!: HungerMeter;
  baseImage!: Phaser.GameObjects.Image;
  livesImage!: Phaser.GameObjects.Image;
  livesText!: Phaser.GameObjects.Text;
  scoreText!: Phaser.GameObjects.Text;
  highScoreText!: Phaser.GameObjects.Text;

  lives = MAX_LIVES;
  score = 0;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x + scene.grs.resizeDim.width * 0.375, CAM_CENTER.y - scene.grs.resizeDim.height * 0.4);
    this.scene = scene;
    this.addHungerMeter();
    this.addBaseImage();
    this.addLivesImage();
    this.addLivesText();
    this.addScoreText();
    this.addHighScoreText();
    this.scene.add.existing(this);
  }

  private addHungerMeter() {
    this.hungerMeter = new HungerMeter(this.scene, -75, 50);
    this.add(this.hungerMeter);
    this.hungerMeter.setupHungerMeter();
  }

  private addBaseImage() {
    this.baseImage = this.scene.add.image(0, 0, 'core_ui');
    this.add(this.baseImage);
  }

  private addLivesImage() {
    this.livesImage = this.scene.add.image(82.5, 5, 'lives');
    this.add(this.livesImage);
  }

  private addLivesText() {
    this.livesText = this.scene.add.text(82.5, 0, `${this.lives}`, {
      fontFamily: GAME_FONT,
      fontSize: '48px',
      resolution: 3,
      color: '#ffffff',
    });
    this.livesText.setAlign('right');
    this.livesText.setOrigin(0.5, 0.5);
    this.add(this.livesText);
  }

  private addScoreText() {
    this.scoreText = this.scene.add.text(30, -5, '0', {
      fontFamily: GAME_FONT,
      fontSize: '48px',
      resolution: 3,
      color: '#C99146',
    });
    this.scoreText.setAlign('right');
    this.scoreText.setOrigin(1, 0.5);
    this.add(this.scoreText);

  }

  private addHighScoreText() {
    this.highScoreText = this.scene.add.text(10, -56, '600', {
      fontFamily: GAME_FONT,
      fontSize: '24px',
      resolution: 3,
      color: '#DAB69F',
    });
    this.highScoreText.setAlign('right');
    this.highScoreText.setOrigin(1, 0.5);
    this.add(this.highScoreText);

  }

  scoreFormatter() {
    let score = Math.floor(this.score);
    if (score > 100_000 && score < 1_000_000) {
      score /= 1_000;
      return `${score.toFixed(1)}k`;
    } else if (score > 1_000_000) {
      score /= 1_000_000;
      return `${score.toFixed(1)}m`
    }
    return `${score}`;
  }

  increaseScore(value: number) {
    this.score += value;
    this.scoreText.text = this.scoreFormatter();
  }

  decrementLives() {
    this.lives--;
    this.scene.add.tween({
      targets: this.livesImage,
      scale: { to: 0.85, from: 1 },
      yoyo: true,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      duration: 100,
      repeat: 2,
      onComplete: () => {
        this.setScale(1);
      },
    });
    this.scene.add.tween({
      targets: this.livesText,
      scale: 0,
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_OUT,
      duration: 300,
      onYoyo: () => {
        this.livesText.text = `${this.lives}`;
      }
    })
  }

  reset() {
    this.lives = MAX_LIVES;
    this.score = 0;
    this.scoreText.text = this.scoreFormatter();
    this.livesText.text = `${this.lives}`;
    this.hungerMeter.reset();
  }

  resizeAndRepositionElements() {
    this.setPosition(CAM_CENTER.x + this.scene.grs.resizeDim.width * 0.375, CAM_CENTER.y - this.scene.grs.resizeDim.height * 0.4);
  }

}