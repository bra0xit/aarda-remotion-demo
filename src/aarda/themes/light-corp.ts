/**
 * Light Corporate Theme
 * Clean, minimal, professional theme for B2B/Enterprise content
 */

import { AardaTheme } from './types';

export const lightCorpTheme: AardaTheme = {
  name: 'light-corp',
  description: 'Clean B2B theme for enterprise and corporate content',

  colors: {
    // Core colors - clean and professional
    background: '#ffffff',
    backgroundAlt: '#f8fafc',
    foreground: '#0f172a',
    primary: '#6c5ce7',
    secondary: '#f1f5f9',
    accent: '#7c3aed',
    muted: '#94a3b8',
    card: '#ffffff',
    border: '#e2e8f0',

    // Feature-specific - subtle, professional
    character: '#f5f3ff',
    characterForeground: '#5b21b6',
    player: '#fefce8',
    playerForeground: '#854d0e',
    knowledgeBrick: '#f8fafc',
    knowledgeBrickForeground: '#1e40af',
    group: '#ecfeff',
    groupForeground: '#0e7490',

    // Chat colors - softer
    playerMessage: '#10b981',
    characterMessage: '#f1f5f9',

    // Emotion colors - muted for corporate
    emotionJoy: '#eab308',
    emotionSadness: '#3b82f6',
    emotionTrust: '#22c55e',
    emotionDisgust: '#a855f7',
    emotionFear: '#6366f1',
    emotionAnger: '#ef4444',
    emotionSurprise: '#06b6d4',
    emotionAnticipation: '#f97316',

    // Effect colors - subtle
    glow: '#6c5ce7',
    particle: '#c4b5fd',
    gradient: ['#6c5ce7', '#8b5cf6'],
  },

  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  animation: {
    easing: 'smooth',
    stagger: 6,
  },

  effects: {
    glow: false,
    particles: false,
    blur: 0,
  },
};
