/**
 * Theme Context for Aarda Remotion Videos
 * Provides theme to all child components
 */

import React, { createContext, useContext } from 'react';
import { AardaTheme, AardaThemeName } from '../themes/types';
import { getTheme, defaultTheme } from '../themes';

// ============================================================================
// Context
// ============================================================================

interface ThemeContextValue {
  theme: AardaTheme;
  themeName: AardaThemeName;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  themeName: 'dark-app',
});

// ============================================================================
// Provider
// ============================================================================

interface ThemeProviderProps {
  /** Theme name or theme object */
  theme: AardaThemeName | AardaTheme;
  /** Children */
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const resolvedTheme: AardaTheme =
    typeof theme === 'string' ? getTheme(theme) : theme;

  const themeName: AardaThemeName =
    typeof theme === 'string' ? theme : (resolvedTheme.name as AardaThemeName);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access the current theme
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook to get just the theme object
 */
export const useAardaTheme = (): AardaTheme => {
  const { theme } = useTheme();
  return theme;
};

// ============================================================================
// HOC for theme injection
// ============================================================================

/**
 * Higher-order component to inject theme as prop
 */
export function withTheme<P extends { theme?: AardaTheme }>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, 'theme'>> {
  return function ThemedComponent(props: Omit<P, 'theme'>) {
    const { theme } = useTheme();
    return <Component {...(props as P)} theme={theme} />;
  };
}
