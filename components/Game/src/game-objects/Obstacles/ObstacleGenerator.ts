import { CAM_CENTER } from "../../cfg/constants/design-constants";
import { EASY_PREFABS } from "../../cfg/constants/game-constants";
import { AbstractScene } from "../../scenes/AbstractScene";
import { ObstacleGroup } from "./ObstacleGroup";
import { PoolManager } from "./PoolManager";

export class ObstacleGenerator {
    scene: AbstractScene;
    poolManager: PoolManager;

    constructor(scene: AbstractScene) {
        this.scene = scene;
        this.poolManager = new PoolManager(this.scene);
    }

    getObstacleContainer(heat: number = 5, lastContainerTopEdge: number) {
        let obs: ObstacleGroup | undefined = this.poolManager.get(EASY_PREFABS[0]);
        if (!obs) {
            obs = this.generateObstacleContainer(heat, lastContainerTopEdge);
        }
        obs.position.y = lastContainerTopEdge - obs.contHeight * 0.5;
        obs.spawn();
        this.scene.add.existing(obs);
        return obs;
    }

    putObstacleContainer(obs: ObstacleGroup) {
        obs.despawn();
        this.poolManager.put(obs);
    }

    private generateObstacleContainer(heat: number = 5, lastContainerTopEdge: number) {
        return new ObstacleGroup(this.scene, CAM_CENTER.x, lastContainerTopEdge, EASY_PREFABS[0]);
    }
}