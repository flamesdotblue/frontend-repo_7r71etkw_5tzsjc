import { useEffect, useMemo, useRef, useState } from 'react'

const categories = [
  'All',
  'Logos',
  'Branding',
  'Reels',
  'Video Editing',
  'Motion Graphics',
  '3D Layering & Texturing',
  '2D Animation',
]

const sampleProjects = [
  {
    id: 1,
    title: 'Neon Pulse Identity',
    categories: ['Branding', 'Logos'],
    image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1200&auto=format&fit=crop',
    description: 'A bold identity for a music-tech startup. Logomark, palette, motion reveal.'
  },
  {
    id: 2,
    title: 'Kinetic Title Reel',
    categories: ['Reels', 'Motion Graphics'],
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1200&auto=format&fit=crop',
    description: 'A collection of kinetic typography stingers for socials.'
  },
  {
    id: 3,
    title: 'Product Story Edit',
    categories: ['Video Editing'],
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    description: 'Narrative edit with color-grade and sound design for a D2C launch.'
  },
  {
    id: 4,
    title: 'Textured Type Study',
    categories: ['3D Layering & Texturing'],
    image: 'https://images.unsplash.com/photo-1501556424050-d4816356b73e?q=80&w=1200&auto=format&fit=crop',
    description: '3D layered typographic experiment blending glass and neon materials.'
  },
]

export default function Sections() {
  // About underline animation trigger
  const aboutRef = useRef(null)
  useEffect(() => {
    const el = aboutRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.classList.add('animate-pulse-underline')
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Filter logic
  const [activeCat, setActiveCat] = useState('All')
  const filtered = useMemo(() => {
    if (activeCat === 'All') return sampleProjects
    return sampleProjects.filter((p) => p.categories.includes(activeCat))
  }, [activeCat])

  // Simple fade-in on scroll for timelines
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100', 'translate-y-0')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main className="text-white">
      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">About Me</h2>
        <div ref={aboutRef} className="mx-auto mt-3 h-1 w-24 bg-gradient-to-r from-[#7c4dff] to-[#00e5ff] rounded-full" />
        <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-center">
          I’m Anushka — a motion designer and video editor crafting premium visuals for modern brands. I love blending branding, animation, and sound to create cinematic work that feels alive.
        </p>
      </section>

      {/* Education */}
      <section id="education" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Education</h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
          <div className="grid gap-10">
            {[{
              title: 'Bachelor of Design (B.Des) — Motion Graphics',
              place: 'National Institute of Design',
              dates: '2020 — 2024',
              points: ['Major in Motion Graphics and Film', 'Graduated with Honors']
            }, {
              title: 'Visual Communication',
              place: 'Creative Arts Academy',
              dates: '2018 — 2020',
              points: ['Focus on typography & brand systems']
            }].map((item, i) => (
              <div
                key={i}
                className={`relative md:grid md:grid-cols-2 ${i % 2 ? 'md:pl-12' : 'md:pr-12'}`}
              >
                <div className={`p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transform transition-all duration-700 opacity-0 translate-y-6`} data-reveal>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.place} • {item.dates}</p>
                  <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
                    {item.points.map((p, idx) => (<li key={idx}>{p}</li>))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works / Projects */}
      <section id="works" className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-extrabold">Selected Works</h2>
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`relative whitespace-nowrap text-sm px-4 py-2 rounded-full border border-white/10 transition ${
                  activeCat === c ? 'text-black' : 'text-gray-300 hover:text-white'
                }`}
                aria-pressed={activeCat === c}
              >
                {activeCat === c && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c4dff] to-[#00e5ff]" aria-hidden="true" />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <article key={p.id} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.categories.map((t) => (
                    <span key={t} className="relative text-xs px-2 py-1 rounded-full text-black">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c4dff] to-[#00e5ff] opacity-90" />
                      <span className="relative">{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Experience</h2>
        <div className="grid gap-4">
          {[
            {
              role: 'Motion Designer',
              company: 'Studio Nova',
              dates: '2024 — Present',
              blurb: 'Led motion packages for campaigns; streamlined edit pipeline.'
            },
            {
              role: 'Video Editor (Intern)',
              company: 'Creative Stack',
              dates: '2023 — 2024',
              blurb: 'Cut short-form reels hitting 1M+ views; optimized color grade presets.'
            }
          ].map((e, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 transform transition-all duration-700 opacity-0 translate-y-6" data-reveal>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h3 className="font-semibold">{e.role} • {e.company}</h3>
                <span className="text-sm text-gray-400">{e.dates}</span>
              </div>
              <p className="text-gray-300 mt-1">{e.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">Tools & Skills</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Tools</h3>
            <ul className="grid grid-cols-2 gap-2">
              {['Adobe Premiere Pro','Photoshop','Illustrator','Canva','VN Editor','After Effects','Maya'].map((t) => (
                <li key={t} className="group px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10">
                  <span className="sr-only">Tool:</span>
                  <span className="inline-block translate-y-0 group-hover:-translate-y-0.5 transition-transform">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Skills</h3>
            <ul className="grid grid-cols-2 gap-2">
              {['Motion Graphics','Video Editing','Brand Design','3D Texturing','Storyboarding','Color Grading','Collaboration'].map((s) => (
                <li key={s} className="group px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10">
                  <span className="sr-only">Skill:</span>
                  <span className="inline-block translate-y-0 group-hover:-translate-y-0.5 transition-transform">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">Contact</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <a href="mailto:anushka@example.com" className="inline-flex items-center gap-2 text-[#00e5ff] hover:underline">Email: anushka@example.com</a>
            <a href="https://linkedin.com/in/anushka" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#00e5ff] hover:underline">LinkedIn</a>
            <a href="/assets/resume/Anushka_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#00e5ff] hover:underline">Download Resume</a>
          </div>
          <form onSubmit={(e)=>{
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const name = fd.get('name')?.toString().trim()
            const email = fd.get('email')?.toString().trim()
            const message = fd.get('message')?.toString().trim()
            if(!name || !email || !message){
              alert('Please fill in all fields.')
              return
            }
            window.location.href = `mailto:anushka@example.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`
          }} className="grid gap-3">
            <input name="name" placeholder="Name" className="bg-black text-white border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
            <input name="email" type="email" placeholder="Email" className="bg-black text-white border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
            <textarea name="message" placeholder="Message" rows={5} className="bg-black text-white border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
            <button className="relative inline-flex justify-center items-center gap-2 text-sm font-semibold px-5 py-3 rounded-md text-black">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[#7c4dff] to-[#00e5ff]" />
              <span className="relative">Send</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
