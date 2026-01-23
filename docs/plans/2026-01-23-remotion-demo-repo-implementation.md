# Remotion Demo Repository Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a template-based Remotion repository for creating various demo videos with 5 templates, 10 themes, and multi-format output support.

**Architecture:** Template-based system where `npm run new-video` scaffolds compositions from pre-built templates. Themes are React context providers. Components are reusable scene/UI building blocks. CLI scripts handle video creation and rendering.

**Tech Stack:** Remotion 4.x, React 18, TypeScript, Node.js scripts for CLI

---

## Phase 1: Base Setup and Theme System

### Task 1: Initialize Remotion Project

**Files:**
- Create: Full project structure via npx

**Step 1: Create Remotion project**

Run:
```bash
cd /Users/alexevander/remotion
npx create-video@latest . --template=blank
```

Select TypeScript when prompted.

**Step 2: Verify it works**

Run:
```bash
npm run dev
```

Expected: Remotion Studio opens in browser at localhost:3000

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: initialize Remotion project with blank template"
```

---

### Task 2: Create Directory Structure

**Files:**
- Create: `src/templates/` directory
- Create: `src/themes/` directory
- Create: `src/components/scenes/` directory
- Create: `src/components/animations/` directory
- Create: `src/components/ui/` directory
- Create: `scripts/` directory
- Create: `public/fonts/` directory
- Create: `public/images/` directory

**Step 1: Create all directories**

Run:
```bash
mkdir -p src/templates src/themes src/components/{scenes,animations,ui} scripts public/{fonts,images}
```

**Step 2: Add .gitkeep files**

Run:
```bash
touch src/templates/.gitkeep src/themes/.gitkeep src/components/scenes/.gitkeep src/components/animations/.gitkeep src/components/ui/.gitkeep scripts/.gitkeep public/fonts/.gitkeep public/images/.gitkeep
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add directory structure for templates, themes, and components"
```

---

### Task 3: Create Theme Type Definition

**Files:**
- Create: `src/themes/types.ts`

**Step 1: Write theme type**

```typescript
// src/themes/types.ts

/**
 * Theme definition for Remotion videos.
 * Themes control colors, fonts, and animation defaults.
 */
export interface Theme {
  name: string;

  colors: {
    /** Main background color */
    background: string;
    /** Primary text/foreground color */
    foreground: string;
    /** Primary accent color for highlights, buttons */
    primary: string;
    /** Secondary accent for variety */
    secondary: string;
    /** Tertiary accent */
    accent: string;
    /** Muted color for subtle elements */
    muted: string;
  };

  fonts: {
    /** Font for headings/titles */
    heading: string;
    /** Font for body text */
    body: string;
    /** Font for code/monospace */
    mono: string;
  };

  animation: {
    /** Default easing function name */
    easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInOutCubic' | 'easeInOutQuint';
    /** Frames between staggered animations */
    stagger: number;
  };
}

/** All available theme names */
export type ThemeName =
  | 'dark-tech'
  | 'light-minimal'
  | 'vibrant'
  | 'corporate'
  | 'neon-noir'
  | 'warm-earth'
  | 'pastel-soft'
  | 'retro-80s'
  | 'nature-fresh'
  | 'monochrome';
```

**Step 2: Commit**

```bash
git add src/themes/types.ts
git commit -m "feat: add Theme type definition"
```

---

### Task 4: Create First Theme (dark-tech)

**Files:**
- Create: `src/themes/dark-tech.ts`

**Step 1: Write dark-tech theme**

```typescript
// src/themes/dark-tech.ts

import { Theme } from './types';

/**
 * Dark Tech Theme
 * Dark background with cyan/purple accents.
 * Good for: dev tools, SaaS, coding tutorials.
 */
export const darkTech: Theme = {
  name: 'dark-tech',

  colors: {
    background: '#0a0a0f',
    foreground: '#ffffff',
    primary: '#00d4ff',
    secondary: '#7c3aed',
    accent: '#22d3ee',
    muted: '#374151',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOutCubic',
    stagger: 3,
  },
};
```

**Step 2: Commit**

```bash
git add src/themes/dark-tech.ts
git commit -m "feat: add dark-tech theme"
```

---

### Task 5: Create Remaining 9 Themes

**Files:**
- Create: `src/themes/light-minimal.ts`
- Create: `src/themes/vibrant.ts`
- Create: `src/themes/corporate.ts`
- Create: `src/themes/neon-noir.ts`
- Create: `src/themes/warm-earth.ts`
- Create: `src/themes/pastel-soft.ts`
- Create: `src/themes/retro-80s.ts`
- Create: `src/themes/nature-fresh.ts`
- Create: `src/themes/monochrome.ts`

**Step 1: Write light-minimal theme**

```typescript
// src/themes/light-minimal.ts

import { Theme } from './types';

/**
 * Light Minimal Theme
 * Clean white with subtle grays.
 * Good for: professional demos, documentation.
 */
export const lightMinimal: Theme = {
  name: 'light-minimal',

  colors: {
    background: '#ffffff',
    foreground: '#111827',
    primary: '#3b82f6',
    secondary: '#6366f1',
    accent: '#0ea5e9',
    muted: '#9ca3af',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOutCubic',
    stagger: 4,
  },
};
```

**Step 2: Write vibrant theme**

```typescript
// src/themes/vibrant.ts

import { Theme } from './types';

/**
 * Vibrant Theme
 * Bold colors, energetic feel.
 * Good for: marketing, announcements.
 */
export const vibrant: Theme = {
  name: 'vibrant',

  colors: {
    background: '#1e1b4b',
    foreground: '#ffffff',
    primary: '#f59e0b',
    secondary: '#ec4899',
    accent: '#10b981',
    muted: '#6b7280',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOutQuint',
    stagger: 2,
  },
};
```

**Step 3: Write corporate theme**

```typescript
// src/themes/corporate.ts

