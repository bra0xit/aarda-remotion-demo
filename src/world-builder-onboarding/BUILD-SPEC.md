# Aarda World Builder Onboarding — Remotion Build Spec

## Overview
- **Purpose:** Announce the Aarda World Builder — a guided flow that turns a raw idea into a fully playable interactive world in 15 minutes
- **Audience:** Broad — writers, game devs, educators, D&D players, creatives — anyone who wants to build interactive storytelling faster, cheaper, and better
- **Platform:** Multiple — website (aarda.ai), YouTube, social media
- **Core Message:** You can go from a single idea to a fully playable world with characters, chapters, maps, images, and narrative — in 15 minutes
- **Desired Action:** "Holy shit, I need to try this" → visit aarda.ai and start building

## Format
- **Duration:** 45 seconds (1350 frames @ 30fps)
- **Orientation:** Both — Landscape 16:9 (primary) + Portrait 9:16 (social variant)
- **Resolution:** 1920x1080 (landscape) + 1080x1920 (portrait)
- **FPS:** 30

## Visual Identity

### Color Palette (Aarda Dark-App Brand)
- **Background:** `#0a0a0f` — near-black
- **Background Alt:** `#111116` — slightly lighter dark
- **Primary:** `#6c5ce7` — Aarda purple
- **Accent:** `#9e5ecf` — light purple
- **Secondary/Card:** `#262629` — dark gray (cards, surfaces)
- **Text Primary:** `#fafafa` — white
- **Text Secondary:** `#71717a` — muted gray
- **Border:** `#262629`
- **Glow:** `#6c5ce7` — purple glow for emphasis
- **Particle:** `#a78bfa` — light purple for particle effects
- **Gradient:** `#6c5ce7` → `#9e5ecf` (purple gradient for highlights)
- **Success/Import Green:** `#059669` — for the import moment counter
- **Player Gold:** `#fef3c7` — for player-related highlights

### Typography
- **Headings:** Inter, 700 (Bold), 48-72px range (landscape), scale proportionally for portrait
- **Body:** Inter, 400-500, 24-36px range
- **Accent/Labels:** Inter, 600 (Semi-Bold), 18-24px
- **Chat messages:** Inter, 400, 20-28px
- **Numbers/Stats:** Inter, 800 (Extra-Bold), 64-96px (for the import counter moment)

### Animation Style
- **Primary easing:** Snappy — `Easing.bezier(0.25, 0.46, 0.45, 0.94)` or use the project's `snappy` preset
- **Transition style:** Morph/transform between brainstorming steps; hard cuts for scene-level transitions
- **Pacing:** Accelerating cascade — starts measured, builds to rapid-fire
- **Spring config:** `snappy` — `{ damping: 20, mass: 1, stiffness: 300 }` for UI element entrances
- **Particle effects:** Subtle floating particles (`#a78bfa`) in background during chat scenes

## Narrative Arc
**Structure:** Before → After → How (with Accelerating Cascade)

The video opens with the stunning finished MKUltra world — characters, chapters, maps — and drops the claim: "built in 15 minutes." A rewind pulls us back to the beginning: one idea typed into a chat. Then Aarda's guided brainstorming unfolds through 9 steps, starting slow enough to understand, then accelerating through each decision until it feels impossibly fast. The import moment hits — everything materializes at once. We return to the finished world, but now the viewer UNDERSTANDS how it was built. The loop closes. CTA.

## Voiceover Script

The narration matches the visual pacing — measured at first, tightening through the acceleration, staccato at the peak, then breathing space for the payoff.

```
[Scene 1: THE RESULT — 0-5s]
"This is a fully playable world. Characters. Chapters. A living story based on real events. It was built in fifteen minutes."

[Scene 2: THE REWIND — 5-7s]
"Here's how."

[Scene 3: THE PROMPT — 7-10s]
"It starts with one idea."

[Scene 4: SLOW BURN, Steps 1-3 — 10-19s]
"Aarda asks the right questions. Who's at the center of the story. When it takes place. How it should feel. You choose — and the world takes shape."

[Scene 5: ACCELERATION, Steps 4-6 — 19-27s]
"Characters drawn from history. A nine-chapter arc. A visual style locked in seconds."

[Scene 6: RAPID FIRE, Steps 7-9 — 27-33s]
"Locations. Goals. Audience. Every decision — instant."

[Scene 7: THE IMPORT — 33-37s]
"Then Aarda builds it all. Characters. Chapters. Maps. Images. Knowledge. One world."

[Scene 8: THE WORLD ALIVE — 37-42s]
"Ready to explore. Ready to play."

[Scene 9: CTA — 42-45s]
"Start building your world. Aarda AI."
```

