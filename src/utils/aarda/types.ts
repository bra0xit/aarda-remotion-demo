/**
 * AARDA Backend API Types
 * Types for interacting with the Aarda backend to fetch world data for Remotion videos
 */

// ============================================
// Authentication
// ============================================

export interface User {
  id: string;
  username: string;
  email: string;
  display_name: string;
  avatar_url: string;
  role: string;
  preferences: Record<string, unknown>;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_token: string;
  expiresAt: string;
  user: User;
}

// ============================================
// Projects / Worlds
// ============================================

export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// Characters
// ============================================

export interface Character {
  id: number;
  name: string;
  gender: string;
  species: string;
  role: string;
  core_description: string;
  backstory: string;
  motivation: string;
  flaws: string;
  appearance: string;
  hobbies: string;
  image_url: string;
  intent: string;
  intent_intensity: number;
  emotional_volatility: number;
}

// ============================================
// Knowledge Bricks
// ============================================

export type Importance = 'low' | 'medium' | 'high';

export interface KnowledgeBrick {
  id: number;
  title: string;
  content: string;
  type?: string;
  category?: string;
  importance?: Importance;
  is_secret?: boolean;
  parent_id?: number | null;
  project_id: number;
}

// ============================================
// Stories & Story Beats
// ============================================

export interface Story {
  id: string | number;  // Can be UUID or number
  title: string;
  description: string;
  project_id: number;
  created_at: string;
}

export interface StoryBeat {
  id: string | number;
  story_id: string | number;
  // API uses 'name' not 'title'
  name: string;
  title?: string;  // Alias for compatibility
  // API uses 'description' not 'content'
  description: string;
  content?: string;  // Alias for compatibility
  purpose?: string;
  status?: string;
  order?: number;
}

// ============================================
// Players
// ============================================

export interface Player {
  id: string;
  name: string;
  description: string;
  project_id: number;
}

// ============================================
// Groups
// ============================================

export interface Group {
  id: number;
  name: string;
  description: string;
  project_id: number;
}

// ============================================
// Scenes
// ============================================

export interface Scene {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  characters?: number[];
  players?: string[];
  // Legacy fields
  name?: string;
  description?: string;
  project_id?: number;
}

// ============================================
// Maps & Locations
// ============================================

export interface WorldMap {
  id: number;
  name: string;
  description: string;
  project_id: number;
}

export interface MapLocation {
  id: number;
  name: string;
  description: string;
  map_id: number;
  coordinates: {
    x: number;
    y: number;
  } | null;
}

// ============================================
// Objectives
// ============================================

export interface Objective {
  id: number;
  title: string;
  description: string;
  project_id: number;
  status: string;
}

// ============================================
// Conversation History
// ============================================

export type MessageRole = 'user' | 'assistant';

export interface ConversationMessage {
  id: string;
  player_id: string;
  character_id: number;
  role: MessageRole;
  content: string;
  created_at: string;
}

// ============================================
// Complete World Data (for video generation)
// ============================================

export interface WorldData {
  project: Project;
  characters: Character[];
  stories: Story[];
  storyBeats: Record<string, StoryBeat[]>;  // Keyed by story ID (can be UUID)
  knowledgeBricks: KnowledgeBrick[];
  players: Player[];
  groups: Group[];
  scenes: Scene[];
  maps: WorldMap[];
  mapLocations: MapLocation[];
  objectives: Objective[];
}

// ============================================
// API Configuration
// ============================================

export interface AardaConfig {
  apiUrl: string;
  accessToken?: string;
}

export const DEFAULT_DEV_API_URL = 'https://api.dev.aarda.ai';
export const DEFAULT_PROD_API_URL = 'https://api.aarda.ai';
