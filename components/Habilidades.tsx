'use client'

import { useEffect, useRef, useState } from 'react'

const SKILLS = [
  { name: 'Visión de juego',            value: 95, desc: 'Capacidad excepcional para leer el partido y encontrar líneas de pase imposibles.' },
  { name: 'Precisión en el pase',        value: 92, desc: 'Tanto a corta como a larga distancia, con ambas superficies.' },
  { name: 'Salida de balón bajo presión', value: 90, desc: 'Referente en inicio de jugada desde posiciones profundas.' },
  { name: 'Lectura táctica',             value: 94, desc: 'Inteligencia para ocupar espacios y controlar los ritmos.' },
  { name: 'Liderazgo',                   value: 88, desc: 'Referente en el vestuario; capitán moral en Granada CF.' },
  { name: 'Versatilidad',                value: 86, desc: 'Pivote único, doble pivote o mediapunta en sistemas diferentes.' },
]

export default function Habilidades() {
  const sectionRef = useRef<HTMLElement>(null)
  const [animate, setAnimate]   = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimate(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="habilidades" className="relative bg-profile py-24 md:py-36 overflow-hidden">

      {/* Background quote watermark */}
      <div
        className="absolute -bottom-4 left-0 right-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="font-cormorant italic text-right pr-10 opacity-[0.04]"
          style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'var(--accent)' }}
        >
          "Un jugador que piensa tres jugadas por delante"
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="block w-8 h-px" style={{ background: 'var(--accent)' }} />
          <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/40 uppercase">06 · Perfil de juego</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* LEFT — title + quote + photo */}
          <div>
            <h2
              className="font-display leading-none mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', color: 'white' }}
            >
              Inteligencia
              <br />
              <span style={{ color: 'var(--accent)' }}>táctica</span>
            </h2>

            <blockquote className="relative pl-5 border-l mb-10" style={{ borderColor: 'rgba(201,168,76,0.5)' }}>
              <p className="font-cormorant italic text-white/60 text-lg md:text-xl leading-relaxed">
                "Un jugador que piensa tres jugadas por delante — perfil compartido con los grandes
                organizadores del fútbol europeo moderno."
              </p>
            </blockquote>

            {/* Foto en partido */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/villartactica.png"
                alt="Gonzalo Villar — inteligencia táctica"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* RIGHT — skill bars */}
          <div className="space-y-8 md:space-y-10">
            {SKILLS.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-body text-white/80 text-sm font-medium">{skill.name}</span>
                  <span
                    className="font-mono text-[0.65rem] font-bold tracking-wide"
                    style={{ color: 'var(--accent)' }}
                  >
                    {skill.value}
                  </span>
                </div>

                {/* Bar track */}
                <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all"
                    style={{
                      width: animate ? `${skill.value}%` : '0%',
                      background: `linear-gradient(90deg, rgba(201,168,76,0.6), var(--accent))`,
                      transitionDuration: '1.4s',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>

                <p className="font-mono text-[0.55rem] text-white/30 mt-2 leading-relaxed tracking-wide">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom positions */}
        <div className="mt-16 pt-10 border-t border-white/8">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/40 uppercase">Posiciones habituales</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Mediocentro organizador (MC)', 'Pivote único (MCD)', 'Doble pivote', 'Mediapunta (CAM)'].map(pos => (
              <div
                key={pos}
                className="glass rounded-full px-4 py-2"
                style={{ borderColor: 'rgba(201,168,76,0.2)' }}
              >
                <span className="font-mono text-[0.6rem] tracking-[0.1em] text-white/60 uppercase">{pos}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
