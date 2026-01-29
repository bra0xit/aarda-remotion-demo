import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// Gradient definitions matching Aarda's color scheme
const GRADIENTS = {
  purple: ['#8B5CF6', '#A78BFA'],
  blue: ['#3B82F6', '#6366F1'],
  emerald: ['#10B981', '#14B8A6'],
};

export const KnowledgeBrickIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Scale spring animation
  const scaleSpring = spring({
    frame: frame - 10, // delay start
    fps,
    config: {
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  });
  const scale = interpolate(scaleSpring, [0, 1], [0.8, 1]);

  // Gentle breathing pulse after settled
  const breathe = frame > 60
    ? Math.sin((frame - 60) * 0.08) * 0.015 + 1
    : 1;

  // Glow pulse
  const glowIntensity = frame > 40
    ? interpolate(Math.sin((frame - 40) * 0.1), [-1, 1], [0.3, 0.6])
    : interpolate(frame, [20, 40], [0, 0.3], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient glow behind brick */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(139, 92, 246, ${glowIntensity}) 0%, transparent 70%)`,
          filter: 'blur(40px)',
          opacity: fadeIn,
        }}
      />

      {/* The Knowledge Brick Card */}
      <div
        style={{
          opacity: fadeIn,
          transform: `scale(${scale * breathe})`,
        }}
      >
        <KnowledgeBrickCard
          title="The Ancient Kingdom"
          content="A once-great civilization that fell when the last guardian chose silence over truth. Its ruins still hold secrets..."
          gradient={GRADIENTS.purple}
          permissionType="global"
          frame={frame}
        />
      </div>

      {/* Subtle particle field */}
      <ParticleField frame={frame} opacity={fadeIn * 0.5} />
    </AbsoluteFill>
  );
};

// The actual Knowledge Brick Card component
interface KnowledgeBrickCardProps {
  title: string;
  content: string;
  gradient: string[];
  permissionType: 'global' | 'group' | 'private';
  frame: number;
}

const KnowledgeBrickCard: React.FC<KnowledgeBrickCardProps> = ({
  title,
  content,
  gradient,
  permissionType,
  frame,
}) => {
  // Shimmer effect on gradient
  const shimmerPosition = interpolate(
    frame % 120,
    [0, 120],
    [-100, 200]
  );

  return (
    <div
      style={{
        width: 320,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.3),
          0 10px 40px rgba(139, 92, 246, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.05)
        `,
        position: 'relative',
      }}
    >
      {/* Gradient Header */}
      <div
        style={{
          height: 140,
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              90deg,
              transparent ${shimmerPosition - 50}%,
              rgba(255,255,255,0.15) ${shimmerPosition}%,
              transparent ${shimmerPosition + 50}%
            )`,
          }}
        />

        {/* Permission Badge */}
        <PermissionBadge type={permissionType} />

        {/* Title overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 16px 12px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {title}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: 16 }}>
        {/* ID Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            color: '#A78BFA',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 500,
            marginBottom: 10,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          KB #1
        </div>

        {/* Content text */}
        <div
          style={{
            fontSize: 14,
            color: '#a0a0a0',
            lineHeight: 1.5,
            fontFamily: 'Inter, system-ui, sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {content}
        </div>

        {/* Category tags */}
        <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
          <CategoryTag label="Lore" />
          <CategoryTag label="Location" />
        </div>
      </div>

      {/* Connection handles (visual only) */}
      <ConnectionHandle position="top" />
      <ConnectionHandle position="bottom" />
    </div>
  );
};

// Permission badge component
const PermissionBadge: React.FC<{ type: 'global' | 'group' | 'private' }> = ({ type }) => {
  const config = {
    global: { bg: '#10B981', icon: '🌐', label: 'Global' },
    group: { bg: '#3B82F6', icon: '👥', label: 'Group' },
    private: { bg: '#F59E0B', icon: '🔒', label: 'Private' },
  }[type];

  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: config.bg,
        color: '#fff',
        padding: '4px 8px',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {config.icon} {config.label}
    </div>
  );
};

// Category tag component
const CategoryTag: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      backgroundColor: 'rgba(255,255,255,0.08)',
      color: '#888',
      padding: '4px 10px',
      borderRadius: 12,
      fontSize: 12,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}
  >
    {label}
  </div>
);

// Connection handle (visual indicator for graph connections)
const ConnectionHandle: React.FC<{ position: 'top' | 'bottom' }> = ({ position }) => (
  <div
    style={{
      position: 'absolute',
      [position]: -6,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: '#2a2a2a',
      border: '2px solid #6B5B95',
      boxShadow: '0 0 8px rgba(139, 92, 246, 0.4)',
    }}
  />
);

// Ambient particle field for atmosphere
const ParticleField: React.FC<{ frame: number; opacity: number }> = ({ frame, opacity }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.5) % 100, // Golden ratio distribution
    y: (i * 61.8) % 100,
    size: 2 + (i % 3),
    speed: 0.2 + (i % 5) * 0.1,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity,
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed) % 120 - 10;
        const x = p.x + Math.sin(frame * 0.02 + i) * 2;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: 'rgba(139, 92, 246, 0.4)',
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
};
