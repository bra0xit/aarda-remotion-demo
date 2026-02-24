import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { HAVEN_VICE_THEME } from '../../themes/haven-vice';
import { HookScene } from './HookScene';
import { CharacterMontage } from './CharacterMontage';
import { StoryHookScene } from './StoryHookScene';
import { StoryBeatsFlash } from './StoryBeatsFlash';
import { CloseScene } from './CloseScene';

/**
 * Haven Vice Trailer - Hybrid Teaser
 *
 * Duration: 44 seconds (1320 frames at 30fps)
 * Aspect: 9:16 (1080x1920) vertical/mobile-first
 *
 * Scene breakdown:
 * - Scene 1: The Hook (0-6s, frames 0-180)
 * - Scene 2: Story Beats Flash (6-12s, frames 180-360) - 10 items rapid montage
 * - Scene 3: Character Flash Montage (12-22s, frames 360-660) - 5 chars × 2s each
 * - Scene 4: The Story Hook (22-32s, frames 660-960)
 * - Scene 5: The Close (32-44s, frames 960-1320)
 */
export const HavenViceTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: HAVEN_VICE_THEME.colors.darkBg }}>
      {/* Scene 1: The Hook (0-180 frames = 0-6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <HookScene />
      </Sequence>

      {/* Scene 2: Story Beats Flash (180-360 frames = 6-12 seconds) - 10 items */}
      <Sequence from={180} durationInFrames={180}>
        <StoryBeatsFlash />
      </Sequence>

      {/* Scene 3: Character Flash Montage (360-660 frames = 12-22 seconds) */}
      <Sequence from={360} durationInFrames={300}>
        <CharacterMontage />
      </Sequence>

      {/* Scene 4: The Story Hook (660-960 frames = 22-32 seconds) */}
      <Sequence from={660} durationInFrames={300}>
        <StoryHookScene />
      </Sequence>

      {/* Scene 5: The Close (960-1320 frames = 32-44 seconds) */}
      <Sequence from={960} durationInFrames={360}>
        <CloseScene />
      </Sequence>
    </AbsoluteFill>
  );
};
