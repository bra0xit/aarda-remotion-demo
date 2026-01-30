# AARDA Play Launch Video Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 45-second launch video showcasing AARDA Play features with pain points leading to solution reveal.

**Architecture:** Modular scene-based structure with shared theme. Each video segment is a React component, composed into a main `AardaLaunchVideo` composition. Supports both 16:9 and 9:16 orientations.

**Tech Stack:** Remotion, React, TypeScript, aarda-remotion-components library

---

## Task 1: Copy Component Library

**Files:**
- Copy: `aarda-remotion-components/` → `src/aarda/`
- Create: `src/aarda/index.ts`

**Step 1: Copy the component library to src/aarda**

```bash
cp -r aarda-remotion-components/* src/aarda/
```

**Step 2: Create barrel export at src/aarda/index.ts**

```typescript
// Theme exports
export * from './themes';
export * from './themes/types';

// Context exports
export { ThemeProvider, useAardaTheme } from './context/theme-context';

// Animation exports
export {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerChildren,
  TypeWriter,
  CountUp,
  Highlight,
  MorphText,
  Pulse,
} from './components/animations';

// Effect exports
export {
  GlowPulse,
  ParticleField,
  GradientBackground,
  Shimmer,
  Spotlight,
  Vignette,
  FloatingOrbs,
} from './components/effects';

// Layout exports
export {
  FullScreen,
  SplitScreen,
  DeviceFrame,
  GridLayout,
  FocusZone,
  CenteredContent,
  OverlayContainer,
} from './components/layouts';

// UI exports
export {
  AardaButton,
  AardaCard,
  AardaBadge,
  AardaAvatar,
  ChatBubble,
  EmotionBar,
  ObjectiveCard,
  BeatNode,
  MapMarker,
  WizardStep,
  KnowledgeBrickCard,
  TriggerCard,
} from './components/ui/aarda';

// Utility exports
export * from './utils/colors';
export * from './utils/easings';
```

**Step 3: Test imports work**

```bash
npx remotion studio
```

Expected: No import errors, studio opens

**Step 4: Commit**

```bash
git add src/aarda/
git commit -m "feat: add aarda component library to src/aarda"
```

---

## Task 2: Create Hook Scene (0-3s)

**Files:**
- Create: `src/launch/scenes/HookScene.tsx`

**Step 1: Create the hook scene component**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  TypeWriter,
  FadeIn,
  darkAppTheme,
} from '../../aarda';

interface HookSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const HookScene: React.FC<HookSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  // Cursor blink for the prompt
  const cursorOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  // Glitch effect on the repeated answers
  const glitchOffset = Math.sin(frame * 0.5) * 2;

  // Show answers staggered
  const showAnswer1 = frame > 20;
  const showAnswer2 = frame > 30;
  const showAnswer3 = frame > 40;

  // Final flicker before cut
  const finalFlicker = frame > 75 ? (Math.random() > 0.5 ? 0.3 : 1) : 1;

  const fontSize = orientation === 'portrait' ? 28 : 24;
  const answerFontSize = orientation === 'portrait' ? 22 : 18;

  return (
    <FullScreen theme={theme} center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          opacity: finalFlicker,
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            fontFamily: theme.fonts.mono,
            fontSize,
            color: theme.colors.muted,
          }}
        >
          <span style={{ color: theme.colors.primary }}>&gt;</span>{' '}
          <TypeWriter text="What happens next?" delay={0} speed={2} showCursor={false} />
          <span style={{ opacity: cursorOpacity }}>|</span>
        </div>

        {/* Repeated boring answers */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            marginTop: 20,
          }}
        >
          {showAnswer1 && (
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: answerFontSize,
                color: theme.colors.foreground,
                opacity: 0.7,
                transform: `translateX(${glitchOffset}px)`,
              }}
            >
              "The hero wins."
            </div>
          )}
          {showAnswer2 && (
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: answerFontSize,
                color: theme.colors.foreground,
                opacity: 0.5,
                transform: `translateX(${-glitchOffset}px)`,
              }}
            >
              "The hero wins."
            </div>
          )}
          {showAnswer3 && (
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: answerFontSize,
                color: theme.colors.foreground,
                opacity: 0.3,
                transform: `translateX(${glitchOffset * 0.5}px)`,
              }}
            >
              "The hero wins."
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Verify in Remotion studio**

Create a test composition temporarily to check it renders.

**Step 3: Commit**

```bash
git add src/launch/scenes/HookScene.tsx
git commit -m "feat: add launch video hook scene (0-3s)"
```

---

