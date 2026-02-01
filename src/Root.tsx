import React from 'react';
import { Composition } from 'remotion';
import { PromoVideo } from './PromoVideo';
import { BusinessPromo } from './BusinessPromo';
import { Scene2Shift } from './scenes/Scene2Shift';
import { Scene3Conversation } from './scenes/Scene3Conversation';
import { Scene4SocialProof } from './scenes/Scene4SocialProof';
import { Scene5Close } from './scenes/Scene5Close';
import { HavenViceTrailer, HookScene, CharacterMontage, StoryHookScene, StoryBeatsFlash, CloseScene } from './trailers/haven-vice';
import { AardaLaunchVideo } from './launch';

// Wrapper for testing Scene 2 Segment A
const Scene2SegmentA: React.FC = () => <Scene2Shift />;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main AARDA Promo Video - 9:16 vertical format */}
      <Composition
        id="AardaPromo"
        component={PromoVideo}
        durationInFrames={2000} // 67 seconds at 30fps
        fps={30}
        width={1080}  // 9:16 vertical
        height={1920}
        defaultProps={{}}
      />

      {/* Scene 1 only - for testing */}
      <Composition
        id="Scene1-Pain"
        component={PromoVideo}
        durationInFrames={440} // 14.7 seconds
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

      {/* Scene 2 Full (2.1-2.6) - 24 seconds */}
      <Composition
        id="Scene2-Full"
        component={Scene2Shift}
        durationInFrames={720} // 24 seconds (6 sub-scenes at 4s each)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Scene 3 (Conversation) - for testing */}
      <Composition
        id="Scene3-Conversation"
        component={Scene3Conversation}
        durationInFrames={360} // 12 seconds (3 sub-scenes at 4s each)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Scene 4 (Social Proof) - for testing */}
      <Composition
        id="Scene4-SocialProof"
        component={Scene4SocialProof}
        durationInFrames={300} // 10 seconds (2 sub-scenes at 5s each)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Scene 5 (Close) - for testing */}
      <Composition
        id="Scene5-Close"
        component={Scene5Close}
        durationInFrames={180} // 6 seconds (2 sub-scenes at 3s each)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* 16:9 landscape version */}
      <Composition
        id="AardaPromo-Landscape"
        component={PromoVideo}
        durationInFrames={2000} // 67 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* ========== BUSINESS PROMO ========== */}

      {/* Business Promo - 9:16 vertical format */}
      <Composition
        id="AardaBusinessPromo"
        component={BusinessPromo}
        durationInFrames={1350} // 45 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Test: Document Graveyard only */}
      <Composition
        id="Test-DocumentGraveyard"
        component={require('./components/business/DocumentGraveyard').DocumentGraveyard}
        durationInFrames={270} // 9 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Test: Scroll of Death only */}
      <Composition
        id="Test-ScrollOfDeath"
        component={require('./components/business/ScrollOfDeath').ScrollOfDeath}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Business Promo - 16:9 landscape format */}
      <Composition
        id="AardaBusinessPromo-Landscape"
        component={BusinessPromo}
        durationInFrames={1350} // 45 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* ========== HAVEN VICE WORLD TRAILER ========== */}

      {/* Haven Vice - Full Trailer (44 seconds) */}
      <Composition
        id="HavenVice-Trailer"
        component={HavenViceTrailer}
        durationInFrames={1320} // 44 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Haven Vice - Landscape version */}
      <Composition
        id="HavenVice-Trailer-Landscape"
        component={HavenViceTrailer}
        durationInFrames={1320}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Haven Vice - Scene Tests */}
      <Composition
        id="HavenVice-HookScene"
        component={HookScene}
        durationInFrames={180} // 6 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="HavenVice-CharacterMontage"
        component={CharacterMontage}
        durationInFrames={300} // 10 seconds (5 chars × 2s)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="HavenVice-StoryHook"
        component={StoryHookScene}
        durationInFrames={300} // 10 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="HavenVice-StoryBeatsFlash"
        component={StoryBeatsFlash}
        durationInFrames={180} // 6 seconds (10 items × 18 frames)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="HavenVice-Close"
        component={CloseScene}
        durationInFrames={360} // 12 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* ========== AARDA LAUNCH VIDEO ========== */}

      {/* Launch Video - 9:16 portrait (social) */}
      <Composition
        id="AardaLaunch-Portrait"
        component={AardaLaunchVideo}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ orientation: 'portrait' as const }}
      />

      {/* Launch Video - 16:9 landscape (web/YouTube) */}
      <Composition
        id="AardaLaunch-Landscape"
        component={AardaLaunchVideo}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ orientation: 'landscape' as const }}
      />
    </>
  );
};
