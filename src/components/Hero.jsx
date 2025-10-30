import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero({ reducedMotion = false }) {
  return (
    <section className="relative min-h-[88vh] w-full flex items-center justify-center">
      {/* Spline cover background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* A soft gradient veil to aid contrast for content, doesn't block pointer events */}
      <div className="pointer-events-none absolute inset-0" style={{
        background:
          'radial-gradient(1200px 600px at 50% 20%, rgba(6,18,56,0.35), rgba(6,18,56,0.55) 50%, rgba(6,18,56,0.75))',
      }} />

      {/* Centered glassmorphism hero card */}
      <div className="relative z-10 w-full max-w-4xl px-6 md:px-8">
        <GlassCard reducedMotion={reducedMotion}>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 0.7 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Build blazing-fast sites with AI.
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/85 max-w-2xl mx-auto">
                Design to production in minutes with modern UX, motion, and clean code.
              </p>

              <div className="mt-8">
                <CTA reducedMotion={reducedMotion} />
                <p className="mt-3 text-sm text-white/75">Start free • No card required.</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
}

function GlassCard({ children, reducedMotion }) {
  return (
    <div className="relative">
      {/* Gradient border wrapper */}
      <div
        className="relative rounded-3xl p-[1px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(14,165,255,0.9), rgba(124,58,237,0.9))',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.06) inset, 0 10px 40px -5px rgba(14,165,255,0.25), 0 8px 48px -8px rgba(124,58,237,0.28)'
        }}
      >
        {/* Inner glass layer */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-md px-8 md:px-12 py-10 md:py-12">
          {children}
          {/* Animated gradient line along bottom */}
          <div className="mt-8 h-px w-full overflow-hidden rounded-full">
            <div
              className="h-full w-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(14,165,255,0.0), rgba(14,165,255,0.85), rgba(124,58,237,0.85), rgba(255,107,138,0.85), rgba(124,58,237,0.85), rgba(14,165,255,0.0))',
                backgroundSize: '200% 100%',
                animation: reducedMotion ? 'none' : 'bgShift 8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CTA({ reducedMotion }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group relative inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-medium text-slate-900"
      style={{
        background: '#06b6d4',
        boxShadow: '0 8px 24px -6px rgba(6,182,212,0.6), 0 0 0 1px rgba(255,255,255,0.12) inset',
      }}
      aria-label="Get started"
    >
      Get started
      {/* Inner glow */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: 'inset 0 0 18px rgba(255,255,255,0.3)',
          animation: reducedMotion ? 'none' : 'pulseOnce 2.2s ease-in-out infinite',
          opacity: 0,
        }}
      />
      {/* Show inner pulse only on hover via group */}
      <style>{`
        .group:hover span { opacity: 1; }
      `}</style>
    </motion.button>
  );
}