**Total: ~118 words at ~2.6 words/second. Comfortable pace with room for beats.**

## Scene Breakdown

### Scene 1: The Result — THE HOOK
- **Frames:** 0–150 (5 seconds)
- **Purpose:** Create the open loop — show the stunning finished world, drop the speed claim. Viewer's brain screams "HOW?"
- **Visual Description:** Rapid cinematic montage of the finished MKUltra world using actual Aarda UI screenshots. Dark background (`#0a0a0f`). Each screenshot gets a quick pan/zoom treatment — no static images. Subtle purple glow (`#6c5ce7`) framing each screenshot.
  - Beat 1 (frames 0-35): The Olson File landing page — hero image of Frank Olson, title, description. Slow zoom in.
  - Beat 2 (frames 35-65): Characters grid — 4 character portraits (Ruwet, Gottlieb, Lashbrook, Abramson). Quick pan across.
  - Beat 3 (frames 65-95): Story beats — 9 chapter cards connected by purple flow lines. Pan right across the full timeline.
  - Beat 4 (frames 95-125): Knowledge graph — MK Ultra Program branching to child bricks. Zoom out to reveal structure.
  - Beat 5 (frames 125-150): Text overlay fades in over a slightly blurred composite of all screens: **"One idea. 15 minutes. A fully playable world."** Text in `#fafafa`, large (56-64px), centered. Subtle purple glow behind text.
- **On-Screen Text:**
  - Headline (frames 125-150): "One idea. 15 minutes. A fully playable world."
- **Animation Details:**
  - Each screenshot enters with a quick scale-in (0.95 → 1.0) + fade (0→1) over 8 frames
  - Subtle continuous particle field in background (`#a78bfa`, low density, slow float)
  - Screenshots have a thin `#262629` border with `#6c5ce7` glow pulse
  - Final text overlay: fade in over 10 frames with slight slide-up (10px)
- **Emotional Beat:** Awe. "This looks incredible — what IS this?"
- **Transition OUT:** Quick brightness flash to white (3 frames) into Scene 2

### Scene 2: The Rewind
- **Frames:** 150–210 (2 seconds)
- **Purpose:** Pattern interrupt. Break the montage, create anticipation. Signal "we're going back to the beginning."
- **Visual Description:** The last composite image from Scene 1 glitches/distorts and visually reverses — a VHS-rewind style effect or a digital glitch/dissolve. The screen clears to near-black (`#0a0a0f`). Text appears: **"Here's how."** Clean, centered, large.
- **On-Screen Text:**
  - Headline: "Here's how." — Inter Bold, 72px, `#fafafa`, centered
- **Animation Details:**
  - Frames 150-170: Previous scene's image distorts — horizontal glitch lines, chromatic aberration in `#6c5ce7` and `#9e5ecf`, slight horizontal offset jitter
  - Frames 170-180: Quick fade to `#0a0a0f` background
  - Frames 180-210: "Here's how." fades in with spring animation (scale 0.9→1.0, opacity 0→1), holds for 1 second
- **Emotional Beat:** Intrigue. The open loop tightens.
- **Transition OUT:** Text fades out (5 frames) as chat interface begins to materialize

### Scene 3: The Prompt
- **Frames:** 210–300 (3 seconds)
- **Purpose:** Establish the starting point — just one idea typed into a chat. This is the "before" moment.
- **Visual Description:** A clean, dark-mode chat interface appears (Aarda-branded, ChatGPT-like). Background `#111116`. Chat area centered with max-width ~800px. A user message bubble animates in from the right side — dark card (`#262629`) with white text. The message types out character by character (typewriter effect).
- **On-Screen Text:**
  - User message: "Build a story about the MK Ultra experiment. Real people. Real events. Make it playable."
  - Small label above chat: "Aarda World Builder" in `#71717a`, 16px
