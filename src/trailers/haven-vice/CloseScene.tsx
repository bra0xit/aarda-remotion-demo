import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';
import { HAVEN_VICE_THEME, HAVEN_VICE_PROJECT } from '../../themes/haven-vice';

/**
 * Scene 4: The Close (38-50 seconds = 360 frames)
 * World title reveal with neon glow → Tagline → AARDA logo + CTA
 */
export const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors } = HAVEN_VICE_THEME;

  // Title reveal with spring
  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 15 },
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.5, 1]);
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Tagline fade in
  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [60, 90], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // AARDA logo + CTA
  const ctaOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = interpolate(frame, [150, 180], [0.9, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Neon pulse
  const neonPulse = 1 + Math.sin(frame * 0.08) * 0.15;

  // Glitch effect on title entrance
  const glitchX = frame < 25 && Math.random() > 0.6
    ? (Math.random() - 0.5) * 30
    : 0;
  const glitchY = frame < 25 && Math.random() > 0.8
    ? (Math.random() - 0.5) * 10
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkBg }}>
      {/* Background neon glows */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 400,
          background: `radial-gradient(ellipse, ${colors.neonPink}30 0%, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: neonPulse * 0.7,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.neonCyan}20 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: neonPulse * 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '20%',
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${colors.neonOrange}20 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: neonPulse * 0.4,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* HAVEN VICE title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale}) translate(${glitchX}px, ${glitchY}px)`,
          }}
        >
          {/* Glitch layers */}
          {frame < 25 && (
            <>
              <div
                style={{
                  position: 'absolute',
                  fontSize: 120,
                  fontWeight: 700,
                  fontFamily: HAVEN_VICE_THEME.fonts.heading,
                  color: colors.neonCyan,
                  letterSpacing: 16,
                  textTransform: 'uppercase',
                  opacity: 0.5,
                  transform: 'translateX(-4px)',
                }}
              >
                HAVEN VICE
              </div>
              <div
                style={{
                  position: 'absolute',
                  fontSize: 120,
                  fontWeight: 700,
                  fontFamily: HAVEN_VICE_THEME.fonts.heading,
                  color: colors.neonPink,
                  letterSpacing: 16,
                  textTransform: 'uppercase',
                  opacity: 0.5,
                  transform: 'translateX(4px)',
                }}
              >
                HAVEN VICE
              </div>
            </>
          )}
          {/* Main title */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              fontFamily: HAVEN_VICE_THEME.fonts.heading,
              color: colors.textPrimary,
              letterSpacing: 16,
              textTransform: 'uppercase',
              textShadow: `
                0 0 40px ${colors.neonPink},
                0 0 80px ${colors.neonPink}80,
                0 0 120px ${colors.neonPink}40
              `,
            }}
          >
            HAVEN VICE
          </div>
        </div>

        {/* Neon underline */}
        <div
          style={{
            width: interpolate(frame, [30, 60], [0, 500], { extrapolateRight: 'clamp' }),
            height: 4,
            backgroundColor: colors.neonPink,
            boxShadow: `0 0 30px ${colors.neonPink}`,
            marginTop: 20,
            opacity: titleOpacity,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            fontSize: 32,
            fontWeight: 400,
            fontFamily: HAVEN_VICE_THEME.fonts.body,
            color: colors.neonCyan,
            letterSpacing: 6,
            marginTop: 40,
            textShadow: `0 0 20px ${colors.neonCyan}80`,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          {HAVEN_VICE_PROJECT.tagline}
        </div>

        {/* CTA section */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            marginTop: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* AARDA logo/text */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              fontFamily: HAVEN_VICE_THEME.fonts.heading,
              color: colors.textSecondary,
              letterSpacing: 12,
              marginBottom: 30,
            }}
          >
            AARDA
          </div>

          {/* Play Now button */}
          <div
            style={{
              padding: '20px 60px',
              backgroundColor: colors.neonPink,
              borderRadius: 8,
              fontSize: 24,
              fontWeight: 700,
              fontFamily: HAVEN_VICE_THEME.fonts.body,
              color: colors.textPrimary,
              letterSpacing: 4,
              textTransform: 'uppercase',
              boxShadow: `
                0 0 40px ${colors.neonPink}80,
                0 10px 40px rgba(0,0,0,0.3)
              `,
              transform: `scale(${1 + Math.sin(frame * 0.1) * 0.02})`,
            }}
          >
            Play Now
          </div>
        </div>
      </div>

      {/* Scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.1) 2px,
            rgba(0,0,0,0.1) 4px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Final flash at the very end */}
      {frame > 340 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: colors.textPrimary,
            opacity: interpolate(frame, [340, 360], [0, 0.3], { extrapolateRight: 'clamp' }),
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
