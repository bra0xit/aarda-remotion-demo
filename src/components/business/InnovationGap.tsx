import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from 'remotion';
import { BUSINESS_COLORS } from '../../themes/business';

/**
 * Scene 1.3: The Innovation Gap
 * Competitors racing ahead while you're stuck with static content
 */

const HEADLINES = [
  'Digital Transformation',
  'Employee Engagement Crisis',
  'Gen Z Expects More',
  'Interactive Content +340%',
];

export const InnovationGap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  return (
    <AbsoluteFill style={{ backgroundColor: BUSINESS_COLORS.grey200 }}>
      {/* Split background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: isLandscape ? 'row' : 'column',
        }}
      >
        {/* Left/Top: Competitors (bright, moving) */}
        <CompetitorsSide frame={frame} fps={fps} isLandscape={isLandscape} />

        {/* Right/Bottom: You (grey, stuck) */}
        <StuckSide frame={frame} fps={fps} isLandscape={isLandscape} />
      </div>

      {/* Divider line */}
      <div
        style={{
          position: 'absolute',
          top: isLandscape ? 0 : '50%',
          left: isLandscape ? '50%' : 0,
          width: isLandscape ? 4 : '100%',
          height: isLandscape ? '100%' : 4,
          backgroundColor: BUSINESS_COLORS.grey400,
        }}
      />

      {/* Floating headlines */}
      <FloatingHeadlines frame={frame} isLandscape={isLandscape} />

      {/* Clock ticking fast */}
      <FastClock frame={frame} isLandscape={isLandscape} />
    </AbsoluteFill>
  );
};

const CompetitorsSide: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  // Speed lines movement
  const speedOffset = (frame * 8) % 400;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: BUSINESS_COLORS.beige,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warm gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${isLandscape ? '135deg' : '180deg'}, ${BUSINESS_COLORS.yellowLight}40, ${BUSINESS_COLORS.coral}20)`,
        }}
      />

      {/* Speed lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${10 + i * 12}%`,
            left: -100,
            width: 200 + i * 30,
            height: 4,
            backgroundColor: BUSINESS_COLORS.yellow,
            opacity: 0.4,
            transform: `translateX(${speedOffset + i * 50}px)`,
            borderRadius: 2,
          }}
        />
      ))}

      {/* Competitor figures zooming */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <ZoomingFigure frame={frame} fps={fps} delay={0} color={BUSINESS_COLORS.coral} />
        <ZoomingFigure frame={frame} fps={fps} delay={20} color={BUSINESS_COLORS.terracotta} />
        <ZoomingFigure frame={frame} fps={fps} delay={40} color={BUSINESS_COLORS.yellow} />
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          fontSize: 14,
          fontWeight: 700,
          color: BUSINESS_COLORS.burgundy,
          fontFamily: 'Inter, system-ui, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: 1,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Competitors
      </div>
    </div>
  );
};

