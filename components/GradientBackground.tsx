import React from 'react';

export const GradientBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
    {/* Blob 1 — warm accent, top-left */}
    <div
      className="gradient-blob"
      style={{
        width: '70vw',
        height: '70vw',
        top: '-30%',
        left: '-20%',
        background:
          'radial-gradient(circle, rgba(198,146,51,0.11) 0%, transparent 70%)',
        animationDuration: '22s',
      }}
    />
    {/* Blob 2 — cool indigo tint, center-right */}
    <div
      className="gradient-blob"
      style={{
        width: '55vw',
        height: '55vw',
        top: '15%',
        right: '-15%',
        background:
          'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        animationDuration: '28s',
        animationDelay: '-9s',
      }}
    />
    {/* Blob 3 — warm accent, bottom-center */}
    <div
      className="gradient-blob"
      style={{
        width: '45vw',
        height: '45vw',
        bottom: '-20%',
        left: '25%',
        background:
          'radial-gradient(circle, rgba(198,146,51,0.07) 0%, transparent 70%)',
        animationDuration: '19s',
        animationDelay: '-14s',
      }}
    />
  </div>
);
