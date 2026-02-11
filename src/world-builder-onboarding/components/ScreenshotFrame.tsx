import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Img } from 'remotion';
import { THEME } from '../theme';

interface ScreenshotFrameProps {
  src: string;
  panDirection?: 'left' | 'right' | 'up' | 'down';
  zoomFrom?: number;
  zoomTo?: number;
  borderGlow?: boolean;
  style?: React.CSSProperties;
}

export const ScreenshotFrame: React.FC<ScreenshotFrameProps> = ({
  src,
  panDirection = 'left',
  zoomFrom = 1.0,
  zoomTo = 1.05,
  borderGlow = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(
    frame,
    [0, durationInFrames],
    [zoomFrom, zoomTo],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const panProgress = interpolate(
    frame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const getObjectPosition = (): string => {
    switch (panDirection) {
      case 'left': {
        const x = interpolate(panProgress, [0, 1], [40, 60]);
        return `${x}% center`;
      }
      case 'right': {
        const x = interpolate(panProgress, [0, 1], [60, 40]);
        return `${x}% center`;
      }
      case 'up': {
        const y = interpolate(panProgress, [0, 1], [60, 40]);
        return `center ${y}%`;
      }
      case 'down': {
        const y = interpolate(panProgress, [0, 1], [40, 60]);
        return `center ${y}%`;
      }
      default:
        return 'center center';
    }
  };

  const containerStyle: React.CSSProperties = {
    overflow: 'hidden',
    borderRadius: 8,
    position: 'relative',
    width: '100%',
    height: '100%',
    ...(borderGlow
      ? {
          border: `1px solid ${THEME.colors.primary}`,
          boxShadow: `0 0 20px ${THEME.colors.primary}40, 0 0 40px ${THEME.colors.primary}20`,
        }
      : {}),
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: getObjectPosition(),
    transform: `scale(${zoom})`,
    transformOrigin: 'center center',
  };

  return (
    <div style={containerStyle}>
      <Img src={src} style={imageStyle} />
    </div>
  );
};
