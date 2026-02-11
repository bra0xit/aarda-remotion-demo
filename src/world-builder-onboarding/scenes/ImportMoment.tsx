import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { ParticleField } from '../../aarda';
import { THEME } from '../theme';
import { EntityCounter } from '../components/EntityCounter';
import type { WorldBuilderProps } from '../schema';

interface ImportMomentProps {
  importStats: WorldBuilderProps['importStats'];
  importConclusion: string;
}

export const ImportMoment: React.FC<ImportMomentProps> = ({
  importStats,
  importConclusion,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statDelays = [0, 15, 27, 37, 47];
  const imagesLineDelay = 57;

  const statsFadeOut = interpolate(frame, [90, 110], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statsSlideUp = interpolate(frame, [90, 110], [0, -20], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const conclusionOpacity = interpolate(frame, [90, 108], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const conclusionSlideUp = interpolate(frame, [90, 108], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const conclusionScale = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const particleCount = frame >= 90 ? 25 : 15;

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg }}>
      <ParticleField count={particleCount} colors={[THEME.colors.particle]} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: statsFadeOut,
          transform: `translateY(${statsSlideUp}px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 14,
          }}
        >
          {importStats.map((stat, index) => (
            <EntityCounter
              key={index}
              count={stat.count}
              label={stat.label}
              delay={statDelays[index] ?? index * 10}
            />
          ))}
          {(() => {
            const lineFrame = frame - imagesLineDelay;
            const lineOpacity = interpolate(lineFrame, [0, 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const lineSlide = interpolate(lineFrame, [0, 10], [20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                style={{
                  opacity: lineOpacity,
                  transform: `translateX(${lineSlide}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 32,
                    backgroundColor: THEME.colors.primary,
                    borderRadius: 2,
                  }}
                />
                <span
                  style={{
                    fontFamily: THEME.fonts.body,
                    fontSize: 40,
                    fontWeight: 700,
                    color: THEME.colors.textMuted,
                  }}
                >
                  All with generated images.
                </span>
              </div>
            );
          })()}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: conclusionOpacity,
          transform: `translateY(${conclusionSlideUp}px) scale(${0.9 + conclusionScale * 0.1})`,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.heading,
            fontSize: 56,
            fontWeight: 800,
            color: THEME.colors.text,
            textShadow: '0 0 40px #6c5ce7, 0 0 80px rgba(108,92,231,0.3)',
            textAlign: 'center',
          }}
        >
          {importConclusion}
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
