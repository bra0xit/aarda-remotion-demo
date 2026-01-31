import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { HookScene } from './scenes/HookScene';
import { PainPointsScene } from './scenes/PainPointsScene';
import { SolutionRevealScene } from './scenes/SolutionRevealScene';
import { Feature1ConversationsScene } from './scenes/Feature1ConversationsScene';
import { Feature2MapsScene } from './scenes/Feature2MapsScene';
import { Feature3KnowledgeScene } from './scenes/Feature3KnowledgeScene';
import { Feature4StoryBeatsScene } from './scenes/Feature4StoryBeatsScene';
import { Feature5ObjectivesScene } from './scenes/Feature5ObjectivesScene';
import { CTAScene } from './scenes/CTAScene';

interface AardaLaunchVideoProps {
  orientation?: 'landscape' | 'portrait';
}

/**
 * AARDA Play Launch Video
 * 45 seconds at 30fps = 1350 frames
 *
 * Timeline:
 * [0-90]     Hook          (0-3s)
 * [90-300]   Pain Points   (3-10s)
 * [300-420]  Solution      (10-14s)
 * [420-600]  Feature 1     (14-20s)
 * [600-780]  Feature 2     (20-26s)
 * [780-930]  Feature 3     (26-31s)
 * [930-1080] Feature 4     (31-36s)
 * [1080-1230] Feature 5    (36-41s)
 * [1230-1350] CTA          (41-45s)
 */
export const AardaLaunchVideo: React.FC<AardaLaunchVideoProps> = ({
  orientation = 'portrait',
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Hook (0-3s, frames 0-90) */}
      <Sequence from={0} durationInFrames={90}>
        <HookScene orientation={orientation} />
      </Sequence>

      {/* Pain Points (3-10s, frames 90-300) */}
      <Sequence from={90} durationInFrames={210}>
        <PainPointsScene orientation={orientation} />
      </Sequence>

      {/* Solution Reveal (10-14s, frames 300-420) */}
      <Sequence from={300} durationInFrames={120}>
        <SolutionRevealScene orientation={orientation} />
      </Sequence>

      {/* Feature 1: AI Conversations (14-20s, frames 420-600) */}
      <Sequence from={420} durationInFrames={180}>
        <Feature1ConversationsScene orientation={orientation} />
      </Sequence>

      {/* Feature 2: Interactive Maps (20-26s, frames 600-780) */}
      <Sequence from={600} durationInFrames={180}>
        <Feature2MapsScene orientation={orientation} />
      </Sequence>

      {/* Feature 3: Knowledge System (26-31s, frames 780-930) */}
      <Sequence from={780} durationInFrames={150}>
        <Feature3KnowledgeScene orientation={orientation} />
      </Sequence>

      {/* Feature 4: Story Beats (31-36s, frames 930-1080) */}
      <Sequence from={930} durationInFrames={150}>
        <Feature4StoryBeatsScene orientation={orientation} />
      </Sequence>

      {/* Feature 5: Objectives (36-41s, frames 1080-1230) */}
      <Sequence from={1080} durationInFrames={150}>
        <Feature5ObjectivesScene orientation={orientation} />
      </Sequence>

      {/* CTA (41-45s, frames 1230-1350) */}
      <Sequence from={1230} durationInFrames={120}>
        <CTAScene orientation={orientation} />
      </Sequence>
    </AbsoluteFill>
  );
};
