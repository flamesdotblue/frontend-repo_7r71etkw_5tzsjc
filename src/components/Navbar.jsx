import { useEffect, useState } from 'react'
import { Menu, X, Download } from 'lucide-react'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'works', label: 'Works' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Tools & Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    const handler = () => {
      window.requestAnimationFrame(onScroll)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/70 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
    }`}>
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between text-white">
        <button
          onClick={() => handleNavClick('home')}
          className="font-extrabold tracking-widest text-lg md:text-xl"
          aria-label="Go to top"
        >
          ANUSHKA
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                activeSection === link.id
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              <span>{link.label}</span>
              {activeSection === link.id && (
                <span
                  className="absolute inset-0 -z-0 rounded-md bg-gradient-to-br from-[#7c4dff] to-[#00e5ff] opacity-20"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/assets/resume/Anushka_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md text-black"
            aria-label="Open resume PDF"
          >
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[#7c4dff] to-[#00e5ff]" />
            <span className="relative flex items-center gap-2">
              <Download size={16} /> Resume
            </span>
          </a>

          <button
            className="md:hidden p-2 rounded-md border border-white/10"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-black/90 text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 grid gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-md ${
                  activeSection === link.id ? 'bg-white/5' : 'hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
