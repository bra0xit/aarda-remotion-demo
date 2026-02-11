import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
} from 'remotion';
import { ParticleField } from '../../aarda';
import { THEME } from '../theme';
import { ChatMessage } from '../components/ChatMessage';
import { OptionCard } from '../components/OptionCard';
import type { WorldBuilderProps } from '../schema';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

type StepPhase = 'slow' | 'medium' | 'fast';

interface PhaseTimingConfig {
  questionEnd: number;
  optionsStart: number;
  selectionFrame: number;
  morphStart: number;
  morphEnd: number;
  stagger: number;
}

const PHASE_TIMINGS: Record<StepPhase, PhaseTimingConfig> = {
  slow: {
    questionEnd: 15,
    optionsStart: 15,
    selectionFrame: 42,
    morphStart: 95,
    morphEnd: 120,
    stagger: 6,
  },
  medium: {
    questionEnd: 12,
    optionsStart: 12,
    selectionFrame: 32,
    morphStart: 78,
    morphEnd: 100,
    stagger: 4,
  },
  fast: {
    questionEnd: 8,
    optionsStart: 8,
    selectionFrame: 22,
    morphStart: 60,
    morphEnd: 80,
    stagger: 3,
  },
};

const STEP_CONFIGS: Array<{ duration: number; phase: StepPhase }> = [
  { duration: 120, phase: 'slow' },
  { duration: 120, phase: 'slow' },
  { duration: 120, phase: 'slow' },
  { duration: 100, phase: 'medium' },
  { duration: 100, phase: 'medium' },
  { duration: 100, phase: 'medium' },
  { duration: 80, phase: 'fast' },
  { duration: 80, phase: 'fast' },
  { duration: 80, phase: 'fast' },
];

function computeStepStartFrames(): number[] {
  const starts: number[] = [0];
  for (let i = 1; i < STEP_CONFIGS.length; i++) {
    starts.push(starts[i - 1] + STEP_CONFIGS[i - 1].duration);
  }
  return starts;
}

const STEP_STARTS = computeStepStartFrames();

interface BrainstormStepsProps {
  steps: WorldBuilderProps['steps'];
}

// Phase-specific color palettes
const PHASE_COLORS: Record<StepPhase, { particles: string[]; accent: string; borderGlow: string }> = {
  slow: {
    particles: [THEME.colors.particle, THEME.colors.primary, '#8b7cf6'],
    accent: THEME.colors.phaseSlow,
    borderGlow: `${THEME.colors.phaseSlow}30`,
  },
  medium: {
    particles: [THEME.colors.particle, THEME.colors.phaseMedium, '#c084fc', '#f0abfc'],
    accent: THEME.colors.phaseMedium,
    borderGlow: `${THEME.colors.phaseMedium}30`,
  },
  fast: {
    particles: [THEME.colors.phaseFast, '#a78bfa', '#67e8f9', '#34d399'],
    accent: THEME.colors.phaseFast,
    borderGlow: `${THEME.colors.phaseFast}30`,
  },
};

// Boundaries between phases (cumulative frames)
const SLOW_END = 120 * 3;       // 360
const MEDIUM_END = SLOW_END + 100 * 3; // 660

