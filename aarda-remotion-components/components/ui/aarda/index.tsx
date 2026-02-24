/**
 * Aarda UI Replica Components for Remotion Videos
 * Visual recreations of Aarda Play's actual UI elements
 */

import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { AardaTheme } from '../../../themes/types';
import { withOpacity } from '../../../utils/colors';
import { easings } from '../../../utils/easings';

// ============================================================================
// AardaButton
// ============================================================================

interface AardaButtonProps {
  /** Button text */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Theme */
  theme?: AardaTheme;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const AardaButton: React.FC<AardaButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  theme,
  style,
}) => {
  const colors = {
    primary: {
      bg: theme?.colors.primary || '#6c5ce7',
      text: '#ffffff',
      border: 'transparent',
    },
    secondary: {
      bg: theme?.colors.secondary || '#262629',
      text: theme?.colors.foreground || '#fafafa',
      border: theme?.colors.border || '#333',
    },
    ghost: {
      bg: 'transparent',
      text: theme?.colors.foreground || '#fafafa',
      border: theme?.colors.border || '#333',
    },
  }[variant];

  const sizes = {
    sm: { padding: '8px 16px', fontSize: 13 },
    md: { padding: '10px 20px', fontSize: 14 },
    lg: { padding: '14px 28px', fontSize: 16 },
  }[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
        fontWeight: 500,
        cursor: 'pointer',
        ...sizes,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// AardaCard
// ============================================================================

interface AardaCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Card header */
  header?: React.ReactNode;
  /** Theme */
  theme?: AardaTheme;
  /** Padding */
  padding?: number;
  /** Border radius */
  borderRadius?: number;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const AardaCard: React.FC<AardaCardProps> = ({
  children,
  header,
  theme,
  padding = 20,
  borderRadius = 12,
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: theme?.colors.card || '#262629',
        border: `1px solid ${theme?.colors.border || '#333'}`,
        borderRadius,
        overflow: 'hidden',
        ...style,
      }}
    >
      {header && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${theme?.colors.border || '#333'}`,
            fontFamily: theme?.fonts.heading || 'Inter, system-ui, sans-serif',
            fontWeight: 600,
            color: theme?.colors.foreground || '#fafafa',
          }}
        >
          {header}
        </div>
      )}
      <div style={{ padding }}>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// AardaBadge
// ============================================================================

interface AardaBadgeProps {
  /** Badge text */
  children: React.ReactNode;
  /** Badge type */
  type?: 'character' | 'player' | 'knowledge' | 'group' | 'default';
  /** Theme */
  theme?: AardaTheme;
  /** Size */
  size?: 'sm' | 'md';
}

export const AardaBadge: React.FC<AardaBadgeProps> = ({
  children,
  type = 'default',
  theme,
  size = 'md',
}) => {
  const colors = {
    character: {
      bg: theme?.colors.character || '#e9dff7',
      text: theme?.colors.characterForeground || '#4a1d6b',
    },
    player: {
      bg: theme?.colors.player || '#fef3c7',
      text: theme?.colors.playerForeground || '#451a03',
    },
    knowledge: {
      bg: theme?.colors.knowledgeBrick || '#f0f0f2',
      text: theme?.colors.knowledgeBrickForeground || '#1e3a5f',
    },
    group: {
      bg: theme?.colors.group || '#e0f7fa',
      text: theme?.colors.groupForeground || '#0c4a5e',
    },
    default: {
      bg: theme?.colors.secondary || '#262629',
      text: theme?.colors.foreground || '#fafafa',
    },
  }[type];

  const sizeStyles = {
    sm: { padding: '2px 8px', fontSize: 11 },
    md: { padding: '4px 12px', fontSize: 12 },
  }[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: 9999,
        fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
        fontWeight: 500,
        ...sizeStyles,
      }}
    >
      {children}
    </span>
  );
};

// ============================================================================
// AardaAvatar
// ============================================================================

interface AardaAvatarProps {
  /** Image URL */
  src?: string;
  /** Fallback initials */
  name?: string;
  /** Size (px) */
  size?: number;
  /** Border color */
  borderColor?: string;
  /** Theme */
  theme?: AardaTheme;
}

export const AardaAvatar: React.FC<AardaAvatarProps> = ({
  src,
  name = '',
  size = 48,
  borderColor,
  theme,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Generate gradient from name
  const gradientColors = [
    ['#6c5ce7', '#a855f7'],
    ['#3b82f6', '#06b6d4'],
    ['#10b981', '#14b8a6'],
    ['#f59e0b', '#f97316'],
    ['#ec4899', '#f43f5e'],
  ];
  const gradientIndex = name.length % gradientColors.length;
  const [color1, color2] = gradientColors[gradientIndex];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${borderColor || theme?.colors.border || '#333'}`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: src ? undefined : `linear-gradient(135deg, ${color1}, ${color2})`,
        fontSize: size * 0.4,
        fontWeight: 600,
        color: '#fff',
        fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials
      )}
    </div>
  );
};

