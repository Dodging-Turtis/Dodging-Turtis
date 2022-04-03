import { CUSTOM_EVENTS } from "../cfg/constants/game-constants";
import { TWEEN_EASING } from "../cfg/constants/static-constants";
import { AbstractScene } from "../scenes/AbstractScene";

export class Turtle extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  limbs!: {
    leftHand: Phaser.GameObjects.Image;
    leftFoot: Phaser.GameObjects.Image;
    rightHand: Phaser.GameObjects.Image;
    rightFoot: Phaser.GameObjects.Image;
  }

  tail!: Phaser.GameObjects.Image;
  head!: Phaser.GameObjects.Image;
  eyes!: Phaser.GameObjects.Image;

  innerShell!: Phaser.GameObjects.Image;
  outerShell!: Phaser.GameObjects.Image;

  displayImage!: Phaser.GameObjects.Image;

  turtleOrigScale = 0.175;
  isGhost = false;
  isInvincible = false;
  pawnLimbTweens: Array<Phaser.Tweens.Tween | null> = [];
  pawnResetLimbTweens: Array<Phaser.Tweens.Tween | null> = [];

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
  }

  private addLimbs() {
    const leftHand = this.scene.add.image(-75, -75, 'left_hand_1').setOrigin(1, 1);
    const leftFoot = this.scene.add.image(-75, 75, 'left_foot_1').setOrigin(1, 0);
    const rightHand = this.scene.add.image(75, -75, 'left_hand_1').setFlipX(true).setOrigin(0, 1);
    const rightFoot = this.scene.add.image(75, 75, 'left_foot_1').setFlipX(true).setOrigin(0, 0);
    this.add([leftHand, leftFoot, rightHand, rightFoot]);
    this.limbs = {
      leftHand,
      leftFoot,
      rightHand,
      rightFoot
    }
  }

  private addTail() {
    this.tail = this.scene.add.image(0, 250, 'tail_1').setOrigin(0.5, 0);
    this.add(this.tail);
  }

  private addHead() {
    this.head = this.scene.add.image(0, -250, 'head_1').setOrigin(0.5, 1);
    this.add(this.head);
  }

  private addEyes() {
    this.eyes = this.scene.add.image(0, -375, 'eyes_1').setOrigin(0.5, 0.5);
    this.add(this.eyes);
  }

  private addInnerShell() {
    this.innerShell = this.scene.add.image(0, 0, 'in_shell_1');
    this.add(this.innerShell);
  }

  private addOuterShell() {
    this.outerShell = this.scene.add.image(0, 0, 'out_shell_1');
    this.add(this.outerShell);
  }

  private addDisplayImage(imageKey: string) {
    this.displayImage = this.scene.add.image(0, 0, imageKey);
    this.add(this.displayImage);
  }

  private setLimbsToInitialAngle() {
    this.limbs.rightHand.angle = 10;
    this.limbs.leftHand.angle = -10;
    this.limbs.leftFoot.angle = -5;
    this.limbs.rightFoot.angle = 5;
  }

  setupDisplayTurtle(index: number) {
    if (!this.displayImage) {
      this.addDisplayImage(`turtle_display_${index}`);
    } else {
      this.displayImage.setTexture(`turtle_display_${index}`);
    }
  }

  setupGameTurtle() {
    this.addLimbs();
    this.addTail();
    this.addHead();
    this.addEyes();
    this.addInnerShell();
    this.addOuterShell();
  }

  changeGameTurtle(index: number) {
    this.limbs.leftHand.setTexture(`turtle_left_hand_${index}`);
    this.limbs.leftFoot.setTexture(`turtle_left_foot_${index}`);
    this.limbs.rightHand.setTexture(`turtle_left_hand_${index}`);
    this.limbs.rightFoot.setTexture(`turtle_left_foot_${index}`);
    this.tail.setTexture(`turtle_tail_${index}`);
    this.head.setTexture(`turtle_head_${index}`);
    this.eyes.setTexture(`turtle_eyes_${index}`);
    this.innerShell.setTexture(`turtle_inner_shell_${index}`);
    this.outerShell.setTexture(`turtle_outer_shell_${index}`);
  }

  pawnCollidedTween(): void {
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      duration: 500,
      angle: 720,
      ease: TWEEN_EASING.BACK_EASE_IN,
      onComplete: () => {
        this.setAngle(0);
        this.setLimbsToInitialAngle();
        this.scene.time.delayedCall(120, () => {
          this.emit(CUSTOM_EVENTS.PAWN_DEAD);
        });
      }
    });
  }

  playConsumeTween(): void {
    this.scene.tweens.add({
      targets: [this.head, this.eyes],
      scale: 1.1,
      yoyo: true,
      duration: 50,
      ease: TWEEN_EASING.QUINT_EASE_OUT,
      onComplete: () => {
        this.head.setScale(1);
        this.eyes.setScale(1);
      }
    })
  }

  playPawnReviveTween(): void {
    this.scene.tweens.add({
      targets: this,
      scale: { from: 0, to: this.turtleOrigScale, ease: TWEEN_EASING.EXPO_EASE_OUT, duration: 250 },
      angle: { from: 0, to: 720, ease: TWEEN_EASING.SINE_EASE_OUT, duration: 500 },
      onComplete: () => {
        this.playPawnGhostTween();
        this.emit(CUSTOM_EVENTS.PAWN_REVIVED);
      }
    })
  }

  playPawnGhostTween() {
    this.isGhost = true;
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0.6, ease: TWEEN_EASING.QUAD_EASE_IN_OUT, duration: 250 },
      yoyo: true,
      repeat: 4,
      onComplete: () => {
        this.playLimbTweens();
        this.isGhost = false;
      }
    })
  }

  playPawnInvincibilityTween() {
    this.isInvincible = true;
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 0.9, to: 0.6, ease: TWEEN_EASING.QUAD_EASE_IN_OUT, duration: 250 },
      yoyo: true,
      repeat: 10,
      onComplete: () => {
        this.isInvincible = false;
      }
    })
  }

  showPawnInitially() {
    this.scene.tweens.add({
      targets: this,
      scale: { from: 0, to: this.turtleOrigScale, ease: TWEEN_EASING.EXPO_EASE_OUT, duration: 250 },
      angle: { from: 0, to: 720, ease: TWEEN_EASING.SINE_EASE_OUT, duration: 500 },
      onStart: () => {
        this.setLimbsToInitialAngle();
      },
      onComplete: () => {
        this.playLimbTweens();
        this.emit(CUSTOM_EVENTS.PAWN_SPAWNED);
      }
    });
  }

  tweenLimbsToNormalState() {
    this.pawnResetLimbTweens[0] = this.scene.tweens.add({
      targets: this.limbs.leftHand,
      angle: -10,
      duration: 200,
      ease: TWEEN_EASING.SINE_EASE_IN,
      onComplete: () => {
        this.playLimbTweens();
      }
    });
    this.pawnResetLimbTweens[1] = this.scene.tweens.add({
      targets: this.limbs.rightHand,
      angle: 10,
      duration: 200,
      ease: TWEEN_EASING.SINE_EASE_IN,
    });
    this.pawnResetLimbTweens[2] = this.scene.tweens.add({
      targets: this.limbs.leftFoot,
      angle: -5,
      duration: 100,
      ease: TWEEN_EASING.SINE_EASE_IN,
    });
    this.pawnResetLimbTweens[3] = this.scene.tweens.add({
      targets: this.limbs.rightFoot,
      angle: 5,
      duration: 100,
      ease: TWEEN_EASING.SINE_EASE_IN,
    });
  }

  playPawnDirectionChangeTween(angle: number) {
    this.scene.tweens.add({
      targets: this,
      angle: angle,
      duration: 250,
      ease: TWEEN_EASING.QUINT_EASE_OUT,
    });
    if (angle < 0) {
      // this.pawnLimbTweens[0]?.setTimeScale(2.5);
      // this.pawnLimbTweens[1]?.setTimeScale(0.5);
      // this.pawnLimbTweens[2]?.setTimeScale(2.5);
      // this.pawnLimbTweens[3]?.setTimeScale(0.5);
    } else if (angle > 0) {
      // this.pawnLimbTweens[0]?.setTimeScale(0.5);
      // this.pawnLimbTweens[1]?.setTimeScale(2.5);
      // this.pawnLimbTweens[2]?.setTimeScale(0.5);
      // this.pawnLimbTweens[3]?.setTimeScale(2.5);
    } else {
      // this.pawnLimbTweens[0]?.setTimeScale(0.5);
      // this.pawnLimbTweens[1]?.setTimeScale(2.5);
      // this.pawnLimbTweens[2]?.setTimeScale(0.5);
      // this.pawnLimbTweens[3]?.setTimeScale(2.5);
      // this.stopLimbTweens();
      // this.tweenLimbsToNormalState();
    }
  }

  playLimbTweens() {
    this.pawnLimbTweens[0] = this.scene.tweens.add({
      targets: this.limbs.leftHand,
      angle: 20,
      duration: 2000,
      yoyo: true,
      ease: TWEEN_EASING.EXPO_EASE_IN_OUT,
      onStart: () => {
        this.limbs.leftHand.angle = -10;
      },
      loop: -1
    });
    this.pawnLimbTweens[1] = this.scene.tweens.add({
      targets: this.limbs.rightHand,
      angle: -20,
      duration: 2000,
      yoyo: true,
      ease: TWEEN_EASING.EXPO_EASE_IN_OUT,
      onStart: () => {
        this.limbs.rightHand.angle = 10;
      },
      loop: -1
    });
    this.pawnLimbTweens[2] = this.scene.tweens.add({
      targets: this.limbs.leftFoot,
      angle: 5,
      duration: 1200,
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      onStart: () => {
        this.limbs.leftFoot.angle = -5;
      },
      loop: -1
    });
    this.pawnLimbTweens[3] = this.scene.tweens.add({
      targets: this.limbs.rightFoot,
      angle: -5,
      duration: 1200,
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      onStart: () => {
        this.limbs.rightFoot.angle = 5;
      },
      loop: -1
    });
  }

  stopLimbTweens() {
    for (let i = 0; i < this.pawnLimbTweens.length; ++i) {
      if (this.pawnLimbTweens[i] && this.pawnLimbTweens[i]!.isPlaying()) {
        this.pawnLimbTweens[i]!.stop();
        this.pawnLimbTweens[i] = null;
      }
    }
  }

  stopResetLimbTweens() {
    for (let i = 0; i < this.pawnResetLimbTweens.length; ++i) {
      if (this.pawnResetLimbTweens[i] && this.pawnResetLimbTweens[i]!.isPlaying()) {
        this.pawnResetLimbTweens[i]!.stop();
        this.pawnResetLimbTweens[i] = null;
      }
    }
  }

}