/**
 * Fetch scenes with images from Haven Vice
 */

import { createAardaClient } from './index';

async function fetchScenes() {
  const USERNAME = process.env.AARDA_USERNAME || '';
  const PASSWORD = process.env.AARDA_PASSWORD || '';
  const PROJECT_ID = parseInt(process.env.AARDA_PROJECT_ID || '99', 10);

  if (!USERNAME || !PASSWORD) {
    console.error('Set AARDA_USERNAME and AARDA_PASSWORD env vars');
    process.exit(1);
  }

  const client = createAardaClient();
  await client.login(USERNAME, PASSWORD);
  client.setCurrentProject(PROJECT_ID);

  console.log('Fetching scenes...\n');
  const scenes = await client.listScenes();

  console.log(`Found ${scenes.length} scenes:\n`);

  scenes.forEach((scene) => {
    console.log(`[${scene.id}] ${scene.title || scene.name || 'Untitled'}`);
    console.log(`  Content: ${(scene.content || scene.description || 'N/A').substring(0, 100)}...`);
    console.log(`  Image: ${scene.image_url || 'NO IMAGE'}`);
    console.log('');
  });

  // Output for easy copy-paste
  console.log('\n=== Scenes with images ===');
  const scenesWithImages = scenes.filter(s => s.image_url);
  scenesWithImages.forEach((scene) => {
    console.log(`{`);
    console.log(`  id: ${scene.id},`);
    console.log(`  title: '${scene.title || scene.name}',`);
    console.log(`  image_url: '${scene.image_url}',`);
    console.log(`},`);
  });

  console.log(`\nTotal scenes with images: ${scenesWithImages.length}`);
}

fetchScenes().catch(console.error);
