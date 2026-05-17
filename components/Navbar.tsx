'use client'

import { useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Perfil',      href: '#perfil' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Stats',       href: '#stats' },
  { label: 'Momentos',    href: '#momentos' },
  { label: 'Highlights',  href: '#highlights' },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.querySelector(n.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 nav-animate transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-5 md:mx-10 rounded-2xl transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3 group"
          >
            <span
              className="font-display text-xl tracking-widest leading-none"
              style={{ color: 'var(--accent)' }}
            >
              GV
            </span>
            <span className="hidden sm:block font-mono text-[0.6rem] text-white/40 tracking-[0.2em] uppercase">
              Gonzalo Villar
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => handleClick(e, item.href)}
                className={`px-4 py-1.5 rounded-full font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-300 ${
                  active === item.href
                    ? 'bg-white/8 border border-white/12 text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile dots */}
          <div className="flex md:hidden items-center gap-2.5">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => handleClick(e, item.href)}
                className="block transition-all duration-300"
              >
                <span
                  className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    active === item.href
                      ? 'scale-125'
                      : 'bg-white/25 hover:bg-white/50'
                  }`}
                  style={active === item.href ? { background: 'var(--accent)' } : {}}
                />
              </a>
            ))}
          </div>

          {/* Contact CTA */}
          <a
            href="#contacto"
            onClick={e => handleClick(e, '#contacto')}
            className="hidden lg:flex items-center gap-2 cta-wrap text-white/60 hover:text-white transition-colors duration-300"
          >
            <span className="cta-line" />
            <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase">Contacto</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
