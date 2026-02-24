/**
 * Test script to fetch AARDA world data
 */

import {
  createAardaClient,
  generateTrailerProps,
  selectCharactersForVideo,
  selectLoreForVideo,
  calculateSuggestedDuration,
} from './index';

async function testFetch() {
  // Set these environment variables or replace with your credentials
  const USERNAME = process.env.AARDA_USERNAME || '';
  const PASSWORD = process.env.AARDA_PASSWORD || '';
  const PROJECT_ID = parseInt(process.env.AARDA_PROJECT_ID || '0', 10);

  if (!USERNAME || !PASSWORD || !PROJECT_ID) {
    console.error('Please set AARDA_USERNAME, AARDA_PASSWORD, and AARDA_PROJECT_ID environment variables');
    process.exit(1);
  }

  console.log('=== AARDA World Data Test ===\n');

  const client = createAardaClient();

  try {
    console.log('1. Logging in...');
    await client.login(USERNAME, PASSWORD);
    console.log(`   ✓ Logged in`);

    client.setCurrentProject(PROJECT_ID);
    console.log(`   ✓ Set project to: ${PROJECT_ID}`);

    console.log('\n2. Fetching world data...');
    const worldData = await client.fetchWorldData();

    console.log('\n=== World Data Summary ===');
    console.log(`Project: ${worldData.project.name}`);
    console.log(`Description: ${worldData.project.description || '(none)'}`);
    console.log(`\nContent counts:`);
    console.log(`  Characters: ${worldData.characters.length}`);
    console.log(`  Stories: ${worldData.stories.length}`);
    console.log(`  Knowledge Bricks: ${worldData.knowledgeBricks.length}`);
    console.log(`  Players: ${worldData.players.length}`);
    console.log(`  Groups: ${worldData.groups.length}`);
    console.log(`  Scenes: ${worldData.scenes.length}`);
    console.log(`  Maps: ${worldData.maps.length}`);
    console.log(`  Map Locations: ${worldData.mapLocations.length}`);
    console.log(`  Objectives: ${worldData.objectives.length}`);

    // Characters
    if (worldData.characters.length > 0) {
      console.log('\n=== Characters ===');
      worldData.characters.forEach((char) => {
        console.log(`\n[${char.id}] ${char.name}`);
        console.log(`  Role: ${char.role || 'N/A'}`);
        console.log(`  Species: ${char.species || 'N/A'}`);
        console.log(`  Gender: ${char.gender || 'N/A'}`);
        if (char.core_description) {
          console.log(`  Description: ${char.core_description.substring(0, 100)}...`);
        }
        if (char.image_url) {
          console.log(`  Image: ${char.image_url}`);
        }
      });
    }

    // Stories
    if (worldData.stories.length > 0) {
      console.log('\n=== Stories ===');
      for (const story of worldData.stories) {
        console.log(`\n[${story.id}] ${story.title}`);
        console.log(`  Description: ${story.description || 'N/A'}`);

        const storyKey = String(story.id);
        const beatsRaw = worldData.storyBeats[storyKey];
        const beats = Array.isArray(beatsRaw) ? beatsRaw : [];
        if (beats.length > 0) {
          console.log(`  Beats (${beats.length}):`);
          beats.forEach((beat, idx) => {
            console.log(`    ${idx + 1}. ${beat.name}`);
            if (beat.description) {
              console.log(`       ${beat.description.substring(0, 80)}...`);
            }
          });
        }
      }
    }

    // Knowledge Bricks
    if (worldData.knowledgeBricks.length > 0) {
      console.log('\n=== Knowledge Bricks ===');
      worldData.knowledgeBricks.slice(0, 10).forEach((brick) => {
        console.log(`\n[${brick.id}] ${brick.title}`);
        console.log(`  Type: ${brick.type || 'N/A'} | Category: ${brick.category || 'N/A'}`);
        console.log(`  Importance: ${brick.importance} | Secret: ${brick.is_secret}`);
        if (brick.content) {
          console.log(`  Content: ${brick.content.substring(0, 100)}...`);
        }
      });
      if (worldData.knowledgeBricks.length > 10) {
        console.log(`\n  ... and ${worldData.knowledgeBricks.length - 10} more`);
      }
    }

    // Scenes
    if (worldData.scenes.length > 0) {
      console.log('\n=== Scenes ===');
      worldData.scenes.forEach((scene) => {
        console.log(`[${scene.id}] ${scene.name}`);
        if (scene.description) {
          console.log(`  ${scene.description.substring(0, 100)}...`);
        }
      });
    }

    // Maps
    if (worldData.maps.length > 0) {
      console.log('\n=== Maps ===');
      worldData.maps.forEach((map) => {
        console.log(`[${map.id}] ${map.name}`);
        if (map.description) {
          console.log(`  ${map.description.substring(0, 100)}...`);
        }
        const locations = worldData.mapLocations.filter((l) => l.map_id === map.id);
        if (locations.length > 0) {
          console.log(`  Locations (${locations.length}):`);
          locations.forEach((loc) => {
            const coords = loc.coordinates ? ` @ (${loc.coordinates.x}, ${loc.coordinates.y})` : '';
            console.log(`    - ${loc.name}${coords}`);
          });
        }
      });
    }

    // Objectives
    if (worldData.objectives.length > 0) {
      console.log('\n=== Objectives ===');
      worldData.objectives.forEach((obj) => {
        console.log(`[${obj.id}] ${obj.title} [${obj.status}]`);
        if (obj.description) {
          console.log(`  ${obj.description.substring(0, 100)}...`);
        }
      });
    }

    // Video generation helpers
    console.log('\n=== Video Generation Helpers ===');

    const featured = selectCharactersForVideo(worldData.characters, { withImages: true, limit: 5 });
    console.log(`\nFeatured characters (with images): ${featured.length}`);
    featured.forEach((c) => console.log(`  - ${c.name}`));

    const coreLore = selectLoreForVideo(worldData.knowledgeBricks, {
      excludeSecrets: true,
      minImportance: 'medium',
      limit: 5
    });
    console.log(`\nCore lore items: ${coreLore.length}`);
    coreLore.forEach((l) => console.log(`  - ${l.title} [${l.importance}]`));

    const trailerProps = generateTrailerProps(worldData);
    console.log('\nTrailer Props Generated:');
    console.log(`  Featured Characters: ${trailerProps.featuredCharacters.length}`);
    console.log(`  Main Story: ${trailerProps.mainStory?.title || 'None'}`);
    console.log(`  Story Beats: ${trailerProps.storyBeats.length}`);
    console.log(`  Core Lore: ${trailerProps.coreLore.length}`);
    console.log(`  World Map: ${trailerProps.worldMap?.name || 'None'}`);

    const fps = 30;
    const frames = calculateSuggestedDuration(worldData, fps);
    console.log(`\nSuggested Duration: ${(frames / fps).toFixed(1)}s (${frames} frames @ ${fps}fps)`);

    // Output JSON for use
    console.log('\n=== Raw Data (JSON) ===');
    console.log(JSON.stringify(worldData, null, 2));

  } catch (error) {
    console.error('Error:', error);
  }
}

testFetch();