## Task 3: Create Pain Points Scene (3-10s)

**Files:**
- Create: `src/launch/scenes/PainPointsScene.tsx`

**Step 1: Create the pain points scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence, AbsoluteFill } from 'remotion';
import {
  FullScreen,
  FadeIn,
  SlideIn,
  darkAppTheme,
} from '../../aarda';

interface PainPointsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const PainPointsScene: React.FC<PainPointsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const fontSize = orientation === 'portrait' ? 48 : 42;
  const subFontSize = orientation === 'portrait' ? 24 : 20;

  return (
    <FullScreen theme={theme} center>
      {/* Pain Point 1: Static Stories (frames 0-90, which is 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {/* SCRIPTED */}
          <Sequence from={0} durationInFrames={30}>
            <SlideIn direction="left" distance={50}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize,
                  fontWeight: 800,
                  color: theme.colors.foreground,
                  textTransform: 'uppercase',
                  letterSpacing: 4,
                }}
              >
                SCRIPTED.
              </div>
            </SlideIn>
          </Sequence>

          {/* PREDICTABLE */}
          <Sequence from={25} durationInFrames={30}>
            <SlideIn direction="right" distance={50}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize,
                  fontWeight: 800,
                  color: theme.colors.primary,
                  textTransform: 'uppercase',
                  letterSpacing: 4,
                }}
              >
                PREDICTABLE.
              </div>
            </SlideIn>
          </Sequence>

          {/* The same. Every. Time. */}
          <Sequence from={55} durationInFrames={35}>
            <FadeIn delay={0} duration={10}>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: subFontSize,
                  color: theme.colors.muted,
                  marginTop: 20,
                }}
              >
                The same. Every. Time.
              </div>
            </FadeIn>
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      {/* Pain Point 2: Cumbersome Worldbuilding (frames 90-150, which is 2s) */}
      <Sequence from={90} durationInFrames={60}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {/* Chaotic documents visualization */}
          <div style={{ position: 'relative', width: 300, height: 200 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const localFrame = frame - 90;
              const delay = i * 5;
              const opacity = interpolate(localFrame, [delay, delay + 10], [0, 0.8], { extrapolateRight: 'clamp' });
              const rotation = (i - 2) * 8 + Math.sin(localFrame * 0.1 + i) * 3;
              const scale = 0.9 + Math.sin(localFrame * 0.05 + i) * 0.05;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 120,
                    height: 80,
                    backgroundColor: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: 4,
                    left: 90 + i * 15 - 50,
                    top: 60 + (i % 2) * 20,
                    transform: `rotate(${rotation}deg) scale(${scale})`,
                    opacity,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: theme.colors.muted,
                  }}
                >
                  {['wiki.doc', 'chars.xlsx', 'lore.txt', 'map.png', 'notes.md'][i]}
                </div>
              );
            })}
          </div>

          <Sequence from={20}>
            <SlideIn direction="up" distance={30}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: fontSize * 0.7,
                  fontWeight: 700,
                  color: theme.colors.foreground,
                }}
              >
                Months of prep.
              </div>
            </SlideIn>
          </Sequence>

          <Sequence from={35}>
            <FadeIn>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: subFontSize,
                  color: theme.colors.muted,
                }}
              >
                Just to start.
              </div>
            </FadeIn>
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      {/* Pain Point 3: Gatekept by Code (frames 150-210, which is 2s) */}
      <Sequence from={150} durationInFrames={60}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {/* Code flood effect */}
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: theme.colors.primary,
              opacity: 0.4,
              lineHeight: 1.4,
              textAlign: 'center',
              maxWidth: orientation === 'portrait' ? 400 : 600,
            }}
          >
            {`function story() { if (choice === 'A') { return scripted_a; } else if (choice === 'B') { return scripted_b; } }`}
          </div>

          <Sequence from={15}>
            <SlideIn direction="up" distance={30}>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: fontSize * 0.7,
                  fontWeight: 700,
                  color: theme.colors.foreground,
                }}
              >
                Or learn to code.
              </div>
            </SlideIn>
          </Sequence>
        </AbsoluteFill>
      </Sequence>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/PainPointsScene.tsx
