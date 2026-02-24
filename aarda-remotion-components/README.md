# Aarda Remotion Components

A comprehensive component library for creating Aarda Play promotional videos with Remotion.

## Installation

Extract the contents of this package into your Remotion project's `src/` directory:

```
src/
├── themes/           # From this package
├── components/       # From this package
├── utils/            # From this package
├── context/          # From this package
└── ... your existing files
```

## Quick Start

```tsx
import { Composition } from 'remotion';
import { ThemeProvider } from './context/theme-context';
import { FullScreen } from './components/layouts';
import { FadeIn, TypeWriter } from './components/animations';
import { darkAppTheme } from './themes';

const MyVideo: React.FC = () => {
  return (
    <ThemeProvider theme="dark-app">
      <FullScreen>
        <FadeIn delay={10}>
          <TypeWriter text="Welcome to Aarda Play" />
        </FadeIn>
      </FullScreen>
    </ThemeProvider>
  );
};

// Register in Root.tsx
<Composition
  id="MyVideo"
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  width={1080}
  height={1920}
/>
```

## Themes

Four visual themes are available:

| Theme | Description | Use Case |
|-------|-------------|----------|
| `dark-app` | Matches Aarda UI | Primary brand content |
| `cinematic` | Dramatic effects | Premium marketing |
| `light-corp` | Clean, minimal | B2B/Enterprise |
| `fantasy` | Mystical aesthetic | Orbs & Gods content |

### Using Themes

```tsx
// Via ThemeProvider
<ThemeProvider theme="dark-app">
  {children}
</ThemeProvider>

// Or pass theme directly to components
import { darkAppTheme } from './themes';
<AardaButton theme={darkAppTheme}>Click me</AardaButton>

// Or use the hook
import { useAardaTheme } from './context/theme-context';
const theme = useAardaTheme();
```

## Animation Primitives

### FadeIn
```tsx
<FadeIn delay={10} duration={20} easing="smooth">
  <Content />
</FadeIn>
```

### SlideIn
```tsx
<SlideIn direction="up" distance={30} delay={0}>
  <Content />
</SlideIn>
```

### ScaleIn
```tsx
<ScaleIn fromScale={0.8} useSpring={true}>
  <Content />
</ScaleIn>
```

### StaggerChildren
```tsx
<StaggerChildren stagger={5} animation="slide" direction="up">
  {items.map(item => <Card key={item.id} />)}
</StaggerChildren>
```

### TypeWriter
```tsx
<TypeWriter
  text="Hello, World!"
  speed={2}
  showCursor={true}
/>
```

### CountUp
```tsx
<CountUp
  from={0}
  to={1000}
  duration={60}
  prefix="$"
  suffix="+"
/>
```

### Highlight
```tsx
<Highlight type="underline" color="#6c5ce7">
  Important text
</Highlight>
```

## Effect Components

### GlowPulse
```tsx
<GlowPulse
  color="#6c5ce7"
  size={300}
  position={{ x: '50%', y: '50%' }}
/>
```

### ParticleField
```tsx
<ParticleField
  count={20}
  colors={['#a78bfa', '#6c5ce7']}
/>
```

### GradientBackground
```tsx
<GradientBackground
  colors={['#0a0a0f', '#6c5ce7', '#9e5ecf']}
  animate={true}
/>
```

### FloatingOrbs
```tsx
<FloatingOrbs count={4} blur={60} />
```

### Vignette
```tsx
<Vignette intensity={0.5} size={0.3} />
```

## Layout Components

### FullScreen
```tsx
<FullScreen center={true} padding={60}>
  <Content />
</FullScreen>
```

### SplitScreen
```tsx
<SplitScreen
  left={<LeftContent />}
  right={<RightContent />}
  ratio={0.5}
  direction="horizontal"
/>
```

### DeviceFrame
```tsx
<DeviceFrame
  device="iphone"
  scale={0.8}
  angle="floating"
  showReflection={true}
>
  <AppScreenshot />
</DeviceFrame>
```

### GridLayout
```tsx
<GridLayout columns={3} gap={20}>
  {items.map(item => <Card key={item.id} />)}
</GridLayout>
```

### FocusZone
```tsx
<FocusZone
  background={<FullBackground />}
  focusArea={{ x: '25%', y: '25%', width: '50%', height: '50%' }}
  blur={4}
  dim={0.6}
>
  <FocusedContent />
</FocusZone>
```

