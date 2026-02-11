import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { ParticleField } from '../../aarda';
import { THEME } from '../theme';
import { ChatMessage } from '../components/ChatMessage';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

interface ThePromptProps {
  userPrompt: string;
}

export const ThePrompt: React.FC<ThePromptProps> = ({ userPrompt }) => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(frame, [0, 15], [0, 1], CLAMP);
  const containerSlideUp = interpolate(frame, [0, 15], [20, 0], CLAMP);

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bgAlt }}>
      <ParticleField count={10} colors={[THEME.colors.particle]} />

      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          opacity: containerOpacity,
          transform: `translateY(${containerSlideUp}px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            maxWidth: 800,
            width: '100%',
          }}
        >
          <ChatMessage
            sender="user"
            text={userPrompt}
            typewriter
            typewriterSpeed={1}
            delay={15}
          />

          {frame >= 120 && (
            <ChatMessage
              sender="ai"
              text=""
              typing
              delay={120}
            />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
