/**
 * AARDA API Client
 * Fetch world data from the Aarda backend for use in Remotion videos
 */

import {
  AardaConfig,
  Character,
  ConversationMessage,
  DEFAULT_DEV_API_URL,
  Group,
  KnowledgeBrick,
  LoginResponse,
  MapLocation,
  Objective,
  Player,
  Project,
  Scene,
  Story,
  StoryBeat,
  User,
  WorldData,
  WorldMap,
} from './types';

export class AardaClient {
  private apiUrl: string;
  private accessToken: string | null = null;
  private currentUser: User | null = null;
  private projectId: number | null = null;

  constructor(config: Partial<AardaConfig> = {}) {
    this.apiUrl = config.apiUrl ?? DEFAULT_DEV_API_URL;
    if (config.accessToken) {
      this.accessToken = config.accessToken;
    }
  }

  // ============================================
  // Authentication
  // ============================================

  async login(
    username: string,
    password: string,
    rememberMe = false
  ): Promise<LoginResponse> {
    const response = await fetch(`${this.apiUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username,
        password,
        remember_me: String(rememberMe),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Login failed: ${response.status}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    // User may or may not be included in response
    this.currentUser = data.user ?? null;

    return {
      access_token: data.access_token,
      expiresAt: data.expiresAt ?? '',
      user: data.user ?? null,
    };
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.accessToken = null;
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  // ============================================
  // HTTP Helpers
  // ============================================

  private getHeaders(): Record<string, string> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call login() first.');
    }
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  private async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.status}`);
    }

