import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

export const ConversationView: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Character panel slide in
  const panelSlide = spring({
    frame: frame - 5,
    fps,
    config: { stiffness: 80, damping: 14 },
  });
  const panelX = interpolate(panelSlide, [0, 1], [-200, 0]);

  // Message appear
  const messageOpacity = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: 'clamp' });
  const messageY = interpolate(frame, [40, 55], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Conversation container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Character header panel */}
        <div
          style={{
            padding: '40px 32px',
            background: 'linear-gradient(180deg, rgba(20,20,30,0.98) 0%, rgba(15,15,20,0.95) 100%)',
            borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
            transform: `translateX(${panelX}px)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Character avatar */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
              }}
            >
              <svg width="45" height="45" viewBox="0 0 40 40">
                <circle cx="20" cy="14" r="9" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="20" cy="36" rx="14" ry="11" fill="rgba(255,255,255,0.9)" />
              </svg>
            </div>

            {/* Character info */}
            <div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  marginBottom: 4,
                }}
              >
                Elena, the Wanderer
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: '#888',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#22C55E',
                  }}
                />
                In conversation
              </div>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div
          style={{
            flex: 1,
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 24,
          }}
        >
          {/* Context indicator */}
          <div
            style={{
              alignSelf: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              color: '#A78BFA',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 12,
              fontFamily: 'Inter, system-ui, sans-serif',
              opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            📍 The Fallen Throne Room
          </div>

          {/* Player message */}
          <div
            style={{
              alignSelf: 'flex-end',
              maxWidth: '75%',
              opacity: messageOpacity,
              transform: `translateY(${messageY}px)`,
            }}
          >
            <div
              style={{
                backgroundColor: '#6B5B95',
                color: '#fff',
                padding: '16px 22px',
                borderRadius: '20px 20px 6px 20px',
                fontSize: 18,
                fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: 1.5,
                boxShadow: '0 4px 15px rgba(107, 91, 149, 0.3)',
              }}
            >
              What happened to the kingdom? Why did it fall?
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#666',
                marginTop: 6,
                textAlign: 'right',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Just now
            </div>
          </div>

          {/* Typing indicator (appears at end) */}
          <TypingIndicator frame={frame} startFrame={80} />
        </div>

        {/* Input bar */}
        <InputBar frame={frame} />
      </div>

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// Typing indicator
const TypingIndicator: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], { extrapolateRight: 'clamp' });

  if (opacity <= 0) return null;

  const dot1 = Math.sin((frame - startFrame) * 0.3) > 0 ? 1 : 0.3;
  const dot2 = Math.sin((frame - startFrame) * 0.3 + 1) > 0 ? 1 : 0.3;
  const dot3 = Math.sin((frame - startFrame) * 0.3 + 2) > 0 ? 1 : 0.3;

  return (
    <div
      style={{
        alignSelf: 'flex-start',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity,
      }}
    >
      {/* Mini avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 40 40">
          <circle cx="20" cy="14" r="9" fill="rgba(255,255,255,0.9)" />
          <ellipse cx="20" cy="36" rx="14" ry="11" fill="rgba(255,255,255,0.9)" />
        </svg>
      </div>

      {/* Dots */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '14px 20px',
          borderRadius: '20px 20px 20px 6px',
          display: 'flex',
          gap: 6,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#888', opacity: dot1 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#888', opacity: dot2 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#888', opacity: dot3 }} />
      </div>
    </div>
  );
};

// Input bar at bottom
const InputBar: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        padding: '20px 32px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 28,
          padding: '14px 20px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 16,
            color: '#666',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Ask Elena anything...
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#6B5B95',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
