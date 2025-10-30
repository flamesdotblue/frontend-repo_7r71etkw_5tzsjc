import React, { useMemo } from 'react';

// Animated gradient background + flame-like particles + optional film grain
export default function Background({ reducedMotion = false, particleCount = 22 }) {
  const particles = useMemo(() => {
    if (reducedMotion) return [];
    const count = Math.min(Math.max(particleCount, 18), 28);
    return new Array(count).fill(null).map((_, i) => {
      const width = Math.floor(Math.random() * 8) + 3; // 3-10px
      const height = Math.floor(Math.random() * 96) + 24; // 24-120px
      const left = Math.random() * 100; // vw
      const delay = Math.random() * 4; // 0-4s
      const duration = Math.random() * 6 + 4; // 4-10s
      const opacity = Math.random() * 0.2 + 0.15; // 0.15-0.35
      const sway = Math.random() * 6 + 6; // 6-12px
      const palette = Math.random() > 0.5
        ? ['#ff8a00', '#ffd25a']
        : ['#ff6b8a', '#ffd1e0'];
      return { id: i, width, height, left, delay, duration, opacity, sway, palette };
    });
  }, [particleCount, reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Keyframes and utility styles scoped to this component */}
      <style>{`
        @keyframes bgShift {
          0% { background-position: 0% 0%; }
          25% { background-position: 50% 25%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 75%; }
          100% { background-position: 0% 100%; }
        }
        @keyframes floatUp {
          0% { transform: translate3d(0, 20px, 0); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate3d(0, -140px, 0); opacity: 0; }
        }
        @keyframes swayX {
          0% { transform: translate3d(-8px, 0, 0); }
          50% { transform: translate3d(8px, 0, 0); }
          100% { transform: translate3d(-8px, 0, 0); }
        }
        @keyframes pulseOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Animated gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #061238 0%, #0ea5ff 25%, #7c3aed 60%, #ff6b8a 100%)',
          backgroundSize: '200% 200%',
          animation: reducedMotion ? 'none' : 'bgShift 10s ease-in-out infinite',
          filter: 'brightness(0.9) saturate(1.05)',
        }}
      />

      {/* Flame-like particles */}
      {!reducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full blur-[6px] will-change-transform will-change-opacity"
              style={{
                left: `${p.left}vw`,
                bottom: '-40px',
                width: `${p.width}px`,
                height: `${p.height}px`,
                opacity: p.opacity,
                background: `linear-gradient(to bottom, ${p.palette[0]}, ${p.palette[1]})`,
                animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite, swayX ${Math.max(
                  2,
                  p.duration * 0.6
                )}s ease-in-out ${p.delay / 2}s infinite alternate`,
                transform: `translate3d(0, 0, 0)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle film grain using SVG turbulence */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.02,
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"1400\\" height=\\"800\\">\n<filter id=\\"n\\">\n<feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.80\\" numOctaves=\\"2\\" stitchTiles=\\"stitch\\"/>\n<feColorMatrix type=\\"saturate\\" values=\\"0\\"/>\n</filter>\n<rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"1\\"/>\n</svg>')",
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
