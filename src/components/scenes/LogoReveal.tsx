import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

/**
 * Scene 5.1: Logo Reveal
 * Animated logo with tagline and particle effects.
 */
export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale animation
  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 80, damping: 12 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 0.5, 1], [0, 1, 1]);

  // Tagline animation
  const taglineOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [40, 60], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background radial gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, ${0.15 * glowPulse}) 0%, transparent 60%)`,
        }}
      />

      {/* Particle effects */}
      <LogoParticles frame={frame} />

      {/* Main logo container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            marginBottom: 24,
          }}
        >
          {/* Logo glow */}
          <div
            style={{
              position: 'absolute',
              inset: -40,
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
              filter: 'blur(30px)',
              opacity: glowPulse,
            }}
          />

          {/* Logo text */}
          <div
            style={{
              position: 'relative',
              fontSize: 72,
              fontWeight: 800,
              fontFamily: 'Inter, system-ui, sans-serif',
              background: 'linear-gradient(135deg, #fff 0%, #A78BFA 50%, #6366F1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: -2,
            }}
          >
            AARDA
          </div>

          {/* Subtitle */}
          <div
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 500,
              color: '#A78BFA',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: 6,
              marginTop: 8,
            }}
          >
            PLAY
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: 'center',
            maxWidth: 400,
            padding: '0 32px',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: '#e0e0e0',
              fontFamily: 'Inter, system-ui, sans-serif',
              lineHeight: 1.5,
            }}
          >
            Build worlds. Create characters.
            <br />
            <span style={{ color: '#A78BFA' }}>Tell stories that respond.</span>
          </div>
        </div>
      </div>

      {/* Decorative rings */}
      <LogoRings frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};

const LogoParticles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: 540 + Math.sin(i * 1.3) * 300,
    y: 960 + Math.cos(i * 1.7) * 400,
    size: 3 + (i % 3) * 2,
    speed: 0.5 + (i % 4) * 0.3,
    delay: i * 3,
  }));

  return (
    <>
      {particles.map((p, i) => {
        const particleFrame = frame - p.delay;
        if (particleFrame < 0) return null;

        const floatY = Math.sin(particleFrame * 0.05 * p.speed) * 30;
        const floatX = Math.cos(particleFrame * 0.03 * p.speed) * 20;
        const opacity = interpolate(particleFrame, [0, 20, 80, 100], [0, 0.6, 0.6, 0], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x + floatX,
              top: p.y + floatY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#A78BFA' : '#6366F1',
              opacity,
              boxShadow: `0 0 ${p.size * 2}px ${i % 2 === 0 ? '#A78BFA' : '#6366F1'}`,
            }}
          />
        );
      })}
    </>
  );
};

const LogoRings: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const ring1Spring = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 50, damping: 20 },
  });

  const ring2Spring = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 50, damping: 20 },
  });

  const ring1Scale = interpolate(ring1Spring, [0, 1], [0.5, 1]);
  const ring1Opacity = interpolate(ring1Spring, [0, 0.5, 1], [0, 0.3, 0.15]);

  const ring2Scale = interpolate(ring2Spring, [0, 1], [0.5, 1]);
  const ring2Opacity = interpolate(ring2Spring, [0, 0.5, 1], [0, 0.2, 0.1]);

  return (
    <>
      {/* Inner ring */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 300,
          height: 300,
          marginTop: -150,
          marginLeft: -150,
          borderRadius: '50%',
          border: '1px solid #A78BFA',
          transform: `scale(${ring1Scale})`,
          opacity: ring1Opacity,
        }}
      />

      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 450,
          height: 450,
          marginTop: -225,
          marginLeft: -225,
          borderRadius: '50%',
          border: '1px solid #6366F1',
          transform: `scale(${ring2Scale})`,
          opacity: ring2Opacity,
        }}
      />
    </>
  );
};
