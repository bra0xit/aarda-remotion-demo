import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// The AI response text (streams in word by word)
const RESPONSE_TEXT = `The kingdom fell not from war or famine, but from a single choice. The last Guardian—my mentor—discovered a truth so dangerous that speaking it would shatter everything we believed. She chose silence. And in that silence, the kingdom crumbled from within.`;

export const StreamingResponseWithTriggers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate how many words to show
  const words = RESPONSE_TEXT.split(' ');
  const wordsPerSecond = 4; // Streaming speed
  const wordsToShow = Math.floor((frame / 30) * wordsPerSecond);
  const displayedText = words.slice(0, Math.min(wordsToShow, words.length)).join(' ');
  const isStreaming = wordsToShow < words.length;

  // Trigger detection happens at frame 50 (when "kingdom" is mentioned)
  const triggerFrame = 50;
  const triggerActive = frame >= triggerFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Main conversation area */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Character header (simplified) */}
        <CharacterHeader />

        {/* Chat area */}
        <div
          style={{
            flex: 1,
            padding: '30px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            overflow: 'hidden',
          }}
        >
          {/* Player's original message (small, faded) */}
          <div
            style={{
              alignSelf: 'flex-end',
              maxWidth: '70%',
              opacity: 0.6,
            }}
          >
            <div
              style={{
                backgroundColor: '#6B5B95',
                color: '#fff',
                padding: '12px 18px',
                borderRadius: '16px 16px 4px 16px',
                fontSize: 15,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              What happened to the kingdom?
            </div>
          </div>

          {/* AI Response (streaming) */}
          <div
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              gap: 12,
              maxWidth: '85%',
            }}
          >
            {/* Mini avatar */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 40 40">
                <circle cx="20" cy="14" r="9" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="20" cy="36" rx="14" ry="11" fill="rgba(255,255,255,0.9)" />
              </svg>
            </div>

            {/* Message bubble */}
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: '16px 20px',
                borderRadius: '20px 20px 20px 6px',
                fontSize: 17,
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#e0e0e0',
                lineHeight: 1.6,
              }}
            >
              {displayedText}
              {isStreaming && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: 20,
                    backgroundColor: '#A78BFA',
                    marginLeft: 4,
                    opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0.3,
                    verticalAlign: 'text-bottom',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trigger Detection Panel */}
      <TriggerPanel frame={frame} triggerFrame={triggerFrame} fps={fps} />

      {/* Topic highlight glow when trigger fires */}
      {triggerActive && (
        <div
          style={{
            position: 'absolute',
            bottom: 400,
            left: 100,
            width: 200,
            height: 100,
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
            opacity: interpolate(frame - triggerFrame, [0, 15, 40], [0, 1, 0.5], { extrapolateRight: 'clamp' }),
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// Simplified character header
const CharacterHeader: React.FC = () => (
  <div
    style={{
      padding: '24px 32px',
      background: 'linear-gradient(180deg, rgba(20,20,30,0.95) 0%, rgba(15,15,20,0.9) 100%)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}
  >
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 40 40">
        <circle cx="20" cy="14" r="9" fill="rgba(255,255,255,0.9)" />
        <ellipse cx="20" cy="36" rx="14" ry="11" fill="rgba(255,255,255,0.9)" />
      </svg>
    </div>
    <div>
      <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
        Elena, the Wanderer
      </div>
      <div style={{ fontSize: 12, color: '#22C55E', fontFamily: 'Inter, system-ui, sans-serif' }}>
        Responding...
      </div>
    </div>
  </div>
);

// Trigger detection panel that slides in
interface TriggerPanelProps {
  frame: number;
  triggerFrame: number;
  fps: number;
}

const TriggerPanel: React.FC<TriggerPanelProps> = ({ frame, triggerFrame, fps }) => {
  const isActive = frame >= triggerFrame;

  const slideSpring = spring({
    frame: frame - triggerFrame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const slideY = interpolate(slideSpring, [0, 1], [200, 0]);
  const opacity = interpolate(slideSpring, [0, 0.3, 1], [0, 1, 1]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 120,
        left: 32,
        right: 32,
        transform: `translateY(${slideY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(20, 25, 20, 0.95)',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          borderRadius: 16,
          padding: 20,
          boxShadow: '0 10px 40px rgba(34, 197, 94, 0.15)',
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
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 14 }}>⚡</span>
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#22C55E',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Trigger Detected
          </span>
        </div>

        {/* Trigger details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Topic matched */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, system-ui, sans-serif', width: 80 }}>
              Topic:
            </span>
            <div
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                color: '#4ADE80',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
              }}
            >
              "the kingdom"
            </div>
            <MatchBadge frame={frame} triggerFrame={triggerFrame} />
          </div>

          {/* Trigger name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, system-ui, sans-serif', width: 80 }}>
              Trigger:
            </span>
            <span style={{ fontSize: 14, color: '#e0e0e0', fontFamily: 'Inter, system-ui, sans-serif' }}>
              Kingdom History Inquiry
            </span>
          </div>

          {/* Effect */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, system-ui, sans-serif', width: 80 }}>
              Effect:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <EffectTag icon="📚" text="Reveal: The Guardian's Choice" frame={frame} delay={triggerFrame + 15} />
              <EffectTag icon="🎯" text="Unlock: New objective" frame={frame} delay={triggerFrame + 25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Match percentage badge
const MatchBadge: React.FC<{ frame: number; triggerFrame: number }> = ({ frame, triggerFrame }) => {
  const progress = interpolate(
    frame - triggerFrame,
    [5, 20],
    [0, 94],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        color: '#22C55E',
        padding: '4px 10px',
        borderRadius: 6,
        fontSize: 12,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 600,
      }}
    >
      {Math.round(progress)}% match
    </div>
  );
};

// Effect tag
const EffectTag: React.FC<{ icon: string; text: string; frame: number; delay: number }> = ({
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
        gap: 8,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 13, color: '#A78BFA', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {text}
      </span>
    </div>
  );
};
