import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

/**
 * Scene 4.1: Quote Carousel
 * Shows testimonials/quotes from users with smooth transitions.
 */

const QUOTES = [
  {
    text: "Finally, characters that actually remember our conversations.",
    author: "Sarah K.",
    role: "World Builder",
    avatar: "S",
  },
  {
    text: "The trigger system changed how I think about interactive storytelling.",
    author: "Marcus T.",
    role: "Game Designer",
    avatar: "M",
  },
  {
    text: "My players are genuinely invested in the characters I've created.",
    author: "Elena R.",
    role: "DM & Creator",
    avatar: "E",
  },
];

export const QuoteCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each quote gets ~40 frames (with overlap for transitions)
  const activeQuoteIndex = Math.min(Math.floor(frame / 40), QUOTES.length - 1);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: '#A78BFA',
            fontFamily: 'Inter, system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 12,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          What Creators Are Saying
        </div>
      </div>

      {/* Quote cards */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 32,
          right: 32,
          bottom: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {QUOTES.map((quote, index) => (
          <QuoteCard
            key={index}
            quote={quote}
            frame={frame}
            fps={fps}
            index={index}
            isActive={index === activeQuoteIndex}
            startFrame={index * 40}
          />
        ))}
      </div>

      {/* Dots indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 250,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        {QUOTES.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === activeQuoteIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === activeQuoteIndex ? '#A78BFA' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Decorative quote marks */}
      <QuoteDecoration frame={frame} />
    </AbsoluteFill>
  );
};

interface QuoteCardProps {
  quote: {
    text: string;
    author: string;
    role: string;
    avatar: string;
  };
  frame: number;
  fps: number;
  index: number;
  isActive: boolean;
  startFrame: number;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, frame, fps, index, isActive, startFrame }) => {
  const localFrame = frame - startFrame;

  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const exitSpring = spring({
    frame: localFrame - 35,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  // Entrance animation
  const enterX = interpolate(enterSpring, [0, 1], [100, 0]);
  const enterOpacity = interpolate(enterSpring, [0, 0.5, 1], [0, 1, 1]);

  // Exit animation (only for non-last quotes)
  const exitX = index < QUOTES.length - 1 ? interpolate(exitSpring, [0, 1], [0, -100]) : 0;
  const exitOpacity = index < QUOTES.length - 1 ? interpolate(exitSpring, [0, 0.5, 1], [1, 1, 0]) : 1;

  // Combined transform
  const x = localFrame < 35 ? enterX : exitX;
  const opacity = localFrame < 35 ? enterOpacity : exitOpacity;

  if (localFrame < 0 || (index < QUOTES.length - 1 && localFrame > 50)) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        transform: `translateX(${x}px)`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: 24,
          padding: 32,
          textAlign: 'center',
        }}
      >
        {/* Quote text */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          "{quote.text}"
        </div>

        {/* Author info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1, #A78BFA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 600,
              color: '#fff',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {quote.avatar}
          </div>

          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#e0e0e0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {quote.author}
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#888',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {quote.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuoteDecoration: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [10, 30], [0, 0.1], { extrapolateRight: 'clamp' });

  return (
    <>
      {/* Top left quote mark */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 40,
          fontSize: 120,
          fontFamily: 'Georgia, serif',
          color: '#A78BFA',
          opacity,
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* Bottom right quote mark */}
      <div
        style={{
          position: 'absolute',
          bottom: 320,
          right: 40,
          fontSize: 120,
          fontFamily: 'Georgia, serif',
          color: '#A78BFA',
          opacity,
          lineHeight: 1,
          transform: 'rotate(180deg)',
        }}
      >
        "
      </div>
    </>
  );
};
