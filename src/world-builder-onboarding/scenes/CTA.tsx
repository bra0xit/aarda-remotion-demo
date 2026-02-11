import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { ParticleField } from '../../aarda';
import { THEME } from '../theme';

interface CTAProps {
  ctaTagline: string;
  ctaBrand: string;
  ctaUrl: string;
}

export const CTA: React.FC<CTAProps> = ({ ctaTagline, ctaBrand, ctaUrl }) => {
  const frame = useCurrentFrame();

  const taglineOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineSlide = interpolate(frame, [0, 12], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const brandOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brandSlide = interpolate(frame, [8, 20], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlOpacity = interpolate(frame, [16, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlSlide = interpolate(frame, [16, 28], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg }}>
      <ParticleField count={6} colors={[THEME.colors.particle]} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineSlide}px)`,
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.heading,
              fontSize: 56,
              fontWeight: 700,
              color: THEME.colors.text,
            }}
          >
            {ctaTagline}
          </span>
        </div>

        <div style={{ height: 24 }} />

        <div
          style={{
            opacity: brandOpacity,
            transform: `translateY(${brandSlide}px)`,
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.heading,
              fontSize: 36,
              fontWeight: 700,
              color: THEME.colors.primary,
              textShadow: '0 0 20px rgba(108,92,231,0.4)',
            }}
          >
            {ctaBrand}
          </span>
        </div>

        <div style={{ height: 16 }} />

        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlSlide}px)`,
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.body,
              fontSize: 28,
              fontWeight: 500,
              color: THEME.colors.textMuted,
            }}
          >
            {ctaUrl}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
