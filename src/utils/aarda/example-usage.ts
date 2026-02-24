/**
 * Example: Fetching AARDA World Data for Remotion Videos
 *
 * This file demonstrates how to use the AARDA client utilities
 * to fetch world data and prepare it for Remotion video compositions.
 *
 * Run with: npx ts-node src/utils/aarda/example-usage.ts
 */

import {
  createAardaClient,
  fetchWorldDataWithCredentials,
  generateTrailerProps,
  selectCharactersForVideo,
  selectLoreForVideo,
  calculateSuggestedDuration,
  WorldData,
} from './index';

// Example credentials (replace with real ones or use env vars)
const USERNAME = process.env.AARDA_USERNAME || 'your-username';
const PASSWORD = process.env.AARDA_PASSWORD || 'your-password';
const PROJECT_ID = parseInt(process.env.AARDA_PROJECT_ID || '0', 10);

async function main() {
  console.log('=== AARDA World Data Fetcher for Remotion ===\n');

  // Method 1: Using the client directly
  console.log('1. Creating authenticated client...');
  const client = createAardaClient();

  try {
    await client.login(USERNAME, PASSWORD);
    console.log('   ✓ Logged in successfully');

    // Set the project/world to work with
    client.setCurrentProject(PROJECT_ID);
    console.log(`   ✓ Set project to: ${PROJECT_ID}`);

    // Fetch complete world data
    console.log('\n2. Fetching world data...');
    const worldData: WorldData = await client.fetchWorldData();

    // Display summary
    console.log('\n=== World Data Summary ===');
    console.log(`Project: ${worldData.project.name}`);
    console.log(`Characters: ${worldData.characters.length}`);
    console.log(`Stories: ${worldData.stories.length}`);
    console.log(`Knowledge Bricks: ${worldData.knowledgeBricks.length}`);
    console.log(`Scenes: ${worldData.scenes.length}`);
    console.log(`Maps: ${worldData.maps.length}`);
    console.log(`Map Locations: ${worldData.mapLocations.length}`);
    console.log(`Objectives: ${worldData.objectives.length}`);

    // Show characters with images (good for video)
    console.log('\n=== Featured Characters (with images) ===');
    const featured = selectCharactersForVideo(worldData.characters, {
      withImages: true,
      limit: 5,
    });
    featured.forEach((char) => {
      console.log(`- ${char.name} (${char.role})`);
      console.log(`  Species: ${char.species}`);
      console.log(`  Image: ${char.image_url}`);
    });

    // Show high-importance lore
    console.log('\n=== Core Lore (high importance) ===');
    const coreLore = selectLoreForVideo(worldData.knowledgeBricks, {
      excludeSecrets: true,
      minImportance: 'high',
      limit: 5,
    });
    coreLore.forEach((lore) => {
      console.log(`- ${lore.title} [${lore.category}]`);
      console.log(`  ${lore.content.substring(0, 100)}...`);
    });

    // Show story beats
    console.log('\n=== Stories & Beats ===');
    for (const story of worldData.stories.slice(0, 2)) {
      console.log(`\nStory: ${story.title}`);
      const beats = worldData.storyBeats[String(story.id)] || [];
      beats.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      beats.slice(0, 3).forEach((beat, idx) => {
        console.log(`  ${idx + 1}. ${beat.name}`);
      });
    }

    // Generate trailer props
    console.log('\n=== Generated Trailer Props ===');
    const trailerProps = generateTrailerProps(worldData);
    console.log(`Featured Characters: ${trailerProps.featuredCharacters.length}`);
    console.log(`Main Story: ${trailerProps.mainStory?.title ?? 'None'}`);
    console.log(`Story Beats: ${trailerProps.storyBeats.length}`);
    console.log(`Core Lore Items: ${trailerProps.coreLore.length}`);
    console.log(`World Map: ${trailerProps.worldMap?.name ?? 'None'}`);
    console.log(`Map Locations: ${trailerProps.mapLocations.length}`);

    // Calculate suggested duration
    const fps = 30;
    const suggestedFrames = calculateSuggestedDuration(worldData, fps);
    const suggestedSeconds = suggestedFrames / fps;
    console.log(`\nSuggested video duration: ${suggestedSeconds.toFixed(1)}s (${suggestedFrames} frames @ ${fps}fps)`);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Method 2: One-liner convenience function
async function quickFetch() {
  console.log('\n=== Quick Fetch Method ===');
  const worldData = await fetchWorldDataWithCredentials(
    USERNAME,
    PASSWORD,
    PROJECT_ID
  );
  console.log(`Fetched: ${worldData.project.name}`);
  return worldData;
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main, quickFetch };
