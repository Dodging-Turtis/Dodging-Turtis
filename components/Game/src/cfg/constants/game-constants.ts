// const purple = 0xd218ef;

import { StarFish } from "../../prefabs/collectibles/StarFish";
import { Rock } from "../../prefabs/rocks/Rock";

// const redHex = '#ff0000';

// const greenHex = '#00ff00';

// const gray = 0xdcdcdc;

// const black = 0x000000;

export const BG_COLOR = 0x73B9EE;

export const SHORE_WIDTH = 150;

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
}

export const SHADOW_ALPHA = 0.05;

export const TAP_TO_PLAY_CONFIG = {
  fontSize: '48px',
  fontColor: '#ffffff',
  fontShadow: '#777777',
  screenColor: 0x000000,
};

export const CUSTOM_EVENTS = {
  DICE_STOPPED: 'dice-stopped',
  DICE_CLICKED: 'dice-clicked',
  PAWN_CLICKED: 'pawn-clicked',
  BUTTON_CLICKED: 'button-clicked',
  GAME_SELECTED: 'game-selected',
  CANCEL_MATCH_MAKING: 'cancel-match-making',
  IDLE_TIMER_ENDED: 'idle-timer-ended',
};

export const EASY_PREFABS = [
  'rock-1-prefab',
  'rock-2-prefab',
  'rock-3-prefab',
  'rock-4-prefab',
]

export const OBSTACLE_CONSTRUCTORS = {
  'Rock': Rock,
}

export type OBSTACLE_TYPES = keyof typeof OBSTACLE_CONSTRUCTORS;

export const COLLECTIBLE_CONSTRUCTORS = {
  'StarFish': StarFish,
}

export type COLLECTIBLE_TYPES = keyof typeof COLLECTIBLE_CONSTRUCTORS;