import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  BeatNode,
  darkAppTheme,
  withOpacity,
} from '../../aarda';

interface Feature4StoryBeatsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature4StoryBeatsScene: React.FC<Feature4StoryBeatsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Tension building animation
  const tension = interpolate(frame, [60, 120], [0.3, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Branch reveal
  const branchOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
              Narrative that adapts.
            </div>
          </SlideIn>
        </Sequence>

        {/* Story beats timeline */}
        <Sequence from={20}>
          <FadeIn delay={0} duration={20}>
            <div
              style={{
                display: 'flex',
                flexDirection: orientation === 'portrait' ? 'column' : 'row',
                alignItems: 'center',
                gap: 20,
                position: 'relative',
              }}
            >
              {/* Past beat */}
              <BeatNode
                name="The Call"
                position="1 of 5"
                status="completed"
                tension={0.2}
                theme={theme}
                size="sm"
              />

              {/* Connector */}
              <div
                style={{
                  width: orientation === 'portrait' ? 2 : 40,
                  height: orientation === 'portrait' ? 20 : 2,
                  backgroundColor: theme.colors.border,
                }}
              />

              {/* Active beat */}
              <BeatNode
                name="The Betrayal"
                position="2 of 5"
                status="active"
                tension={tension}
                theme={theme}
                size="md"
              />

              {/* Branch indicator */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  opacity: branchOpacity,
                  marginLeft: orientation === 'portrait' ? 0 : 20,
                }}
              >
                <div
                  style={{
                    padding: '6px 12px',
                    backgroundColor: withOpacity(theme.colors.primary, 0.2),
                    border: `1px solid ${theme.colors.primary}`,
                    borderRadius: 6,
                    fontSize: 11,
                    color: theme.colors.foreground,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  → Your path
                </div>
                <div
                  style={{
                    padding: '6px 12px',
                    backgroundColor: theme.colors.secondary,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: 6,
                    fontSize: 11,
                    color: theme.colors.muted,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  → Alternate
                </div>
              </div>
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
