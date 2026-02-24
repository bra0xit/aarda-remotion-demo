/**
 * MapScene - Base component for interactive map videos
 * Shows map with location pins, animated paths, and character presence
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import { AardaTheme } from '../../themes/types';
import { darkAppTheme } from '../../themes';
import { withOpacity, gradient } from '../../utils/colors';
import { easings } from '../../utils/easings';
import { FadeIn, SlideIn } from '../../components/animations';
import { GlowPulse, FloatingOrbs, Vignette } from '../../components/effects';
import { MapMarker, AardaAvatar, AardaBadge, ObjectiveCard } from '../../components/ui/aarda';

// ============================================================================
// Types
// ============================================================================

export interface MapLocation {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  characters?: {
    name: string;
    avatarUrl?: string;
  }[];
  /** Frame when this location appears */
  revealFrame?: number;
  /** Is this the current destination */
  isDestination?: boolean;
  /** Scene image to show on zoom */
  sceneImageUrl?: string;
}

export interface PathSegment {
  from: string; // location id
  to: string;   // location id
  /** Frame when path starts drawing */
  startFrame: number;
  /** Duration of path animation */
  duration: number;
}

export interface MapSceneProps {
  /** Map background image URL (or gradient if not provided) */
  mapImageUrl?: string;
  /** Map name */
  mapName?: string;
  /** Locations on the map */
  locations: MapLocation[];
  /** Path segments to draw */
  paths?: PathSegment[];
  /** Current objective */
  objective?: {
    title: string;
    description?: string;
    targetLocationId?: string;
  };
  /** Show "Go to Location" button at this frame */
  showNavigationFrame?: number;
  /** Zoom to location at this frame */
  zoomToLocationFrame?: number;
  /** Location ID to zoom to */
  zoomLocationId?: string;
  /** Crossfade to scene at this frame */
  crossfadeToSceneFrame?: number;
  /** Theme */
  theme?: AardaTheme;
}

// ============================================================================
// Helper Components
// ============================================================================

const AnimatedPath: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  theme: AardaTheme;
}> = ({ fromX, fromY, toX, toY, progress, theme }) => {
  // Calculate path points
  const currentX = fromX + (toX - fromX) * progress;
  const currentY = fromY + (toY - fromY) * progress;

  // SVG path for dashed line
  const pathD = `M ${fromX} ${fromY} L ${currentX} ${currentY}`;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Glow effect */}
      <defs>
        <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow line */}
      <path
        d={pathD}
        fill="none"
        stroke={withOpacity(theme.colors.primary, 0.3)}
        strokeWidth={8}
        strokeLinecap="round"
        filter="url(#pathGlow)"
      />

      {/* Main path line */}
      <path
        d={pathD}
        fill="none"
        stroke={theme.colors.primary}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="12 8"
      />

      {/* Animated dot at end */}
      {progress > 0 && progress < 1 && (
        <circle
          cx={currentX}
          cy={currentY}
          r={8}
          fill={theme.colors.primary}
          style={{
            filter: 'url(#pathGlow)',
          }}
        />
      )}
    </svg>
  );
};

