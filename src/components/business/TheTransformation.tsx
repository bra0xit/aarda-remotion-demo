import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import { BUSINESS_COLORS } from '../../themes/business';

/**
 * Scene 2.2: The Transformation
 * Phase 1: Shows how any content becomes an interactive story
 * Phase 2: Explains dynamic AI-generated choices for engagement
 * Phase 3: Demo with question, answer selection, objective, map
 */

export const TheTransformation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isLandscape = width > height;

  // Phase timing
  const phase1End = 55;    // Content → Story concept
  const phase2End = 110;   // Dynamic choices concept
  const phase3Start = 100; // Demo begins (slight overlap for transition)

  return (
    <AbsoluteFill style={{ backgroundColor: BUSINESS_COLORS.cream }}>
      {/* Warm background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${BUSINESS_COLORS.yellowLight}40 0%, ${BUSINESS_COLORS.cream} 70%)`,
        }}
      />

      {/* Phase 1: Content becomes story */}
      {frame < phase1End + 20 && (
        <ContentToStoryIntro frame={frame} fps={fps} isLandscape={isLandscape} phaseEnd={phase1End} />
      )}

      {/* Phase 2: Dynamic choices explanation */}
      {frame >= phase1End - 10 && frame < phase2End + 20 && (
        <DynamicChoicesIntro
          frame={frame - phase1End + 10}
          fps={fps}
          isLandscape={isLandscape}
          phaseEnd={phase2End - phase1End + 10}
        />
      )}

      {/* Phase 3: The actual demo */}
      {frame >= phase3Start && (
        <>
          {/* Main conversation area - centered */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: isLandscape ? '80%' : '90%',
              opacity: interpolate(frame, [phase3Start, phase3Start + 15], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            {/* Character with speech bubble */}
            <ConversationCharacter frame={frame - phase3Start} fps={fps} isLandscape={isLandscape} />

            {/* Multiple choice options */}
            <MultipleChoiceOptions frame={frame - phase3Start} fps={fps} isLandscape={isLandscape} />
          </div>

          {/* Objective completion overlay */}
          <ObjectiveComplete frame={frame - phase3Start} fps={fps} isLandscape={isLandscape} />

          {/* Progress map */}
          <ProgressMap frame={frame - phase3Start} fps={fps} isLandscape={isLandscape} />
        </>
      )}
    </AbsoluteFill>
  );
};

// Phase 1: Shows content transforming into interactive story
const ContentToStoryIntro: React.FC<{ frame: number; fps: number; isLandscape: boolean; phaseEnd: number }> = ({
  frame,
  fps,
  isLandscape,
  phaseEnd,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const fadeOut = interpolate(frame, [phaseEnd - 10, phaseEnd + 10], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Document morphing animation
  const morphProgress = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      {/* Main headline */}
      <div
        style={{
          transform: `translateY(${interpolate(enterSpring, [0, 1], [30, 0])}px)`,
          opacity: enterSpring,
          marginBottom: isLandscape ? 50 : 40,
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <h1
          style={{
            fontSize: isLandscape ? 52 : 42,
            fontWeight: 800,
            color: BUSINESS_COLORS.burgundy,
            fontFamily: 'Inter, system-ui, sans-serif',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Your Content Becomes
        </h1>
        <h1
          style={{
            fontSize: isLandscape ? 58 : 48,
            fontWeight: 800,
            color: BUSINESS_COLORS.coral,
            fontFamily: 'Inter, system-ui, sans-serif',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          An Interactive Story
        </h1>
      </div>

      {/* Visual transformation: Document → Story */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isLandscape ? 60 : 40,
          flexDirection: isLandscape ? 'row' : 'column',
        }}
      >
        {/* Boring document */}
        <div
          style={{
            transform: `scale(${interpolate(morphProgress, [0, 0.5, 1], [1, 0.9, 0.7])})`,
            opacity: interpolate(morphProgress, [0, 0.5, 1], [1, 0.8, 0.3]),
          }}
        >
          <div
            style={{
              width: isLandscape ? 180 : 150,
              height: isLandscape ? 220 : 180,
              backgroundColor: BUSINESS_COLORS.grey200,
              borderRadius: 12,
              padding: 20,
              border: `3px solid ${BUSINESS_COLORS.grey400}`,
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}
          >
            {/* PDF icon */}
            <div
              style={{
                width: 40,
                height: 48,
                backgroundColor: '#E74C3C',
                borderRadius: 6,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>PDF</span>
            </div>
            {/* Text lines */}
            {[80, 60, 70, 50, 65].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}%`,
                  height: 10,
                  backgroundColor: BUSINESS_COLORS.grey400,
                  borderRadius: 4,
                  marginBottom: 10,
                }}
              />
            ))}
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: 16,
              fontSize: isLandscape ? 20 : 16,
              color: BUSINESS_COLORS.grey500,
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
            }}
          >
            Static Content
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: isLandscape ? 60 : 48,
            color: BUSINESS_COLORS.coral,
            transform: `scale(${interpolate(morphProgress, [0.3, 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
          }}
        >
          →
        </div>

        {/* Interactive story */}
        <div
          style={{
            transform: `scale(${interpolate(morphProgress, [0.4, 1], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
            opacity: interpolate(morphProgress, [0.4, 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              width: isLandscape ? 200 : 170,
              height: isLandscape ? 240 : 200,
              backgroundColor: BUSINESS_COLORS.warmWhite,
              borderRadius: 20,
              padding: 20,
              border: `4px solid ${BUSINESS_COLORS.coral}`,
              boxShadow: `0 12px 40px ${BUSINESS_COLORS.coral}30`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Character icon */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: BUSINESS_COLORS.beige,
                border: `3px solid ${BUSINESS_COLORS.burgundy}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              🎭
            </div>
            {/* Speech bubble */}
            <div
              style={{
                backgroundColor: BUSINESS_COLORS.beige,
                padding: '10px 16px',
                borderRadius: 12,
                fontSize: isLandscape ? 14 : 12,
                color: BUSINESS_COLORS.burgundy,
                fontFamily: 'Inter, system-ui, sans-serif',
                textAlign: 'center',
              }}
            >
              "Let me guide you..."
            </div>
            {/* Choice buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
              <div
                style={{
                  backgroundColor: BUSINESS_COLORS.coral,
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                Choice A
              </div>
              <div
                style={{
                  backgroundColor: BUSINESS_COLORS.grey200,
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  color: BUSINESS_COLORS.grey600,
                  textAlign: 'center',
                }}
              >
                Choice B
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: 16,
              fontSize: isLandscape ? 20 : 16,
              color: BUSINESS_COLORS.coral,
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
            }}
          >
            Interactive Story
          </div>
        </div>
      </div>
    </div>
  );
};

// Phase 2: Explains dynamic AI-generated choices
const DynamicChoicesIntro: React.FC<{ frame: number; fps: number; isLandscape: boolean; phaseEnd: number }> = ({
  frame,
  fps,
  isLandscape,
  phaseEnd,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const fadeOut = interpolate(frame, [phaseEnd - 15, phaseEnd + 5], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Choice generation animation
  const choiceReveal = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sparkle animation
  const sparkle = Math.sin(frame * 0.2) * 0.3 + 0.7;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      {/* Headline */}
      <div
        style={{
          transform: `translateY(${interpolate(enterSpring, [0, 1], [30, 0])}px)`,
          opacity: enterSpring,
          marginBottom: isLandscape ? 40 : 30,
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <h1
          style={{
            fontSize: isLandscape ? 48 : 38,
            fontWeight: 800,
            color: BUSINESS_COLORS.burgundy,
            fontFamily: 'Inter, system-ui, sans-serif',
            margin: 0,
            marginBottom: 8,
          }}
        >
          AI-Generated Choices
        </h1>
        <p
          style={{
            fontSize: isLandscape ? 28 : 22,
            fontWeight: 500,
            color: BUSINESS_COLORS.grey600,
            fontFamily: 'Inter, system-ui, sans-serif',
            margin: 0,
          }}
        >
          Personalized to your content
        </p>
      </div>

      {/* Visual: AI generating choices */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* AI brain icon */}
        <div
          style={{
            width: isLandscape ? 120 : 100,
            height: isLandscape ? 120 : 100,
            borderRadius: '50%',
            backgroundColor: BUSINESS_COLORS.coral,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 ${40 * sparkle}px ${BUSINESS_COLORS.coral}60`,
            transform: `scale(${0.95 + sparkle * 0.1})`,
          }}
        >
          <span style={{ fontSize: isLandscape ? 60 : 50 }}>🧠</span>
        </div>

        {/* Connecting lines animation */}
        <div
          style={{
            display: 'flex',
            gap: isLandscape ? 30 : 20,
            opacity: interpolate(choiceReveal, [0, 0.3], [0, 1]),
          }}
        >
          {['↙️', '⬇️', '↘️'].map((arrow, i) => (
            <span
              key={i}
              style={{
                fontSize: isLandscape ? 36 : 28,
                opacity: interpolate(choiceReveal, [i * 0.2, i * 0.2 + 0.3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              {arrow}
            </span>
          ))}
        </div>

        {/* Generated choices */}
        <div
          style={{
            display: 'flex',
            gap: isLandscape ? 20 : 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: isLandscape ? 700 : 400,
          }}
        >
          {[
            { text: 'Report immediately', correct: true, delay: 0.3 },
            { text: 'Wait and observe', correct: false, delay: 0.5 },
            { text: 'Handle quietly', correct: false, delay: 0.7 },
          ].map((choice, i) => {
            const choiceOpacity = interpolate(choiceReveal, [choice.delay, choice.delay + 0.2], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const choiceY = interpolate(choiceReveal, [choice.delay, choice.delay + 0.2], [20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  backgroundColor: BUSINESS_COLORS.warmWhite,
                  padding: isLandscape ? '18px 28px' : '14px 20px',
                  borderRadius: 16,
                  border: `3px solid ${choice.correct ? BUSINESS_COLORS.green : BUSINESS_COLORS.grey300}`,
                  boxShadow: choice.correct ? `0 6px 25px ${BUSINESS_COLORS.green}30` : '0 4px 15px rgba(0,0,0,0.08)',
                  opacity: choiceOpacity,
                  transform: `translateY(${choiceY}px)`,
                }}
              >
                <span
                  style={{
                    fontSize: isLandscape ? 22 : 18,
                    fontWeight: 600,
                    color: choice.correct ? BUSINESS_COLORS.green : BUSINESS_COLORS.grey600,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  {choice.text}
                </span>
                {choice.correct && (
                  <span style={{ marginLeft: 10, fontSize: isLandscape ? 20 : 16 }}>✓</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div
          style={{
            display: 'flex',
            gap: isLandscape ? 40 : 24,
            marginTop: 24,
            opacity: interpolate(choiceReveal, [0.8, 1], [0, 1]),
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { icon: '📈', text: 'Higher Engagement' },
            { icon: '🧠', text: 'Better Retention' },
            { icon: '✨', text: 'Personalized Learning' },
          ].map((benefit, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: BUSINESS_COLORS.yellowLight,
                padding: isLandscape ? '12px 20px' : '10px 16px',
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: isLandscape ? 28 : 24 }}>{benefit.icon}</span>
              <span
                style={{
                  fontSize: isLandscape ? 20 : 16,
                  fontWeight: 700,
                  color: BUSINESS_COLORS.burgundy,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ConversationCharacter: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  // Character enters
  const enterSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const characterY = interpolate(enterSpring, [0, 1], [50, 0]);
  const characterOpacity = interpolate(enterSpring, [0, 0.5, 1], [0, 1, 1]);

  // Speech bubble appears after character
  const bubbleSpring = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 100, damping: 12 },
  });

  const bubbleScale = interpolate(bubbleSpring, [0, 1], [0.8, 1]);
  const bubbleOpacity = interpolate(bubbleSpring, [0, 0.5, 1], [0, 1, 1]);

  // Fade out when answer is selected
  const fadeOut = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isLandscape ? 'row' : 'column',
        alignItems: 'center',
        gap: isLandscape ? 40 : 24,
        marginBottom: isLandscape ? 40 : 30,
        opacity: fadeOut,
      }}
    >
      {/* Character */}
      <div
        style={{
          transform: `translateY(${characterY}px)`,
          opacity: characterOpacity,
        }}
      >
        <GuideCharacter frame={frame} />
      </div>

      {/* Speech bubble with question */}
      <div
        style={{
          transform: `scale(${bubbleScale})`,
          opacity: bubbleOpacity * fadeOut,
        }}
      >
        <div
          style={{
            backgroundColor: BUSINESS_COLORS.warmWhite,
            padding: isLandscape ? '32px 40px' : '28px 36px',
            borderRadius: 28,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: `3px solid ${BUSINESS_COLORS.coral}20`,
            maxWidth: isLandscape ? 500 : 400,
            position: 'relative',
          }}
        >
          {/* Speech bubble pointer */}
          <div
            style={{
              position: 'absolute',
              left: isLandscape ? -20 : '50%',
              top: isLandscape ? '50%' : -20,
              transform: isLandscape ? 'translateY(-50%)' : 'translateX(-50%)',
              width: 0,
              height: 0,
              borderTop: isLandscape ? '15px solid transparent' : `20px solid ${BUSINESS_COLORS.warmWhite}`,
              borderBottom: isLandscape ? '15px solid transparent' : 'none',
              borderRight: isLandscape ? `20px solid ${BUSINESS_COLORS.warmWhite}` : '15px solid transparent',
              borderLeft: isLandscape ? 'none' : '15px solid transparent',
            }}
          />

          <div
            style={{
              fontSize: isLandscape ? 32 : 28,
              fontWeight: 600,
              color: BUSINESS_COLORS.burgundy,
              fontFamily: 'Inter, system-ui, sans-serif',
              lineHeight: 1.4,
              textAlign: 'center',
            }}
          >
            What should you do if you notice a data breach?
          </div>
        </div>
      </div>
    </div>
  );
};

const GuideCharacter: React.FC<{ frame: number }> = ({ frame }) => {
  // Subtle idle animation
  const breathe = Math.sin(frame * 0.1) * 3;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translateY(${breathe}px)`,
      }}
    >
      {/* Head */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: BUSINESS_COLORS.beige,
          border: `5px solid ${BUSINESS_COLORS.burgundy}`,
          position: 'relative',
        }}
      >
        {/* Hair */}
        <div
          style={{
            position: 'absolute',
            top: -5,
            left: 15,
            right: 15,
            height: 45,
            borderRadius: '50px 50px 0 0',
            backgroundColor: BUSINESS_COLORS.burgundy,
          }}
        />
        {/* Friendly eyes */}
        <div style={{ position: 'absolute', top: 42, left: 22, display: 'flex', gap: 26 }}>
          <div style={{ width: 14, height: 14, backgroundColor: BUSINESS_COLORS.grey700, borderRadius: '50%' }} />
          <div style={{ width: 14, height: 14, backgroundColor: BUSINESS_COLORS.grey700, borderRadius: '50%' }} />
        </div>
        {/* Smile */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 30,
            height: 15,
            borderBottom: `4px solid ${BUSINESS_COLORS.grey700}`,
            borderRadius: '0 0 50% 50%',
          }}
        />
      </div>

      {/* Body */}
      <div
        style={{
          width: 130,
          height: 120,
          backgroundColor: BUSINESS_COLORS.coral,
          borderRadius: '65px 65px 20px 20px',
          marginTop: -15,
        }}
      />

      {/* Name badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          backgroundColor: BUSINESS_COLORS.warmWhite,
          padding: '8px 16px',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: BUSINESS_COLORS.burgundy,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Guide
        </span>
      </div>
    </div>
  );
};

const MultipleChoiceOptions: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  const options = [
    { text: 'Report it immediately', correct: true },
    { text: 'Wait and see if it resolves', correct: false },
    { text: 'Handle it yourself quietly', correct: false },
  ];

  // Options appear staggered
  const showOptions = frame > 25;

  // Selection animation - correct answer gets selected at frame 55
  const selectionProgress = interpolate(frame, [55, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out after selection
  const fadeOut = interpolate(frame, [75, 95], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (!showOptions) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
        maxWidth: isLandscape ? 600 : 500,
        opacity: fadeOut,
      }}
    >
      {options.map((option, i) => {
        const optionSpring = spring({
          frame: frame - 25 - i * 8,
          fps,
          config: { stiffness: 120, damping: 12 },
        });

        const scale = interpolate(optionSpring, [0, 1], [0.9, 1]);
        const opacity = interpolate(optionSpring, [0, 0.5, 1], [0, 1, 1]);
        const y = interpolate(optionSpring, [0, 1], [20, 0]);

        // Correct answer gets highlighted
        const isSelected = option.correct && selectionProgress > 0;
        const wrongFade = !option.correct ? interpolate(selectionProgress, [0, 1], [1, 0.4]) : 1;

        return (
          <div
            key={i}
            style={{
              transform: `scale(${scale}) translateY(${y}px)`,
              opacity: opacity * wrongFade,
            }}
          >
            <div
              style={{
                backgroundColor: isSelected ? BUSINESS_COLORS.green : BUSINESS_COLORS.warmWhite,
                padding: isLandscape ? '24px 32px' : '20px 28px',
                borderRadius: 20,
                border: `4px solid ${isSelected ? BUSINESS_COLORS.green : BUSINESS_COLORS.grey300}`,
                boxShadow: isSelected
                  ? `0 8px 30px ${BUSINESS_COLORS.green}40`
                  : '0 4px 16px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Option letter */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: isSelected ? BUSINESS_COLORS.warmWhite : BUSINESS_COLORS.coral,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: isSelected ? BUSINESS_COLORS.green : BUSINESS_COLORS.warmWhite,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  {isSelected ? '✓' : String.fromCharCode(65 + i)}
                </span>
              </div>

              {/* Option text */}
              <span
                style={{
                  fontSize: isLandscape ? 26 : 22,
                  fontWeight: 600,
                  color: isSelected ? BUSINESS_COLORS.warmWhite : BUSINESS_COLORS.grey700,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {option.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ObjectiveComplete: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  // Show objective completion from frame 70-100
  const showObjective = frame >= 70 && frame <= 110;
  if (!showObjective) return null;

  const objectiveSpring = spring({
    frame: frame - 70,
    fps,
    config: { stiffness: 150, damping: 12 },
  });

  const scale = interpolate(objectiveSpring, [0, 1], [0.5, 1]);
  const opacity = interpolate(frame, [70, 80, 100, 110], [0, 1, 1, 0]);

  // Checkmark draw animation
  const checkProgress = interpolate(frame, [75, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex: 20,
      }}
    >
      <div
        style={{
          backgroundColor: BUSINESS_COLORS.warmWhite,
          padding: isLandscape ? '48px 64px' : '40px 56px',
          borderRadius: 32,
          boxShadow: '0 16px 60px rgba(0,0,0,0.2)',
          border: `5px solid ${BUSINESS_COLORS.green}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Big checkmark */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: BUSINESS_COLORS.green,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 30px ${BUSINESS_COLORS.green}50`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path
              d="M15 32 L25 42 L45 18"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset={60 - checkProgress * 60}
            />
          </svg>
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: isLandscape ? 36 : 32,
              fontWeight: 700,
              color: BUSINESS_COLORS.green,
              fontFamily: 'Inter, system-ui, sans-serif',
              marginBottom: 8,
            }}
          >
            Objective Complete!
          </div>
          <div
            style={{
              fontSize: isLandscape ? 22 : 20,
              color: BUSINESS_COLORS.grey500,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            +50 XP earned
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressMap: React.FC<{ frame: number; fps: number; isLandscape: boolean }> = ({
  frame,
  fps,
  isLandscape,
}) => {
  // Map appears from frame 80, takes over the whole screen
  const showMap = frame >= 80;
  if (!showMap) return null;

  const mapSpring = spring({
    frame: frame - 80,
    fps,
    config: { stiffness: 60, damping: 14 },
  });

  const mapScale = interpolate(mapSpring, [0, 1], [0.8, 1]);
  const mapOpacity = interpolate(mapSpring, [0, 0.5, 1], [0, 1, 1]);

  // New location unlock animation
  const unlockProgress = interpolate(frame, [95, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Locations on the map - more interesting layout
  const locations = [
    { name: 'Welcome Camp', icon: '🏕️', x: 8, y: 75, completed: true, current: false },
    { name: 'Data Fortress', icon: '🏰', x: 28, y: 35, completed: true, current: false },
    { name: 'Privacy Island', icon: '🏝️', x: 55, y: 65, completed: false, current: true, unlocking: true },
    { name: 'Compliance Peak', icon: '⛰️', x: 75, y: 30, completed: false, current: false },
    { name: 'Master Temple', icon: '🏛️', x: 92, y: 55, completed: false, current: false },
  ];

  // Floating clouds animation
  const cloudOffset = Math.sin(frame * 0.03) * 10;

  // Glowing path animation
  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BUSINESS_COLORS.cream,
        opacity: mapOpacity,
        transform: `scale(${mapScale})`,
      }}
    >
      {/* Sky gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, #87CEEB 0%, #E0F4FF 40%, ${BUSINESS_COLORS.beige} 100%)`,
        }}
      />

      {/* Animated clouds */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: `${10 + cloudOffset * 0.5}%`,
          fontSize: 60,
          opacity: 0.8,
        }}
      >
        ☁️
      </div>
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: `${15 - cloudOffset * 0.3}%`,
          fontSize: 50,
          opacity: 0.6,
        }}
      >
        ☁️
      </div>
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: `translateX(${cloudOffset}px)`,
          fontSize: 45,
          opacity: 0.7,
        }}
      >
        ☁️
      </div>

      {/* Decorative elements - trees and mountains */}
      <div style={{ position: 'absolute', bottom: '20%', left: '3%', fontSize: 50, opacity: 0.6 }}>🌲</div>
      <div style={{ position: 'absolute', bottom: '25%', left: '15%', fontSize: 40, opacity: 0.5 }}>🌲</div>
      <div style={{ position: 'absolute', bottom: '30%', right: '5%', fontSize: 55, opacity: 0.6 }}>🌲</div>
      <div style={{ position: 'absolute', bottom: '35%', right: '18%', fontSize: 45, opacity: 0.5 }}>🌲</div>
      <div style={{ position: 'absolute', top: '25%', left: '40%', fontSize: 35, opacity: 0.4 }}>🌿</div>
      <div style={{ position: 'absolute', top: '45%', right: '35%', fontSize: 30, opacity: 0.4 }}>🌿</div>

      {/* Main map container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isLandscape ? '90%' : '95%',
          height: isLandscape ? '75%' : '70%',
        }}
      >
        {/* Map title banner */}
        <div
          style={{
            position: 'absolute',
            top: isLandscape ? -60 : -50,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: BUSINESS_COLORS.burgundy,
            padding: isLandscape ? '16px 48px' : '14px 36px',
            borderRadius: 20,
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: isLandscape ? 36 : 30 }}>🗺️</span>
          <span
            style={{
              fontSize: isLandscape ? 36 : 28,
              fontWeight: 800,
              color: BUSINESS_COLORS.warmWhite,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            Your Learning Adventure
          </span>
        </div>

        {/* Progress indicator */}
        <div
          style={{
            position: 'absolute',
            top: isLandscape ? -60 : -50,
            right: 0,
            backgroundColor: BUSINESS_COLORS.warmWhite,
            padding: isLandscape ? '12px 24px' : '10px 20px',
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: isLandscape ? 28 : 24,
              fontWeight: 700,
              color: BUSINESS_COLORS.coral,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            2/5
          </div>
          <div
            style={{
              fontSize: isLandscape ? 18 : 16,
              color: BUSINESS_COLORS.grey500,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            Complete
          </div>
        </div>

        {/* SVG Paths connecting locations */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Dotted path for uncompleted */}
          <path
            d="M 8% 75% Q 18% 50%, 28% 35% Q 40% 45%, 55% 65% Q 65% 45%, 75% 30% Q 85% 40%, 92% 55%"
            fill="none"
            stroke={BUSINESS_COLORS.grey300}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="20 15"
            opacity="0.6"
          />

          {/* Glowing completed path */}
          <path
            d="M 8% 75% Q 18% 50%, 28% 35%"
            fill="none"
            stroke={BUSINESS_COLORS.green}
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Currently unlocking path - animated */}
          <path
            d="M 28% 35% Q 40% 45%, 55% 65%"
            fill="none"
            stroke={BUSINESS_COLORS.coral}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="200"
            strokeDashoffset={200 - unlockProgress * 200}
            filter="url(#glowOrange)"
            opacity={glowPulse}
          />

          {/* Glow filters */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Location markers */}
        {locations.map((loc, i) => {
          const isUnlocking = loc.unlocking && unlockProgress > 0;
          const unlockScale = loc.unlocking
            ? interpolate(unlockProgress, [0, 0.5, 1], [0.8, 1.3, 1])
            : 1;

          // Bounce animation for completed locations
          const bounce = loc.completed ? Math.sin(frame * 0.1 + i) * 3 : 0;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                transform: `translate(-50%, -50%) scale(${unlockScale}) translateY(${bounce}px)`,
                zIndex: loc.current ? 10 : 5,
              }}
            >
              {/* Glow ring for unlocking */}
              {isUnlocking && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isLandscape ? 140 : 120,
                    height: isLandscape ? 140 : 120,
                    borderRadius: '50%',
                    border: `4px solid ${BUSINESS_COLORS.coral}`,
                    opacity: glowPulse * unlockProgress,
                    boxShadow: `0 0 40px ${BUSINESS_COLORS.coral}80`,
                  }}
                />
              )}

              {/* Location platform */}
              <div
                style={{
                  width: isLandscape ? 100 : 85,
                  height: isLandscape ? 100 : 85,
                  borderRadius: '50%',
                  backgroundColor: loc.completed
                    ? BUSINESS_COLORS.green
                    : isUnlocking
                      ? BUSINESS_COLORS.coral
                      : BUSINESS_COLORS.grey400,
                  border: `6px solid ${BUSINESS_COLORS.warmWhite}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isUnlocking
                    ? `0 0 50px ${BUSINESS_COLORS.coral}80, 0 8px 30px rgba(0,0,0,0.3)`
                    : loc.completed
                      ? `0 0 30px ${BUSINESS_COLORS.green}50, 0 8px 25px rgba(0,0,0,0.2)`
                      : '0 6px 20px rgba(0,0,0,0.2)',
                }}
              >
                <span style={{ fontSize: isLandscape ? 48 : 40 }}>{loc.icon}</span>
              </div>

              {/* Checkmark badge for completed */}
              {loc.completed && (
                <div
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: BUSINESS_COLORS.warmWhite,
                    border: `3px solid ${BUSINESS_COLORS.green}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: BUSINESS_COLORS.green, fontSize: 20, fontWeight: 700 }}>✓</span>
                </div>
              )}

              {/* Location name label */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: 12,
                  backgroundColor: loc.completed || isUnlocking ? BUSINESS_COLORS.warmWhite : 'rgba(255,255,255,0.8)',
                  padding: isLandscape ? '10px 20px' : '8px 16px',
                  borderRadius: 12,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    fontSize: isLandscape ? 20 : 16,
                    fontWeight: 700,
                    color: loc.completed
                      ? BUSINESS_COLORS.green
                      : isUnlocking
                        ? BUSINESS_COLORS.coral
                        : BUSINESS_COLORS.grey500,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  {loc.name}
                </span>
              </div>

              {/* Sparkle burst for unlocking */}
              {isUnlocking && unlockProgress > 0.5 && (
                <>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => {
                    const distance = 70 + Math.sin(frame * 0.2 + j) * 10;
                    return (
                      <div
                        key={j}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: 14,
                          height: 14,
                          backgroundColor: j % 2 === 0 ? BUSINESS_COLORS.yellow : BUSINESS_COLORS.coral,
                          borderRadius: '50%',
                          transform: `rotate(${angle}deg) translateY(-${distance}px)`,
                          opacity: interpolate(unlockProgress, [0.5, 1], [0, 1]) * glowPulse,
                          boxShadow: `0 0 10px ${j % 2 === 0 ? BUSINESS_COLORS.yellow : BUSINESS_COLORS.coral}`,
                        }}
                      />
                    );
                  })}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* New location unlocked banner - big and exciting */}
      {unlockProgress > 0.6 && (
        <div
          style={{
            position: 'absolute',
            bottom: isLandscape ? '8%' : '5%',
            left: '50%',
            transform: `translateX(-50%) scale(${interpolate(unlockProgress, [0.6, 1], [0.8, 1])})`,
            opacity: interpolate(unlockProgress, [0.6, 0.8], [0, 1]),
          }}
        >
          <div
            style={{
              backgroundColor: BUSINESS_COLORS.coral,
              padding: isLandscape ? '24px 56px' : '20px 40px',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: `0 10px 40px ${BUSINESS_COLORS.coral}60`,
            }}
          >
            <span style={{ fontSize: isLandscape ? 48 : 40 }}>🔓</span>
            <div>
              <div
                style={{
                  fontSize: isLandscape ? 32 : 26,
                  fontWeight: 800,
                  color: BUSINESS_COLORS.warmWhite,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                New Location Unlocked!
              </div>
              <div
                style={{
                  fontSize: isLandscape ? 22 : 18,
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Privacy Island is now accessible
              </div>
            </div>
            <span style={{ fontSize: isLandscape ? 48 : 40 }}>🏝️</span>
          </div>
        </div>
      )}

      {/* XP earned floating indicator */}
      {unlockProgress > 0.3 && (
        <div
          style={{
            position: 'absolute',
            top: isLandscape ? '15%' : '12%',
            right: isLandscape ? '10%' : '5%',
            transform: `translateY(${interpolate(unlockProgress, [0.3, 0.6], [20, 0])}px)`,
            opacity: interpolate(unlockProgress, [0.3, 0.5], [0, 1]),
          }}
        >
          <div
            style={{
              backgroundColor: BUSINESS_COLORS.yellow,
              padding: isLandscape ? '16px 28px' : '12px 24px',
              borderRadius: 16,
              boxShadow: `0 6px 25px ${BUSINESS_COLORS.yellow}60`,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ fontSize: isLandscape ? 32 : 28 }}>⭐</span>
            <span
              style={{
                fontSize: isLandscape ? 28 : 24,
                fontWeight: 800,
                color: BUSINESS_COLORS.burgundy,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              +50 XP
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
