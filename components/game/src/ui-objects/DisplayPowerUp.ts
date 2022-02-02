import { CAM_CENTER } from '../cfg/constants/design-constants';
import { DEPTH } from '../cfg/constants/game-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import { AbstractScene } from '../scenes/AbstractScene';

export class DisplayPowerUp extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  outerBase!: Phaser.GameObjects.Image;
  timerArc!: Phaser.GameObjects.Graphics;
  innerBase!: Phaser.GameObjects.Image;
  powerUpImage!: Phaser.GameObjects.Image;

  currentTimerAngle = -90;
  timerArcTween: Phaser.Tweens.Tween | null = null;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x + scene.grs.designDim.width * 0.5 - 100, CAM_CENTER.y + scene.grs.designDim.height * 0.25);
    this.scene = scene;
    this.addOuterBase();
    this.addTimerArc();
    this.addInnerBase();
    this.addPowerUpImage();
    this.scene.add.existing(this);
  }

  private addOuterBase() {
    this.outerBase = this.scene.add.image(0, 0, 'power_up_base_outer');
    this.add(this.outerBase);
  }

  private addTimerArc(): void {
    if (this.timerArc) {
      this.timerArc.destroy();
    }
    this.timerArc = this.scene.add.graphics();
    this.timerArc.setDepth(DEPTH.ui + 1);
  }

  private showTimerArc() {
    this.timerArc.clear();
    this.timerArc.fillStyle(0xffffff, 1);
    const radius = this.scale * (this.outerBase.displayHeight * 0.5 - 5);
    const start = Phaser.Math.DegToRad(-90);
    const end = Phaser.Math.DegToRad(this.currentTimerAngle);
    this.timerArc.slice(this.x, this.y, radius, start, end, false);
    this.timerArc.fillPath();
  }

  private addInnerBase() {
    this.innerBase = this.scene.add.image(this.x, this.y, 'power_up_base_inner').setDepth(DEPTH.powerUpDisplay).setVisible(false);
  }

  private addPowerUpImage() {
    this.powerUpImage = this.scene.add.image(this.x, this.y - 3, '').setDepth(DEPTH.powerUpDisplay).setVisible(false);
  }

  showPowerUpWithTimer(powerUpTex: string) {
    this.powerUpImage.setTexture(powerUpTex);
    this.scene.tweens.add({
      targets: this.powerUpImage,
      scale: 1,
      ease: TWEEN_EASING.BACK_EASE_OUT,
      duration: 350,
      onStart: () => {
        this.powerUpImage.setScale(0);
        this.powerUpImage.setVisible(true);
      },
      onComplete: () => {
        this.startTimerArc();
      }
    });
    this.scene.tweens.add({
      targets: [this, this.innerBase],
      scale: 1,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      duration: 250,
      onStart: () => {
        this.setScale(0);
        this.setVisible(true);
        this.innerBase.setScale(0);
        this.innerBase.setVisible(true);
      }
    });
  }

  showPowerUp(powerUpTex: string) {
    this.powerUpImage.setTexture(powerUpTex);
    this.scene.tweens.add({
      targets: this.powerUpImage,
      scale: 1,
      ease: TWEEN_EASING.BACK_EASE_OUT,
      duration: 350,
      onStart: () => {
        this.powerUpImage.setScale(0);
        this.powerUpImage.setVisible(true);
      },
      onComplete: () => {
        this.scene.time.delayedCall(1000, () => {
          this.hidePowerUp();
        });
      }
    });
    this.scene.tweens.add({
      targets: [this, this.innerBase],
      scale: 1,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      duration: 250,
      onStart: () => {
        this.setScale(0);
        this.setVisible(true);
        this.innerBase.setScale(0);
        this.innerBase.setVisible(true);
      }
    });
  }

  startTimerArc(): void {
    this.stopIdleCircleTimer();
    this.timerArcTween = this.scene.tweens.add({
      targets: this,
      duration: 5000,
      currentTimerAngle: 270,
      onStart: () => {
        this.currentTimerAngle = -90;
      },
      onUpdate: () => {
        this.showTimerArc();
      },
      onComplete: () => {
        this.timerArc?.clear();
        this.hidePowerUp();
      },
      onStop: () => {
        this.timerArc?.clear();
      },
    });
  }

  stopIdleCircleTimer(): void {
    if (this.timerArcTween && this.timerArcTween.isPlaying()) {
      this.timerArcTween.stop();
      this.timerArcTween = null;
    }
  }

  hidePowerUp() {
    this.scene.tweens.add({
      targets: [this, this.powerUpImage, this.innerBase],
      scale: 0,
      ease: TWEEN_EASING.BACK_EASE_IN,
      duration: 250,
      onComplete: () => {
        this.setVisible(false);
        this.powerUpImage.setVisible(false);
        this.innerBase.setVisible(false);
      }
    });
  }



}