git commit -m "feat: add launch video pain points scene (3-10s)"
```

---

## Task 4: Create Solution Reveal Scene (10-14s)

**Files:**
- Create: `src/launch/scenes/SolutionRevealScene.tsx`

**Step 1: Create the solution reveal scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence, Img, staticFile } from 'remotion';
import {
  FullScreen,
  GlowPulse,
  ParticleField,
  FadeIn,
  ScaleIn,
  TypeWriter,
  darkAppTheme,
} from '../../aarda';

interface SolutionRevealSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const SolutionRevealScene: React.FC<SolutionRevealSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const logoSize = orientation === 'portrait' ? 120 : 100;
  const taglineFontSize = orientation === 'portrait' ? 32 : 28;
  const questionFontSize = orientation === 'portrait' ? 24 : 20;

  // Glow expansion
  const glowSize = interpolate(frame, [30, 90], [100, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FullScreen theme={theme} center>
      {/* Expanding glow */}
      <GlowPulse
        color={theme.colors.primary}
        size={glowSize}
        position={{ x: '50%', y: '50%' }}
        minOpacity={0.2}
        maxOpacity={0.5}
        speed={30}
      />

      {/* Particles (subtle) */}
      <Sequence from={60}>
        <ParticleField
          count={15}
          theme={theme}
          minSize={2}
          maxSize={5}
        />
      </Sequence>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* "What if stories could think?" */}
        <Sequence from={30} durationInFrames={60}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: questionFontSize,
                color: theme.colors.muted,
                fontStyle: 'italic',
              }}
            >
              What if stories could think?
            </div>
          </FadeIn>
        </Sequence>

        {/* AARDA Logo */}
        <Sequence from={60}>
          <ScaleIn fromScale={0.8} useSpring>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: logoSize,
                fontWeight: 800,
                color: theme.colors.foreground,
                letterSpacing: 8,
              }}
            >
              AARDA
            </div>
          </ScaleIn>
        </Sequence>

        {/* Tagline */}
        <Sequence from={75}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: taglineFontSize,
                color: theme.colors.primary,
                fontWeight: 500,
              }}
            >
              <TypeWriter
                text="Infinite stories. One engine."
                delay={0}
                speed={2}
                showCursor={false}
              />
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/SolutionRevealScene.tsx
git commit -m "feat: add launch video solution reveal scene (10-14s)"
```

---

## Task 5: Create Feature 1 - AI Conversations Scene (14-20s)

**Files:**
- Create: `src/launch/scenes/Feature1ConversationsScene.tsx`

**Step 1: Create the conversations feature scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  ChatBubble,
  EmotionBar,
  darkAppTheme,
} from '../../aarda';

