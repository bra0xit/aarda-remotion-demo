import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  MapMarker,
  darkAppTheme,
  withOpacity,
} from '../../aarda';

interface Feature2MapsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature2MapsScene: React.FC<Feature2MapsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Path drawing animation
  const pathProgress = interpolate(frame, [30, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fog reveal
  const fogOpacity = interpolate(frame, [60, 120], [0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mapSize = orientation === 'portrait' ? 350 : 400;

  return (
    <FullScreen theme={theme} center={false} padding={orientation === 'portrait' ? 40 : 60}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {/* Title callout */}
        <Sequence from={0} durationInFrames={30}>
          <SlideIn direction={orientation === 'portrait' ? 'down' : 'left'} distance={40}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: titleFontSize,
                fontWeight: 700,
                color: theme.colors.foreground,
              }}
            >
              Worlds that respond.
            </div>
          </SlideIn>
        </Sequence>

        {/* Map demo */}
        <Sequence from={20}>
          <FadeIn delay={0} duration={20}>
            <div
              style={{
                position: 'relative',
                width: mapSize,
                height: mapSize * 0.8,
                backgroundColor: theme.colors.backgroundAlt,
                borderRadius: 16,
                border: `1px solid ${theme.colors.border}`,
                overflow: 'hidden',
              }}
            >
              {/* Stylized map background */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(circle at 30% 40%, ${withOpacity(theme.colors.primary, 0.1)} 0%, transparent 50%),
                    radial-gradient(circle at 70% 60%, ${withOpacity(theme.colors.accent, 0.1)} 0%, transparent 50%)
                  `,
                }}
              />

              {/* Path line */}
              <svg
                style={{ position: 'absolute', inset: 0 }}
                viewBox={`0 0 ${mapSize} ${mapSize * 0.8}`}
              >
                <path
                  d={`M ${mapSize * 0.2} ${mapSize * 0.6} Q ${mapSize * 0.4} ${mapSize * 0.3} ${mapSize * 0.7} ${mapSize * 0.35}`}
                  stroke={theme.colors.primary}
                  strokeWidth={3}
                  fill="none"
                  strokeDasharray={`${pathProgress * 300} 300`}
                  strokeLinecap="round"
                />
              </svg>

              {/* Starting marker */}
              <div style={{ position: 'absolute', left: '15%', top: '65%' }}>
                <MapMarker name="Village" selected={false} theme={theme} delay={0} />
              </div>

              {/* Destination marker (revealed) */}
              <Sequence from={60}>
                <div style={{ position: 'absolute', left: '62%', top: '30%' }}>
                  <MapMarker name="Ancient Temple" selected={true} hasCharacters={true} theme={theme} delay={0} />
                </div>
              </Sequence>

              {/* Fog of war overlay */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: '50%',
                  height: '100%',
                  background: `linear-gradient(to right, transparent, ${theme.colors.background})`,
                  opacity: fogOpacity,
                }}
              />
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
