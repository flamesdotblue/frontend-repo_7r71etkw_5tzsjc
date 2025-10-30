import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import MotionToggle from './components/MotionToggle';

function App() {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Initialize with prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Background reducedMotion={reducedMotion} />
      <MotionToggle reduced={reducedMotion} onChange={setReducedMotion} />

      {/* Hero */}
      <Hero reducedMotion={reducedMotion} />

      {/* Features */}
      <Features reducedMotion={reducedMotion} />

      <Footer />
    </div>
  );
}

export default App;