interface Feature1ConversationsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature1ConversationsScene: React.FC<Feature1ConversationsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Emotion bar animation
  const emotionValue = interpolate(frame, [90, 150], [-0.2, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typing progress for character message
  const typingProgress = interpolate(frame, [45, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FullScreen theme={theme} center={false} padding={orientation === 'portrait' ? 40 : 60}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {/* Title callout */}
        <Sequence from={0} durationInFrames={30}>
          <SlideIn direction={orientation === 'portrait' ? 'down' : 'left'} distance={40}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: titleFontSize,
                fontWeight: 700,
                color: theme.colors.foreground,
              }}
            >
              Characters that feel.
            </div>
          </SlideIn>
        </Sequence>

        {/* Chat demo */}
        <Sequence from={30}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: orientation === 'portrait' ? '100%' : 500,
            }}
          >
            {/* Character message with typing */}
            <FadeIn delay={0} duration={15}>
              <ChatBubble
                message="I remember what you said last time... about wanting to find your father."
                isPlayer={false}
                name="Elara"
                typing={true}
                typingProgress={typingProgress}
                theme={theme}
              />
            </FadeIn>

            {/* Emotion bar */}
            <Sequence from={60}>
              <FadeIn delay={0} duration={15}>
                <div style={{ maxWidth: 300 }}>
                  <EmotionBar
                    labelLeft="Distant"
                    labelRight="Trusting"
                    value={emotionValue}
                    colorLeft="#3b82f6"
                    colorRight="#22c55e"
                    theme={theme}
                  />
                </div>
              </FadeIn>
            </Sequence>

            {/* Player response options */}
            <Sequence from={120}>
              <FadeIn delay={0} duration={15}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <div
                    style={{
                      padding: '8px 16px',
                      backgroundColor: theme.colors.secondary,
                      border: `1px solid ${theme.colors.primary}`,
                      borderRadius: 8,
                      fontSize: 13,
                      color: theme.colors.foreground,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    "Thank you for remembering."
                  </div>
                  <div
                    style={{
                      padding: '8px 16px',
                      backgroundColor: theme.colors.secondary,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: 8,
                      fontSize: 13,
                      color: theme.colors.muted,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    "That's none of your business."
                  </div>
                </div>
              </FadeIn>
            </Sequence>
          </div>
        </Sequence>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/Feature1ConversationsScene.tsx
git commit -m "feat: add launch video feature 1 - AI conversations scene (14-20s)"
```

---

## Task 6: Create Feature 2 - Interactive Maps Scene (20-26s)

**Files:**
- Create: `src/launch/scenes/Feature2MapsScene.tsx`

**Step 1: Create the maps feature scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  MapMarker,
  darkAppTheme,
  withOpacity,
} from '../../aarda';

interface Feature2MapsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature2MapsScene: React.FC<Feature2MapsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Path drawing animation
  const pathProgress = interpolate(frame, [30, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fog reveal
  const fogOpacity = interpolate(frame, [60, 120], [0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mapSize = orientation === 'portrait' ? 350 : 400;

  return (
    <FullScreen theme={theme} center={false} padding={orientation === 'portrait' ? 40 : 60}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {/* Title callout */}
        <Sequence from={0} durationInFrames={30}>
          <SlideIn direction={orientation === 'portrait' ? 'down' : 'left'} distance={40}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: titleFontSize,
                fontWeight: 700,
                color: theme.colors.foreground,
              }}
            >
              Worlds that respond.
            </div>
          </SlideIn>
        </Sequence>

        {/* Map demo */}
        <Sequence from={20}>
          <FadeIn delay={0} duration={20}>
            <div
              style={{
                position: 'relative',
                width: mapSize,
                height: mapSize * 0.8,
                backgroundColor: theme.colors.backgroundAlt,
                borderRadius: 16,
                border: `1px solid ${theme.colors.border}`,
                overflow: 'hidden',
              }}
            >
              {/* Stylized map background */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(circle at 30% 40%, ${withOpacity(theme.colors.primary, 0.1)} 0%, transparent 50%),
                    radial-gradient(circle at 70% 60%, ${withOpacity(theme.colors.accent, 0.1)} 0%, transparent 50%)
                  `,
                }}
              />

              {/* Path line */}
              <svg
                style={{ position: 'absolute', inset: 0 }}
                viewBox={`0 0 ${mapSize} ${mapSize * 0.8}`}
              >
                <path
                  d={`M ${mapSize * 0.2} ${mapSize * 0.6} Q ${mapSize * 0.4} ${mapSize * 0.3} ${mapSize * 0.7} ${mapSize * 0.35}`}
                  stroke={theme.colors.primary}
                  strokeWidth={3}
                  fill="none"
                  strokeDasharray={`${pathProgress * 300} 300`}
                  strokeLinecap="round"
                />
              </svg>

              {/* Starting marker */}
              <div style={{ position: 'absolute', left: '15%', top: '65%' }}>
                <MapMarker name="Village" selected={false} theme={theme} delay={0} />
              </div>

              {/* Destination marker (revealed) */}
              <Sequence from={60}>
                <div style={{ position: 'absolute', left: '62%', top: '30%' }}>
                  <MapMarker name="Ancient Temple" selected={true} hasCharacters={true} theme={theme} delay={0} />
                </div>
              </Sequence>

              {/* Fog of war overlay */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: '50%',
                  height: '100%',
                  background: `linear-gradient(to right, transparent, ${theme.colors.background})`,
                  opacity: fogOpacity,
                }}
              />
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/Feature2MapsScene.tsx
git commit -m "feat: add launch video feature 2 - interactive maps scene (20-26s)"
```

---

## Task 7: Create Feature 3 - Knowledge System Scene (26-31s)

**Files:**
- Create: `src/launch/scenes/Feature3KnowledgeScene.tsx`

**Step 1: Create the knowledge system feature scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  ScaleIn,
  KnowledgeBrickCard,
  darkAppTheme,
  withOpacity,
} from '../../aarda';

interface Feature3KnowledgeSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature3KnowledgeScene: React.FC<Feature3KnowledgeSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Connection lines drawing
  const lineProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FullScreen theme={theme} center={false} padding={orientation === 'portrait' ? 40 : 60}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {/* Title callout */}
        <Sequence from={0} durationInFrames={30}>
          <SlideIn direction={orientation === 'portrait' ? 'down' : 'left'} distance={40}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: titleFontSize,
                fontWeight: 700,
                color: theme.colors.foreground,
              }}
            >
              Lore that connects.
            </div>
          </SlideIn>
        </Sequence>

        {/* Knowledge graph demo */}
        <Sequence from={20}>
          <div
            style={{
              position: 'relative',
              width: orientation === 'portrait' ? 320 : 450,
              height: orientation === 'portrait' ? 280 : 220,
            }}
          >
            {/* Connection lines */}
            <svg
              style={{ position: 'absolute', inset: 0, zIndex: 0 }}
              viewBox="0 0 450 220"
            >
              {/* Main brick to character */}
              <line
                x1="140"
                y1="60"
                x2="300"
                y2="60"
                stroke={theme.colors.primary}
                strokeWidth={2}
                strokeDasharray={`${lineProgress * 160} 160`}
                opacity={0.6}
              />
              {/* Main brick to sub-brick */}
              <line
                x1="100"
                y1="80"
                x2="100"
                y2="160"
                stroke={theme.colors.accent}
                strokeWidth={2}
                strokeDasharray={`${lineProgress * 80} 80`}
                opacity={0.6}
              />
            </svg>

            {/* Main knowledge brick */}
            <Sequence from={0}>
              <ScaleIn fromScale={0.9} delay={0}>
                <div style={{ position: 'absolute', left: 0, top: 20, width: 180 }}>
                  <KnowledgeBrickCard
                    title="The Ancient Prophecy"
                    content="A prophecy foretold the coming of a hero who would..."
                    hasChildren={true}
                    theme={theme}
                  />
                </div>
              </ScaleIn>
            </Sequence>

            {/* Connected character brick */}
            <Sequence from={45}>
              <ScaleIn fromScale={0.9} delay={0}>
                <div style={{ position: 'absolute', right: 0, top: 20, width: 160 }}>
                  <KnowledgeBrickCard
                    title="The Chosen One"
                    theme={theme}
                  />
                </div>
              </ScaleIn>
            </Sequence>

            {/* Sub-brick */}
            <Sequence from={75}>
              <ScaleIn fromScale={0.9} delay={0}>
                <div style={{ position: 'absolute', left: 0, bottom: 0, width: 160 }}>
                  <KnowledgeBrickCard
                    title="Signs of Fulfillment"
                    theme={theme}
                  />
                </div>
              </ScaleIn>
            </Sequence>
          </div>
        </Sequence>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/Feature3KnowledgeScene.tsx
git commit -m "feat: add launch video feature 3 - knowledge system scene (26-31s)"
```

---

## Task 8: Create Feature 4 - Story Beats Scene (31-36s)

**Files:**
- Create: `src/launch/scenes/Feature4StoryBeatsScene.tsx`

**Step 1: Create the story beats feature scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  BeatNode,
  darkAppTheme,
  withOpacity,
} from '../../aarda';

