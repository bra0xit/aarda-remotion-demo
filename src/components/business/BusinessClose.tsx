import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Sequence,
} from 'remotion';
import { BUSINESS_COLORS } from '../../themes/business';

/**
 * Scene 4: Close
 * Taglines, logo, and CTA
 */

export const BusinessClose: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 4.1 Tagline Moment (0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <TaglineMoment />
      </Sequence>

      {/* 4.2 Logo & CTA (90-210 frames) */}
      <Sequence from={90} durationInFrames={120}>
        <LogoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

const TaglineMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  return (
    <AbsoluteFill style={{ backgroundColor: BUSINESS_COLORS.cream }}>
      {/* Warm gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${BUSINESS_COLORS.yellowLight}40 0%, ${BUSINESS_COLORS.cream} 70%)`,
        }}
      />

      {/* Gathered figures in background */}
      <GatheredFigures frame={frame} fps={fps} isLandscape={isLandscape} />

      {/* Primary tagline */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          padding: '0 30px',
        }}
      >
        <PrimaryTagline frame={frame} fps={fps} />
        <SecondaryTagline frame={frame} fps={fps} />
      </div>
    </AbsoluteFill>
  );
};

const GatheredFigures: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  const figures = [
    { x: 15, color: BUSINESS_COLORS.navy },
    { x: 30, color: BUSINESS_COLORS.coral },
    { x: 50, color: BUSINESS_COLORS.burgundy },
    { x: 70, color: BUSINESS_COLORS.terracotta },
    { x: 85, color: BUSINESS_COLORS.navyLight },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: isLandscape ? '8%' : '10%',
        left: 0,
        right: 0,
      }}
    >
      {figures.map((fig, i) => {
        const figSpring = spring({
          frame: frame - i * 5,
          fps,
          config: { stiffness: 80, damping: 14 },
        });

        const y = interpolate(figSpring, [0, 1], [80, 0]);
        const opacity = interpolate(figSpring, [0, 0.5, 1], [0, 0.8, 0.5]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${fig.x}%`,
              transform: `translateX(-50%) translateY(${y}px)`,
              opacity,
            }}
          >
            {/* Figure - LARGE */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: BUSINESS_COLORS.beige,
                  border: `4px solid ${fig.color}`,
                }}
              />
              <div
                style={{
                  width: 80,
                  height: 100,
                  backgroundColor: fig.color,
                  borderRadius: '40px 40px 0 0',
                  marginTop: -10,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PrimaryTagline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const taglineSpring = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 60, damping: 14 },
  });

  const y = interpolate(taglineSpring, [0, 1], [40, 0]);
  const opacity = interpolate(taglineSpring, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        marginBottom: 36,
      }}
    >
      <h1
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: BUSINESS_COLORS.burgundy,
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        Turn static content into
        <br />
        <span style={{ color: BUSINESS_COLORS.coral }}>stories people remember.</span>
      </h1>
    </div>
  );
};

const SecondaryTagline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const taglineSpring = spring({
    frame: frame - 35,
    fps,
    config: { stiffness: 80, damping: 12 },
  });

  const y = interpolate(taglineSpring, [0, 1], [20, 0]);
  const opacity = interpolate(taglineSpring, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <p
        style={{
          fontSize: 32,
          fontWeight: 500,
          color: BUSINESS_COLORS.grey600,
          fontFamily: 'Inter, system-ui, sans-serif',
          margin: 0,
        }}
      >
        Gamify engagement. Measure impact.
      </p>
    </div>
  );
};

const LogoCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  // Shimmer effect on button
  const shimmerX = interpolate(frame % 90, [0, 90], [-100, 300]);

  return (
    <AbsoluteFill style={{ backgroundColor: BUSINESS_COLORS.cream }}>
      {/* Clean warm background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${BUSINESS_COLORS.cream} 0%, ${BUSINESS_COLORS.beige} 100%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
        }}
      >
        {/* Logo */}
        <Logo frame={frame} fps={fps} />

        {/* Subtitle */}
        <Subtitle frame={frame} fps={fps} />

        {/* CTA Button */}
        <CTAButton frame={frame} fps={fps} shimmerX={shimmerX} />

        {/* Website */}
        <Website frame={frame} fps={fps} />

        {/* Use case icons */}
        <UseCaseIcons frame={frame} fps={fps} isLandscape={isLandscape} />
      </div>
    </AbsoluteFill>
  );
};

const Logo: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const logoSpring = spring({
    frame: frame - 5,
    fps,
    config: { stiffness: 80, damping: 12 },
  });

  const scale = interpolate(logoSpring, [0, 1], [0.7, 1]);
  const opacity = interpolate(logoSpring, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          fontFamily: 'Inter, system-ui, sans-serif',
          background: `linear-gradient(135deg, ${BUSINESS_COLORS.burgundy} 0%, ${BUSINESS_COLORS.coral} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: -4,
        }}
      >
        AARDA
      </div>
    </div>
  );
};

const Subtitle: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const subtitleSpring = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 100, damping: 12 },
  });

  const y = interpolate(subtitleSpring, [0, 1], [15, 0]);
  const opacity = interpolate(subtitleSpring, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        marginBottom: 48,
      }}
    >
      <p
        style={{
          fontSize: 28,
          fontWeight: 500,
          color: BUSINESS_COLORS.grey500,
          fontFamily: 'Inter, system-ui, sans-serif',
          margin: 0,
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}
      >
        Interactive storytelling for business
      </p>
    </div>
  );
};

