# AARDA Play Launch Video Design

## Overview

| Attribute | Value |
|-----------|-------|
| Duration | 45 seconds |
| Formats | 16:9 (1920×1080) + 9:16 (1080×1920) |
| Theme | `dark-app` — sleek, tech-forward |
| Tagline | "Infinite stories. One engine." |
| CTA | "Join the Waitlist" → aarda.ai |
| Target | Waitlist signups for AARDA Play platform |

## Video Structure

```
[0-3s]   HOOK         → "What happens next?" repetition glitch
[3-6s]   PAIN 1       → Static/scripted stories
[6-8s]   PAIN 2       → Cumbersome worldbuilding
[8-10s]  PAIN 3       → Gatekept by code
[10-14s] SOLUTION     → AARDA reveal + tagline
[14-20s] FEATURE 1    → AI Conversations + EmotionBar
[20-26s] FEATURE 2    → Interactive Maps + discovery
[26-31s] FEATURE 3    → Knowledge System + connections
[31-36s] FEATURE 4    → Story Beats + branching
[36-41s] FEATURE 5    → Objectives & Quests
[41-45s] CTA          → Logo + Waitlist + URL
```

## Detailed Breakdown

### Hook (0-3s)

- Black screen, single cursor blink
- Glitchy text types: `> What happens next?`
- Three identical responses fade in stacked: "The hero wins." repeated 3x
- Hard cut to black

### Pain Point 1: Static Stories (3-6s)

- Quick cuts of repetitive dialogue UI (stylized, abstract)
- Text slashes across screen: **"SCRIPTED."** → **"PREDICTABLE."**
- Beat. **"The same. Every. Time."**

### Pain Point 2: Cumbersome Worldbuilding (6-8s)

- Montage: endless spreadsheets, wiki tabs, character sheets, timeline docs
- Papers/windows piling up chaotically
- Text: **"Months of prep."** → **"Just to start."**

### Pain Point 3: Gatekept Creation (8-10s)

- Flash of intimidating code editor / node graphs
- Text: **"Or learn to code."**
- Screen floods with syntax, overwhelming
- Hard cut to black

### Solution Reveal (10-14s)

- 1 second silence, pure black
- Soft purple glow emerges from center (GlowPulse component)
- Text fades in: *"What if stories could think?"*
- Glow expands, AARDA logo materializes with subtle particle effect
- Tagline types in below: **"Infinite stories. One engine."**

### Feature 1: AI Conversations (14-20s)

**Text callout (14-15s):** "Characters that feel."

**Demo (15-19s):**
- ChatBubble component animates in with typing indicator
- Character message appears: "I remember what you said last time..."
- EmotionBar slides in below, shifting from neutral toward warmth
- Player response options fade in (showing choice)
- One gets selected, emotion bar reacts

**Transition (19-20s):** Conversation UI slides left, map emerges from right

### Feature 2: Interactive Maps (20-26s)

**Text callout (20-21s):** "Worlds that respond."

**Demo (21-25s):**
- MapScene components: stylized map with fog of war
- MapMarker pulses at a location, player path draws toward it
- New locations reveal as path reaches them (fog lifts)
- Second marker appears with character icon (showing NPCs on map)
- Quick zoom into a location

**Transition (25-26s):** Zoom continues into a glowing node, becomes knowledge brick

### Feature 3: Knowledge System (26-31s)

**Text callout (26-27s):** "Lore that connects."

**Demo (27-30s):**
- KnowledgeBrickCard animates in: "The Ancient Prophecy"
- Lines draw out connecting to other bricks (web/graph visualization)
- One brick highlights: "The Chosen One" — links to character
- Shows how knowledge unlocks story paths

**Transition (30-31s):** Graph zooms out, transforms into story beat timeline

### Feature 4: Story Beats (31-36s)

**Text callout (31-32s):** "Narrative that adapts."

**Demo (32-35s):**
- Timeline of BeatNode components stretches horizontally
- Current beat pulses: "The Betrayal" — tension meter climbs
- Nodes ahead shimmer, showing they're not fixed
- Branch splits into two possible paths (visualizing story divergence)
- One path highlights as "your path"

**Transition (35-36s):** Beat node zooms into checkmark, becomes objective

### Feature 5: Objectives & Quests (36-41s)

**Text callout (36-37s):** "Goals that matter."

**Demo (37-40s):**
- ObjectiveCard slides in: "Uncover the Traitor" — status: active
- Sub-objectives fade in below with checkboxes
- One checks off with satisfying animation
- Card updates: progress bar fills
- New objective unlocks, slides in beside it

**Transition (40-41s):** Cards fade back, screen dims to focus center

### CTA: Waitlist (41-45s)

**Build (41-43s):**
- Black with soft purple ambient glow
- AARDA logo center, clean and prominent
- Tagline types below: **"Infinite stories. One engine."**

**Call to action (43-45s):**
- Button animates in: **"Join the Waitlist"**
- URL fades in below: `aarda.ai`
- Subtle ParticleField in background, premium feel
- Hold for 1.5 seconds

## Vertical (9:16) Adaptation

| Element | 16:9 Horizontal | 9:16 Vertical |
|---------|-----------------|---------------|
| Text callouts | Slide from left | Drop from top |
| UI demos | Centered/wide | Stacked, full-width |
| ChatBubbles | Side-by-side space | Full width, vertical stack |
| Map | Wide landscape view | Cropped to square, more zoom |
| Knowledge graph | Horizontal web | Vertical tree layout |
| Beat timeline | Horizontal line | Diagonal or vertical flow |
| Objectives | Cards side by side | Cards stacked |
| CTA | Centered | Lower third (thumb-zone) |

### Key Adaptations

1. **Text is larger** — Readable on mobile without fullscreen
2. **UI components scale up** — Fill more of frame, less empty space
3. **DeviceFrame optional** — Can wrap demos in phone frame for meta-effect
4. **Faster reads** — Social viewers scroll fast, text holds slightly shorter

## Components Used

### From aarda-remotion-components

**Animations:**
- `FadeIn` — General fade entrances
- `SlideIn` — Text callouts, UI entrances
- `TypeWriter` — Tagline, hook text
- `StaggerChildren` — List animations
- `ScaleIn` — Logo reveal
- `CountUp` — (optional) stats if added

**Effects:**
- `GlowPulse` — Solution reveal glow
- `ParticleField` — CTA background ambiance
- `GradientBackground` — Base layer
- `Vignette` — Edge darkening for focus

**Layouts:**
- `FullScreen` — Base container
- `DeviceFrame` — Vertical version phone mock

**UI Components:**
- `ChatBubble` — Conversation demo
- `EmotionBar` — Emotional state visualization
- `MapMarker` — Map location indicators
- `KnowledgeBrickCard` — Lore connections
- `BeatNode` — Story timeline
- `ObjectiveCard` — Quest tracking

## Implementation Approach

Create a shared `<AardaLaunchVideo>` composition with props:
- `orientation: 'landscape' | 'portrait'`
- Components adapt layout based on orientation
- Same timing, same content, different arrangement

Register both versions in Root.tsx:
- `AardaLaunchVideo-Landscape` (1920×1080, 30fps, 45s = 1350 frames)
- `AardaLaunchVideo-Portrait` (1080×1920, 30fps, 45s = 1350 frames)

## Audio Notes

- Driving electronic beat, builds intensity
- Crescendo at tagline reveal (10-14s)
- Satisfying hits on each feature callout
- Clean resolve on CTA
