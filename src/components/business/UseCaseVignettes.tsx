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
 * Scene 3: Use Case Vignettes
 * Quick showcases of Compliance, Company Story, Product Launch
 */

export const UseCaseVignettes: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 3.1 Compliance Training (0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <ComplianceVignette />
      </Sequence>

      {/* 3.2 Company Story (90-180 frames) */}
      <Sequence from={90} durationInFrames={90}>
        <CompanyStoryVignette />
      </Sequence>

      {/* 3.3 Product Launch (180-300 frames) */}
      <Sequence from={180} durationInFrames={120}>
        <ProductLaunchVignette />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ COMPLIANCE VIGNETTE ============
const ComplianceVignette: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  return (
    <AbsoluteFill style={{ backgroundColor: BUSINESS_COLORS.cream }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${BUSINESS_COLORS.beige} 0%, ${BUSINESS_COLORS.cream} 100%)`,
        }}
      />

      {/* Split view */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: isLandscape ? 60 : 30,
          alignItems: 'center',
          flexDirection: isLandscape ? 'row' : 'column',
        }}
      >
        {/* Old way - crossed out checklist */}
        <OldChecklist frame={frame} fps={fps} />

        {/* Arrow */}
        <TransitionArrow frame={frame} fps={fps} />

        {/* New way - interactive scenario */}
        <InteractiveScenario frame={frame} fps={fps} />
      </div>

      {/* Badge appears */}
      <CompletionBadge frame={frame} fps={fps} isLandscape={isLandscape} />
    </AbsoluteFill>
  );
};

const OldChecklist: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const strikeProgress = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [40, 60], [1, 0.4], { extrapolateRight: 'clamp' });

  return (
    <div style={{ opacity: fadeOut, position: 'relative' }}>
      <div
        style={{
          width: 220,
          height: 300,
          backgroundColor: BUSINESS_COLORS.grey200,
          borderRadius: 16,
          padding: 24,
          border: `4px solid ${BUSINESS_COLORS.grey400}`,
        }}
      >
        {/* Checklist items - LARGE */}
        {['Policy A', 'Policy B', 'Policy C', 'Policy D'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div
              style={{
                width: 28,
                height: 28,
                border: `3px solid ${BUSINESS_COLORS.grey400}`,
                borderRadius: 6,
              }}
            />
            <span style={{ fontSize: 22, color: BUSINESS_COLORS.grey500, fontFamily: 'Inter, sans-serif' }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Strike through */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: -20,
          width: `${strikeProgress * 260}px`,
          height: 8,
          backgroundColor: BUSINESS_COLORS.red,
          transform: 'rotate(-10deg)',
          borderRadius: 4,
        }}
      />
    </div>
  );
};

const TransitionArrow: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const arrowSpring = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 100, damping: 12 },
  });

  return (
    <div
      style={{
        fontSize: 64,
        color: BUSINESS_COLORS.coral,
        transform: `scale(${arrowSpring})`,
      }}
    >
      →
    </div>
  );
};

const InteractiveScenario: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const appearSpring = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 80, damping: 12 },
  });

  const scale = interpolate(appearSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(appearSpring, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div style={{ transform: `scale(${scale})`, opacity }}>
      <div
        style={{
          width: 260,
          height: 340,
          backgroundColor: BUSINESS_COLORS.warmWhite,
          borderRadius: 20,
          padding: 24,
          border: `4px solid ${BUSINESS_COLORS.coral}`,
          boxShadow: `0 8px 30px ${BUSINESS_COLORS.coral}30`,
        }}
      >
        {/* Mini scenario illustration - LARGE */}
        <div
          style={{
            height: 150,
            backgroundColor: BUSINESS_COLORS.beige,
            borderRadius: 14,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 60 }}>🎮</span>
        </div>

        {/* Choice buttons - LARGE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              backgroundColor: BUSINESS_COLORS.coral,
              color: '#fff',
              padding: '14px 20px',
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 600,
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Option A ✓
          </div>
          <div
            style={{
              backgroundColor: BUSINESS_COLORS.grey200,
              padding: '14px 20px',
              borderRadius: 12,
              fontSize: 20,
              textAlign: 'center',
              color: BUSINESS_COLORS.grey500,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Option B
          </div>
        </div>
      </div>
    </div>
  );
};

const CompletionBadge: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  if (frame < 60) return null;

  const badgeSpring = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 150, damping: 10 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: isLandscape ? '8%' : '6%',
        left: '50%',
        transform: `translateX(-50%) scale(${badgeSpring})`,
      }}
    >
      <div
        style={{
          backgroundColor: BUSINESS_COLORS.green,
          color: '#fff',
          padding: '20px 36px',
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: '0 8px 30px rgba(34, 197, 94, 0.3)',
        }}
      >
        <span style={{ fontSize: 36 }}>✓</span>
        <span style={{ fontSize: 28, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Completed!</span>
      </div>
    </div>
  );
};

// ============ COMPANY STORY VIGNETTE ============
const CompanyStoryVignette: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  return (
    <AbsoluteFill style={{ backgroundColor: BUSINESS_COLORS.cream }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${BUSINESS_COLORS.yellowLight}30 0%, ${BUSINESS_COLORS.cream} 100%)`,
        }}
      />

      {/* Timeline */}
      <Timeline frame={frame} fps={fps} isLandscape={isLandscape} />

      {/* Founder character */}
      <FounderCharacter frame={frame} fps={fps} isLandscape={isLandscape} />
    </AbsoluteFill>
  );
};

