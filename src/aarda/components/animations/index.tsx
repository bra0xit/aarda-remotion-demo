/**
 * Animation Primitives for Aarda Remotion Videos
 * Reusable animation components that can be composed into scenes
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { easings, getEasing } from '../../utils/easings';

// ============================================================================
// Types
// ============================================================================

interface BaseAnimationProps {
  /** Delay before animation starts (in frames) */
  delay?: number;
  /** Duration of animation (in frames) */
  duration?: number;
  /** Easing preset to use */
  easing?: 'smooth' | 'snappy' | 'bounce' | 'dramatic';
  /** Children to animate */
  children: React.ReactNode;
  /** Additional CSS styles */
  style?: React.CSSProperties;
}

interface SlideDirection {
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Distance to slide (in pixels) */
  distance?: number;
}

// ============================================================================
// FadeIn
// ============================================================================

interface FadeInProps extends BaseAnimationProps {}

export const FadeIn: React.FC<FadeInProps> = ({
  delay = 0,
  duration = 20,
  easing = 'smooth',
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: getEasing(easing),
    }
  );

  return (
    <div style={{ opacity, ...style }}>
      {children}
    </div>
  );
};

// ============================================================================
// SlideIn
// ============================================================================

interface SlideInProps extends BaseAnimationProps, SlideDirection {}

