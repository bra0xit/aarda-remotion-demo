import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// Location markers on the map
const LOCATIONS = [
  { id: 'kingdom', name: 'The Ancient Kingdom', x: 540, y: 650, delay: 15, isActive: true },
  { id: 'forest', name: 'Whispering Woods', x: 280, y: 520, delay: 20 },
  { id: 'temple', name: 'Temple of Silence', x: 780, y: 480, delay: 25 },
  { id: 'village', name: 'Haven Village', x: 380, y: 850, delay: 30 },
  { id: 'ruins', name: 'The Fallen Spire', x: 700, y: 780, delay: 35 },
  { id: 'coast', name: 'Ember Coast', x: 200, y: 720, delay: 40 },
];

export const MapReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Map fade in
  const mapOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Character card flying into map (from previous scene)
  const cardFlyProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  const cardScale = interpolate(cardFlyProgress, [0, 1], [0.4, 0.05]);
  const cardX = interpolate(cardFlyProgress, [0, 1], [540, 540]);
  const cardY = interpolate(cardFlyProgress, [0, 1], [960, 650]);
  const cardOpacity = interpolate(cardFlyProgress, [0, 0.8, 1], [1, 0.5, 0]);

  // Click ripple on active marker (triggered at frame 70)
  const rippleFrame = frame - 70;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* Map container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: mapOpacity,
        }}
      >
        {/* Map background - stylized illustrated map */}
        <MapBackground frame={frame} />

        {/* Grid overlay for map feel */}
        <MapGrid opacity={0.1} />

        {/* Location markers */}
        {LOCATIONS.map((loc) => (
          <LocationMarker
            key={loc.id}
            {...loc}
            frame={frame}
            fps={fps}
            rippleFrame={loc.isActive ? rippleFrame : -100}
          />
        ))}

        {/* Connection paths between locations */}
        <ConnectionPaths frame={frame} />
      </div>

      {/* Flying character card (from previous scene) */}
      {cardOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: cardX,
            top: cardY,
            transform: `translate(-50%, -50%) scale(${cardScale})`,
            opacity: cardOpacity,
            width: 160,
            height: 100,
            backgroundColor: '#1a1a1a',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
          }}
        />
      )}

      {/* Ambient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, transparent 30%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// Stylized map background
const MapBackground: React.FC<{ frame: number }> = ({ frame }) => {
  // Subtle parallax movement
  const offsetX = Math.sin(frame * 0.01) * 5;
  const offsetY = Math.cos(frame * 0.008) * 3;

  return (
    <div
      style={{
        position: 'absolute',
        inset: -50,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
    >
      {/* Base terrain colors */}
      <svg width="100%" height="100%" viewBox="0 0 1180 2020">
        {/* Ocean/water areas */}
        <ellipse cx="150" cy="800" rx="200" ry="300" fill="#1e3a5f" opacity="0.6" />
        <ellipse cx="950" cy="1200" rx="180" ry="250" fill="#1e3a5f" opacity="0.5" />

        {/* Land masses */}
        <path
          d="M 200 300 Q 400 250 600 350 Q 800 300 900 400 Q 950 600 900 800 Q 850 1000 700 1100 Q 500 1200 300 1100 Q 150 900 200 700 Q 180 500 200 300"
          fill="#2d4a3e"
          opacity="0.7"
        />

        {/* Mountain range */}
        <path
          d="M 400 400 L 450 300 L 500 380 L 550 280 L 600 350 L 650 290 L 700 400"
          fill="none"
          stroke="#4a5568"
          strokeWidth="3"
          opacity="0.5"
        />

        {/* Forest areas */}
        {[...Array(15)].map((_, i) => (
          <circle
            key={i}
            cx={250 + (i % 5) * 40 + Math.sin(i) * 20}
            cy={500 + Math.floor(i / 5) * 50 + Math.cos(i) * 15}
            r={15 + (i % 3) * 5}
            fill="#1a3a2a"
            opacity="0.6"
          />
        ))}

        {/* Rivers */}
        <path
          d="M 540 400 Q 520 500 540 600 Q 560 700 540 800 Q 500 900 480 1000"
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          opacity="0.4"
          strokeLinecap="round"
        />
      </svg>

      {/* Parchment texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(139, 92, 246, 0.02) 2px,
              rgba(139, 92, 246, 0.02) 4px
            )
          `,
        }}
      />
    </div>
  );
};

// Grid overlay
const MapGrid: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="100%"
    height="100%"
    style={{ position: 'absolute', inset: 0, opacity }}
  >
    {[...Array(20)].map((_, i) => (
      <React.Fragment key={i}>
        <line
          x1="0"
          y1={`${(i + 1) * 5}%`}
          x2="100%"
          y2={`${(i + 1) * 5}%`}
          stroke="#6B5B95"
          strokeWidth="0.5"
        />
        <line
          x1={`${(i + 1) * 5}%`}
          y1="0"
          x2={`${(i + 1) * 5}%`}
          y2="100%"
          stroke="#6B5B95"
          strokeWidth="0.5"
        />
      </React.Fragment>
    ))}
  </svg>
);

// Individual location marker
interface LocationMarkerProps {
  id: string;
  name: string;
  x: number;
  y: number;
  delay: number;
  isActive?: boolean;
  frame: number;
  fps: number;
  rippleFrame: number;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({
  name,
  x,
  y,
  delay,
  isActive = false,
  frame,
  fps,
  rippleFrame,
}) => {
  // Drop-in animation with bounce
  const dropSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 200, damping: 12 },
  });

  const scale = interpolate(dropSpring, [0, 1], [0, 1]);
  const dropY = interpolate(dropSpring, [0, 1], [-50, 0]);

  // Pulse animation
  const pulseScale = frame > delay + 15
    ? 1 + Math.sin((frame - delay) * 0.12) * 0.08
    : 1;

  // Glow intensity
  const glowOpacity = isActive
    ? interpolate(Math.sin((frame - delay) * 0.1), [-1, 1], [0.4, 0.8])
    : 0.3;

  // Ripple effect for active marker
  const rippleScale = rippleFrame > 0
    ? interpolate(rippleFrame, [0, 30], [1, 3], { extrapolateRight: 'clamp' })
    : 0;
  const rippleOpacity = rippleFrame > 0
    ? interpolate(rippleFrame, [0, 30], [0.6, 0], { extrapolateRight: 'clamp' })
    : 0;

  if (scale <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + dropY,
        transform: `translate(-50%, -50%) scale(${scale * pulseScale})`,
      }}
    >
      {/* Ripple rings (for active marker click) */}
      {isActive && rippleFrame > 0 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) scale(${rippleScale})`,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid #8B5CF6',
              opacity: rippleOpacity,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) scale(${rippleScale * 0.7})`,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid #8B5CF6',
              opacity: rippleOpacity * 1.2,
            }}
          />
        </>
      )}

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${isActive ? '#8B5CF6' : '#6B5B95'} 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: 'blur(8px)',
        }}
      />

      {/* Marker pin */}
      <svg width="32" height="44" viewBox="0 0 32 44">
        <defs>
          <linearGradient id={`pin-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isActive ? '#A78BFA' : '#8B5CF6'} />
            <stop offset="100%" stopColor={isActive ? '#8B5CF6' : '#6B5B95'} />
          </linearGradient>
        </defs>
        <path
          d="M 16 0 C 7 0 0 7 0 16 C 0 28 16 44 16 44 C 16 44 32 28 32 16 C 32 7 25 0 16 0"
          fill={`url(#pin-${x}-${y})`}
        />
        <circle cx="16" cy="14" r="6" fill="#fff" opacity="0.9" />
      </svg>

      {/* Name tooltip (shows for active marker) */}
      {isActive && frame > delay + 50 && (
        <div
          style={{
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontFamily: 'Inter, system-ui, sans-serif',
            whiteSpace: 'nowrap',
            opacity: interpolate(frame - delay - 50, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

// Dashed paths connecting locations
const ConnectionPaths: React.FC<{ frame: number }> = ({ frame }) => {
  const paths = [
    { from: LOCATIONS[0], to: LOCATIONS[1], delay: 50 },
    { from: LOCATIONS[0], to: LOCATIONS[2], delay: 55 },
    { from: LOCATIONS[0], to: LOCATIONS[3], delay: 60 },
    { from: LOCATIONS[3], to: LOCATIONS[5], delay: 65 },
    { from: LOCATIONS[2], to: LOCATIONS[4], delay: 70 },
  ];

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {paths.map((path, i) => {
        const progress = interpolate(
          frame,
          [path.delay, path.delay + 20],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        if (progress <= 0) return null;

        const x1 = path.from.x;
        const y1 = path.from.y;
        const x2 = path.to.x;
        const y2 = path.to.y;

        // Curved path
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 30;
        const pathD = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;

        return (
          <path
            key={i}
            d={pathD}
            fill="none"
            stroke="rgba(139, 92, 246, 0.4)"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeLinecap="round"
            style={{
              strokeDashoffset: (1 - progress) * 200,
            }}
          />
        );
      })}
    </svg>
  );
};