interface Feature4StoryBeatsSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature4StoryBeatsScene: React.FC<Feature4StoryBeatsSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Tension building animation
  const tension = interpolate(frame, [60, 120], [0.3, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Branch reveal
  const branchOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FullScreen theme={theme} center={false} padding={orientation === 'portrait' ? 40 : 60}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {/* Title callout */}
        <Sequence from={0} durationInFrames={30}>
          <SlideIn direction={orientation === 'portrait' ? 'down' : 'left'} distance={40}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: titleFontSize,
                fontWeight: 700,
                color: theme.colors.foreground,
              }}
            >
              Narrative that adapts.
            </div>
          </SlideIn>
        </Sequence>

        {/* Story beats timeline */}
        <Sequence from={20}>
          <FadeIn delay={0} duration={20}>
            <div
              style={{
                display: 'flex',
                flexDirection: orientation === 'portrait' ? 'column' : 'row',
                alignItems: 'center',
                gap: 20,
                position: 'relative',
              }}
            >
              {/* Past beat */}
              <BeatNode
                name="The Call"
                position="1 of 5"
                status="completed"
                tension={0.2}
                theme={theme}
                size="sm"
              />

              {/* Connector */}
              <div
                style={{
                  width: orientation === 'portrait' ? 2 : 40,
                  height: orientation === 'portrait' ? 20 : 2,
                  backgroundColor: theme.colors.border,
                }}
              />

              {/* Active beat */}
              <BeatNode
                name="The Betrayal"
                position="2 of 5"
                status="active"
                tension={tension}
                theme={theme}
                size="md"
              />

              {/* Branch indicator */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  opacity: branchOpacity,
                  marginLeft: orientation === 'portrait' ? 0 : 20,
                }}
              >
                <div
                  style={{
                    padding: '6px 12px',
                    backgroundColor: withOpacity(theme.colors.primary, 0.2),
                    border: `1px solid ${theme.colors.primary}`,
                    borderRadius: 6,
                    fontSize: 11,
                    color: theme.colors.foreground,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  → Your path
                </div>
                <div
                  style={{
                    padding: '6px 12px',
                    backgroundColor: theme.colors.secondary,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: 6,
                    fontSize: 11,
                    color: theme.colors.muted,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  → Alternate
                </div>
              </div>
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/Feature4StoryBeatsScene.tsx
git commit -m "feat: add launch video feature 4 - story beats scene (31-36s)"
```

---

## Task 9: Create Feature 5 - Objectives Scene (36-41s)

**Files:**
- Create: `src/launch/scenes/Feature5ObjectivesScene.tsx`

**Step 1: Create the objectives feature scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  SlideIn,
  FadeIn,
  ScaleIn,
  ObjectiveCard,
  darkAppTheme,
} from '../../aarda';

interface Feature5ObjectivesSceneProps {
  orientation: 'landscape' | 'portrait';
}

export const Feature5ObjectivesScene: React.FC<Feature5ObjectivesSceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const titleFontSize = orientation === 'portrait' ? 36 : 32;

  // Checkbox animation
  const checkProgress = interpolate(frame, [75, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FullScreen theme={theme} center={false} padding={orientation === 'portrait' ? 40 : 60}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {/* Title callout */}
        <Sequence from={0} durationInFrames={30}>
          <SlideIn direction={orientation === 'portrait' ? 'down' : 'left'} distance={40}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: titleFontSize,
                fontWeight: 700,
                color: theme.colors.foreground,
              }}
            >
              Goals that matter.
            </div>
          </SlideIn>
        </Sequence>

        {/* Objectives demo */}
        <Sequence from={20}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              maxWidth: orientation === 'portrait' ? '100%' : 400,
            }}
          >
            {/* Main objective */}
            <FadeIn delay={0} duration={15}>
              <ObjectiveCard
                title="Uncover the Traitor"
                description="Someone in the council is working against you..."
                status="active"
                type="main"
                theme={theme}
              />
            </FadeIn>

            {/* Sub-objectives */}
            <Sequence from={30}>
              <FadeIn delay={0} duration={15}>
                <div
                  style={{
                    marginLeft: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {/* Completed sub-objective */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: theme.fonts.body,
                      fontSize: 13,
                      color: theme.colors.muted,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        backgroundColor: checkProgress > 0.5 ? '#22c55e' : 'transparent',
                        border: `2px solid ${checkProgress > 0.5 ? '#22c55e' : theme.colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: '#fff',
                        transform: `scale(${1 + checkProgress * 0.2})`,
                      }}
                    >
                      {checkProgress > 0.5 && '✓'}
                    </div>
                    <span style={{ textDecoration: checkProgress > 0.5 ? 'line-through' : 'none' }}>
                      Gather evidence from the archives
                    </span>
                  </div>

                  {/* Pending sub-objective */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: theme.fonts.body,
                      fontSize: 13,
                      color: theme.colors.foreground,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: `2px solid ${theme.colors.border}`,
                      }}
                    />
                    <span>Confront the suspect</span>
                  </div>
                </div>
              </FadeIn>
            </Sequence>

            {/* New objective unlocking */}
            <Sequence from={90}>
              <ScaleIn fromScale={0.9} useSpring>
                <ObjectiveCard
                  title="A New Lead"
                  description="The merchant mentioned a secret meeting..."
                  status="pending"
                  type="side"
                  theme={theme}
                />
              </ScaleIn>
            </Sequence>
          </div>
        </Sequence>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/Feature5ObjectivesScene.tsx
git commit -m "feat: add launch video feature 5 - objectives scene (36-41s)"
```

---

## Task 10: Create CTA Scene (41-45s)

**Files:**
- Create: `src/launch/scenes/CTAScene.tsx`

**Step 1: Create the call-to-action scene**

```typescript
import React from 'react';
import { useCurrentFrame, interpolate, Sequence } from 'remotion';
import {
  FullScreen,
  GlowPulse,
  ParticleField,
  FadeIn,
  ScaleIn,
  TypeWriter,
  AardaButton,
  darkAppTheme,
} from '../../aarda';

interface CTASceneProps {
  orientation: 'landscape' | 'portrait';
}

export const CTAScene: React.FC<CTASceneProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const theme = darkAppTheme;

  const logoSize = orientation === 'portrait' ? 72 : 64;
  const taglineFontSize = orientation === 'portrait' ? 28 : 24;
  const urlFontSize = orientation === 'portrait' ? 18 : 16;

  return (
    <FullScreen theme={theme} center>
      {/* Ambient glow */}
      <GlowPulse
        color={theme.colors.primary}
        size={500}
        position={{ x: '50%', y: '50%' }}
        minOpacity={0.1}
        maxOpacity={0.25}
        speed={45}
      />

      {/* Subtle particles */}
      <ParticleField
        count={12}
        theme={theme}
        minSize={2}
        maxSize={4}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: orientation === 'portrait' ? 32 : 24,
          zIndex: 10,
        }}
      >
        {/* AARDA Logo */}
        <Sequence from={0}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: logoSize,
                fontWeight: 800,
                color: theme.colors.foreground,
                letterSpacing: 6,
              }}
            >
              AARDA
            </div>
          </FadeIn>
        </Sequence>

        {/* Tagline */}
        <Sequence from={15}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: taglineFontSize,
                color: theme.colors.primary,
                fontWeight: 500,
              }}
            >
              Infinite stories. One engine.
            </div>
          </FadeIn>
        </Sequence>

        {/* CTA Button */}
        <Sequence from={45}>
          <ScaleIn fromScale={0.9} useSpring>
            <AardaButton variant="primary" size="lg" theme={theme}>
              Join the Waitlist
            </AardaButton>
          </ScaleIn>
        </Sequence>

        {/* URL */}
        <Sequence from={60}>
          <FadeIn delay={0} duration={15}>
            <div
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: urlFontSize,
                color: theme.colors.muted,
              }}
            >
              aarda.ai
            </div>
          </FadeIn>
        </Sequence>
      </div>
    </FullScreen>
  );
};
```

**Step 2: Commit**

```bash
git add src/launch/scenes/CTAScene.tsx
git commit -m "feat: add launch video CTA scene (41-45s)"
```

---

## Task 11: Create Main Composition

**Files:**
- Create: `src/launch/AardaLaunchVideo.tsx`
- Create: `src/launch/index.ts`

**Step 1: Create the main composition that assembles all scenes**

```typescript
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { HookScene } from './scenes/HookScene';
import { PainPointsScene } from './scenes/PainPointsScene';
import { SolutionRevealScene } from './scenes/SolutionRevealScene';
import { Feature1ConversationsScene } from './scenes/Feature1ConversationsScene';
import { Feature2MapsScene } from './scenes/Feature2MapsScene';
import { Feature3KnowledgeScene } from './scenes/Feature3KnowledgeScene';
import { Feature4StoryBeatsScene } from './scenes/Feature4StoryBeatsScene';
import { Feature5ObjectivesScene } from './scenes/Feature5ObjectivesScene';
import { CTAScene } from './scenes/CTAScene';

