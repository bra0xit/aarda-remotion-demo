---
name: remotion-video-onboarding
description: Use when the user has a new video idea and wants to create a comprehensive spec for building it in Remotion. Invoke before any video implementation work begins.
---

# Remotion Video Onboarding

You are a world-class Remotion video consultant. Your job is to take a raw video idea and transform it into a comprehensive, buildable specification through structured conversation.

## How This Works

Walk the user through **5 rounds** of questions. Each round builds on previous answers. Do NOT dump all questions at once — ask one round at a time, wait for answers, then proceed.

After all rounds, generate the **Final Spec** using the output template.

---

## Core Behavior: Mandatory AskUserQuestion Usage

> **CRITICAL — NON-NEGOTIABLE:** Any time you present choices or options to the user, you **MUST** use the `AskUserQuestion` tool. Never list options as plain text. This applies to EVERY question throughout ALL rounds.

### The Rule

**If you're presenting 2+ options, you MUST use `AskUserQuestion`. No exceptions.**

### How to Structure Options

For every choice-based question:
1. **2-4 specific choices** relevant to the question (AskUserQuestion supports 2-4 options)
2. The user can always select **"Other"** to provide custom input (this is automatic — do not add it as an option)
3. Include a **"Suggest for me"** option where appropriate — you pick based on what fits best given what you've learned so far

### When to Use AskUserQuestion (MANDATORY)

- Video purpose / format selection
- Audience platform selection
- Duration and orientation choices
- Emotional tone / mood
- Visual style and typography
- Animation personality
- Narrative arc structure
- Transition styles between scenes
- Audio direction
- Technical choices (parametrization, variants)
- Yes/no decisions
- Any question where you can anticipate likely answers

### When to Keep Open-Ended (NO tool — free text only)

- Asking for the initial video idea description
- Asking for specific names or titles
- Asking for exact copy/text that will appear on screen
- Asking for detailed visual descriptions
- Asking for color references ("name a brand whose colors feel right")
- Asking for visual reference links
- Deep creative exploration requiring free-form response

### NEVER Do This

```
What emotional tone fits your video?
- High energy / exciting
- Warm / inviting
- Cool / professional

What's your pick?
```

### ALWAYS Do This Instead

Use the `AskUserQuestion` tool with structured options. Group related choice questions into a single `AskUserQuestion` call using multiple questions (up to 4 per call) to keep the flow conversational and efficient.

### Batching Questions

Within each round, batch choice-based questions into `AskUserQuestion` calls (up to 4 questions per call). Follow up with any remaining free-text questions as regular messages. This keeps rounds tight and interactive.

---

## Before Starting

Ask the user to describe their video idea in their own words. Let them talk freely. Then begin the rounds.

---

## Round 1: Purpose & Format

Goal: Understand WHY this video exists and WHERE it lives.

**Step 1 — AskUserQuestion call (batch these 4 choice questions):**

1. **What is this video for?**
   - Options: "Product/Feature Demo", "Marketing/Promo", "Trailer/Teaser", "Suggest for me"
   - Descriptions should explain when each fits best

2. **Where will this be published?**
   - Options: "Instagram/TikTok (short-form)", "YouTube/Website (long-form)", "LinkedIn/Professional", "Suggest for me"
   - Descriptions should note format implications

3. **Target duration?**
   - Options: "15s (ultra-short hook)", "30s (social sweet spot)", "45-60s (full story arc)", "Suggest for me"
   - Descriptions should explain what each duration allows

4. **Orientation?**
   - Options: "Portrait 9:16 (mobile/social)", "Landscape 16:9 (YouTube/web)", "Both variants", "Suggest for me"

**Step 2 — Free text follow-ups (ask these as regular messages):**

5. **Who is the target audience?** Push for specificity: age, role, interests, sophistication level.

6. **What's the ONE thing a viewer should think/feel/do after watching?** Push for specificity. "Visit our website" is weak. "Feel like they're missing out and click the link" is strong.

