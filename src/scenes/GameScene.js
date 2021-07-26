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
    this.blockOne = this.createBlock(this.genRandOne());
    this.blockTwo = this.createBlock(this.genRandTwo());
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    if (
      this.blockOne.y > this.physics.world.bounds.height ||
      this.blockTwo.y > this.physics.world.bounds.height
    )
      this.resetPos();
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

    platform.setGravityY(10);
    platform.setVelocityY(250);
    platform.setBounce(0.5);

    this.physics.add.collider(this.player, platform, () => {
      alert('game over');
      this.blockOne.setVelocityY(250);
      this.blockTwo.setVelocityY(250);
      this.resetPos();
    });

    return platform;
  }
  resetPos() {
    this.blockOne.setY(0);
    this.blockTwo.setY(0);
    this.blockOne.setX(this.genRandOne());
    this.blockTwo.setX(this.genRandTwo());
  }
  genRandOne() {
    return (
      Math.floor(Math.random() * this.physics.world.bounds.centerX) +
      200 * Math.random()
    );
  }
  genRandTwo() {
    return (
      (this.genRandOne() + this.physics.world.bounds.centerX) %
      (this.physics.world.bounds.width - 100)
    );
  }
}

export default GameScene;
