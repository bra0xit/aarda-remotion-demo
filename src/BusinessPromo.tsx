import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { DocumentGraveyard } from './components/business/DocumentGraveyard';
import { ScrollOfDeath } from './components/business/ScrollOfDeath';
import { TheSpark } from './components/business/TheSpark';
import { TheTransformation } from './components/business/TheTransformation';
import { UseCaseVignettes } from './components/business/UseCaseVignettes';
import { BusinessClose } from './components/business/BusinessClose';
import { Caption } from './components/ui/Caption';

/**
 * AARDA for Business Promotional Video
 *
 * Duration: 45 seconds (1350 frames at 30fps)
 * Formats: 9:16 (1080x1920) vertical, 16:9 (1920x1080) landscape
 *
 * Scene breakdown:
 * - Scene 1: The Pain (0-13s, frames 0-390)
 *   - 1.1: Document Graveyard (0-210)
 *   - 1.2: Scroll of Death (210-390)
 * - Scene 2: The Shift (13-24s, frames 390-720)
 *   - 2.1: The Spark (390-480)
 *   - 2.2: The Transformation (480-720) - includes:
 *     - Phase 1: Content → Story concept
 *     - Phase 2: Dynamic AI choices concept
 *     - Phase 3: Interactive demo with map
 * - Scene 3: Use Cases (24-34s, frames 720-1020)
 *   - 3.1: Compliance (720-810)
 *   - 3.2: Company Story (810-900)
 *   - 3.3: Product Launch (900-1020)
 * - Scene 4: Close (34-45s, frames 1020-1350)
 *   - 4.1: Tagline (1020-1140)
 *   - 4.2: Logo & CTA (1140-1350)
 */
export const BusinessPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#F5E6D3' }}>
      {/* ========== SCENE 1: THE PAIN (0-390 frames) ========== */}

      {/* 1.1: Document Graveyard (0-210) */}
      <Sequence from={0} durationInFrames={210}>
        <DocumentGraveyard />
        <Caption
          text="Important content. Ignored by everyone."
          enterFrame={140}
          exitFrame={200}
        />
      </Sequence>

      {/* 1.2: Scroll of Death (210-390) */}
      <Sequence from={210} durationInFrames={180}>
        <ScrollOfDeath />
        <Caption
          text="Too long. Too boring. Too forgettable."
          enterFrame={120}
          exitFrame={170}
        />
      </Sequence>

      {/* ========== SCENE 2: THE SHIFT (390-720 frames) ========== */}

      {/* 2.1: The Spark (390-480) */}
      <Sequence from={390} durationInFrames={90}>
        <TheSpark />
        <Caption
          text="What if your content came alive?"
          enterFrame={50}
          exitFrame={85}
        />
      </Sequence>

      {/* 2.2: The Transformation (480-720) - Extended for intro phases */}
      <Sequence from={480} durationInFrames={240}>
        <TheTransformation />
      </Sequence>

      {/* ========== SCENE 3: USE CASES (720-1020 frames) ========== */}
      <Sequence from={720} durationInFrames={300}>
        <UseCaseVignettes />
        {/* Captions handled within component for timing */}
      </Sequence>

      {/* Individual use case captions */}
      <Sequence from={720} durationInFrames={90}>
        <Caption text="Compliance that sticks." enterFrame={60} exitFrame={85} />
      </Sequence>
      <Sequence from={810} durationInFrames={90}>
        <Caption text="Your story, experienced." enterFrame={60} exitFrame={85} />
      </Sequence>
      <Sequence from={900} durationInFrames={120}>
        <Caption text="Launches that actually land." enterFrame={80} exitFrame={115} />
      </Sequence>

      {/* ========== SCENE 4: CLOSE (1020-1350 frames) ========== */}
      <Sequence from={1020} durationInFrames={330}>
        <BusinessClose />
      </Sequence>
    </AbsoluteFill>
  );
};
