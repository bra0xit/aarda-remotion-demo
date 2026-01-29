import { Easing } from 'remotion';

// Common easing presets
export const easings = {
  // Smooth deceleration (most common)
  smooth: Easing.bezier(0.4, 0, 0.2, 1),

  // Quick start, gentle end
  snappy: Easing.bezier(0.25, 0.1, 0.25, 1),

  // Bounce effect
  bounce: Easing.out(Easing.back(1.5)),

  // Dramatic entrance
  dramatic: Easing.bezier(0.68, -0.55, 0.265, 1.55),
};

// Spring config presets
export const springs = {
  gentle: { stiffness: 100, damping: 15 },
  snappy: { stiffness: 300, damping: 25 },
  bouncy: { stiffness: 200, damping: 10 },
};

// Color utilities
export const colors = {
  gradients: {
    purple: ['#8B5CF6', '#A78BFA'],
    blue: ['#3B82F6', '#6366F1'],
    emerald: ['#10B981', '#14B8A6'],
    amber: ['#F59E0B', '#F97316'],
    rose: ['#F43F5E', '#EC4899'],
    cyan: ['#06B6D4', '#0EA5E9'],
  },
  emotions: {
    positive: '#22C55E',
    negative: '#EF4444',
  },
  ui: {
    background: '#0f0f0f',
    card: '#1a1a1a',
    cardHover: '#222',
    text: '#fff',
    textMuted: '#a0a0a0',
    border: 'rgba(255,255,255,0.1)',
  },
};
