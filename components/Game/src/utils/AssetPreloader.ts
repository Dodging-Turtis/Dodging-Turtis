import { EASY_PREFABS } from '../cfg/constants/game-constants';
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
    this.scene.load.image('logo', 'logo.png');
  }

  // Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
  loadGameSceneAssets(turtleUrl: string): void {
    this.scene.load.path = ASSETS_PREFIX_URL;

    // Turtle
    // this.scene.load.image('turtle', turtleUrl);
    this.scene.load.image('turtle', 'turtle.png');

    // BackDrop
    this.scene.load.path = `${ASSETS_PREFIX_URL}back/`;

    this.scene.load.image('water_1', 'water_1.png');

    this.scene.load.image('left_bank_1', 'left_bank_1.png');
    this.scene.load.image('left_grass_1', 'left_grass_1.png');

    this.scene.load.image('right_bank_1', 'right_bank_1.png');
    this.scene.load.image('right_grass_1', 'right_grass_1.png');

    this.scene.load.image('fill_grass', 'fill_grass.png');

    // Decor
    this.scene.load.path = `${ASSETS_PREFIX_URL}decorations/`;
    for (let i = 1; i <= 3; ++i) {
      this.scene.load.image(`leaf_${i}`, `leaf_${i}.png`);
    }

    this.scene.load.path = `${ASSETS_PREFIX_URL}obstacles/`;
    // River Obstacles
    for (let i = 1; i <= 3; ++i) {
      this.scene.load.image(`rock_${i}`, `rock_${i}.png`);
      this.scene.load.image(`log_${i}`, `log_${i}.png`);
    }

    this.scene.load.path = ASSETS_PREFIX_URL;

    this.scene.load.image('orange_star_fish', 'orange_star_fish.png');
    this.scene.load.image('blue_star_fish', 'blue_star_fish.png');

    // Particles
    this.scene.load.image('bubble', 'bubble.png');

    this.scene.load.path = `assets/prefabs/`;

    for (let i = 0; i < EASY_PREFABS.length; ++i) {
      this.scene.load.json(EASY_PREFABS[i], `${EASY_PREFABS[i]}.json`)
    }


    this.scene.load.path = `${ASSETS_PREFIX_URL}ui/`;

    this.scene.load.image('pause_button', 'pause.png');
    this.scene.load.image('resume_button', 'resume.png');


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