const LocationPin: React.FC<{
  location: MapLocation;
  isHighlighted: boolean;
  showCharacters: boolean;
  delay: number;
  theme: AardaTheme;
}> = ({ location, isHighlighted, showCharacters, delay, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 200, damping: 15 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0, 1]);
  const opacity = interpolate(entrySpring, [0, 0.5, 1], [0, 1, 1]);

  // Floating animation
  const floatY = Math.sin((frame - delay) * 0.05) * 4;
  const floatRotate = Math.sin((frame - delay) * 0.03) * 2;

  // Pulse for highlighted/destination
  const pulse = isHighlighted ? Math.sin(frame * 0.1) * 0.1 + 1 : 1;

  const pinColor = isHighlighted
    ? theme.colors.emotionJoy
    : location.isDestination
    ? theme.colors.primary
    : theme.colors.accent;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${location.x}%`,
        top: `${location.y}%`,
        transform: `translate(-50%, -100%) translateY(${floatY}px) rotate(${floatRotate}deg) scale(${scale * pulse})`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: isHighlighted ? 100 : 10,
      }}
    >
      {/* Character avatars above pin */}
      {showCharacters && location.characters && location.characters.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: -8,
            marginBottom: 8,
          }}
        >
          {location.characters.slice(0, 4).map((char, i) => (
            <div
              key={i}
              style={{
                transform: `scale(${interpolate(
                  frame - delay - 10 - i * 5,
                  [0, 10],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                )})`,
              }}
            >
              <AardaAvatar
                name={char.name}
                src={char.avatarUrl}
                size={32}
                borderColor={theme.colors.border}
                theme={theme}
              />
            </div>
          ))}
          {location.characters.length > 4 && (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: theme.colors.secondary,
                border: `2px solid ${theme.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 600,
                color: theme.colors.foreground,
                fontFamily: theme.fonts.body,
              }}
            >
              +{location.characters.length - 4}
            </div>
          )}
        </div>
      )}

      {/* Pin marker */}
      <div
        style={{
          width: 36,
          height: 44,
          position: 'relative',
        }}
      >
        {/* Pin body - teardrop shape */}
        <div
          style={{
            width: 36,
            height: 36,
            backgroundColor: pinColor,
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            boxShadow: isHighlighted
              ? `0 0 30px ${withOpacity(pinColor, 0.6)}, 0 0 60px ${withOpacity(pinColor, 0.3)}`
              : `0 4px 12px rgba(0,0,0,0.4)`,
          }}
        />

        {/* Inner icon */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            width: 24,
            height: 24,
            backgroundColor: theme.colors.card,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
          }}
        >
          {location.characters && location.characters.length > 0 ? '👤' : '📍'}
        </div>
      </div>

      {/* Location name */}
      <div
        style={{
          marginTop: 8,
          padding: '6px 12px',
          backgroundColor: withOpacity(theme.colors.card, 0.95),
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          color: theme.colors.foreground,
          fontFamily: theme.fonts.body,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          border: isHighlighted ? `2px solid ${pinColor}` : 'none',
        }}
      >
        {location.name}
      </div>
    </div>
  );
};

