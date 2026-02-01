import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { BUSINESS_COLORS } from '../../themes/business';

/**
 * Scene 1.2: The Scroll of Death
 * LARGE, READABLE endless scrolling through boring PDF content
 */

export const ScrollOfDeath: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width > height;

  // Scene desaturation as boredom sets in
  const saturation = interpolate(frame, [60, 180], [100, 70], {
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
      {/* Simple background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${BUSINESS_COLORS.grey200} 0%, ${BUSINESS_COLORS.beige}50 100%)`,
        }}
      />

      {/* LARGE centered tablet with document */}
      <LargeTablet frame={frame} isLandscape={isLandscape} />

      {/* LARGE page counter - centered at bottom */}
      <LargePageCounter frame={frame} isLandscape={isLandscape} />

      {/* Boredom indicator */}
      <BoredIndicator frame={frame} isLandscape={isLandscape} />
    </AbsoluteFill>
  );
};

const LargeTablet: React.FC<{ frame: number; isLandscape: boolean }> = ({ frame, isLandscape }) => {
  // Continuous scroll animation - increased for larger content
  const scrollOffset = interpolate(frame, [0, 180], [0, 1200], {
    extrapolateRight: 'clamp',
  });

  const tabletWidth = isLandscape ? 750 : 620;
  const tabletHeight = isLandscape ? 900 : 1100;

  return (
    <div
      style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Device frame - EXTRA LARGE */}
      <div
        style={{
          width: tabletWidth,
          height: tabletHeight,
          backgroundColor: BUSINESS_COLORS.grey700,
          borderRadius: 48,
          padding: 24,
          boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: BUSINESS_COLORS.warmWhite,
            borderRadius: 30,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* PDF Header - EXTRA LARGE */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 90,
              backgroundColor: BUSINESS_COLORS.grey200,
              borderBottom: `3px solid ${BUSINESS_COLORS.grey300}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 30px',
              gap: 20,
              zIndex: 10,
            }}
          >
            {/* PDF icon */}
            <div
              style={{
                width: 60,
                height: 72,
                backgroundColor: '#E74C3C',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 800,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                PDF
              </span>
            </div>

            {/* Filename - EXTRA LARGE readable */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: BUSINESS_COLORS.grey700,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Q4_Compliance_Policy.pdf
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: BUSINESS_COLORS.grey500,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                47 pages • Required reading
              </div>
            </div>
          </div>

          {/* Scrolling content */}
          <div
            style={{
              position: 'absolute',
              top: 90,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                transform: `translateY(-${scrollOffset}px)`,
                padding: '40px 50px',
              }}
            >
              {/* Document content - LARGE readable paragraphs */}
              <DocumentContent />
            </div>
          </div>

          {/* Scroll fade at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              background: `linear-gradient(to top, ${BUSINESS_COLORS.warmWhite}, transparent)`,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* Scroll bar */}
          <div
            style={{
              position: 'absolute',
              top: 100,
              right: 10,
              bottom: 12,
              width: 10,
              backgroundColor: BUSINESS_COLORS.grey200,
              borderRadius: 5,
            }}
          >
            <div
              style={{
                width: '100%',
                height: 80,
                backgroundColor: BUSINESS_COLORS.grey400,
                borderRadius: 5,
                transform: `translateY(${interpolate(frame, [0, 180], [0, 250], { extrapolateRight: 'clamp' })}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentContent: React.FC = () => {
  const sections = [
    {
      title: '1. Introduction and Purpose',
      paragraphs: [
        'This document outlines the updated compliance requirements for all employees effective Q4 2024.',
        'All team members are required to read and acknowledge understanding of these policies.',
      ],
    },
    {
      title: '2. General Guidelines',
      paragraphs: [
        'Employees must adhere to all company policies as outlined in this document and related materials.',
        'Failure to comply may result in disciplinary action as described in Section 7.3.',
        'Questions should be directed to the compliance department.',
      ],
    },
    {
      title: '3. Data Protection Requirements',
      paragraphs: [
        'All personal data must be handled in accordance with applicable regulations.',
        'Employees are responsible for maintaining confidentiality of sensitive information.',
      ],
    },
    {
      title: '4. Reporting Procedures',
      paragraphs: [
        'Any compliance concerns must be reported through the designated channels.',
        'Anonymous reporting options are available through the ethics hotline.',
        'Retaliation against reporters is strictly prohibited.',
      ],
    },
    {
      title: '5. Training Requirements',
      paragraphs: [
        'All employees must complete mandatory compliance training annually.',
        'Additional training may be required based on role and responsibilities.',
      ],
    },
  ];

  return (
    <>
      {sections.map((section, sIndex) => (
        <div key={sIndex} style={{ marginBottom: 60 }}>
          {/* Section title - MASSIVE */}
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: BUSINESS_COLORS.grey700,
              fontFamily: 'Inter, system-ui, sans-serif',
              marginBottom: 24,
            }}
          >
            {section.title}
          </div>

          {/* Paragraphs - MASSIVE readable */}
          {section.paragraphs.map((para, pIndex) => (
            <div
              key={pIndex}
              style={{
                fontSize: 30,
                color: BUSINESS_COLORS.grey600,
                fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: 1.6,
                marginBottom: 22,
              }}
            >
              {para}
            </div>
          ))}
        </div>
      ))}

      {/* More sections indicator */}
      <div
        style={{
          fontSize: 26,
          color: BUSINESS_COLORS.grey400,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '60px 0',
        }}
      >
        ... 42 more pages ...
      </div>
    </>
  );
};

const LargePageCounter: React.FC<{ frame: number; isLandscape: boolean }> = ({
  frame,
  isLandscape,
}) => {
  // Page progresses very slowly
  const currentPage = Math.min(Math.floor(interpolate(frame, [0, 180], [1, 5])), 5);
  const progress = interpolate(frame, [0, 180], [2, 10], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: isLandscape ? '6%' : '4%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        style={{
          backgroundColor: BUSINESS_COLORS.warmWhite,
          borderRadius: 24,
          padding: '32px 56px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          border: `4px solid ${BUSINESS_COLORS.grey300}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          minWidth: 380,
        }}
      >
        {/* Page number - EXTRA LARGE */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: BUSINESS_COLORS.grey700,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Page {currentPage} of 47
        </div>

        {/* Progress bar - EXTRA LARGE */}
        <div
          style={{
            width: '100%',
            height: 22,
            backgroundColor: BUSINESS_COLORS.grey200,
            borderRadius: 11,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: BUSINESS_COLORS.coral,
              borderRadius: 11,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Progress percentage */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: BUSINESS_COLORS.grey500,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {Math.round(progress)}% complete
        </div>
      </div>
    </div>
  );
};

const BoredIndicator: React.FC<{ frame: number; isLandscape: boolean }> = ({
  frame,
  isLandscape,
}) => {
  if (frame < 100) return null;

  const opacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' });

  // Yawn emoji grows
  const scale = interpolate(frame, [100, 140], [0.5, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: isLandscape ? '10%' : '6%',
        left: '50%',
        transform: `translateX(-50%) scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: BUSINESS_COLORS.warmWhite,
          borderRadius: 24,
          padding: '28px 44px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          border: `4px solid ${BUSINESS_COLORS.grey300}`,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <span style={{ fontSize: 56 }}>😴</span>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: BUSINESS_COLORS.grey600,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          This is taking forever...
        </div>
      </div>
    </div>
  );
};
