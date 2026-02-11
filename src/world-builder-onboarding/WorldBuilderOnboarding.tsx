import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { WorldBuilderProps } from './schema';
import { THEME } from './theme';
import { ResultMontage } from './scenes/ResultMontage';
import { RewindTransition } from './scenes/RewindTransition';
import { ThePrompt } from './scenes/ThePrompt';
import { BrainstormSteps } from './scenes/BrainstormSteps';
import { ImportMoment } from './scenes/ImportMoment';
import { WorldAlive } from './scenes/WorldAlive';
import { CTA } from './scenes/CTA';

export const WorldBuilderOnboarding: React.FC<WorldBuilderProps> = (props) => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg }}>
      {/* Scene 1: The Result — 0-150 frames (5 seconds) */}
      <Sequence from={0} durationInFrames={150}>
        <ResultMontage
          screenshots={props.screenshots}
          hookText={props.hookText}
        />
      </Sequence>

      {/* Scene 2: The Rewind — 150-210 frames (2 seconds) */}
      <Sequence from={150} durationInFrames={60}>
        <RewindTransition />
      </Sequence>

      {/* Scene 3: The Prompt — 210-360 frames (5 seconds) */}
      <Sequence from={210} durationInFrames={150}>
        <ThePrompt userPrompt={props.userPrompt} />
      </Sequence>

      {/* Scenes 4-6: Brainstorm Steps — 360-1260 frames (30 seconds) */}
      <Sequence from={360} durationInFrames={900}>
        <BrainstormSteps steps={props.steps} />
      </Sequence>

      {/* Scene 7: The Import — 1260-1380 frames (4 seconds) */}
      <Sequence from={1260} durationInFrames={120}>
        <ImportMoment
          importStats={props.importStats}
          importConclusion={props.importConclusion}
        />
      </Sequence>

      {/* Scene 8: The World Alive — 1380-1530 frames (5 seconds) */}
      <Sequence from={1380} durationInFrames={150}>
        <WorldAlive screenshots={props.screenshots} />
      </Sequence>

      {/* Scene 9: CTA — 1530-1620 frames (3 seconds) */}
      <Sequence from={1530} durationInFrames={90}>
        <CTA
          ctaTagline={props.ctaTagline}
          ctaBrand={props.ctaBrand}
          ctaUrl={props.ctaUrl}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
