import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

export const ScreenFracture: React.FC = () => {
  const frame = useCurrentFrame();

  // Fracture animation phases
  const crackProgress = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const shatterProgress = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  const fadeToBlack = interpolate(frame, [35, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Screen shake during crack
  const shakeIntensity = interpolate(frame, [0, 10, 20], [0, 8, 0], {
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 2) * shakeIntensity;
  const shakeY = Math.cos(frame * 2.5) * shakeIntensity;

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
      {/* Previous content (frozen frame) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#2a2a2a',
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        {/* Simplified representation of previous chaos */}
        <div style={{ opacity: 0.5, padding: 100 }}>
          <div style={{
            width: 400,
            height: 300,
            backgroundColor: '#3a3a3a',
            borderRadius: 8,
            margin: '100px auto',
          }} />
        </div>
      </div>

      {/* Crack lines SVG */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
        viewBox="0 0 1080 1920"
      >
        {/* Main crack from center */}
        <CrackLine
          d="M 540 960 L 540 400 L 300 100"
          progress={crackProgress}
          delay={0}
        />
        <CrackLine
          d="M 540 960 L 800 600 L 1000 300"
          progress={crackProgress}
          delay={0.1}
        />
        <CrackLine
          d="M 540 960 L 200 1200 L 50 1500"
          progress={crackProgress}
          delay={0.15}
        />
        <CrackLine
          d="M 540 960 L 900 1100 L 1050 1400"
          progress={crackProgress}
          delay={0.2}
        />
        <CrackLine
          d="M 540 960 L 540 1400 L 600 1800"
          progress={crackProgress}
          delay={0.1}
        />

        {/* Secondary cracks */}
        <CrackLine
          d="M 540 600 L 350 550 L 150 600"
          progress={crackProgress}
          delay={0.3}
        />
        <CrackLine
          d="M 700 800 L 850 750 L 950 850"
          progress={crackProgress}
          delay={0.35}
        />
      </svg>

      {/* Shatter fragments */}
      {shatterProgress > 0 && (
        <ShatterFragments progress={shatterProgress} />
      )}

      {/* Fade to black overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000',
          opacity: fadeToBlack,
        }}
      />
    </AbsoluteFill>
  );
};

// Animated crack line
const CrackLine: React.FC<{
  d: string;
  progress: number;
  delay: number;
}> = ({ d, progress, delay }) => {
  const adjustedProgress = interpolate(
    progress,
    [delay, delay + 0.5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <path
      d={d}
      fill="none"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="2000"
      strokeDashoffset={2000 * (1 - adjustedProgress)}
      style={{
        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
      }}
    />
  );
};

// Shattering fragments
const ShatterFragments: React.FC<{ progress: number }> = ({ progress }) => {
  const fragments = [
    { x: 300, y: 400, size: 150, angle: -30, velocity: { x: -200, y: -300 } },
    { x: 700, y: 350, size: 120, angle: 25, velocity: { x: 250, y: -250 } },
    { x: 250, y: 800, size: 180, angle: -15, velocity: { x: -300, y: 200 } },
    { x: 800, y: 750, size: 140, angle: 35, velocity: { x: 280, y: 150 } },
    { x: 500, y: 600, size: 100, angle: 10, velocity: { x: -50, y: -400 } },
    { x: 600, y: 1100, size: 160, angle: -20, velocity: { x: 100, y: 300 } },
    { x: 400, y: 1200, size: 130, angle: 15, velocity: { x: -150, y: 350 } },
  ];

  return (
    <>
      {fragments.map((frag, i) => {
        const x = frag.x + frag.velocity.x * progress;
        const y = frag.y + frag.velocity.y * progress + 500 * progress * progress; // gravity
        const rotation = frag.angle + progress * 180;
        const opacity = interpolate(progress, [0, 0.8, 1], [1, 0.8, 0]);
        const scale = interpolate(progress, [0, 1], [1, 0.3]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: frag.size,
              height: frag.size * 0.7,
              backgroundColor: '#2a2a2a',
              border: '2px solid rgba(255,255,255,0.3)',
              transform: `rotate(${rotation}deg) scale(${scale})`,
              opacity,
              clipPath: 'polygon(10% 0%, 90% 5%, 100% 85%, 15% 100%, 0% 20%)',
            }}
          />
        );
      })}
    </>
  );
};