export const BrainstormSteps: React.FC<BrainstormStepsProps> = ({ steps }) => {
  const frame = useCurrentFrame();

  const currentPhase: StepPhase = frame < SLOW_END ? 'slow' : frame < MEDIUM_END ? 'medium' : 'fast';
  const phaseColors = PHASE_COLORS[currentPhase];
  const particleCount = frame < SLOW_END ? 12 : frame < MEDIUM_END ? 18 : 25;

  // Animate border glow color transition
  const borderColor = phaseColors.accent;

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bgAlt }}>
      <ParticleField count={particleCount} colors={phaseColors.particles} />

      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {steps.slice(0, 9).map((step, stepIndex) => {
            if (stepIndex >= STEP_CONFIGS.length) return null;

            const config = STEP_CONFIGS[stepIndex];
            const stepStart = STEP_STARTS[stepIndex];
            const timing = PHASE_TIMINGS[config.phase];
            const localFrame = frame - stepStart;

            if (localFrame < -5 || localFrame > config.duration + 5) return null;

            return (
              <StepRenderer
                key={stepIndex}
                step={step}
                localFrame={localFrame}
                stepStart={stepStart}
                config={config}
                timing={timing}
                accentColor={phaseColors.accent}
              />
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

interface StepRendererProps {
  step: WorldBuilderProps['steps'][number];
  localFrame: number;
  stepStart: number;
  config: { duration: number; phase: StepPhase };
  timing: PhaseTimingConfig;
  accentColor: string;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  localFrame,
  stepStart,
  timing,
  accentColor,
}) => {
  const enterOpacity = interpolate(localFrame, [-5, 0], [0, 1], CLAMP);
  const enterSlide = interpolate(localFrame, [-5, 0], [40, 0], CLAMP);

  const exitOpacity = interpolate(
    localFrame,
    [timing.morphStart, timing.morphEnd],
    [1, 0],
    CLAMP,
  );
  const exitSlide = interpolate(
    localFrame,
    [timing.morphStart, timing.morphEnd],
    [0, -40],
    CLAMP,
  );

  const opacity = Math.min(enterOpacity, exitOpacity);
  const translateY = enterSlide + exitSlide;

  const questionOpacity = interpolate(
    localFrame,
    [0, timing.questionEnd],
    [0, 1],
    CLAMP,
  );

  const isSelected = localFrame >= timing.selectionFrame;
  const flourishFrame = localFrame - timing.selectionFrame;

  const selAdj = localFrame - timing.selectionFrame;

  // Large ambient bloom — fades in smoothly, peaks, then settles as warm glow
  const bloomOpacity = isSelected
    ? interpolate(selAdj, [0, 15, 28, 40], [0, 0.25, 0.18, 0.12], CLAMP)
    : 0;

  // Spotlight strip — a vertical gradient band that illuminates behind the selected area
  const spotlightOpacity = isSelected
    ? interpolate(selAdj, [0, 12, 25, 40], [0, 0.12, 0.08, 0.05], CLAMP)
    : 0;

  // Question text dims after selection — focuses attention on the answer
  const postSelectionQuestionDim = isSelected
    ? interpolate(selAdj, [0, 18], [1, 0.6], CLAMP)
    : 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `translateY(${translateY}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* Ambient bloom — large, soft, cinematic */}
      {bloomOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            width: 1000,
            height: 1000,
            marginLeft: -500,
            marginTop: -300,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${accentColor}40 0%, ${accentColor}15 35%, ${accentColor}05 60%, transparent 80%)`,
            opacity: bloomOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Spotlight strip — vertical light band behind options */}
      {spotlightOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            bottom: 0,
            left: '5%',
            right: '5%',
            background: `linear-gradient(180deg, transparent 0%, ${accentColor}20 30%, ${accentColor}10 70%, transparent 100%)`,
            opacity: spotlightOpacity,
            borderRadius: 8,
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ opacity: questionOpacity * postSelectionQuestionDim, maxWidth: 700, width: '100%' }}>
        <ChatMessage
          sender="ai"
          text={step.question}
          delay={0}
          style={{
            fontSize: 36,
            fontWeight: 700,
            fontFamily: THEME.fonts.heading,
            lineHeight: 1.3,
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 600,
          width: '100%',
        }}
      >
        {step.options.map((option, optIndex) => {
          const optionDelay = timing.optionsStart + optIndex * timing.stagger;
          const optionOpacity = interpolate(
            localFrame,
            [optionDelay, optionDelay + 5],
            [0, 1],
            CLAMP,
          );
          const optionSlideUp = interpolate(
            localFrame,
            [optionDelay, optionDelay + 5],
            [15, 0],
            CLAMP,
          );

          const postSelectionOpacity = isSelected
            ? option.selected
              ? 1
              : interpolate(
                  localFrame,
                  [timing.selectionFrame, timing.selectionFrame + 22],
                  [1, 0.08],
                  CLAMP,
                )
            : 1;

          const isHighlighted = isSelected && option.selected;

          return (
            <div
              key={optIndex}
              style={{
                opacity: optionOpacity * postSelectionOpacity,
                transform: `translateY(${optionSlideUp}px)`,
                transformOrigin: 'left center',
              }}
            >
              <OptionCard
                text={option.text}
                selected={isHighlighted}
                index={0}
                accentColor={accentColor}
                selectionFrame={stepStart + timing.selectionFrame}
              />
            </div>
          );
        })}
      </div>

      {step.flourish && isSelected && (
        <FlourishRenderer
          type={step.flourish.type}
          data={step.flourish.data}
          flourishFrame={flourishFrame}
        />
      )}
    </div>
  );
};

