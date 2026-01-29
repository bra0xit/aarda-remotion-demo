import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// Characters in the scene
const CHARACTERS = [
  { id: 'elena', name: 'Elena', x: 300, y: 1100, size: 64, delay: 30, isActive: true },
  { id: 'guardian', name: 'The Guardian', x: 700, y: 1050, size: 56, delay: 40 },
  { id: 'merchant', name: 'Old Merchant', x: 500, y: 1200, size: 48, delay: 50 },
];

export const SceneView: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom transition from map
  const zoomProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const scale = interpolate(zoomProgress, [0, 1], [3, 1]);
  const opacity = interpolate(zoomProgress, [0, 0.3, 1], [0, 0.5, 1]);

  // Scene info bar fade in
  const infoOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Scene container with zoom transition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'center 40%',
          opacity,
        }}
      >
        {/* Parallax background layers */}
        <ParallaxBackground frame={frame} />

        {/* Character avatars */}
        {CHARACTERS.map((char) => (
          <CharacterAvatar
            key={char.id}
            {...char}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      {/* Scene info bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 32px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
          opacity: infoOpacity,
          transform: `translateY(${interpolate(infoOpacity, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: 8,
          }}
        >
          The Fallen Throne Room
        </div>
        <div
          style={{
            fontSize: 14,
            color: '#888',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontStyle: 'italic',
          }}
        >
          "Dust settles on forgotten glory"
        </div>
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// Parallax background with multiple layers
const ParallaxBackground: React.FC<{ frame: number }> = ({ frame }) => {
  // Subtle movement for each layer
  const layer1X = Math.sin(frame * 0.005) * 3;
  const layer2X = Math.sin(frame * 0.008) * 6;
  const layer3X = Math.sin(frame * 0.012) * 10;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Far background - sky/atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
          transform: `translateX(${layer1X}px)`,
        }}
      />

      {/* Mid layer - distant architecture */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1920"
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${layer2X}px)`,
          opacity: 0.4,
        }}
      >
        {/* Distant pillars */}
        <rect x="100" y="200" width="60" height="800" fill="#2a2a4a" />
        <rect x="250" y="300" width="50" height="700" fill="#252545" />
        <rect x="800" y="250" width="55" height="750" fill="#2a2a4a" />
        <rect x="920" y="320" width="45" height="680" fill="#252545" />

        {/* Arches */}
        <path
          d="M 100 200 Q 180 100 250 200"
          fill="none"
          stroke="#3a3a5a"
          strokeWidth="20"
        />
        <path
          d="M 800 250 Q 875 150 920 250"
          fill="none"
          stroke="#3a3a5a"
          strokeWidth="15"
        />
      </svg>

      {/* Near layer - throne room details */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1920"
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${layer3X}px)`,
        }}
      >
        {/* Large pillars */}
        <rect x="50" y="400" width="80" height="1000" fill="#1a1a2e" />
        <rect x="950" y="400" width="80" height="1000" fill="#1a1a2e" />

        {/* Pillar details */}
        <rect x="50" y="400" width="80" height="20" fill="#2a2a4a" />
        <rect x="50" y="500" width="80" height="10" fill="#252545" />
        <rect x="950" y="400" width="80" height="20" fill="#2a2a4a" />
        <rect x="950" y="500" width="80" height="10" fill="#252545" />

        {/* Throne silhouette in center */}
        <path
          d="M 440 700 L 440 900 L 400 920 L 400 1000 L 680 1000 L 680 920 L 640 900 L 640 700 L 600 680 L 540 650 L 480 680 Z"
          fill="#151525"
          opacity="0.8"
        />

        {/* Fallen debris */}
        <ellipse cx="300" cy="1300" rx="80" ry="20" fill="#1a1a2e" opacity="0.6" />
        <rect x="280" y="1200" width="40" height="100" fill="#252545" transform="rotate(-15 300 1250)" />
        <ellipse cx="750" cy="1350" rx="60" ry="15" fill="#1a1a2e" opacity="0.5" />
      </svg>

      {/* Atmospheric dust particles */}
      <DustParticles frame={frame} />

      {/* Light rays from above */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '40%',
          width: '20%',
          height: '60%',
          background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%)',
          filter: 'blur(30px)',
          transform: `rotate(5deg)`,
          opacity: 0.5 + Math.sin(frame * 0.02) * 0.2,
        }}
      />
    </div>
  );
};

// Floating dust particles
const DustParticles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 61.8) % 100,
    size: 1 + (i % 4),
    speed: 0.05 + (i % 5) * 0.02,
    drift: (i % 3 - 1) * 0.01,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: 0.6,
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const y = (p.y - frame * p.speed) % 110 + 5;
        const x = p.x + Math.sin(frame * 0.02 + i) * 3 + frame * p.drift;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x % 100}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: 'rgba(200, 180, 160, 0.4)',
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}
    </div>
  );
};

// Character avatar in scene
interface CharacterAvatarProps {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  isActive?: boolean;
  frame: number;
  fps: number;
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  x,
  y,
  size,
  delay,
  isActive = false,
  frame,
  fps,
}) => {
  // Fade in
  const fadeSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const opacity = interpolate(fadeSpring, [0, 1], [0, 1]);
  const scale = interpolate(fadeSpring, [0, 1], [0.5, 1]);

  // Gentle bob animation
  const bobY = frame > delay + 20
    ? Math.sin((frame - delay) * 0.08) * 3
    : 0;

  // Pulse for active character
  const pulseScale = isActive && frame > delay + 30
    ? 1 + Math.sin((frame - delay) * 0.15) * 0.05
    : 1;

  // Glow
  const glowOpacity = isActive
    ? interpolate(Math.sin((frame - delay) * 0.12), [-1, 1], [0.4, 0.8])
    : 0.2;

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + bobY,
        transform: `translate(-50%, -50%) scale(${scale * pulseScale})`,
        opacity,
      }}
    >
      {/* Glow behind avatar */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: size * 2,
          height: size * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${isActive ? 'rgba(139, 92, 246, 0.5)' : 'rgba(100, 100, 150, 0.3)'} 0%, transparent 70%)`,
          filter: 'blur(10px)',
          opacity: glowOpacity,
        }}
      />

      {/* Avatar circle */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#1a1a2e',
          border: `3px solid ${isActive ? '#8B5CF6' : '#4a4a6a'}`,
          boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Simple avatar icon */}
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 40 40">
          <circle cx="20" cy="14" r="8" fill={isActive ? '#8B5CF6' : '#6366F1'} />
          <ellipse cx="20" cy="35" rx="12" ry="10" fill={isActive ? '#8B5CF6' : '#6366F1'} />
        </svg>
      </div>

      {/* Name tooltip for active */}
      {isActive && frame > delay + 40 && (
        <div
          style={{
            position: 'absolute',
            top: -30,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(139, 92, 246, 0.9)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: 4,
            fontSize: 11,
            fontFamily: 'Inter, system-ui, sans-serif',
            whiteSpace: 'nowrap',
            opacity: interpolate(frame - delay - 40, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {name}
        </div>
      )}

      {/* Click indicator for active character */}
      {isActive && frame > delay + 50 && (
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 16,
            opacity: interpolate(Math.sin((frame - delay) * 0.2), [-1, 1], [0.5, 1]),
          }}
        >
          👆
        </div>
      )}
    </div>
  );
};
