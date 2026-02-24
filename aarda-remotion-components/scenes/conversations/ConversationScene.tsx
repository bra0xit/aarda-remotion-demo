/**
 * ConversationScene - Base component for character conversation videos
 * Shows chat interface with portraits, emotion bars, and message flow
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';
import { AardaTheme } from '../../themes/types';
import { darkAppTheme } from '../../themes';
import { withOpacity, gradient } from '../../utils/colors';
import { easings } from '../../utils/easings';
import { FadeIn, SlideIn, TypeWriter } from '../../components/animations';
import { GlowPulse, Vignette } from '../../components/effects';
import {
  AardaAvatar,
  ChatBubble,
  EmotionBar,
  ObjectiveCard,
  AardaBadge,
} from '../../components/ui/aarda';

// ============================================================================
// Types
// ============================================================================

export interface Message {
  id: number;
  content: string;
  isPlayer: boolean;
  /** Frame when this message appears */
  startFrame: number;
}

export interface EmotionState {
  joySadness: number;      // -1 to 1
  trustDisgust: number;    // -1 to 1
  fearAnger: number;       // -1 to 1
  surpriseAnticipation: number; // -1 to 1
}

export interface EmotionKeyframe {
  frame: number;
  state: EmotionState;
}

export interface Character {
  name: string;
  role?: string;
  avatarUrl?: string;
  personality?: string;
}

export interface ConversationSceneProps {
  /** Character data */
  character: Character;
  /** Player data */
  player?: {
    name: string;
    avatarUrl?: string;
  };
  /** Messages to display */
  messages: Message[];
  /** Emotion keyframes for animation */
  emotionKeyframes: EmotionKeyframe[];
  /** Target emotion for objective (optional) */
  emotionTarget?: {
    axis: 'joySadness' | 'trustDisgust' | 'fearAnger' | 'surpriseAnticipation';
    value: number;
  };
  /** Current objective (optional) */
  objective?: {
    title: string;
    description?: string;
  };
  /** Show objective completion animation at this frame */
  objectiveCompleteFrame?: number;
  /** Show beat advancement at this frame */
  beatAdvanceFrame?: number;
  /** Background image URL (optional) */
  backgroundUrl?: string;
  /** Theme */
  theme?: AardaTheme;
  /** Typing speed (frames per character) */
  typingSpeed?: number;
}

// ============================================================================
// Helper Components
// ============================================================================

const Portrait: React.FC<{
  name: string;
  avatarUrl?: string;
  role?: string;
  isActive: boolean;
  side: 'left' | 'right';
  theme: AardaTheme;
}> = ({ name, avatarUrl, role, isActive, side, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeSpring = spring({
    frame,
    fps,
    config: { stiffness: 200, damping: 20 },
    from: isActive ? 0 : 1,
    to: isActive ? 1 : 0,
  });

  const scale = interpolate(activeSpring, [0, 1], [0.9, 1]);
  const opacity = interpolate(activeSpring, [0, 1], [0.6, 1]);
  const borderOpacity = interpolate(activeSpring, [0, 1], [0.2, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'left' ? 'flex-start' : 'flex-end',
        transform: `scale(${scale})`,
        opacity,
        transition: 'transform 0.3s, opacity 0.3s',
      }}
    >
      <div
        style={{
          borderRadius: 16,
          border: `3px solid ${withOpacity(
            isActive ? '#10b981' : theme.colors.border,
            borderOpacity
          )}`,
          boxShadow: isActive
            ? `0 0 30px ${withOpacity('#10b981', 0.3)}`
            : 'none',
          overflow: 'hidden',
        }}
      >
        <AardaAvatar
          src={avatarUrl}
          name={name}
          size={side === 'left' ? 140 : 80}
          theme={theme}
        />
      </div>
      <div
        style={{
          marginTop: 12,
          textAlign: side === 'left' ? 'left' : 'right',
        }}
      >
        <div
          style={{
            fontSize: side === 'left' ? 18 : 14,
            fontWeight: 600,
            color: theme.colors.foreground,
            fontFamily: theme.fonts.body,
          }}
        >
          {name}
        </div>
        {role && (
          <div
            style={{
              fontSize: 12,
              color: theme.colors.muted,
              fontFamily: theme.fonts.body,
              marginTop: 2,
            }}
          >
            {role}
          </div>
        )}
      </div>
    </div>
  );
};

