import { CAM_CENTER } from '../cfg/constants/design-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import type { AbstractScene } from '../scenes/AbstractScene';

export const enum EInputDirection {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  NONE = 'NONE'
}

export class Pawn extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  pawn!: Phaser.GameObjects.Image;
  ripples: Array<Phaser.GameObjects.Arc> = [];

  cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  isInputEnabled = true;
  speed = 0.25;
  inputDirection: EInputDirection = EInputDirection.NONE;
  previousInputDirection: EInputDirection = EInputDirection.NONE;
  isDesktop = false;

  pawnOrigScale = 1;

  pawnMovementTween: Phaser.Tweens.Tween | null = null;


  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y + scene.grs.designDim.height * 0.3);
    this.scene = scene;

    this.addRipples();
    this.addPawn();
    this.playMovementTween();
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.addTouchListener();
    this.isDesktop = this.scene.game.device.os.desktop;
    this.scene.add.existing(this);
  }

  private addRipples() {
    for (let i = 0; i < 3; ++i) {
      this.ripples[i] = this.scene.add.arc(0, 0, 75, 0, 360, false, 0xFFFFFF, 0);
      this.ripples[i].setAlpha(0);
      this.ripples[i].setScale(0.25 + i * 0.25);
      this.ripples[i].setStrokeStyle(5, 0xFFFFFF, 0.5);
    }
    this.add(this.ripples);
  }

  private addPawn(): void {
    this.pawn = this.scene.add.image(0, 0, 'turtle');
    this.pawn.setScale(this.pawnOrigScale);
    this.pawn.setOrigin(0.5);
    this.add(this.pawn);
  }


  private addTouchListener(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const deltaX = pointer.x - pointer.camera.width * 0.5;
      if (deltaX <= 0) {
        this.handleInput(EInputDirection.LEFT);
      } else {
        this.handleInput(EInputDirection.RIGHT);
      }
    });
    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      this.handleInput(EInputDirection.NONE);
    });
  }

  private handleInput(direction: EInputDirection) {
    if (!this.isInputEnabled) {
      return;
    }
    this.inputDirection = direction;
  }

  resizeAndRepositionElements() {
    this.isDesktop = this.scene.game.device.os.desktop;
  }

  update(delta: number) {
    if (this.isInputEnabled) {
      if (this.isDesktop) {
        this.inputDirection = EInputDirection.NONE;
        if (this.cursorKeys.left.isDown) {
          this.inputDirection = EInputDirection.LEFT;
        } else if (this.cursorKeys.right.isDown) {
          this.inputDirection = EInputDirection.RIGHT;
        }
      }
      if (this.inputDirection !== EInputDirection.NONE) {
        this.x += delta * (this.inputDirection === EInputDirection.LEFT ? -this.speed : this.speed);
        const halfWidth = this.scene.grs.designDim.width * 0.5 - 175;
        if (this.x <= CAM_CENTER.x - halfWidth) {
          this.x = CAM_CENTER.x - halfWidth;
        } else if (this.x >= CAM_CENTER.x + halfWidth ) {
          this.x = CAM_CENTER.x + halfWidth;
        }

      }
      if (this.previousInputDirection !== this.inputDirection) {
        this.playDirectionChangeTween();
        this.previousInputDirection = this.inputDirection;
      }
      this.previousInputDirection = this.inputDirection;
    }

    for (let i = this.ripples.length - 1; i >= 0; --i) {
      this.ripples[i].scale += 0.005;
      this.ripples[i].alpha -= 0.006;
      if (this.ripples[i].scale >= 1) {
        this.ripples[i].scale = 0.25;
        this.ripples[i].alpha = 1;
      }
    }
  }

  private playDirectionChangeTween() {
    let angle = 0;
    if (this.inputDirection === EInputDirection.LEFT) {
      angle = -30;
      this.emit('direction', EInputDirection.LEFT);
    } else if (this.inputDirection === EInputDirection.RIGHT) {
      this.emit('direction', EInputDirection.RIGHT);
      angle = 30;
    }
    if (angle === 0) {
      this.emit('direction', EInputDirection.NONE);
    }
    this.scene.tweens.add({
      targets: this.pawn,
      angle: angle,
      duration: 250,
      ease: TWEEN_EASING.QUINT_EASE_OUT,
    })
  }

  private playMovementTween() {
    this.pawnMovementTween = this.scene.tweens.add({
      targets: this.pawn,
      scale: this.pawnOrigScale + 0.01,
      yoyo: true,
      duration: 250,
      onLoop: () => {
        this.pawn.setScale(this.pawnOrigScale);
      },
      ease: TWEEN_EASING.SINE_EASE_IN_OUT,
      loop: -1
    })
  }

  private stopMovementTween() {
    if (this.pawnMovementTween && this.pawnMovementTween.isPlaying()) {
      this.pawnMovementTween.stop();
      this.pawnMovementTween = null;
    }
  }

  playPawnCollidedTween() {
    this.isInputEnabled = false;
    this.stopMovementTween();
    this.inputDirection = EInputDirection.NONE;
    this.previousInputDirection = EInputDirection.NONE;
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      duration: 500,
      angle: 720,
      ease: TWEEN_EASING.BACK_EASE_IN,
      onComplete: () => {
        this.pawn.setAngle(0);
        this.scene.time.delayedCall(120, () => {
          this.emit('pawn-dead');
        });
      }
    });
  }

  playPawnReviveTween() {
    this.x = CAM_CENTER.x;
    this.scene.tweens.add({
      targets: this,
      scale: { from: 0, to: 1, ease: TWEEN_EASING.EXPO_EASE_OUT, duration: 250 },
      angle: { from: 0, to: 720, ease: TWEEN_EASING.SINE_EASE_OUT, duration: 500 },
      onComplete: () => {
        this.emit('pawn-revived');
        this.isInputEnabled = true;
      }
    })
  }

}