interface AardaLaunchVideoProps {
  orientation?: 'landscape' | 'portrait';
}

/**
 * AARDA Play Launch Video
 * 45 seconds at 30fps = 1350 frames
 *
 * Timeline:
 * [0-90]     Hook          (0-3s)
 * [90-300]   Pain Points   (3-10s)
 * [300-420]  Solution      (10-14s)
 * [420-600]  Feature 1     (14-20s)
 * [600-780]  Feature 2     (20-26s)
 * [780-930]  Feature 3     (26-31s)
 * [930-1080] Feature 4     (31-36s)
 * [1080-1230] Feature 5    (36-41s)
 * [1230-1350] CTA          (41-45s)
 */
export const AardaLaunchVideo: React.FC<AardaLaunchVideoProps> = ({
  orientation = 'portrait',
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Hook (0-3s, frames 0-90) */}
      <Sequence from={0} durationInFrames={90}>
        <HookScene orientation={orientation} />
      </Sequence>

      {/* Pain Points (3-10s, frames 90-300) */}
      <Sequence from={90} durationInFrames={210}>
        <PainPointsScene orientation={orientation} />
      </Sequence>

      {/* Solution Reveal (10-14s, frames 300-420) */}
      <Sequence from={300} durationInFrames={120}>
        <SolutionRevealScene orientation={orientation} />
      </Sequence>

      {/* Feature 1: AI Conversations (14-20s, frames 420-600) */}
      <Sequence from={420} durationInFrames={180}>
        <Feature1ConversationsScene orientation={orientation} />
      </Sequence>

      {/* Feature 2: Interactive Maps (20-26s, frames 600-780) */}
      <Sequence from={600} durationInFrames={180}>
        <Feature2MapsScene orientation={orientation} />
      </Sequence>

      {/* Feature 3: Knowledge System (26-31s, frames 780-930) */}
      <Sequence from={780} durationInFrames={150}>
        <Feature3KnowledgeScene orientation={orientation} />
      </Sequence>

      {/* Feature 4: Story Beats (31-36s, frames 930-1080) */}
      <Sequence from={930} durationInFrames={150}>
        <Feature4StoryBeatsScene orientation={orientation} />
      </Sequence>

      {/* Feature 5: Objectives (36-41s, frames 1080-1230) */}
      <Sequence from={1080} durationInFrames={150}>
        <Feature5ObjectivesScene orientation={orientation} />
      </Sequence>

      {/* CTA (41-45s, frames 1230-1350) */}
      <Sequence from={1230} durationInFrames={120}>
        <CTAScene orientation={orientation} />
      </Sequence>
    </AbsoluteFill>
  );
};
```

**Step 2: Create barrel export at src/launch/index.ts**

```typescript
export { AardaLaunchVideo } from './AardaLaunchVideo';

