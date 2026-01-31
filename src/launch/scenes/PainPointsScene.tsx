import React from 'react';
import { useCurrentFrame, interpolate, Sequence, AbsoluteFill } from 'remotion';
import {
  FullScreen,
  FadeIn,
  SlideIn,
  darkAppTheme,
} from '../../aarda';

interface PainPointsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const PainPointsScene: React.FC<PainPointsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const fontSize = orientation === 'portrait' ? 48 : 42;
  const subFontSize = orientation === 'portrait' ? 24 : 20;

  return (
    <FullScreen theme={theme} center>
      {/* Pain Point 1: Static Stories (frames 0-90, which is 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {/* SCRIPTED */}
          <Sequence from={0} durationInFrames={30}>
            <SlideIn direction="left" distance={50}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize,
                  fontWeight: 800,
                  color: theme.colors.foreground,
                  textTransform: 'uppercase',
                  letterSpacing: 4,
                }}
              >
                SCRIPTED.
              </div>
            </SlideIn>
          </Sequence>

          {/* PREDICTABLE */}
          <Sequence from={25} durationInFrames={30}>
            <SlideIn direction="right" distance={50}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize,
                  fontWeight: 800,
                  color: theme.colors.primary,
                  textTransform: 'uppercase',
                  letterSpacing: 4,
                }}
              >
                PREDICTABLE.
              </div>
            </SlideIn>
          </Sequence>

          {/* The same. Every. Time. */}
          <Sequence from={55} durationInFrames={35}>
            <FadeIn delay={0} duration={10}>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: subFontSize,
                  color: theme.colors.muted,
                  marginTop: 20,
                }}
              >
                The same. Every. Time.
              </div>
            </FadeIn>
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      {/* Pain Point 2: Cumbersome Worldbuilding (frames 90-150, which is 2s) */}
      <Sequence from={90} durationInFrames={60}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {/* Chaotic documents visualization */}
          <div style={{ position: 'relative', width: 300, height: 200 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const localFrame = frame - 90;
              const delay = i * 5;
              const opacity = interpolate(localFrame, [delay, delay + 10], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const rotation = (i - 2) * 8 + Math.sin(localFrame * 0.1 + i) * 3;
              const scale = 0.9 + Math.sin(localFrame * 0.05 + i) * 0.05;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 120,
                    height: 80,
                    backgroundColor: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: 4,
                    left: 90 + i * 15 - 50,
                    top: 60 + (i % 2) * 20,
                    transform: `rotate(${rotation}deg) scale(${scale})`,
                    opacity,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: theme.colors.muted,
                    fontFamily: theme.fonts.mono,
                  }}
                >
                  {['wiki.doc', 'chars.xlsx', 'lore.txt', 'map.png', 'notes.md'][i]}
                </div>
              );
            })}
          </div>

          <Sequence from={20}>
            <SlideIn direction="up" distance={30}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: fontSize * 0.7,
                  fontWeight: 700,
                  color: theme.colors.foreground,
                }}
              >
                Months of prep.
              </div>
            </SlideIn>
          </Sequence>

          <Sequence from={35}>
            <FadeIn>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: subFontSize,
                  color: theme.colors.muted,
                }}
              >
                Just to start.
              </div>
            </FadeIn>
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      {/* Pain Point 3: Gatekept by Code (frames 150-210, which is 2s) */}
      <Sequence from={150} durationInFrames={60}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {/* Code flood effect */}
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: theme.colors.primary,
              opacity: 0.4,
              lineHeight: 1.4,
              textAlign: 'center',
              maxWidth: orientation === 'portrait' ? 400 : 600,
            }}
          >
            {`function story() { if (choice === 'A') { return scripted_a; } else if (choice === 'B') { return scripted_b; } }`}
          </div>

          <Sequence from={15}>
            <SlideIn direction="up" distance={30}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: fontSize * 0.7,
                  fontWeight: 700,
                  color: theme.colors.foreground,
                }}
              >
                Or learn to code.
              </div>
            </SlideIn>
          </Sequence>
        </AbsoluteFill>
      </Sequence>
    </FullScreen>
  );
};
