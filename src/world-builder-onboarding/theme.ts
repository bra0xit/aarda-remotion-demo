// Aarda World Builder Onboarding — Theme Constants

export const THEME = {
  colors: {
    bg: '#0a0a0f',
    bgAlt: '#111116',
    primary: '#6c5ce7',
    accent: '#9e5ecf',
    card: '#262629',
    border: '#262629',
    text: '#fafafa',
    textMuted: '#71717a',
    glow: '#6c5ce7',
    particle: '#a78bfa',
    green: '#059669',
    playerGold: '#fef3c7',
    // Phase accent colors for brainstorm steps
    phaseSlow: '#6c5ce7',    // purple
    phaseMedium: '#e056a0',  // pink
    phaseFast: '#00d2d3',    // teal
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  // Timing constants for accelerating cascade
  timing: {
    slowStep: 90, // 3s per step (steps 1-3)
    mediumStep: 75, // 2.5s per step (steps 4-6)
    fastStep: 60, // 2s per step (steps 7-9)
    morphSlow: 12, // transition frames between steps (slow phase)
    morphMedium: 8,
    morphFast: 5,
    staggerSlow: 5, // frames between option card appearances
    staggerMedium: 3,
    staggerFast: 2,
  },
} as const;
