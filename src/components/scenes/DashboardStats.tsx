import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

/**
 * Scene 4.2: Dashboard Stats
 * Shows platform metrics and statistics with animated counters.
 */

const STATS = [
  { value: 2500, suffix: '+', label: 'Worlds Created', icon: '🌍' },
  { value: 15000, suffix: '+', label: 'Characters', icon: '👤' },
  { value: 50000, suffix: '+', label: 'Conversations', icon: '💬' },
  { value: 98, suffix: '%', label: 'Satisfaction', icon: '⭐' },
];

const FEATURES = [
  { text: 'Knowledge Bricks', color: '#22C55E' },
  { text: 'Trigger System', color: '#3B82F6' },
  { text: 'Objectives', color: '#A78BFA' },
  { text: 'Emotional Mapping', color: '#F59E0B' },
];

export const DashboardStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background grid pattern */}
      <GridBackground frame={frame} />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: '#3B82F6',
            fontFamily: 'Inter, system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 8,
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          Platform Stats
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
            opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [5, 25], [20, 0], { extrapolateRight: 'clamp' })}px)`,
          }}
        >
          Built by Creators, for Creators
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 32,
          right: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}
      >
        {STATS.map((stat, index) => (
          <StatCard key={index} stat={stat} frame={frame} fps={fps} index={index} />
        ))}
      </div>

      {/* Feature badges */}
      <div
        style={{
          position: 'absolute',
          bottom: 280,
          left: 32,
          right: 32,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: '#888',
            fontFamily: 'Inter, system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 16,
            textAlign: 'center',
            opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          Powered By
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'center',
          }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureBadge key={index} feature={feature} frame={frame} index={index} />
          ))}
        </div>
      </div>

      {/* Animated connection lines */}
      <ConnectionLines frame={frame} />
    </AbsoluteFill>
  );
};

interface StatCardProps {
  stat: {
    value: number;
    suffix: string;
    label: string;
    icon: string;
  };
  frame: number;
  fps: number;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, frame, fps, index }) => {
  const delay = 15 + index * 10;

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 14 },
  });

  const scale = interpolate(cardSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(cardSpring, [0, 0.5, 1], [0, 1, 1]);

  // Animated counter
  const counterProgress = interpolate(frame - delay, [10, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const displayValue = Math.round(stat.value * counterProgress);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: 20,
          textAlign: 'center',
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>

        {/* Value */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: 4,
          }}
        >
          {displayValue.toLocaleString()}
          {stat.suffix}
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: 13,
            color: '#888',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {stat.label}
        </div>
      </div>
    </div>
  );
};

interface FeatureBadgeProps {
  feature: {
    text: string;
    color: string;
  };
  frame: number;
  index: number;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ feature, frame, index }) => {
  const delay = 70 + index * 8;
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [delay, delay + 15], [15, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: `${feature.color}15`,
          border: `1px solid ${feature.color}40`,
          color: feature.color,
          padding: '8px 16px',
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 500,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {feature.text}
      </div>
    </div>
  );
};

const GridBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 30], [0, 0.03], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  );
};

const ConnectionLines: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (progress <= 0) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 220,
        left: 32,
        right: 32,
        width: 'calc(100% - 64px)',
        height: 400,
        pointerEvents: 'none',
      }}
    >
      {/* Connecting lines between stats */}
      <line
        x1="25%"
        y1="100"
        x2="75%"
        y2="100"
        stroke="rgba(99, 102, 241, 0.2)"
        strokeWidth="1"
        strokeDasharray="4 4"
        style={{
          strokeDashoffset: interpolate(progress, [0, 1], [100, 0]),
        }}
      />
      <line
        x1="25%"
        y1="250"
        x2="75%"
        y2="250"
        stroke="rgba(99, 102, 241, 0.2)"
        strokeWidth="1"
        strokeDasharray="4 4"
        style={{
          strokeDashoffset: interpolate(progress, [0, 1], [100, 0]),
        }}
      />
      <line
        x1="50%"
        y1="100"
        x2="50%"
        y2="250"
        stroke="rgba(99, 102, 241, 0.2)"
        strokeWidth="1"
        strokeDasharray="4 4"
        style={{
          strokeDashoffset: interpolate(progress, [0, 1], [100, 0]),
        }}
      />
    </svg>
  );
};