// ============================================================================
// ChatBubble
// ============================================================================

interface ChatBubbleProps {
  /** Message content */
  message: string;
  /** Is this from the player? */
  isPlayer?: boolean;
  /** Character/Player name */
  name?: string;
  /** Avatar URL */
  avatar?: string;
  /** Show typing animation */
  typing?: boolean;
  /** Typing progress (0-1) */
  typingProgress?: number;
  /** Theme */
  theme?: AardaTheme;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isPlayer = false,
  name,
  avatar,
  typing = false,
  typingProgress = 1,
  theme,
}) => {
  const displayMessage = typing
    ? message.slice(0, Math.floor(message.length * typingProgress))
    : message;

  const bubbleStyle: React.CSSProperties = isPlayer
    ? {
        backgroundColor: theme?.colors.playerMessage || '#059669',
        color: '#fff',
        borderRadius: '16px 16px 4px 16px',
        marginLeft: 'auto',
      }
    : {
        backgroundColor: theme?.colors.characterMessage || 'rgba(255, 255, 255, 0.1)',
        color: theme?.colors.foreground || '#fafafa',
        border: `1px solid ${withOpacity(theme?.colors.foreground || '#fff', 0.05)}`,
        borderRadius: '16px 16px 16px 4px',
        marginRight: 'auto',
      };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isPlayer ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 12,
        maxWidth: '85%',
        alignSelf: isPlayer ? 'flex-end' : 'flex-start',
      }}
    >
      {avatar && (
        <AardaAvatar src={avatar} name={name} size={36} theme={theme} />
      )}
      <div
        style={{
          padding: '12px 16px',
          fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
          fontSize: 14,
          lineHeight: 1.5,
          ...bubbleStyle,
        }}
      >
        {displayMessage}
        {typing && typingProgress < 1 && (
          <span style={{ opacity: 0.5 }}>|</span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// EmotionBar
// ============================================================================

interface EmotionBarProps {
  /** Emotion label (left side) */
  labelLeft: string;
  /** Emotion label (right side) */
  labelRight: string;
  /** Current value (-1 to 1) */
  value: number;
  /** Target value (optional, for objectives) */
  target?: number;
  /** Left color */
  colorLeft?: string;
  /** Right color */
  colorRight?: string;
  /** Theme */
  theme?: AardaTheme;
}

export const EmotionBar: React.FC<EmotionBarProps> = ({
  labelLeft,
  labelRight,
  value,
  target,
  colorLeft = '#3b82f6',
  colorRight = '#fbbf24',
  theme,
}) => {
  // Convert -1 to 1 range to 0 to 100 percentage
  const position = ((value + 1) / 2) * 100;
  const targetPosition = target !== undefined ? ((target + 1) / 2) * 100 : undefined;

  return (
    <div style={{ width: '100%' }}>
      {/* Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
          fontSize: 11,
          fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
          color: theme?.colors.muted || '#71717a',
        }}
      >
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>

      {/* Bar */}
      <div
        style={{
          height: 8,
          backgroundColor: theme?.colors.secondary || '#262629',
          borderRadius: 4,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Center line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: theme?.colors.border || '#333',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Fill bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: value < 0 ? `${position}%` : '50%',
            width: `${Math.abs(value) * 50}%`,
            backgroundColor: value < 0 ? colorLeft : colorRight,
            borderRadius: 4,
          }}
        />

        {/* Current value indicator */}
        <div
          style={{
            position: 'absolute',
            left: `${position}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: value < 0 ? colorLeft : colorRight,
            border: '2px solid #fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        />

        {/* Target marker */}
        {targetPosition !== undefined && (
          <div
            style={{
              position: 'absolute',
              left: `${targetPosition}%`,
              top: -4,
              transform: 'translateX(-50%)',
              width: 2,
              height: 16,
              backgroundColor: '#fff',
              opacity: 0.8,
            }}
          />
        )}
      </div>
    </div>
  );
};

// ============================================================================
// ObjectiveCard
// ============================================================================

interface ObjectiveCardProps {
  /** Objective title */
  title: string;
  /** Objective description */
  description?: string;
  /** Completion status */
  status?: 'pending' | 'active' | 'completed';
  /** Objective type */
  type?: 'main' | 'side' | 'hidden' | 'bonus';
  /** Theme */
  theme?: AardaTheme;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  title,
  description,
  status = 'pending',
  type = 'main',
  theme,
}) => {
  const typeEmoji = {
    main: '',
    side: '',
    hidden: '',
    bonus: '',
  }[type];

  const statusColors = {
    pending: theme?.colors.muted || '#71717a',
    active: theme?.colors.primary || '#6c5ce7',
    completed: '#22c55e',
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: 16,
        backgroundColor: withOpacity(statusColors[status], 0.1),
        border: `1px solid ${withOpacity(statusColors[status], 0.3)}`,
        borderRadius: 10,
        fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Status icon */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: `2px solid ${statusColors[status]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        {status === 'completed' && '✓'}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: theme?.colors.foreground || '#fafafa',
            marginBottom: description ? 4 : 0,
          }}
        >
          {typeEmoji} {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 12,
              color: theme?.colors.muted || '#71717a',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// BeatNode
// ============================================================================

interface BeatNodeProps {
  /** Beat name */
  name: string;
  /** Beat position (e.g., "1 of 12") */
  position?: string;
  /** Beat status */
  status?: 'pending' | 'active' | 'completed';
  /** Tension level (0-1) */
  tension?: number;
  /** Beat image URL */
  imageUrl?: string;
  /** Theme */
  theme?: AardaTheme;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
}

export const BeatNode: React.FC<BeatNodeProps> = ({
  name,
  position,
  status = 'pending',
  tension = 0.5,
  imageUrl,
  theme,
  size = 'md',
}) => {
  const statusColors = {
    pending: theme?.colors.muted || '#71717a',
    active: theme?.colors.primary || '#6c5ce7',
    completed: '#22c55e',
  };

  const sizes = {
    sm: { width: 160, padding: 12, fontSize: 12 },
    md: { width: 220, padding: 16, fontSize: 14 },
    lg: { width: 280, padding: 20, fontSize: 16 },
  }[size];

  return (
    <div
      style={{
        width: sizes.width,
        backgroundColor: theme?.colors.card || '#262629',
        border: `2px solid ${statusColors[status]}`,
        borderRadius: 12,
        overflow: 'hidden',
        fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Image */}
      {imageUrl && (
        <div
          style={{
            height: sizes.width * 0.5,
            backgroundColor: theme?.colors.secondary || '#1a1a1a',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Content */}
      <div style={{ padding: sizes.padding }}>
        {/* Status and position */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: statusColors[status],
            }}
          />
          {position && (
            <span
              style={{
                fontSize: 10,
                color: theme?.colors.muted || '#71717a',
              }}
            >
              {position}
            </span>
          )}
        </div>

        {/* Name */}
        <div
          style={{
            fontWeight: 600,
            fontSize: sizes.fontSize,
            color: theme?.colors.foreground || '#fafafa',
            marginBottom: 12,
          }}
        >
          {name}
        </div>

        {/* Tension bar */}
        <div
          style={{
            height: 4,
            backgroundColor: theme?.colors.secondary || '#1a1a1a',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${tension * 100}%`,
              backgroundColor: tension > 0.7 ? '#ef4444' : tension > 0.4 ? '#f59e0b' : '#22c55e',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MapMarker
// ============================================================================

interface MapMarkerProps {
  /** Location name */
  name: string;
  /** Is selected */
  selected?: boolean;
  /** Has characters */
  hasCharacters?: boolean;
  /** Theme */
  theme?: AardaTheme;
  /** Animation delay (frames) */
  delay?: number;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  name,
  selected = false,
  hasCharacters = false,
  theme,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating animation
  const floatY = Math.sin((frame - delay) * 0.05) * 3;
  const floatRotate = Math.sin((frame - delay) * 0.03) * 2;

  // Entry animation
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 200, damping: 15 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0, 1]);
  const opacity = interpolate(entrySpring, [0, 0.5, 1], [0, 1, 1]);

  const pinColor = selected
    ? theme?.colors.primary || '#6c5ce7'
    : theme?.colors.accent || '#9e5ecf';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translateY(${floatY}px) rotate(${floatRotate}deg) scale(${scale})`,
        opacity,
      }}
    >
      {/* Pin */}
      <div
        style={{
          width: 32,
          height: 40,
          position: 'relative',
        }}
      >
        {/* Pin body */}
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: pinColor,
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            boxShadow: selected
              ? `0 0 20px ${withOpacity(pinColor, 0.6)}`
              : '0 4px 8px rgba(0,0,0,0.3)',
          }}
        />

        {/* Inner circle */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            width: 20,
            height: 20,
            backgroundColor: theme?.colors.card || '#262629',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
          }}
        >
          {hasCharacters ? '👤' : '📍'}
        </div>
      </div>

      {/* Name label */}
      <div
        style={{
          marginTop: 8,
          padding: '4px 10px',
          backgroundColor: withOpacity(theme?.colors.card || '#262629', 0.9),
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 500,
          color: theme?.colors.foreground || '#fafafa',
          fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </div>
    </div>
  );
};

// ============================================================================
// WizardStep
// ============================================================================

interface WizardStepProps {
  /** Step number */
  step: number;
  /** Total steps */
  total: number;
  /** Step title */
  title: string;
  /** Is current step */
  current?: boolean;
  /** Is completed */
  completed?: boolean;
  /** Theme */
  theme?: AardaTheme;
}

export const WizardStep: React.FC<WizardStepProps> = ({
  step,
  total,
  title,
  current = false,
  completed = false,
  theme,
}) => {
  const statusColor = completed
    ? '#22c55e'
    : current
    ? theme?.colors.primary || '#6c5ce7'
    : theme?.colors.muted || '#71717a';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: current || completed ? 1 : 0.5,
      }}
    >
      {/* Step indicator */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: completed ? statusColor : 'transparent',
          border: `2px solid ${statusColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 14,
          color: completed ? '#fff' : statusColor,
        }}
      >
        {completed ? '✓' : step}
      </div>

      {/* Title */}
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: current ? 600 : 400,
            color: theme?.colors.foreground || '#fafafa',
            fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 11,
            color: theme?.colors.muted || '#71717a',
            fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
          }}
        >
          Step {step} of {total}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// KnowledgeBrickCard
// ============================================================================

interface KnowledgeBrickCardProps {
  /** Title */
  title: string;
  /** Content preview */
  content?: string;
  /** Has children */
  hasChildren?: boolean;
  /** Theme */
  theme?: AardaTheme;
}

export const KnowledgeBrickCard: React.FC<KnowledgeBrickCardProps> = ({
  title,
  content,
  hasChildren = false,
  theme,
}) => {
  return (
    <div
      style={{
        padding: 16,
        backgroundColor: theme?.colors.card || '#262629',
        border: `1px solid ${theme?.colors.border || '#333'}`,
        borderRadius: 10,
        fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: content ? 8 : 0,
        }}
      >
        <span style={{ fontSize: 16 }}>📚</span>
        <span
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: theme?.colors.foreground || '#fafafa',
          }}
        >
          {title}
        </span>
        {hasChildren && (
          <span
            style={{
              fontSize: 10,
              color: theme?.colors.muted || '#71717a',
            }}
          >
            ▼
          </span>
        )}
      </div>
      {content && (
        <div
          style={{
            fontSize: 12,
            color: theme?.colors.muted || '#71717a',
            lineHeight: 1.5,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// TriggerCard
// ============================================================================

interface TriggerCardProps {
  /** Trigger phrase */
  phrase: string;
  /** Example phrases */
  examples?: string[];
  /** Card color index (0-5) */
  colorIndex?: number;
  /** Theme */
  theme?: AardaTheme;
}

export const TriggerCard: React.FC<TriggerCardProps> = ({
  phrase,
  examples = [],
  colorIndex = 0,
  theme,
}) => {
  const gradients = [
    ['#6c5ce7', '#a855f7'],
    ['#3b82f6', '#06b6d4'],
    ['#10b981', '#14b8a6'],
    ['#f59e0b', '#f97316'],
    ['#ec4899', '#f43f5e'],
    ['#8b5cf6', '#d946ef'],
  ];
  const [color1, color2] = gradients[colorIndex % gradients.length];

  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        fontFamily: theme?.fonts.body || 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Gradient header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          padding: 20,
          position: 'relative',
        }}
      >
        <span style={{ fontSize: 24 }}>⚡</span>
        <div
          style={{
            marginTop: 12,
            fontSize: 16,
            fontWeight: 600,
            color: '#fff',
          }}
        >
          "{phrase}"
        </div>
      </div>

      {/* Examples */}
      {examples.length > 0 && (
        <div
          style={{
            backgroundColor: theme?.colors.card || '#262629',
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: theme?.colors.muted || '#71717a',
              marginBottom: 8,
            }}
          >
            Example variations:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {examples.slice(0, 3).map((example, i) => (
              <AardaBadge key={i} theme={theme} size="sm">
                {example}
              </AardaBadge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