import { Theme } from './types';

/**
 * Corporate Theme
 * Navy/gray, conservative and professional.
 * Good for: enterprise, B2B content.
 */
export const corporate: Theme = {
  name: 'corporate',

  colors: {
    background: '#1e293b',
    foreground: '#f8fafc',
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#0891b2',
    muted: '#475569',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOut',
    stagger: 4,
  },
};
```

**Step 4: Write neon-noir theme**

```typescript
// src/themes/neon-noir.ts

import { Theme } from './types';

/**
 * Neon Noir Theme
 * Black with neon pink/green accents.
 * Good for: gaming, edgy content, nightlife.
 */
export const neonNoir: Theme = {
  name: 'neon-noir',

  colors: {
    background: '#000000',
    foreground: '#ffffff',
    primary: '#ff00ff',
    secondary: '#00ff88',
    accent: '#ff6b6b',
    muted: '#333333',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOutQuint',
    stagger: 2,
  },
};
```

**Step 5: Write warm-earth theme**

```typescript
// src/themes/warm-earth.ts

import { Theme } from './types';

/**
 * Warm Earth Theme
 * Terracotta, cream, forest green.
 * Good for: lifestyle, sustainability, organic brands.
 */
export const warmEarth: Theme = {
  name: 'warm-earth',

  colors: {
    background: '#fef7ed',
    foreground: '#292524',
    primary: '#c2410c',
    secondary: '#166534',
    accent: '#b45309',
    muted: '#a8a29e',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOut',
    stagger: 5,
  },
};
```

**Step 6: Write pastel-soft theme**

```typescript
// src/themes/pastel-soft.ts

import { Theme } from './types';

/**
 * Pastel Soft Theme
 * Soft pinks, blues, lavender.
 * Good for: friendly apps, wellness, children's content.
 */
export const pastelSoft: Theme = {
  name: 'pastel-soft',

  colors: {
    background: '#fdf4ff',
    foreground: '#374151',
    primary: '#ec4899',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    muted: '#d1d5db',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOut',
    stagger: 4,
  },
};
```

**Step 7: Write retro-80s theme**

```typescript
// src/themes/retro-80s.ts

import { Theme } from './types';

/**
 * Retro 80s Theme
 * Synthwave gradients, hot pink/cyan.
 * Good for: nostalgia, music, creative projects.
 */
export const retro80s: Theme = {
  name: 'retro-80s',

  colors: {
    background: '#0f0225',
    foreground: '#ffffff',
    primary: '#ff2a6d',
    secondary: '#05d9e8',
    accent: '#d300c5',
    muted: '#7b5ea7',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOutQuint',
    stagger: 2,
  },
};
```

**Step 8: Write nature-fresh theme**

```typescript
// src/themes/nature-fresh.ts

import { Theme } from './types';

/**
 * Nature Fresh Theme
 * Greens, sky blue, natural tones.
 * Good for: health, outdoor, environmental.
 */
export const natureFresh: Theme = {
  name: 'nature-fresh',

  colors: {
    background: '#ecfdf5',
    foreground: '#14532d',
    primary: '#16a34a',
    secondary: '#0284c7',
    accent: '#65a30d',
    muted: '#86efac',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOut',
    stagger: 4,
  },
};
```

**Step 9: Write monochrome theme**

```typescript
// src/themes/monochrome.ts

import { Theme } from './types';

/**
 * Monochrome Theme
 * Pure black/white with grays.
 * Good for: elegant, high-contrast, editorial.
 */
