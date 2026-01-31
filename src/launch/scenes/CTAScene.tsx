import React from 'react';
import { Sequence } from 'remotion';
import {
  FullScreen,
  GlowPulse,
  ParticleField,
  FadeIn,
  ScaleIn,
  AardaButton,
  darkAppTheme,
} from '../../aarda';

interface CTASceneProps {
  orientation: 'landscape' | 'portrait';
}

export const CTAScene: React.FC<CTASceneProps> = ({ orientation }) => {
  const theme = darkAppTheme;

  const logoSize = orientation === 'portrait' ? 72 : 64;
  const taglineFontSize = orientation === 'portrait' ? 28 : 24;
  const urlFontSize = orientation === 'portrait' ? 18 : 16;

  return (
    <FullScreen theme={theme} center>
      {/* Ambient glow */}
      <GlowPulse
        color={theme.colors.primary}
        size={500}
        position={{ x: '50%', y: '50%' }}
        minOpacity={0.1}
        maxOpacity={0.25}
        speed={45}
      />

      {/* Subtle particles */}
      <ParticleField
        count={12}
        theme={theme}
        minSize={2}
        maxSize={4}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: orientation === 'portrait' ? 32 : 24,
          zIndex: 10,
        }}
      >
        {/* AARDA Logo */}
        <Sequence from={0}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: logoSize,
                fontWeight: 800,
                color: theme.colors.foreground,
                letterSpacing: 6,
              }}
            >
              AARDA
            </div>
          </FadeIn>
        </Sequence>

        {/* Tagline */}
        <Sequence from={15}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: taglineFontSize,
                color: theme.colors.primary,
                fontWeight: 500,
              }}
            >
              Infinite stories. One engine.
            </div>
          </FadeIn>
        </Sequence>

        {/* CTA Button */}
        <Sequence from={45}>
          <ScaleIn fromScale={0.9} useSpring>
            <AardaButton variant="primary" size="lg" theme={theme}>
              Join the Waitlist
            </AardaButton>
          </ScaleIn>
        </Sequence>

        {/* URL */}
        <Sequence from={60}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: urlFontSize,
                color: theme.colors.muted,
              }}
            >
              aarda.ai
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
