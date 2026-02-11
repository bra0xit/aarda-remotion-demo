import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { THEME } from '../theme';

interface OptionCardProps {
  text: string;
  selected: boolean;
  index: number;
  staggerDelay?: number;
  selectionFrame?: number;
  accentColor?: string;
  style?: React.CSSProperties;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  text,
  selected,
  index,
  staggerDelay = 5,
  selectionFrame,
  accentColor = THEME.colors.primary,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryDelay = index * staggerDelay;
  const adjustedFrame = frame - entryDelay;

  if (adjustedFrame < 0) {
    return null;
  }

  const entryProgress = interpolate(
    adjustedFrame,
    [0, 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const entryTranslateY = interpolate(entryProgress, [0, 1], [30, 0]);
  const entryOpacity = entryProgress;

  let selectionScale = 1;
  let selectionOpacity = 1;
  let selectionTranslateX = 0;
  let selectionTranslateY = 0;
  let glowShadow = 'none';
  let accentBarWidth = 0;
  let bgLuminance = 0;
  let shimmerX = -150;
  let borderProgress = 0;

  if (selectionFrame !== undefined && frame >= selectionFrame) {
    const t = frame - selectionFrame;

    if (selected) {
      // Smooth spring — high damping for zero overshoot, buttery ease-in
      const liftSpring = spring({
        frame: t,
        fps,
        config: { stiffness: 100, damping: 20, mass: 1.2 },
      });

      // Big, confident scale — card clearly "wins"
      selectionScale = interpolate(liftSpring, [0, 1], [1.0, 1.10]);
      // Lifts noticeably
      selectionTranslateY = interpolate(liftSpring, [0, 1], [0, -4]);

      // Border eases to accent color
      borderProgress = interpolate(t, [0, 18], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });

      // Accent bar — thick and glowing
      const barEase = interpolate(t, [0, 18], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });
      accentBarWidth = barEase * 5;

      // 4-stage glow bloom — each layer fades in sequentially, building outward
      const g1 = interpolate(t, [0, 10], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });
      const g2 = interpolate(t, [4, 14], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });
      const g3 = interpolate(t, [8, 20], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });
      const g4 = interpolate(t, [12, 25], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      });
      glowShadow = [
        `0 0 ${10 * g1}px ${accentColor}90`,
        `0 0 ${30 * g2}px ${accentColor}60`,
        `0 0 ${60 * g3}px ${accentColor}35`,
        `0 0 ${100 * g4}px ${accentColor}18`,
        `inset 0 0 ${12 * g1}px ${accentColor}18`,
      ].join(', ');

      // Smooth luminance flash — ramps up over 8 frames, peaks, then settles to warm
      bgLuminance = interpolate(
        t,
        [0, 8, 20, 30],
        [0, 0.18, 0.06, 0.04],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );

      // Broad, slow light pass across the card
      shimmerX = interpolate(
        t,
        [4, 32],
        [-30, 130],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
    } else {
      // Unselected: gracefully recede — shrink slightly, fade, drift
      selectionOpacity = interpolate(
        t,
        [0, 22],
        [1, 0.1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
      selectionScale = interpolate(
        t,
        [0, 22],
        [1, 0.97],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
      selectionTranslateX = interpolate(
        t,
        [0, 22],
        [0, -8],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
    }
  }

  const isActive = selectionFrame !== undefined && frame >= selectionFrame && selected;

  // Smoothly interpolate border color via opacity layering
  const activeBorderColor = isActive ? accentColor : THEME.colors.border;
  const activeBorderWidth = isActive ? Math.round(1 + borderProgress) : 1;

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: THEME.colors.card,
    border: `${activeBorderWidth}px solid ${activeBorderColor}`,
    borderRadius: 12,
    padding: '18px 24px',
    paddingLeft: accentBarWidth > 0.1 ? 32 : 24,
    fontFamily: THEME.fonts.body,
    fontSize: 24,
    color: THEME.colors.text,
    lineHeight: 1.4,
    transform: `translateY(${entryTranslateY + selectionTranslateY}px) translateX(${selectionTranslateX}px) scale(${selectionScale})`,
    opacity: entryOpacity * selectionOpacity,
    boxShadow: glowShadow,
    ...style,
  };

  return (
    <div style={cardStyle}>
      {/* Left accent bar with glow */}
      {accentBarWidth > 0.1 && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: accentBarWidth,
            backgroundColor: accentColor,
            boxShadow: `0 0 12px ${accentColor}60, 0 0 24px ${accentColor}30`,
            borderRadius: '0 3px 3px 0',
          }}
        />
      )}
      {/* Luminance flash — smooth white bloom across the card bg */}
      {bgLuminance > 0.005 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 30% 50%, rgba(255,255,255,${bgLuminance * 1.5}) 0%, rgba(255,255,255,${bgLuminance * 0.5}) 50%, transparent 80%)`,
            borderRadius: 9,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Broad light pass — slow, cinematic sweep */}
      {isActive && shimmerX < 120 && (
        <div
          style={{
            position: 'absolute',
            top: -2,
            bottom: -2,
            left: `${shimmerX}%`,
            width: '50%',
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)`,
            pointerEvents: 'none',
            transform: 'skewX(-10deg)',
          }}
        />
      )}
      {text}
    </div>
  );
};
