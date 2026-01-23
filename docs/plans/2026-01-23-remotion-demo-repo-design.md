# Remotion Demo Video Repository Design

## Overview

A flexible, template-based Remotion repository for creating various types of demo videos. Designed for beginners with helpful examples and comments, supporting multiple output formats and visual themes.

## Project Structure

```
remotion/
├── src/
│   ├── compositions/           # Your actual videos live here
│   │   └── example-product-demo/
│   │       ├── index.tsx       # Main composition
│   │       └── scenes/         # Scenes specific to this video
│   │
│   ├── templates/              # Starting points for new videos
│   │   ├── product-demo/
│   │   ├── educational/
│   │   ├── marketing/
│   │   ├── data-viz/
│   │   └── hype-reel/
│   │
│   ├── components/             # Reusable building blocks
│   │   ├── scenes/             # Scene types (intro, outro, code-block, etc.)
│   │   ├── animations/         # Common animation utilities
│   │   └── ui/                 # Buttons, cards, device frames, etc.
│   │
│   ├── themes/                 # Visual theme definitions
│   │   ├── dark-tech.ts
│   │   ├── light-minimal.ts
│   │   ├── vibrant.ts
│   │   ├── corporate.ts
│   │   ├── neon-noir.ts
│   │   ├── warm-earth.ts
│   │   ├── pastel-soft.ts
│   │   ├── retro-80s.ts
│   │   ├── nature-fresh.ts
│   │   └── monochrome.ts
│   │
│   └── Root.tsx                # Registers all compositions
│
├── public/                     # Static assets (images, fonts, audio)
├── scripts/                    # CLI helpers (new-video, etc.)
├── docs/                       # Documentation
└── remotion.config.ts
```

## CLI Workflow

### Creating a New Video

```bash
npm run new-video -- --template=product-demo --name=my-feature-demo --theme=dark-tech
```

This will:
1. Copy the template folder to `src/compositions/my-feature-demo/`
2. Set up the theme import
3. Register the composition in `Root.tsx`
4. Create format variants (youtube, social, presentation)

### Generated Composition Structure

```
src/compositions/my-feature-demo/
├── index.tsx              # Main entry - imports scenes in order
├── config.ts              # Video settings (duration, fps, title)
├── scenes/
│   ├── 01-intro.tsx       # Numbered for easy ordering
│   ├── 02-main.tsx
│   └── 03-outro.tsx
└── assets/                # Video-specific images, etc.
```

### Other CLI Commands

```bash
npm run dev                    # Preview in browser (Remotion Studio)
npm run render my-feature-demo # Render to MP4
npm run render my-feature-demo --format=social  # Render 9:16 version
npm run list                   # Show all compositions
```

## Theme System

Themes are TypeScript objects defining visual language:

