import { CAM_CENTER } from '../cfg/constants/design-constants';
import { CUSTOM_EVENTS, DEPTH } from '../cfg/constants/game-constants';
import { TWEEN_EASING } from '../cfg/constants/static-constants';
import { EInputDirection } from '../cfg/enums/EInputDirection';
import type { AbstractScene } from '../scenes/AbstractScene';
import { Turtle } from '../ui-objects/Turtle';


const RIPPLE_ALPHA_DEC = 0.01;
const RIPPLE_SCALE_INC = 0.01;

export class Pawn {
  scene: AbstractScene;
  // events: Phaser.Events.EventEmitter;

  turtle!: Turtle;
  ripples: Array<Phaser.GameObjects.Arc> = [];

  speed = 0.25;

  previousInputDirection: EInputDirection = EInputDirection.NONE;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.addRipples();
    this.addPawn();
  }

  private addRipples() {
    for (let i = 0; i < 10; ++i) {
      this.ripples[i] = this.scene.add.arc(0, 0, 75, 0, 360, false, 0xFFFFFF, 0);
      this.ripples[i].setAlpha(0.1 + i * 0.1);
      this.ripples[i].setScale(0.1 + i * 0.1);
      this.ripples[i].setStrokeStyle(5, 0xFFFFFF, 0.4);
      this.ripples[i].setVisible(false);
    }
  }

  private addPawn(): void {
    this.turtle = new Turtle(this.scene, CAM_CENTER.x, CAM_CENTER.y + this.scene.grs.designDim.height * 0.4);
    this.turtle.setDepth(DEPTH.player);
    this.turtle.setScale(0);
    this.turtle.on(CUSTOM_EVENTS.PAWN_REVIVED, () => {
      this.resetRipples();
    });
    this.turtle.on(CUSTOM_EVENTS.PAWN_SPAWNED, () => {
      this.resetRipples();
    });
    this.turtle.setupGameTurtle();
  }

  private playDirectionChangeTween() {
    let angle = 0;
    if (this.scene.inputManager.getInputDirection() === EInputDirection.LEFT) {
      this.scene.audioManager.play('splash');
      angle = -30;
    } else if (this.scene.inputManager.getInputDirection() === EInputDirection.RIGHT) {
      this.scene.audioManager.play('splash');
      angle = 30;
    }
    this.turtle.playPawnDirectionChangeTween(angle);
  }

  resetPawn() {
    this.turtle.setScale(0);
    for (let i = 0; i < 10; ++i) {
      this.ripples[i].setVisible(false);
    }
  }

  changePawn(speed: number, index: number) {
    this.turtle.changeGameTurtle(index);
    this.speed = speed * 0.005;
  }

  playPawnCollidedTween() {
    this.fadeOutRipplesAfterDeath();
    this.turtle.stopLimbTweens();
    this.turtle.stopResetLimbTweens();
    this.previousInputDirection = EInputDirection.NONE;
    this.turtle.pawnCollidedTween();
  }

  playConsumeTween() {
    this.turtle.playConsumeTween();
  }

  playInvincibilityTween() {
    this.turtle.playPawnInvincibilityTween();
  }

  increasePawnMovementSpeed() {
    const origSpeed = this.speed;
    this.speed *= 1.5;
    this.scene.time.delayedCall(5000, () => {
      this.scene.tweens.add({
        targets: this,
        speed: origSpeed,
        ease: TWEEN_EASING.QUAD_EASE_IN,
        duration: 500,
        onComplete: () => {
          this.speed = origSpeed;
        }
      })
    })
  }

  playPawnReviveTween() {
    this.turtle.x = CAM_CENTER.x;
    this.turtle.playPawnReviveTween();
    this.resetRipples();
  }

  showPawnInitially() {
    this.turtle.x = CAM_CENTER.x;
    this.turtle.showPawnInitially();
  }

  private fadeOutRipplesAfterDeath() {
    // console.warn('fadeout', (1 - this.ripples[i].alpha) * RIPPLE_ALPHA_DEC * 1000);
    this.scene.tweens.add({
      targets: this.ripples,
      alpha: 0,
      duration: 500,
    })
  }

  private resetRipples() {
    for (let i = 0; i < this.ripples.length; ++i) {
      this.ripples[i].setPosition(this.turtle.x, this.turtle.y);
      this.ripples[i].setAlpha(0.1 + i * 0.1);
      this.ripples[i].setScale(0.1 + i * 0.1);
      this.ripples[i].setVisible(false);
    }
  }

  update(delta: number) {
    if (this.scene.inputManager.getIsInputEnabled()) {
      const direction = this.scene.inputManager.getInputDirection();
      if (direction !== EInputDirection.NONE) {
        this.turtle.x += delta * (direction === EInputDirection.LEFT ? -this.speed : this.speed);
        const halfWidth = this.scene.grs.designDim.width * 0.5 - 200;
        if (this.turtle.x <= CAM_CENTER.x - halfWidth) {
          this.turtle.x = CAM_CENTER.x - halfWidth;
        } else if (this.turtle.x >= CAM_CENTER.x + halfWidth) {
          this.turtle.x = CAM_CENTER.x + halfWidth;
        }
      }
      if (this.previousInputDirection !== direction) {
        this.playDirectionChangeTween();
        this.previousInputDirection = direction;
      }
      this.previousInputDirection = direction;
    }

    for (let i = this.ripples.length - 1; i >= 0; --i) {
      this.ripples[i].scale += RIPPLE_SCALE_INC;
      this.ripples[i].alpha -= RIPPLE_ALPHA_DEC;
      this.ripples[i].y += 0.15 * delta;
      if (this.ripples[i].alpha <= 0) {
        this.ripples[i].scale = 0.75;
        this.ripples[i].alpha = 0.4;
        this.ripples[i].x = this.turtle.x;
        this.ripples[i].y = this.turtle.y;
        this.ripples[i].setVisible(true);
      }
    }
  }

  resizeAndRepositionElements() {

  }
}
