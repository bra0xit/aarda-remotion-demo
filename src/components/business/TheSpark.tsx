import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { BUSINESS_COLORS } from '../../themes/business';

/**
 * Scene 2.1: The Spark
 * Lightbulb moment - color bleeds back into the scene
 */

export const TheSpark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  // Color transition progress (grey -> warm)
  const colorProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Background color interpolation
  const bgColor = colorProgress < 0.5 ? BUSINESS_COLORS.grey200 : BUSINESS_COLORS.cream;

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Radial color burst from lightbulb */}
      <div
        style={{
          position: 'absolute',
          top: isLandscape ? '30%' : '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: interpolate(colorProgress, [0, 1], [0, 2000]),
          height: interpolate(colorProgress, [0, 1], [0, 2000]),
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BUSINESS_COLORS.yellowLight}60 0%, ${BUSINESS_COLORS.cream} 70%, transparent 100%)`,
          opacity: colorProgress,
          pointerEvents: 'none',
        }}
      />

      {/* Figure with lightbulb */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SparkFigure frame={frame} fps={fps} colorProgress={colorProgress} />
      </div>

      {/* Documents transforming around */}
      <TransformingDocuments frame={frame} fps={fps} colorProgress={colorProgress} isLandscape={isLandscape} />
    </AbsoluteFill>
  );
};

const SparkFigure: React.FC<{ frame: number; fps: number; colorProgress: number }> = ({
  frame,
  fps,
  colorProgress,
}) => {
  // Lightbulb spring animation
  const bulbSpring = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 150, damping: 10 },
  });

  const bulbScale = interpolate(bulbSpring, [0, 1], [0, 1]);
  const bulbY = interpolate(bulbSpring, [0, 1], [30, 0]);

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  // Figure color based on progress
  const bodyColor = colorProgress > 0.5 ? BUSINESS_COLORS.navy : BUSINESS_COLORS.grey500;
  const skinColor = BUSINESS_COLORS.beige;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Lightbulb - LARGE */}
      <div
        style={{
          position: 'absolute',
          top: -160,
          transform: `scale(${bulbScale}) translateY(${bulbY}px)`,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BUSINESS_COLORS.yellow}80 0%, transparent 70%)`,
            opacity: glowPulse * bulbScale,
            filter: 'blur(15px)',
          }}
        />

        {/* Bulb body */}
        <div
          style={{
            width: 100,
            height: 120,
            backgroundColor: BUSINESS_COLORS.yellow,
            borderRadius: '50% 50% 20% 20%',
            position: 'relative',
            boxShadow: `0 0 50px ${BUSINESS_COLORS.yellow}80`,
          }}
        >
          {/* Filament */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 30,
              borderBottom: `5px solid ${BUSINESS_COLORS.terracotta}`,
              borderLeft: `5px solid ${BUSINESS_COLORS.terracotta}`,
              borderRight: `5px solid ${BUSINESS_COLORS.terracotta}`,
              borderRadius: '0 0 20px 20px',
            }}
          />
        </div>

        {/* Bulb base */}
        <div
          style={{
            width: 60,
            height: 30,
            backgroundColor: BUSINESS_COLORS.grey500,
            margin: '0 auto',
            borderRadius: '0 0 10px 10px',
          }}
        />

        {/* Rays */}
        {Array.from({ length: 8 }).map((_, i) => {
          const rayLength = 40 + Math.sin(frame * 0.2 + i) * 10;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 40,
                left: 48,
                width: 6,
                height: rayLength,
                backgroundColor: BUSINESS_COLORS.yellow,
                borderRadius: 3,
                transformOrigin: 'center bottom',
                transform: `rotate(${i * 45}deg) translateY(-80px)`,
                opacity: bulbScale * 0.8,
              }}
            />
          );
        })}
      </div>

      {/* Head - LARGE */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: skinColor,
          border: `5px solid ${colorProgress > 0.5 ? BUSINESS_COLORS.burgundy : BUSINESS_COLORS.grey500}`,
          position: 'relative',
        }}
      >
        {/* Hair */}
        <div
          style={{
            position: 'absolute',
            top: -4,
            left: 10,
            right: 10,
            height: 60,
            borderRadius: '60px 60px 0 0',
            backgroundColor: colorProgress > 0.5 ? BUSINESS_COLORS.burgundy : BUSINESS_COLORS.grey600,
          }}
        />
        {/* Happy eyes */}
        <div style={{ position: 'absolute', top: 50, left: 24, display: 'flex', gap: 32 }}>
          <div style={{ width: 16, height: 16, backgroundColor: BUSINESS_COLORS.grey700, borderRadius: '50%' }} />
          <div style={{ width: 16, height: 16, backgroundColor: BUSINESS_COLORS.grey700, borderRadius: '50%' }} />
        </div>
        {/* Smile */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 20,
            borderBottom: `5px solid ${BUSINESS_COLORS.grey700}`,
            borderRadius: '0 0 50% 50%',
          }}
        />
      </div>

      {/* Body - LARGE */}
      <div
        style={{
          width: 180,
          height: 220,
          backgroundColor: bodyColor,
          borderRadius: '90px 90px 0 0',
          marginTop: -20,
        }}
      />
    </div>
  );
};

const TransformingDocuments: React.FC<{
  frame: number;
  fps: number;
  colorProgress: number;
  isLandscape: boolean;
}> = ({ frame, fps, colorProgress, isLandscape }) => {
  const docs = [
    { x: isLandscape ? 18 : 8, y: 25, delay: 40 },
    { x: isLandscape ? 78 : 85, y: 30, delay: 50 },
    { x: isLandscape ? 12 : 10, y: 70, delay: 60 },
    { x: isLandscape ? 82 : 80, y: 72, delay: 70 },
  ];

  return (
    <>
      {docs.map((doc, i) => {
        const localFrame = frame - doc.delay;
        if (localFrame < 0) return null;

        const liftSpring = spring({
          frame: localFrame,
          fps,
          config: { stiffness: 80, damping: 12 },
        });

        const lift = interpolate(liftSpring, [0, 1], [0, -30]);
        const glow = interpolate(liftSpring, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${doc.x}%`,
              top: `${doc.y}%`,
              transform: `translateY(${lift}px)`,
            }}
          >
            <div
              style={{
                width: 120,
                height: 150,
                backgroundColor: colorProgress > 0.5 ? BUSINESS_COLORS.warmWhite : BUSINESS_COLORS.grey300,
                borderRadius: 12,
                boxShadow: glow > 0.5 ? `0 10px 40px ${BUSINESS_COLORS.yellow}50` : 'none',
                border: `4px solid ${glow > 0.5 ? BUSINESS_COLORS.yellow : BUSINESS_COLORS.grey400}`,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Magic sparkle */}
              {glow > 0.5 && (
                <span style={{ fontSize: 48 }}>✨</span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
