import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  ScaleIn,
  KnowledgeBrickCard,
  darkAppTheme,
} from '../../aarda';

interface Feature3KnowledgeSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature3KnowledgeScene: React.FC<Feature3KnowledgeSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Connection lines drawing
  const lineProgress = interpolate(frame, [60, 120], [0, 1], {
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
              Lore that connects.
            </div>
          </SlideIn>
        </Sequence>

        {/* Knowledge graph demo */}
        <Sequence from={20}>
          <div
            style={{
              position: 'relative',
              width: orientation === 'portrait' ? 320 : 450,
              height: orientation === 'portrait' ? 280 : 220,
            }}
          >
            {/* Connection lines */}
            <svg
              style={{ position: 'absolute', inset: 0, zIndex: 0 }}
              viewBox="0 0 450 220"
            >
              {/* Main brick to character */}
              <line
                x1="140"
                y1="60"
                x2="300"
                y2="60"
                stroke={theme.colors.primary}
                strokeWidth={2}
                strokeDasharray={`${lineProgress * 160} 160`}
                opacity={0.6}
              />
              {/* Main brick to sub-brick */}
              <line
                x1="100"
                y1="80"
                x2="100"
                y2="160"
                stroke={theme.colors.accent}
                strokeWidth={2}
                strokeDasharray={`${lineProgress * 80} 80`}
                opacity={0.6}
              />
            </svg>

            {/* Main knowledge brick */}
            <Sequence from={0}>
              <ScaleIn fromScale={0.9} delay={0}>
                <div style={{ position: 'absolute', left: 0, top: 20, width: 180 }}>
                  <KnowledgeBrickCard
                    title="The Ancient Prophecy"
                    content="A prophecy foretold the coming of a hero who would..."
                    hasChildren={true}
                    theme={theme}
                  />
                </div>
              </ScaleIn>
            </Sequence>

            {/* Connected character brick */}
            <Sequence from={45}>
              <ScaleIn fromScale={0.9} delay={0}>
                <div style={{ position: 'absolute', right: 0, top: 20, width: 160 }}>
                  <KnowledgeBrickCard
                    title="The Chosen One"
                    theme={theme}
                  />
                </div>
              </ScaleIn>
            </Sequence>

            {/* Sub-brick */}
            <Sequence from={75}>
              <ScaleIn fromScale={0.9} delay={0}>
                <div style={{ position: 'absolute', left: 0, bottom: 0, width: 160 }}>
                  <KnowledgeBrickCard
                    title="Signs of Fulfillment"
                    theme={theme}
                  />
                </div>
              </ScaleIn>
            </Sequence>
          </div>
        </Sequence>
      </div>
    </FullScreen>
  );
};
