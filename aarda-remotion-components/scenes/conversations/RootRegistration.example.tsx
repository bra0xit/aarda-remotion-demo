/**
 * Example: How to register Character Conversation compositions in Root.tsx
 *
 * Copy the relevant <Composition> elements into your Root.tsx file.
 */

import React from 'react';
import { Composition } from 'remotion';

// Import the conversation components
import { ConversationHero } from './scenes/conversations/ConversationHero';
import {
  ConversationShort1_FriendlyAlly,
  ConversationShort2_MysteriousStranger,
  ConversationShort3_GrumpyMerchant,
} from './scenes/conversations/ConversationShorts';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ========== CHARACTER CONVERSATIONS ========== */}

      {/* Hero Video - 60 seconds */}
      <Composition
        id="Conversations-Hero"
        component={ConversationHero}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={1080}  // 9:16 vertical
        height={1920}
        defaultProps={{}}
      />

      {/* Landscape version */}
      <Composition
        id="Conversations-Hero-Landscape"
        component={ConversationHero}
        durationInFrames={1800}
        fps={30}
        width={1920}  // 16:9 horizontal
        height={1080}
        defaultProps={{}}
      />

      {/* Short 1: Friendly Ally - 15 seconds */}
      <Composition
        id="Conversations-Short-FriendlyAlly"
        component={ConversationShort1_FriendlyAlly}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Short 2: Mysterious Stranger - 15 seconds */}
      <Composition
        id="Conversations-Short-MysteriousStranger"
        component={ConversationShort2_MysteriousStranger}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Short 3: Grumpy Merchant - 15 seconds */}
      <Composition
        id="Conversations-Short-GrumpyMerchant"
        component={ConversationShort3_GrumpyMerchant}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* ========== YOUR OTHER COMPOSITIONS ========== */}
      {/* ... */}
    </>
  );
};

/**
 * Rendering Commands:
 *
 * Preview:
 *   npx remotion preview
 *
 * Render hero video (vertical):
 *   npx remotion render Conversations-Hero out/conversations-hero.mp4
 *
 * Render hero video (landscape):
 *   npx remotion render Conversations-Hero-Landscape out/conversations-hero-landscape.mp4
 *
 * Render all shorts:
 *   npx remotion render Conversations-Short-FriendlyAlly out/conv-short-friendly.mp4
 *   npx remotion render Conversations-Short-MysteriousStranger out/conv-short-mysterious.mp4
 *   npx remotion render Conversations-Short-GrumpyMerchant out/conv-short-grumpy.mp4
 */
