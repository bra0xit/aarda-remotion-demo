import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { THEME } from '../theme';

interface ChatMessageProps {
  text: string;
  sender: 'ai' | 'user';
  typing?: boolean;
  typewriter?: boolean;
  typewriterSpeed?: number;
  delay?: number;
  style?: React.CSSProperties;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  sender,
  typing = false,
  typewriter = false,
  typewriterSpeed = 2,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isAi = sender === 'ai';
  const adjustedFrame = frame - delay;

  if (adjustedFrame < 0) {
    return null;
  }

  const entrySpring = spring({
    frame: adjustedFrame,
    fps,
    config: { stiffness: 180, damping: 18 },
  });

  const slideDistance = 40;
  const translateX = interpolate(
    entrySpring,
    [0, 1],
    [isAi ? -slideDistance : slideDistance, 0],
  );

  const opacity = interpolate(entrySpring, [0, 1], [0, 1]);

  const getDisplayText = (): string => {
    if (!typewriter) return text;
    const charsToShow = Math.floor(adjustedFrame / typewriterSpeed);
    return text.slice(0, Math.min(charsToShow, text.length));
  };

  const renderTypingIndicator = () => {
    const dots = [0, 1, 2];
    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', height: 32 }}>
        {dots.map((dotIndex) => {
          const dotOpacity = interpolate(
            Math.sin((adjustedFrame * 0.15) + (dotIndex * 2.1)),
            [-1, 1],
            [0.3, 1],
          );
          const dotScale = interpolate(
            Math.sin((adjustedFrame * 0.15) + (dotIndex * 2.1)),
            [-1, 1],
            [0.7, 1],
          );
          return (
            <div
              key={dotIndex}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: THEME.colors.textMuted,
                opacity: dotOpacity,
                transform: `scale(${dotScale})`,
              }}
            />
          );
        })}
      </div>
    );
  };

  const displayText = getDisplayText();
  const isTypewriterComplete = !typewriter || displayText.length >= text.length;
  const cursorVisible = typewriter && !isTypewriterComplete && Math.floor(frame / 15) % 2 === 0;

  const bubbleStyle: React.CSSProperties = {
    padding: '20px 28px',
    maxWidth: '90%',
    borderRadius: isAi ? '6px 20px 20px 20px' : '20px 6px 20px 20px',
    backgroundColor: isAi ? 'rgba(255, 255, 255, 0.05)' : THEME.colors.card,
    fontFamily: THEME.fonts.body,
    fontSize: 22,
    lineHeight: 1.5,
    color: THEME.colors.text,
    transform: `translateX(${translateX}px)`,
    opacity,
    ...style,
  };

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: isAi ? 'flex-start' : 'flex-end',
    width: '100%',
  };

  return (
    <div style={wrapperStyle}>
      <div style={bubbleStyle}>
        {typing ? (
          renderTypingIndicator()
        ) : (
          <span>
            {displayText}
            {cursorVisible && (
              <span style={{ color: THEME.colors.primary, fontWeight: 'bold', marginLeft: 1 }}>
                |
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};
