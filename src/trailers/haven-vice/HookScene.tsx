import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { HAVEN_VICE_THEME } from '../../themes/haven-vice';

/**
 * Scene 1: The Hook (0-6 seconds = 180 frames)
 * Dark screen → Neon flicker → "Miami. 2025." → "The city never forgets."
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = HAVEN_VICE_THEME;

  // Flicker effect for first 30 frames
  const flickerIntensity = frame < 30
    ? Math.random() > 0.7 ? 1 : 0.3
    : 1;

  // Text 1: "Miami. 2025." (frames 30-90)
  const text1Opacity = interpolate(frame, [30, 45, 80, 95], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text 2: "The city never forgets." (frames 90-170)
  const text2Opacity = interpolate(frame, [90, 105, 160, 175], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scanline effect
  const scanlineY = (frame * 8) % 1920;

  // Glitch offset
  const glitchX = frame < 30 && Math.random() > 0.8
    ? (Math.random() - 0.5) * 20
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkBg }}>
      {/* Ambient neon glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonPink}20 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: flickerIntensity * 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonCyan}20 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: flickerIntensity * 0.4,
        }}
      />

      {/* Scanline */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: scanlineY,
          width: '100%',
          height: 2,
          backgroundColor: `${colors.neonCyan}30`,
          boxShadow: `0 0 20px ${colors.neonCyan}`,
        }}
      />

      {/* Text container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateX(${glitchX}px)`,
        }}
      >
        {/* "Miami. 2025." */}
        <div
          style={{
            opacity: text1Opacity,
            fontSize: 72,
            fontWeight: 700,
            fontFamily: HAVEN_VICE_THEME.fonts.heading,
            color: colors.textPrimary,
            letterSpacing: 12,
            textTransform: 'uppercase',
            textShadow: `
              0 0 20px ${colors.neonPink},
              0 0 40px ${colors.neonPink}80,
              0 0 80px ${colors.neonPink}40
            `,
            transform: `scale(${interpolate(text1Opacity, [0, 1], [0.9, 1])})`,
          }}
        >
          Miami. 2025.
        </div>

        {/* "The city never forgets." */}
        <div
          style={{
            opacity: text2Opacity,
            fontSize: 42,
            fontWeight: 400,
            fontFamily: HAVEN_VICE_THEME.fonts.body,
            color: colors.neonCyan,
            letterSpacing: 4,
            marginTop: 30,
            textShadow: `0 0 30px ${colors.neonCyan}`,
            transform: `translateY(${interpolate(text2Opacity, [0, 1], [20, 0])}px)`,
          }}
        >
          The city never forgets.
        </div>
      </div>

      {/* Noise overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