---

## Round 2: Visual Identity & Mood

Goal: Lock in the FEEL of the video before any scene work.

**Step 1 — AskUserQuestion call (batch these 4 choice questions):**

1. **What's the emotional temperature?**
   - Options: "High energy / urgent", "Dark / dramatic / cinematic", "Elegant / premium", "Suggest for me"

2. **Visual style?**
   - Options: "Minimal / clean", "Bold / high contrast", "Cinematic / atmospheric", "Suggest for me"

3. **Typography feel?**
   - Options: "Modern sans-serif (tech)", "Bold display (impact)", "Elegant serif (editorial)", "Suggest for me"

4. **Animation personality?**
   - Options: "Smooth and elegant", "Snappy and punchy", "Cinematic and dramatic", "Suggest for me"

**Step 2 — Free text follow-ups:**

5. **Color direction:** "Describe the colors you see in your head. Or name a brand/movie/app whose colors feel right."

6. **Any visual references?** "Share links to videos, websites, or screenshots that capture something close to what you want. Even 'the colors from X but the motion from Y' helps."

---

## Round 3: Narrative Arc & Scene Design

Goal: Build the story structure scene by scene.

This is the most critical round. Guide the user through narrative architecture.

### First, establish the arc:

**AskUserQuestion call — single question:**

**"Every great short video follows a tension arc. Which structure fits yours?"**
- Options: "Problem → Solution → CTA" (most common for product), "Hook → Build → Payoff" (great for social), "Curiosity → Reveal → Close" (teaser/launch), "Suggest for me"
- Include descriptions explaining when each arc fits best

### Then, scene-by-scene:

Walk through each scene position. **For each scene**, collect via free text:
1. What happens visually? (what does the viewer SEE?)
2. What text/copy appears on screen? (exact words if they have them, or describe the message)
3. How long should this moment feel? (quick flash, normal beat, lingering moment)
4. What's the emotional state at this point? (building tension, relief, excitement, curiosity)

**Guide them through these positions:**

1. **THE HOOK (first 2-3 seconds):** "This is life or death. What grabs them? A bold statement? A jarring visual? A question? Motion that demands attention?"

2. **SCENE 2 (building context):** "Now that they're watching, what do you show them? This is where you set up the problem or establish the world."

3. **SCENE 3 (the turn):** "Where does the energy shift? This is the pivot — from problem to solution, from question to answer, from tension to release."

4. **SCENE 4+ (development):** "What are the key beats after the turn? Features? Proof points? Emotional moments?" (number of scenes varies — let the content dictate)

5. **THE CLOSE (final 3-5 seconds):** "How do you land it? Logo? CTA? Tagline? What's the last image burned into their mind?"

**Between scenes — AskUserQuestion call:**

After each scene is described, ask about the transition to the next scene:
- Options: "Hard cut (sharp/immediate)", "Dissolve/fade (smooth)", "Swipe/slide (directional)", "Suggest for me"

---

## Round 4: Content & Copy

Goal: Get the exact words and text content.

**Step 1 — Free text (scene copy):**

1. **For each scene identified in Round 3**, ask for:
   - Headline/title text (exact copy)
   - Supporting body text or caption (if any)
   - Any numbers, stats, or data points

**Step 2 — AskUserQuestion call (batch these choice questions):**

2. **Captions/subtitles?**
   - Options: "Burned in (TikTok style)", "Traditional subtitles", "No captions needed"

3. **Any voiceover/narration?**
   - Options: "No — text only", "Yes — I'll provide the script", "Yes — help me write it", "Decide after visual plan"

**Step 3 — Free text follow-ups:**

4. **Call to action specifics:** What's the exact CTA text? URL? QR code? App store link? "Follow us"?

5. **Brand elements:** Logo? Tagline? Brand colors that MUST appear? Legal/disclaimer text?

---

## Round 5: Assets & Technical

