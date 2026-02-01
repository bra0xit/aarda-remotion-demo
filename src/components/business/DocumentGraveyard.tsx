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
 * Scene 1.1: The Document Graveyard
 *
 * EVERYTHING LARGE AND READABLE
 * Focus on clarity and emotional impact through scale
 */

const DOCUMENTS = [
  { title: 'Compliance Update', subtitle: 'Q4 2024 Required Reading', color: '#E74C3C', delay: 40, priority: 'URGENT' },
  { title: 'New Policy', subtitle: 'Guidelines v3.2', color: '#3498DB', delay: 70, priority: null },
  { title: 'ESG Report', subtitle: '47 Pages', color: '#27AE60', delay: 100, priority: null },
  { title: 'Security Training', subtitle: 'Mandatory by Friday', color: '#9B59B6', delay: 130, priority: 'ACTION REQUIRED' },
];

export const DocumentGraveyard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  // Emotional phases
  const phase = frame < 80 ? 'hopeful' : frame < 160 ? 'overwhelmed' : 'defeated';

  // Scene desaturation
  const saturation = interpolate(frame, [80, 200], [100, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BUSINESS_COLORS.grey100,
        filter: `saturate(${saturation}%)`,
      }}
    >
      {/* Simple gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${BUSINESS_COLORS.grey200} 0%, ${BUSINESS_COLORS.beige}50 100%)`,
        }}
      />

      {/* LARGE Character - Center of attention */}
      <LargeCharacter frame={frame} fps={fps} phase={phase} isLandscape={isLandscape} />

      {/* LARGE Flying Documents */}
      <LargeDocuments frame={frame} fps={fps} isLandscape={isLandscape} />

      {/* LARGE Notification Badge */}
      <LargeNotification frame={frame} fps={fps} isLandscape={isLandscape} />

      {/* Unread counter - very prominent */}
      <UnreadCounter frame={frame} fps={fps} isLandscape={isLandscape} />
    </AbsoluteFill>
  );
};

