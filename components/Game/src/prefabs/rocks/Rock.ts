import { AbstractScene } from "../../scenes/AbstractScene";
import { Obstacle } from "../abstract/Obstacle";

export class Rock extends Obstacle {
    isSpecific = false;
    constructor(scene: AbstractScene, x: number, y: number, texture : string | undefined = undefined) {
        super(scene, x, y, texture || `rock_${1 + Math.floor(Math.random() * 3)}`);
        if (texture) {
            this.isSpecific = true;
        }
        this.playScaleInOutTween();
    }

    resetObstacle(x: number, y: number) {
        super.resetObstacle(x, y);
        if (!this.isSpecific) {
            let tex = `rock_${1 + Math.floor(Math.random() * 3)}`;
            this.setTexture(tex);
            this.shadow.setTexture(tex);
            console.warn('texture changed');
        }
      }
}