export const SlideIn: React.FC<SlideInProps> = ({
  delay = 0,
  duration = 20,
  easing = 'smooth',
  direction = 'up',
  distance = 30,
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: getEasing(easing),
    }
  );

  const getTransform = () => {
    const offset = (1 - progress) * distance;
    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`;
      case 'down':
        return `translateY(${-offset}px)`;
      case 'left':
        return `translateX(${offset}px)`;
      case 'right':
        return `translateX(${-offset}px)`;
    }
  };

  return (
    <div
      style={{
        opacity: progress,
        transform: getTransform(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// ScaleIn
// ============================================================================

interface ScaleInProps extends BaseAnimationProps {
  /** Starting scale (0-1) */
  fromScale?: number;
  /** Use spring animation instead of interpolate */
  useSpring?: boolean;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  delay = 0,
  duration = 20,
  easing = 'bounce',
  fromScale = 0.8,
  useSpring: useSpringAnim = false,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let scale: number;
  let opacity: number;

  if (useSpringAnim) {
    const springValue = spring({
      frame: frame - delay,
      fps,
      config: { stiffness: 200, damping: 15 },
    });
    scale = interpolate(springValue, [0, 1], [fromScale, 1]);
    opacity = interpolate(springValue, [0, 0.5, 1], [0, 1, 1]);
  } else {
    const progress = interpolate(
      frame,
      [delay, delay + duration],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: getEasing(easing),
      }
    );
    scale = interpolate(progress, [0, 1], [fromScale, 1]);
    opacity = progress;
  }

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// StaggerChildren
// ============================================================================

interface StaggerChildrenProps {
  /** Delay before first child animates (in frames) */
  delay?: number;
  /** Frames between each child animation */
  stagger?: number;
  /** Animation type for children */
  animation?: 'fade' | 'slide' | 'scale';
  /** Direction for slide animation */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Children to stagger */
  children: React.ReactNode[];
  /** Additional CSS styles for container */
  style?: React.CSSProperties;
}

export const StaggerChildren: React.FC<StaggerChildrenProps> = ({
  delay = 0,
  stagger = 5,
  animation = 'fade',
  direction = 'up',
  children,
  style,
}) => {
  const AnimationComponent = {
    fade: FadeIn,
    slide: SlideIn,
    scale: ScaleIn,
  }[animation];

  return (
    <div style={style}>
      {React.Children.map(children, (child, index) => (
        <AnimationComponent
          key={index}
          delay={delay + index * stagger}
          direction={direction}
        >
          {child}
        </AnimationComponent>
      ))}
    </div>
  );
};

// ============================================================================
// TypeWriter
// ============================================================================

interface TypeWriterProps {
  /** Text to reveal */
  text: string;
  /** Delay before typing starts (in frames) */
  delay?: number;
  /** Frames per character */
  speed?: number;
  /** Show cursor */
  showCursor?: boolean;
  /** Text styles */
  style?: React.CSSProperties;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  delay = 0,
  speed = 2,
  showCursor = true,
  style,
}) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);
  const charsToShow = Math.floor(adjustedFrame / speed);
  const displayText = text.slice(0, charsToShow);
  const isComplete = charsToShow >= text.length;

  // Cursor blink
  const cursorVisible = !isComplete && Math.floor(frame / 15) % 2 === 0;

  return (
    <span style={style}>
      {displayText}
      {showCursor && !isComplete && (
        <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
      )}
    </span>
  );
};

// ============================================================================
// CountUp
// ============================================================================

interface CountUpProps {
  /** Starting number */
  from?: number;
  /** Ending number */
  to: number;
  /** Delay before counting starts (in frames) */
  delay?: number;
  /** Duration of count (in frames) */
  duration?: number;
  /** Number format (integer or decimal places) */
  decimals?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "%") */
  suffix?: string;
  /** Text styles */
  style?: React.CSSProperties;
}

export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  delay = 0,
  duration = 30,
  decimals = 0,
  prefix = '',
  suffix = '',
  style,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easings.easeOut,
    }
  );

  const currentValue = from + (to - from) * progress;
  const displayValue = currentValue.toFixed(decimals);

  return (
    <span style={style}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// ============================================================================
// Highlight
// ============================================================================

interface HighlightProps {
  /** Content to highlight */
  children: React.ReactNode;
  /** Delay before highlight appears (in frames) */
  delay?: number;
  /** Duration of highlight animation (in frames) */
  duration?: number;
  /** Highlight color */
  color?: string;
  /** Highlight type */
  type?: 'underline' | 'background' | 'glow';
  /** Additional styles */
  style?: React.CSSProperties;
}

export const Highlight: React.FC<HighlightProps> = ({
  children,
  delay = 0,
  duration = 15,
  color = '#6c5ce7',
  type = 'underline',
  style,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easings.smooth,
    }
  );

  const getHighlightStyle = (): React.CSSProperties => {
    switch (type) {
      case 'underline':
        return {
          backgroundImage: `linear-gradient(${color}, ${color})`,
          backgroundSize: `${progress * 100}% 3px`,
          backgroundPosition: 'left bottom',
          backgroundRepeat: 'no-repeat',
          paddingBottom: 4,
        };
      case 'background':
        return {
          backgroundColor: color,
          opacity: progress * 0.3,
          padding: '2px 6px',
          borderRadius: 4,
        };
      case 'glow':
        return {
          textShadow: `0 0 ${20 * progress}px ${color}`,
        };
      default:
        return {};
    }
  };

  return (
    <span style={{ position: 'relative', ...getHighlightStyle(), ...style }}>
      {children}
    </span>
  );
};

// ============================================================================
// MorphText (simplified - shows text transition)
// ============================================================================

interface MorphTextProps {
  /** Array of text values to morph between */
  texts: string[];
  /** Frames to display each text */
  interval?: number;
  /** Transition duration (in frames) */
  transitionDuration?: number;
  /** Text styles */
  style?: React.CSSProperties;
}

export const MorphText: React.FC<MorphTextProps> = ({
  texts,
  interval = 60,
  transitionDuration = 15,
  style,
}) => {
  const frame = useCurrentFrame();

  const totalCycleDuration = interval + transitionDuration;
  const currentCycle = Math.floor(frame / totalCycleDuration);
  const frameInCycle = frame % totalCycleDuration;

  const currentIndex = currentCycle % texts.length;
  const nextIndex = (currentIndex + 1) % texts.length;

  const isTransitioning = frameInCycle >= interval;
  const transitionProgress = isTransitioning
    ? (frameInCycle - interval) / transitionDuration
    : 0;

  const currentText = texts[currentIndex];
  const nextText = texts[nextIndex];

  return (
    <span style={{ position: 'relative', ...style }}>
      <span
        style={{
          position: isTransitioning ? 'absolute' : 'relative',
          opacity: 1 - transitionProgress,
          transform: `translateY(${transitionProgress * -10}px)`,
        }}
      >
        {currentText}
      </span>
      {isTransitioning && (
        <span
          style={{
            opacity: transitionProgress,
            transform: `translateY(${(1 - transitionProgress) * 10}px)`,
          }}
        >
          {nextText}
        </span>
      )}
    </span>
  );
};

// ============================================================================
// Pulse
// ============================================================================

interface PulseProps {
  /** Children to pulse */
  children: React.ReactNode;
  /** Pulse speed (frames per cycle) */
  speed?: number;
  /** Min scale */
  minScale?: number;
  /** Max scale */
  maxScale?: number;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const Pulse: React.FC<PulseProps> = ({
  children,
  speed = 30,
  minScale = 0.95,
  maxScale = 1.05,
  style,
}) => {
  const frame = useCurrentFrame();

  const pulse = Math.sin((frame / speed) * Math.PI * 2) * 0.5 + 0.5;
  const scale = minScale + pulse * (maxScale - minScale);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
