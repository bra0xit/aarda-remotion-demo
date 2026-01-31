/**
 * Aarda Themes Index
 * Export all themes and utilities
 */

export { darkAppTheme } from './dark-app';
export { cinematicTheme } from './cinematic';
export { lightCorpTheme } from './light-corp';
export { fantasyTheme } from './fantasy';
export type { AardaTheme, AardaThemeName } from './types';

import { darkAppTheme } from './dark-app';
import { cinematicTheme } from './cinematic';
import { lightCorpTheme } from './light-corp';
import { fantasyTheme } from './fantasy';
import { AardaTheme, AardaThemeName } from './types';

/** All available themes mapped by name */
export const themes: Record<AardaThemeName, AardaTheme> = {
  'dark-app': darkAppTheme,
  cinematic: cinematicTheme,
  'light-corp': lightCorpTheme,
  fantasy: fantasyTheme,
};

/** Get a theme by name */
export const getTheme = (name: AardaThemeName): AardaTheme => {
  return themes[name] || darkAppTheme;
};

/** Default theme */
export const defaultTheme = darkAppTheme;
