'use client'

import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'

const CLUBS = [
  {
    id: 'elche-26',
    name: 'Elche CF',
    shortName: 'Elche',
    period: '2026 · Presente',
    league: 'LaLiga EA Sports',
    role: 'Centrocampista',
    accent: '#4A90A4',
    special: true,
    description: 'Regreso a casa. El club que creyó primero en él lo recibe de nuevo en Primera División.',
    photos: ['/VillarElche1.jpg', '/VillarElche2.jpg'],
    label: 'Casa',
  },
  {
    id: 'dinamo',
    name: 'Dinamo Zagreb',
    shortName: 'Zagreb',
    period: '2025–26',
    league: 'HNL · Europa League',
    role: 'Internacional',
    accent: '#1B4F9A',
    description: 'El club más grande de Croacia. Nueva aventura europea en la operación más cara del mercado.',
    photos: ['/VillarZagreb1.jpg', '/VillarZagreb2.jpg'],
  },
  {
    id: 'granada',
    name: 'Granada CF',
    shortName: 'Granada',
    period: '2023–2025',
    league: 'LaLiga · LaLiga Hypermotion',
    role: 'Referente del equipo',
    accent: '#C9372C',
    special: true,
    description: 'Dos temporadas donde se convirtió en el futbolista más regular y referente del equipo nazarí.',
    photos: ['/VillarGranada1.jpg', '/VillarGranada2.jpg'],
    label: 'Referente',
  },
  {
    id: 'getafe-23',
    name: 'Getafe CF',
    shortName: 'Getafe',
    period: '2022–23',
    league: 'LaLiga',
    role: 'Segunda cesión · Pieza en la salvación',
    accent: '#4A4A9A',
    description: 'Segunda cesión al conjunto azulón. Contribución clave en la lucha por la permanencia en Primera División.',
    photos: ['/VillarGetafe1-2023.jpg', '/VillarGetafe2-2023.jpg'],
  },
  {
    id: 'sampdoria',
    name: 'UC Sampdoria',
    shortName: 'Samp',
    period: '2022–23',
    league: 'Serie A',
    role: 'Cedido por Roma',
    accent: '#4A90D9',
    description: 'Regreso a Italia. Experiencia en la Serie A por segunda vez con el club genovés.',
    photos: ['/VillarSampdoria1.jpg', '/VillarSampdoria2.jpg'],
  },
  {
    id: 'getafe-22',
    name: 'Getafe CF',
    shortName: 'Getafe',
    period: '2022',
    league: 'LaLiga',
    role: 'Primera cesión',
    accent: '#3A3A8A',
    description: 'Primera cesión al Getafe CF. Rodaje en Primera División española y primer contacto con el fútbol español de élite.',
    photos: ['/VillarGetafe1-2022.jpg', '/VillarGetafe1-2022(1).jpg'],
  },
  {
    id: 'roma',
    name: 'AS Roma',
    shortName: 'Roma',
    period: '2020–2023',
    league: 'Serie A · Europa League',
    role: 'Etapa europea de primer nivel',
    accent: '#C9A84C',
    special: true,
    description: '47 partidos en la 20-21. Semifinalista de Europa League. El salto a la élite continental a los 22 años.',
    photos: ['/villarroma.jpg', '/VillarRoma2.jpg'],
    label: 'Élite europea',
  },
  {
    id: 'elche-18',
    name: 'Elche CF',
    shortName: 'Elche',
    period: '2018–2020',
    league: 'Segunda División',
    role: 'Debut y despegue profesional',
    accent: '#2D8B4E',
    description: 'Donde todo empezó. Debut profesional y consolidación que llamó la atención de la AS Roma.',
    photos: ['/VillarElche1-2019.jpg', '/VillarElche2-2019.jpg'],
  },
  {
    id: 'valencia',
    name: 'Valencia Mestalla',
    shortName: 'Valencia B',
    period: '2016–2018',
    league: 'Segunda División B',
    role: 'Formación de élite',
    accent: '#F5A623',
    description: 'Formación en una de las mejores academias de España. Disputó la UEFA Youth League.',
    photos: ['/VillarValencia1.jpg', '/VillarValencia2.jpg'],
  },
]