interface FlourishRendererProps {
  type: 'portraits' | 'cascade' | 'colorWash' | 'locationStreak';
  data: string[];
  flourishFrame: number;
}

const FlourishRenderer: React.FC<FlourishRendererProps> = ({
  type,
  data,
  flourishFrame,
}) => {
  const pillAccents = [
    THEME.colors.primary,
    THEME.colors.phaseMedium,
    THEME.colors.phaseFast,
    THEME.colors.accent,
    THEME.colors.particle,
  ];

  if (type === 'portraits') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          marginTop: 8,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {data.map((name, i) => {
          const pillDelay = i * 5;
          const pillOpacity = interpolate(
            flourishFrame,
            [pillDelay, pillDelay + 6, pillDelay + 28, pillDelay + 34],
            [0, 1, 1, 0],
            CLAMP,
          );
          const pillColor = pillAccents[i % pillAccents.length];
          return (
            <div
              key={i}
              style={{
                opacity: pillOpacity,
                padding: '6px 14px',
                borderRadius: 20,
                backgroundColor: `${pillColor}20`,
                border: `1px solid ${pillColor}60`,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: THEME.fonts.body,
                color: pillColor,
              }}
            >
              {name}
            </div>
          );
        })}
      </div>
    );
  }

  if (type === 'cascade') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginTop: 8,
        }}
      >
        {data.map((title, i) => {
          const cascadeDelay = i * 4;
          const cascadeOpacity = interpolate(
            flourishFrame,
            [cascadeDelay, cascadeDelay + 4, cascadeDelay + 26, cascadeDelay + 32],
            [0, 1, 1, 0],
            CLAMP,
          );
          const slideIn = interpolate(
            flourishFrame,
            [cascadeDelay, cascadeDelay + 4],
            [10, 0],
            CLAMP,
          );
          const accentColor = pillAccents[i % pillAccents.length];
          return (
            <div
              key={i}
              style={{
                opacity: cascadeOpacity,
                transform: `translateY(${slideIn}px)`,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: THEME.fonts.body,
                color: accentColor,
                paddingLeft: 12,
                borderLeft: `2px solid ${accentColor}`,
              }}
            >
              {title}
            </div>
          );
        })}
      </div>
    );
  }

  if (type === 'locationStreak') {
    const streakTranslateX = interpolate(
      flourishFrame,
      [0, 40],
      [300, -600],
      CLAMP,
    );

    return (
      <div
        style={{
          overflow: 'hidden',
          marginTop: 8,
          height: 30,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            position: 'absolute',
            whiteSpace: 'nowrap',
            transform: `translateX(${streakTranslateX}px)`,
          }}
        >
          {data.map((location, i) => {
            const labelOpacity = interpolate(
              flourishFrame,
              [i * 4, i * 4 + 5, i * 4 + 28, i * 4 + 34],
              [0, 1, 1, 0],
              CLAMP,
            );
            const locColor = pillAccents[i % pillAccents.length];
            return (
              <div
                key={i}
                style={{
                  opacity: labelOpacity,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: THEME.fonts.body,
                  color: locColor,
                  padding: '4px 10px',
                  borderRadius: 4,
                  backgroundColor: `${locColor}15`,
                  border: `1px solid ${locColor}40`,
                }}
              >
                {location}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