```typescript
// src/themes/dark-tech.ts
export const darkTech = {
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

### Available Themes

| Theme | Vibe | Good for |
|-------|------|----------|
| `dark-tech` | Dark bg, cyan/purple accents | Dev tools, SaaS, coding tutorials |
| `light-minimal` | Clean white, subtle grays | Professional demos, documentation |
| `vibrant` | Bold colors, energetic | Marketing, announcements |
| `corporate` | Navy/gray, conservative | Enterprise, B2B content |
| `neon-noir` | Black with neon pink/green | Gaming, edgy content, nightlife |
| `warm-earth` | Terracotta, cream, forest green | Lifestyle, sustainability, organic brands |
| `pastel-soft` | Soft pinks, blues, lavender | Friendly apps, wellness, children's content |
| `retro-80s` | Synthwave gradients, hot pink/cyan | Nostalgia, music, creative projects |
| `nature-fresh` | Greens, sky blue, natural tones | Health, outdoor, environmental |
| `monochrome` | Pure black/white with grays | Elegant, high-contrast, editorial |

## Component Library

### Scene Components (full-screen sections)

- `<IntroScene>` - Animated title with subtitle, logo placement
- `<OutroScene>` - Call-to-action, social links, end card
- `<CodeScene>` - Syntax-highlighted code with typing animation
- `<BrowserScene>` - Mockup browser window showing UI
- `<PhoneScene>` - Mobile device frame with screen content
- `<SplitScene>` - Side-by-side layout (text + visual)
- `<ListScene>` - Animated bullet points appearing one by one
- `<QuoteScene>` - Large quote with attribution
- `<DataScene>` - Charts/graphs with animated reveals

### UI Components (smaller building blocks)

- `<Title>`, `<Subtitle>`, `<Body>` - Themed typography
- `<Button>`, `<Badge>`, `<Card>` - Common UI elements
- `<FadeIn>`, `<SlideIn>`, `<ScaleIn>` - Animation wrappers
- `<Cursor>` - Animated mouse cursor for demos
- `<Highlight>` - Draw attention to areas with glow/outline

### Utility Components

- `<Sequence>` - Chain scenes with automatic timing
- `<Background>` - Gradient, pattern, or solid fills
- `<Transition>` - Fade, wipe, or zoom between scenes

### Hype Reel Specific Components

- `<RapidMontage clips={[...]} bpm={120}>` - Auto-times clips to beat
- `<FlashText>` - Bold words that pop in/out fast
- `<KineticType>` - Text with motion (zoom, shake, glitch)
- `<ImageKen>` - Ken Burns effect (slow zoom/pan on stills)

## Templates

### 1. Product Demo Template
- Intro with product name/logo
- Problem statement scene
- Feature showcase (browser/phone mockups)
- Benefit highlights
- CTA outro
- Example: fake "TaskFlow" app demo with cursor interactions

### 2. Educational Template
- Topic intro with learning objectives
- Concept explanation scenes with diagrams
- Code walkthrough with syntax highlighting
- Key takeaways summary
- Outro with resources
- Example: "Understanding async/await" tutorial

### 3. Marketing Template
- Bold hook intro (attention-grabbing)
- Pain point → solution narrative
- Social proof / stats scene
- Feature highlights (fast-paced)
- Strong CTA outro
- Example: "Launch your app in minutes" promo

### 4. Data Viz Template
- Context-setting intro
- Animated chart reveals (bar, line, pie)
- Comparison scenes
- Key insight callouts
- Summary outro
- Example: "2024 Developer Survey Results"

### 5. Hype Reel Template
- Rapid-fire montage (0.5-1 sec per clip)
- Beat-synced cuts (designed for music timing)
- Bold text flashes between clips
- Kinetic typography (words that move/scale dramatically)
- Quick zoom/pan effects on images
- Builds intensity toward climax
- Punchy tagline ending
- Config includes `musicBpm` setting for beat alignment
- Example: "Product launch hype reel" with placeholder clips

## Output Formats

### Render Commands

```bash
npm run render my-video                      # Default: youtube (1920x1080)
npm run render my-video --format=social      # 1080x1920 (9:16 vertical)
npm run render my-video --format=square      # 1080x1080 (Instagram feed)
npm run render my-video --format=presentation # 1920x1080, lower fps
npm run render my-video --format=4k          # 3840x2160
```

### Output Structure

```
out/
├── my-video-youtube.mp4
├── my-video-social.mp4
└── my-video-square.mp4
```

### Format Handling

- Compositions authored at base resolution
- Format variants use Remotion's `<Rescale>` to adapt
- Vertical formats auto-reframe, centering key content
- Format-specific overrides available per scene
- Templates include comments on sections needing format adjustments

## Design Principles

- **Beginner-friendly**: All templates include example content and explanatory comments
- **Template-based**: Fast starting point with customization flexibility
- **Theme-driven**: Consistent visuals via React context, no manual styling needed
- **Multi-format**: One composition, multiple output sizes
- **Modular**: Mix and match components across any video type
