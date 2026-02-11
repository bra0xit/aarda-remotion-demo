import { z } from 'zod';
import { staticFile } from 'remotion';

const stepSchema = z.object({
  question: z.string(),
  options: z.array(z.object({
    text: z.string(),
    selected: z.boolean(),
  })),
  flourish: z.optional(z.object({
    type: z.enum(['portraits', 'cascade', 'colorWash', 'locationStreak']),
    data: z.array(z.string()),
  })),
});

export const worldBuilderSchema = z.object({
  screenshots: z.object({
    landing: z.string(),
    characters: z.string(),
    storyBeats3Card: z.string(),
    storyBeatsFull: z.string(),
    knowledgeFull: z.string(),
    knowledgeZoomed: z.string(),
    objectivesList: z.string(),
    objectiveDetail: z.string(),
    playerProfile: z.string(),
    characterProfile: z.string(),
  }),
  hookText: z.string(),
  userPrompt: z.string(),
  steps: z.array(stepSchema),
  importStats: z.array(z.object({
    count: z.number(),
    label: z.string(),
  })),
  importConclusion: z.string(),
  ctaTagline: z.string(),
  ctaBrand: z.string(),
  ctaUrl: z.string(),
});

export type WorldBuilderProps = z.infer<typeof worldBuilderSchema>;

export const mkUltraProps: WorldBuilderProps = {
  screenshots: {
    landing: staticFile('world-builder-onboarding/olson-file-landing.png'),
    characters: staticFile('world-builder-onboarding/characters-grid.png'),
    storyBeats3Card: staticFile('world-builder-onboarding/story-beats-3-card.png'),
    storyBeatsFull: staticFile('world-builder-onboarding/story-beats-full.png'),
    knowledgeFull: staticFile('world-builder-onboarding/knowledge-bricks-full.png'),
    knowledgeZoomed: staticFile('world-builder-onboarding/knowledge-bricks-zoomed.png'),
    objectivesList: staticFile('world-builder-onboarding/objectives-list.png'),
    objectiveDetail: staticFile('world-builder-onboarding/objective-detail.png'),
    playerProfile: staticFile('world-builder-onboarding/frank-olson-profile.png'),
    characterProfile: staticFile('world-builder-onboarding/vincent-ruwet-profile.png'),
  },
  hookText: 'One idea. 15 minutes. A fully playable world.',
  userPrompt: 'Build a story about the MK Ultra experiment. Real people. Real events. Make it playable.',
  steps: [
    {
      question: "Who's your protagonist?",
      options: [
        { text: 'Sidney Gottlieb — MK Ultra Director', selected: false },
        { text: 'Frank Olson — CIA biochemist dosed without consent', selected: true },
        { text: 'A Test Subject — Composite character', selected: false },
        { text: 'John Marks — Investigative journalist', selected: false },
      ],
    },
    {
      question: "What's the timeframe?",
      options: [
        { text: 'The Full Career — 1950-1953', selected: false },
        { text: 'The Investigation Arc — 1953 + 1975', selected: false },
        { text: 'The Final Week — November 19-28, 1953', selected: true },
      ],
    },
    {
      question: 'Set the tone.',
      options: [
        { text: 'Paranoid Thriller', selected: false },
        { text: 'Documentary Procedural — Clinical. Factual. Unflinching.', selected: true },
        { text: 'Tragic Character Study', selected: false },
      ],
    },
    {
      question: "Who's in the story?",
      options: [
        { text: '4 real historical figures', selected: true },
        { text: 'Expanded cast of 8+', selected: false },
        { text: 'Minimal — protagonist only', selected: false },
      ],
      flourish: {
        type: 'portraits',
        data: ['Ruwet', 'Gottlieb', 'Lashbrook', 'Abramson'],
      },
    },
    {
      question: 'Structure the narrative.',
      options: [
        { text: '5 acts', selected: false },
        { text: 'Freeform', selected: false },
        { text: '9 story beats', selected: true },
      ],
      flourish: {
        type: 'cascade',
        data: [
          'Deep Creek Lodge', 'The Reveal', 'The Confession',
          'The Escort', 'The Treatment', 'The Decision',
          'The False Hope', 'Room 1018A', 'The Cover-Up',
        ],
      },
    },
    {
      question: 'Choose a visual style.',
      options: [
        { text: 'Noir Realism', selected: false },
        { text: 'Photorealistic Period — 1950s Kodachrome', selected: true },
        { text: 'Graphic Novel', selected: false },
      ],
    },
    {
      question: 'Where?',
      options: [
        { text: '3 key locations', selected: false },
        { text: '6 real locations', selected: true },
      ],
      flourish: {
        type: 'locationStreak',
        data: [
          'Deep Creek Lodge', 'Camp Detrick', 'Olson Home',
          "Abramson's Office", 'Statler Hotel', 'NYC Streets',
        ],
      },
    },
    {
      question: "The player's goal?",
      options: [
        { text: 'Uncover the Truth', selected: false },
        { text: 'Survive & Escape', selected: true },
        { text: 'Document Everything', selected: false },
      ],
    },
    {
      question: 'Audience?',
      options: [
        { text: 'Mature / Unflinching', selected: false },
        { text: 'General / Educational', selected: true },
      ],
    },
  ],
  importStats: [
    { count: 4, label: 'Characters.' },
    { count: 9, label: 'Chapters.' },
    { count: 6, label: 'Locations.' },
    { count: 1, label: 'World Map.' },
    { count: 12, label: 'Knowledge Bricks.' },
  ],
  importConclusion: 'Your world is ready.',
  ctaTagline: 'Start building your world.',
  ctaBrand: 'Aarda AI',
  ctaUrl: 'aarda.ai',
};
