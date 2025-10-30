import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Shield } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Ship at lightspeed',
    desc: 'Craft, iterate, and publish stunning pages in minutes—not days.',
    color: 'from-cyan-400/80 to-cyan-300/70',
  },
  {
    icon: Sparkles,
    title: 'Design-grade visuals',
    desc: 'Crisp glass, neon accents, and motion that feels effortless.',
    color: 'from-violet-400/80 to-fuchsia-400/70',
  },
  {
    icon: Shield,
    title: 'Production-ready',
    desc: 'Accessible, responsive, and optimized for performance by default.',
    color: 'from-pink-400/80 to-rose-300/70',
  },
];

export default function Features({ reducedMotion = false }) {
  return (
    <section className="relative z-10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {features.map((f, idx) => (
            <FeatureCard key={idx} feature={f} reducedMotion={reducedMotion} />)
          )}
        </motion.ul>
      </div>
    </section>
  );
}

function FeatureCard({ feature, reducedMotion }) {
  const Icon = feature.icon;
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 12, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, mass: 0.6 }}
    >
      <div
        className="group relative rounded-2xl p-[1px]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))`,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset, 0 10px 30px -12px rgba(14,165,255,0.18)'
        }}
      >
        <div className="relative rounded-2xl bg-white/5 backdrop-blur-md p-5 md:p-6">
          {/* Neon accent tab */}
          <div className={`pointer-events-none absolute -top-0.5 left-5 h-0.5 w-12 rounded-full bg-gradient-to-r ${feature.color}`} />

          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-white/10 p-2 text-white">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h3 className="text-white font-medium">{feature.title}</h3>
              <p className="mt-1 text-sm text-white/80 leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        </div>
        {/* Hover lift + glow */}
        <div className="absolute -inset-1 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100" style={{
          background: 'radial-gradient(120px 60px at 20% 0%, rgba(14,165,255,0.18), transparent 60%)'
        }} />
      </div>
    </motion.li>
  );
}
