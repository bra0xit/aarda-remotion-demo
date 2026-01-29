import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { KnowledgeBrickIntro } from '../components/scenes/KnowledgeBrickIntro';
import { KnowledgeGraphUnfold } from '../components/scenes/KnowledgeGraphUnfold';
import { CharacterCardTransition } from '../components/scenes/CharacterCardTransition';
import { MapReveal } from '../components/scenes/MapReveal';
import { SceneView } from '../components/scenes/SceneView';
import { StoryBeat } from '../components/scenes/StoryBeat';
import { Caption } from '../components/ui/Caption';

/**
 * Scene 2: The Shift (8-32 seconds in full video)
 * Shows transformation from chaos to order.
 *
 * Frame reference (within this scene, starting at 0):
 * - 2.1: Knowledge Brick Intro (0-120 frames = 0-4s)
 * - 2.2: Graph Unfolds (120-240 frames = 4-8s)
 * - 2.3: Characters Emerge (240-360 frames = 8-12s)
 * - 2.4: Map Comes Alive (360-480 frames = 12-16s)
 * - 2.5: Enter the Scene (480-600 frames = 16-20s)
 * - 2.6: Story Beat (600-720 frames = 20-24s)
 */
export const Scene2Shift: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* Frame 2.1: Single Knowledge Brick (0-120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <KnowledgeBrickIntro />
        <Caption text="Build worlds. Piece by piece." enterFrame={30} exitFrame={110} />
      </Sequence>

      {/* Frame 2.2: Graph Unfolds (120-240 frames) */}
      <Sequence from={120} durationInFrames={120}>
        <KnowledgeGraphUnfold />
        <Caption text="Connected. Organized. Alive." enterFrame={20} exitFrame={110} />
      </Sequence>

      {/* Frame 2.3: Characters Emerge (240-360 frames) */}
      <Sequence from={240} durationInFrames={120}>
        <CharacterCardTransition />
        <Caption text="Characters that feel." enterFrame={40} exitFrame={110} />
      </Sequence>

      {/* Frame 2.4: Map Comes Alive (360-480 frames) */}
      <Sequence from={360} durationInFrames={120}>
        <MapReveal />
        <Caption text="Worlds you can explore." enterFrame={30} exitFrame={110} />
      </Sequence>

      {/* Frame 2.5: Enter the Scene (480-600 frames) */}
      <Sequence from={480} durationInFrames={120}>
        <SceneView />
        <Caption text="Step inside." enterFrame={50} exitFrame={110} />
      </Sequence>

      {/* Frame 2.6: Story Beat (600-720 frames) */}
      <Sequence from={600} durationInFrames={120}>
        <StoryBeat />
        <Caption text="Stories that respond to you." enterFrame={30} exitFrame={110} />
      </Sequence>
    </AbsoluteFill>
  );
};