    return response.json();
  }

  /**
   * GET request that returns empty array for 404 (resource not found)
   * Useful for optional resources like map_locations
   */
  private async getOrEmpty<T>(endpoint: string): Promise<T[]> {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.status}`);
    }

    return response.json();
  }

  private async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed: ${response.status}`);
    }

    return response.json();
  }

  // ============================================
  // Projects / Worlds
  // ============================================

  async listProjects(): Promise<Project[]> {
    return this.get<Project[]>('/api/projects');
  }

  async getProject(projectId: number): Promise<Project> {
    return this.get<Project>(`/projects/${projectId}`);
  }

  setCurrentProject(projectId: number): void {
    this.projectId = projectId;
  }

  getCurrentProjectId(): number | null {
    return this.projectId;
  }

  private ensureProjectId(projectId?: number): number {
    const id = projectId ?? this.projectId;
    if (!id) {
      throw new Error(
        'No project ID provided. Call setCurrentProject() or pass projectId.'
      );
    }
    return id;
  }

  // ============================================
  // Characters
  // ============================================

  async listCharacters(projectId?: number): Promise<Character[]> {
    const id = this.ensureProjectId(projectId);
    return this.get<Character[]>(`/project/characters?project_id=${id}`);
  }

  async getCharactersByIds(
    characterIds: number[],
    projectId?: number
  ): Promise<Character[]> {
    const characters = await this.listCharacters(projectId);
    return characters.filter((c) => characterIds.includes(c.id));
  }

  // ============================================
  // Knowledge Bricks
  // ============================================

  async listKnowledgeBricks(projectId?: number): Promise<KnowledgeBrick[]> {
    const id = this.ensureProjectId(projectId);
    return this.get<KnowledgeBrick[]>(
      `/project/knowledge_bricks?project_id=${id}`
    );
  }

  async getKnowledgeBricksByCategory(
    category: string,
    projectId?: number
  ): Promise<KnowledgeBrick[]> {
    const bricks = await this.listKnowledgeBricks(projectId);
    return bricks.filter((b) => b.category === category);
  }

  async getKnowledgeBricksByImportance(
    importance: 'low' | 'medium' | 'high',
    projectId?: number
  ): Promise<KnowledgeBrick[]> {
    const bricks = await this.listKnowledgeBricks(projectId);
    return bricks.filter((b) => b.importance === importance);
  }

  // ============================================
  // Stories
  // ============================================

  async listStories(projectId?: number): Promise<Story[]> {
    const id = this.ensureProjectId(projectId);
    return this.get<Story[]>(`/api/projects/stories?project_id=${id}`);
  }

  async listStoryBeats(storyId: string | number, projectId?: number): Promise<StoryBeat[]> {
    const id = this.ensureProjectId(projectId);
    const response = await fetch(
      `${this.apiUrl}/api/projects/stories/${storyId}/beats?project_id=${id}`,
      { headers: this.getHeaders() }
    );

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`GET story beats failed: ${response.status}`);
    }

    const data = await response.json();
    // API returns { beats: [...] } wrapper
    return Array.isArray(data) ? data : (data.beats ?? []);
  }

  async getStoryWithBeats(
    storyId: number,
    projectId?: number
  ): Promise<{ story: Story; beats: StoryBeat[] }> {
    const stories = await this.listStories(projectId);
    const story = stories.find((s) => s.id === storyId);
    if (!story) {
      throw new Error(`Story ${storyId} not found`);
    }
    const beats = await this.listStoryBeats(storyId, projectId);
    return { story, beats: beats.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) };
  }

  // ============================================
  // Players
  // ============================================

  async listPlayers(projectId?: number): Promise<Player[]> {
    const id = this.ensureProjectId(projectId);
    return this.getOrEmpty<Player>(`/project/players?project_id=${id}`);
  }

  // ============================================
  // Groups
  // ============================================

  async listGroups(projectId?: number): Promise<Group[]> {
    const id = this.ensureProjectId(projectId);
    return this.getOrEmpty<Group>(`/project/groups?project_id=${id}`);
  }

  // ============================================
  // Scenes
  // ============================================

  async listScenes(projectId?: number): Promise<Scene[]> {
    const id = this.ensureProjectId(projectId);
    return this.getOrEmpty<Scene>(`/project/scenes?project_id=${id}`);
  }

  // ============================================
  // Maps & Locations
  // ============================================

  async listMaps(projectId?: number): Promise<WorldMap[]> {
    const id = this.ensureProjectId(projectId);
    return this.getOrEmpty<WorldMap>(`/project/maps?project_id=${id}`);
  }

  async listMapLocations(projectId?: number): Promise<MapLocation[]> {
    const id = this.ensureProjectId(projectId);
    return this.getOrEmpty<MapLocation>(`/project/map_locations?project_id=${id}`);
  }

  async getMapWithLocations(
    mapId: number,
    projectId?: number
  ): Promise<{ map: WorldMap; locations: MapLocation[] }> {
    const maps = await this.listMaps(projectId);
    const map = maps.find((m) => m.id === mapId);
    if (!map) {
      throw new Error(`Map ${mapId} not found`);
    }
    const allLocations = await this.listMapLocations(projectId);
    const locations = allLocations.filter((l) => l.map_id === mapId);
    return { map, locations };
  }

  // ============================================
  // Objectives
  // ============================================

  async listObjectives(projectId?: number): Promise<Objective[]> {
    const id = this.ensureProjectId(projectId);
    return this.getOrEmpty<Objective>(`/project/objectives?project_id=${id}`);
  }

  // ============================================
  // Conversation History
  // ============================================

  async loadConversationHistory(
    playerId: string,
    characterId: number,
    limit = 50,
    projectId?: number
  ): Promise<ConversationMessage[]> {
    const id = this.ensureProjectId(projectId);
    return this.get<ConversationMessage[]>(
      `/user/conversation-history/${playerId}/${characterId}?project_id=${id}&limit=${limit}`
    );
  }

  // ============================================
  // Complete World Data (for video generation)
  // ============================================

  /**
   * Fetch all world data in parallel for efficient video generation
   * This is the primary method for getting data to build Remotion videos
   */
  async fetchWorldData(projectId?: number): Promise<WorldData> {
    const id = this.ensureProjectId(projectId);

    // Fetch all data in parallel
    const [
      project,
      characters,
      stories,
      knowledgeBricks,
      players,
      groups,
      scenes,
      maps,
      mapLocations,
      objectives,
    ] = await Promise.all([
      this.getProject(id),
      this.listCharacters(id),
      this.listStories(id),
      this.listKnowledgeBricks(id),
      this.listPlayers(id),
      this.listGroups(id),
      this.listScenes(id),
      this.listMaps(id),
      this.listMapLocations(id),
      this.listObjectives(id),
    ]);

    // Fetch story beats for each story
    const storyBeats: Record<string, StoryBeat[]> = {};
    await Promise.all(
      stories.map(async (story) => {
        const storyIdKey = String(story.id);
        storyBeats[storyIdKey] = await this.listStoryBeats(story.id, id);
      })
    );

    return {
      project,
      characters,
      stories,
      storyBeats,
      knowledgeBricks,
      players,
      groups,
      scenes,
      maps,
      mapLocations,
      objectives,
    };
  }

  // ============================================
  // Video-specific helpers
  // ============================================

  /**
   * Get featured characters (those with images) for video thumbnails/hero shots
   */
  async getFeaturedCharacters(
    limit = 5,
    projectId?: number
  ): Promise<Character[]> {
    const characters = await this.listCharacters(projectId);
    return characters.filter((c) => c.image_url).slice(0, limit);
  }

  /**
   * Get the main story and its beats for narrative-driven videos
   */
  async getMainStory(projectId?: number): Promise<{
    story: Story;
    beats: StoryBeat[];
  } | null> {
    const stories = await this.listStories(projectId);
    if (stories.length === 0) return null;

    // Return the first/primary story with its beats
    const mainStory = stories[0];
    const beats = await this.listStoryBeats(mainStory.id, projectId);
    return { story: mainStory, beats: beats.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) };
  }

  /**
   * Get high-importance lore for world introduction sequences
   */
  async getCoreLore(projectId?: number): Promise<KnowledgeBrick[]> {
    const bricks = await this.listKnowledgeBricks(projectId);
    return bricks.filter(
      (b) => b.importance === 'high' && !b.is_secret
    );
  }

  /**
   * Get all character images for visual montages
   */
  async getCharacterImages(
    projectId?: number
  ): Promise<Array<{ character: Character; imageUrl: string }>> {
    const characters = await this.listCharacters(projectId);
    return characters
      .filter((c) => c.image_url)
      .map((c) => ({ character: c, imageUrl: c.image_url }));
  }
}

// ============================================
// Factory function for convenience
// ============================================

export function createAardaClient(
  config: Partial<AardaConfig> = {}
): AardaClient {
  return new AardaClient(config);
}

// ============================================
// Pre-authenticated client helper
// ============================================

export async function createAuthenticatedClient(
  username: string,
  password: string,
  apiUrl = DEFAULT_DEV_API_URL
): Promise<AardaClient> {
  const client = new AardaClient({ apiUrl });
  await client.login(username, password);
  return client;
}
