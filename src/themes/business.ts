/**
 * Business Promo Video Theme
 * Warm corporate palette with flat illustration style
 */

export const BUSINESS_COLORS = {
  // Backgrounds
  cream: '#FDF6E9',
  beige: '#F5E6D3',
  warmWhite: '#FFFBF5',

  // Warm accents
  yellow: '#FBBF24',
  yellowLight: '#FDE68A',
  coral: '#F97316',
  terracotta: '#EA580C',

  // Figures & text
  burgundy: '#7C2D12',
  burgundyLight: '#A3553D',
  navy: '#1E3A5A',
  navyLight: '#2D5A87',

  // Pain/desaturated
  grey100: '#F3F4F6',
  grey200: '#E5E7EB',
  grey300: '#D1D5DB',
  grey400: '#9CA3AF',
  grey500: '#6B7280',
  grey600: '#4B5563',
  grey700: '#374151',

  // Success
  green: '#22C55E',
  greenLight: '#86EFAC',

  // Danger/warning (for metrics)
  red: '#EF4444',
  redLight: '#FCA5A5',
};

export const BUSINESS_FONTS = {
  heading: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
};

// Transition from grey (pain) to warm (solution)
export const getPainColor = (baseColor: string, progress: number) => {
  // progress: 0 = fully desaturated, 1 = fully saturated
  // This is a simplified version - actual implementation would use color interpolation
  return progress < 0.5 ? BUSINESS_COLORS.grey500 : baseColor;
};
