import Phaser from 'phaser';

const gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
};

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }
  preload() {
    this.load.image('image', '/assets/block.png');
  }
  create() {
    this.player = this.physics.add.sprite(100, 600, 'image');
    this.player.setGravityY(10);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.5);

    this.platform1 = this.addPlatform(100);
    this.platform2 = this.addPlatform(700);
    this.physics.world.on('worldbounds', (body, up, down, left, right) => {
      if (down) {
        this.platform1.setY(0);
        this.platform2.setY(0);
      }
    });
    console.log(this.physics.world.bounds);
  }
  addPlatform(posX) {
    let platform = this.physics.add.sprite(posX, 0, 'image');
    platform.setGravityY(50);
    platform.setCollideWorldBounds(true);
    platform.setBounce(0.5);
    platform.body.onWorldBounds = true;
    this.physics.add.collider(this.player, platform);
    return platform;
  }
}

export default GameScene;