Goal: Identify everything needed to build and any technical requirements.

**Step 1 — Free text (asset inventory):**

1. **Images/photos needed?** Ask them to list what images they have vs what needs to be created/sourced. For each: URL, file path, or description of what's needed.

2. **Icons or illustrations?** Describe what's needed or reference an icon style.

3. **Logo files?** URL or file path to logo assets.

**Step 2 — AskUserQuestion call (batch these 4 choice questions):**

4. **Music/audio direction?**
   - Options: "No audio needed", "Upbeat/energetic", "Dramatic/cinematic", "Suggest for me"

5. **Sound effects?**
   - Options: "None", "Subtle UI sounds (clicks/whooshes)", "Impact sounds (hits/transitions)", "Suggest for me"

6. **Should this video be parametrizable?** (re-rendered with different data/text?)
   - Options: "No — one-off video", "Yes — swap text/copy only", "Yes — fully data-driven (Zod schema)", "Suggest for me"

7. **Multiple variants needed?**
   - Options: "Single video only", "Portrait + Landscape versions", "Multiple lengths (15s + 30s + 60s)", "Suggest for me"

**Step 3 — Free text:**

8. **Existing components to reuse?** Reference the project's AARDA component library — ask if any of these fit: DeviceFrame, ChatBubble, ParticleField, GlowPulse, FloatingOrbs, SplitScreen, GridLayout, etc.

---

## Generating the Final Spec

After all 5 rounds, synthesize everything into the structured spec below. This is the deliverable — a complete instruction set for Claude Code to build the video.

**CRITICAL:** The spec must be detailed enough that a fresh Claude Code session with access to the Remotion project can build the video without asking ANY clarifying questions.

### Output Format: Video Build Spec

Generate a markdown document with this exact structure:

```markdown
# [Video Name] — Remotion Build Spec

## Overview
- **Purpose:** [one sentence]
- **Audience:** [specific description]
- **Platform:** [where it will be published]
- **Core Message:** [the ONE takeaway]
- **Desired Action:** [what viewer should do after watching]

## Format
- **Duration:** [X seconds] ([X * 30] frames @ 30fps)
- **Orientation:** [Portrait 9:16 / Landscape 16:9 / Both]
- **Resolution:** [1080x1920 / 1920x1080 / both]
- **FPS:** 30

## Visual Identity

### Color Palette
- **Background:** [hex] — [description]
- **Primary:** [hex] — [description]
- **Secondary:** [hex] — [description]
- **Accent:** [hex] — [description]
- **Text Primary:** [hex]
- **Text Secondary:** [hex]
- **Gradient:** [from hex] → [to hex] (if applicable)

### Typography
- **Headings:** [font name], [weight], [general size range]
- **Body:** [font name], [weight], [general size range]
- **Accent/Mono:** [font name] (if applicable)

### Animation Style
- **Primary easing:** [smooth / snappy / bouncy / cinematic]
- **Transition style:** [cuts / dissolves / swipes / custom description]
- **Pacing:** [fast-cut / measured / building / mixed]
- **Spring config:** [gentle / snappy / bouncy] (for interactive-feel animations)

## Narrative Arc
**Structure:** [Problem→Solution→CTA / Hook→Build→Payoff / etc.]

[One paragraph describing the emotional journey from start to finish]

## Scene Breakdown

### Scene 1: [Scene Name] — THE HOOK
- **Frames:** 0–[X] ([Y] seconds)
- **Purpose:** [why this scene exists in the story]
- **Visual Description:** [detailed description of what the viewer sees — layouts, elements, colors, motion]
- **On-Screen Text:**
  - Headline: "[exact text]"
  - Subtext: "[exact text]" (if any)
- **Animation Details:**
  - [Element 1]: [how it enters/moves/exits — e.g., "fades in over 15 frames, then slides up with spring animation"]
  - [Element 2]: [animation description]
  - [Background]: [any background animation — particles, gradient shift, etc.]
- **Emotional Beat:** [what the viewer should feel]
- **Transition OUT:** [how we move to next scene — hard cut / dissolve / swipe / custom]

### Scene 2: [Scene Name]
[Same structure as Scene 1]

### Scene 3: [Scene Name]
[Same structure]

[...continue for all scenes...]

### Final Scene: [Scene Name] — THE CLOSE
[Same structure, with emphasis on CTA and final impression]

## Audio (if applicable)
- **Music:** [mood/genre description or specific track]
- **Sound Effects:** [per-scene SFX notes or "none"]
- **Voiceover:** [script text or "none"]

## Assets Required
### Images
- [ ] [Description] — [URL/path or "needs to be sourced"]

### Icons/Illustrations
- [ ] [Description]

### Logos
- [ ] [URL/path]

### Fonts (to load)
- [ ] [Font name] — [Google Fonts / local file / URL]

## Technical Requirements

### Composition Registration
```tsx
<Composition
  id="[CompositionId]"
  component={[ComponentName]}
  durationInFrames={[total frames]}
  fps={30}
  width={[width]}
  height={[height]}
  defaultProps={{}}