// Scene exports for testing
export { HookScene } from './scenes/HookScene';
export { PainPointsScene } from './scenes/PainPointsScene';
export { SolutionRevealScene } from './scenes/SolutionRevealScene';
export { Feature1ConversationsScene } from './scenes/Feature1ConversationsScene';
export { Feature2MapsScene } from './scenes/Feature2MapsScene';
export { Feature3KnowledgeScene } from './scenes/Feature3KnowledgeScene';
export { Feature4StoryBeatsScene } from './scenes/Feature4StoryBeatsScene';
export { Feature5ObjectivesScene } from './scenes/Feature5ObjectivesScene';
export { CTAScene } from './scenes/CTAScene';
```

**Step 3: Commit**

```bash
git add src/launch/
git commit -m "feat: add main AardaLaunchVideo composition"
```

---

## Task 12: Register Compositions in Root.tsx

**Files:**
- Modify: `src/Root.tsx`

**Step 1: Add imports and compositions to Root.tsx**

Add these imports at the top:

```typescript
import { AardaLaunchVideo } from './launch';
```

Add these compositions inside the `RemotionRoot` component (after the Haven Vice section):

```typescript
{/* ========== AARDA LAUNCH VIDEO ========== */}

{/* Launch Video - 9:16 portrait (social) */}
<Composition
  id="AardaLaunch-Portrait"
  component={AardaLaunchVideo}
  durationInFrames={1350} // 45 seconds at 30fps
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{ orientation: 'portrait' as const }}
/>