const ZoomingFigure: React.FC<{ frame: number; fps: number; delay: number; color: string }> = ({
  frame,
  fps,
  delay,
  color,
}) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  // Continuous rightward movement
  const x = interpolate(localFrame, [0, 180], [-100, 200], { extrapolateRight: 'clamp' });
  const scale = interpolate(localFrame, [0, 60], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translateX(${x}px) scale(${scale})`,
      }}
    >
      {/* Simple rocket/figure */}
      <div
        style={{
          width: 40,
          height: 60,
          backgroundColor: color,
          borderRadius: '50% 50% 30% 30%',
          position: 'relative',
        }}
      >
        {/* Trail */}
        <div
          style={{
            position: 'absolute',
            left: -30,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 30,
            height: 8,
            background: `linear-gradient(to left, ${color}, transparent)`,
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
};

const StuckSide: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  // Worried figure shake
  const shake = Math.sin(frame * 0.3) * 2;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: BUSINESS_COLORS.grey300,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${isLandscape ? '135deg' : '180deg'}, ${BUSINESS_COLORS.grey400}40, ${BUSINESS_COLORS.grey500}30)`,
        }}
      />

      {/* Floating static documents */}
      <FloatingDocuments frame={frame} />

      {/* Stuck/worried figure */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateX(${shake}px)`,
        }}
      >
        {/* Person looking worried */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Head */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: BUSINESS_COLORS.beige,
              border: `3px solid ${BUSINESS_COLORS.grey500}`,
              position: 'relative',
            }}
          >
            {/* Worried eyebrows */}
            <div
              style={{
                position: 'absolute',
                top: 15,
                left: 8,
                width: 12,
                height: 3,
                backgroundColor: BUSINESS_COLORS.grey600,
                transform: 'rotate(-15deg)',
                borderRadius: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 15,
                right: 8,
                width: 12,
                height: 3,
                backgroundColor: BUSINESS_COLORS.grey600,
                transform: 'rotate(15deg)',
                borderRadius: 2,
              }}
            />
            {/* Eyes */}
            <div style={{ position: 'absolute', top: 22, left: 12, display: 'flex', gap: 12 }}>
              <div style={{ width: 6, height: 6, backgroundColor: BUSINESS_COLORS.grey700, borderRadius: '50%' }} />
              <div style={{ width: 6, height: 6, backgroundColor: BUSINESS_COLORS.grey700, borderRadius: '50%' }} />
            </div>
            {/* Frown */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 16,
                height: 8,
                borderTop: `3px solid ${BUSINESS_COLORS.grey600}`,
                borderRadius: '0 0 50% 50%',
              }}
            />
          </div>

          {/* Body */}
          <div
            style={{
              width: 70,
              height: 80,
              backgroundColor: BUSINESS_COLORS.grey500,
              borderRadius: '35px 35px 0 0',
              marginTop: -8,
            }}
          />
        </div>

        {/* Question marks */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: -20,
            fontSize: 24,
            color: BUSINESS_COLORS.grey500,
            opacity: interpolate(frame % 60, [0, 30, 60], [0.3, 1, 0.3]),
          }}
        >
          ?
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          fontSize: 14,
          fontWeight: 700,
          color: BUSINESS_COLORS.grey600,
          fontFamily: 'Inter, system-ui, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: 1,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        You?
      </div>
    </div>
  );
};

const FloatingDocuments: React.FC<{ frame: number }> = ({ frame }) => {
  const docs = [
    { x: 20, y: 20, rotation: 5 },
    { x: 70, y: 60, rotation: -8 },
    { x: 30, y: 80, rotation: 12 },
  ];

  return (
    <>
      {docs.map((doc, i) => {
        const float = Math.sin(frame * 0.03 + i) * 5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${doc.x}%`,
              top: `${doc.y}%`,
              transform: `rotate(${doc.rotation}deg) translateY(${float}px)`,
              opacity: 0.5,
            }}
          >
            <div
              style={{
                width: 40,
                height: 50,
                backgroundColor: BUSINESS_COLORS.grey400,
                borderRadius: 4,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ width: '70%', height: 3, backgroundColor: BUSINESS_COLORS.grey500, borderRadius: 1 }} />
                <div style={{ width: '50%', height: 3, backgroundColor: BUSINESS_COLORS.grey500, borderRadius: 1 }} />
                <div style={{ width: '60%', height: 3, backgroundColor: BUSINESS_COLORS.grey500, borderRadius: 1 }} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const FloatingHeadlines: React.FC<{ frame: number; isLandscape: boolean }> = ({ frame, isLandscape }) => {
  return (
    <>
      {HEADLINES.map((headline, i) => {
        const delay = 30 + i * 25;
        const localFrame = frame - delay;
        if (localFrame < 0 || localFrame > 100) return null;

        const opacity = interpolate(localFrame, [0, 20, 80, 100], [0, 1, 1, 0]);
        const y = interpolate(localFrame, [0, 100], [50, -50]);
        const x = isLandscape ? 50 + i * 5 : 20 + i * 10;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${30 + i * 15}%`,
              left: `${x}%`,
              transform: `translateY(${y}px)`,
              opacity,
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '6px 12px',
              borderRadius: 4,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {headline}
            </span>
          </div>
        );
      })}
    </>
  );
};

const FastClock: React.FC<{ frame: number; isLandscape: boolean }> = ({ frame, isLandscape }) => {
  // Fast spinning clock hands
  const hourRotation = frame * 2;
  const minuteRotation = frame * 12;

  const opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: isLandscape ? 30 : 60,
        right: isLandscape ? '25%' : 30,
        opacity,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: BUSINESS_COLORS.warmWhite,
          border: `3px solid ${BUSINESS_COLORS.grey500}`,
          position: 'relative',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Hour hand */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 3,
            height: 15,
            backgroundColor: BUSINESS_COLORS.grey600,
            borderRadius: 2,
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
          }}
        />
        {/* Minute hand */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 2,
            height: 22,
            backgroundColor: BUSINESS_COLORS.red,
            borderRadius: 2,
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
          }}
        />
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 6,
            height: 6,
            backgroundColor: BUSINESS_COLORS.grey600,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  );
};
