import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import { THEME } from '../theme';
import { GlitchEffect } from '../components/GlitchEffect';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const RewindTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glitchOpacity = interpolate(frame, [0, 18, 20], [1, 1, 0], CLAMP);

  const jitter1 = Math.sin(frame * 1.7) * 8;
  const jitter2 = Math.sin(frame * 2.3 + 1) * 6;
  const jitter3 = Math.sin(frame * 3.1 + 2) * 10;

  const textSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 20, mass: 1, stiffness: 300 },
  });
  const textOpacity = interpolate(frame, [30, 40], [0, 1], CLAMP);
  const textScale = interpolate(textSpring, [0, 1], [0.9, 1.0], CLAMP);

  const staticBars = Array.from({ length: 8 }, (_, i) => {
    const yPercent = 20 + i * 8;
    const xOffset = Math.sin(frame * (0.8 + i * 0.6) + i) * 15;
    const barWidth = 30 + Math.sin(frame * 0.9 + i * 2) * 20;
    const colors = [THEME.colors.primary, THEME.colors.accent, THEME.colors.particle];
    const barOpacity = 0.3 + Math.sin(frame * 2 + i) * 0.2;
    const barHeight = 3 + (i % 3) * 2;

    return { key: i, yPercent, xOffset, barWidth, color: colors[i % 3], barOpacity, barHeight };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg }}>
      {frame < 20 && (
        <GlitchEffect>
          <AbsoluteFill style={{ opacity: glitchOpacity }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: 60,
                  backgroundColor: THEME.colors.primary,
                  opacity: 0.7,
                  transform: `translateX(${jitter1}px)`,
                  filter: 'blur(2px)',
                }}
              />
              <div
                style={{
                  width: '65%',
                  height: 40,
                  backgroundColor: THEME.colors.accent,
                  opacity: 0.5,
                  transform: `translateX(${jitter2}px)`,
                  filter: 'blur(3px)',
                }}
              />
              <div
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: THEME.colors.particle,
                  opacity: 0.4,
                  transform: `translateX(${jitter3}px)`,
                  filter: 'blur(2px)',
                }}
              />

              {staticBars.map((bar) => (
                <div
                  key={bar.key}
                  style={{
                    position: 'absolute',
                    top: `${bar.yPercent}%`,
                    left: '10%',
                    width: `${bar.barWidth}%`,
                    height: bar.barHeight,
                    backgroundColor: bar.color,
                    opacity: bar.barOpacity,
                    transform: `translateX(${bar.xOffset}px)`,
                  }}
                />
              ))}
            </div>
          </AbsoluteFill>
        </GlitchEffect>
      )}

      {frame >= 30 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale})`,
              fontSize: 72,
              fontWeight: 700,
              fontFamily: THEME.fonts.heading,
              color: THEME.colors.text,
              textAlign: 'center',
            }}
          >
            Here&apos;s how.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
