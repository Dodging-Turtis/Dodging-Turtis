import { DEPTH, SHADOW_ALPHA } from "../../cfg/constants/game-constants";
import { TWEEN_EASING } from "../../cfg/constants/static-constants";
import { AbstractScene } from "../../scenes/AbstractScene";

export class Obstacle extends Phaser.GameObjects.Image {
    shadow!: Phaser.GameObjects.Image;
    scene: AbstractScene;
    hasShadow = false;

    constructor(scene: AbstractScene, x: number, y: number, texture: string) {
      super(scene, x, y, texture);
      // TODO: Handle collision bounds
      this.scene = scene;
      this.depth = DEPTH.obstacle;
      if (this.scene.renderer.type === Phaser.WEBGL) {
        this.hasShadow = true;
        this.shadow = new Phaser.GameObjects.Image(scene, x - 15, y + 100, texture);
        this.shadow.setTint(0x000000).setAlpha(SHADOW_ALPHA).setScale(1.1);
        this.shadow.depth = DEPTH.shadow;
      }
    }

    resetObstacle(x: number, y: number) {
      this.setPosition(x, y);
      if (this.hasShadow) {
        this.shadow.setPosition(x - 15, y + 100);
      }
    }

    playScaleInOutTween() {
      this.scene.tweens.add({
        targets: this,
        duration: 1000,
        yoyo: true,
        ease: TWEEN_EASING.SINE_EASE_OUT,
        scale: `+=${0.05}`,
        repeat: -1,
        delay: Math.random() * 500,
        onUpdate: () => {
          if (this.hasShadow) {
            this.shadow.setScale(this.scale * 1.1);
          }
        }
      });
    }

}