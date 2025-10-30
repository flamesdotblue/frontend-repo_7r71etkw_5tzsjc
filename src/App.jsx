import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sections from './components/Sections'
import Footer from './components/Footer'

function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    let ticking = false
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { threshold: [0.25, 0.6, 0.9] }
    )
    sections.forEach((s) => io.observe(s))

    const onHashLinkClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    document.addEventListener('click', onHashLinkClick)
    return () => {
      io.disconnect()
      document.removeEventListener('click', onHashLinkClick)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30 selection:text-white">
      <GradientBackground />
      <Navbar activeSection={active} />
      <Hero />
      <Sections />
      <Footer />
    </div>
  )
}

function GradientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-20" style={{background: 'radial-gradient(closest-side, rgba(0,229,255,0.25), transparent 70%)'}} />
      <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full opacity-20" style={{background: 'radial-gradient(closest-side, rgba(124,77,255,0.25), transparent 70%)'}} />
    </div>
  )
}

export default App
