/**
 * Cinematic Dark Theme
 * Elevated version with particles, dramatic lighting, and 3D elements
 */

import { AardaTheme } from './types';

export const cinematicTheme: AardaTheme = {
  name: 'cinematic',
  description: 'Premium marketing theme with dramatic effects',

  colors: {
    // Core colors - deeper, more dramatic
    background: '#050508',
    backgroundAlt: '#0a0a10',
    foreground: '#ffffff',
    primary: '#8b5cf6',
    secondary: '#1a1a24',
    accent: '#c084fc',
    muted: '#52525b',
    card: '#12121a',
    border: '#27272a',

    // Feature-specific - more vibrant
    character: '#f3e8ff',
    characterForeground: '#581c87',
    player: '#fef9c3',
    playerForeground: '#713f12',
    knowledgeBrick: '#f1f5f9',
    knowledgeBrickForeground: '#0f172a',
    group: '#cffafe',
    groupForeground: '#164e63',

    // Chat colors - slightly more dramatic
    playerMessage: '#10b981',
    characterMessage: 'rgba(255, 255, 255, 0.08)',

    // Emotion colors - more saturated
    emotionJoy: '#facc15',
    emotionSadness: '#2563eb',
    emotionTrust: '#16a34a',
    emotionDisgust: '#e879f9',
    emotionFear: '#4f46e5',
    emotionAnger: '#dc2626',
    emotionSurprise: '#0891b2',
    emotionAnticipation: '#ea580c',

    // Effect colors - more intense
    glow: '#a78bfa',
    particle: '#c4b5fd',
    gradient: ['#7c3aed', '#db2777'],
  },

  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  animation: {
    easing: 'dramatic',
    stagger: 4,
  },

  effects: {
    glow: true,
    particles: true,
    blur: 4,
  },
};
