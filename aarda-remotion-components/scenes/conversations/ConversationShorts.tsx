/**
 * ConversationShorts - Three 15-second clips showing character variety
 *
 * Short 1: The Friendly Ally (warm, helpful)
 * Short 2: The Mysterious Stranger (cryptic, intriguing)
 * Short 3: The Grumpy Merchant (irritable but fair)
 */

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ConversationScene, Message, EmotionKeyframe } from './ConversationScene';
import { darkAppTheme } from '../../themes';
import { FadeIn } from '../../components/animations';

// ============================================================================
// Short 1: The Friendly Ally
// ============================================================================

const friendlyCharacter = {
  name: 'Marcus',
  role: 'Traveling Bard',
};

const friendlyMessages: Message[] = [
  {
    id: 1,
    content: "Well met, friend! New to these parts?",
    isPlayer: false,
    startFrame: 15,
  },
  {
    id: 2,
    content: "Just arrived. Any advice for a traveler?",
    isPlayer: true,
    startFrame: 120,
  },
  {
    id: 3,
    content: "Ha! Stick with me - I know every inn and shortcut in the realm!",
    isPlayer: false,
    startFrame: 240,
  },
];

const friendlyEmotions: EmotionKeyframe[] = [
  {
    frame: 0,
    state: { joySadness: 0.6, trustDisgust: 0.5, fearAnger: -0.4, surpriseAnticipation: 0.3 },
  },
  {
    frame: 240,
    state: { joySadness: 0.8, trustDisgust: 0.7, fearAnger: -0.5, surpriseAnticipation: 0.5 },
  },
];

export const ConversationShort1_FriendlyAlly: React.FC = () => {
  const theme = darkAppTheme;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Quick label */}
      <Sequence from={0} durationInFrames={45}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FadeIn delay={5} duration={15}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: theme.colors.emotionTrust,
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                fontFamily: theme.fonts.body,
              }}
            >
              The Friendly Ally
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Conversation */}
      <Sequence from={30} durationInFrames={420}>
        <ConversationScene
          character={friendlyCharacter}
          messages={friendlyMessages.map((m) => ({ ...m, startFrame: m.startFrame - 30 }))}
          emotionKeyframes={friendlyEmotions}
          theme={theme}
          typingSpeed={1}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// Short 2: The Mysterious Stranger
// ============================================================================

const mysteriousCharacter = {
  name: 'The Oracle',
  role: 'Keeper of Secrets',
};

const mysteriousMessages: Message[] = [
  {
    id: 1,
    content: "You seek answers... but are you ready for the questions?",
    isPlayer: false,
    startFrame: 15,
  },
  {
    id: 2,
    content: "I'm ready to learn whatever you can teach.",
    isPlayer: true,
    startFrame: 150,
  },
  {
    id: 3,
    content: "Interesting. The stars whispered of your arrival...",
    isPlayer: false,
    startFrame: 270,
  },
];

const mysteriousEmotions: EmotionKeyframe[] = [
  {
    frame: 0,
    state: { joySadness: 0, trustDisgust: 0.1, fearAnger: -0.2, surpriseAnticipation: 0.6 },
  },
  {
    frame: 270,
    state: { joySadness: 0.1, trustDisgust: 0.2, fearAnger: -0.1, surpriseAnticipation: 0.7 },
  },
];

export const ConversationShort2_MysteriousStranger: React.FC = () => {
  const theme = darkAppTheme;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Quick label */}
      <Sequence from={0} durationInFrames={45}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FadeIn delay={5} duration={15}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                fontFamily: theme.fonts.body,
              }}
            >
              The Mysterious Stranger
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Conversation */}
      <Sequence from={30} durationInFrames={420}>
        <ConversationScene
          character={mysteriousCharacter}
          messages={mysteriousMessages.map((m) => ({ ...m, startFrame: m.startFrame - 30 }))}
          emotionKeyframes={mysteriousEmotions}
          theme={theme}
          typingSpeed={1}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// Short 3: The Grumpy Merchant
// ============================================================================

const grumpyCharacter = {
  name: 'Grognard',
  role: 'Blacksmith',
};

const grumpyMessages: Message[] = [
  {
    id: 1,
    content: "*grumbles* Another customer. What do you want?",
    isPlayer: false,
    startFrame: 15,
  },
  {
    id: 2,
    content: "I need a sword repaired. I heard you're the best.",
    isPlayer: true,
    startFrame: 135,
  },
  {
    id: 3,
    content: "Flattery won't lower my prices! ...But fine, let me see it.",
    isPlayer: false,
    startFrame: 270,
  },
];

const grumpyEmotions: EmotionKeyframe[] = [
  {
    frame: 0,
    state: { joySadness: -0.3, trustDisgust: -0.2, fearAnger: 0.4, surpriseAnticipation: -0.2 },
  },
  {
    frame: 135,
    state: { joySadness: -0.2, trustDisgust: 0, fearAnger: 0.2, surpriseAnticipation: 0.1 },
  },
  {
    frame: 270,
    state: { joySadness: 0.1, trustDisgust: 0.2, fearAnger: 0.1, surpriseAnticipation: 0.2 },
  },
];

export const ConversationShort3_GrumpyMerchant: React.FC = () => {
  const theme = darkAppTheme;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Quick label */}
      <Sequence from={0} durationInFrames={45}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FadeIn delay={5} duration={15}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: theme.colors.emotionAnger,
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                fontFamily: theme.fonts.body,
              }}
            >
              The Grumpy Merchant
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Conversation */}
      <Sequence from={30} durationInFrames={420}>
        <ConversationScene
          character={grumpyCharacter}
          messages={grumpyMessages.map((m) => ({ ...m, startFrame: m.startFrame - 30 }))}
          emotionKeyframes={grumpyEmotions}
          theme={theme}
          typingSpeed={1}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// Exports
// ============================================================================

export default {
  ConversationShort1_FriendlyAlly,
  ConversationShort2_MysteriousStranger,
  ConversationShort3_GrumpyMerchant,
};
