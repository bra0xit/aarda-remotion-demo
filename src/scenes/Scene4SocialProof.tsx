import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { QuoteCarousel } from '../components/scenes/QuoteCarousel';
import { DashboardStats } from '../components/scenes/DashboardStats';
import { Caption } from '../components/ui/Caption';

/**
 * Scene 4: Social Proof / Prove It's Real (44-54 seconds in full video)
 * Shows testimonials and platform statistics.
 *
 * Frame reference (within this scene, starting at 0):
 * - 4.1: Quote Carousel (0-150 frames = 0-5s)
 * - 4.2: Dashboard Stats (150-300 frames = 5-10s)
 */
export const Scene4SocialProof: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Frame 4.1: Quote Carousel (0-150 frames) */}
      <Sequence from={0} durationInFrames={150}>
        <QuoteCarousel />
        <Caption text="Join thousands of creators." enterFrame={100} exitFrame={140} />
      </Sequence>

      {/* Frame 4.2: Dashboard Stats (150-300 frames) */}
      <Sequence from={150} durationInFrames={150}>
        <DashboardStats />
        <Caption text="The platform that delivers." enterFrame={80} exitFrame={140} />
      </Sequence>
    </AbsoluteFill>
  );
};
