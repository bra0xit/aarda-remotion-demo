import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { ParticleField } from '../../aarda';
import { THEME } from '../theme';
import { ScreenshotFrame } from '../components/ScreenshotFrame';
import type { WorldBuilderProps } from '../schema';

interface WorldAliveProps {
  screenshots: WorldBuilderProps['screenshots'];
}

interface Beat {
  src: string;
  start: number;
  end: number;
  panDirection?: 'left' | 'right' | 'up' | 'down';
  zoomFrom: number;
  zoomTo: number;
}

export const WorldAlive: React.FC<WorldAliveProps> = ({ screenshots }) => {
  const frame = useCurrentFrame();

  const crossfadeDuration = 8;

  const beats: Beat[] = [
    {
      src: screenshots.storyBeats3Card,
      start: 0,
      end: 40,
      panDirection: 'right',
      zoomFrom: 1.0,
      zoomTo: 1.03,
    },
    {
      src: screenshots.characters,
      start: 40,
      end: 75,
      zoomFrom: 1.0,
      zoomTo: 1.04,
    },
    {
      src: screenshots.knowledgeFull,
      start: 75,
      end: 110,
      panDirection: 'left',
      zoomFrom: 1.0,
      zoomTo: 1.03,
    },
    {
      src: screenshots.landing,
      start: 110,
      end: 150,
      zoomFrom: 1.0,
      zoomTo: 1.02,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg }}>
      <ParticleField count={8} colors={[THEME.colors.particle]} />

      {beats.map((beat, index) => {
        let opacity = 0;

        if (index === 0) {
          opacity = interpolate(
            frame,
            [beat.start, beat.start + 1, beat.end - crossfadeDuration, beat.end],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
        } else if (index === beats.length - 1) {
          opacity = interpolate(
            frame,
            [beat.start - crossfadeDuration, beat.start, beat.end],
            [0, 1, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
        } else {
          opacity = interpolate(
            frame,
            [
              beat.start - crossfadeDuration,
              beat.start,
              beat.end - crossfadeDuration,
              beat.end,
            ],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
        }

        if (opacity <= 0) return null;

        return (
          <AbsoluteFill key={index} style={{ opacity }}>
            <ScreenshotFrame
              src={beat.src}
              panDirection={beat.panDirection}
              zoomFrom={beat.zoomFrom}
              zoomTo={beat.zoomTo}
              borderGlow={false}
              style={{ width: '100%', height: '100%' }}
            />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
