import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('image', '/assets/block.png');
    this.load.image('player', '/assets/character.png');
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.createPlayer();
    this.blockOne = this.createBlock(Math.random() * 500);
    this.blockTwo = this.createBlock(Math.random() * 500 + 500);

    this.physics.world.on('worldbounds', (body, up, down, left, right) => {
      if (down) {
        this.blockOne.setY(0);
        this.blockTwo.setY(0);
      }
    });
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    // if (this.cursors.up.isDown && this.player.body.touching.down) {
    //   this.player.setVelocityY(-330);
    // }
  }
  createPlayer() {
    let player = this.physics.add.sprite(
      this.physics.world.bounds.centerX,
      this.physics.world.bounds.bottom,
      'player'
    );
    player.setGravityY(1);
    player.setCollideWorldBounds(true);
    player.setBounce(0.5);
    player.setScale(0.3);
    return player;
  }
  createBlock(posX) {
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
