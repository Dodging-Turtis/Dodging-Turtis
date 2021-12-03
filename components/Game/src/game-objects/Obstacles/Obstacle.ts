import { DEPTH } from "../../cfg/constants/game-constants";
import { TWEEN_EASING } from "../../cfg/constants/static-constants";
import { AbstractScene } from "../../scenes/AbstractScene";

export class Obstacle extends Phaser.GameObjects.Image {
    shadow: Phaser.GameObjects.Image;
    scene: AbstractScene;

    constructor(scene: AbstractScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.shadow = new Phaser.GameObjects.Image(scene, x - 15, y + 100, texture);
        this.shadow.setTint(0x000000).setAlpha(0.1).setScale(1.1);
        this.depth = DEPTH.obstacle;
        this.shadow.depth = DEPTH.shadow;
    }

    resetObstacle(x: number, y: number) {
        this.setPosition(x, y);
        this.shadow.setPosition(x - 15, y + 100);
    }

    playScaleInOutTween() {
      this.scene.tweens.add({
        targets: this,
        duration: 1000,
        yoyo: true,
        ease: TWEEN_EASING.QUART_EASE_IN,
        scale: `+=${0.05}`,
        repeat: -1,
        delay: Math.random() * 500,
        onUpdate: () => {
          this.shadow.setScale(this.scale * 1.1);
        }
      });
    }

}