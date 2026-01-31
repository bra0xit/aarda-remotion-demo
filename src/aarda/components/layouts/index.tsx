/**
 * Layout Components for Aarda Remotion Videos
 * Reusable layout containers for video compositions
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { AardaTheme } from '../../themes/types';
import { withOpacity } from '../../utils/colors';

// ============================================================================
// FullScreen
// ============================================================================

interface FullScreenProps {
  /** Background color (or use theme) */
  background?: string;
  /** Theme for default colors */
  theme?: AardaTheme;
  /** Children */
  children: React.ReactNode;
  /** Center content */
  center?: boolean;
  /** Padding (px) */
  padding?: number;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const FullScreen: React.FC<FullScreenProps> = ({
  background,
  theme,
  children,
  center = true,
  padding = 60,
  style,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: background || theme?.colors.background || '#0a0a0f',
        display: center ? 'flex' : 'block',
        alignItems: center ? 'center' : undefined,
        justifyContent: center ? 'center' : undefined,
        padding,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// ============================================================================
// SplitScreen
// ============================================================================

interface SplitScreenProps {
  /** Left/top content */
  left: React.ReactNode;
  /** Right/bottom content */
  right: React.ReactNode;
  /** Split direction */
  direction?: 'horizontal' | 'vertical';
  /** Split ratio (0-1, where 0.5 = 50/50) */
  ratio?: number;
  /** Gap between panels (px) */
  gap?: number;
  /** Background color */
  background?: string;
  /** Theme */
  theme?: AardaTheme;
  /** Padding */
  padding?: number;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  left,
  right,
  direction = 'horizontal',
  ratio = 0.5,
  gap = 0,
  background,
  theme,
  padding = 0,
}) => {
  const isHorizontal = direction === 'horizontal';
  const leftSize = `${ratio * 100}%`;
  const rightSize = `${(1 - ratio) * 100}%`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: background || theme?.colors.background || '#0a0a0f',
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        gap,
        padding,
      }}
    >
      <div
        style={{
          width: isHorizontal ? leftSize : '100%',
          height: isHorizontal ? '100%' : leftSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {left}
      </div>
      <div
        style={{
          width: isHorizontal ? rightSize : '100%',
          height: isHorizontal ? '100%' : rightSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {right}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// DeviceFrame
// ============================================================================

interface DeviceFrameProps {
  /** Device type */
  device: 'iphone' | 'ipad' | 'macbook' | 'browser';
  /** Content to display in device */
  children: React.ReactNode;
  /** Scale factor */
  scale?: number;
  /** Show reflection effect */
  showReflection?: boolean;
  /** Display angle */
  angle?: 'flat' | 'perspective' | 'floating';
  /** Theme */
  theme?: AardaTheme;
}

const deviceDimensions = {
  iphone: { width: 375, height: 812, borderRadius: 40, bezel: 12 },
  ipad: { width: 768, height: 1024, borderRadius: 20, bezel: 20 },
  macbook: { width: 1280, height: 800, borderRadius: 12, bezel: 16 },
  browser: { width: 1200, height: 750, borderRadius: 8, bezel: 0 },
};

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  device,
  children,
  scale = 1,
  showReflection = false,
  angle = 'flat',
  theme,
}) => {
  const frame = useCurrentFrame();
  const dims = deviceDimensions[device];

  const getTransform = () => {
    switch (angle) {
      case 'perspective':
        return 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
      case 'floating':
        const float = Math.sin(frame * 0.05) * 5;
        return `translateY(${float}px)`;
      default:
        return 'none';
    }
  };

  const frameColor = theme?.colors.card || '#1a1a1a';
  const borderColor = theme?.colors.border || '#333';

  return (
    <div
      style={{
        transform: `scale(${scale}) ${getTransform()}`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Device frame */}
      <div
        style={{
          width: dims.width + dims.bezel * 2,
          height: dims.height + dims.bezel * 2 + (device === 'browser' ? 40 : 0),
          backgroundColor: frameColor,
          borderRadius: dims.borderRadius + dims.bezel / 2,
          padding: dims.bezel,
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 0 1px ${borderColor}
          `,
          position: 'relative',
        }}
      >
        {/* Browser top bar */}
        {device === 'browser' && (
          <div
            style={{
              height: 40,
              backgroundColor: theme?.colors.secondary || '#262629',
              borderRadius: `${dims.borderRadius}px ${dims.borderRadius}px 0 0`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: 8,
              marginBottom: dims.bezel,
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840' }} />
            </div>
            {/* URL bar */}
            <div
              style={{
                flex: 1,
                height: 24,
                backgroundColor: theme?.colors.background || '#0a0a0f',
                borderRadius: 6,
                marginLeft: 80,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                fontSize: 11,
                color: theme?.colors.muted || '#71717a',
              }}
            >
              play.aarda.ai
            </div>
          </div>
        )}

        {/* iPhone notch */}
        {device === 'iphone' && (
          <div
            style={{
              position: 'absolute',
              top: dims.bezel,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 150,
              height: 30,
              backgroundColor: frameColor,
              borderRadius: '0 0 20px 20px',
              zIndex: 10,
            }}
          />
        )}

        {/* Screen content */}
        <div
          style={{
            width: dims.width,
            height: dims.height,
            borderRadius: dims.borderRadius,
            overflow: 'hidden',
            backgroundColor: theme?.colors.background || '#0a0a0f',
            position: 'relative',
          }}
        >
          {children}

          {/* Reflection overlay */}
          {showReflection && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GridLayout
// ============================================================================

interface GridLayoutProps {
  /** Number of columns */
  columns?: number;
  /** Gap between items (px) */
  gap?: number;
  /** Children */
  children: React.ReactNode;
  /** Padding */
  padding?: number;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  columns = 2,
  gap = 20,
  children,
  padding = 0,
  style,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// FocusZone
// ============================================================================

interface FocusZoneProps {
  /** Focused content */
  children: React.ReactNode;
  /** Background content (will be dimmed/blurred) */
  background: React.ReactNode;
  /** Focus area position and size */
  focusArea?: {
    x: number | string;
    y: number | string;
    width: number | string;
    height: number | string;
  };
  /** Blur intensity for background */
  blur?: number;
  /** Dim intensity (0-1) */
  dim?: number;
  /** Animation delay (frames) */
  delay?: number;
  /** Animation duration (frames) */
  duration?: number;
}

export const FocusZone: React.FC<FocusZoneProps> = ({
  children,
  background,
  focusArea = { x: '25%', y: '25%', width: '50%', height: '50%' },
  blur = 4,
  dim = 0.6,
  delay = 0,
  duration = 20,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill>
      {/* Background layer */}
      <AbsoluteFill
        style={{
          filter: `blur(${blur * progress}px)`,
        }}
      >
        {background}
        {/* Dim overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: `rgba(0, 0, 0, ${dim * progress})`,
          }}
        />
      </AbsoluteFill>

      {/* Focus window */}
      <div
        style={{
          position: 'absolute',
          left: focusArea.x,
          top: focusArea.y,
          width: focusArea.width,
          height: focusArea.height,
          overflow: 'hidden',
          borderRadius: 12,
          boxShadow: `0 0 0 4px rgba(255, 255, 255, ${0.2 * progress})`,
          transform: `scale(${0.95 + 0.05 * progress})`,
          opacity: progress,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// CenteredContent
// ============================================================================

interface CenteredContentProps {
  /** Content */
  children: React.ReactNode;
  /** Max width */
  maxWidth?: number;
  /** Vertical alignment */
  vertical?: 'top' | 'center' | 'bottom';
  /** Padding */
  padding?: number;
}

export const CenteredContent: React.FC<CenteredContentProps> = ({
  children,
  maxWidth = 800,
  vertical = 'center',
  padding = 40,
}) => {
  const alignItems = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  }[vertical];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: alignItems,
        padding,
      }}
    >
      <div style={{ maxWidth, width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// OverlayContainer
// ============================================================================

interface OverlayContainerProps {
  /** Background content */
  background: React.ReactNode;
  /** Overlay content */
  overlay: React.ReactNode;
  /** Overlay opacity */
  overlayOpacity?: number;
  /** Overlay background color */
  overlayBackground?: string;
  /** Overlay blur */
  overlayBlur?: number;
}

export const OverlayContainer: React.FC<OverlayContainerProps> = ({
  background,
  overlay,
  overlayOpacity = 1,
  overlayBackground = 'transparent',
  overlayBlur = 0,
}) => {
  return (
    <AbsoluteFill>
      {/* Background */}
      <AbsoluteFill>
        {background}
      </AbsoluteFill>

      {/* Overlay background */}
      {(overlayBackground !== 'transparent' || overlayBlur > 0) && (
        <AbsoluteFill
          style={{
            backgroundColor: overlayBackground,
            backdropFilter: overlayBlur > 0 ? `blur(${overlayBlur}px)` : undefined,
          }}
        />
      )}

      {/* Overlay content */}
      <AbsoluteFill style={{ opacity: overlayOpacity }}>
        {overlay}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
