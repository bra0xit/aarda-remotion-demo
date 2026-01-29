import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface CaptionProps {
  text: string;
  enterFrame: number;
  exitFrame: number;
  position?: 'top' | 'center' | 'bottom';
}

export const Caption: React.FC<CaptionProps> = ({
  text,
  enterFrame,
  exitFrame,
  position = 'bottom',
}) => {
  const frame = useCurrentFrame();

  // Fade in
  const fadeIn = interpolate(
    frame,
    [enterFrame, enterFrame + 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Fade out
  const fadeOut = interpolate(
    frame,
    [exitFrame - 10, exitFrame],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Slight slide up on enter
  const translateY = interpolate(
    frame,
    [enterFrame, enterFrame + 15],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { top: 150 },
    center: { top: '50%', transform: `translateY(calc(-50% + ${translateY}px))` },
    bottom: { bottom: 200 },
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        ...positionStyles[position],
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: position !== 'center' ? `translateY(${translateY}px)` : undefined,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: '#fff',
          textAlign: 'center',
          textShadow: `
            0 2px 4px rgba(0,0,0,0.8),
            0 4px 20px rgba(0,0,0,0.5)
          `,
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.02em',
          maxWidth: '80%',
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
    </div>
  );
};
