/**
 * MapShorts - Three 15-second clips for Interactive Maps feature
 *
 * Short 1: Discovery Journey - Path drawing across map, locations revealing
 * Short 2: Living World - Layered animations (environment, pins, characters)
 * Short 3: Story Navigation - Objective guides player to location
 */

import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { MapScene, MapLocation, PathSegment } from './MapScene';
import { darkAppTheme } from '../../themes';
import { FadeIn } from '../../components/animations';
import { FloatingOrbs, GlowPulse } from '../../components/effects';
import { MapMarker, AardaAvatar, ObjectiveCard } from '../../components/ui/aarda';
import { withOpacity } from '../../utils/colors';

// ============================================================================
// Short 1: Discovery Journey
// ============================================================================

const discoveryLocations: MapLocation[] = [
  { id: 'start', name: 'Starting Point', x: 20, y: 75, revealFrame: 15 },
  { id: 'waypoint1', name: 'Forest Clearing', x: 40, y: 55, revealFrame: 90 },
  { id: 'waypoint2', name: 'Mountain Pass', x: 60, y: 35, revealFrame: 180 },
  { id: 'destination', name: 'Hidden Temple', x: 80, y: 20, revealFrame: 270, isDestination: true },
];

const discoveryPaths: PathSegment[] = [
  { from: 'start', to: 'waypoint1', startFrame: 60, duration: 60 },
  { from: 'waypoint1', to: 'waypoint2', startFrame: 150, duration: 60 },
  { from: 'waypoint2', to: 'destination', startFrame: 240, duration: 60 },
];

export const MapShort1_DiscoveryJourney: React.FC = () => {
  const theme = darkAppTheme;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Quick label */}
      <Sequence from={0} durationInFrames={45}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FadeIn delay={5} duration={15}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                fontFamily: theme.fonts.body,
              }}
            >
              Discovery Journey
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Map with path animation */}
      <Sequence from={30} durationInFrames={420}>
        <MapScene
          mapName="Uncharted Territory"
          locations={discoveryLocations.map((loc) => ({
            ...loc,
            revealFrame: loc.revealFrame ? loc.revealFrame - 30 : 0,
          }))}
          paths={discoveryPaths.map((path) => ({
            ...path,
            startFrame: path.startFrame - 30,
          }))}
          theme={theme}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// Short 2: Living World
// ============================================================================

const livingWorldLocations: MapLocation[] = [
  {
    id: 'town',
    name: 'Riverside Town',
    x: 25,
    y: 60,
    revealFrame: 30,
    characters: [
      { name: 'Mayor' },
      { name: 'Blacksmith' },
      { name: 'Innkeeper' },
    ],
  },
  {
    id: 'market',
    name: 'Grand Market',
    x: 50,
    y: 45,
    revealFrame: 60,
    characters: [
      { name: 'Merchant' },
      { name: 'Traveler' },
    ],
  },
  {
    id: 'castle',
    name: 'Royal Castle',
    x: 75,
    y: 30,
    revealFrame: 90,
    characters: [
      { name: 'King' },
      { name: 'Advisor' },
      { name: 'Knight' },
      { name: 'Princess' },
      { name: 'Guard' },
    ],
  },
];

export const MapShort2_LivingWorld: React.FC = () => {
  const theme = darkAppTheme;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Quick label */}
      <Sequence from={0} durationInFrames={45}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FadeIn delay={5} duration={15}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: theme.colors.emotionTrust,
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                fontFamily: theme.fonts.body,
              }}
            >
              Living World
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Map showing populated locations */}
      <Sequence from={30} durationInFrames={420}>
        <MapScene
          mapName="Kingdom of Valdoria"
          locations={livingWorldLocations.map((loc) => ({
            ...loc,
            revealFrame: loc.revealFrame ? loc.revealFrame - 30 : 0,
          }))}
          theme={theme}
        />

        {/* Extra layer text overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: interpolate(frame - 30, [200, 230], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              padding: '16px 32px',
              backgroundColor: withOpacity(theme.colors.card, 0.95),
              borderRadius: 12,
              border: `1px solid ${theme.colors.border}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: theme.colors.muted,
                fontFamily: theme.fonts.body,
                marginBottom: 4,
              }}
            >
              Characters await at every location
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: theme.colors.foreground,
                fontFamily: theme.fonts.heading,
              }}
            >
              A World Full of Stories
            </div>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// Short 3: Story Navigation
// ============================================================================

const storyNavLocations: MapLocation[] = [
  { id: 'current', name: 'Your Location', x: 30, y: 65, revealFrame: 15 },
  {
    id: 'target',
    name: 'The Oracle\'s Temple',
    x: 70,
    y: 35,
    revealFrame: 15,
    isDestination: true,
    characters: [{ name: 'The Oracle' }],
  },
];

export const MapShort3_StoryNavigation: React.FC = () => {
  const theme = darkAppTheme;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Quick label */}
      <Sequence from={0} durationInFrames={45}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FadeIn delay={5} duration={15}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: theme.colors.emotionJoy,
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 600,
                color: '#000',
                fontFamily: theme.fonts.body,
              }}
            >
              Story Navigation
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Map with objective and navigation */}
      <Sequence from={30} durationInFrames={420}>
        <MapScene
          mapName="Quest Map"
          locations={storyNavLocations.map((loc) => ({
            ...loc,
            revealFrame: loc.revealFrame ? loc.revealFrame - 30 : 0,
          }))}
          paths={[
            {
              from: 'current',
              to: 'target',
              startFrame: 60,
              duration: 90,
            },
          ]}
          objective={{
            title: 'Seek Ancient Wisdom',
            description: 'Find the Oracle at the Temple',
            targetLocationId: 'target',
          }}
          showNavigationFrame={180}
          zoomToLocationFrame={300}
          zoomLocationId="target"
          theme={theme}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// Exports
// ============================================================================

export default {
  MapShort1_DiscoveryJourney,
  MapShort2_LivingWorld,
  MapShort3_StoryNavigation,
};
