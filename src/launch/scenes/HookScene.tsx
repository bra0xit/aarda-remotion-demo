import React from 'react';
import { useCurrentFrame } from 'remotion';
import { FullScreen, TypeWriter, darkAppTheme } from '../../aarda';

interface HookSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const HookScene: React.FC<HookSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  // Cursor blink for the prompt
  const cursorOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  // Glitch effect on the repeated answers
  const glitchOffset = Math.sin(frame * 0.5) * 2;

  // Show answers staggered
  const showAnswer1 = frame > 20;
  const showAnswer2 = frame > 30;
  const showAnswer3 = frame > 40;

  // Final flicker before cut
  const finalFlicker = frame > 75 ? (Math.random() > 0.5 ? 0.3 : 1) : 1;

  const fontSize = orientation === 'portrait' ? 28 : 24;
  const answerFontSize = orientation === 'portrait' ? 22 : 18;

  return (
    <FullScreen theme={theme} center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          opacity: finalFlicker,
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            fontFamily: theme.fonts.mono,
            fontSize,
            color: theme.colors.muted,
          }}
        >
          <span style={{ color: theme.colors.primary }}>&gt;</span>{' '}
          <TypeWriter text="What happens next?" delay={0} speed={2} showCursor={false} />
          <span style={{ opacity: cursorOpacity }}>|</span>
        </div>

        {/* Repeated boring answers */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            marginTop: 20,
          }}
        >
          {showAnswer1 && (
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: answerFontSize,
                color: theme.colors.foreground,
                opacity: 0.7,
                transform: `translateX(${glitchOffset}px)`,
              }}
            >
              "The hero wins."
            </div>
          )}
          {showAnswer2 && (
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: answerFontSize,
                color: theme.colors.foreground,
                opacity: 0.5,
                transform: `translateX(${-glitchOffset}px)`,
              }}
            >
              "The hero wins."
            </div>
          )}
          {showAnswer3 && (
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: answerFontSize,
                color: theme.colors.foreground,
                opacity: 0.3,
                transform: `translateX(${glitchOffset * 0.5}px)`,
              }}
            >
              "The hero wins."
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
