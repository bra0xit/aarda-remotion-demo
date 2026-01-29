import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SpreadsheetChaos } from '../components/scenes/SpreadsheetChaos';
import { ChaosCuts } from '../components/scenes/ChaosCuts';
import { ScreenFracture } from '../components/scenes/ScreenFracture';
import { Caption } from '../components/ui/Caption';

export const Scene1Pain: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
      {/* Frame 1.1: Spreadsheet (0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <SpreadsheetChaos />
        <Caption text="Your world. Scattered." enterFrame={20} exitFrame={85} />
      </Sequence>

      {/* Frame 1.2: Chaos Cuts (90-180 frames) */}
      <Sequence from={90} durationInFrames={90}>
        <ChaosCuts />
        <Caption text="Stories trapped in your head." enterFrame={10} exitFrame={85} />
      </Sequence>

      {/* Frame 1.3: Fracture to Black (180-240 frames) */}
      <Sequence from={180} durationInFrames={60}>
        <ScreenFracture />
        <Caption text="Until now." enterFrame={5} exitFrame={40} />
      </Sequence>
    </AbsoluteFill>
  );
};
