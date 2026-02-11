import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { THEME } from '../theme';

interface EntityCounterProps {
  count: number;
  label: string;
  delay?: number;
}

export const EntityCounter: React.FC<EntityCounterProps> = ({
  count,
  label,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = frame - delay;

  if (adjustedFrame < 0) {
    return null;
  }

  const entrySpring = spring({
    frame: adjustedFrame,
    fps,
    config: { stiffness: 160, damping: 16 },
  });

  const translateX = interpolate(entrySpring, [0, 1], [-60, 0]);
  const opacity = interpolate(entrySpring, [0, 1], [0, 1]);

  const barScale = interpolate(
    adjustedFrame,
    [0, 18],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      transform: `translateX(${translateX}px)`,
      opacity,
    }}>
      <div style={{
        width: 3,
        alignSelf: 'stretch',
        backgroundColor: THEME.colors.primary,
        borderRadius: 2,
        transform: `scaleY(${barScale})`,
        transformOrigin: 'center center',
      }} />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 12 }}>
        <span style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 48,
          fontWeight: 800,
          color: THEME.colors.primary,
          lineHeight: 1,
        }}>
          {count}
        </span>
        <span style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 40,
          fontWeight: 700,
          color: THEME.colors.text,
          lineHeight: 1,
        }}>
          {label}
        </span>
      </div>
    </div>
  );
};
