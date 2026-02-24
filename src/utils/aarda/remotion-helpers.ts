/**
 * Remotion-specific helpers for AARDA data
 *
 * Use these helpers with Remotion's calculateMetadata to dynamically
 * generate video compositions based on world data.
 */

import { AardaClient, createAardaClient } from './client';
import {
  Character,
  KnowledgeBrick,
  Project,
  Scene,
  Story,
  StoryBeat,
  WorldData,
  WorldMap,
  MapLocation,
} from './types';

// ============================================
// Video Content Selection Helpers
// ============================================

/**
 * Select characters for a video based on various criteria
 */
export function selectCharactersForVideo(
  characters: Character[],
  options: {
    withImages?: boolean;
    limit?: number;
    roles?: string[];
    species?: string[];
  } = {}
): Character[] {
  let selected = [...characters];

  if (options.withImages) {
    selected = selected.filter((c) => c.image_url);
  }

  if (options.roles?.length) {
    selected = selected.filter((c) =>
      options.roles!.some((role) =>
        c.role.toLowerCase().includes(role.toLowerCase())
      )
    );
  }

  if (options.species?.length) {
    selected = selected.filter((c) =>
      options.species!.some((species) =>
        c.species.toLowerCase().includes(species.toLowerCase())
      )
    );
  }

  if (options.limit) {
    selected = selected.slice(0, options.limit);
  }

  return selected;
}

/**
 * Get lore items suitable for narration/display
 */
export function selectLoreForVideo(
  knowledgeBricks: KnowledgeBrick[],
  options: {
    excludeSecrets?: boolean;
    minImportance?: 'low' | 'medium' | 'high';
    categories?: string[];
    limit?: number;
  } = {}
): KnowledgeBrick[] {
  let selected = [...knowledgeBricks];

  if (options.excludeSecrets !== false) {
    selected = selected.filter((b) => !b.is_secret);
  }

  if (options.minImportance) {
    const importanceOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };
    const minLevel = importanceOrder[options.minImportance];
    selected = selected.filter(
      (b) => b.importance && importanceOrder[b.importance] >= minLevel
    );
  }

  if (options.categories?.length) {
    selected = selected.filter((b) =>
      b.category && options.categories!.includes(b.category)
    );
  }

  // Sort by importance (high first), undefined importance goes to end
  selected.sort((a, b) => {
    const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
    const aVal = a.importance ? order[a.importance] : 3;
    const bVal = b.importance ? order[b.importance] : 3;
    return aVal - bVal;
  });

  if (options.limit) {
    selected = selected.slice(0, options.limit);
  }

  return selected;
}

/**
 * Organize story beats into video segments
 */
export function organizeStoryBeatsForVideo(
  beats: StoryBeat[],
  options: {
    beatsPerSegment?: number;
  } = {}
): StoryBeat[][] {
  const beatsPerSegment = options.beatsPerSegment ?? 3;
  // Sort by order if available, otherwise maintain original order
  const sorted = [...beats].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const segments: StoryBeat[][] = [];

  for (let i = 0; i < sorted.length; i += beatsPerSegment) {
    segments.push(sorted.slice(i, i + beatsPerSegment));
  }

  return segments;
}

// ============================================
// Video Duration Calculation
// ============================================

/**
 * Calculate suggested video duration based on content
 */
export function calculateSuggestedDuration(
  worldData: WorldData,
  fps: number,
  options: {
    secondsPerCharacter?: number;
    secondsPerStoryBeat?: number;
    secondsPerLoreItem?: number;
    introSeconds?: number;
    outroSeconds?: number;
  } = {}
): number {
  const {
    secondsPerCharacter = 4,
    secondsPerStoryBeat = 5,
    secondsPerLoreItem = 3,
    introSeconds = 5,
    outroSeconds = 8,
  } = options;

  const characterCount = Math.min(worldData.characters.length, 5);
  const storyBeatCount = Object.values(worldData.storyBeats).flat().length;
  const loreCount = Math.min(
    worldData.knowledgeBricks.filter((b) => !b.is_secret).length,
    5
  );

  const totalSeconds =
    introSeconds +
    characterCount * secondsPerCharacter +
    Math.min(storyBeatCount, 6) * secondsPerStoryBeat +
    loreCount * secondsPerLoreItem +
    outroSeconds;

  return Math.round(totalSeconds * fps);
}

