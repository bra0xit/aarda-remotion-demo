import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { KnowledgeBrickIntro } from '../components/scenes/KnowledgeBrickIntro';
import { Caption } from '../components/ui/Caption';

export const Scene2Shift: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* Frame 2.1: Single Knowledge Brick (frames 0-120, which is 8-12s in video) */}
      <Sequence from={0} durationInFrames={120}>
        <KnowledgeBrickIntro />
        <Caption text="Build worlds. Piece by piece." enterFrame={30} exitFrame={110} />
      </Sequence>

      {/* Frame 2.2: Graph Unfolds - TODO */}
      {/* Frame 2.3: Characters Emerge - TODO */}
      {/* Frame 2.4: Map Comes Alive - TODO */}
      {/* Frame 2.5: Enter the Scene - TODO */}
      {/* Frame 2.6: Story Beat - TODO */}
    </AbsoluteFill>
  );
};