const EmotionDisplay: React.FC<{
  emotionState: EmotionState;
  target?: ConversationSceneProps['emotionTarget'];
  theme: AardaTheme;
}> = ({ emotionState, target, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine dominant emotion for label
  const emotions = [
    { name: 'Joy', value: emotionState.joySadness, axis: 'joySadness' },
    { name: 'Sadness', value: -emotionState.joySadness, axis: 'joySadness' },
    { name: 'Trust', value: emotionState.trustDisgust, axis: 'trustDisgust' },
    { name: 'Disgust', value: -emotionState.trustDisgust, axis: 'trustDisgust' },
    { name: 'Anger', value: emotionState.fearAnger, axis: 'fearAnger' },
    { name: 'Fear', value: -emotionState.fearAnger, axis: 'fearAnger' },
    { name: 'Anticipation', value: emotionState.surpriseAnticipation, axis: 'surpriseAnticipation' },
    { name: 'Surprise', value: -emotionState.surpriseAnticipation, axis: 'surpriseAnticipation' },
  ];

  const dominant = emotions.reduce((a, b) => (b.value > a.value ? b : a));
  const moodLabel = dominant.value > 0.1 ? dominant.name : 'Neutral';

  return (
    <div
      style={{
        backgroundColor: withOpacity(theme.colors.card, 0.9),
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {/* Mood label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 20 }}>
          {moodLabel === 'Joy' && '😊'}
          {moodLabel === 'Sadness' && '😢'}
          {moodLabel === 'Trust' && '🤝'}
          {moodLabel === 'Disgust' && '😤'}
          {moodLabel === 'Anger' && '😠'}
          {moodLabel === 'Fear' && '😨'}
          {moodLabel === 'Anticipation' && '🤔'}
          {moodLabel === 'Surprise' && '😮'}
          {moodLabel === 'Neutral' && '😐'}
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: theme.colors.foreground,
            fontFamily: theme.fonts.body,
          }}
        >
          {moodLabel}
        </span>
      </div>

      {/* Emotion bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <EmotionBar
          labelLeft="Sadness"
          labelRight="Joy"
          value={emotionState.joySadness}
          colorLeft={theme.colors.emotionSadness}
          colorRight={theme.colors.emotionJoy}
          target={target?.axis === 'joySadness' ? target.value : undefined}
          theme={theme}
        />
        <EmotionBar
          labelLeft="Disgust"
          labelRight="Trust"
          value={emotionState.trustDisgust}
          colorLeft={theme.colors.emotionDisgust}
          colorRight={theme.colors.emotionTrust}
          target={target?.axis === 'trustDisgust' ? target.value : undefined}
          theme={theme}
        />
        <EmotionBar
          labelLeft="Fear"
          labelRight="Anger"
          value={emotionState.fearAnger}
          colorLeft={theme.colors.emotionFear}
          colorRight={theme.colors.emotionAnger}
          target={target?.axis === 'fearAnger' ? target.value : undefined}
          theme={theme}
        />
        <EmotionBar
          labelLeft="Surprise"
          labelRight="Anticipation"
          value={emotionState.surpriseAnticipation}
          colorLeft={theme.colors.emotionSurprise}
          colorRight={theme.colors.emotionAnticipation}
          target={target?.axis === 'surpriseAnticipation' ? target.value : undefined}
          theme={theme}
        />
      </div>
    </div>
  );
};

const ObjectiveComplete: React.FC<{
  title: string;
  theme: AardaTheme;
}> = ({ title, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame,
    fps,
    config: { stiffness: 200, damping: 15 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrySpring, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        backgroundColor: withOpacity(theme.colors.card, 0.95),
        backdropFilter: 'blur(20px)',
        padding: '40px 60px',
        borderRadius: 24,
        border: `2px solid #22c55e`,
        boxShadow: `0 0 60px ${withOpacity('#22c55e', 0.3)}`,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
        }}
      >
        ✓
      </div>
      <div
        style={{
          fontSize: 14,
          color: theme.colors.muted,
          fontFamily: theme.fonts.body,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Objective Complete
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: theme.colors.foreground,
          fontFamily: theme.fonts.heading,
          textAlign: 'center',
        }}
      >
        {title}
      </div>
    </div>
  );
};

const BeatAdvance: React.FC<{
  theme: AardaTheme;
}> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame,
    fps,
    config: { stiffness: 150, damping: 12 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0.9, 1]);
  const opacity = interpolate(entrySpring, [0, 0.5, 1], [0, 1, 1]);
  const y = interpolate(entrySpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 200,
        left: '50%',
        transform: `translateX(-50%) translateY(${y}px) scale(${scale})`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        backgroundColor: withOpacity(theme.colors.primary, 0.9),
        padding: '16px 32px',
        borderRadius: 40,
        boxShadow: `0 0 40px ${withOpacity(theme.colors.primary, 0.4)}`,
      }}
    >
      <span style={{ fontSize: 24 }}>🎭</span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#fff',
          fontFamily: theme.fonts.body,
        }}
      >
        Story Advancing...
      </span>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const ConversationScene: React.FC<ConversationSceneProps> = ({
  character,
  player = { name: 'You' },
  messages,
  emotionKeyframes,
  emotionTarget,
  objective,
  objectiveCompleteFrame,
  beatAdvanceFrame,
  backgroundUrl,
  theme = darkAppTheme,
  typingSpeed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Calculate current emotion state by interpolating between keyframes
  const getCurrentEmotion = (): EmotionState => {
    if (emotionKeyframes.length === 0) {
      return { joySadness: 0, trustDisgust: 0, fearAnger: 0, surpriseAnticipation: 0 };
    }
    if (emotionKeyframes.length === 1) {
      return emotionKeyframes[0].state;
    }

    // Find surrounding keyframes
    let prevKeyframe = emotionKeyframes[0];
    let nextKeyframe = emotionKeyframes[emotionKeyframes.length - 1];

    for (let i = 0; i < emotionKeyframes.length - 1; i++) {
      if (frame >= emotionKeyframes[i].frame && frame < emotionKeyframes[i + 1].frame) {
        prevKeyframe = emotionKeyframes[i];
        nextKeyframe = emotionKeyframes[i + 1];
        break;
      }
    }

    if (frame >= nextKeyframe.frame) {
      return nextKeyframe.state;
    }
    if (frame < prevKeyframe.frame) {
      return prevKeyframe.state;
    }

    // Interpolate
    const progress = (frame - prevKeyframe.frame) / (nextKeyframe.frame - prevKeyframe.frame);
    const eased = easings.smooth(progress);

    return {
      joySadness: prevKeyframe.state.joySadness + (nextKeyframe.state.joySadness - prevKeyframe.state.joySadness) * eased,
      trustDisgust: prevKeyframe.state.trustDisgust + (nextKeyframe.state.trustDisgust - prevKeyframe.state.trustDisgust) * eased,
      fearAnger: prevKeyframe.state.fearAnger + (nextKeyframe.state.fearAnger - prevKeyframe.state.fearAnger) * eased,
      surpriseAnticipation: prevKeyframe.state.surpriseAnticipation + (nextKeyframe.state.surpriseAnticipation - prevKeyframe.state.surpriseAnticipation) * eased,
    };
  };

  const currentEmotion = getCurrentEmotion();

  // Determine active speaker based on most recent message
  const visibleMessages = messages.filter((m) => frame >= m.startFrame);
  const lastMessage = visibleMessages[visibleMessages.length - 1];
  const isPlayerActive = lastMessage?.isPlayer ?? false;

  // Check if typing is in progress
  const currentlyTypingMessage = messages.find((m) => {
    const messageEndFrame = m.startFrame + m.content.length * typingSpeed + 10;
    return frame >= m.startFrame && frame < messageEndFrame && !m.isPlayer;
  });

  return (
    <AbsoluteFill>
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: theme.colors.background,
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom,
            ${withOpacity(theme.colors.background, 0.7)} 0%,
            ${withOpacity(theme.colors.background, 0.9)} 50%,
            ${theme.colors.background} 100%
          )`,
        }}
      />

      {/* Ambient glow */}
      <GlowPulse
        color={theme.colors.primary}
        size={600}
        position={{ x: '30%', y: '40%' }}
        minOpacity={0.1}
        maxOpacity={0.2}
      />

      {/* Vignette */}
      <Vignette intensity={0.4} size={0.4} />

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: 40,
        }}
      >
        {/* Top bar with portraits */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 30,
          }}
        >
          {/* Character portrait (left) */}
          <FadeIn delay={5} duration={20}>
            <Portrait
              name={character.name}
              avatarUrl={character.avatarUrl}
              role={character.role}
              isActive={!isPlayerActive}
              side="left"
              theme={theme}
            />
          </FadeIn>

          {/* Player portrait (right) */}
          <FadeIn delay={10} duration={20}>
            <Portrait
              name={player.name}
              avatarUrl={player.avatarUrl}
              isActive={isPlayerActive}
              side="right"
              theme={theme}
            />
          </FadeIn>
        </div>

        {/* Middle section: messages and emotions */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            gap: 30,
            overflow: 'hidden',
          }}
        >
          {/* Chat messages */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              justifyContent: 'flex-end',
              paddingBottom: 20,
            }}
          >
            {visibleMessages.map((message, index) => {
              const messageAge = frame - message.startFrame;
              const typingDuration = message.content.length * typingSpeed;
              const isTyping = !message.isPlayer && messageAge < typingDuration;
              const typingProgress = isTyping
                ? Math.min(1, messageAge / typingDuration)
                : 1;

              return (
                <SlideIn
                  key={message.id}
                  direction={message.isPlayer ? 'left' : 'right'}
                  delay={0}
                  duration={15}
                >
                  <ChatBubble
                    message={message.content}
                    isPlayer={message.isPlayer}
                    name={message.isPlayer ? player.name : character.name}
                    typing={isTyping}
                    typingProgress={typingProgress}
                    theme={theme}
                  />
                </SlideIn>
              );
            })}

            {/* Typing indicator */}
            {currentlyTypingMessage && (
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  padding: '12px 16px',
                  backgroundColor: theme.colors.characterMessage,
                  borderRadius: 16,
                  width: 'fit-content',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: withOpacity(theme.colors.foreground, 0.5),
                      animation: `bounce 1s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Emotion display (right side) */}
          <div style={{ width: 320, flexShrink: 0 }}>
            <FadeIn delay={15} duration={25}>
              <EmotionDisplay
                emotionState={currentEmotion}
                target={emotionTarget}
                theme={theme}
              />
            </FadeIn>

            {/* Objective card */}
            {objective && (
              <div style={{ marginTop: 20 }}>
                <FadeIn delay={25} duration={20}>
                  <ObjectiveCard
                    title={objective.title}
                    description={objective.description}
                    status="active"
                    type="main"
                    theme={theme}
                  />
                </FadeIn>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Objective complete overlay */}
      {objectiveCompleteFrame && frame >= objectiveCompleteFrame && (
        <Sequence from={objectiveCompleteFrame} durationInFrames={90}>
          <ObjectiveComplete title={objective?.title || 'Objective'} theme={theme} />
        </Sequence>
      )}

      {/* Beat advance overlay */}
      {beatAdvanceFrame && frame >= beatAdvanceFrame && (
        <Sequence from={beatAdvanceFrame} durationInFrames={60}>
          <BeatAdvance theme={theme} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

export default ConversationScene;
