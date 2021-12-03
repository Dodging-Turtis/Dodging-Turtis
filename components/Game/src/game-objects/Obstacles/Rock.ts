import { DEPTH } from "../../cfg/constants/game-constants";
import { AbstractScene } from "../../scenes/AbstractScene";
import { Obstacle } from "./Obstacle";

export class Rock extends Obstacle {
    constructor(scene: AbstractScene, x: number, y: number, texture = 'rock_1') {
        super(scene, x, y, texture);
        this.playScaleInOutTween();
    }
}