/**
 * Fantasy/Mystical Theme
 * Orbs & Gods aesthetic with mystical elements
 */

import { AardaTheme } from './types';

export const fantasyTheme: AardaTheme = {
  name: 'fantasy',
  description: 'Orbs & Gods aesthetic with mystical, magical elements',

  colors: {
    // Core colors - mystical and magical
    background: '#0c0a1a',
    backgroundAlt: '#12102a',
    foreground: '#f0e6ff',
    primary: '#a855f7',
    secondary: '#1e1b4b',
    accent: '#f472b6',
    muted: '#6b7280',
    card: '#1a1744',
    border: '#312e81',

    // Feature-specific - magical tones
    character: '#fae8ff',
    characterForeground: '#701a75',
    player: '#fef3c7',
    playerForeground: '#78350f',
    knowledgeBrick: '#ede9fe',
    knowledgeBrickForeground: '#3730a3',
    group: '#e0e7ff',
    groupForeground: '#3730a3',

    // Chat colors - mystical
    playerMessage: '#10b981',
    characterMessage: 'rgba(167, 139, 250, 0.15)',

    // Emotion colors - magical palette
    emotionJoy: '#fcd34d',
    emotionSadness: '#818cf8',
    emotionTrust: '#34d399',
    emotionDisgust: '#f0abfc',
    emotionFear: '#a5b4fc',
    emotionAnger: '#fb7185',
    emotionSurprise: '#67e8f9',
    emotionAnticipation: '#fdba74',

    // Effect colors - magical glow
    glow: '#c084fc',
    particle: '#e879f9',
    gradient: ['#7c3aed', '#ec4899'],
  },

  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  animation: {
    easing: 'bounce',
    stagger: 4,
  },

  effects: {
    glow: true,
    particles: true,
    blur: 6,
  },
};
