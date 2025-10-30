import React from 'react';

export default function MotionToggle({ reduced, onChange }) {
  return (
    <div className="fixed right-4 top-4 z-50">
      <button
        type="button"
        aria-pressed={reduced}
        onClick={() => onChange(!reduced)}
        className={`rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md transition hover:bg-black/40 ${
          reduced ? 'ring-1 ring-white/20' : ''
        }`}
        title="Toggle reduced motion"
      >
        {reduced ? 'Reduced motion: On' : 'Reduced motion: Off'}
      </button>
    </div>
  );
}
