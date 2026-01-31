/**
 * Aarda Theme Type Definitions
 * Defines the structure for all visual themes used in Remotion videos
 */

export interface AardaTheme {
  name: string;
  description: string;

  colors: {
    // Core colors
    background: string;
    backgroundAlt: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    card: string;
    border: string;

    // Feature-specific colors
    character: string;
    characterForeground: string;
    player: string;
    playerForeground: string;
    knowledgeBrick: string;
    knowledgeBrickForeground: string;
    group: string;
    groupForeground: string;

    // Chat colors
    playerMessage: string;
    characterMessage: string;

    // Emotion colors
    emotionJoy: string;
    emotionSadness: string;
    emotionTrust: string;
    emotionDisgust: string;
    emotionFear: string;
    emotionAnger: string;
    emotionSurprise: string;
    emotionAnticipation: string;

    // Effect colors
    glow: string;
    particle: string;
    gradient: [string, string];
  };

  fonts: {
    heading: string;
    body: string;
    mono: string;
  };

  animation: {
    /** Default easing preset name */
    easing: 'smooth' | 'snappy' | 'bounce' | 'dramatic';
    /** Frames between staggered animations */
    stagger: number;
  };

  effects: {
    /** Enable glow effects */
    glow: boolean;
    /** Enable particle effects */
    particles: boolean;
    /** Blur intensity for overlays (px) */
    blur: number;
  };
}

/** All available theme names */
export type AardaThemeName = 'dark-app' | 'cinematic' | 'light-corp' | 'fantasy';
