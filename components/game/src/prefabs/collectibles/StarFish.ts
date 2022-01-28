import { AbstractScene } from "../../scenes/AbstractScene";
import { Collectible } from "../abstract/Collectible";

export class StarFish extends Collectible {
    constructor(scene: AbstractScene, x: number, y: number, texture?: string) {
        if (texture === undefined) {
            const rand = 1 + Math.floor(Math.random() * 3);
            switch (rand) {
                default:
                case 1:
                    texture = 'orange_star_fish';
                    break;
                case 2:
                    texture = 'yellow_star_fish';
                    break;
                case 3:
                    texture = 'red_star_fish';
                    break;
            }
        }
        super(scene, x, y, texture);
        this.playScaleInOutTween();
    }
}