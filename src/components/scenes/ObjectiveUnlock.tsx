import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

/**
 * Scene 3.3: Objective Unlock
 * Shows an objective completing based on the conversation,
 * then a new objective/story path unlocking with ripple effects.
 */
export const ObjectiveUnlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background subtle gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
        }}
      />

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
            fontSize: 14,
            color: '#A78BFA',
            fontFamily: 'Inter, system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 2,
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          Objectives
        </div>
      </div>

      {/* Main objectives area */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: 32,
          right: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Completing objective */}
        <CompletingObjective frame={frame} fps={fps} />

        {/* New objective unlocking */}
        <UnlockingObjective frame={frame} fps={fps} />

        {/* Story path unlock */}
        <StoryPathUnlock frame={frame} fps={fps} />
      </div>

      {/* Ripple effects panel */}
      <RippleEffectsPanel frame={frame} fps={fps} />

      {/* Success particles */}
      <SuccessParticles frame={frame} />
    </AbsoluteFill>
  );
};

// Objective that completes with checkmark animation
const CompletingObjective: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const completeFrame = 30;
  const isCompleting = frame >= completeFrame;

  const checkSpring = spring({
    frame: frame - completeFrame,
    fps,
    config: { stiffness: 200, damping: 12 },
  });

  const cardOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: 'clamp' });
  const cardY = interpolate(frame, [5, 20], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const glowIntensity = isCompleting
    ? interpolate(frame - completeFrame, [0, 20, 50], [0, 1, 0.3], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: isCompleting ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isCompleting ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 16,
          padding: 20,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Completion glow */}
        {isCompleting && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
              opacity: glowIntensity,
            }}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative' }}>
          {/* Checkbox area */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: isCompleting ? '#22C55E' : 'rgba(255,255,255,0.1)',
              border: `2px solid ${isCompleting ? '#22C55E' : 'rgba(255,255,255,0.2)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {isCompleting && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: `scale(${checkSpring})`,
                  opacity: checkSpring,
                }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: isCompleting ? '#4ADE80' : '#e0e0e0',
                fontFamily: 'Inter, system-ui, sans-serif',
                marginBottom: 6,
                textDecoration: isCompleting ? 'line-through' : 'none',
                textDecorationColor: 'rgba(74, 222, 128, 0.5)',
              }}
            >
              Discover the Kingdom's Fate
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#888',
                fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: 1.5,
              }}
            >
              Ask Elena about what happened to the kingdom
            </div>

            {/* Condition met indicator */}
            {isCompleting && (
              <div
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  opacity: interpolate(frame - completeFrame, [10, 25], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                <span style={{ fontSize: 12, color: '#22C55E' }}>✓</span>
                <span style={{ fontSize: 12, color: '#22C55E', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Condition met: Conversed about "the kingdom"
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// New objective that unlocks
const UnlockingObjective: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const unlockFrame = 60;
  const isUnlocking = frame >= unlockFrame;

  const slideSpring = spring({
    frame: frame - unlockFrame,
    fps,
    config: { stiffness: 100, damping: 14 },
  });

  const slideX = interpolate(slideSpring, [0, 1], [100, 0]);
  const opacity = interpolate(slideSpring, [0, 0.3, 1], [0, 1, 1]);

  if (!isUnlocking) return null;

  return (
    <div
      style={{
        transform: `translateX(${slideX}px)`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 16,
          padding: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* New badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: '#A78BFA',
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'Inter, system-ui, sans-serif',
            padding: '4px 10px',
            borderRadius: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          New
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          {/* Checkbox */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              border: '2px solid rgba(139, 92, 246, 0.4)',
              flexShrink: 0,
            }}
          />

          {/* Content */}
          <div style={{ flex: 1, paddingRight: 50 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#e0e0e0',
                fontFamily: 'Inter, system-ui, sans-serif',
                marginBottom: 6,
              }}
            >
              Uncover the Guardian's Secret
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#888',
                fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: 1.5,
              }}
            >
              Learn what truth the last Guardian discovered
            </div>

            {/* Requirements */}
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                opacity: interpolate(frame - unlockFrame, [20, 35], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <RequirementTag text="Visit: The Guardian's Tower" />
              <RequirementTag text="Find: Hidden Scrolls" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Requirement tag
const RequirementTag: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
      }}
    />
    <span style={{ fontSize: 12, color: '#A78BFA', fontFamily: 'Inter, system-ui, sans-serif' }}>{text}</span>
  </div>
);

// Story path unlock notification
const StoryPathUnlock: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const unlockFrame = 85;
  const isUnlocking = frame >= unlockFrame;

  const scaleSpring = spring({
    frame: frame - unlockFrame,
    fps,
    config: { stiffness: 150, damping: 12 },
  });

  if (!isUnlocking) return null;

  return (
    <div
      style={{
        transform: `scale(${scaleSpring})`,
        opacity: scaleSpring,
        transformOrigin: 'center',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
          border: '1px solid rgba(251, 191, 36, 0.4)',
          borderRadius: 16,
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 24 }}>🔓</span>
        </div>

        {/* Content */}
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#FBBF24',
              fontFamily: 'Inter, system-ui, sans-serif',
              marginBottom: 4,
            }}
          >
            Story Path Unlocked
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#e0e0e0',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            "The Guardian's Choice" - Chapter 2
          </div>
        </div>
      </div>
    </div>
  );
};

// Panel showing ripple effects
const RippleEffectsPanel: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const showFrame = 95;
  const isShowing = frame >= showFrame;

  const slideSpring = spring({
    frame: frame - showFrame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const slideY = interpolate(slideSpring, [0, 1], [150, 0]);
  const opacity = interpolate(slideSpring, [0, 0.3, 1], [0, 1, 1]);

  if (!isShowing) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 100,
        left: 32,
        right: 32,
        transform: `translateY(${slideY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(20, 25, 30, 0.95)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 16,
          padding: 20,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 12 }}>⚡</span>
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#3B82F6',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Effects Triggered
          </span>
        </div>

        {/* Effects list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EffectItem
            icon="📚"
            text="Knowledge revealed: The Guardian's Choice"
            frame={frame}
            delay={showFrame + 10}
          />
          <EffectItem
            icon="🗺️"
            text="Location unlocked: The Guardian's Tower"
            frame={frame}
            delay={showFrame + 20}
          />
          <EffectItem
            icon="👤"
            text="Character memory updated: Elena knows you're curious"
            frame={frame}
            delay={showFrame + 30}
          />
        </div>
      </div>
    </div>
  );
};

// Individual effect item
const EffectItem: React.FC<{ icon: string; text: string; frame: number; delay: number }> = ({
  icon,
  text,
  frame,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });
  const x = interpolate(frame, [delay, delay + 10], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 13, color: '#e0e0e0', fontFamily: 'Inter, system-ui, sans-serif' }}>{text}</span>
    </div>
  );
};

// Success particles floating up
const SuccessParticles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = [
    { x: 100, delay: 35, duration: 60 },
    { x: 200, delay: 40, duration: 55 },
    { x: 300, delay: 38, duration: 65 },
    { x: 400, delay: 45, duration: 50 },
    { x: 500, delay: 42, duration: 58 },
    { x: 600, delay: 50, duration: 52 },
    { x: 700, delay: 48, duration: 62 },
    { x: 800, delay: 55, duration: 48 },
  ];

  return (
    <>
      {particles.map((p, i) => {
        const particleFrame = frame - p.delay;
        if (particleFrame < 0 || particleFrame > p.duration) return null;

        const y = interpolate(particleFrame, [0, p.duration], [800, 200]);
        const opacity = interpolate(particleFrame, [0, 10, p.duration - 15, p.duration], [0, 0.8, 0.8, 0]);
        const scale = interpolate(particleFrame, [0, 20], [0.5, 1], { extrapolateRight: 'clamp' });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: y,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#22C55E' : '#A78BFA',
              opacity,
              transform: `scale(${scale})`,
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#22C55E' : '#A78BFA'}`,
            }}
          />
        );
      })}
    </>
  );
};
