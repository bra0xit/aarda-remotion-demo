// Theme exports
export * from './themes';
export * from './themes/types';

// Context exports
export { ThemeProvider, useAardaTheme } from './context/theme-context';

// Animation exports
export {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerChildren,
  TypeWriter,
  CountUp,
  Highlight,
  MorphText,
  Pulse,
} from './components/animations';

// Effect exports
export {
  GlowPulse,
  ParticleField,
  GradientBackground,
  Shimmer,
  Spotlight,
  Vignette,
  FloatingOrbs,
} from './components/effects';

// Layout exports
export {
  FullScreen,
  SplitScreen,
  DeviceFrame,
  GridLayout,
  FocusZone,
  CenteredContent,
  OverlayContainer,
} from './components/layouts';

// UI exports
export {
  AardaButton,
  AardaCard,
  AardaBadge,
  AardaAvatar,
  ChatBubble,
  EmotionBar,
  ObjectiveCard,
  BeatNode,
  MapMarker,
  WizardStep,
  KnowledgeBrickCard,
  TriggerCard,
} from './components/ui/aarda';

// Utility exports
export * from './utils/colors';
export * from './utils/easings';
