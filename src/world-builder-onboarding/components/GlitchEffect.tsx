import React from 'react';
import { useCurrentFrame } from 'remotion';

interface GlitchEffectProps {
  intensity?: number;
  children: React.ReactNode;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  intensity = 0.8,
  children,
}) => {
  const frame = useCurrentFrame();
  const sliceCount = 10;

  const getSliceOffset = (sliceIndex: number): number => {
    const freq1 = 0.7 + sliceIndex * 0.37;
    const freq2 = 1.3 + sliceIndex * 0.53;
    const raw =
      Math.sin(frame * freq1 + sliceIndex * 17.3) *
      Math.cos(frame * freq2 + sliceIndex * 7.1);
    return raw * 15 * intensity;
  };

  const chromaOffset = 3 * intensity;

  const slices = Array.from({ length: sliceCount }, (_, i) => {
    const sliceTop = (i / sliceCount) * 100;
    const sliceBottom = ((i + 1) / sliceCount) * 100;
    const offset = getSliceOffset(i);

    return (
      <div
        key={`slice-${i}`}
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `polygon(0% ${sliceTop}%, 100% ${sliceTop}%, 100% ${sliceBottom}%, 0% ${sliceBottom}%)`,
          transform: `translateX(${offset}px)`,
        }}
      >
        {children}
      </div>
    );
  });

  const glitchBarActive = Math.sin(frame * 0.9) > 0.7 && intensity > 0.3;
  const glitchBarTop = (Math.sin(frame * 2.3) * 0.5 + 0.5) * 80 + 10;
  const glitchBarHeight = 4 + Math.abs(Math.sin(frame * 1.7)) * 8;
  const glitchBarOffset = Math.sin(frame * 3.1) * 30 * intensity;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
      {slices}

      {/* Chromatic aberration channels */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translateX(${-chromaOffset}px)`,
        opacity: 0.7 * intensity,
        mixBlendMode: 'screen' as const,
        filter: 'saturate(0) brightness(1.2)',
      }}>
        {children}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,0,0,0.15)', mixBlendMode: 'multiply' as const, pointerEvents: 'none' }} />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        transform: `translateX(${chromaOffset}px)`,
        opacity: 0.7 * intensity,
        mixBlendMode: 'screen' as const,
        filter: 'saturate(0) brightness(1.2)',
      }}>
        {children}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,255,0.15)', mixBlendMode: 'multiply' as const, pointerEvents: 'none' }} />
      </div>

      {/* Scan lines */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        pointerEvents: 'none',
        opacity: intensity,
      }} />

      {/* Intermittent glitch bar */}
      {glitchBarActive && (
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: `${glitchBarTop}%`,
          height: glitchBarHeight,
          backgroundColor: `rgba(255,255,255,${0.08 * intensity})`,
          transform: `translateX(${glitchBarOffset}px)`,
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
};
