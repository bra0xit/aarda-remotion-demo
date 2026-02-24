/**
 * Dark App Theme
 * Matches the current Aarda Play dark mode UI exactly
 */

import { AardaTheme } from './types';

export const darkAppTheme: AardaTheme = {
  name: 'dark-app',
  description: 'Matches current Aarda UI - dark theme with purples and blues',

  colors: {
    // Core colors (from Aarda globals.css .dark)
    background: '#0a0a0f',
    backgroundAlt: '#111116',
    foreground: '#fafafa',
    primary: '#6c5ce7',
    secondary: '#262629',
    accent: '#9e5ecf',
    muted: '#71717a',
    card: '#262629',
    border: '#262629',

    // Feature-specific (from Aarda badge colors)
    character: '#e9dff7',
    characterForeground: '#4a1d6b',
    player: '#fef3c7',
    playerForeground: '#451a03',
    knowledgeBrick: '#f0f0f2',
    knowledgeBrickForeground: '#1e3a5f',
    group: '#e0f7fa',
    groupForeground: '#0c4a5e',

    // Chat colors
    playerMessage: '#059669',
    characterMessage: 'rgba(255, 255, 255, 0.1)',

    // Emotion colors
    emotionJoy: '#fbbf24',
    emotionSadness: '#3b82f6',
    emotionTrust: '#22c55e',
    emotionDisgust: '#d946ef',
    emotionFear: '#6366f1',
    emotionAnger: '#ef4444',
    emotionSurprise: '#06b6d4',
    emotionAnticipation: '#f97316',

    // Effect colors
    glow: '#6c5ce7',
    particle: '#a78bfa',
    gradient: ['#6c5ce7', '#9e5ecf'],
  },

  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  animation: {
    easing: 'smooth',
    stagger: 5,
  },

  effects: {
    glow: true,
    particles: false,
    blur: 2,
  },
};
