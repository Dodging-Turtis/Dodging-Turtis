import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('image', '/assets/block.png');
  }
  create() {
    this.add.image(500, 300, 'image');
  }
}

export default GameScene;
