'use client'

import { useEffect, useRef, useState } from 'react'

const GALLERY_ITEMS = [
  { label: 'AS Roma · Serie A',           aspect: 'aspect-[3/4]',    col: 'col-span-1' },
  { label: 'Europa League · Semifinal',   aspect: 'aspect-video',    col: 'col-span-2' },
  { label: 'Selección Española',          aspect: 'aspect-square',   col: 'col-span-1' },
  { label: 'Granada CF · LaLiga',        aspect: 'aspect-[3/4]',    col: 'col-span-1' },
  { label: 'Sub-21 · Europeo 2021',      aspect: 'aspect-square',   col: 'col-span-1' },
  { label: 'Elche CF · Regreso a casa',  aspect: 'aspect-video',    col: 'col-span-2' },
  { label: 'Celebración · Gol',          aspect: 'aspect-[3/4]',    col: 'col-span-1' },
  { label: 'Entrenamiento',              aspect: 'aspect-square',   col: 'col-span-1' },
]

export default function Galeria() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="galeria" className="relative bg-ink py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-8 h-px" style={{ background: 'var(--accent)' }} />
              <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/40 uppercase">07 · Galería</span>
            </div>
            <h2
              className="font-display leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', color: 'white' }}
            >
              El jugador
              <br />
              <span style={{ color: 'var(--accent)' }}>en imágenes</span>
            </h2>
          </div>
          <p className="font-body text-white/50 max-w-xs text-sm leading-relaxed md:text-right">
            Estilo editorial. Momentos reales dentro y fuera del campo. Formato tipo magazine deportivo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`img-placeholder rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group ${item.aspect} ${
                item.col === 'col-span-2' ? 'col-span-2' : 'col-span-1'
              }`}
              style={{
                minHeight: '160px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 z-10" />

              {/* Gold corner on hover */}
              <div
                className="absolute top-3 left-3 w-5 h-5 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                style={{ borderColor: 'var(--accent)' }}
              />
              <div
                className="absolute bottom-3 right-3 w-5 h-5 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                style={{ borderColor: 'var(--accent)' }}
              />

              {/* Label on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-20">
                <div className="glass rounded-xl px-3 py-2">
                  <span className="font-mono text-[0.55rem] text-white/70 tracking-widest uppercase">{item.label}</span>
                </div>
              </div>

              {/* Placeholder icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-20 z-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="font-mono text-[0.45rem] text-white/40 uppercase tracking-wider text-center px-4">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-14 flex items-center justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 glass rounded-full px-7 py-4 transition-all duration-300 hover:border-white/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            <span className="font-mono text-[0.62rem] tracking-[0.15em] text-white/60 uppercase group-hover:text-white/80 transition-colors">
              Más fotos en Instagram
            </span>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              className="text-white/30 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