const CTAButton: React.FC<{ frame: number; fps: number; shimmerX: number }> = ({
  frame,
  fps,
  shimmerX,
}) => {
  const buttonSpring = spring({
    frame: frame - 35,
    fps,
    config: { stiffness: 120, damping: 12 },
  });

  const scale = interpolate(buttonSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(buttonSpring, [0, 0.5, 1], [0, 1, 1]);

  // Subtle pulse
  const pulse = Math.sin(frame * 0.08) * 0.02 + 1;

  return (
    <div
      style={{
        transform: `scale(${scale * pulse})`,
        opacity,
        marginBottom: 36,
      }}
    >
      <div
        style={{
          position: 'relative',
          background: `linear-gradient(135deg, ${BUSINESS_COLORS.coral} 0%, ${BUSINESS_COLORS.terracotta} 100%)`,
          padding: '28px 72px',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: `0 12px 40px ${BUSINESS_COLORS.coral}40`,
        }}
      >
        {/* Shimmer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: shimmerX,
            width: 80,
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            transform: 'skewX(-20deg)',
          }}
        />

        <span
          style={{
            position: 'relative',
            fontSize: 32,
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Book a Demo
        </span>
      </div>
    </div>
  );
};

const Website: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const webSpring = spring({
    frame: frame - 50,
    fps,
    config: { stiffness: 100, damping: 12 },
  });

  const y = interpolate(webSpring, [0, 1], [10, 0]);
  const opacity = interpolate(webSpring, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        marginBottom: 60,
      }}
    >
      <span
        style={{
          fontSize: 36,
          fontWeight: 600,
          color: BUSINESS_COLORS.coral,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        aarda.ai
      </span>
    </div>
  );
};

const UseCaseIcons: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  const icons = [
    { icon: '📋', label: 'Compliance' },
    { icon: '🏢', label: 'Culture' },
    { icon: '🚀', label: 'Launches' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: isLandscape ? 50 : 36,
        position: 'absolute',
        bottom: isLandscape ? '8%' : '6%',
      }}
    >
      {icons.map((item, i) => {
        const iconSpring = spring({
          frame: frame - 60 - i * 8,
          fps,
          config: { stiffness: 120, damping: 10 },
        });

        return (
          <div
            key={i}
            style={{
              transform: `scale(${iconSpring})`,
              opacity: iconSpring,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 36 }}>{item.icon}</span>
            <span
              style={{
                fontSize: 24,
                color: BUSINESS_COLORS.grey500,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