// ============ LARGE CHARACTER ============
const LargeCharacter: React.FC<{
  frame: number;
  fps: number;
  phase: string;
  isLandscape: boolean;
}> = ({ frame, fps, phase, isLandscape }) => {

  // Posture changes
  const slump = phase === 'hopeful' ? 0 : phase === 'overwhelmed' ? 15 : 30;

  // Breathing
  const breathe = Math.sin(frame * 0.08) * 3;

  const scale = isLandscape ? 1.3 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale}) translateY(${slump + breathe}px)`,
      }}
    >
      {/* Head - LARGE */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          backgroundColor: BUSINESS_COLORS.beige,
          border: `6px solid ${BUSINESS_COLORS.burgundyLight}`,
          position: 'relative',
          margin: '0 auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        {/* Hair */}
        <div
          style={{
            position: 'absolute',
            top: -5,
            left: 15,
            right: 15,
            height: 70,
            backgroundColor: BUSINESS_COLORS.burgundy,
            borderRadius: '70px 70px 0 0',
          }}
        />

        {/* Eyebrows - Expressive */}
        <LargeEyebrows phase={phase} />

        {/* Eyes - LARGE and expressive */}
        <LargeEyes phase={phase} frame={frame} />

        {/* Mouth - LARGE */}
        <LargeMouth phase={phase} />
      </div>

      {/* Body */}
      <div
        style={{
          width: 180,
          height: 200,
          backgroundColor: phase === 'hopeful' ? BUSINESS_COLORS.navy : BUSINESS_COLORS.grey500,
          borderRadius: '90px 90px 0 0',
          marginTop: -20,
          marginLeft: -20,
          position: 'relative',
          transition: 'background-color 0.5s ease',
        }}
      >
        {/* Tie */}
        <div
          style={{
            position: 'absolute',
            top: 25,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 30,
            height: 80,
            backgroundColor: phase === 'hopeful' ? BUSINESS_COLORS.coral : BUSINESS_COLORS.grey400,
            clipPath: 'polygon(50% 0%, 100% 12%, 75% 100%, 50% 88%, 25% 100%, 0% 12%)',
            transition: 'background-color 0.5s ease',
          }}
        />
      </div>
    </div>
  );
};

const LargeEyebrows: React.FC<{ phase: string }> = ({ phase }) => {
  const leftAngle = phase === 'hopeful' ? 0 : phase === 'overwhelmed' ? -20 : -25;
  const rightAngle = phase === 'hopeful' ? 0 : phase === 'overwhelmed' ? 20 : 25;
  const yOffset = phase === 'defeated' ? 8 : 0;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 45 + yOffset,
          left: 25,
          width: 35,
          height: 8,
          backgroundColor: BUSINESS_COLORS.burgundy,
          borderRadius: 4,
          transform: `rotate(${leftAngle}deg)`,
          transition: 'all 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 45 + yOffset,
          right: 25,
          width: 35,
          height: 8,
          backgroundColor: BUSINESS_COLORS.burgundy,
          borderRadius: 4,
          transform: `rotate(${rightAngle}deg)`,
          transition: 'all 0.3s ease',
        }}
      />
    </>
  );
};

const LargeEyes: React.FC<{ phase: string; frame: number }> = ({ phase, frame }) => {
  const blink = Math.sin(frame * 0.12) > 0.97;

  const eyeHeight = phase === 'hopeful' ? 20
    : phase === 'overwhelmed' ? 26
    : 12;

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: 25,
        right: 25,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            width: 24,
            height: blink ? 4 : eyeHeight,
            backgroundColor: BUSINESS_COLORS.grey700,
            borderRadius: 12,
            transition: 'height 0.1s ease',
          }}
        />
      ))}
    </div>
  );
};

const LargeMouth: React.FC<{ phase: string }> = ({ phase }) => {
  if (phase === 'hopeful') {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: 25,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 20,
          borderBottom: `6px solid ${BUSINESS_COLORS.burgundyLight}`,
          borderRadius: '0 0 50% 50%',
        }}
      />
    );
  }

  if (phase === 'overwhelmed') {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 35,
          height: 6,
          backgroundColor: BUSINESS_COLORS.burgundyLight,
          borderRadius: 3,
        }}
      />
    );
  }

  // Defeated frown
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 22,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 35,
        height: 15,
        borderTop: `6px solid ${BUSINESS_COLORS.burgundyLight}`,
        borderRadius: '50% 50% 0 0',
      }}
    />
  );
};

// ============ LARGE DOCUMENTS ============
const LargeDocuments: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  return (
    <>
      {DOCUMENTS.map((doc, index) => (
        <LargeDocument
          key={index}
          doc={doc}
          frame={frame}
          fps={fps}
          index={index}
          isLandscape={isLandscape}
        />
      ))}
    </>
  );
};

const LargeDocument: React.FC<{
  doc: typeof DOCUMENTS[0];
  frame: number;
  fps: number;
  index: number;
  isLandscape: boolean;
}> = ({ doc, frame, fps, index, isLandscape }) => {
  const localFrame = frame - doc.delay;
  if (localFrame < 0) return null;

  const flySpring = spring({
    frame: localFrame,
    fps,
    config: { stiffness: 50, damping: 12 },
  });

  // Start positions - come from different directions
  const startPositions = [
    { x: isLandscape ? 800 : 500, y: -200 },
    { x: isLandscape ? -400 : -300, y: -150 },
    { x: isLandscape ? 700 : 450, y: -180 },
    { x: isLandscape ? -350 : -250, y: -220 },
  ];

  // End positions - centered, stacking around the character
  const endPositions = isLandscape ? [
    { x: 280, y: -100 },
    { x: -280, y: -50 },
    { x: 300, y: 120 },
    { x: -260, y: 180 },
  ] : [
    { x: 180, y: 280 },
    { x: -180, y: 350 },
    { x: 160, y: 480 },
    { x: -150, y: 580 },
  ];

  const start = startPositions[index];
  const end = endPositions[index];

  const x = interpolate(flySpring, [0, 1], [start.x, end.x]);
  const y = interpolate(flySpring, [0, 1], [start.y, end.y]);
  const rotation = interpolate(flySpring, [0, 0.5, 1], [30 * (index % 2 === 0 ? 1 : -1), 0, -5 + index * 3]);
  const scale = interpolate(flySpring, [0, 0.8, 1], [0.8, 1.1, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
        zIndex: 10 + index,
      }}
    >
      {/* Document Card - LARGE */}
      <div
        style={{
          width: isLandscape ? 280 : 240,
          height: isLandscape ? 160 : 140,
          backgroundColor: BUSINESS_COLORS.warmWhite,
          borderRadius: 16,
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          border: `3px solid ${BUSINESS_COLORS.grey300}`,
        }}
      >
        {/* Color accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 12,
            height: '100%',
            backgroundColor: doc.color,
          }}
        />

        {/* Priority badge */}
        {doc.priority && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: doc.color,
              color: '#fff',
              fontSize: 14,
              fontWeight: 800,
              padding: '6px 12px',
              borderRadius: 8,
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: 0.5,
            }}
          >
            {doc.priority}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '20px 20px 20px 30px' }}>
          {/* Document icon */}
          <div
            style={{
              width: 40,
              height: 48,
              backgroundColor: doc.color,
              borderRadius: 6,
              opacity: 0.25,
              marginBottom: 12,
            }}
          />

          {/* Title - LARGE readable */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: BUSINESS_COLORS.grey700,
              fontFamily: 'Inter, system-ui, sans-serif',
              marginBottom: 6,
            }}
          >
            {doc.title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 16,
              color: BUSINESS_COLORS.grey500,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {doc.subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ LARGE NOTIFICATION ============
const LargeNotification: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  if (frame < 170) return null;

  const notifSpring = spring({
    frame: frame - 170,
    fps,
    config: { stiffness: 150, damping: 15 },
  });

  const y = interpolate(notifSpring, [0, 1], [-150, 0]);
  const opacity = interpolate(frame, [170, 190, 240, 270], [0, 1, 1, 0.4]);

  return (
    <div
      style={{
        position: 'absolute',
        top: isLandscape ? 50 : 80,
        left: '50%',
        transform: `translateX(-50%) translateY(${y}px)`,
        opacity,
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: BUSINESS_COLORS.warmWhite,
          borderRadius: 20,
          padding: '24px 32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          border: `3px solid ${BUSINESS_COLORS.grey300}`,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          minWidth: isLandscape ? 450 : 380,
        }}
      >
        {/* App icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: '#E74C3C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 32 }}>📋</span>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: BUSINESS_COLORS.grey700,
              fontFamily: 'Inter, system-ui, sans-serif',
              marginBottom: 6,
            }}
          >
            Compliance Portal
          </div>
          <div
            style={{
              fontSize: 18,
              color: BUSINESS_COLORS.grey500,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            You have unread documents waiting
          </div>
        </div>

        {/* Dismiss hint */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: BUSINESS_COLORS.grey200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            color: BUSINESS_COLORS.grey500,
            flexShrink: 0,
          }}
        >
          ×
        </div>
      </div>
    </div>
  );
};

// ============ UNREAD COUNTER ============
const UnreadCounter: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  if (frame < 60) return null;

  const counterSpring = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 120, damping: 12 },
  });

  // Count grows
  const count = Math.min(Math.floor(interpolate(frame, [60, 180], [1, 47])), 47);

  // Pulse when new documents arrive
  const pulse = frame > 60 && frame < 160 ? 1 + Math.sin(frame * 0.2) * 0.08 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: isLandscape ? '15%' : '12%',
        left: '50%',
        transform: `translateX(-50%) scale(${counterSpring * pulse})`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: '#E74C3C',
          borderRadius: 24,
          padding: '20px 36px',
          boxShadow: '0 8px 30px rgba(231, 76, 60, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 32 }}>📥</span>
        <div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'Inter, system-ui, sans-serif',
              lineHeight: 1,
            }}
          >
            {count}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Unread
          </div>
        </div>
      </div>
    </div>
  );
};
