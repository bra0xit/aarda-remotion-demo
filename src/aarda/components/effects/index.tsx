/**
 * Effect Components for Aarda Remotion Videos
 * Visual effects like glow, particles, gradients, and shimmers
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, random } from 'remotion';
import { withOpacity, radialGradient } from '../../utils/colors';
import { AardaTheme } from '../../themes/types';

// ============================================================================
// GlowPulse
// ============================================================================

interface GlowPulseProps {
  /** Glow color (defaults to theme primary) */
  color?: string;
  /** Pulse speed (frames per cycle) */
  speed?: number;
  /** Min opacity */
  minOpacity?: number;
  /** Max opacity */
  maxOpacity?: number;
  /** Glow size (px) */
  size?: number;
  /** Position */
  position?: { x: string | number; y: string | number };
  /** Theme for default colors */
  theme?: AardaTheme;
}

export const GlowPulse: React.FC<GlowPulseProps> = ({
  color,
  speed = 60,
  minOpacity = 0.3,
  maxOpacity = 0.7,
  size = 300,
  position = { x: '50%', y: '50%' },
  theme,
}) => {
  const frame = useCurrentFrame();

  const glowColor = color || theme?.colors.glow || '#6c5ce7';
  const pulse = Math.sin((frame / speed) * Math.PI * 2) * 0.5 + 0.5;
  const opacity = minOpacity + pulse * (maxOpacity - minOpacity);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: '50%',
        background: radialGradient([
          withOpacity(glowColor, opacity),
          'transparent',
        ]),
        filter: `blur(${size / 4}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};

// ============================================================================
// ParticleField
// ============================================================================

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  color: string;
}

interface ParticleFieldProps {
  /** Number of particles */
  count?: number;
  /** Particle colors (array to randomize from) */
  colors?: string[];
  /** Min particle size */
  minSize?: number;
  /** Max particle size */
  maxSize?: number;
  /** Container dimensions (defaults to full) */
  width?: number;
  height?: number;
  /** Theme for default colors */
  theme?: AardaTheme;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 20,
  colors,
  minSize = 3,
  maxSize = 8,
  width = 1080,
  height = 1920,
  theme,
}) => {
  const frame = useCurrentFrame();

  const particleColors = colors || [
    theme?.colors.particle || '#a78bfa',
    theme?.colors.primary || '#6c5ce7',
    theme?.colors.accent || '#9e5ecf',
  ];

  // Generate particles deterministically using Remotion's random
  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random(`particle-x-${i}`) * width,
      y: random(`particle-y-${i}`) * height,
      size: minSize + random(`particle-size-${i}`) * (maxSize - minSize),
      speed: 0.3 + random(`particle-speed-${i}`) * 0.7,
      delay: random(`particle-delay-${i}`) * 100,
      color: particleColors[Math.floor(random(`particle-color-${i}`) * particleColors.length)],
    }));
  }, [count, width, height, minSize, maxSize, particleColors]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((particle) => {
        const particleFrame = frame - particle.delay;
        if (particleFrame < 0) return null;

        const floatY = Math.sin(particleFrame * 0.02 * particle.speed) * 30;
        const floatX = Math.cos(particleFrame * 0.015 * particle.speed) * 20;

        const opacity = interpolate(
          particleFrame,
          [0, 20, 80, 100],
          [0, 0.6, 0.6, 0],
          { extrapolateRight: 'clamp' }
        );

        // Loop the particle
        const cycleFrame = particleFrame % 120;
        const cycleOpacity = interpolate(
          cycleFrame,
          [0, 20, 100, 120],
          [0, 0.6, 0.6, 0],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: particle.x + floatX,
              top: particle.y + floatY,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: particle.color,
              opacity: cycleOpacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        );
      })}
    </div>
  );
};

// ============================================================================
// GradientBackground
// ============================================================================

interface GradientBackgroundProps {
  /** Gradient colors */
  colors?: string[];
  /** Animate the gradient */
  animate?: boolean;
  /** Animation speed (frames per cycle) */
  speed?: number;
  /** Gradient direction (degrees) */
  direction?: number;
  /** Theme for default colors */
  theme?: AardaTheme;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors,
  animate = true,
  speed = 120,
  direction = 135,
  theme,
}) => {
  const frame = useCurrentFrame();

  const gradientColors = colors || [
    theme?.colors.background || '#0a0a0f',
    theme?.colors.primary || '#6c5ce7',
    theme?.colors.accent || '#9e5ecf',
  ];

  const animatedDirection = animate
    ? direction + (frame / speed) * 360
    : direction;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(${animatedDirection}deg, ${gradientColors.join(', ')})`,
        backgroundSize: '400% 400%',
        animation: animate ? undefined : 'none',
      }}
    />
  );
};

