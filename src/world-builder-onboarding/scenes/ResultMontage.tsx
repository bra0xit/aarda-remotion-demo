import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Img,
} from 'remotion';
import { ParticleField } from '../../aarda';
import { THEME } from '../theme';
import { ScreenshotFrame } from '../components/ScreenshotFrame';
import type { WorldBuilderProps } from '../schema';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

interface ResultMontageProps {
  screenshots: WorldBuilderProps['screenshots'];
  hookText: string;
}

export const ResultMontage: React.FC<ResultMontageProps> = ({
  screenshots,
  hookText,
}) => {
  const frame = useCurrentFrame();

  const beats = [
    { src: screenshots.landing, start: 0, end: 35, panDirection: 'right' as const },
    { src: screenshots.characters, start: 35, end: 65, panDirection: 'left' as const },
    { src: screenshots.storyBeatsFull, start: 65, end: 95, panDirection: 'right' as const },
    { src: screenshots.knowledgeZoomed, start: 95, end: 125, panDirection: 'up' as const },
  ];

  const getBeatOpacity = (start: number, end: number): number => {
    const fadeIn = interpolate(frame, [start, start + 5], [0, 1], CLAMP);
    const fadeOut = interpolate(frame, [end - 5, end], [1, 0], CLAMP);
    return Math.min(fadeIn, fadeOut);
  };

  const getBeatTransform = (
    start: number,
    end: number,
    direction: string,
  ): { scale: number; translateX: number } => {
    const progress = interpolate(frame, [start, end], [0, 1], CLAMP);

    if (direction === 'right') {
      return { scale: 1.05 + progress * 0.03, translateX: progress * -30 };
    }
    if (direction === 'left') {
      return { scale: 1.05 + progress * 0.03, translateX: progress * 30 };
    }
    return {
      scale: interpolate(frame, [start, end], [1.1, 1.0], CLAMP),
      translateX: 0,
    };
  };

  const overlayOpacity = interpolate(frame, [125, 130], [0, 1], CLAMP);
  const textOpacity = interpolate(frame, [130, 140], [0, 1], CLAMP);
  const textSlideUp = interpolate(frame, [130, 140], [20, 0], CLAMP);

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg, overflow: 'hidden' }}>
      <ParticleField count={15} colors={[THEME.colors.particle]} />

      {beats.map((beat, i) => {
        if (frame < beat.start - 5 || frame > beat.end + 5) return null;

        const opacity = getBeatOpacity(beat.start, beat.end);
        const { scale, translateX } = getBeatTransform(
          beat.start,
          beat.end,
          beat.panDirection,
        );

        return (
          <AbsoluteFill
            key={i}
            style={{
              opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ScreenshotFrame
              src={beat.src}
              style={{
                width: '92%',
                height: '85%',
                transform: `scale(${scale}) translateX(${translateX}px)`,
              }}
            />
          </AbsoluteFill>
        );
      })}

      {frame >= 125 && (
        <AbsoluteFill style={{ opacity: overlayOpacity }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              filter: 'blur(8px)',
              opacity: 0.4,
            }}
          >
            <Img
              src={screenshots.knowledgeZoomed}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.05)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10, 10, 15, 0.7)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 60,
            }}
          >
            <div
              style={{
                opacity: textOpacity,
                transform: `translateY(${textSlideUp}px)`,
                fontSize: 56,
                fontWeight: 700,
                fontFamily: THEME.fonts.heading,
                color: THEME.colors.text,
                textAlign: 'center',
                lineHeight: 1.3,
                textShadow: `0 0 40px ${THEME.colors.glow}60`,
              }}
            >
              {hookText}
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