- **Animation Details:**
  - Frames 210-225: Chat interface fades in — background panel, subtle border (`#262629`), "Aarda World Builder" label
  - Frames 225-280: User message bubble slides in from right (spring animation, 15 frames), then text types out at ~2 characters per frame (typewriter effect with blinking cursor)
  - Frames 280-300: Brief pause. Then an AI "typing indicator" (three pulsing dots in `#6c5ce7`) appears on the left side, signaling the brainstorming is about to begin
- **Emotional Beat:** Simplicity. "That's ALL you type?"
- **Transition OUT:** AI typing indicator morphs into the first question (Scene 4)

### Scene 4: Slow Burn — Steps 1-3
- **Frames:** 300–570 (9 seconds, ~3 seconds per step)
- **Purpose:** Show the first 3 brainstorming steps at a readable pace. Viewer sees the guided flow, understands the process, begins mentally making their own choices.
- **Visual Description:** Same chat interface. AI messages appear on the left (subtle `rgba(255,255,255,0.05)` background) with questions. Multiple-choice options appear as selectable cards/pills below each question. User selection highlights with purple (`#6c5ce7`) border/glow, other options fade out. Each step morphs/transforms into the next — the answered question collapses upward as the new question expands from below.

#### Step 1: Protagonist (frames 300-390, 3s)
- **AI Question:** "Who's your protagonist?"
- **Options shown as cards (3-4 visible):**
  - "Frank Olson — CIA biochemist dosed without consent" (this one gets selected)
  - "Sidney Gottlieb — MK Ultra Director"
  - "A Test Subject — Composite character"
  - "John Marks — Investigative journalist"
- **Selection animation:** Frank Olson card gets purple border glow (`#6c5ce7`), scales up slightly (1.0→1.05), other cards fade to 30% opacity and slide away

#### Step 2: Timeframe (frames 390-480, 3s)
- **AI Question:** "What's the timeframe?"
- **Options:**
  - "The Final Week — November 19-28, 1953" (selected)
  - "The Investigation Arc — 1953 + 1975"
  - "The Full Career — 1950-1953"
- **Morph transition:** Step 1's selected answer collapses upward (slide up + fade, 10 frames), Step 2 question morphs in from below

#### Step 3: Tone (frames 480-570, 3s)
- **AI Question:** "Set the tone."
- **Options:**
  - "Documentary Procedural — Clinical. Factual. Unflinching." (selected)
  - "Paranoid Thriller"
  - "Tragic Character Study"
- **Same morph pattern**

- **Animation Details (all steps):**
  - AI message: slides in from left, 10 frames, spring animation
  - Option cards: stagger in (5 frame delay between each), slide up + fade in
  - Selection: 8 frame highlight animation (border glow + slight scale), then 8 frames for other options to fade and slide away
  - Morph transition between steps: 12 frames — selected answer slides up and shrinks, new question expands from below. Use `interpolate` with smooth easing.
  - Subtle particle field continues in background
- **Emotional Beat:** Understanding → investment. "Oh, this is like having a creative partner."
- **Transition OUT:** Morph into Scene 5 (same pattern but faster)

### Scene 5: Acceleration — Steps 4-6
- **Frames:** 570–810 (8 seconds, ~2.5 seconds per step)
- **Purpose:** Pace quickens. Viewer is invested. Show characters appearing, story beats cascading, visual style locking in. Each step is faster — less time to read options, more visual impact.
- **Visual Description:** Same chat interface, but the morphing transitions are now faster (8 frames instead of 12). Options appear and get selected more quickly. Visual flourishes increase — when characters are selected, small portraits flash. When story beats are confirmed, chapter titles cascade.

#### Step 4: Cast (frames 570-645, 2.5s)
- **AI Question:** "Who's in the story?"
- **Selection:** "4 real historical figures"
- **Visual flourish:** After selection, 4 character portrait thumbnails (from the characters grid screenshot) briefly flash in a row, then fade — Ruwet, Gottlieb, Lashbrook, Abramson

#### Step 5: Story Beats (frames 645-720, 2.5s)
- **AI Question:** "Structure the narrative."
- **Selection:** "9 story beats"
- **Visual flourish:** After selection, beat titles cascade down rapidly in a staggered list: "Deep Creek Lodge → The Reveal → The Confession → The Escort → The Treatment → The Decision → The False Hope → Room 1018A → The Cover-Up" — each appearing with a 3-frame stagger, small text (18px), purple accent marks

