// const purple = 0xd218ef;

import { PowerUp } from "../../prefabs/abstract/PowerUp";
import { StarFish } from "../../prefabs/collectibles/StarFish";
import { Log } from "../../prefabs/logs/Log";
import { InvincibilityPowerUp } from "../../prefabs/powerups/InvincibilityPowerUp";
import { MovementSpeedPowerUp } from "../../prefabs/powerups/MovementSpeedPowerUp";
import { ScrollSlowPowerUp } from "../../prefabs/powerups/ScrollSlowPowerUp";
import { Rock } from "../../prefabs/rocks/Rock";

// const redHex = '#ff0000';

// const greenHex = '#00ff00';

// const gray = 0xdcdcdc;

// const black = 0x000000;

export const GAME_FONT = "JosefinSans";

export const BG_COLOR = 0x73B9EE;

export const SHORE_WIDTH = 150;

export const CONTAINER_GAP = 120;


export const LANDSCAPE_ORIENTATION_CONFIG = {
  screenColor: 0x000000,
  depth: 15,
};

export const DEPTH = {
  shadow: 1,
  obstacle: 2,
  collectible: 3,
  player: 4,
  overlay: 5,
  ui: 10,
  powerUpDisplay: 11
}

export const SHADOW_ALPHA = 0.05;

export const TAP_TO_PLAY_CONFIG = {
  fontSize: '48px',
  fontColor: '#ffffff',
  fontShadow: '#777777',
  screenColor: 0x000000,
};

export const CUSTOM_EVENTS = {
  BUTTON_CLICKED: 'button-clicked',
  GO_TO_HOME_CLICKED: 'go-to-home-clicked',
  MINT_TURTIS: 'mint-turtis',
  START_GAME: 'start-game',
  ESCAPE: 'escape',
  PAWN_SPAWNED: 'pawn-spawned',
  PAWN_REVIVED: 'pawn-revived',
  PAWN_DEAD: 'pawn-dead',
  PAWN_STARVED: 'pawn-starved'
};

export const PREFABS = [
  'rock-1-prefab',
  'rock-2-prefab',
  'rock-3-prefab',
  'rock-4-prefab',
  'log-1-prefab',
  'log-2-prefab',
  'log-3-prefab',
  'log-4-prefab',
  'mix-1-prefab',
  'mix-2-prefab',
]

export const OBSTACLE_CONSTRUCTORS = {
  'Rock': Rock,
  'Log': Log,
}

export type OBSTACLE_TYPES = keyof typeof OBSTACLE_CONSTRUCTORS;

export const POWER_UP_CONSTRUCTORS = {
  'InvincibilityPowerUp': InvincibilityPowerUp,
  'MovementSpeedPowerUp': MovementSpeedPowerUp,
  'ScrollSlowPowerUp': ScrollSlowPowerUp
}

export type POWER_UP_TYPES = keyof typeof POWER_UP_CONSTRUCTORS;


export const COLLECTIBLE_CONSTRUCTORS = {
  'StarFish': StarFish,
}

export type COLLECTIBLE_TYPES = keyof typeof COLLECTIBLE_CONSTRUCTORS;

export const GAME_SOUNDS = [
  { key: 'bgm', path: 'bgm', loop: true },
  { key: 'click', path: 'click', loop: false },
  { key: 'collision', path: 'collision', loop: false },
  { key: 'newHighScore', path: 'newHighScore', loop: false },
  { key: 'turtleMint', path: 'turtleMint', loop: false },
  { key: 'turtleSwap', path: 'turtleSwap', loop: false },
  { key: 'starFish', path: 'starFish', loop: false },
  { key: 'powerup', path: 'powerup', loop: false },
  { key: 'splash', path: 'splash', loop: false },
]