import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// Emotion bar configuration
const EMOTIONS = [
  { name: 'Joy', color: '#22C55E', value: 0.7 },
  { name: 'Trust', color: '#3B82F6', value: 0.85 },
  { name: 'Sadness', color: '#6366F1', value: 0.3 },
  { name: 'Fear', color: '#EF4444', value: 0.2 },
];

export const CharacterCardTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Morph progress from brick to character card
  const morphProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // Card expansion
  const cardScale = interpolate(morphProgress, [0, 0.5, 1], [0.8, 0.9, 1]);
  const cardWidth = interpolate(morphProgress, [0, 1], [160, 340]);
  const cardHeight = interpolate(morphProgress, [0, 1], [100, 420]);

  // Content fade ins
  const avatarOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' });
  const nameOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: 'clamp' });
  const emotionBarsOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' });

  // Breathing pulse after settled
  const breathe = frame > 80
    ? 1 + Math.sin((frame - 80) * 0.1) * 0.01
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />

      {/* The morphing card */}
      <div
        style={{
          width: cardWidth,
          minHeight: cardHeight,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#1a1a1a',
          boxShadow: `
            0 4px 6px rgba(0, 0, 0, 0.3),
            0 10px 40px rgba(59, 130, 246, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
          transform: `scale(${cardScale * breathe})`,
        }}
      >
        {/* Gradient header - transitions from purple to blue */}
        <div
          style={{
            height: interpolate(morphProgress, [0, 1], [60, 120]),
            background: `linear-gradient(135deg,
              ${interpolate(morphProgress, [0, 1], [0, 1]) > 0.5 ? '#3B82F6' : '#8B5CF6'},
              ${interpolate(morphProgress, [0, 1], [0, 1]) > 0.5 ? '#6366F1' : '#A78BFA'}
            )`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Character Avatar */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
              border: '3px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: avatarOpacity,
              transform: `scale(${interpolate(avatarOpacity, [0, 1], [0.5, 1])})`,
              overflow: 'hidden',
            }}
          >
            {/* Stylized avatar silhouette */}
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle cx="25" cy="18" r="10" fill="#6366F1" />
              <ellipse cx="25" cy="42" rx="16" ry="12" fill="#6366F1" />
            </svg>
          </div>
        </div>

        {/* Character info section */}
        <div style={{ padding: 20 }}>
          {/* Character name */}
          <div
            style={{
              opacity: nameOpacity,
              transform: `translateY(${interpolate(nameOpacity, [0, 1], [10, 0])}px)`,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'Inter, system-ui, sans-serif',
                textAlign: 'center',
                marginBottom: 4,
              }}
            >
              Elena
            </div>
            <div
              style={{
                fontSize: 14,
                color: '#888',
                fontFamily: 'Inter, system-ui, sans-serif',
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              The Wanderer
            </div>
          </div>

          {/* Emotion bars */}
          <div
            style={{
              opacity: emotionBarsOpacity,
              transform: `translateY(${interpolate(emotionBarsOpacity, [0, 1], [15, 0])}px)`,
            }}
          >
            {EMOTIONS.map((emotion, i) => (
              <EmotionBar
                key={emotion.name}
                name={emotion.name}
                color={emotion.color}
                value={emotion.value}
                frame={frame}
                delay={50 + i * 8}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <ParticleField frame={frame} />
    </AbsoluteFill>
  );
};

// Animated emotion bar
interface EmotionBarProps {
  name: string;
  color: string;
  value: number;
  frame: number;
  delay: number;
}

const EmotionBar: React.FC<EmotionBarProps> = ({ name, color, value, frame, delay }) => {
  // Animate bar fill
  const fillProgress = interpolate(
    frame,
    [delay, delay + 25],
    [0, value],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Heartbeat pulse effect after filled
  const pulse = frame > delay + 30
    ? 1 + Math.sin((frame - delay) * 0.15) * 0.03
    : 1;

  return (
    <div style={{ marginBottom: 14 }}>
      {/* Label */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <span style={{ fontSize: 12, color: '#888' }}>{name}</span>
        <span style={{ fontSize: 12, color: color, fontWeight: 500 }}>
          {Math.round(fillProgress * 100)}%
        </span>
      </div>

      {/* Bar track */}
      <div
        style={{
          height: 8,
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* Bar fill */}
        <div
          style={{
            height: '100%',
            width: `${fillProgress * 100}%`,
            backgroundColor: color,
            borderRadius: 4,
            transform: `scaleY(${pulse})`,
            transformOrigin: 'center',
            boxShadow: `0 0 10px ${color}66`,
          }}
        />
      </div>
    </div>
  );
};

// Background particles
const ParticleField: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 61.8) % 100,
    size: 1.5 + (i % 3),
    speed: 0.12 + (i % 5) * 0.04,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: 0.35,
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed) % 110 - 5;
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
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
            }}
          />
        );
      })}
    </div>
  );
};
