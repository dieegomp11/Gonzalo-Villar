'use client'

import { useEffect, useRef, useState } from 'react'

const COUNTERS = [
  { raw: '+250', num: 250,  suffix: '+', label: 'Partidos profesionales', decimals: 0 },
  { raw: '47',   num: 47,   suffix: '',  label: 'Partidos temporada Roma 20-21', decimals: 0 },
  { raw: '6+',   num: 6,    suffix: '+', label: 'Goles en Primera División', decimals: 0 },
  { raw: '6+',   num: 6,    suffix: '+', label: 'Asistencias oficiales', decimals: 0 },
  { raw: '10',   num: 10,   suffix: '',  label: 'Partidos Sub-21 española', decimals: 0 },
  { raw: '1',    num: 1,    suffix: '',  label: 'Debut absoluto con España', decimals: 0 },
]

const SEASON_STATS = [
  { season: '2024-25', club: 'Granada CF',          pj: 37, goles: 2, asist: 1 },
  { season: '2023-24', club: 'Granada CF',          pj: 35, goles: 1, asist: 3 },
  { season: '2022-23', club: 'Sampdoria / Getafe',  pj: 31, goles: 0, asist: 0 },
  { season: '2021-22', club: 'Roma / Getafe',        pj: 16, goles: 0, asist: 1 },
  { season: '2020-21', club: 'AS Roma',              pj: 47, goles: 0, asist: 3, highlight: true },
  { season: '2019-20', club: 'Roma / Elche',         pj: 31, goles: 1, asist: 0 },
]

function Counter({ num, suffix, label, decimals, active }: {
  num: number; suffix: string; label: string; decimals: number; active: boolean
}) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number>()
  const startRef = useRef<number>()

  useEffect(() => {
    if (!active) return
    const duration = 1800
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplay(parseFloat((ease * num).toFixed(decimals)))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active, num, decimals])

  return (
    <div className="group">
      <div
        className="font-display leading-none block"
        style={{ fontSize: 'clamp(3rem, 5vw, 6rem)', color: 'var(--accent)' }}
      >
        {display.toFixed(decimals)}{suffix}
      </div>
      <div className="font-mono text-[0.58rem] tracking-wide uppercase mt-2 leading-tight max-w-[140px]" style={{ color: 'rgba(8,6,12,0.5)' }}>
        {label}
      </div>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="relative bg-cream py-24 md:py-36 overflow-hidden">

      {/* Decorative text watermark */}
      <div
        className="absolute -top-8 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display whitespace-nowrap opacity-[0.04]"
          style={{ fontSize: 'clamp(5rem, 15vw, 16rem)', color: '#08060C' }}
        >
          ESTADÍSTICAS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="block w-8 h-px bg-ink/30" />
          <span className="font-mono text-[0.6rem] tracking-[0.25em] text-ink/40 uppercase">03 · Estadísticas</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-20">

          {/* LEFT — counters + photo */}
          <div>
            <h2
              className="font-display leading-none mb-12"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', color: '#08060C' }}
            >
              Los números
              <br />
              <span style={{ color: 'var(--murcia)' }}>hablan solos</span>
            </h2>

            <div className="grid grid-cols-3 gap-x-6 gap-y-10 mb-12">
              {COUNTERS.map((c, i) => (
                <Counter key={i} {...c} active={active} />
              ))}
            </div>

            {/* Fotos B&W */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/villarstats_bw.jpg"
                  alt="Gonzalo Villar"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square self-end">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/villarstats2_bw.jpg"
                  alt="Gonzalo Villar entrenamiento"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — season table */}
          <div>
            <h3
              className="font-body font-medium text-ink/70 mb-8 text-sm uppercase tracking-widest"
            >
              Estadísticas por temporada
            </h3>

            <div className="space-y-0 divide-y divide-ink/10">
              {SEASON_STATS.map((s, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 py-4 items-center transition-all duration-300 ${
                    s.highlight ? 'bg-ink/5 -mx-4 px-4 rounded-xl' : ''
                  }`}
                >
                  <div>
                    {s.highlight && (
                      <span
                        className="inline-block font-mono text-[0.45rem] tracking-[0.15em] uppercase rounded-full px-2 py-0.5 mb-1"
                        style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--accent)' }}
                      >
                        Mejor temporada
                      </span>
                    )}
                    <div className="font-mono text-[0.65rem] text-ink/80 font-medium">{s.season}</div>
                    <div className="font-mono text-[0.55rem] text-ink/40 tracking-wide">{s.club}</div>
                  </div>
                  {[
                    { val: s.pj,    lbl: 'PJ' },
                    { val: s.goles, lbl: 'G' },
                    { val: s.asist, lbl: 'A' },
                  ].map(d => (
                    <div key={d.lbl} className="text-center">
                      <div
                        className="font-display text-xl leading-none"
                        style={{ color: s.highlight ? 'var(--accent)' : '#08060C' }}
                      >
                        {d.val}
                      </div>
                      <div className="font-mono text-[0.5rem] text-ink/30 uppercase">{d.lbl}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Notable metric */}
            <div
              className="mt-10 rounded-2xl p-6"
              style={{ background: '#08060C', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/40 uppercase mb-2">
                    Copa UEFA · Europa League 2021
                  </div>
                  <div className="font-display text-2xl text-white">Semifinalista</div>
                  <div className="font-mono text-[0.6rem] mt-1" style={{ color: 'var(--accent)' }}>
                    Con AS Roma · Temporada 2020-21
                  </div>
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
