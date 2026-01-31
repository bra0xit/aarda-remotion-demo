import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  ScaleIn,
  ObjectiveCard,
  darkAppTheme,
} from '../../aarda';

interface Feature5ObjectivesSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature5ObjectivesScene: React.FC<Feature5ObjectivesSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Checkbox animation
  const checkProgress = interpolate(frame, [75, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FullScreen theme={theme} center={false} padding={orientation === 'portrait' ? 40 : 60}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
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
              Goals that matter.
            </div>
          </SlideIn>
        </Sequence>

        {/* Objectives demo */}
        <Sequence from={20}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              maxWidth: orientation === 'portrait' ? '100%' : 400,
            }}
          >
            {/* Main objective */}
            <FadeIn delay={0} duration={15}>
              <ObjectiveCard
                title="Uncover the Traitor"
                description="Someone in the council is working against you..."
                status="active"
                type="main"
                theme={theme}
              />
            </FadeIn>

            {/* Sub-objectives */}
            <Sequence from={30}>
              <FadeIn delay={0} duration={15}>
                <div
                  style={{
                    marginLeft: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {/* Completed sub-objective */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: theme.fonts.body,
                      fontSize: 13,
                      color: theme.colors.muted,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        backgroundColor: checkProgress > 0.5 ? '#22c55e' : 'transparent',
                        border: `2px solid ${checkProgress > 0.5 ? '#22c55e' : theme.colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: '#fff',
                        transform: `scale(${1 + checkProgress * 0.2})`,
                      }}
                    >
                      {checkProgress > 0.5 && '✓'}
                    </div>
                    <span style={{ textDecoration: checkProgress > 0.5 ? 'line-through' : 'none' }}>
                      Gather evidence from the archives
                    </span>
                  </div>

                  {/* Pending sub-objective */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: theme.fonts.body,
                      fontSize: 13,
                      color: theme.colors.foreground,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: `2px solid ${theme.colors.border}`,
                      }}
                    />
                    <span>Confront the suspect</span>
                  </div>
                </div>
              </FadeIn>
            </Sequence>

            {/* New objective unlocking */}
            <Sequence from={90}>
              <ScaleIn fromScale={0.9} useSpring>
                <ObjectiveCard
                  title="A New Lead"
                  description="The merchant mentioned a secret meeting..."
                  status="pending"
                  type="side"
                  theme={theme}
                />
              </ScaleIn>
            </Sequence>
          </div>
        </Sequence>
      </div>
    </FullScreen>
  );
};