const NavigationButton: React.FC<{
  locationName: string;
  theme: AardaTheme;
}> = ({ locationName, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame,
    fps,
    config: { stiffness: 300, damping: 25 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrySpring, [0, 0.5, 1], [0, 1, 1]);
  const y = interpolate(entrySpring, [0, 1], [20, 0]);

  // Pulse effect
  const pulse = Math.sin(frame * 0.15) * 0.05 + 1;

  return (
    <div
      style={{
        position: 'absolute',
        right: 40,
        top: '50%',
        transform: `translateY(-50%) translateY(${y}px) scale(${scale * pulse})`,
        opacity,
      }}
    >
      {/* Pulsing ring */}
      <div
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: 20,
          border: `2px solid ${withOpacity(theme.colors.emotionJoy, 0.3)}`,
          animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        }}
      />

      {/* Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 24px',
          backgroundColor: theme.colors.emotionJoy,
          borderRadius: 16,
          boxShadow: `0 0 40px ${withOpacity(theme.colors.emotionJoy, 0.4)}`,
        }}
      >
        <span style={{ fontSize: 24 }}>📍</span>
        <div>
          <div
            style={{
              fontSize: 12,
              color: withOpacity('#000', 0.7),
              fontFamily: theme.fonts.body,
            }}
          >
            Go to
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#000',
              fontFamily: theme.fonts.heading,
            }}
          >
            {locationName}
          </div>
        </div>
      </div>
    </div>
  );
};

const SceneZoom: React.FC<{
  location: MapLocation;
  progress: number;
  theme: AardaTheme;
}> = ({ location, progress, theme }) => {
  const scale = interpolate(progress, [0, 1], [1, 3]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        opacity,
      }}
    >
      {/* Scene preview */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        {/* Scene image or placeholder */}
        <div
          style={{
            width: '80%',
            height: '50%',
            backgroundColor: theme.colors.card,
            borderRadius: 24,
            backgroundImage: location.sceneImageUrl
              ? `url(${location.sceneImageUrl})`
              : gradient([theme.colors.primary, theme.colors.accent], '135deg'),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!location.sceneImageUrl && (
            <span style={{ fontSize: 80, opacity: 0.5 }}>🏛️</span>
          )}
        </div>

        {/* Location name */}
        <div
          style={{
            marginTop: 40,
            fontSize: 36,
            fontWeight: 700,
            color: theme.colors.foreground,
            fontFamily: theme.fonts.heading,
          }}
        >
          {location.name}
        </div>

        {/* Characters at location */}
        {location.characters && location.characters.length > 0 && (
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              gap: 16,
            }}
          >
            {location.characters.map((char, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <AardaAvatar
                  name={char.name}
                  src={char.avatarUrl}
                  size={64}
                  theme={theme}
                />
                <span
                  style={{
                    fontSize: 14,
                    color: theme.colors.muted,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {char.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const MapScene: React.FC<MapSceneProps> = ({
  mapImageUrl,
  mapName = 'World Map',
  locations,
  paths = [],
  objective,
  showNavigationFrame,
  zoomToLocationFrame,
  zoomLocationId,
  crossfadeToSceneFrame,
  theme = darkAppTheme,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Find zoom target location
  const zoomLocation = locations.find((l) => l.id === zoomLocationId);

  // Calculate zoom progress
  const zoomProgress = zoomToLocationFrame
    ? interpolate(
        frame,
        [zoomToLocationFrame, zoomToLocationFrame + 45],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.smooth }
      )
    : 0;

  // Calculate crossfade progress
  const crossfadeProgress = crossfadeToSceneFrame
    ? interpolate(
        frame,
        [crossfadeToSceneFrame, crossfadeToSceneFrame + 30],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 0;

  // Get location coordinates for paths
  const getLocationCoords = (id: string) => {
    const loc = locations.find((l) => l.id === id);
    if (!loc) return { x: 0, y: 0 };
    return { x: (loc.x / 100) * width, y: (loc.y / 100) * height };
  };

  return (
    <AbsoluteFill>
      {/* Map background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: theme.colors.background,
          backgroundImage: mapImageUrl ? `url(${mapImageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${1 + zoomProgress * 0.5})`,
          transformOrigin: zoomLocation
            ? `${zoomLocation.x}% ${zoomLocation.y}%`
            : 'center',
        }}
      />

      {/* Gradient overlay for non-image maps */}
      {!mapImageUrl && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 20%, ${withOpacity(theme.colors.primary, 0.2)} 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${withOpacity(theme.colors.accent, 0.15)} 0%, transparent 50%),
              linear-gradient(180deg, ${theme.colors.background} 0%, ${theme.colors.backgroundAlt} 100%)
            `,
          }}
        />
      )}

      {/* Floating orbs for atmosphere */}
      <FloatingOrbs count={5} blur={80} theme={theme} />

      {/* Animated paths */}
      {paths.map((path, i) => {
        const from = getLocationCoords(path.from);
        const to = getLocationCoords(path.to);
        const progress = interpolate(
          frame,
          [path.startFrame, path.startFrame + path.duration],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.smooth }
        );

        if (progress <= 0) return null;

        return (
          <AnimatedPath
            key={i}
            fromX={from.x}
            fromY={from.y}
            toX={to.x}
            toY={to.y}
            progress={progress}
            theme={theme}
          />
        );
      })}

      {/* Location pins */}
      {locations.map((location) => {
        const revealFrame = location.revealFrame || 0;
        if (frame < revealFrame) return null;

        const isHighlighted =
          objective?.targetLocationId === location.id ||
          (zoomLocationId === location.id && zoomProgress > 0);

        // Show characters after pin is revealed
        const showCharacters = frame > revealFrame + 20;

        return (
          <LocationPin
            key={location.id}
            location={location}
            isHighlighted={isHighlighted}
            showCharacters={showCharacters}
            delay={revealFrame}
            theme={theme}
          />
        );
      })}

      {/* Objective card (top-left) */}
      {objective && (
        <div style={{ position: 'absolute', top: 40, left: 40, width: 320 }}>
          <FadeIn delay={30} duration={20}>
            <ObjectiveCard
              title={objective.title}
              description={objective.description}
              status="active"
              theme={theme}
            />
          </FadeIn>
        </div>
      )}

      {/* Map name (top-center) */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <FadeIn delay={10} duration={20}>
          <AardaBadge type="default" theme={theme}>
            📍 {mapName}
          </AardaBadge>
        </FadeIn>
      </div>

      {/* Navigation button */}
      {showNavigationFrame && frame >= showNavigationFrame && zoomLocation && (
        <NavigationButton locationName={zoomLocation.name} theme={theme} />
      )}

      {/* Vignette */}
      <Vignette intensity={0.3} size={0.3} />

      {/* Scene zoom/crossfade overlay */}
      {crossfadeProgress > 0 && zoomLocation && (
        <SceneZoom
          location={zoomLocation}
          progress={crossfadeProgress}
          theme={theme}
        />
      )}
    </AbsoluteFill>
  );
};

export default MapScene;
