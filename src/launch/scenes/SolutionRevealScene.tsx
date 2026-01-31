import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  GlowPulse,
  ParticleField,
  FadeIn,
  ScaleIn,
  TypeWriter,
  darkAppTheme,
} from '../../aarda';

interface SolutionRevealSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const SolutionRevealScene: React.FC<SolutionRevealSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const logoSize = orientation === 'portrait' ? 120 : 100;
  const taglineFontSize = orientation === 'portrait' ? 32 : 28;
  const questionFontSize = orientation === 'portrait' ? 24 : 20;

  // Glow expansion
  const glowSize = interpolate(frame, [30, 90], [100, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FullScreen theme={theme} center>
      {/* Expanding glow */}
      <GlowPulse
        color={theme.colors.primary}
        size={glowSize}
        position={{ x: '50%', y: '50%' }}
        minOpacity={0.2}
        maxOpacity={0.5}
        speed={30}
      />

      {/* Particles (subtle) */}
      <Sequence from={60}>
        <ParticleField
          count={15}
          theme={theme}
          minSize={2}
          maxSize={5}
        />
      </Sequence>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* "What if stories could think?" */}
        <Sequence from={30} durationInFrames={60}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: questionFontSize,
                color: theme.colors.muted,
                fontStyle: 'italic',
              }}
            >
              What if stories could think?
            </div>
          </FadeIn>
        </Sequence>

        {/* AARDA Logo */}
        <Sequence from={60}>
          <ScaleIn fromScale={0.8} useSpring>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: logoSize,
                fontWeight: 800,
                color: theme.colors.foreground,
                letterSpacing: 8,
              }}
            >
              AARDA
            </div>
          </ScaleIn>
        </Sequence>

        {/* Tagline */}
        <Sequence from={75}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: taglineFontSize,
                color: theme.colors.primary,
                fontWeight: 500,
              }}
            >
              <TypeWriter
                text="Infinite stories. One engine."
                delay={0}
                speed={2}
                showCursor={false}
              />
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
