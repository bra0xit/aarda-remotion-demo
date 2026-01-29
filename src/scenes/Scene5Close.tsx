import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { LogoReveal } from '../components/scenes/LogoReveal';
import { CallToAction } from '../components/scenes/CallToAction';

/**
 * Scene 5: End with Curiosity / Close (54-60 seconds in full video)
 * Logo reveal and call to action.
 *
 * Frame reference (within this scene, starting at 0):
 * - 5.1: Logo Reveal (0-90 frames = 0-3s)
 * - 5.2: Call to Action (90-180 frames = 3-6s)
 */
export const Scene5Close: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Frame 5.1: Logo Reveal (0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <LogoReveal />
      </Sequence>

      {/* Frame 5.2: Call to Action (90-180 frames) */}
      <Sequence from={90} durationInFrames={90}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
