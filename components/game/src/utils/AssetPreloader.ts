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
    this.scene.load.image('black_overlay', 'black_overlay.png');

    // BackDrop
    this.scene.load.path = `${ASSETS_PREFIX_URL}back/`;

    this.scene.load.image('water_1', 'water_1.png');

    this.scene.load.image('left_bank_1', 'left_bank_1.png');
    this.scene.load.image('grass_1', 'grass_1.png');

    this.scene.load.image('right_bank_1', 'right_bank_1.png');
    this.scene.load.image('grass_1', 'grass_1.png');

    this.scene.load.image('fill_grass', 'fill_grass.png');

    // Decor
    this.scene.load.path = `${ASSETS_PREFIX_URL}decorations/`;
    for (let i = 1; i <= 3; ++i) {
      this.scene.load.image(`leaf_${i}`, `leaf_${i}.png`);
    }

    this.scene.load.path = `${ASSETS_PREFIX_URL}obstacles/`;
    // River Obstacles
    for (let i = 1; i <= 6; ++i) {
      this.scene.load.image(`rock_${i}`, `rock_${i}.png`);
    }
    for (let i = 1; i <= 3; ++i) {
      this.scene.load.image(`log_${i}`, `log_${i}.png`);
    }

    this.scene.load.path = ASSETS_PREFIX_URL;

    this.scene.load.image('orange_star_fish', 'orange_star_fish.png');
    this.scene.load.image('yellow_star_fish', 'yellow_star_fish.png');
    this.scene.load.image('red_star_fish', 'red_star_fish.png');

    this.scene.load.image('movement_power', 'movement_power.png');
    this.scene.load.image('slow_scroll_power', 'slow_scroll_power.png');

    // Particles
    this.scene.load.image('bubble', 'bubble.png');

    this.scene.load.path = `assets/prefabs/`;

    for (let i = 0; i < EASY_PREFABS.length; ++i) {
      this.scene.load.json(EASY_PREFABS[i], `${EASY_PREFABS[i]}.json`)
    }


    this.scene.load.path = `${ASSETS_PREFIX_URL}ui/`;

    this.scene.load.image('power_up_base_outer', 'power_up_base_outer.png');
    this.scene.load.image('power_up_base_inner', 'power_up_base_inner.png');
    this.scene.load.image('pause_button', 'pause.png');
    this.scene.load.image('resume_button', 'resume.png');
    this.scene.load.image('side_bar', 'side_bar.png');
    this.scene.load.image('menu_button', 'menu_button.png');
    this.scene.load.image('sound_off', 'sound_off.png');
    this.scene.load.image('sound_on', 'sound_on.png');
    this.scene.load.image('lives', 'lives.png');
    this.scene.load.image('core_ui', 'core_ui.png');
    this.scene.load.image('hunger_bar_base', 'hunger_bar_base.png');
    this.scene.load.image('hunger_bar_white', 'hunger_bar_white.png');
    this.scene.load.image('hunger_bar_green', 'hunger_bar_green.png');
    this.scene.load.image('hunger_bar_yellow', 'hunger_bar_yellow.png');
    this.scene.load.image('hunger_bar_orange', 'hunger_bar_orange.png');
    this.scene.load.image('hunger_bar_red', 'hunger_bar_red.png');
    this.scene.load.image('left_arrow', 'left_arrow.png');
    this.scene.load.image('start_button', 'start_button.png');

    this.scene.load.path = `${ASSETS_PREFIX_URL}turtle_parts/`;
    this.scene.load.image('eyes_1', 'eyes_1.png');
    this.scene.load.image('head_1', 'head_1.png');
    this.scene.load.image('left_foot_1', 'left_foot_1.png');
    this.scene.load.image('left_hand_1', 'left_hand_1.png');
    this.scene.load.image('tail_1', 'tail_1.png');
    this.scene.load.image('in_shell_1', 'in_shell_1.png');
    this.scene.load.image('out_shell_1', 'out_shell_1.png');
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