export default function Trayectoria() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef  = useRef<HTMLElement>(null)
  const stickyRef   = useRef<HTMLDivElement>(null)
  const activeIdxRef = useRef(0)

  useEffect(() => {
    let rafId: number
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      const idx = Math.min(CLUBS.length - 1, Math.floor(progress * CLUBS.length))
      if (idx !== activeIdxRef.current) {
        activeIdxRef.current = idx
        setActiveIdx(idx)
      }
    }
    const frame = () => { onScroll(); rafId = requestAnimationFrame(frame) }
    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const club = CLUBS[activeIdx]

  return (
    <section
      ref={sectionRef}
      id="trayectoria"
      style={{ height: `${CLUBS.length * 100}vh` }}
      className="relative"
    >
      <div ref={stickyRef} className="sticky top-0 min-h-[100dvh] bg-ink flex flex-col overflow-hidden">

        {/* ── Indicator bar ── */}
        <div className="absolute top-20 left-0 right-0 z-30 flex justify-center">
          <div className="glass rounded-full flex items-center gap-1.5 px-5 py-2.5 overflow-x-auto max-w-[90vw]">
            {CLUBS.map((c, i) => (
              <div key={c.id} className="flex items-center gap-1.5 flex-shrink-0">
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-400"
                  style={{ background: i === activeIdx ? c.accent : 'rgba(255,255,255,0.2)', transform: i === activeIdx ? 'scale(1.4)' : 'scale(1)' }}
                />
                <span
                  className="font-mono text-[0.38rem] md:text-[0.44rem] tracking-widest uppercase transition-all duration-300"
                  style={{ color: i === activeIdx ? 'white' : 'rgba(255,255,255,0.3)' }}
                >
                  {c.shortName}
                </span>
                {i < CLUBS.length - 1 && (
                  <span className="text-white/15 text-[0.4rem] hidden md:block">·</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Section label (desktop) ── */}
        <div className="absolute top-24 left-5 md:left-10 z-30 hidden md:block">
          <div className="flex items-center gap-3">
            <span className="block w-6 h-px" style={{ background: 'var(--accent)' }} />
            <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/40 uppercase">02 · Trayectoria</span>
          </div>
        </div>

        {/* ── Club panels ── */}
        {CLUBS.map((c, i) => (
          <div
            key={c.id}
            className="absolute inset-0 transition-opacity duration-600"
            style={{ opacity: i === activeIdx ? 1 : 0, pointerEvents: i === activeIdx ? 'auto' : 'none' }}
          >
            {/* ── Fondo dinámico ── */}

            {/* Orbe central */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${c.accent} 0%, transparent 70%)`, opacity: 0.07 }}
            />
            {/* Orbe top-right */}
            <div
              className="absolute top-[-10%] right-[-5%] w-[38vw] h-[38vw] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${c.accent} 0%, transparent 70%)`,
                opacity: 0.06,
                animation: 'auroraFloat 14s ease-in-out infinite',
              }}
            />
            {/* Orbe bottom-left */}
            <div
              className="absolute bottom-[-15%] left-[-5%] w-[30vw] h-[30vw] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${c.accent} 0%, transparent 70%)`,
                opacity: 0.05,
                animation: 'auroraFloat2 18s ease-in-out infinite',
              }}
            />

            {/* Nombre del club — watermark gigante */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
              <span
                className="font-display block whitespace-nowrap leading-none"
                style={{
                  fontSize: 'clamp(6rem, 18vw, 22rem)',
                  color: 'transparent',
                  WebkitTextStroke: `1px ${c.accent}18`,
                  letterSpacing: '0.04em',
                  paddingLeft: '2rem',
                  opacity: 0.9,
                }}
              >
                {c.name.toUpperCase()}
              </span>
            </div>

            {/* Rayo de luz lateral */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: '25%',
                  background: `linear-gradient(90deg, transparent 0%, ${c.accent}07 50%, transparent 100%)`,
                  animation: 'lightSweep 9s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite',
                }}
              />
            </div>

            {/* Línea vertical izquierda */}
            <div
              className="absolute top-0 bottom-0 left-0 w-px pointer-events-none"
              style={{ background: `linear-gradient(to bottom, transparent 0%, ${c.accent}40 40%, ${c.accent}40 60%, transparent 100%)` }}
            />

            {/* Índice — esquina inferior derecha */}
            <div className="absolute bottom-10 right-5 md:right-10 pointer-events-none select-none z-10">
              <span
                className="font-display leading-none"
                style={{ fontSize: 'clamp(4rem, 10vw, 12rem)', color: 'transparent', WebkitTextStroke: `1px rgba(255,255,255,0.06)` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 h-full items-center px-5 md:px-10 max-w-7xl mx-auto pt-36 md:pt-0">

              {/* Left — text */}
              <div className="flex flex-col gap-5">
                {c.special && (
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 self-start"
                    style={{ background: `${c.accent}22`, border: `1px solid ${c.accent}44` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full block" style={{ background: c.accent }} />
                    <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: c.accent }}>
                      {c.label}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/40 uppercase">{c.period}</span>
                    <span className="font-mono text-[0.55rem] text-white/25 uppercase">{c.league}</span>
                  </div>
                  <h3
                    className="font-display leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)', color: 'white' }}
                  >
                    {c.name}
                  </h3>
                  <p className="font-mono text-[0.65rem] tracking-[0.1em] mt-1" style={{ color: c.accent }}>
                    {c.role}
                  </p>
                </div>

                <p className="font-body text-white/55 leading-relaxed max-w-sm text-sm md:text-base">
                  {c.description}
                </p>

                {/* Club color accent bar */}
                <div className="h-px w-20 rounded-full" style={{ background: c.accent, opacity: 0.5 }} />
              </div>

              {/* Right — fotos reales */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 h-44 md:h-auto">
                {[0, 1].map(pi => (
                  <div
                    key={pi}
                    className={`relative rounded-2xl overflow-hidden bg-black ${pi === 0 ? 'md:aspect-[3/4]' : 'md:aspect-[3/4] self-end'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(c.photos[pi])}
                      alt={`${c.name} — foto ${pi + 1}`}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                    {/* Gradiente base con nombre de club */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, rgba(8,6,12,0.75), transparent)' }}
                    />
                    {pi === 0 && (
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="font-mono text-[0.48rem] tracking-[0.15em] uppercase"
                          style={{ color: c.accent }}
                        >
                          {c.period}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #08060C, transparent)' }}
        />
      </div>
    </section>
  )
}
