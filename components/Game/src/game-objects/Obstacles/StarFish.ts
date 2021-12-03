import { AbstractScene } from "../../scenes/AbstractScene";
import { Collectible } from "./Collectible";

export class StarFish extends Collectible {
    constructor(scene: AbstractScene, x: number, y: number, texture = Math.random() >= 0.5 ? 'blue_star_fish' : 'orange_star_fish') {
        super(scene, x, y, texture);
        this.playScaleInOutTween();
    }
}