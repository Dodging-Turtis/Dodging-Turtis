import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }
  init() {
    this.loaded = false;
    this.events.on('start-game', ({ url, highScore }) => {
      this.load.image('player', url);
      this.load.once(Phaser.Loader.Events.COMPLETE, () => {
        this.player = this.createPlayer();
        this.addCollider(this.blockOne);
        this.addCollider(this.blockTwo);
        this.loaded = true;
      });
      this.load.start();
    });
  }
  preload() {
    this.load.image('image', '/assets/block.png');
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.blockOne = this.createBlock(this.genRandOne());
    this.blockTwo = this.createBlock(this.genRandTwo());
  }
  update() {
    if (this.loaded) {
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
  }
  createPlayer() {
    let player = this.physics.add.sprite(
      this.physics.world.bounds.centerX,
      this.physics.world.bounds.bottom,
      'player'
    );
    player.setGravityY(10);
    player.setScale(0.3);
    player.setBounce(0.5);
    player.setCollideWorldBounds(true);

    return player;
  }
  createBlock(posX) {
    let platform = this.physics.add.sprite(posX, 0, 'image');

    platform.setGravityY(10);
    platform.setVelocityY(250);
    platform.setBounce(0.5);
    return platform;
  }
  addCollider(platform) {
    this.physics.add.collider(this.player, platform, () => {
      alert('game over');
      this.blockOne.setVelocityY(250);
      this.blockOne.setVelocityX(0);
      this.blockTwo.setVelocityY(250);
      this.blockTwo.setVelocityX(0);
      this.resetPos();
    });
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
