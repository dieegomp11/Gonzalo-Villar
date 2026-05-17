'use client'

import { useEffect, useRef, useState } from 'react'

const MOMENTOS = [
  {
    id: 'roma-fichaje',
    year: 'Enero 2020',
    title: 'La AS Roma llama a Gonzalo',
    body: 'La AS Roma ficha a Gonzalo por 4 millones de euros. Primer español en llegar al club romano desde las ligas de plata en esa época. Con apenas 21 años, da el salto a la Serie A.',
    accent: '#C9A84C',
    tag: 'Fichaje histórico',
    photo: '/villar1.jpg',
  },
  {
    id: 'mejor-temporada',
    year: 'Temporada 2020-21',
    title: '47 partidos. Europa lo mira',
    body: 'Su mejor temporada: 47 partidos con la Roma, semifinales de Europa League, presencia fija en el once de Paulo Fonseca. El fútbol europeo habla de él. Un campaña que marca un antes y un después.',
    accent: '#E8C96A',
    tag: 'Temporada estelar',
    photo: '/villar2.webp',
    objectPosition: '25% top',
  },
  {
    id: 'sub21-mvp',
    year: 'Mayo 2021',
    title: 'MVP Sub-21 ante Eslovenia',
    body: 'Marca un golazo ante Eslovenia con la selección sub-21 en el Europeo Sub-21 y es elegido MVP del partido por la UEFA. Una actuación que deja a todos con la boca abierta.',
    accent: '#E03A3C',
    tag: 'MVP UEFA',
    photo: '/villar3.jpg',
  },
  {
    id: 'debut-absoluta',
    year: 'Junio 2021',
    title: 'Debut con la Selección Absoluta',
    body: 'Debuta con la selección absoluta de España ante Lituania (4-0). Da la asistencia del primer gol a Brahim Díaz. Es el primer murciano en vestir la camiseta absoluta en 9 años. Un partido que rompe récords centenarios.',
    accent: '#E03A3C',
    tag: 'Internacional absoluto',
    photo: '/villarseleccion.jpg',
  },
  {
    id: 'granada-referente',
    year: '2023–2025',
    title: 'Referente del Granada CF',
    body: 'Llega al Granada CF y se convierte en su futbolista más regular y referente del equipo, liderando la clasificación del Trofeo Paco Pedrosa a la regularidad en la primera vuelta de 2024-25.',
    accent: '#C9372C',
    tag: 'Capitán moral',
    photo: '/villar5.avif',
  },
  {
    id: 'dinamo',
    year: 'Verano 2025',
    title: 'El Dinamo Zagreb apuesta fuerte',
    body: 'Ficha por el Dinamo Zagreb, el club más grande de Croacia, en la operación más cara del club en ese mercado. Nueva aventura europea. El fútbol croata y la Europa League esperan.',
    accent: '#1B4F9A',
    tag: 'Europa League',
    photo: '/villar6.jpg',
  },
  {
    id: 'elche-regreso',
    year: 'Enero 2026',
    title: 'Regreso a casa: Elche CF',
    body: 'Regresa al Elche CF, su casa, completando un círculo emotivo con el club que creyó en él desde el principio. LaLiga EA Sports con la camiseta franjiverde. Orgullo ilicitano.',
    accent: '#4A90A4',
    tag: 'Vuelta al origen',
    photo: '/villar7.jpg',
  },
]

export default function Momentos() {
  const sectionRef   = useRef<HTMLElement>(null)
  const momentIdxRef = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    let rafId: number
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      const idx = Math.min(MOMENTOS.length - 1, Math.floor(progress * MOMENTOS.length))
      if (idx !== momentIdxRef.current) {
        momentIdxRef.current = idx
        setActiveIdx(idx)
      }
    }
    const frame = () => { onScroll(); rafId = requestAnimationFrame(frame) }
    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const m = MOMENTOS[activeIdx]

  return (
    <section
      ref={sectionRef}
      id="momentos"
      style={{ height: `${MOMENTOS.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 min-h-[100dvh] bg-ink overflow-hidden flex flex-col md:flex-row">

        {/* ── LEFT: text panel ── */}
        <div className="w-full md:w-[52%] flex-shrink-0 flex flex-col justify-center px-5 md:pl-16 lg:pl-24 md:pr-8 pt-20 md:pt-0 pb-4 md:pb-0">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="block w-6 h-px" style={{ background: 'var(--accent)' }} />
            <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/40 uppercase">04 · Momentos Clave</span>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-8">
            {MOMENTOS.map((_, i) => (
              <div
                key={i}
                className="h-px transition-all duration-500 rounded-full"
                style={{
                  width: i === activeIdx ? '32px' : '12px',
                  background: i === activeIdx ? m.accent : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          {/* Content — absolute stacked panels */}
          <div className="relative min-h-[280px] md:min-h-[360px]">
            {MOMENTOS.map((mo, i) => (
              <div
                key={mo.id}
                className="absolute top-0 left-0 right-0 transition-all duration-700"
                style={{
                  opacity: i === activeIdx ? 1 : 0,
                  transform: i === activeIdx ? 'translateY(0)' : i < activeIdx ? 'translateY(-20px)' : 'translateY(20px)',
                  pointerEvents: i === activeIdx ? 'auto' : 'none',
                }}
              >
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
                  style={{ background: `${mo.accent}18`, border: `1px solid ${mo.accent}35` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full block" style={{ background: mo.accent }} />
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: mo.accent }}>
                    {mo.tag}
                  </span>
                </div>

                <div className="font-mono text-[0.65rem] tracking-[0.2em] text-white/40 uppercase mb-2">
                  {mo.year}
                </div>

                <h2
                  className="font-display leading-tight mb-6"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)', color: 'white' }}
                >
                  {mo.title}
                </h2>

                <p className="font-body text-white/60 leading-relaxed text-sm md:text-base max-w-md">
                  {mo.body}
                </p>
              </div>
            ))}
          </div>

          {/* Counter */}
          <div className="mt-8 flex items-baseline gap-2">
            <span
              className="font-display text-5xl md:text-6xl leading-none"
              style={{ color: m.accent, opacity: 0.25 }}
            >
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[0.6rem] text-white/25 uppercase tracking-widest">
              / {String(MOMENTOS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── RIGHT: photo panel ── */}
        <div className="flex-1 relative overflow-hidden min-h-[38dvh] md:min-h-0">
          {MOMENTOS.map((mo, i) => (
            <div
              key={mo.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === activeIdx ? 1 : 0 }}
            >
              {/* Accent gradient overlay */}
              <div
                className="absolute inset-0 opacity-20 z-10"
                style={{ background: `linear-gradient(135deg, ${mo.accent}40 0%, transparent 60%)` }}
              />

              {/* Foto real */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mo.photo}
                alt={mo.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: (mo as any).objectPosition ?? 'center top' }}
              />

              {/* Year overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
                <div className="glass rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                  <span className="block w-1.5 h-1.5 rounded-full" style={{ background: mo.accent }} />
                  <span className="font-mono text-[0.6rem] text-white/60 tracking-widest">{mo.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-30"
          style={{ background: 'linear-gradient(to top, #08060C, transparent)' }}
        />
      </div>
    </section>
  )
}
