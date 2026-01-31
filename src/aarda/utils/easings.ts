/**
 * Easing and Spring Presets for Aarda Remotion Videos
 */

import { Easing } from 'remotion';

/** Easing function presets */
export const easings = {
  /** Smooth deceleration - most common, natural feel */
  smooth: Easing.bezier(0.4, 0, 0.2, 1),

  /** Quick start, gentle end - snappy interactions */
  snappy: Easing.bezier(0.25, 0.1, 0.25, 1),

  /** Overshoot effect - playful bounce */
  bounce: Easing.out(Easing.back(1.5)),

  /** Dramatic entrance - theatrical reveals */
  dramatic: Easing.bezier(0.68, -0.55, 0.265, 1.55),

  /** Linear - constant speed */
  linear: Easing.linear,

  /** Ease in - slow start */
  easeIn: Easing.in(Easing.cubic),

  /** Ease out - slow end */
  easeOut: Easing.out(Easing.cubic),

  /** Ease in-out - slow start and end */
  easeInOut: Easing.inOut(Easing.cubic),
};

/** Spring configuration presets */
export const springs = {
  /** Gentle, slow settle */
  gentle: { stiffness: 100, damping: 15 },

  /** Quick, responsive */
  snappy: { stiffness: 300, damping: 25 },

  /** Playful overshoot */
  bouncy: { stiffness: 200, damping: 10 },

  /** Very stiff, minimal overshoot */
  stiff: { stiffness: 400, damping: 30 },

  /** Slow, heavy feel */
  slow: { stiffness: 80, damping: 20 },
};

/** Get easing function by name */
export const getEasing = (
  name: 'smooth' | 'snappy' | 'bounce' | 'dramatic' | 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
): ((t: number) => number) => {
  return easings[name] || easings.smooth;
};

/** Get spring config by name */
export const getSpring = (
  name: 'gentle' | 'snappy' | 'bouncy' | 'stiff' | 'slow'
): { stiffness: number; damping: number } => {
  return springs[name] || springs.gentle;
};
