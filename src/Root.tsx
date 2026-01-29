import React from 'react';
import { Composition } from 'remotion';
import { PromoVideo } from './PromoVideo';
import { Scene2Shift } from './scenes/Scene2Shift';

// Wrapper for testing Scene 2 Segment A
const Scene2SegmentA: React.FC = () => <Scene2Shift />;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main AARDA Promo Video - 9:16 vertical format */}
      <Composition
        id="AardaPromo"
        component={PromoVideo}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={1080}  // 9:16 vertical
        height={1920}
        defaultProps={{}}
      />

      {/* Scene 1 only - for testing */}
      <Composition
        id="Scene1-Pain"
        component={PromoVideo}
        durationInFrames={240} // 8 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Scene 2 (Segment A: 2.1-2.3) - for testing */}
      <Composition
        id="Scene2-SegmentA"
        component={Scene2SegmentA}
        durationInFrames={360} // 12 seconds (3 sub-scenes at 4s each)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* 16:9 landscape version */}
      <Composition
        id="AardaPromo-Landscape"
        component={PromoVideo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
