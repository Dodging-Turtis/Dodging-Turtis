import { CAM_CENTER } from "../../cfg/constants/design-constants";
import { COLLECTIBLE_CONSTRUCTORS, COLLECTIBLE_TYPES, OBSTACLE_CONSTRUCTORS, OBSTACLE_TYPES, POWER_UP_CONSTRUCTORS, POWER_UP_TYPES } from "../../cfg/constants/game-constants";
import { IPosition } from "../../cfg/interfaces/IPosition";
import { AbstractScene } from "../../scenes/AbstractScene";
import { Collectible } from "../../prefabs/abstract/Collectible";
import { Obstacle } from "../../prefabs/abstract/Obstacle";
import { PowerUp } from "../../prefabs/abstract/PowerUp";

export class ObstacleGroup extends Phaser.GameObjects.Group {
    scene: AbstractScene;
    name = '';
    contHeight = 360;

    position: IPosition;

    obstacles: Array<Obstacle> = [];
    obstaclesShadow: Array<Phaser.GameObjects.Image> = [];
    obstaclesPositions: Array<IPosition> = [];

    collectibles: Array<Collectible> = [];
    collectiblesShadow: Array<Phaser.GameObjects.Image> = [];
    collectiblesPositions: Array<IPosition> = [];

    powerUp!: PowerUp;
    powerUpShadow!: Phaser.GameObjects.Image;
    powerUpPosition!: IPosition;

    constructor(scene: AbstractScene, x = CAM_CENTER.x, y: number, prefabKey: string) {
        super(scene);
        this.scene = scene;
        this.position = { x, y };
        this.name = prefabKey;
        console.warn('initial active', this.active);
        this.setup(prefabKey);
        this.scene.add.existing(this);
    }

    get y(): number {
        return this.position.y;
    }

    incY(value: number, step = 0): this {
        super.incY(value, step);
        this.position.y += value;
        return this;
    }

    despawn() {
        this.clear(true);
        this.setActive(false);
    }

    spawn(showPowerUp: boolean) {
        this.resetCollectibles();
        this.resetObstacles();
        this.addMultiple([...this.collectibles, ...this.collectiblesShadow, ...this.obstacles, ...this.obstaclesShadow], true);
        if (showPowerUp) {
            console.log('spawning powerup');
            this.resetPowerUp();
            this.add(this.powerUp, true);
        }
        this.setActive(true);
    }

    private setup(prefabKey: string) {
        const prefabData = this.scene.cache.json.get(prefabKey);
        this.contHeight = prefabData.contHeight;
        this.addObstacles(prefabData.obstacles);
        this.addCollectibles(prefabData.collectibles);
        this.addPowerUp(prefabData.powerUp);
    }

    // Use prefab data to add obstacles based on the type given in the prefab data
    private addObstacles(config: Array<{ type: OBSTACLE_TYPES; x: number; y: number, texture: string | undefined }>) {
        console.warn('obstacles', config);
        const width = this.scene.grs.designDim.width * 0.5;
        for (let i = 0; i < config.length; ++i) {
            const obs = new OBSTACLE_CONSTRUCTORS[config[i].type](
                this.scene,
                this.position.x + config[i].x * width,
                this.position.y + config[i].y * (this.contHeight * 0.5),
                config[i].texture
            );
            this.obstaclesPositions[i] = { x: config[i].x, y: config[i].y };
            this.obstacles[i] = obs;
            if (this.scene.renderer.type === Phaser.WEBGL) {
                this.obstaclesShadow[i] = obs.shadow;
            }
        }
    }

    // Use prefab data to add collectibles based on the type given in the prefab data
    private addCollectibles(config: Array<{ type: COLLECTIBLE_TYPES; x: number; y: number }>) {
        console.warn('collectibles', config);
        const width = this.scene.grs.designDim.width * 0.5;
        for (let i = 0; i < config.length; ++i) {
            const collectible = new COLLECTIBLE_CONSTRUCTORS[config[i].type](this.scene, this.position.x + config[i].x * width, this.position.y + config[i].y * (this.contHeight * 0.5));
            this.collectiblesPositions[i] = { x: config[i].x, y: config[i].y };
            this.collectibles[i] = collectible;
            if (this.scene.renderer.type === Phaser.WEBGL) {
                this.collectiblesShadow[i] = collectible.shadow;
            }
        }
    }

    // Use prefab data to add powerup based on the type given in the prefab data
    private addPowerUp(config: { type: POWER_UP_TYPES; x: number; y: number }) {
        console.warn('powerups', config);
        const width = this.scene.grs.designDim.width * 0.5;
        const powerUpConstructor = POWER_UP_CONSTRUCTORS[config.type] || Object.values(POWER_UP_CONSTRUCTORS)[Math.floor(Object.keys(POWER_UP_CONSTRUCTORS).length * Math.random())]
        const powerUp = new powerUpConstructor(this.scene, this.position.x + config.x * width, this.position.y + config.y * (this.contHeight * 0.5));
        this.powerUpPosition = { x: config.x, y: config.y };
        this.powerUp = powerUp;
        if (this.scene.renderer.type === Phaser.WEBGL) {
            this.powerUpShadow = powerUp.shadow;
        }
    }

    // Reset the powerUp to their original position and stats if they have been moved
    private resetPowerUp() {
        const width = this.scene.grs.designDim.width * 0.5;
        const position = this.powerUpPosition;
        this.powerUp.resetPowerUp(this.position.x + position.x * width, this.position.y + position.y * (this.contHeight * 0.5));
    }

    // Reset the collectibles to their original position and stats if they have been moved or collected
    private resetCollectibles() {
        const width = this.scene.grs.designDim.width * 0.5;
        for (let i = 0; i < this.collectiblesPositions.length; ++i) {
            const position = this.collectiblesPositions[i];
            this.collectibles[i].resetCollectible(this.position.x + position.x * width, this.position.y + position.y * (this.contHeight * 0.5));
        }
    }

    // Reset the obstacles to their original position and stats if they have been moved
    private resetObstacles() {
        const width = this.scene.grs.designDim.width * 0.5;
        for (let i = 0; i < this.obstaclesPositions.length; ++i) {
            const position = this.obstaclesPositions[i];
            this.obstacles[i].resetObstacle(this.position.x + position.x * width, this.position.y + position.y * (this.contHeight * 0.5));
        }
    }


}