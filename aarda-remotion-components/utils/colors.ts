/**
 * Color Utility Functions for Aarda Remotion Videos
 */

/**
 * Convert HSL to Hex color
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Convert Hex to RGB object
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Interpolate between two colors
 * @param color1 Start color (hex)
 * @param color2 End color (hex)
 * @param factor Interpolation factor (0-1)
 */
export const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Add opacity to a hex color
 * @param hex Hex color
 * @param opacity Opacity (0-1)
 */
export const withOpacity = (hex: string, opacity: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

/**
 * Lighten a hex color
 * @param hex Hex color
 * @param amount Amount to lighten (0-1)
 */
export const lighten = (hex: string, amount: number): string => {
  return interpolateColor(hex, '#ffffff', amount);
};

/**
 * Darken a hex color
 * @param hex Hex color
 * @param amount Amount to darken (0-1)
 */
export const darken = (hex: string, amount: number): string => {
  return interpolateColor(hex, '#000000', amount);
};

/**
 * Generate a gradient CSS string
 */
export const gradient = (
  colors: string[],
  direction: 'to right' | 'to bottom' | 'to bottom right' | string = 'to right'
): string => {
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
};

/**
 * Generate a radial gradient CSS string
 */
export const radialGradient = (
  colors: string[],
  position: string = 'center'
): string => {
  return `radial-gradient(ellipse at ${position}, ${colors.join(', ')})`;
};