const Timeline: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  const milestones = [
    { year: '2015', label: 'Founded', icon: '🌱' },
    { year: '2018', label: 'Series A', icon: '📈' },
    { year: '2021', label: 'Global', icon: '🌍' },
    { year: '2024', label: 'Today', icon: '⭐' },
  ];

  const lineProgress = interpolate(frame, [0, 60], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '8%',
        right: '8%',
        transform: 'translateY(-50%)',
      }}
    >
      {/* Line - LARGE */}
      <div
        style={{
          height: 8,
          backgroundColor: BUSINESS_COLORS.grey300,
          borderRadius: 4,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${lineProgress}%`,
            height: '100%',
            backgroundColor: BUSINESS_COLORS.coral,
            borderRadius: 4,
          }}
        />
      </div>

      {/* Milestones - LARGE */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: -40,
        }}
      >
        {milestones.map((m, i) => {
          const showAt = i * 15;
          const show = frame > showAt;
          const milestoneSpring = spring({
            frame: frame - showAt,
            fps,
            config: { stiffness: 120, damping: 10 },
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${show ? milestoneSpring : 0})`,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: BUSINESS_COLORS.warmWhite,
                  border: `5px solid ${BUSINESS_COLORS.coral}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                {m.icon}
              </div>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: BUSINESS_COLORS.burgundy,
                  marginTop: 12,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {m.year}
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: BUSINESS_COLORS.grey500,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FounderCharacter: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  if (frame < 50) return null;

  const appearSpring = spring({
    frame: frame - 50,
    fps,
    config: { stiffness: 80, damping: 12 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: isLandscape ? '8%' : '6%',
        left: '50%',
        transform: `translateX(-50%) scale(${appearSpring})`,
        opacity: appearSpring,
      }}
    >
      {/* Speech bubble - LARGE */}
      <div
        style={{
          backgroundColor: BUSINESS_COLORS.warmWhite,
          padding: '24px 32px',
          borderRadius: 24,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          marginBottom: 20,
          maxWidth: 400,
        }}
      >
        <span
          style={{
            fontSize: 26,
            color: BUSINESS_COLORS.burgundy,
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'italic',
          }}
        >
          "It all started in a small garage..."
        </span>
      </div>

      {/* Founder figure - LARGE */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: BUSINESS_COLORS.beige,
              border: `4px solid ${BUSINESS_COLORS.burgundy}`,
            }}
          />
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: BUSINESS_COLORS.navy,
              borderRadius: '50px 50px 0 0',
              marginTop: -10,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ============ PRODUCT LAUNCH VIGNETTE ============
const ProductLaunchVignette: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  return (
    <AbsoluteFill style={{ backgroundColor: BUSINESS_COLORS.cream }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${BUSINESS_COLORS.coral}20 0%, ${BUSINESS_COLORS.cream} 70%)`,
        }}
      />

      {/* Central product */}
      <ProductShowcase frame={frame} fps={fps} />

      {/* Gathering employees */}
      <GatheringEmployees frame={frame} fps={fps} isLandscape={isLandscape} />

      {/* Reactions */}
      <Reactions frame={frame} fps={fps} isLandscape={isLandscape} />

      {/* Engagement dashboard */}
      <EngagementDashboard frame={frame} fps={fps} isLandscape={isLandscape} />
    </AbsoluteFill>
  );
};

