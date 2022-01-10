export const TWEEN_EASING = {
  LINEAR: 'Linear',
  QUAD_EASE_IN: 'Quad.easeIn',
  CUBIC_EASE_IN: 'Cubic.easeIn',
  QUART_EASE_IN: 'Quart.easeIn',
  QUINT_EASE_IN: 'Quint.easeIn',
  SINE_EASE_IN: 'Sine.easeIn',
  EXPO_EASE_IN: 'Expo.easeIn',
  CIRC_EASE_IN: 'Circ.easeIn',
  BACK_EASE_IN: 'Back.easeIn',
  BOUNCE_EASE_IN: 'Bounce.easeIn',
  QUAD_EASE_OUT: 'Quad.easeOut',
  CUBIC_EASE_OUT: 'Cubic.easeOut',
  QUART_EASE_OUT: 'Quart.easeOut',
  QUINT_EASE_OUT: 'Quint.easeOut',
  SINE_EASE_OUT: 'Sine.easeOut',
  EXPO_EASE_OUT: 'Expo.easeOut',
  CIRC_EASE_OUT: 'Circ.easeOut',
  BACK_EASE_OUT: 'Back.easeOut',
  BOUNCE_EASE_OUT: 'Bounce.easeOut',
  QUAD_EASE_IN_OUT: 'Quad.easeInOut',
  CUBIC_EASE_IN_OUT: 'Cubic.easeInOut',
  QUART_EASE_IN_OUT: 'Quart.easeInOut',
  QUINT_EASE_IN_OUT: 'Quint.easeInOut',
  SINE_EASE_IN_OUT: 'Sine.easeInOut',
  EXPO_EASE_IN_OUT: 'Expo.easeInOut',
  CIRC_EASE_IN_OUT: 'Circ.easeInOut',
  BACK_EASE_IN_OUT: 'Back.easeInOut',
  BOUNCE_EASE_IN_OUT: 'Bounce.easeInOut',
};

export const enum ResizerType {
  'FIT' = 'FIT', // Leads to empty spaces around canvas. But preserves aspect ratio. May not cover the entire screen with canvas.
  'ZOOM_FIT' = 'ZOOM_FIT', // Preserves aspect ratio and uses camera zoom to cover the entire screen with canvas.
  'ZOOM_FIT_DPR' = 'ZOOM_FIT_DPR', // Same as zoom fit but fixes pixelation issues on mobile by taking dpr into account.
}

export const LangCode = ((name = 'langCode', url = window.location.href) => {
  const code = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${code}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
})();
