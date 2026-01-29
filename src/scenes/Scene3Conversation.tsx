import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ConversationView } from '../components/scenes/ConversationView';
import { StreamingResponseWithTriggers } from '../components/scenes/StreamingResponseWithTriggers';
import { ObjectiveUnlock } from '../components/scenes/ObjectiveUnlock';
import { Caption } from '../components/ui/Caption';

/**
 * Scene 3: The Conversation (32-44 seconds in full video)
 * Shows dynamic AI conversation with triggers and objectives.
 *
 * Frame reference (within this scene, starting at 0):
 * - 3.1: Conversation View (0-120 frames = 0-4s)
 * - 3.2: Streaming Response with Triggers (120-240 frames = 4-8s)
 * - 3.3: Objective Unlock (240-360 frames = 8-12s)
 */
export const Scene3Conversation: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Frame 3.1: Conversation View (0-120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <ConversationView />
        <Caption text="Characters that remember." enterFrame={40} exitFrame={110} />
      </Sequence>

      {/* Frame 3.2: Streaming Response with Triggers (120-240 frames) */}
      <Sequence from={120} durationInFrames={120}>
        <StreamingResponseWithTriggers />
        <Caption text="Triggers that react to you." enterFrame={60} exitFrame={110} />
      </Sequence>

      {/* Frame 3.3: Objective Unlock (240-360 frames) */}
      <Sequence from={240} durationInFrames={120}>
        <ObjectiveUnlock />
        <Caption text="Objectives that drive the story." enterFrame={50} exitFrame={110} />
      </Sequence>
    </AbsoluteFill>
  );
};
