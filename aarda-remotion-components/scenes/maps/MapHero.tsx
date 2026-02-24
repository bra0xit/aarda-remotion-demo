/**
 * MapHero - 60 second hero video for Interactive Maps feature
 *
 * Story arc:
 * 1. Map reveal (0-10s): Map fades in, first locations appear
 * 2. Path journey (10-35s): Animated path connects locations, each reveals
 * 3. Destination (35-45s): Story objective appears, navigation button pulses
 * 4. Arrival (45-60s): Zoom into location, characters revealed, scene crossfade
 */

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { MapScene, MapLocation, PathSegment } from './MapScene';
import { darkAppTheme } from '../../themes';
import { FadeIn } from '../../components/animations';

// ============================================================================
// Scene Data
// ============================================================================

const locations: MapLocation[] = [
  {
    id: 'village',
    name: 'Willowbrook Village',
    x: 15,
    y: 70,
    revealFrame: 30,
    characters: [
      { name: 'Elder Mira' },
    ],
  },
  {
    id: 'crossroads',
    name: 'The Crossroads',
    x: 35,
    y: 55,
    revealFrame: 180,
    characters: [
      { name: 'Merchant Trader' },
    ],
  },
  {
    id: 'forest',
    name: 'Whispering Woods',
    x: 55,
    y: 40,
    revealFrame: 360,
    characters: [
      { name: 'Forest Spirit' },
      { name: 'Wanderer' },
    ],
  },
  {
    id: 'ruins',
    name: 'Ancient Ruins',
    x: 75,
    y: 25,
    revealFrame: 540,
    isDestination: true,
    characters: [
      { name: 'The Oracle' },
      { name: 'Guardian' },
      { name: 'Scholar' },
    ],
  },
  {
    id: 'tower',
    name: 'Starlight Tower',
    x: 85,
    y: 60,
    revealFrame: 720,
    characters: [],
  },
];

const paths: PathSegment[] = [
  {
    from: 'village',
    to: 'crossroads',
    startFrame: 120,
    duration: 90,
  },
  {
    from: 'crossroads',
    to: 'forest',
    startFrame: 300,
    duration: 90,
  },
  {
    from: 'forest',
    to: 'ruins',
    startFrame: 480,
    duration: 90,
  },
];

// ============================================================================
// Main Component
// ============================================================================

export const MapHero: React.FC = () => {
  const theme = darkAppTheme;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Opening title */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
          }}
        >
          <FadeIn delay={10} duration={20}>
            <div
              style={{
                fontSize: 14,
                color: theme.colors.muted,
                fontFamily: theme.fonts.body,
                textTransform: 'uppercase',
                letterSpacing: 4,
                marginBottom: 16,
              }}
            >
              Interactive Maps
            </div>
          </FadeIn>
          <FadeIn delay={15} duration={20}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: theme.colors.foreground,
                fontFamily: theme.fonts.heading,
              }}
            >
              Explore the World
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Map exploration */}
      <Sequence from={45} durationInFrames={1755}>
        <MapScene
          mapName="The Realm of Aethoria"
          locations={locations.map((loc) => ({
            ...loc,
            revealFrame: loc.revealFrame ? loc.revealFrame - 45 : 0,
          }))}
          paths={paths.map((path) => ({
            ...path,
            startFrame: path.startFrame - 45,
          }))}
          objective={{
            title: 'Seek the Oracle',
            description: 'Travel to the Ancient Ruins',
            targetLocationId: 'ruins',
          }}
          showNavigationFrame={1050 - 45} // ~35s
          zoomToLocationFrame={1350 - 45} // ~45s
          zoomLocationId="ruins"
          crossfadeToSceneFrame={1500 - 45} // ~50s
          theme={theme}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default MapHero;
