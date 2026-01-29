import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

// Fake spreadsheet data representing scattered world-building
const SPREADSHEET_ROWS = [
  { a: 'Character Name', b: 'Role', c: 'Notes', d: 'Related To' },
  { a: 'Elena', b: 'Wanderer', c: 'mysterious past??', d: '???' },
  { a: 'The Kingdom', b: 'Location', c: 'fell long ago', d: 'Elena?' },
  { a: 'Guardian Order', b: 'Faction', c: 'TODO: flesh out', d: '' },
  { a: 'Magic System', b: 'Lore', c: 'need to define rules', d: '' },
  { a: 'Chapter 1', b: 'Story', c: 'intro - where?', d: '' },
  { a: '???', b: '???', c: 'connection unclear', d: '???' },
  { a: 'Ancient Sword', b: 'Item', c: 'belongs to who?', d: '' },
];

// Sticky note helper component
const StickyNote: React.FC<{
  text: string;
  x: number;
  y: number;
  rotation: number;
  color: string;
  frame: number;
  appearFrame: number;
}> = ({ text, x, y, rotation, color, frame, appearFrame }) => {
  const opacity = interpolate(
    frame,
    [appearFrame, appearFrame + 8],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  const scale = interpolate(
    frame,
    [appearFrame, appearFrame + 8],
    [0.8, 1],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        backgroundColor: color,
        padding: '12px 16px',
        fontSize: 14,
        fontFamily: 'Comic Sans MS, cursive',
        transform: `rotate(${rotation}deg) scale(${scale})`,
        boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
        opacity,
      }}
    >
      {text}
    </div>
  );
};

export const SpreadsheetChaos: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle shake to show instability
  const shakeX = Math.sin(frame * 0.5) * 1;
  const shakeY = Math.cos(frame * 0.7) * 0.5;

  // Fade in
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f5f5f5',
        opacity,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        padding: 60,
        fontFamily: 'monospace',
      }}
    >
      {/* Spreadsheet Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        marginBottom: 4,
      }}>
        {['A', 'B', 'C', 'D'].map((col) => (
          <div
            key={col}
            style={{
              backgroundColor: '#e0e0e0',
              padding: '12px 16px',
              fontSize: 14,
              fontWeight: 'bold',
              color: '#666',
              textAlign: 'center',
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Spreadsheet Rows */}
      {SPREADSHEET_ROWS.map((row, i) => {
        // Stagger row appearance
        const rowOpacity = interpolate(
          frame,
          [5 + i * 3, 10 + i * 3],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 2,
              marginBottom: 2,
              opacity: rowOpacity,
            }}
          >
            {Object.values(row).map((cell, j) => (
              <div
                key={j}
                style={{
                  backgroundColor: i === 0 ? '#e8e8e8' : '#fff',
                  padding: '14px 16px',
                  fontSize: i === 0 ? 13 : 14,
                  fontWeight: i === 0 ? 'bold' : 'normal',
                  color: cell.includes('?') ? '#999' : '#333',
                  border: '1px solid #ddd',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        );
      })}

      {/* Scattered sticky notes overlay */}
      <StickyNote
        text="don't forget!!"
        x={650}
        y={400}
        rotation={-8}
        color="#fff59d"
        frame={frame}
        appearFrame={30}
      />
      <StickyNote
        text="connect these?"
        x={100}
        y={600}
        rotation={5}
        color="#ffcc80"
        frame={frame}
        appearFrame={40}
      />
      <StickyNote
        text="TIMELINE???"
        x={500}
        y={750}
        rotation={-3}
        color="#ef9a9a"
        frame={frame}
        appearFrame={50}
      />

      {/* Crude hand-drawn map in corner */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          right: 60,
          width: 300,
          height: 250,
          backgroundColor: '#fff8e1',
          border: '2px solid #bbb',
          borderRadius: 4,
          opacity: interpolate(frame, [35, 45], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `rotate(${2}deg)`,
          padding: 20,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 260 210">
          {/* Crude hand-drawn circles for locations */}
          <circle cx="50" cy="50" r="20" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" />
          <circle cx="150" cy="80" r="25" fill="none" stroke="#666" strokeWidth="2" />
          <circle cx="200" cy="160" r="18" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" />
          <circle cx="80" cy="150" r="22" fill="none" stroke="#666" strokeWidth="2" />
          {/* Messy connecting lines */}
          <path d="M 70 50 Q 100 40 125 70" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray="3" />
          <path d="M 150 105 L 190 145" fill="none" stroke="#999" strokeWidth="1.5" />
          <path d="M 100 145 Q 130 180 175 165" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray="3" />
          {/* Question marks */}
          <text x="110" y="120" fontSize="24" fill="#999">?</text>
          <text x="170" y="50" fontSize="18" fill="#999">??</text>
        </svg>
      </div>

      {/* Desaturate filter overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.03)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
