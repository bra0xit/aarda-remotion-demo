import React from 'react';
import { Composition } from 'remotion';

// Placeholder composition to verify setup works
const Placeholder: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: '#00d4ff', fontSize: 60, fontFamily: 'sans-serif' }}>
        Remotion Demo
      </h1>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="placeholder"
        component={Placeholder}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