// ============================================================================
// Shimmer
// ============================================================================

interface ShimmerProps {
  /** Shimmer color */
  color?: string;
  /** Width of shimmer band */
  width?: number;
  /** Animation speed (frames per cycle) */
  speed?: number;
  /** Angle of shimmer */
  angle?: number;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  color = 'rgba(255, 255, 255, 0.1)',
  width = 200,
  speed = 60,
  angle = -45,
}) => {
  const frame = useCurrentFrame();

  const position = interpolate(
    frame % speed,
    [0, speed],
    [-width, 100 + width],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${position}%`,
          width,
          height: '200%',
          background: `linear-gradient(${angle}deg, transparent, ${color}, transparent)`,
          transform: `rotate(${angle}deg)`,
        }}
      />
    </div>
  );
};

// ============================================================================
// Spotlight
// ============================================================================

interface SpotlightProps {
  /** Spotlight position */
  position?: { x: string | number; y: string | number };
  /** Spotlight size (px) */
  size?: number;
  /** Spotlight color */
  color?: string;
  /** Intensity (0-1) */
  intensity?: number;
  /** Animate movement */
  animate?: boolean;
  /** Movement range (px) */
  moveRange?: number;
  /** Movement speed (frames per cycle) */
  moveSpeed?: number;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  position = { x: '50%', y: '30%' },
  size = 400,
  color = 'rgba(255, 255, 255, 0.15)',
  intensity = 1,
  animate = false,
  moveRange = 50,
  moveSpeed = 90,
}) => {
  const frame = useCurrentFrame();

  let x = position.x;
  let y = position.y;

  if (animate) {
    const offsetX = Math.sin((frame / moveSpeed) * Math.PI * 2) * moveRange;
    const offsetY = Math.cos((frame / moveSpeed) * Math.PI * 2) * moveRange * 0.5;

    if (typeof position.x === 'number') {
      x = position.x + offsetX;
    }
    if (typeof position.y === 'number') {
      y = position.y + offsetY;
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        marginLeft: typeof x === 'number' ? -size / 2 : undefined,
        marginTop: typeof y === 'number' ? -size / 2 : undefined,
        transform: typeof x === 'string' ? 'translate(-50%, -50%)' : undefined,
        background: radialGradient([
          withOpacity(color, intensity),
          'transparent',
        ]),
        pointerEvents: 'none',
      }}
    />
  );
};

// ============================================================================
// Vignette
// ============================================================================

interface VignetteProps {
  /** Vignette color */
  color?: string;
  /** Vignette intensity (0-1) */
  intensity?: number;
  /** Vignette size (0-1, where 1 = edges only) */
  size?: number;
}

export const Vignette: React.FC<VignetteProps> = ({
  color = '#000000',
  intensity = 0.5,
  size = 0.3,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at center, transparent ${(1 - size) * 100}%, ${withOpacity(color, intensity)} 100%)`,
        pointerEvents: 'none',
      }}
    />
  );
};

// ============================================================================
// FloatingOrbs
// ============================================================================

interface FloatingOrbsProps {
  /** Number of orbs */
  count?: number;
  /** Orb colors */
  colors?: string[];
  /** Min orb size */
  minSize?: number;
  /** Max orb size */
  maxSize?: number;
  /** Blur amount */
  blur?: number;
  /** Theme for default colors */
  theme?: AardaTheme;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  count = 4,
  colors,
  minSize = 100,
  maxSize = 300,
  blur = 60,
  theme,
}) => {
  const frame = useCurrentFrame();

  const orbColors = colors || [
    theme?.colors.primary || '#6c5ce7',
    theme?.colors.accent || '#9e5ecf',
    theme?.colors.particle || '#a78bfa',
  ];

  const orbs = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random(`orb-x-${i}`) * 100,
      y: random(`orb-y-${i}`) * 100,
      size: minSize + random(`orb-size-${i}`) * (maxSize - minSize),
      speed: 20 + random(`orb-speed-${i}`) * 15,
      color: orbColors[i % orbColors.length],
    }));
  }, [count, minSize, maxSize, orbColors]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {orbs.map((orb) => {
        const floatX = Math.sin(frame / orb.speed) * 30;
        const floatY = Math.cos(frame / (orb.speed * 1.3)) * 20;

        return (
          <div
            key={orb.id}
            style={{
              position: 'absolute',
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              marginLeft: -orb.size / 2,
              marginTop: -orb.size / 2,
              borderRadius: '50%',
              background: radialGradient([
                withOpacity(orb.color, 0.4),
                'transparent',
              ]),
              filter: `blur(${blur}px)`,
              transform: `translate(${floatX}px, ${floatY}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
