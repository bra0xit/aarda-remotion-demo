/**
 * AARDA API Utilities for Remotion
 *
 * Fetch world data from the Aarda backend to generate demo/trailer videos.
 *
 * @example
 * ```typescript
 * import { createAardaClient, WorldData } from './utils/aarda';
 *
 * // Create and authenticate client
 * const client = createAardaClient();
 * await client.login('username', 'password');
 *
 * // Set the world/project to fetch
 * client.setCurrentProject(123);
 *
 * // Fetch all world data for video generation
 * const worldData: WorldData = await client.fetchWorldData();
 *
 * // Use in Remotion composition props
 * // - worldData.characters for character showcases
 * // - worldData.stories & storyBeats for narrative sequences
 * // - worldData.knowledgeBricks for lore reveals
 * // - worldData.maps & mapLocations for world exploration
 * ```
 */

// Re-export all types
export * from './types';

// Re-export client and factory functions
export {
  AardaClient,
  createAardaClient,
  createAuthenticatedClient,
} from './client';

// Re-export Remotion-specific helpers
export {
  selectCharactersForVideo,
  selectLoreForVideo,
  organizeStoryBeatsForVideo,
  calculateSuggestedDuration,
  generateTrailerProps,
  generateCharacterShowcaseProps,
  generateStoryVideoProps,
  getStudioClient,
  resetStudioClient,
  type WorldTrailerProps,
  type CharacterShowcaseProps,
  type StoryVideoProps,
} from './remotion-helpers';

// ============================================
// Convenience functions for common operations
// ============================================

import { AardaClient } from './client';
import { WorldData, DEFAULT_DEV_API_URL } from './types';

/**
 * Quick helper to fetch all world data with a single function call
 * Useful for scripts that generate video data
 */
export async function fetchWorldDataWithCredentials(
  username: string,
  password: string,
  projectId: number,
  apiUrl = DEFAULT_DEV_API_URL
): Promise<WorldData> {
  const client = new AardaClient({ apiUrl });
  await client.login(username, password);
  return client.fetchWorldData(projectId);
}

/**
 * Fetch world data using an existing access token
 * Useful when token is stored/passed from environment
 */
export async function fetchWorldDataWithToken(
  accessToken: string,
  projectId: number,
  apiUrl = DEFAULT_DEV_API_URL
): Promise<WorldData> {
  const client = new AardaClient({ apiUrl, accessToken });
  return client.fetchWorldData(projectId);
}
