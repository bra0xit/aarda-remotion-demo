import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { HAVEN_VICE_THEME, HAVEN_VICE_LORE } from '../../themes/haven-vice';

/**
 * Scene 3: The Story Hook (22-32 seconds = 300 frames)
 * Lore text reveals over dark atmospheric background
 */
export const StoryHookScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: HAVEN_VICE_THEME.colors.darkBg }}>
      {/* Background atmosphere */}
      <AtmosphericBackground frame={frame} />

      {/* Lore text reveals */}
      <LoreTextReveals />
    </AbsoluteFill>
  );
};

const AtmosphericBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const { colors } = HAVEN_VICE_THEME;

  // Slow pulsing glow
  const pulseIntensity = 0.3 + Math.sin(frame * 0.03) * 0.1;

  return (
    <>
      {/* City silhouette at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 400,
          background: `linear-gradient(to top, ${colors.darkBg} 0%, transparent 100%)`,
        }}
      />

      {/* Neon glow - pink */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: '20%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonPink}25 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: pulseIntensity,
        }}
      />

      {/* Neon glow - cyan */}
      <div
        style={{
          position: 'absolute',
          bottom: 300,
          right: '15%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonCyan}20 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: pulseIntensity * 0.8,
        }}
      />

      {/* Neon glow - orange top */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonOrange}15 0%, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: pulseIntensity * 0.6,
        }}
      />

      {/* Rain effect - subtle vertical lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 20px,
            ${colors.neonCyan}20 20px,
            ${colors.neonCyan}20 21px
          )`,
          transform: `translateY(${(frame * 15) % 100}px)`,
        }}
      />
    </>
  );
};

const LoreTextReveals: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = HAVEN_VICE_THEME;

  const textTimings = [
    { text: HAVEN_VICE_LORE[0], start: 0, end: 70 },   // "After 5 years in prison..."
    { text: HAVEN_VICE_LORE[1], start: 60, end: 140 }, // "Leo Cruz returns..."
    { text: HAVEN_VICE_LORE[2], start: 130, end: 220 }, // "Rival gangs..."
    { text: HAVEN_VICE_LORE[3], start: 210, end: 300 }, // "The streets remember..."
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
      }}
    >
      {textTimings.map((item, index) => {
        const fadeIn = interpolate(
          frame,
          [item.start, item.start + 20],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const fadeOut = interpolate(
          frame,
          [item.end - 20, item.end],
          [1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const opacity = Math.min(fadeIn, fadeOut);

        const translateY = interpolate(fadeIn, [0, 1], [30, 0]);

        // Typewriter effect
        const revealProgress = interpolate(
          frame,
          [item.start, item.start + 40],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const visibleChars = Math.floor(item.text.length * revealProgress);
        const displayText = item.text.substring(0, visibleChars);

        if (opacity <= 0) return null;

        // Different styling for emphasis lines
        const isEmphasis = index === 1; // "Leo Cruz returns..."
        const fontSize = isEmphasis ? 52 : 38;
        const color = isEmphasis ? colors.neonPink : colors.textPrimary;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              opacity,
              fontSize,
              fontWeight: isEmphasis ? 700 : 400,
              fontFamily: HAVEN_VICE_THEME.fonts.body,
              color,
              textAlign: 'center',
              letterSpacing: 2,
              lineHeight: 1.4,
              transform: `translateY(${translateY}px)`,
              textShadow: isEmphasis ? `0 0 40px ${colors.neonPink}80` : 'none',
            }}
          >
            {displayText}
            {/* Blinking cursor */}
            {revealProgress < 1 && (
              <span
                style={{
                  opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                  color: colors.neonCyan,
                }}
              >
                |
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