#### Step 6: Visual Style (frames 720-810, 3s)
- **AI Question:** "Choose a visual style."
- **Selection:** "Photorealistic Period — 1950s Kodachrome"
- **Visual flourish:** After selection, a warm color wash briefly tints the screen (subtle Kodachrome overlay, 0.15 opacity) then fades back to dark mode

- **Animation Details:**
  - All morph transitions now 8 frames (was 12 in Scene 4)
  - Option cards appear faster — 3 frame stagger (was 5)
  - Selection animation faster — 6 frames (was 8)
  - Background particles slightly increase in speed/density to subconsciously signal acceleration
- **Emotional Beat:** Momentum. "This is moving FAST."
- **Transition OUT:** Even faster morph into Scene 6

### Scene 6: Rapid Fire — Steps 7-9
- **Frames:** 810–990 (6 seconds, 2 seconds per step)
- **Purpose:** Peak speed. Steps flash by almost too fast to read. The SPEED is the message. Options barely appear before selections lock.
- **Visual Description:** Chat interface is now a blur of activity. Questions appear → options flash → selection locks — all within 2 seconds. The morph transitions are nearly instant (5 frames). Text is large and bold — just keywords, not full sentences.

#### Step 7: Locations (frames 810-870, 2s)
- **AI Question:** "Where?"
- **Selection:** "6 real locations" — bold, large text
- **Flash:** Location names streak across briefly: Deep Creek Lodge, Camp Detrick, Olson Home, Abramson's Office, Statler Hotel, NYC Streets

#### Step 8: Player Goal (frames 870-930, 2s)
- **AI Question:** "The player's goal?"
- **Selection:** "Survive & Escape" — text slams in with impact

#### Step 9: Audience (frames 930-990, 2s)
- **AI Question:** "Audience?"
- **Selection:** "General / Educational" — instant lock

