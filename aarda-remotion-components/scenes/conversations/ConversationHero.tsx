/**
 * ConversationHero - 60 second hero video for Character Conversations feature
 *
 * Story arc:
 * 1. Introduction (0-5s): Scene establishes, character appears guarded
 * 2. First exchange (5-20s): Player attempts connection, character is suspicious
 * 3. Building trust (20-40s): Player demonstrates understanding, emotions shift
 * 4. Breakthrough (40-50s): Trust target hit, objective complete
 * 5. Resolution (50-60s): Beat advances, character warmth shown
 */

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ConversationScene, Message, EmotionKeyframe } from './ConversationScene';
import { darkAppTheme } from '../../themes';
import { FadeIn, SlideIn } from '../../components/animations';
import { withOpacity } from '../../utils/colors';

// ============================================================================
// Scene Data
// ============================================================================

const character = {
  name: 'Elara',
  role: 'Village Elder',
  avatarUrl: undefined, // Will use initials fallback
  personality: 'guarded',
};

const player = {
  name: 'Traveler',
  avatarUrl: undefined,
};

// Messages timed for 60-second video at 30fps (1800 frames)
const messages: Message[] = [
  // Introduction - character is guarded
  {
    id: 1,
    content: "Another outsider. What brings you to our village?",
    isPlayer: false,
    startFrame: 30, // 1s
  },
  {
    id: 2,
    content: "I've heard stories of this place. I came seeking wisdom.",
    isPlayer: true,
    startFrame: 150, // 5s
  },
  {
    id: 3,
    content: "Wisdom? Many come seeking, few understand what they find.",
    isPlayer: false,
    startFrame: 270, // 9s
  },
  // Player shows understanding
  {
    id: 4,
    content: "I understand the village has suffered. I don't come to take.",
    isPlayer: true,
    startFrame: 420, // 14s
  },
  {
    id: 5,
    content: "...You know of our troubles?",
    isPlayer: false,
    startFrame: 540, // 18s
  },
  // Building trust
  {
    id: 6,
    content: "The merchant in the valley spoke of your kindness, even in hardship.",
    isPlayer: true,
    startFrame: 660, // 22s
  },
  {
    id: 7,
    content: "Old Brennan... he remembers us well.",
    isPlayer: false,
    startFrame: 810, // 27s
  },
  {
    id: 8,
    content: "He said you once saved his family during the great storm.",
    isPlayer: true,
    startFrame: 930, // 31s
  },
  {
    id: 9,
    content: "That was many winters ago. You've done your research.",
    isPlayer: false,
    startFrame: 1080, // 36s
  },
  // Breakthrough
  {
    id: 10,
    content: "Perhaps... perhaps you are different from the others.",
    isPlayer: false,
    startFrame: 1230, // 41s
  },
  // Resolution
  {
    id: 11,
    content: "Come. Let me show you the ancient library. Few outsiders have seen it.",
    isPlayer: false,
    startFrame: 1500, // 50s
  },
];

// Emotion keyframes showing trust building
const emotionKeyframes: EmotionKeyframe[] = [
  // Initial state - distrustful, guarded
  {
    frame: 0,
    state: {
      joySadness: -0.2,
      trustDisgust: -0.6, // Very distrustful
      fearAnger: 0.1,
      surpriseAnticipation: -0.1,
    },
  },
  // After player's first response - slightly less suspicious
  {
    frame: 270,
    state: {
      joySadness: -0.1,
      trustDisgust: -0.5,
      fearAnger: 0.05,
      surpriseAnticipation: 0.1,
    },
  },
  // Player shows understanding - surprised
  {
    frame: 540,
    state: {
      joySadness: 0,
      trustDisgust: -0.3,
      fearAnger: -0.1,
      surpriseAnticipation: -0.3, // Surprised
    },
  },
  // Remembering the merchant - nostalgia
  {
    frame: 810,
    state: {
      joySadness: 0.1,
      trustDisgust: -0.1,
      fearAnger: -0.2,
      surpriseAnticipation: 0.1,
    },
  },
  // Research acknowledged - respect growing
  {
    frame: 1080,
    state: {
      joySadness: 0.2,
      trustDisgust: 0.2,
      fearAnger: -0.3,
      surpriseAnticipation: 0.2,
    },
  },
  // Breakthrough - trust earned (hits target!)
  {
    frame: 1230,
    state: {
      joySadness: 0.4,
      trustDisgust: 0.5, // Trust target hit!
      fearAnger: -0.4,
      surpriseAnticipation: 0.3,
    },
  },
  // Resolution - warm and welcoming
  {
    frame: 1500,
    state: {
      joySadness: 0.5,
      trustDisgust: 0.7,
      fearAnger: -0.5,
      surpriseAnticipation: 0.4,
    },
  },
];

// ============================================================================
// Main Component
// ============================================================================

export const ConversationHero: React.FC = () => {
  const theme = darkAppTheme;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Title card */}
      <Sequence from={0} durationInFrames={30}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
          }}
        >
          <FadeIn delay={5} duration={15}>
            <div
              style={{
                fontSize: 14,
                color: theme.colors.muted,
                fontFamily: theme.fonts.body,
                textTransform: 'uppercase',
                letterSpacing: 4,
                marginBottom: 16,
              }}
            >
              Character Conversations
            </div>
          </FadeIn>
          <FadeIn delay={10} duration={15}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: theme.colors.foreground,
                fontFamily: theme.fonts.heading,
              }}
            >
              Earning Trust
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Main conversation */}
      <Sequence from={30} durationInFrames={1770}>
        <ConversationScene
          character={character}
          player={player}
          messages={messages.map((m) => ({
            ...m,
            startFrame: m.startFrame - 30, // Adjust for sequence offset
          }))}
          emotionKeyframes={emotionKeyframes.map((k) => ({
            ...k,
            frame: k.frame - 30,
          }))}
          emotionTarget={{
            axis: 'trustDisgust',
            value: 0.5, // Target: earn trust
          }}
          objective={{
            title: 'Earn the Elder\'s Trust',
            description: 'Show understanding and build connection',
          }}
          objectiveCompleteFrame={1200} // ~41s in, when trust hits target
          beatAdvanceFrame={1470} // ~51s in, after resolution begins
          theme={theme}
          typingSpeed={1}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default ConversationHero;
