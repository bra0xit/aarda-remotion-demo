import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';

// Each chaos panel shows a different "failed" tool
const CHAOS_PANELS = [
  { id: 'folders', duration: 22 },
  { id: 'character', duration: 23 },
  { id: 'map', duration: 22 },
  { id: 'chat', duration: 23 },
];

export const ChaosCuts: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill>
      {CHAOS_PANELS.map((panel) => {
        const startFrame = currentFrame;
        currentFrame += panel.duration;

        return (
          <Sequence key={panel.id} from={startFrame} durationInFrames={panel.duration}>
            <ChaosPanel type={panel.id} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const ChaosPanel: React.FC<{ type: string }> = ({ type }) => {
  const frame = useCurrentFrame();

  // Quick flash in
  const opacity = interpolate(frame, [0, 3], [0, 1], { extrapolateRight: 'clamp' });

  // Slight zoom during panel
  const scale = interpolate(frame, [0, 20], [1.02, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {type === 'folders' && <FolderExplosion frame={frame} />}
      {type === 'character' && <ConfusedCharacterSheet frame={frame} />}
      {type === 'map' && <BrokenMap frame={frame} />}
      {type === 'chat' && <StuckChat frame={frame} />}
    </AbsoluteFill>
  );
};

// Panel 1: Folders exploding
const FolderExplosion: React.FC<{ frame: number }> = ({ frame }) => {
  const folders = [
    { name: 'Characters_v2_FINAL', x: 400, y: 600, rotation: -15, delay: 0 },
    { name: 'Lore_backup_OLD', x: 600, y: 700, rotation: 10, delay: 2 },
    { name: 'Story_draft_3', x: 300, y: 800, rotation: -5, delay: 4 },
    { name: 'Maps_maybe', x: 700, y: 500, rotation: 20, delay: 3 },
    { name: 'Notes_IMPORTANT', x: 200, y: 650, rotation: -10, delay: 5 },
    { name: 'Ideas_unsorted', x: 550, y: 550, rotation: 8, delay: 1 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#2d2d2d', overflow: 'hidden' }}>
      {folders.map((folder, i) => {
        // Explode outward from center
        const progress = interpolate(
          frame,
          [folder.delay, folder.delay + 15],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        const startX = 540; // center
        const startY = 960;
        const currentX = interpolate(progress, [0, 1], [startX, folder.x]);
        const currentY = interpolate(progress, [0, 1], [startY, folder.y]);
        const rotation = interpolate(progress, [0, 1], [0, folder.rotation]);
        const opacity = interpolate(progress, [0, 0.1, 1], [0, 1, 1]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              opacity,
            }}
          >
            <FolderIcon name={folder.name} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const FolderIcon: React.FC<{ name: string }> = ({ name }) => (
  <div style={{ textAlign: 'center' }}>
    <svg width="80" height="70" viewBox="0 0 80 70">
      <path
        d="M 5 15 L 5 60 Q 5 65 10 65 L 70 65 Q 75 65 75 60 L 75 20 Q 75 15 70 15 L 35 15 L 30 8 L 10 8 Q 5 8 5 15"
        fill="#ffc107"
        stroke="#e6a800"
        strokeWidth="2"
      />
    </svg>
    <div style={{
      fontSize: 11,
      color: '#888',
      marginTop: 4,
      maxWidth: 100,
      wordBreak: 'break-word',
    }}>
      {name}
    </div>
  </div>
);

// Panel 2: Character sheet with question marks
const ConfusedCharacterSheet: React.FC<{ frame: number }> = ({ frame }) => {
  const questionMarks = [
    { x: 700, y: 400 },
    { x: 750, y: 600 },
    { x: 650, y: 800 },
    { x: 800, y: 500 },
    { x: 720, y: 700 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1e1e1e', padding: 60 }}>
      {/* Character sheet mockup */}
      <div style={{
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 40,
        width: 500,
        marginLeft: 80,
        marginTop: 200,
      }}>
        <div style={{ fontSize: 28, color: '#fff', marginBottom: 20 }}>
          Character: Elena
        </div>
        <div style={{ fontSize: 16, color: '#666', marginBottom: 12 }}>
          Role: <span style={{ color: '#888' }}>Wanderer</span>
        </div>
        <div style={{ fontSize: 16, color: '#666', marginBottom: 12 }}>
          Motivation: <span style={{ color: '#555' }}>____________</span>
        </div>
        <div style={{ fontSize: 16, color: '#666', marginBottom: 12 }}>
          Backstory: <span style={{ color: '#555' }}>____________</span>
        </div>
        <div style={{ fontSize: 16, color: '#666', marginBottom: 12 }}>
          Relationships: <span style={{ color: '#555' }}>____________</span>
        </div>
        <div style={{
          fontSize: 14,
          color: '#ef5350',
          marginTop: 30,
          fontStyle: 'italic',
        }}>
          * How does she connect to the kingdom?
        </div>
      </div>

      {/* Floating question marks */}
      {questionMarks.map((q, i) => {
        const floatY = Math.sin((frame + i * 10) * 0.15) * 10;
        const opacity = interpolate(frame, [i * 2, i * 2 + 5], [0, 0.7], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: q.x,
              top: q.y + floatY,
              fontSize: 48,
              color: '#ef5350',
              opacity,
              fontWeight: 'bold',
            }}
          >
            ?
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Panel 3: Map with pins falling off
const BrokenMap: React.FC<{ frame: number }> = ({ frame }) => {
  const pins = [
    { x: 300, y: 400, fallDelay: 5 },
    { x: 500, y: 350, fallDelay: 8 },
    { x: 700, y: 500, fallDelay: 3 },
    { x: 400, y: 600, fallDelay: 10 },
    { x: 600, y: 450, fallDelay: 6 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
      {/* Static map background */}
      <div style={{
        position: 'absolute',
        inset: 100,
        backgroundColor: '#3a3a3a',
        borderRadius: 8,
        opacity: 0.5,
      }}>
        {/* Grid lines suggesting a map */}
        <svg width="100%" height="100%" style={{ opacity: 0.3 }}>
          {[...Array(10)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={`${(i + 1) * 10}%`}
              x2="100%"
              y2={`${(i + 1) * 10}%`}
              stroke="#555"
              strokeWidth="1"
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={`${(i + 1) * 10}%`}
              y1="0"
              x2={`${(i + 1) * 10}%`}
              y2="100%"
              stroke="#555"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* Falling pins */}
      {pins.map((pin, i) => {
        const fallProgress = interpolate(
          frame,
          [pin.fallDelay, pin.fallDelay + 12],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        const y = pin.y + fallProgress * 800;
        const rotation = fallProgress * 45 * (i % 2 === 0 ? 1 : -1);
        const opacity = interpolate(fallProgress, [0, 0.8, 1], [1, 1, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pin.x,
              top: y,
              transform: `rotate(${rotation}deg)`,
              opacity,
            }}
          >
            <svg width="24" height="36" viewBox="0 0 24 36">
              <path
                d="M 12 0 C 5 0 0 5 0 12 C 0 20 12 36 12 36 C 12 36 24 20 24 12 C 24 5 19 0 12 0"
                fill="#ef5350"
              />
              <circle cx="12" cy="12" r="5" fill="#fff" />
            </svg>
          </div>
        );
      })}

      {/* "CONNECTION LOST" text */}
      <div style={{
        position: 'absolute',
        bottom: 300,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 24,
        color: '#ef5350',
        opacity: interpolate(frame, [12, 18], [0, 1], { extrapolateRight: 'clamp' }),
        letterSpacing: 4,
      }}>
        CONNECTIONS UNCLEAR
      </div>
    </AbsoluteFill>
  );
};

// Panel 4: Chat with infinite typing indicator
const StuckChat: React.FC<{ frame: number }> = ({ frame }) => {
  // Dots animation
  const dot1 = Math.sin(frame * 0.3) > 0 ? 1 : 0.3;
  const dot2 = Math.sin(frame * 0.3 + 1) > 0 ? 1 : 0.3;
  const dot3 = Math.sin(frame * 0.3 + 2) > 0 ? 1 : 0.3;

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a', padding: 80 }}>
      {/* Chat container */}
      <div style={{
        backgroundColor: '#2a2a2a',
        borderRadius: 16,
        padding: 30,
        maxWidth: 700,
        margin: '200px auto',
      }}>
        {/* User message */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 20,
        }}>
          <div style={{
            backgroundColor: '#6B5B95',
            color: '#fff',
            padding: '14px 20px',
            borderRadius: '16px 16px 4px 16px',
            fontSize: 18,
            maxWidth: '70%',
          }}>
            What is Elena's connection to the kingdom?
          </div>
        </div>

        {/* AI typing indicator - stuck forever */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            fontSize: 14,
          }}>
            AI
          </div>
          <div style={{
            backgroundColor: '#3a3a3a',
            padding: '16px 24px',
            borderRadius: '16px 16px 16px 4px',
            display: 'flex',
            gap: 6,
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#888',
              opacity: dot1,
            }} />
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#888',
              opacity: dot2,
            }} />
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#888',
              opacity: dot3,
            }} />
          </div>
        </div>

        {/* Frustration indicator */}
        <div style={{
          marginTop: 60,
          textAlign: 'center',
          color: '#666',
          fontSize: 14,
          opacity: interpolate(frame, [10, 15], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Generic AI doesn't know your world...
        </div>
      </div>
    </AbsoluteFill>
  );
};
