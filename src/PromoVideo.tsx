import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1Pain } from './scenes/Scene1Pain';
import { Scene2Shift } from './scenes/Scene2Shift';
import { Scene3Conversation } from './scenes/Scene3Conversation';
import { Scene4SocialProof } from './scenes/Scene4SocialProof';
import { Scene5Close } from './scenes/Scene5Close';

/**
 * AARDA AI Promotional Video
 *
 * Duration: 60 seconds (1800 frames at 30fps)
 * Aspect: 9:16 (1080x1920) vertical/mobile-first
 *
 * Scene breakdown:
 * - Scene 1: The Pain (0-8s, frames 0-240)
 * - Scene 2: The Shift (8-32s, frames 240-960)
 * - Scene 3: The Conversation (32-44s, frames 960-1320)
 * - Scene 4: Prove It's Real (44-54s, frames 1320-1620)
 * - Scene 5: End with Curiosity (54-60s, frames 1620-1800)
 */
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* Scene 1: The Pain (0-240 frames = 0-8 seconds) */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Pain />
      </Sequence>

      {/* Scene 2: The Shift (240-960 frames = 8-32 seconds) */}
      <Sequence from={240} durationInFrames={720}>
        <Scene2Shift />
      </Sequence>

      {/* Scene 3: The Conversation (960-1320 frames = 32-44 seconds) */}
      <Sequence from={960} durationInFrames={360}>
        <Scene3Conversation />
      </Sequence>

      {/* Scene 4: Prove It's Real (1320-1620 frames = 44-54 seconds) */}
      <Sequence from={1320} durationInFrames={300}>
        <Scene4SocialProof />
      </Sequence>

      {/* Scene 5: End with Curiosity (1620-1800 frames = 54-60 seconds) */}
      <Sequence from={1620} durationInFrames={180}>
        <Scene5Close />
      </Sequence>
    </AbsoluteFill>
  );
};
