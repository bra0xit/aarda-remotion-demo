import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, Sequence } from 'remotion';
import { HAVEN_VICE_THEME } from '../../themes/haven-vice';

const FRAMES_PER_ITEM = 18; // ~0.6 seconds each - very rapid

// Scene images from the API
const SCENE_IMAGES = {
  neonForge: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/scene/282dac8464c4c5cf55d8b5ecc480ef8d.png',
  southportPrecinct: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/scene/c4d70edb60341070364cf8db4715cc6b.png',
  leosApartment: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/scene/2bd9a674b8519bafdafebbf4fc5c3ac8.png',
  kenjiPawnShop: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/scene/84906ab8b16ebd0ddbd5396cc29f56b4.png',
};

// Project image
const PROJECT_IMAGE = 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/project/d4909de989c88f3ced1e527787cd585b.png';

// Flash sequence - scenes and text only
const FLASH_ITEMS = [
  // Scene
  { type: 'image' as const, url: SCENE_IMAGES.leosApartment, label: "LEO'S PLACE", color: '#00D4FF' },
  // Text
  { type: 'text' as const, text: 'COMING HOME', color: '#00D4FF' },
  // Scene
  { type: 'image' as const, url: SCENE_IMAGES.neonForge, label: 'NEON FORGE', color: '#FF006E' },
  // Text
  { type: 'text' as const, text: 'DEBTS TO PAY', color: '#FF6B35' },
  // Scene
  { type: 'image' as const, url: SCENE_IMAGES.kenjiPawnShop, label: 'PAWN SHOP', color: '#FF6B35' },
  // Text
  { type: 'text' as const, text: 'OLD FLAMES', color: '#BF00FF' },
  // Scene
  { type: 'image' as const, url: SCENE_IMAGES.southportPrecinct, label: 'PRECINCT', color: '#00D4FF' },
  // Text
  { type: 'text' as const, text: 'NEW ENEMIES', color: '#FF3333' },
  // Text
  { type: 'text' as const, text: 'ONE CHANCE', color: '#FFD700' },
  // Final - project image
  { type: 'image' as const, url: PROJECT_IMAGE, label: 'VICE CITY', color: '#FF006E' },
];

/**
 * Rapid-fire story beats / scene flashes
 * Mixing scene images, character images, and text
 */
export const StoryBeatsFlash: React.FC = () => {
  const { colors } = HAVEN_VICE_THEME;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.darkBg }}>
      {FLASH_ITEMS.map((item, index) => (
        <Sequence
          key={index}
          from={index * FRAMES_PER_ITEM}
          durationInFrames={FRAMES_PER_ITEM}
        >
          {item.type === 'text' ? (
            <TextFlash text={item.text} color={item.color} />
          ) : (
            <ImageFlash url={item.url} label={item.label} color={item.color} />
          )}
        </Sequence>
      ))}

      {/* Scanlines overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.12) 2px,
            rgba(0,0,0,0.12) 4px
          )`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

interface TextFlashProps {
  text: string;
  color: string;
}

const TextFlash: React.FC<TextFlashProps> = ({ text, color }) => {
  const frame = useCurrentFrame();
  const { colors } = HAVEN_VICE_THEME;

  // Punch in effect
  const scale = interpolate(
    frame,
    [0, 4, 8],
    [1.5, 1, 1],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Opacity with flash in
  const opacity = interpolate(
    frame,
    [0, 2, FRAMES_PER_ITEM - 2, FRAMES_PER_ITEM],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Flash at start
  const flashOpacity = interpolate(
    frame,
    [0, 4],
    [0.8, 0],
    { extrapolateRight: 'clamp' }
  );

  // Glitch effect
  const glitchX = frame < 5 ? (Math.random() - 0.5) * 40 : 0;

  return (
    <AbsoluteFill>
      {/* Color flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: color,
          opacity: flashOpacity,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}50 0%, transparent 60%)`,
          filter: 'blur(60px)',
          opacity,
        }}
      />

      {/* Text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 700,
            fontFamily: HAVEN_VICE_THEME.fonts.heading,
            color: colors.textPrimary,
            letterSpacing: 6,
            textTransform: 'uppercase',
            transform: `translateX(${glitchX}px) scale(${scale})`,
            textShadow: `
              0 0 30px ${color},
              0 0 60px ${color}80,
              0 0 100px ${color}40
            `,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {text}
        </div>
      </div>

      {/* Vignette */}
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

interface ImageFlashProps {
  url: string;
  label: string;
  color: string;
}

const ImageFlash: React.FC<ImageFlashProps> = ({ url, label, color }) => {
  const frame = useCurrentFrame();
  const { colors } = HAVEN_VICE_THEME;

  // Zoom effect
  const scale = interpolate(
    frame,
    [0, 5, FRAMES_PER_ITEM],
    [1.15, 1.02, 1.08],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Opacity
  const opacity = interpolate(
    frame,
    [0, 2, FRAMES_PER_ITEM - 2, FRAMES_PER_ITEM],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Flash at start
  const flashOpacity = interpolate(
    frame,
    [0, 4],
    [0.8, 0],
    { extrapolateRight: 'clamp' }
  );

  // Label fade
  const labelOpacity = interpolate(
    frame,
    [3, 8],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Glitch
  const glitchX = frame < 4 ? (Math.random() - 0.5) * 25 : 0;

  return (
    <AbsoluteFill>
      {/* Color flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: color,
          opacity: flashOpacity,
          zIndex: 10,
        }}
      />

      {/* Full-screen image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          overflow: 'hidden',
          transform: `translateX(${glitchX}px)`,
        }}
      >
        <Img
          src={url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%',
            transform: `scale(${scale})`,
          }}
        />

        {/* Color tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `${color}25`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Gradient for text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top,
              ${colors.darkBg} 0%,
              ${colors.darkBg}CC 15%,
              transparent 45%,
              ${colors.darkBg}80 100%
            )`,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 220,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: labelOpacity,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            fontFamily: HAVEN_VICE_THEME.fonts.heading,
            color: colors.textPrimary,
            letterSpacing: 6,
            textTransform: 'uppercase',
            textShadow: `
              0 0 30px ${color},
              0 0 60px ${color}80,
              0 4px 15px rgba(0,0,0,0.9)
            `,
          }}
        >
          {label}
        </div>

        {/* Accent line */}
        <div
          style={{
            width: interpolate(frame, [5, 12], [0, 180], { extrapolateRight: 'clamp' }),
            height: 3,
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}`,
            marginTop: 12,
          }}
        />
      </div>

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 180px 60px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
