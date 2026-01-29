/**
 * Theme definition for Remotion videos.
 * Themes control colors, fonts, and animation defaults.
 */
export interface Theme {
  name: string;

  colors: {
    /** Main background color */
    background: string;
    /** Primary text/foreground color */
    foreground: string;
    /** Primary accent color for highlights, buttons */
    primary: string;
    /** Secondary accent for variety */
    secondary: string;
    /** Tertiary accent */
    accent: string;
    /** Muted color for subtle elements */
    muted: string;
  };

  fonts: {
    /** Font for headings/titles */
    heading: string;
    /** Font for body text */
    body: string;
    /** Font for code/monospace */
    mono: string;
  };

  animation: {
    /** Default easing function name */
    easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInOutCubic' | 'easeInOutQuint';
    /** Frames between staggered animations */
    stagger: number;
  };
}

/** All available theme names */
export type ThemeName =
  | 'dark-tech'
  | 'light-minimal'
  | 'vibrant'
  | 'corporate'
  | 'neon-noir'
  | 'warm-earth'
  | 'pastel-soft'
  | 'retro-80s'
  | 'nature-fresh'
  | 'monochrome';