// ============================================
// Props Generation for Remotion
// ============================================

/**
 * Common props structure for world trailer videos
 */
export interface WorldTrailerProps {
  project: Project;
  featuredCharacters: Character[];
  mainStory: Story | null;
  storyBeats: StoryBeat[];
  coreLore: KnowledgeBrick[];
  featuredScene: Scene | null;
  worldMap: WorldMap | null;
  mapLocations: MapLocation[];
}

/**
 * Generate props for a world trailer video composition
 */
export function generateTrailerProps(worldData: WorldData): WorldTrailerProps {
  const featuredCharacters = selectCharactersForVideo(worldData.characters, {
    withImages: true,
    limit: 5,
  });

  // Get main story and beats
  const stories = worldData.stories;
  const mainStory = stories.length > 0 ? stories[0] : null;
  const storyBeats = mainStory
    ? (worldData.storyBeats[String(mainStory.id)] ?? []).sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      )
    : [];

  // Get core lore
  const coreLore = selectLoreForVideo(worldData.knowledgeBricks, {
    excludeSecrets: true,
    minImportance: 'medium',
    limit: 5,
  });

  // Get featured scene
  const featuredScene =
    worldData.scenes.length > 0 ? worldData.scenes[0] : null;

  // Get map data
  const worldMap = worldData.maps.length > 0 ? worldData.maps[0] : null;
  const mapLocations = worldMap
    ? worldData.mapLocations.filter((l) => l.map_id === worldMap.id)
    : [];

  return {
    project: worldData.project,
    featuredCharacters,
    mainStory,
    storyBeats,
    coreLore,
    featuredScene,
    worldMap,
    mapLocations,
  };
}

// ============================================
// Character Showcase Props
// ============================================

export interface CharacterShowcaseProps {
  character: Character;
  relatedLore: KnowledgeBrick[];
}

/**
 * Generate props for individual character showcase videos
 */
export function generateCharacterShowcaseProps(
  character: Character,
  knowledgeBricks: KnowledgeBrick[]
): CharacterShowcaseProps {
  // Find lore that might relate to this character (by name mention in content)
  const relatedLore = knowledgeBricks.filter(
    (b) =>
      !b.is_secret &&
      b.content.toLowerCase().includes(character.name.toLowerCase())
  );

  return {
    character,
    relatedLore: relatedLore.slice(0, 3),
  };
}

// ============================================
// Story Video Props
// ============================================

export interface StoryVideoProps {
  story: Story;
  beats: StoryBeat[];
  involvedCharacters: Character[];
}

/**
 * Generate props for a story-focused video
 */
export function generateStoryVideoProps(
  story: Story,
  beats: StoryBeat[],
  characters: Character[]
): StoryVideoProps {
  // Find characters mentioned in story beats
  // Use both 'description'/'name' (API fields) and 'content'/'title' (aliases)
  const characterNames = new Set<string>();
  beats.forEach((beat) => {
    const beatText = `${beat.description ?? beat.content ?? ''} ${beat.name ?? beat.title ?? ''}`.toLowerCase();
    characters.forEach((char) => {
      if (beatText.includes(char.name.toLowerCase())) {
        characterNames.add(char.name);
      }
    });
  });

  const involvedCharacters = characters.filter((c) =>
    characterNames.has(c.name)
  );

  return {
    story,
    beats: beats.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    involvedCharacters,
  };
}

// ============================================
// Singleton Client for Remotion Studio
// ============================================

let _studioClient: AardaClient | null = null;

/**
 * Get or create a singleton client for use in Remotion Studio
 * This prevents multiple logins during development
 */
export function getStudioClient(apiUrl?: string): AardaClient {
  if (!_studioClient) {
    _studioClient = createAardaClient({ apiUrl });
  }
  return _studioClient;
}

/**
 * Reset the studio client (useful for logout/re-login)
 */
export function resetStudioClient(): void {
  _studioClient = null;
}