## Aarda UI Components

### AardaButton
```tsx
<AardaButton variant="primary" size="md">
  Get Started
</AardaButton>
```

### AardaCard
```tsx
<AardaCard header="Card Title">
  Card content goes here
</AardaCard>
```

### AardaBadge
```tsx
<AardaBadge type="character">Character Name</AardaBadge>
<AardaBadge type="knowledge">Knowledge Brick</AardaBadge>
```

### AardaAvatar
```tsx
<AardaAvatar
  src="/path/to/image.jpg"
  name="Character Name"
  size={48}
/>
```

### ChatBubble
```tsx
<ChatBubble
  message="Hello there!"
  isPlayer={false}
  name="Character"
  typing={true}
  typingProgress={0.5}
/>
```

### EmotionBar
```tsx
<EmotionBar
  labelLeft="Sadness"
  labelRight="Joy"
  value={0.3}
  colorLeft="#3b82f6"
  colorRight="#fbbf24"
/>
```

### ObjectiveCard
```tsx
<ObjectiveCard
  title="Find the lost artifact"
  description="Explore the ancient ruins"
  status="active"
  type="main"
/>
```

### BeatNode
```tsx
<BeatNode
  name="The Call to Adventure"
  position="2 of 12"
  status="active"
  tension={0.4}
/>
```

### MapMarker
```tsx
<MapMarker
  name="Ancient Temple"
  selected={true}
  hasCharacters={true}
/>
```

### WizardStep
```tsx
<WizardStep
  step={2}
  total={8}
  title="Choose Genre"
  current={true}
/>
```

### TriggerCard
```tsx
<TriggerCard
  phrase="I am sorry"
  examples={["I apologize", "My bad", "Sorry about that"]}
  colorIndex={0}
/>
```

### KnowledgeBrickCard
```tsx
<KnowledgeBrickCard
  title="The Ancient Prophecy"
  content="A prophecy foretold the coming of..."
  hasChildren={true}
/>
```

## Utilities

### Easings
```tsx
import { easings, getEasing } from './utils/easings';

// Use presets
const easing = easings.smooth;

// Or by name
const easing = getEasing('bounce');
```

### Springs
```tsx
import { springs, getSpring } from './utils/easings';

const config = springs.bouncy;
// { stiffness: 200, damping: 10 }
```

### Color Utilities
```tsx
import {
  withOpacity,
  lighten,
  darken,
  interpolateColor,
  gradient,
  radialGradient
} from './utils/colors';

// Add opacity
withOpacity('#6c5ce7', 0.5) // rgba(108, 92, 231, 0.5)

// Lighten/darken
lighten('#6c5ce7', 0.2)
darken('#6c5ce7', 0.2)

// Interpolate between colors
interpolateColor('#6c5ce7', '#9e5ecf', 0.5)

// CSS gradients
gradient(['#6c5ce7', '#9e5ecf'], 'to right')
radialGradient(['#6c5ce7', 'transparent'], 'center')
```

## File Structure

```
aarda-remotion-components/
├── themes/
│   ├── types.ts          # Theme type definitions
│   ├── dark-app.ts       # Dark app theme
│   ├── cinematic.ts      # Cinematic theme
│   ├── light-corp.ts     # Light corporate theme
│   ├── fantasy.ts        # Fantasy theme
│   └── index.ts          # Theme exports
├── components/
│   ├── animations/
│   │   └── index.tsx     # Animation primitives
│   ├── effects/
│   │   └── index.tsx     # Visual effects
│   ├── layouts/
│   │   └── index.tsx     # Layout components
│   └── ui/
│       └── aarda/
│           └── index.tsx # Aarda UI replicas
├── utils/
│   ├── easings.ts        # Easing presets
│   ├── colors.ts         # Color utilities
│   └── index.ts          # Utils exports
├── context/
│   └── theme-context.tsx # Theme provider
└── README.md
```

## Tips

1. **Always use ThemeProvider** at the root of your composition for consistent theming
2. **Combine animations** - Nest animation components for complex effects
3. **Use DeviceFrame** for app screenshots to add professional polish
4. **Stagger animations** - Use StaggerChildren for lists to create rhythm
5. **Match theme to content** - Use `light-corp` for B2B, `fantasy` for game content

## License

Internal use only - Aarda Play marketing materials.
