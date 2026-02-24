/**
 * Haven Vice Theme - Miami Noir 2025
 * Neon-lit crime drama aesthetic
 */

export const HAVEN_VICE_THEME = {
  colors: {
    // Primary neon palette
    neonPink: '#FF006E',
    neonCyan: '#00D4FF',
    neonOrange: '#FF6B35',
    neonPurple: '#BF00FF',

    // Backgrounds
    darkBg: '#0a0a0a',
    cardBg: '#141414',

    // Text
    textPrimary: '#ffffff',
    textSecondary: '#888888',
    textMuted: '#555555',

    // Accents
    gold: '#FFD700',
    danger: '#FF3333',
  },

  fonts: {
    heading: "'Bebas Neue', 'Impact', sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  // Glow effects
  glows: {
    pink: '0 0 40px rgba(255, 0, 110, 0.6)',
    cyan: '0 0 40px rgba(0, 212, 255, 0.6)',
    orange: '0 0 40px rgba(255, 107, 53, 0.6)',
  },
};

// Character data from the API (pre-loaded)
export const HAVEN_VICE_CHARACTERS = [
  {
    id: 185,
    name: "Carmen 'Cami' Ortiz",
    role: 'Undercover Miami PD Detective',
    tagline: 'Torn between duty and heart',
    image_url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/6bedc7d7cbc446ee0bc4b3853ebaf56c.png',
    accentColor: '#00D4FF',
  },
  {
    id: 187,
    name: 'Victor "Viper" Alvarez',
    role: 'Cartel Lieutenant',
    tagline: 'Controls South Beach narcotics',
    image_url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/bdf49ca1ace8246d8f1b07717a62dede.png',
    accentColor: '#FF3333',
  },
  {
    id: 186,
    name: 'Elena "Cipher" Chen',
    role: 'Black-hat Hacker',
    tagline: 'Secrets for the highest bidder',
    image_url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/6a3915a1d48fd6fefffc1b526942be38.png',
    accentColor: '#BF00FF',
  },
  {
    id: 188,
    name: 'Marisol Vega',
    role: 'City Commissioner',
    tagline: 'Corruption behind the campaign',
    image_url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/7ac388bfc58f6fefa798aa9eda675661.png',
    accentColor: '#FFD700',
  },
  {
    id: 189,
    name: 'Kenji Yamato',
    role: 'Pawn Broker',
    tagline: 'Cold-blooded and analytical',
    image_url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/31de7cf07087b93339a625e3ab1fa018.png',
    accentColor: '#FF6B35',
  },
];

export const HAVEN_VICE_STORY = {
  title: 'The Daily Grind',
  beats: [
    'Coming Home',
    "A Man's Talk",
    'I Need Some Dough',
    'Go See the Ex',
  ],
};

export const HAVEN_VICE_LORE = [
  'After 5 years in prison...',
  'Leo Cruz returns to reclaim his turf.',
  'Rival gangs. Corrupt cops. A ruthless tech mogul.',
  'The streets remember everything.',
];

export const HAVEN_VICE_PROJECT = {
  name: 'Haven Vice',
  tagline: 'Your choices. Your empire. Your story.',
  description: 'In 2025 Miami, ex-convict Leo Cruz returns to reclaim his turf in a neon-lit, crime-ridden Vice City.',
  image_url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/project/d4909de989c88f3ced1e527787cd585b.png',
};

// Scene/moment images for flash montage (using character images as scene moments)
export const HAVEN_VICE_SCENE_IMAGES = [
  {
    url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/6bedc7d7cbc446ee0bc4b3853ebaf56c.png',
    label: 'THE DETECTIVE',
    color: '#00D4FF',
  },
  {
    url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/bdf49ca1ace8246d8f1b07717a62dede.png',
    label: 'THE CARTEL',
    color: '#FF3333',
  },
  {
    url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/6a3915a1d48fd6fefffc1b526942be38.png',
    label: 'THE HACKER',
    color: '#BF00FF',
  },
  {
    url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/7ac388bfc58f6fefa798aa9eda675661.png',
    label: 'THE POLITICIAN',
    color: '#FFD700',
  },
  {
    url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/character/31de7cf07087b93339a625e3ab1fa018.png',
    label: 'THE BROKER',
    color: '#FF6B35',
  },
  {
    url: 'https://aarda-bucket.s3.eu-north-1.amazonaws.com/projects/99/project/d4909de989c88f3ced1e527787cd585b.png',
    label: 'VICE CITY',
    color: '#FF006E',
  },
];
