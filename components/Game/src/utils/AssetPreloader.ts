import type { AbstractScene } from '../scenes/AbstractScene';

const ASSETS_PREFIX_URL = 'assets/img/';

export class AssetsPreloader {
  scene: AbstractScene;

  constructor(scene: AbstractScene) {
    this.scene = scene;
  }

  // Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
  loadBootSceneAssets(): void {
    this.scene.load.maxParallelDownloads = 10;
    this.scene.load.xhr.timeout = 10;
    this.scene.load.path = ASSETS_PREFIX_URL;

    this.scene.load.image('landscape-mode-white', 'landscape_mode_white.png');
  }

  // Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
  loadGameSceneAssets(): void {
    this.scene.load.path = ASSETS_PREFIX_URL;

    this.scene.load.image('beach', 'beach.png');

    // Trees
    this.scene.load.path = `${ASSETS_PREFIX_URL}/shore/`;

    for (let i = 1; i < 6; ++i) {
      this.scene.load.image(`tree_${i}`, `tree_${i}.png`);
    }
    this.scene.load.image('two_trees', 'two_trees.png');

    this.scene.load.path = ASSETS_PREFIX_URL;
    // River Obstacles
    this.scene.load.image('rock', 'rock.png');
    this.scene.load.image('big_rock', 'big_rock.png');
    this.scene.load.image('dock', 'dock.png');

    // Decor
    this.scene.load.image('orange_star_fish', 'orange_star_fish.png');
    this.scene.load.image('blue_star_fish', 'blue_star_fish.png');

    // Turtle
    this.scene.load.image('turtle', 'turtle.png');

    // Particles
    this.scene.load.image('bubble', 'bubble.png');


    // this.scene.load.atlas('flares', 'flares.png', 'flares.json');

    // this.scene.load.spritesheet('win-particle', 'win/coin.png', {
    //   frameWidth: 200,
    //   frameHeight: 200,
    //   startFrame: 0,
    //   endFrame: 30,
    // });

    // this.scene.load.bitmapFont(
    //   'win-counter-font',
    //   'bitmapFonts/win-counter.png',
    //   'bitmapFonts/win-counter.xml'
    // );
    this.scene.load.start();
  }

  createAnimations(): void {

  }
}