{/* Launch Video - 16:9 landscape (web/YouTube) */}
<Composition
  id="AardaLaunch-Landscape"
  component={AardaLaunchVideo}
  durationInFrames={1350}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ orientation: 'landscape' as const }}
/>
```

**Step 2: Test in Remotion Studio**

```bash
npx remotion studio
```

Expected: Both compositions appear in the sidebar and render without errors.

**Step 3: Commit**

```bash
git add src/Root.tsx
git commit -m "feat: register AardaLaunchVideo compositions in Root.tsx"
```

---

## Task 13: Final Testing and Polish

**Step 1: Run full preview of both versions**

```bash
npx remotion studio
```

Check:
- All scenes transition smoothly
- Timing feels snappy but readable
- No visual glitches
- Both orientations work

**Step 2: Render test clips**

```bash
npx remotion render AardaLaunch-Portrait out/launch-portrait.mp4
npx remotion render AardaLaunch-Landscape out/launch-landscape.mp4
```

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete AARDA Play launch video implementation"
```

---

## Summary

| Task | Files | Description |
|------|-------|-------------|
| 1 | `src/aarda/` | Copy component library |
| 2 | `src/launch/scenes/HookScene.tsx` | Hook scene (0-3s) |
| 3 | `src/launch/scenes/PainPointsScene.tsx` | Pain points (3-10s) |
| 4 | `src/launch/scenes/SolutionRevealScene.tsx` | Solution reveal (10-14s) |
| 5 | `src/launch/scenes/Feature1ConversationsScene.tsx` | Feature 1 (14-20s) |
| 6 | `src/launch/scenes/Feature2MapsScene.tsx` | Feature 2 (20-26s) |
| 7 | `src/launch/scenes/Feature3KnowledgeScene.tsx` | Feature 3 (26-31s) |
| 8 | `src/launch/scenes/Feature4StoryBeatsScene.tsx` | Feature 4 (31-36s) |
| 9 | `src/launch/scenes/Feature5ObjectivesScene.tsx` | Feature 5 (36-41s) |
| 10 | `src/launch/scenes/CTAScene.tsx` | CTA (41-45s) |
| 11 | `src/launch/AardaLaunchVideo.tsx` | Main composition |
| 12 | `src/Root.tsx` | Register compositions |
| 13 | - | Testing and polish |
