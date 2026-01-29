/**
 * Aarda Play Platform Features Reference
 * Use this context when building promo video components
 */

export const AARDA_FEATURES = {
  platform: {
    name: 'Aarda Play',
    tagline: 'Build, explore, and engage with immersive worlds',
    description: 'Platform where you can build worlds and characters, explore worlds, and engage in dynamic conversations with context-driven characters that stay true to your lore.',
  },

  objectives: {
    description: 'Meaningful goals with conditions and effects',
    features: [
      'Conditions like visiting locations or conversing with characters',
      'Effects that ripple through your world',
      'Associate knowledge with characters',
      'Trigger events or unlock new story paths',
      'Connects with Knowledge Bricks',
    ],
  },

  triggers: {
    description: 'React to player dialogue with intelligent trigger detection',
    features: [
      'Define topic phrases like "I am sorry"',
      'Provide example variations that activate the trigger',
      'Adjust similarity matching from broad to precise',
      'Characters respond appropriately to exact or similar phrases',
      'Build dynamic narratives that react naturally',
    ],
  },

  storyFrameworks: {
    description: 'Proven narrative structures',
    examples: ['Hero\'s Journey', 'Three-Act Structure'],
    features: ['Compatible genres', 'Sample chapters', 'Solid foundation'],
  },

  playModes: {
    onRails: 'Guided narrative progression following crafted story beats',
    exploration: 'Free-form discovery with map navigation',
  },

  conversations: {
    description: 'AI characters that remember your interactions',
    features: [
      'Adapt and evolve based on choices',
      'Maintain context throughout journey',
      'Authentic relationships',
      'True to character personality and world narrative',
    ],
  },

  emotionalMapping: {
    dimensions: ['joy', 'sadness', 'anger', 'fear', 'trust', 'surprise'],
    intensityScale: '0.0-1.0',
    features: [
      'Complex emotional states combining multiple feelings',
      'Context reactions that evolve based on conversation',
    ],
  },
};
