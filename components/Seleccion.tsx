'use client'

import { useEffect, useRef, useState } from 'react'

const SELECION_DATA = [
  { team: 'España Absoluta', partidos: 1,  goles: 0,  asist: 1, period: '2021' },
  { team: 'España Sub-21',   partidos: 10, goles: 1,  asist: 0, period: '2019-2021' },
  { team: 'España Sub-19',   partidos: 2,  goles: 0,  asist: 0, period: '2016' },
]

export default function Seleccion() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const reveal = (delay: string) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  })

  return (
    <section ref={sectionRef} id="seleccion" className="relative bg-ink py-24 md:py-36 overflow-hidden">

      {/* Background flag-inspired gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, #E03A3C 33%, #F5A623 33% 66%, #E03A3C 66%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #E03A3C 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="flex items-center gap-4 mb-14" style={reveal('0s')}>
          <span className="block w-8 h-px" style={{ background: '#E03A3C' }} />
          <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/40 uppercase">05 · Selección española</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div style={reveal('0.1s')}>
            <div className="flex items-center gap-3 mb-6">
              {/* Spain flag colors */}
              <div className="flex gap-0.5">
                <span className="block w-2 h-7 rounded-l-sm" style={{ background: '#E03A3C' }} />
                <span className="block w-2 h-7" style={{ background: '#F5A623' }} />
                <span className="block w-2 h-7 rounded-r-sm" style={{ background: '#E03A3C' }} />
              </div>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/50 uppercase">Internacional Absoluto</span>
            </div>

            <h2
              className="font-display leading-none mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', color: 'white' }}
            >
              La Roja
              <br />
              <span style={{ color: '#E03A3C' }}>le espera</span>
            </h2>

            <blockquote className="relative pl-5 border-l-2 mb-8" style={{ borderColor: '#E03A3C' }}>
              <p className="font-cormorant italic text-white/70 text-base md:text-lg leading-relaxed">
                "Gonzalo Villar forma parte de una generación dorada del fútbol español. Su debut
                absoluto ante Lituania (4-0) quedará grabado en los libros de historia: asistió en el
                primer gol y fue uno de los 11 debutantes de un partido que rompió un récord de más
                de un siglo."
              </p>
            </blockquote>

            <div className="flex items-center gap-3">
              <span
                className="font-mono text-[0.6rem] tracking-[0.15em] uppercase"
                style={{ color: '#E03A3C' }}
              >
                8 de junio de 2021
              </span>
              <span className="font-mono text-[0.55rem] text-white/30">· España 4-0 Lituania</span>
            </div>
          </div>

          <div className="space-y-4" style={reveal('0.2s')}>

            {/* Foto Selección */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/VillarSeleccion2.jpg"
                alt="Gonzalo Villar con la Selección Española Sub-21"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,6,12,0.7), transparent)' }}
              />
              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[0.52rem] tracking-[0.15em] text-white/70 uppercase">
                  UEFA Under-21 · España
                </span>
              </div>
            </div>

            {/* Stats table */}
            <div className="divide-y divide-white/8">
              {SELECION_DATA.map((s, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto_auto_auto] gap-6 py-4 items-center ${
                    i === 0 ? 'border-t border-white/8' : ''
                  }`}
                >
                  <div>
                    <div
                      className="font-mono text-[0.65rem] font-medium"
                      style={{ color: i === 0 ? '#E03A3C' : 'rgba(255,255,255,0.7)' }}
                    >
                      {s.team}
                    </div>
                    <div className="font-mono text-[0.5rem] text-white/30 tracking-wide">{s.period}</div>
                  </div>
                  {[
                    { val: s.partidos, lbl: 'PJ' },
                    { val: s.goles,    lbl: 'G' },
                    { val: s.asist,    lbl: 'A' },
                  ].map(d => (
                    <div key={d.lbl} className="text-center">
                      <div
                        className="font-display text-2xl leading-none"
                        style={{ color: i === 0 ? '#E03A3C' : 'rgba(255,255,255,0.6)' }}
                      >
                        {d.val}
                      </div>
                      <div className="font-mono text-[0.48rem] text-white/30 uppercase">{d.lbl}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Highlight fact */}
            <div
              className="rounded-2xl p-5 mt-6"
              style={{ background: 'rgba(224,58,60,0.08)', border: '1px solid rgba(224,58,60,0.2)' }}
            >
              <div className="font-mono text-[0.55rem] tracking-[0.15em] text-white/40 uppercase mb-1">Dato histórico</div>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                Primer murciano en vestir la camiseta absoluta de España en <span className="text-white font-medium">9 años</span>.
                Uno de los 11 debutantes de un partido que rompió un récord de más de un siglo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