- **Animation Details:**
  - Morph transitions: 5 frames
  - Option cards: appear and select almost simultaneously (2 frame stagger)
  - Selection animation: 4 frames, punchier spring (higher stiffness)
  - Text elements are larger and bolder at this speed — the eye catches keywords not sentences
  - Background particles at peak density/speed
  - A subtle building hum/pulse in the visual rhythm (even without audio, the motion feels like it's building to something)
- **Emotional Beat:** Adrenaline. "This is insane."
- **Transition OUT:** On the final selection ("General / Educational"), the entire chat interface dissolves into particles that swirl and reconstitute as Scene 7

### Scene 7: The Import
- **Frames:** 990–1110 (4 seconds)
- **Purpose:** The crescendo. Everything the user chose is being BUILT. Show the quantity and breadth of what was created. This is the social proof / concrete evidence moment.
- **Visual Description:** Clean dark background (`#0a0a0f`). No chat interface — just centered text. Each line punches in one at a time, stacking vertically. Each line has a subtle purple accent (left border or bullet). After all lines land, they consolidate/compress into a single bold statement.
- **On-Screen Text (sequential cascade):**
  1. "4 Characters." — punches in with spring (frames 990-1010)
  2. "9 Chapters." — punches in (frames 1010-1025)
  3. "6 Locations." — (frames 1025-1037)
  4. "1 World Map." — (frames 1037-1047)
  5. "12 Knowledge Bricks." — (frames 1047-1057)
  6. "All with generated images." — (frames 1057-1070)
  7. Beat / pause (frames 1070-1085)
  8. All lines fade/compress → **"Your world is ready."** — large, bold, centered, with purple glow (frames 1085-1110)
- **Animation Details:**
  - Each line: slides in from left with spring animation, opacity 0→1, slight scale 0.95→1.0
  - Stagger accelerates: first gap is 20 frames, then 15, then 12, then 10, then 10 — building rhythm
  - Text is Inter Bold, 40-48px, `#fafafa`, left-aligned in center column
  - Numbers ("4", "9", "6", "1", "12") in `#6c5ce7` or slightly larger weight for emphasis
  - "Your world is ready." — Inter ExtraBold, 56px, centered, with `#6c5ce7` text-shadow glow
  - Subtle particle burst when "Your world is ready" appears
- **Emotional Beat:** Impact. The concrete results hit. This is REAL.
- **Transition OUT:** "Your world is ready" text scales up slightly and fades as the first screenshot from Scene 8 begins to fade in behind it (crossfade, 10 frames)

### Scene 8: The World Alive — THE PAYOFF
- **Frames:** 1110–1260 (5 seconds)
- **Purpose:** The loop closes. Same world from the opening, but now the viewer UNDERSTANDS how it was built. Slow, cinematic, let the quality speak.
- **Visual Description:** Cinematic pan/zoom across the finished world screenshots. Slower pacing than Scene 1 — this is contemplative, satisfying. Each screenshot gets more time and more dramatic treatment.
  - Beat 1 (frames 1110-1150): Chapter cards — slow pan across the 9-chapter story beat view. The painted artwork is gorgeous. Let it breathe.
  - Beat 2 (frames 1150-1185): Characters — the 4 character portraits, each with a subtle glow pulse. Slow zoom.
  - Beat 3 (frames 1185-1220): Knowledge graph — the beautiful gradient knowledge brick cards connected by dashed lines. Slow zoom out.
  - Beat 4 (frames 1220-1260): The Olson File landing page — the hero shot. Full screen. This is the "cover" of the world.
- **On-Screen Text:** None — visuals carry this scene entirely. The voiceover says "Ready to explore. Ready to play."
- **Animation Details:**
  - Each screenshot: slow zoom (1.0→1.05 over full beat duration) with subtle parallax depth feel
  - Transitions between screenshots: smooth 8-frame crossfade
  - Thin purple border (`#6c5ce7`, 1px) with subtle glow around each screenshot frame
  - Particle field returns at low density — calm, ambient
  - Overall feel: SLOW after the frenzy. Contrast creates impact.
- **Emotional Beat:** Satisfaction. The loop closes. "So THAT'S how they built this."
- **Transition OUT:** Final screenshot (Olson File landing page) slowly dims/vignettes as Scene 9 elements fade in on top

### Scene 9: CTA — THE CLOSE
- **Frames:** 1260–1350 (3 seconds)
- **Purpose:** Land the message. Drive to aarda.ai. Leave them wanting to build their own world.
- **Visual Description:** Clean dark background (`#0a0a0f`). Centered layout. Three elements stack vertically with breathing room:
  1. Tagline
  2. Company name (text only for now — logo placeholder)
  3. URL
- **On-Screen Text:**
  - Line 1: **"Start building your world."** — Inter Bold, 56px, `#fafafa`
  - Line 2: **"Aarda AI"** — Inter Bold, 36px, `#6c5ce7` (purple, brand color)
  - Line 3: **"aarda.ai"** — Inter Medium, 28px, `#71717a` (muted)
- **Animation Details:**
  - Line 1: fades in + slides up (10px) over 12 frames, starting at frame 1260
  - Line 2: fades in 8 frames after Line 1, same slide-up pattern
  - Line 3: fades in 8 frames after Line 2, same pattern
  - All text centered horizontally and vertically
  - Subtle purple gradient glow behind "Aarda AI" text
  - Hold for remaining frames — clean, confident, no movement after elements settle
- **Emotional Beat:** Determination. "I'm going to try this."
- **Transition OUT:** None — clean hold to end of composition

## Audio

### Music
- **Direction:** Electronic / tech. Pulsing, modern, builds with the acceleration.
- **Characteristics:**
  - Starts subtle/ambient during Scene 1 (the result showcase)
  - Brief drop/silence for "Here's how" (Scene 2)
  - Builds slowly during Scenes 3-4 (the prompt and first steps)
  - Intensifies through Scenes 5-6 (acceleration and rapid fire)
  - Peaks at Scene 7 (the import moment)
  - Drops to ambient/emotional for Scene 8 (the world alive)
  - Resolves cleanly for Scene 9 (CTA)
- **Note:** Music will be sourced separately. Build the video without audio first.

### Sound Effects
- None built into the Remotion composition. If SFX are desired, they'll be added in post-production.

### Voiceover
- Script provided above (~118 words, 45 seconds)
- Will be recorded separately and added as an audio track
- **Build the video with timing that matches the script pacing** — leave visual beats where the narrator needs breathing room

## Assets Required

### Screenshots (user will provide as image files)
- [ ] The Olson File landing page (hero shot with Frank Olson)
- [ ] Characters grid (4 characters — Ruwet, Gottlieb, Lashbrook, Abramson)
- [ ] Story beats — zoomed 3-card view (Chapters 1-3 with artwork)
- [ ] Story beats — full 9-chapter flow view
- [ ] Knowledge Bricks — full UI with sidebar and graph view
- [ ] Knowledge Bricks — zoomed graph view
- [ ] Objectives list
- [ ] Objective detail (Edit Objective modal)
- [ ] Frank Olson player profile
- [ ] Vincent Ruwet character profile

**Asset placement:** Put image files in `src/world-builder-onboarding/assets/` directory. Use `staticFile()` from Remotion to reference them.

### Logos
- [ ] Aarda AI logo — **not available yet**. Use text "Aarda AI" in `#6c5ce7` Inter Bold as placeholder in CTA scene.

### Fonts
- [ ] Inter — load via `@remotion/google-fonts` or Google Fonts CDN. Weights needed: 400, 500, 600, 700, 800.

## Technical Requirements

### Composition Registration

```tsx
// In Root.tsx — add these compositions:

// Primary landscape version
<Composition
  id="WorldBuilderOnboarding"
  component={WorldBuilderOnboarding}
  durationInFrames={1350}
  fps={30}
  width={1920}
  height={1080}
  schema={worldBuilderSchema}
  defaultProps={mkUltraProps}
/>

// Portrait variant for social
<Composition
  id="WorldBuilderOnboarding-Portrait"
  component={WorldBuilderOnboarding}
  durationInFrames={1350}
  fps={30}
  width={1080}
  height={1920}
  schema={worldBuilderSchema}
  defaultProps={mkUltraProps}
/>
```

### Component Structure

```
src/world-builder-onboarding/
  WorldBuilderOnboarding.tsx    — Main composition (Sequence orchestration)
  BUILD-SPEC.md                 — This spec document
  schema.ts                     — Zod schema for parametrization
  theme.ts                      — Video-specific theme constants
  assets/                       — Screenshot image files
    olson-file-landing.png
    characters-grid.png
    story-beats-3-card.png
    story-beats-full.png
    knowledge-bricks-full.png
    knowledge-bricks-zoomed.png
    objectives-list.png
    objective-detail.png
    frank-olson-profile.png
    vincent-ruwet-profile.png
  scenes/
    ResultMontage.tsx            — Scene 1: Opening montage of finished world
    RewindTransition.tsx         — Scene 2: Glitch rewind effect
    ThePrompt.tsx                — Scene 3: Chat interface + user types prompt
    BrainstormSteps.tsx          — Scenes 4-6: The 9-step accelerating cascade
    ImportMoment.tsx             — Scene 7: Entity counter cascade
    WorldAlive.tsx               — Scene 8: Cinematic screenshot showcase
    CTA.tsx                      — Scene 9: Closing CTA
  components/
    ChatInterface.tsx            — Aarda-branded chat UI (reusable)
    ChatMessage.tsx              — Individual message bubble (AI or user)
    OptionCard.tsx               — Multiple-choice option card
    ScreenshotFrame.tsx          — Screenshot with border, glow, pan/zoom
    TypewriterText.tsx           — Character-by-character text reveal
    EntityCounter.tsx            — Animated counter for import stats
    GlitchEffect.tsx             — Digital glitch/rewind effect
```

### Parametrization (Zod Schema)

```tsx
import { z } from 'zod';

export const worldBuilderSchema = z.object({
  // Scene 1 & 8: Result screenshots
  screenshots: z.object({
    landing: z.string(),        // path to landing page screenshot
    characters: z.string(),     // path to characters grid
    storyBeats3Card: z.string(), // path to zoomed story beats
    storyBeatsFull: z.string(), // path to full story beats flow
    knowledgeFull: z.string(),  // path to knowledge bricks full UI
    knowledgeZoomed: z.string(), // path to knowledge graph zoomed
    objectivesList: z.string(), // path to objectives
    objectiveDetail: z.string(), // path to objective edit modal
    playerProfile: z.string(),  // path to player character profile
    characterProfile: z.string(), // path to supporting character profile
  }),

  // Scene 1: Opening text
  hookText: z.string().default("One idea. 15 minutes. A fully playable world."),

  // Scene 3: User prompt
  userPrompt: z.string().default("Build a story about the MK Ultra experiment. Real people. Real events. Make it playable."),

  // Scenes 4-6: Brainstorming steps
  steps: z.array(z.object({
    question: z.string(),
    options: z.array(z.object({
      text: z.string(),
      selected: z.boolean(),
    })),
    // Optional visual flourish data
    flourish: z.optional(z.object({
      type: z.enum(["portraits", "cascade", "colorWash", "locationStreak"]),
      data: z.array(z.string()),  // portrait URLs, beat titles, location names, etc.
    })),
  })),

  // Scene 7: Import stats
  importStats: z.array(z.object({
    count: z.number(),
    label: z.string(),
  })),
  importConclusion: z.string().default("Your world is ready."),

  // Scene 9: CTA
  ctaTagline: z.string().default("Start building your world."),
  ctaBrand: z.string().default("Aarda AI"),
  ctaUrl: z.string().default("aarda.ai"),

  // Orientation (auto-detected from composition dimensions, but can override layout)
  orientation: z.enum(["landscape", "portrait"]).default("landscape"),
});
```

### Default Props (MKUltra)

```tsx
export const mkUltraProps = {
  screenshots: {
    landing: staticFile("world-builder-onboarding/assets/olson-file-landing.png"),
    characters: staticFile("world-builder-onboarding/assets/characters-grid.png"),
    storyBeats3Card: staticFile("world-builder-onboarding/assets/story-beats-3-card.png"),
    storyBeatsFull: staticFile("world-builder-onboarding/assets/story-beats-full.png"),
    knowledgeFull: staticFile("world-builder-onboarding/assets/knowledge-bricks-full.png"),
    knowledgeZoomed: staticFile("world-builder-onboarding/assets/knowledge-bricks-zoomed.png"),
    objectivesList: staticFile("world-builder-onboarding/assets/objectives-list.png"),
    objectiveDetail: staticFile("world-builder-onboarding/assets/objective-detail.png"),
    playerProfile: staticFile("world-builder-onboarding/assets/frank-olson-profile.png"),
    characterProfile: staticFile("world-builder-onboarding/assets/vincent-ruwet-profile.png"),
  },
  hookText: "One idea. 15 minutes. A fully playable world.",
  userPrompt: "Build a story about the MK Ultra experiment. Real people. Real events. Make it playable.",
  steps: [
    {
      question: "Who's your protagonist?",
      options: [
        { text: "Frank Olson — CIA biochemist dosed without consent", selected: true },
        { text: "Sidney Gottlieb — MK Ultra Director", selected: false },
        { text: "A Test Subject — Composite character", selected: false },
        { text: "John Marks — Investigative journalist", selected: false },
      ],
    },
    {
      question: "What's the timeframe?",
      options: [
        { text: "The Final Week — November 19-28, 1953", selected: true },
        { text: "The Investigation Arc — 1953 + 1975", selected: false },
        { text: "The Full Career — 1950-1953", selected: false },
      ],
    },
    {
      question: "Set the tone.",
      options: [
        { text: "Documentary Procedural — Clinical. Factual. Unflinching.", selected: true },
        { text: "Paranoid Thriller", selected: false },
        { text: "Tragic Character Study", selected: false },
      ],
    },
    {
      question: "Who's in the story?",
      options: [
        { text: "4 real historical figures", selected: true },
        { text: "Expanded cast of 8+", selected: false },
        { text: "Minimal — protagonist only", selected: false },
      ],
      flourish: {
        type: "portraits" as const,
        data: ["Ruwet", "Gottlieb", "Lashbrook", "Abramson"],
      },
    },
    {
      question: "Structure the narrative.",
      options: [
        { text: "9 story beats", selected: true },
        { text: "5 acts", selected: false },
        { text: "Freeform", selected: false },
      ],
      flourish: {
        type: "cascade" as const,
        data: [
          "Deep Creek Lodge", "The Reveal", "The Confession",
          "The Escort", "The Treatment", "The Decision",
          "The False Hope", "Room 1018A", "The Cover-Up",
        ],
      },
    },
    {
      question: "Choose a visual style.",
      options: [
        { text: "Photorealistic Period — 1950s Kodachrome", selected: true },
        { text: "Noir Realism", selected: false },
        { text: "Graphic Novel", selected: false },
      ],
    },
    {
      question: "Where?",
      options: [
        { text: "6 real locations", selected: true },
        { text: "3 key locations", selected: false },
      ],
      flourish: {
        type: "locationStreak" as const,
        data: [
          "Deep Creek Lodge", "Camp Detrick", "Olson Home",
          "Abramson's Office", "Statler Hotel", "NYC Streets",
        ],
      },
    },
    {
      question: "The player's goal?",
      options: [
        { text: "Survive & Escape", selected: true },
        { text: "Uncover the Truth", selected: false },
        { text: "Document Everything", selected: false },
      ],
    },
    {
      question: "Audience?",
      options: [
        { text: "General / Educational", selected: true },
        { text: "Mature / Unflinching", selected: false },
      ],
    },
  ],
  importStats: [
    { count: 4, label: "Characters." },
    { count: 9, label: "Chapters." },
    { count: 6, label: "Locations." },
    { count: 1, label: "World Map." },
    { count: 12, label: "Knowledge Bricks." },
  ],
  importConclusion: "Your world is ready.",
  ctaTagline: "Start building your world.",
  ctaBrand: "Aarda AI",
  ctaUrl: "aarda.ai",
  orientation: "landscape" as const,
};
```

### Existing AARDA Components to Reuse
- **FadeIn** — for element entrance animations throughout
- **SlideIn** — for chat messages and option cards entering
- **ScaleIn** — for screenshot reveals and selection highlights
- **TypeWriter** — for the user prompt typing effect in Scene 3
- **StaggerChildren** — for staggered option card entrances and import stat lines
- **GlowPulse** — for purple glow effects on screenshots and selected options
- **ParticleField** — for ambient background particles throughout
- **Shimmer** — for the import moment visual emphasis
- **FullScreen** — wrapper for each scene
- **Vignette** — for darkened edges on screenshot showcase scenes

### Variants
- [x] Landscape (1920x1080) — primary
- [x] Portrait (1080x1920) — social variant
- Use `useVideoConfig()` to detect orientation and adjust:
  - Chat interface width (800px landscape → 600px portrait)
  - Font sizes (scale down ~15-20% for portrait)
  - Screenshot framing (crop/zoom differently for vertical)
  - CTA layout (same stack, adjusted spacing)

## Implementation Notes

- **Screenshot handling:** Use Remotion's `Img` component with `staticFile()` for all screenshots. Apply CSS `object-fit: cover` with animated `object-position` for pan effects. Use CSS `transform: scale()` for zoom effects.
- **Chat interface:** Build as a reusable component. Dark background (`#111116`), rounded corners, subtle border. AI messages left-aligned, user messages right-aligned. Should feel like a modern chat app (ChatGPT/Claude style) but Aarda-branded with purple accents.
- **Morph transitions:** Between brainstorming steps, use `interpolate` to simultaneously animate: outgoing step (slide up + fade out + scale down) and incoming step (slide up from below + fade in + scale up). Overlap the animations by ~4 frames for fluid morphing feel.
- **Acceleration effect:** The timing constants for each step phase should be defined as variables that decrease: `SLOW_STEP_DURATION = 90`, `MEDIUM_STEP_DURATION = 75`, `FAST_STEP_DURATION = 60`. Morph transition durations: 12 → 8 → 5 frames. Option stagger: 5 → 3 → 2 frames.
- **Glitch rewind (Scene 2):** Can be achieved with CSS `clip-path` slicing the previous frame into horizontal bands with random X offsets, plus `filter: hue-rotate()` cycling through purple tones. Or use a simpler approach: chromatic aberration (offset R/G/B channels by a few pixels) + horizontal scan lines.
- **Particle field:** Use the existing AARDA `ParticleField` component configured with `#a78bfa` color, low count (~15-20 particles), slow drift speed. Increase count and speed during Scenes 5-6 to subconsciously signal acceleration.
- **Similar patterns to reference:**
  - Scene structure similar to BusinessPromo (sequential Sequence components)
  - Screenshot animations similar to HavenViceTrailer's character montage (timed reveals)
  - Accelerating cascade pacing inspired by HavenViceTrailer's StoryBeatsFlash (rapid-fire content)
  - TypeWriter component from AARDA library for Scene 3's typing effect
- **Performance:** Screenshots are large images. Use `loading="eager"` on the `Img` components and consider pre-loading all screenshots. Test render performance with actual image assets.
