import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// Knowledge Brick node data
const NODES = [
  { id: 'kingdom', title: 'The Ancient Kingdom', x: 540, y: 600, gradient: ['#8B5CF6', '#A78BFA'], delay: 0 },
  { id: 'elena', title: 'Elena', x: 320, y: 450, gradient: ['#3B82F6', '#6366F1'], delay: 15 },
  { id: 'guardians', title: 'Guardian Order', x: 760, y: 450, gradient: ['#10B981', '#14B8A6'], delay: 20 },
  { id: 'sword', title: 'Ancient Sword', x: 400, y: 800, gradient: ['#F59E0B', '#F97316'], delay: 30 },
  { id: 'magic', title: 'Magic System', x: 680, y: 800, gradient: ['#F43F5E', '#EC4899'], delay: 35 },
  { id: 'ruins', title: 'The Ruins', x: 540, y: 1000, gradient: ['#06B6D4', '#0EA5E9'], delay: 45 },
];

// Connections between nodes
const CONNECTIONS = [
  { from: 'kingdom', to: 'elena', delay: 25 },
  { from: 'kingdom', to: 'guardians', delay: 30 },
  { from: 'kingdom', to: 'sword', delay: 40 },
  { from: 'kingdom', to: 'magic', delay: 45 },
  { from: 'elena', to: 'sword', delay: 50 },
  { from: 'guardians', to: 'magic', delay: 55 },
  { from: 'kingdom', to: 'ruins', delay: 60 },
];

export const KnowledgeGraphUnfold: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zoom out effect
  const zoomProgress = interpolate(frame, [0, 60], [1.3, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0f0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Graph container with zoom */}
      <div
        style={{
          position: 'relative',
          width: 1080,
          height: 1920,
          transform: `scale(${zoomProgress})`,
          transformOrigin: 'center 600px', // Zoom from center of first brick
        }}
      >
        {/* Connection lines (render behind nodes) */}
        <svg
          width="1080"
          height="1920"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {CONNECTIONS.map((conn, i) => {
            const fromNode = NODES.find((n) => n.id === conn.from)!;
            const toNode = NODES.find((n) => n.id === conn.to)!;
            return (
              <ConnectionLine
                key={i}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                delay={conn.delay}
                frame={frame}
              />
            );
          })}
        </svg>

        {/* Knowledge Brick nodes */}
        {NODES.map((node) => (
          <GraphNode
            key={node.id}
            {...node}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      {/* Ambient particles */}
      <ParticleField frame={frame} />
    </AbsoluteFill>
  );
};

// Individual graph node (mini Knowledge Brick)
interface GraphNodeProps {
  id: string;
  title: string;
  x: number;
  y: number;
  gradient: string[];
  delay: number;
  frame: number;
  fps: number;
}

const GraphNode: React.FC<GraphNodeProps> = ({
  title,
  x,
  y,
  gradient,
  delay,
  frame,
  fps,
}) => {
  // Spring animation for appearance
  const appearSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 120, damping: 14 },
  });

  const scale = interpolate(appearSpring, [0, 1], [0, 1]);
  const opacity = interpolate(appearSpring, [0, 0.3, 1], [0, 1, 1]);

  // Gentle floating animation after appearing
  const floatY = frame > delay + 20
    ? Math.sin((frame - delay) * 0.05) * 3
    : 0;

  // Glow intensity
  const glowOpacity = interpolate(appearSpring, [0, 1], [0, 0.4]);

  if (scale <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + floatY,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      {/* Glow behind card */}
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${gradient[0]}66 0%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: glowOpacity,
        }}
      />

      {/* Mini Knowledge Brick Card */}
      <div
        style={{
          width: 160,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#1a1a1a',
          boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
      >
        {/* Gradient header */}
        <div
          style={{
            height: 60,
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          }}
        />

        {/* Title */}
        <div
          style={{
            padding: '10px 12px',
            fontSize: 12,
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
      </div>

      {/* Connection handles */}
      <div
        style={{
          position: 'absolute',
          top: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: gradient[0],
          boxShadow: `0 0 6px ${gradient[0]}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: gradient[0],
          boxShadow: `0 0 6px ${gradient[0]}`,
        }}
      />
    </div>
  );
};

// Animated connection line between nodes
interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  frame: number;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  delay,
  frame,
}) => {
  const progress = interpolate(
    frame,
    [delay, delay + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  if (progress <= 0) return null;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return (
    <g>
      {/* Glow line */}
      <line
        x1={x1}
        y1={y1}
        x2={x1 + (x2 - x1) * progress}
        y2={y1 + (y2 - y1) * progress}
        stroke="rgba(139, 92, 246, 0.3)"
        strokeWidth="6"
        strokeLinecap="round"
        style={{ filter: 'blur(4px)' }}
      />
      {/* Main line */}
      <line
        x1={x1}
        y1={y1}
        x2={x1 + (x2 - x1) * progress}
        y2={y1 + (y2 - y1) * progress}
        stroke="rgba(139, 92, 246, 0.6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
      {/* Moving pulse dot */}
      {progress > 0.5 && (
        <circle
          cx={x1 + (x2 - x1) * ((frame - delay - 7) % 30) / 30}
          cy={y1 + (y2 - y1) * ((frame - delay - 7) % 30) / 30}
          r="3"
          fill="#A78BFA"
          style={{ filter: 'blur(1px)' }}
        />
      )}
    </g>
  );
};

// Background particle effect
const ParticleField: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 61.8) % 100,
    size: 1 + (i % 3),
    speed: 0.15 + (i % 5) * 0.05,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed) % 110 - 5;
        const x = p.x + Math.sin(frame * 0.015 + i) * 1.5;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: 'rgba(139, 92, 246, 0.5)',
            }}
          />
        );
      })}
    </div>
  );
};