const ProductShowcase: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  const floatY = Math.sin(frame * 0.08) * 8;

  return (
    <div
      style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${floatY}px)`,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          left: -60,
          right: -60,
          bottom: -60,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BUSINESS_COLORS.yellow}60 0%, transparent 70%)`,
          opacity: glowPulse,
          filter: 'blur(30px)',
        }}
      />

      {/* Product box - LARGE */}
      <div
        style={{
          width: 180,
          height: 180,
          backgroundColor: BUSINESS_COLORS.coral,
          borderRadius: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 15px 60px ${BUSINESS_COLORS.coral}50`,
        }}
      >
        <span style={{ fontSize: 80 }}>🚀</span>
      </div>

      {/* NEW badge - LARGE */}
      <div
        style={{
          position: 'absolute',
          top: -16,
          right: -16,
          backgroundColor: BUSINESS_COLORS.yellow,
          color: BUSINESS_COLORS.burgundy,
          padding: '10px 24px',
          borderRadius: 20,
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        NEW
      </div>
    </div>
  );
};

const GatheringEmployees: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  const employees = [
    { x: 18, delay: 10 },
    { x: 36, delay: 20 },
    { x: 64, delay: 15 },
    { x: 82, delay: 25 },
  ];

  return (
    <>
      {employees.map((emp, i) => {
        const empSpring = spring({
          frame: frame - emp.delay,
          fps,
          config: { stiffness: 80, damping: 14 },
        });

        const y = interpolate(empSpring, [0, 1], [80, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: isLandscape ? '15%' : '18%',
              left: `${emp.x}%`,
              transform: `translateX(-50%) translateY(${y}px)`,
              opacity: empSpring,
            }}
          >
            {/* Employee - LARGE */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: BUSINESS_COLORS.beige,
                  border: `3px solid ${BUSINESS_COLORS.burgundy}`,
                }}
              />
              <div
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: [BUSINESS_COLORS.navy, BUSINESS_COLORS.burgundy, BUSINESS_COLORS.coral, BUSINESS_COLORS.terracotta][i],
                  borderRadius: '35px 35px 0 0',
                  marginTop: -6,
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

const Reactions: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  const reactions = [
    { emoji: '💡', x: 25, y: isLandscape ? 42 : 48, delay: 50 },
    { emoji: '👍', x: 75, y: isLandscape ? 45 : 50, delay: 60 },
    { emoji: '🎉', x: 50, y: isLandscape ? 52 : 55, delay: 70 },
  ];

  return (
    <>
      {reactions.map((r, i) => {
        const localFrame = frame - r.delay;
        if (localFrame < 0) return null;

        const floatY = interpolate(localFrame, [0, 40], [0, -50], { extrapolateRight: 'clamp' });
        const opacity = interpolate(localFrame, [0, 10, 30, 40], [0, 1, 1, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${r.x}%`,
              top: `${r.y}%`,
              transform: `translateY(${floatY}px)`,
              opacity,
              fontSize: 56,
            }}
          >
            {r.emoji}
          </div>
        );
      })}
    </>
  );
};

const EngagementDashboard: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  if (frame < 80) return null;

  const dashSpring = spring({
    frame: frame - 80,
    fps,
    config: { stiffness: 100, damping: 12 },
  });

  const participation = Math.min(Math.round(interpolate(frame - 80, [0, 30], [0, 94])), 94);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: isLandscape ? '6%' : '5%',
        left: '50%',
        transform: `translateX(-50%) scale(${dashSpring})`,
        opacity: dashSpring,
      }}
    >
      <div
        style={{
          backgroundColor: BUSINESS_COLORS.warmWhite,
          padding: 28,
          borderRadius: 24,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: BUSINESS_COLORS.grey500,
            marginBottom: 12,
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
          }}
        >
          Live Participation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: BUSINESS_COLORS.green,
            }}
          />
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: BUSINESS_COLORS.green,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {participation}%
          </span>
        </div>
      </div>
    </div>
  );
};
