import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, Sequence } from 'remotion';
import { HAVEN_VICE_THEME, HAVEN_VICE_CHARACTERS } from '../../themes/haven-vice';

const FRAMES_PER_CHARACTER = 60; // 2 seconds each - fast pace

/**
 * Scene 2: Character Flash Montage (6-22 seconds = 480 frames)
 * Rapid-fire character reveals with portraits, names, and taglines
 */
export const CharacterMontage: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: HAVEN_VICE_THEME.colors.darkBg }}>
      {HAVEN_VICE_CHARACTERS.map((character, index) => (
        <Sequence
          key={character.id}
          from={index * FRAMES_PER_CHARACTER}
          durationInFrames={FRAMES_PER_CHARACTER}
        >
          <CharacterCard character={character} index={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

interface CharacterCardProps {
  character: typeof HAVEN_VICE_CHARACTERS[0];
  index: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, index }) => {
  const frame = useCurrentFrame();
  const { colors } = HAVEN_VICE_THEME;

  // Fast slide in from alternating sides
  const slideFrom = index % 2 === 0 ? -150 : 150;
  const slideProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const slideX = interpolate(slideProgress, [0, 1], [slideFrom, 0]);

  // Fade out at end (faster)
  const fadeOut = interpolate(frame, [48, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Image reveal - starts zoomed and settles
  const imageScale = interpolate(frame, [0, 15], [1.15, 1.02], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const imageOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Text reveals (faster, staggered)
  const nameOpacity = interpolate(frame, [8, 18], [0, 1], { extrapolateRight: 'clamp' });
  const roleOpacity = interpolate(frame, [14, 24], [0, 1], { extrapolateRight: 'clamp' });

  // Glitch effect on entrance
  const glitchX = frame < 10 && Math.random() > 0.6
    ? (Math.random() - 0.5) * 25
    : 0;

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        transform: `translateX(${slideX + glitchX}px)`,
      }}
    >
      {/* Full-screen character image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: imageOpacity,
          overflow: 'hidden',
        }}
      >
        <Img
          src={character.image_url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            transform: `scale(${imageScale})`,
          }}
        />
        {/* Dark gradient overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top,
              ${colors.darkBg} 0%,
              ${colors.darkBg}CC 15%,
              transparent 50%,
              ${colors.darkBg}80 100%
            )`,
          }}
        />
        {/* Color tint overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `${character.accentColor}15`,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Accent glow behind text */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: 600,
          height: 300,
          background: `radial-gradient(ellipse, ${character.accentColor}40 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Character info - positioned at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 40px',
        }}
      >
        {/* Name - bigger, bolder */}
        <div
          style={{
            opacity: nameOpacity,
            fontSize: 64,
            fontWeight: 700,
            fontFamily: HAVEN_VICE_THEME.fonts.heading,
            color: colors.textPrimary,
            letterSpacing: 6,
            textTransform: 'uppercase',
            textShadow: `
              0 0 40px ${character.accentColor},
              0 0 80px ${character.accentColor}80,
              0 4px 20px rgba(0,0,0,0.8)
            `,
            transform: `translateY(${interpolate(nameOpacity, [0, 1], [30, 0])}px)`,
            textAlign: 'center',
          }}
        >
          {character.name}
        </div>

        {/* Role - accent colored */}
        <div
          style={{
            opacity: roleOpacity,
            fontSize: 32,
            fontWeight: 600,
            fontFamily: HAVEN_VICE_THEME.fonts.body,
            color: character.accentColor,
            letterSpacing: 3,
            marginTop: 16,
            textTransform: 'uppercase',
            textShadow: `0 0 30px ${character.accentColor}, 0 2px 10px rgba(0,0,0,0.8)`,
            transform: `translateY(${interpolate(roleOpacity, [0, 1], [20, 0])}px)`,
          }}
        >
          {character.role}
        </div>
      </div>

      {/* Accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: '50%',
          transform: 'translateX(-50%)',
          width: interpolate(frame, [12, 30], [0, 300], { extrapolateRight: 'clamp' }),
          height: 4,
          backgroundColor: character.accentColor,
          boxShadow: `0 0 30px ${character.accentColor}`,
        }}
      />

      {/* Scanline effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.15) 3px,
            rgba(0,0,0,0.15) 6px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 150px 50px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
