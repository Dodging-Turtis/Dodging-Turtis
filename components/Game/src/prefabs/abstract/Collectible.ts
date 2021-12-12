import { CAM_CENTER } from "../../cfg/constants/design-constants";
import { DEPTH, SHADOW_ALPHA } from "../../cfg/constants/game-constants";
import { TWEEN_EASING } from "../../cfg/constants/static-constants";
import { IPosition } from "../../cfg/interfaces/IPosition";
import { AbstractScene } from "../../scenes/AbstractScene";

export class Collectible extends Phaser.GameObjects.Image {
    shadow!: Phaser.GameObjects.Image;
    scene: AbstractScene;
    isConsumed = false;
    hasShadow = false;

    constructor(scene: AbstractScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene = scene;

        this.depth = DEPTH.collectible;
        if (this.scene.renderer.type === Phaser.WEBGL) {
          this.hasShadow = true;
          this.shadow = new Phaser.GameObjects.Image(scene, x - 15, y + 100, texture);
          this.shadow.setTint(0x000000).setAlpha(SHADOW_ALPHA).setScale(1.1);
          this.shadow.depth = DEPTH.shadow;
        }
    }

    resetCollectible(x: number, y: number) {
        this.isConsumed = false;
        this.setPosition(x, y);
        this.setScale(1).setAlpha(1).setVisible(true);
        if (this.hasShadow) {
          this.shadow.setPosition(x - 15, y + 100);
          this.shadow.setScale(1.1).setAlpha(SHADOW_ALPHA).setVisible(true);
        }
    }

    playConsumeTween() {
      const height = this.scene.grs.resizeDim.height;
      this.isConsumed = true;
      this.scene.tweens.add({
        targets: this,
        scale: 0,
        alpha: 0,
        ease: TWEEN_EASING.SINE_EASE_OUT,
        duration: 350,
        x: CAM_CENTER.x,
        y: CAM_CENTER.y + height * 0.45,
        onUpdate: () => {
          if (this.hasShadow) {
            this.shadow.setScale(this.scale * 1.1);
          }
        },
        onComplete: () => {
          this.setVisible(false);
          if (this.hasShadow) {
            this.shadow.setVisible(false);
          }
        }
      })
    }

    playScaleInOutTween() {
      this.scene.tweens.add({
        targets: this,
        duration: 1000,
        yoyo: true,
        ease: TWEEN_EASING.QUART_EASE_IN,
        scale: `+=${0.5}`,
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