export const monochrome: Theme = {
  name: 'monochrome',

  colors: {
    background: '#000000',
    foreground: '#ffffff',
    primary: '#ffffff',
    secondary: '#a3a3a3',
    accent: '#737373',
    muted: '#404040',
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  animation: {
    easing: 'easeInOut',
    stagger: 3,
  },
};
```

**Step 10: Commit**

```bash
git add src/themes/
git commit -m "feat: add all 10 themes"
```

---

### Task 6: Create Theme Index and Context

**Files:**
- Create: `src/themes/index.ts`
- Create: `src/themes/ThemeContext.tsx`

**Step 1: Write theme index**

```typescript
// src/themes/index.ts

export * from './types';
export { darkTech } from './dark-tech';
export { lightMinimal } from './light-minimal';
export { vibrant } from './vibrant';
export { corporate } from './corporate';
export { neonNoir } from './neon-noir';
export { warmEarth } from './warm-earth';
export { pastelSoft } from './pastel-soft';
export { retro80s } from './retro-80s';
export { natureFresh } from './nature-fresh';
export { monochrome } from './monochrome';

import { Theme, ThemeName } from './types';
import { darkTech } from './dark-tech';
import { lightMinimal } from './light-minimal';
import { vibrant } from './vibrant';
import { corporate } from './corporate';
import { neonNoir } from './neon-noir';
import { warmEarth } from './warm-earth';
import { pastelSoft } from './pastel-soft';
import { retro80s } from './retro-80s';
import { natureFresh } from './nature-fresh';
import { monochrome } from './monochrome';

/** Map of all available themes by name */
export const themes: Record<ThemeName, Theme> = {
  'dark-tech': darkTech,
  'light-minimal': lightMinimal,
  'vibrant': vibrant,
  'corporate': corporate,
  'neon-noir': neonNoir,
  'warm-earth': warmEarth,
  'pastel-soft': pastelSoft,
  'retro-80s': retro80s,
  'nature-fresh': natureFresh,
  'monochrome': monochrome,
};

/** Get a theme by name */
export function getTheme(name: ThemeName): Theme {
  return themes[name];
}
```

**Step 2: Write ThemeContext**

```tsx
// src/themes/ThemeContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { Theme } from './types';
import { darkTech } from './dark-tech';

/**
 * React Context for the current theme.
 * Provides theme values to all child components.
 */
const ThemeContext = createContext<Theme>(darkTech);

interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

/**
 * Wrap your composition in ThemeProvider to enable themed components.
 *
 * @example
 * <ThemeProvider theme={darkTech}>
 *   <MyScene />
 * </ThemeProvider>
 */
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme.
 *
 * @example
 * const theme = useTheme();
 * return <div style={{ color: theme.colors.primary }}>Hello</div>;
 */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
```

**Step 3: Commit**

```bash
git add src/themes/index.ts src/themes/ThemeContext.tsx
git commit -m "feat: add theme index and React context provider"
```

---

## Phase 2: Core UI Components

### Task 7: Create Typography Components

**Files:**
- Create: `src/components/ui/Typography.tsx`

**Step 1: Write Typography components**

```tsx
// src/components/ui/Typography.tsx

import React, { CSSProperties, ReactNode } from 'react';
import { useTheme } from '../../themes/ThemeContext';

interface TypographyProps {
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Large title text, uses theme heading font and foreground color.
 */
export function Title({ children, style }: TypographyProps) {
  const theme = useTheme();

  return (
    <h1
      style={{
        fontFamily: theme.fonts.heading,
        fontSize: 72,
        fontWeight: 700,
        color: theme.colors.foreground,
        margin: 0,
        lineHeight: 1.1,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

/**
 * Subtitle text, slightly smaller than title.
 */
export function Subtitle({ children, style }: TypographyProps) {
  const theme = useTheme();

  return (
    <h2
      style={{
        fontFamily: theme.fonts.heading,
        fontSize: 36,
        fontWeight: 500,
        color: theme.colors.muted,
        margin: 0,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/**
 * Body text for paragraphs and descriptions.
 */
export function Body({ children, style }: TypographyProps) {
  const theme = useTheme();

  return (
    <p
      style={{
        fontFamily: theme.fonts.body,
        fontSize: 24,
        fontWeight: 400,
        color: theme.colors.foreground,
        margin: 0,
        lineHeight: 1.5,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/**
 * Monospace text for code snippets.
 */
export function Code({ children, style }: TypographyProps) {
  const theme = useTheme();

  return (
    <code
      style={{
        fontFamily: theme.fonts.mono,
        fontSize: 20,
        color: theme.colors.primary,
        backgroundColor: theme.colors.muted + '33',
        padding: '4px 8px',
        borderRadius: 4,
        ...style,
      }}
    >
      {children}
    </code>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Typography.tsx
git commit -m "feat: add Typography components (Title, Subtitle, Body, Code)"
```

---

### Task 8: Create Animation Wrapper Components

**Files:**
- Create: `src/components/animations/FadeIn.tsx`
- Create: `src/components/animations/SlideIn.tsx`
- Create: `src/components/animations/ScaleIn.tsx`
- Create: `src/components/animations/index.ts`

**Step 1: Write FadeIn component**

```tsx
// src/components/animations/FadeIn.tsx

import React, { ReactNode } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface FadeInProps {
  children: ReactNode;
  /** Frame to start fading in (default: 0) */
  startFrame?: number;
  /** Duration of fade in frames (default: 15) */
  duration?: number;
}

/**
 * Fade in animation wrapper.
 * Wrap any content to make it fade in smoothly.
 *
 * @example
 * <FadeIn startFrame={10} duration={20}>
 *   <Title>Hello World</Title>
 * </FadeIn>
 */
export function FadeIn({ children, startFrame = 0, duration = 15 }: FadeInProps) {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  return <div style={{ opacity }}>{children}</div>;
}
```

**Step 2: Write SlideIn component**

```tsx
// src/components/animations/SlideIn.tsx

import React, { ReactNode } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

type Direction = 'left' | 'right' | 'up' | 'down';

interface SlideInProps {
  children: ReactNode;
  /** Direction to slide from (default: 'up') */
  direction?: Direction;
  /** Frame to start animation (default: 0) */
  startFrame?: number;
  /** Duration in frames (default: 20) */
  duration?: number;
  /** Distance to slide in pixels (default: 50) */
  distance?: number;
}

/**
 * Slide in animation wrapper.
 * Content slides in from the specified direction while fading in.
 *
 * @example
 * <SlideIn direction="left" startFrame={5}>
 *   <Body>This slides in from the left</Body>
 * </SlideIn>
 */
export function SlideIn({
  children,
  direction = 'up',
  startFrame = 0,
  duration = 20,
  distance = 50,
}: SlideInProps) {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const translateMap: Record<Direction, { x: number; y: number }> = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  };

  const { x, y } = translateMap[direction];
  const translateX = x * (1 - progress);
  const translateY = y * (1 - progress);

  return (
    <div
      style={{
        opacity: progress,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
}
```

**Step 3: Write ScaleIn component**

```tsx
// src/components/animations/ScaleIn.tsx

import React, { ReactNode } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface ScaleInProps {
  children: ReactNode;
  /** Frame to start animation (default: 0) */
  startFrame?: number;
  /** Duration in frames (default: 20) */
  duration?: number;
  /** Starting scale (default: 0.8) */
  initialScale?: number;
}

/**
 * Scale in animation wrapper.
 * Content scales up while fading in.
 *
 * @example
 * <ScaleIn startFrame={10} initialScale={0.5}>
 *   <Title>Big Reveal!</Title>
 * </ScaleIn>
 */
export function ScaleIn({
  children,
  startFrame = 0,
  duration = 20,
  initialScale = 0.8,
}: ScaleInProps) {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.back(1.5)),
    }
  );

  const scale = initialScale + (1 - initialScale) * progress;

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
}
```

**Step 4: Write animations index**

```typescript
// src/components/animations/index.ts

export { FadeIn } from './FadeIn';
export { SlideIn } from './SlideIn';
export { ScaleIn } from './ScaleIn';
```

**Step 5: Commit**

```bash
git add src/components/animations/
git commit -m "feat: add animation wrapper components (FadeIn, SlideIn, ScaleIn)"
```

---

### Task 9: Create Background Component

**Files:**
- Create: `src/components/ui/Background.tsx`

**Step 1: Write Background component**

```tsx
// src/components/ui/Background.tsx

import React, { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { useTheme } from '../../themes/ThemeContext';

interface BackgroundProps {
  children?: ReactNode;
  /** Override background color (uses theme background by default) */
  color?: string;
  /** Optional gradient (e.g., 'linear-gradient(180deg, #000 0%, #333 100%)') */
  gradient?: string;
}

/**
 * Full-screen background component.
 * Uses theme background color by default, or custom color/gradient.
 *
 * @example
 * <Background>
 *   <Title>Content on themed background</Title>
 * </Background>
 *
 * @example
 * <Background gradient="linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)">
 *   <Title>Content on gradient</Title>
 * </Background>
 */
export function Background({ children, color, gradient }: BackgroundProps) {
  const theme = useTheme();

  const backgroundColor = gradient ? undefined : (color ?? theme.colors.background);
  const backgroundImage = gradient;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        backgroundImage,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </AbsoluteFill>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Background.tsx
git commit -m "feat: add Background component"
```

---

### Task 10: Create UI Components Index

**Files:**
- Create: `src/components/ui/index.ts`
- Create: `src/components/index.ts`

**Step 1: Write UI index**

```typescript
// src/components/ui/index.ts

export { Title, Subtitle, Body, Code } from './Typography';
export { Background } from './Background';
```

**Step 2: Write main components index**

```typescript
// src/components/index.ts

// UI Components
export * from './ui';

// Animation Components
export * from './animations';

// Scene Components (to be added)
// export * from './scenes';
```

**Step 3: Commit**

```bash
git add src/components/ui/index.ts src/components/index.ts
git commit -m "feat: add component index files"
```

---

## Phase 3: Scene Components

### Task 11: Create IntroScene Component

**Files:**
- Create: `src/components/scenes/IntroScene.tsx`

**Step 1: Write IntroScene**

```tsx
// src/components/scenes/IntroScene.tsx

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { useTheme } from '../../themes/ThemeContext';
import { Title, Subtitle } from '../ui/Typography';
import { Background } from '../ui/Background';
import { FadeIn } from '../animations/FadeIn';
import { SlideIn } from '../animations/SlideIn';

interface IntroSceneProps {
  /** Main title text */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional logo image URL */
  logoUrl?: string;
}

/**
 * Intro scene with animated title, subtitle, and optional logo.
 * Perfect for video openings.
 *
 * @example
 * <IntroScene
 *   title="Welcome to My Product"
 *   subtitle="The future of productivity"
 * />
 */
export function IntroScene({ title, subtitle, logoUrl }: IntroSceneProps) {
  const theme = useTheme();

  return (
    <Background>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 80,
        }}
      >
        {/* Logo if provided */}
        {logoUrl && (
          <FadeIn duration={20}>
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                width: 120,
                height: 120,
                objectFit: 'contain',
                marginBottom: 20,
              }}
            />
          </FadeIn>
        )}

        {/* Title with slide up animation */}
        <SlideIn direction="up" startFrame={10} duration={25}>
          <Title style={{ textAlign: 'center' }}>{title}</Title>
        </SlideIn>

        {/* Subtitle with delayed fade */}
        {subtitle && (
          <FadeIn startFrame={30} duration={20}>
            <Subtitle style={{ textAlign: 'center' }}>{subtitle}</Subtitle>
          </FadeIn>
        )}
      </AbsoluteFill>
    </Background>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/scenes/IntroScene.tsx
git commit -m "feat: add IntroScene component"
```

---

### Task 12: Create OutroScene Component

**Files:**
- Create: `src/components/scenes/OutroScene.tsx`

**Step 1: Write OutroScene**

```tsx
// src/components/scenes/OutroScene.tsx

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { useTheme } from '../../themes/ThemeContext';
import { Title, Subtitle, Body } from '../ui/Typography';
import { Background } from '../ui/Background';
import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';

interface OutroSceneProps {
  /** Call-to-action text (e.g., "Get Started Today") */
  cta: string;
  /** Optional URL or tagline below CTA */
  tagline?: string;
  /** Optional logo image URL */
  logoUrl?: string;
}

/**
 * Outro scene with call-to-action and optional branding.
 * Perfect for video endings.
 *
 * @example
 * <OutroScene
 *   cta="Start Building Today"
 *   tagline="yourproduct.com"
 * />
 */
export function OutroScene({ cta, tagline, logoUrl }: OutroSceneProps) {
  const theme = useTheme();

  return (
    <Background>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: 80,
        }}
      >
        {/* Logo if provided */}
        {logoUrl && (
          <FadeIn duration={20}>
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                width: 80,
                height: 80,
                objectFit: 'contain',
              }}
            />
          </FadeIn>
        )}

        {/* CTA with scale animation */}
        <ScaleIn startFrame={10} duration={25} initialScale={0.9}>
          <Title
            style={{
              textAlign: 'center',
              color: theme.colors.primary,
            }}
          >
            {cta}
          </Title>
        </ScaleIn>

        {/* Tagline with delayed fade */}
        {tagline && (
          <FadeIn startFrame={35} duration={20}>
            <Body
              style={{
                textAlign: 'center',
                color: theme.colors.muted,
              }}
            >
              {tagline}
            </Body>
          </FadeIn>
        )}
      </AbsoluteFill>
    </Background>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/scenes/OutroScene.tsx
git commit -m "feat: add OutroScene component"
```

---

### Task 13: Create CodeScene Component

**Files:**
- Create: `src/components/scenes/CodeScene.tsx`

**Step 1: Write CodeScene**

```tsx
// src/components/scenes/CodeScene.tsx

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useTheme } from '../../themes/ThemeContext';
import { Subtitle } from '../ui/Typography';
import { Background } from '../ui/Background';
import { FadeIn } from '../animations/FadeIn';

interface CodeSceneProps {
  /** The code to display */
  code: string;
  /** Optional title above the code */
  title?: string;
  /** Language for syntax indication (shown as label) */
  language?: string;
  /** Animate typing effect (default: true) */
  typeEffect?: boolean;
  /** Frames per character for typing (default: 1) */
  typeSpeed?: number;
}

/**
 * Scene displaying code with optional typing animation.
 * Great for tutorials and technical demos.
 *
 * @example
 * <CodeScene
 *   title="Create a component"
 *   language="tsx"
 *   code={`function Hello() {
 *   return <h1>Hello World</h1>;
 * }`}
 * />
 */
export function CodeScene({
  code,
  title,
  language,
  typeEffect = true,
  typeSpeed = 1,
}: CodeSceneProps) {
  const theme = useTheme();
  const frame = useCurrentFrame();

  // Calculate how many characters to show based on frame
  const charsToShow = typeEffect
    ? Math.floor(interpolate(frame, [20, 20 + code.length * typeSpeed], [0, code.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }))
    : code.length;

  const displayedCode = code.slice(0, charsToShow);
  const showCursor = typeEffect && charsToShow < code.length;

  return (
    <Background>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
          gap: 32,
        }}
      >
        {/* Title */}
        {title && (
          <FadeIn duration={15}>
            <Subtitle>{title}</Subtitle>
          </FadeIn>
        )}

        {/* Code block */}
        <FadeIn startFrame={10} duration={15}>
          <div
            style={{
              backgroundColor: theme.colors.muted + '33',
              borderRadius: 12,
              padding: 32,
              maxWidth: 900,
              width: '100%',
              position: 'relative',
            }}
          >
            {/* Language label */}
            {language && (
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 16,
                  fontFamily: theme.fonts.mono,
                  fontSize: 14,
                  color: theme.colors.muted,
                  textTransform: 'uppercase',
                }}
              >
                {language}
              </div>
            )}

            {/* Code */}
            <pre
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: 22,
                color: theme.colors.foreground,
                margin: 0,
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
              }}
            >
              {displayedCode}
              {showCursor && (
                <span
                  style={{
                    backgroundColor: theme.colors.primary,
                    width: 12,
                    height: 26,
                    display: 'inline-block',
                    marginLeft: 2,
                    animation: 'blink 1s infinite',
                  }}
                />
              )}
            </pre>
          </div>
        </FadeIn>
      </AbsoluteFill>
    </Background>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/scenes/CodeScene.tsx
git commit -m "feat: add CodeScene component with typing animation"
```

---

### Task 14: Create ListScene Component

**Files:**
- Create: `src/components/scenes/ListScene.tsx`

**Step 1: Write ListScene**

```tsx
// src/components/scenes/ListScene.tsx

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { useTheme } from '../../themes/ThemeContext';
import { Title, Body } from '../ui/Typography';
import { Background } from '../ui/Background';
import { FadeIn } from '../animations/FadeIn';

interface ListSceneProps {
  /** Scene title */
  title: string;
  /** List items to display */
  items: string[];
  /** Frames between each item appearing (default: 15) */
  stagger?: number;
  /** Frame when first item appears (default: 30) */
  startFrame?: number;
}

/**
 * Scene with animated bullet points appearing one by one.
 * Great for feature lists, key points, or steps.
 *
 * @example
 * <ListScene
 *   title="Key Features"
 *   items={[
 *     "Fast and reliable",
 *     "Easy to use",
 *     "Fully customizable",
 *   ]}
 * />
 */
export function ListScene({
  title,
  items,
  stagger = 15,
  startFrame = 30,
}: ListSceneProps) {
  const theme = useTheme();
  const frame = useCurrentFrame();

  return (
    <Background>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 100,
          gap: 24,
        }}
      >
        {/* Title */}
        <FadeIn duration={20}>
          <Title style={{ marginBottom: 32 }}>{title}</Title>
        </FadeIn>

        {/* List items */}
        {items.map((item, index) => {
          const itemStart = startFrame + index * stagger;
          const progress = interpolate(
            frame,
            [itemStart, itemStart + 20],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }
          );

          return (
            <div
              key={index}
              style={{
                opacity: progress,
                transform: `translateX(${(1 - progress) * 30}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Bullet */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: theme.colors.primary,
                  flexShrink: 0,
                }}
              />
              <Body>{item}</Body>
            </div>
          );
        })}
      </AbsoluteFill>
    </Background>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/scenes/ListScene.tsx
git commit -m "feat: add ListScene component with staggered animations"
```

---

### Task 15: Create Scenes Index

**Files:**
- Create: `src/components/scenes/index.ts`
- Modify: `src/components/index.ts`

**Step 1: Write scenes index**

```typescript
// src/components/scenes/index.ts

export { IntroScene } from './IntroScene';
export { OutroScene } from './OutroScene';
export { CodeScene } from './CodeScene';
export { ListScene } from './ListScene';
```

**Step 2: Update main components index**

```typescript
// src/components/index.ts

// UI Components
export * from './ui';

// Animation Components
export * from './animations';

// Scene Components
export * from './scenes';
```

**Step 3: Commit**

```bash
git add src/components/scenes/index.ts src/components/index.ts
git commit -m "feat: add scenes index and update main component exports"
```

---

## Phase 4: CLI Scripts

### Task 16: Create new-video Script

**Files:**
- Create: `scripts/new-video.js`
- Modify: `package.json` (add script)

**Step 1: Write new-video script**

```javascript
// scripts/new-video.js

/**
 * CLI script to create a new video from a template.
 *
 * Usage:
 *   npm run new-video -- --template=product-demo --name=my-video --theme=dark-tech
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const parsedArgs = {};

args.forEach((arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    parsedArgs[key] = value;
  }
});

const { template, name, theme = 'dark-tech' } = parsedArgs;

// Validate required arguments
if (!template) {
  console.error('Error: --template is required');
  console.log('Available templates: product-demo, educational, marketing, data-viz, hype-reel');
  process.exit(1);
}

if (!name) {
  console.error('Error: --name is required');
  console.log('Example: npm run new-video -- --template=product-demo --name=my-video');
  process.exit(1);
}

// Paths
const templatesDir = path.join(__dirname, '..', 'src', 'templates');
const compositionsDir = path.join(__dirname, '..', 'src', 'compositions');
const templatePath = path.join(templatesDir, template);
const targetPath = path.join(compositionsDir, name);

// Check template exists
if (!fs.existsSync(templatePath)) {
  console.error(`Error: Template "${template}" not found`);
  console.log('Available templates:');
  fs.readdirSync(templatesDir)
    .filter((f) => fs.statSync(path.join(templatesDir, f)).isDirectory())
    .forEach((t) => console.log(`  - ${t}`));
  process.exit(1);
}

// Check target doesn't exist
if (fs.existsSync(targetPath)) {
  console.error(`Error: Composition "${name}" already exists`);
  process.exit(1);
}

// Copy template to compositions
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      // Replace template placeholders
      content = content.replace(/__VIDEO_NAME__/g, name);
      content = content.replace(/__THEME_NAME__/g, theme);
      // Convert kebab-case to PascalCase for component names
      const pascalName = name
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
      content = content.replace(/__COMPONENT_NAME__/g, pascalName);
      fs.writeFileSync(destPath, content);
    }
  }
}

copyDir(templatePath, targetPath);

console.log(`✓ Created new video: ${name}`);
console.log(`  Template: ${template}`);
console.log(`  Theme: ${theme}`);
console.log(`  Location: src/compositions/${name}/`);
console.log('');
console.log('Next steps:');
console.log(`  1. Edit src/compositions/${name}/scenes/ to customize your video`);
console.log('  2. Run: npm run dev');
console.log(`  3. Select "${name}" in Remotion Studio`);
```

**Step 2: Add npm script to package.json**

Add to the "scripts" section of package.json:

```json
"new-video": "node scripts/new-video.js"
```

**Step 3: Commit**

```bash
git add scripts/new-video.js package.json
git commit -m "feat: add new-video CLI script"
```

---

### Task 17: Create render Script Wrapper

**Files:**
- Create: `scripts/render.js`
- Modify: `package.json` (add script)

**Step 1: Write render script**

```javascript
// scripts/render.js

/**
 * CLI script to render a video with format presets.
 *
 * Usage:
 *   npm run render -- my-video
 *   npm run render -- my-video --format=social
 *   npm run render -- my-video --format=square
 */

const { execSync } = require('child_process');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
const compositionId = args.find((a) => !a.startsWith('--'));
const formatArg = args.find((a) => a.startsWith('--format='));
const format = formatArg ? formatArg.split('=')[1] : 'youtube';

if (!compositionId) {
  console.error('Error: Please specify a composition ID');
  console.log('Usage: npm run render -- <composition-id> [--format=youtube|social|square|presentation|4k]');
  process.exit(1);
}

// Format presets
const formats = {
  youtube: { width: 1920, height: 1080, suffix: 'youtube' },
  social: { width: 1080, height: 1920, suffix: 'social' },
  square: { width: 1080, height: 1080, suffix: 'square' },
  presentation: { width: 1920, height: 1080, fps: 24, suffix: 'presentation' },
  '4k': { width: 3840, height: 2160, suffix: '4k' },
};

const preset = formats[format];
if (!preset) {
  console.error(`Error: Unknown format "${format}"`);
  console.log('Available formats: youtube, social, square, presentation, 4k');
  process.exit(1);
}

const outputPath = path.join('out', `${compositionId}-${preset.suffix}.mp4`);

// Build render command
let cmd = `npx remotion render ${compositionId} ${outputPath}`;
cmd += ` --width=${preset.width} --height=${preset.height}`;
if (preset.fps) {
  cmd += ` --fps=${preset.fps}`;
}

console.log(`Rendering ${compositionId} (${format} format)...`);
console.log(`Output: ${outputPath}`);
console.log('');

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('');
  console.log(`✓ Render complete: ${outputPath}`);
} catch (error) {
  process.exit(1);
}
```

**Step 2: Add npm script to package.json**

Add to the "scripts" section:

```json
"render": "node scripts/render.js"
```

**Step 3: Commit**

```bash
git add scripts/render.js package.json
git commit -m "feat: add render CLI script with format presets"
```

---

### Task 18: Create list Script

**Files:**
- Create: `scripts/list.js`
- Modify: `package.json` (add script)

**Step 1: Write list script**

```javascript
// scripts/list.js

/**
 * CLI script to list all available compositions.
 *
 * Usage:
 *   npm run list
 */

const fs = require('fs');
const path = require('path');

const compositionsDir = path.join(__dirname, '..', 'src', 'compositions');

console.log('Available compositions:');
console.log('');

if (!fs.existsSync(compositionsDir)) {
  console.log('  (none yet - use npm run new-video to create one)');
  process.exit(0);
}

const compositions = fs
  .readdirSync(compositionsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.'));

if (compositions.length === 0) {
  console.log('  (none yet - use npm run new-video to create one)');
} else {
  compositions.forEach((comp) => {
    console.log(`  • ${comp.name}`);
  });
  console.log('');
  console.log('Commands:');
  console.log('  npm run dev              # Preview in Remotion Studio');
  console.log('  npm run render -- <name> # Render to MP4');
}
```

**Step 2: Add npm script to package.json**

Add to the "scripts" section:

```json
"list": "node scripts/list.js"
```

**Step 3: Commit**

```bash
git add scripts/list.js package.json
git commit -m "feat: add list CLI script"
```

---

## Phase 5: Product Demo Template

### Task 19: Create Product Demo Template Structure

**Files:**
- Create: `src/templates/product-demo/index.tsx`
- Create: `src/templates/product-demo/config.ts`
- Create: `src/templates/product-demo/scenes/01-intro.tsx`
- Create: `src/templates/product-demo/scenes/02-problem.tsx`
- Create: `src/templates/product-demo/scenes/03-solution.tsx`
- Create: `src/templates/product-demo/scenes/04-outro.tsx`

**Step 1: Create template directories**

Run:
```bash
mkdir -p src/templates/product-demo/scenes src/templates/product-demo/assets
```

**Step 2: Write config.ts**

```typescript
// src/templates/product-demo/config.ts

/**
 * Configuration for this video.
 * Modify these values to customize your video.
 */
export const config = {
  /** Unique ID for this composition (used in CLI commands) */
  id: '__VIDEO_NAME__',

  /** Display title in Remotion Studio */
  title: '__VIDEO_NAME__',

  /** Video duration in frames (30fps = 30 frames per second) */
  durationInFrames: 300, // 10 seconds at 30fps

  /** Frames per second */
  fps: 30,

  /** Video dimensions (will be overridden by format flags) */
  width: 1920,
  height: 1080,
};
```

**Step 3: Write 01-intro.tsx**

```tsx
// src/templates/product-demo/scenes/01-intro.tsx

import React from 'react';
import { IntroScene } from '../../../components/scenes/IntroScene';

/**
 * Opening scene - introduces the product.
 * Customize the title and subtitle for your product.
 */
export function Intro() {
  return (
    <IntroScene
      title="Your Product Name"
      subtitle="The tagline that hooks viewers"
    />
  );
}
```

**Step 4: Write 02-problem.tsx**

```tsx
// src/templates/product-demo/scenes/02-problem.tsx

import React from 'react';
import { ListScene } from '../../../components/scenes/ListScene';

/**
 * Problem scene - highlights pain points your product solves.
 * Replace these with real problems your audience faces.
 */
export function Problem() {
  return (
    <ListScene
      title="The Problem"
      items={[
        'Pain point #1 that your audience experiences',
        'Pain point #2 that makes their life difficult',
        'Pain point #3 that costs them time or money',
      ]}
    />
  );
}
```

**Step 5: Write 03-solution.tsx**

```tsx
// src/templates/product-demo/scenes/03-solution.tsx

import React from 'react';
import { ListScene } from '../../../components/scenes/ListScene';
import { useTheme } from '../../../themes/ThemeContext';

/**
 * Solution scene - shows how your product solves the problems.
 * Replace with your actual features/benefits.
 */
export function Solution() {
  const theme = useTheme();

  return (
    <ListScene
      title="The Solution"
      items={[
        'Feature #1 - how it solves pain point #1',
        'Feature #2 - how it makes life easier',
        'Feature #3 - the results users can expect',
      ]}
    />
  );
}
```

**Step 6: Write 04-outro.tsx**

```tsx
// src/templates/product-demo/scenes/04-outro.tsx

import React from 'react';
import { OutroScene } from '../../../components/scenes/OutroScene';

/**
 * Outro scene - call to action.
 * Customize with your actual CTA and website.
 */
export function Outro() {
  return (
    <OutroScene
      cta="Get Started Today"
      tagline="yourproduct.com"
    />
  );
}
```

**Step 7: Write index.tsx (main composition)**

```tsx
// src/templates/product-demo/index.tsx

import React from 'react';
import { Sequence } from 'remotion';
import { ThemeProvider } from '../../themes/ThemeContext';
import { getTheme, ThemeName } from '../../themes';
import { config } from './config';

// Import scenes
import { Intro } from './scenes/01-intro';
import { Problem } from './scenes/02-problem';
import { Solution } from './scenes/03-solution';
import { Outro } from './scenes/04-outro';

/**
 * Main composition for __VIDEO_NAME__.
 *
 * This is a product demo video template. Each Sequence component
 * defines when a scene appears and how long it lasts.
 *
 * Timing tips:
 * - `from`: The frame number when this scene starts
 * - `durationInFrames`: How many frames this scene lasts
 * - At 30fps: 30 frames = 1 second
 */

// Change this to use a different theme
const themeName: ThemeName = '__THEME_NAME__' as ThemeName;

export function __COMPONENT_NAME__() {
  const theme = getTheme(themeName);

  return (
    <ThemeProvider theme={theme}>
      {/* Intro: frames 0-75 (2.5 seconds) */}
      <Sequence from={0} durationInFrames={75}>
        <Intro />
      </Sequence>

      {/* Problem: frames 75-150 (2.5 seconds) */}
      <Sequence from={75} durationInFrames={75}>
        <Problem />
      </Sequence>

      {/* Solution: frames 150-225 (2.5 seconds) */}
      <Sequence from={150} durationInFrames={75}>
        <Solution />
      </Sequence>

      {/* Outro: frames 225-300 (2.5 seconds) */}
      <Sequence from={225} durationInFrames={75}>
        <Outro />
      </Sequence>
    </ThemeProvider>
  );
}

// Export config for Root.tsx registration
export { config };
```

**Step 8: Commit**

```bash
git add src/templates/product-demo/
git commit -m "feat: add product-demo template with 4 scenes"
```

---

### Task 20: Create Example Composition from Template

**Files:**
- Create: `src/compositions/example-product-demo/` (copy from template)
- Modify: `src/Root.tsx` (register composition)

**Step 1: Copy template to compositions**

Run:
```bash
mkdir -p src/compositions/example-product-demo
cp -r src/templates/product-demo/* src/compositions/example-product-demo/
```

**Step 2: Update placeholders in copied files**

In `src/compositions/example-product-demo/config.ts`:
- Replace `__VIDEO_NAME__` with `example-product-demo`

In `src/compositions/example-product-demo/index.tsx`:
- Replace `__VIDEO_NAME__` with `example-product-demo`
- Replace `__THEME_NAME__` with `dark-tech`
- Replace `__COMPONENT_NAME__` with `ExampleProductDemo`

**Step 3: Update Root.tsx to register composition**

```tsx
// src/Root.tsx

import { Composition } from 'remotion';
import { ExampleProductDemo, config as exampleConfig } from './compositions/example-product-demo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={exampleConfig.id}
        component={ExampleProductDemo}
        durationInFrames={exampleConfig.durationInFrames}
        fps={exampleConfig.fps}
        width={exampleConfig.width}
        height={exampleConfig.height}
      />
    </>
  );
};
```

**Step 4: Test it works**

Run:
```bash
npm run dev
```

Expected: Remotion Studio opens, you can select "example-product-demo" and preview the video.

**Step 5: Commit**

```bash
git add src/compositions/example-product-demo/ src/Root.tsx
git commit -m "feat: add example-product-demo composition"
```

---

## Phase 6: Remaining Templates (Educational, Marketing, Data-Viz, Hype-Reel)

### Task 21: Create Educational Template

**Files:**
- Create: `src/templates/educational/` structure (similar to product-demo)

Follow the same pattern as Task 19, but with scenes:
- `01-intro.tsx` - Topic introduction with learning objectives
- `02-concept.tsx` - Concept explanation (using CodeScene for code tutorials)
- `03-example.tsx` - Practical example
- `04-summary.tsx` - Key takeaways
- `05-outro.tsx` - Resources and next steps

**Step 1: Create template files**

(Detailed implementation similar to product-demo, using CodeScene for code examples)

**Step 2: Commit**

```bash
git add src/templates/educational/
git commit -m "feat: add educational template"
```

---

### Task 22: Create Marketing Template

**Files:**
- Create: `src/templates/marketing/` structure

Scenes:
- `01-hook.tsx` - Attention-grabbing opener
- `02-pain.tsx` - Pain point identification
- `03-solution.tsx` - Your solution
- `04-social-proof.tsx` - Stats/testimonials
- `05-cta.tsx` - Strong call to action

**Step 1: Create template files**

**Step 2: Commit**

```bash
git add src/templates/marketing/
git commit -m "feat: add marketing template"
```

---

### Task 23: Create Data-Viz Template

**Files:**
- Create: `src/templates/data-viz/` structure
- Create: `src/components/scenes/DataScene.tsx` (chart component)

Scenes:
- `01-intro.tsx` - Context setting
- `02-chart.tsx` - Main data visualization
- `03-insight.tsx` - Key insight callout
- `04-outro.tsx` - Summary

**Step 1: Create DataScene component with basic chart support**

**Step 2: Create template files**

**Step 3: Commit**

```bash
git add src/templates/data-viz/ src/components/scenes/DataScene.tsx
git commit -m "feat: add data-viz template with chart component"
```

---

### Task 24: Create Hype-Reel Template

**Files:**
- Create: `src/templates/hype-reel/` structure
- Create: `src/components/scenes/RapidMontage.tsx`
- Create: `src/components/ui/FlashText.tsx`
- Create: `src/components/ui/KineticType.tsx`

Scenes:
- `01-montage.tsx` - Rapid-fire image/clip sequence
- `02-flash-text.tsx` - Bold text flashes
- `03-climax.tsx` - Building intensity
- `04-tagline.tsx` - Punchy ending

**Step 1: Create hype-reel specific components**

**Step 2: Create template files with beat-sync support**

**Step 3: Commit**

```bash
git add src/templates/hype-reel/ src/components/scenes/RapidMontage.tsx src/components/ui/FlashText.tsx src/components/ui/KineticType.tsx
git commit -m "feat: add hype-reel template with montage and kinetic typography"
```

---

## Phase 7: Documentation and Polish

### Task 25: Create README

**Files:**
- Create: `README.md`

**Step 1: Write comprehensive README**

Include:
- Project overview
- Quick start guide
- CLI command reference
- Template descriptions
- Theme list
- Component documentation
- Examples

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README"
```

---

### Task 26: Final Verification

**Step 1: Run full test**

```bash
npm run list
npm run dev
npm run new-video -- --template=product-demo --name=test-video --theme=vibrant
npm run render -- test-video
```

**Step 2: Verify output**

Check that `out/test-video-youtube.mp4` is created and plays correctly.

**Step 3: Clean up test**

```bash
rm -rf src/compositions/test-video out/test-video-youtube.mp4
```

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final verification complete"
```

---

## Summary

This plan creates a complete Remotion demo video repository with:

- **10 themes** for visual variety
- **5 templates** (product-demo, educational, marketing, data-viz, hype-reel)
- **Reusable components** (scenes, animations, UI)
- **CLI tools** (new-video, render, list)
- **Multi-format output** (youtube, social, square, presentation, 4k)
- **Beginner-friendly** with examples and comments

Total: 26 tasks across 7 phases.