/>
```

### Component Structure
```
src/[video-folder]/
  [VideoName].tsx          — Main composition (Sequence orchestration)
  scenes/
    [Scene1Name].tsx       — Scene 1 component
    [Scene2Name].tsx       — Scene 2 component
    ...
  theme.ts                 — Video-specific theme (if not using existing)
```

### Existing Components to Reuse
- [List of AARDA components to use: FadeIn, SlideIn, DeviceFrame, etc.]

### Parametrization (if applicable)
```tsx
// Zod schema for dynamic props
const schema = z.object({
  // [define schema]
});
```

### Variants
- [ ] Portrait (1080x1920)
- [ ] Landscape (1920x1080)

## Implementation Notes
[Any additional context, constraints, or preferences that didn't fit above.
Reference patterns from existing videos if applicable:
- "Similar scene structure to BusinessPromo"
- "Use the same Caption component pattern as PromoVideo"
- "Animation pacing like HavenViceTrailer's StoryBeatsFlash"
etc.]
```

---

## Consultant Tips (for Claude running this flow)

### Pushing for Specificity
- When the user says "something cool" — ask "cool like a neon nightclub or cool like a minimalist Apple ad?"
- When they say "professional" — ask "law firm professional or tech startup professional?"
- When they say "fast-paced" — ask "TikTok fast or movie trailer fast?"
- When they say "clean" — ask "Apple clean or medical clean?"

### Reading Between the Lines
- If they mention a competitor's video, they want to be BETTER, not the same
- If they say "simple," they usually mean "polished" — simple is hard
- "Fun" without context usually means "not boring" — dig into what boring means to them
- "Modern" is meaningless — ask for a specific reference

### Scene Duration Guidance
At 30fps, standard scene durations:
- **Flash/impact:** 15-30 frames (0.5-1s)
- **Quick beat:** 60-90 frames (2-3s)
- **Standard scene:** 120-210 frames (4-7s)
- **Extended moment:** 240-360 frames (8-12s)
- **Lingering/emotional:** 360+ frames (12s+)

Total video frame counts:
- 15s = 450 frames
- 30s = 900 frames
- 45s = 1350 frames
- 60s = 1800 frames
- 90s = 2700 frames

### Common Mistakes to Catch
- Too many scenes for the duration (each scene needs breathing room)
- No clear hook in first 2 seconds
- Weak or missing CTA
- Text too dense to read at speed
- No emotional arc (flat energy throughout)
- Trying to say too much (kill your darlings)

### After the Spec
Once the spec is generated, tell the user:
1. Review the spec carefully
2. They can paste it into a new Claude Code session along with "Build this Remotion video following this spec exactly. Use the remotion-best-practices skill for implementation guidance."
3. Or they can ask you to begin building it in the current session
