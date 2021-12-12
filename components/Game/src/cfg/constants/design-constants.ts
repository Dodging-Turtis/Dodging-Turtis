/**
 * Design Resolution (Safe Area) is the size at which the game is designed.
 * All important elements(which should always be visible to the player at any resolution) should be contained inside the bounds of the design resolution.
 * This shouldn't cross the Max Resolution (to avoid resizing issues)
 * Height should be more than width for a portrait game, opposite for a landscape game
 */
export const DESIGN_RES = {
  portrait: {
    width: 1080,
    height: 1920,
  },
  landscape: {
    width: 1920,
    height: 1080,
  },
};

/**
 * Game elements should be designed relative to this, but not always mandatory.
 * Can be any value, but must be constant throughout the game
 */
export const CAM_CENTER = {
  x: 960,
  y: 540,
};

// Full HD resolution, common for most devices
// Height should be more than width for a portrait game, opposite for a landscape game
export const MAX_RES = {
  width: 1920,
  height: 1080,
};
