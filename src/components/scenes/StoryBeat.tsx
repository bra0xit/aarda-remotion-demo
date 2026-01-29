import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// Story objectives
const OBJECTIVES = [
  { text: 'Find the hidden entrance', completed: true, delay: 40 },
  { text: 'Speak with the Guardian', completed: false, delay: 50 },
  { text: 'Recover the ancient relic', completed: false, delay: 60 },
];

export const StoryBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card slide in from right
  const slideProgress = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 80, damping: 15 },
  });

  const cardX = interpolate(slideProgress, [0, 1], [400, 0]);
  const cardOpacity = interpolate(slideProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background - dimmed scene view */}
      <SceneBackgroundDimmed frame={frame} />

      {/* Story Beat Card */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 60,
          transform: `translateY(-50%) translateX(${cardX}px)`,
          opacity: cardOpacity,
          width: 380,
        }}
      >
        {/* Card container */}
        <div
          style={{
            backgroundColor: 'rgba(20, 20, 30, 0.95)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: `
              0 10px 40px rgba(0,0,0,0.5),
              0 0 0 1px rgba(139, 92, 246, 0.2),
              0 0 60px rgba(139, 92, 246, 0.1)
            `,
          }}
        >
          {/* Header with gradient */}
          <div
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
              padding: '20px 24px',
              position: 'relative',
            }}
          >
            {/* Chapter badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '4px 10px',
                borderRadius: 12,
                fontSize: 11,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              <span>📖</span>
              <span>STORY BEAT</span>
            </div>

            {/* Chapter title */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'Inter, system-ui, sans-serif',
                marginBottom: 6,
              }}
            >
              Chapter 3: The Crossing
            </div>

            {/* Progress indicator */}
            <ProgressIndicator frame={frame} current={3} total={7} />
          </div>

          {/* Objectives section */}
          <div style={{ padding: 24 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#888',
                fontFamily: 'Inter, system-ui, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              Objectives
            </div>

            {/* Objective items */}
            {OBJECTIVES.map((obj, i) => (
              <ObjectiveItem
                key={i}
                text={obj.text}
                completed={obj.completed}
                delay={obj.delay}
                frame={frame}
                fps={fps}
              />
            ))}
          </div>

          {/* Footer hint */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#22C55E',
                animation: 'pulse 2s infinite',
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: '#888',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Story adapts to your choices
            </span>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '30%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          opacity: cardOpacity,
        }}
      />
    </AbsoluteFill>
  );
};

// Progress dots/bar
const ProgressIndicator: React.FC<{ frame: number; current: number; total: number }> = ({
  frame,
  current,
  total,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current - 1;

        return (
          <div
            key={i}
            style={{
              width: isCurrent ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: isCompleted
                ? 'rgba(255,255,255,0.9)'
                : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s',
            }}
          />
        );
      })}
      <span
        style={{
          marginLeft: 8,
          fontSize: 12,
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {current}/{total}
      </span>
    </div>
  );
};

// Individual objective item with checkbox
interface ObjectiveItemProps {
  text: string;
  completed: boolean;
  delay: number;
  frame: number;
  fps: number;
}

const ObjectiveItem: React.FC<ObjectiveItemProps> = ({
  text,
  completed,
  delay,
  frame,
  fps,
}) => {
  // Fade in
  const fadeOpacity = interpolate(
    frame,
    [delay, delay + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const slideX = interpolate(
    frame,
    [delay, delay + 15],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Checkbox animation for completed items
  const checkProgress = completed
    ? interpolate(frame, [delay + 10, delay + 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 14,
        opacity: fadeOpacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `2px solid ${completed ? '#22C55E' : '#4a4a6a'}`,
          backgroundColor: completed ? '#22C55E' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 1,
          transition: 'all 0.3s',
        }}
      >
        {completed && checkProgress > 0 && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            style={{
              transform: `scale(${checkProgress})`,
            }}
          >
            <path
              d="M 2 7 L 5 10 L 12 3"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="20"
              strokeDashoffset={20 * (1 - checkProgress)}
            />
          </svg>
        )}
      </div>

      {/* Text */}
      <span
        style={{
          fontSize: 15,
          color: completed ? '#888' : '#fff',
          fontFamily: 'Inter, system-ui, sans-serif',
          textDecoration: completed ? 'line-through' : 'none',
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Dimmed scene background
const SceneBackgroundDimmed: React.FC<{ frame: number }> = ({ frame }) => {
  const dimOpacity = interpolate(frame, [0, 20], [0, 0.7], { extrapolateRight: 'clamp' });

  return (
    <>
      {/* Simple scene representation */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
        }}
      >
        {/* Simplified pillars */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            top: 200,
            width: 60,
            height: 800,
            backgroundColor: '#252545',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 200,
            width: 60,
            height: 800,
            backgroundColor: '#252545',
            opacity: 0.5,
          }}
        />

        {/* Character indicators */}
        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 1100,
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: '#3a3a5a',
            border: '2px solid #6B5B95',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 500,
            top: 1150,
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#3a3a5a',
          }}
        />
      </div>

      {/* Dim overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          opacity: dimOpacity,
        }}
      />
    </>
  );
};
