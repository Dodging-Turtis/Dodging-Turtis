import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }
  init() {
    this.loaded = false;
    this.score = 0;
    this.highScore = localStorage.getItem('highScore');
    this.events.once('start-game', ({ url, speed, endGame }) => {
      this.playerSpeed = speed;
      this.startGame(url);
      this.endGame = endGame;
    });
  }
  preload() {
    this.load.image('image', '/assets/block.png');
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.blockOne = this.createBlock(this.genRandOne());
    this.blockTwo = this.createBlock(this.genRandTwo());
    this.scoreText = this.add.text(0, 0, `Score: ${this.score}`);
    this.highScoreText = this.add.text(0, 20, `High Score: ${this.highScore}`);
  }
  update() {
    if (this.loaded) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-200 * this.playerSpeed);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200 * this.playerSpeed);
      } else {
        this.player.setVelocityX(0);
      }
      if (
        this.blockOne.y > this.physics.world.bounds.height ||
        this.blockTwo.y > this.physics.world.bounds.height
      ) {
        this.score += 10;
        this.reflectScore();
        this.resetPos();
      }
    }
  }
  reflectScore() {
    this.scoreText.setText(`Score: ${this.score}`);
    if (this.score > this.highScore) this.highScore = this.score;
    this.highScoreText.setText(`High Score: ${this.highScore}`);
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
    platform.setBounce(0.5);
    return platform;
  }
  startGame(url) {
    this.load.image('player', url);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.player = this.createPlayer();
      this.addCollider(this.blockOne);
      this.addCollider(this.blockTwo);
      this.blockOne.setGravityY(10);
      this.blockOne.setVelocityY(250);
      this.blockTwo.setGravityY(10);
      this.blockTwo.setVelocityY(250);
      this.loaded = true;
    });
    this.load.start();
  }
  addCollider(platform) {
    this.physics.add.collider(this.player, platform, () => {
      alert('game over');
      let val = 0;
      if (this.highScore > localStorage.getItem('highScore')) {
        alert('new highscore' + this.score);
        val = localStorage.getItem('highScore') - this.highScore;
        localStorage.setItem('highScore', this.score);
      }
      this.endGame(val);
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
