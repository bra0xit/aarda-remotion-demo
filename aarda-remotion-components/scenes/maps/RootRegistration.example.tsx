/**
 * Example: How to register Interactive Maps compositions in Root.tsx
 *
 * Copy the relevant <Composition> elements into your Root.tsx file.
 */

import React from 'react';
import { Composition } from 'remotion';

// Import the map components
import { MapHero } from './scenes/maps/MapHero';
import {
  MapShort1_DiscoveryJourney,
  MapShort2_LivingWorld,
  MapShort3_StoryNavigation,
} from './scenes/maps/MapShorts';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ========== INTERACTIVE MAPS ========== */}

      {/* Hero Video - 60 seconds */}
      <Composition
        id="Maps-Hero"
        component={MapHero}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={1080}  // 9:16 vertical
        height={1920}
        defaultProps={{}}
      />

      {/* Landscape version */}
      <Composition
        id="Maps-Hero-Landscape"
        component={MapHero}
        durationInFrames={1800}
        fps={30}
        width={1920}  // 16:9 horizontal
        height={1080}
        defaultProps={{}}
      />

      {/* Short 1: Discovery Journey - 15 seconds */}
      <Composition
        id="Maps-Short-DiscoveryJourney"
        component={MapShort1_DiscoveryJourney}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Short 2: Living World - 15 seconds */}
      <Composition
        id="Maps-Short-LivingWorld"
        component={MapShort2_LivingWorld}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Short 3: Story Navigation - 15 seconds */}
      <Composition
        id="Maps-Short-StoryNavigation"
        component={MapShort3_StoryNavigation}
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
 *   npx remotion render Maps-Hero out/maps-hero.mp4
 *
 * Render hero video (landscape):
 *   npx remotion render Maps-Hero-Landscape out/maps-hero-landscape.mp4
 *
 * Render all shorts:
 *   npx remotion render Maps-Short-DiscoveryJourney out/maps-short-discovery.mp4
 *   npx remotion render Maps-Short-LivingWorld out/maps-short-living.mp4
 *   npx remotion render Maps-Short-StoryNavigation out/maps-short-navigation.mp4
 */
