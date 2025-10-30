import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] pt-24 text-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full opacity-20 pointer-events-none" aria-hidden="true" style={{background: 'radial-gradient(closest-side, rgba(124,77,255,0.25), transparent 70%)'}} />

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <p className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase bg-white/5 border border-white/10">Portfolio 2025</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Crafting sleek, cinematic motion and brand experiences.
          </h1>
          <p className="text-gray-300 max-w-prose">
            I blend motion, design, and editing to tell bold visual stories. Explore selected works across branding, reels, motion graphics, and 3D texturing.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:anushka@example.com"
              className="relative inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-md text-black"
            >
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[#7c4dff] to-[#00e5ff]" />
              <span className="relative">Connect With Me</span>
            </a>
            <a
              href="#works"
              className="px-5 py-3 rounded-md border border-white/10 hover:border-white/20 text-sm font-semibold"
            >
              See Works
            </a>
          </div>
        </div>
        <div className="relative h-[420px] md:h-[520px] rounded-xl overflow-hidden">
          <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none" />
          <Spline
            scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[#7c4dff] to-[#00e5ff] opacity-20 blur-2xl" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
