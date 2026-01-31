import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  ChatBubble,
  EmotionBar,
  darkAppTheme,
} from '../../aarda';

interface Feature1ConversationsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature1ConversationsScene: React.FC<Feature1ConversationsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Emotion bar animation
  const emotionValue = interpolate(frame, [90, 150], [-0.2, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typing progress for character message
  const typingProgress = interpolate(frame, [45, 90], [0, 1], {
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
              Characters that feel.
            </div>
          </SlideIn>
        </Sequence>

        {/* Chat demo */}
        <Sequence from={30}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: orientation === 'portrait' ? '100%' : 500,
            }}
          >
            {/* Character message with typing */}
            <FadeIn delay={0} duration={15}>
              <ChatBubble
                message="I remember what you said last time... about wanting to find your father."
                isPlayer={false}
                name="Elara"
                typing={true}
                typingProgress={typingProgress}
                theme={theme}
              />
            </FadeIn>

            {/* Emotion bar */}
            <Sequence from={60}>
              <FadeIn delay={0} duration={15}>
                <div style={{ maxWidth: 300 }}>
                  <EmotionBar
                    labelLeft="Distant"
                    labelRight="Trusting"
                    value={emotionValue}
                    colorLeft="#3b82f6"
                    colorRight="#22c55e"
                    theme={theme}
                  />
                </div>
              </FadeIn>
            </Sequence>

            {/* Player response options */}
            <Sequence from={120}>
              <FadeIn delay={0} duration={15}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <div
                    style={{
                      padding: '8px 16px',
                      backgroundColor: theme.colors.secondary,
                      border: `1px solid ${theme.colors.primary}`,
                      borderRadius: 8,
                      fontSize: 13,
                      color: theme.colors.foreground,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    "Thank you for remembering."
                  </div>
                  <div
                    style={{
                      padding: '8px 16px',
                      backgroundColor: theme.colors.secondary,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: 8,
                      fontSize: 13,
                      color: theme.colors.muted,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    "That's none of your business."
                  </div>
                </div>
              </FadeIn>
            </Sequence>
          </div>
        </Sequence>
      </div>
    </FullScreen>
  );
};
