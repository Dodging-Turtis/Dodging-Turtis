import { CAM_CENTER } from "../../cfg/constants/design-constants";
import { CONTAINER_GAP, PREFABS } from "../../cfg/constants/game-constants";
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

    getObstacleContainer(lastContainerTopEdge: number, genPowerUp: boolean) {
        let obsName = PREFABS[Math.floor(Math.random() * PREFABS.length)];
        let obs: ObstacleGroup | undefined = this.poolManager.get(obsName);
        if (!obs) {
            obs = this.generateObstacleContainer(lastContainerTopEdge, obsName);
        }
        obs.position.y = lastContainerTopEdge - obs.contHeight * 0.5 - CONTAINER_GAP;
        obs.spawn(genPowerUp);
        this.scene.add.existing(obs);
        return obs;
    }

    putObstacleContainer(obs: ObstacleGroup) {
        obs.despawn();
        this.poolManager.put(obs);
    }

    private generateObstacleContainer(lastContainerTopEdge: number, obsName: string) {
        return new ObstacleGroup(this.scene, CAM_CENTER.x, lastContainerTopEdge, obsName);
    }
}