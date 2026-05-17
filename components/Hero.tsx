'use client'

import { useEffect, useRef } from 'react'
import { asset } from '@/lib/asset'

const PARTICLES = [
  { size: 2,   top: '18%', left: '12%',  delay: '0s',    dur: '6s'  },
  { size: 1.5, top: '42%', left: '6%',   delay: '1.2s',  dur: '8s'  },
  { size: 3,   top: '72%', left: '18%',  delay: '0.5s',  dur: '7s'  },
  { size: 1.5, top: '25%', left: '38%',  delay: '2.1s',  dur: '9s'  },
  { size: 2,   top: '60%', left: '44%',  delay: '0.8s',  dur: '6.5s'},
  { size: 1,   top: '85%', left: '30%',  delay: '3s',    dur: '8.5s'},
  { size: 2.5, top: '10%', left: '55%',  delay: '1.7s',  dur: '7.5s'},
  { size: 1.5, top: '50%', left: '68%',  delay: '0.3s',  dur: '10s' },
  { size: 1,   top: '78%', left: '72%',  delay: '2.5s',  dur: '6s'  },
  { size: 2,   top: '35%', left: '82%',  delay: '1s',    dur: '9s'  },
]

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const colRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=70%',
        scrub: 1.4,
        onUpdate: self => {
          gsap.set(colRightRef.current, { y: -self.progress * 50 })
        },
      })
    }
    init()
    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) =>
        ScrollTrigger.getAll().forEach(t => t.kill())
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] bg-ink overflow-hidden"
    >
      {/* ── Fondo: aurora blobs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-12%] w-[72vw] h-[72vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.11) 0%, transparent 65%)',
            animation: 'auroraFloat 16s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[40%] left-[-5%] w-[40vw] h-[40vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(155,27,48,0.07) 0%, transparent 65%)',
            animation: 'auroraFloat3 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-8%] w-[55vw] h-[55vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(155,27,48,0.06) 0%, transparent 65%)',
            animation: 'auroraFloat2 20s ease-in-out infinite',
          }}
        />

        {/* Rayo de luz diagonal — barre la pantalla */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Rayo principal — ancho, suave */}
          <div
            className="absolute top-0 bottom-0 left-0"
            style={{
              width: '35%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.07) 40%, rgba(201,168,76,0.13) 50%, rgba(201,168,76,0.07) 60%, transparent 100%)',
              animation: 'lightSweep 7s cubic-bezier(0.4, 0, 0.6, 1) 1.5s infinite',
            }}
          />
          {/* Rayo secundario — fino y brillante */}
          <div
            className="absolute top-0 bottom-0 left-0"
            style={{
              width: '6%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.18) 50%, transparent 100%)',
              animation: 'lightSweep 7s cubic-bezier(0.4, 0, 0.6, 1) 1.7s infinite',
            }}
          />
        </div>

        {/* Grid de líneas finas */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="600" cy="400" r="130" stroke="white" strokeWidth="1" fill="none" />
          <line x1="600" y1="0" x2="600" y2="800" stroke="white" strokeWidth="1" />
          <ellipse cx="600" cy="400" rx="585" ry="385" stroke="white" strokeWidth="1" fill="none" />
          <line x1="0" y1="0" x2="1200" y2="800" stroke="white" strokeWidth="0.5" strokeDasharray="4 12" />
          <line x1="1200" y1="0" x2="0" y2="800" stroke="white" strokeWidth="0.5" strokeDasharray="4 12" />
        </svg>

        {/* Partículas flotantes */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              background: i % 3 === 0 ? 'rgba(155,27,48,0.5)' : 'rgba(201,168,76,0.45)',
              animation: `floatY ${p.dur} ease-in-out ${p.delay} infinite`,
              boxShadow: `0 0 ${p.size * 3}px ${i % 3 === 0 ? 'rgba(155,27,48,0.4)' : 'rgba(201,168,76,0.35)'}`,
            }}
          />
        ))}
      </div>

      {/* ── Número 6 — watermark ── */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(16rem, 40vw, 52rem)',
            WebkitTextStroke: '1px rgba(201,168,76,0.055)',
            color: 'transparent',
          }}
        >
          6
        </span>
      </div>

      {/* ── Foto del jugador — absolute ── */}
      <div
        ref={colRightRef}
        className="absolute bottom-0 right-0 md:right-[2%] z-10 pointer-events-none hero-enter-right"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="relative" style={{ height: 'clamp(600px, 96dvh, 1100px)' }}>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.2) 0%, transparent 70%)',
              filter: 'blur(28px)',
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset('/villarhero-cut.png')}
            alt="Gonzalo Villar"
            className="relative z-10 select-none"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(-12px 0 60px rgba(201,168,76,0.15))',
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* ── Contenido texto — izquierda ── */}
      <div className="relative z-20 min-h-[100dvh] max-w-7xl mx-auto px-5 md:px-10 flex items-center pt-24 pb-20 md:pt-0 md:pb-0">
        <div className="flex flex-col gap-6 md:gap-7 py-8 md:py-24 w-full md:max-w-[52%]">

          {/* Nombre */}
          <div className="hero-enter leading-none" style={{ animationDelay: '0.1s' }}>
            <div style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 700,
              fontSize: 'clamp(3.8rem, 9vw, 11rem)',
              color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 0.88,
            }}>
              GONZALO
            </div>
            <div style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(3.8rem, 9vw, 11rem)',
              color: 'white', letterSpacing: '0.02em', lineHeight: 0.88,
            }}>
              VILLAR
            </div>
          </div>

          {/* Quote */}
          <p
            className="hero-enter font-cormorant italic leading-snug max-w-[420px]"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
              color: 'rgba(255,255,255,0.55)',
              animationDelay: '0.22s',
            }}
          >
            "Talento nacido en Murcia, templado en Serie A,
            <br className="hidden md:block" /> moldeado para el fútbol de élite."
          </p>

          {/* Próximo partido */}
          <div className="hero-enter" style={{ animationDelay: '0.34s' }}>
            <div
              className="inline-block rounded-2xl px-4 py-3.5 max-w-[260px]"
              style={{
                background: 'rgba(13,11,30,0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(201,168,76,0.2)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Header tarjeta */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-1.5 h-1.5 rounded-full block flex-shrink-0"
                  style={{ background: 'var(--accent)', animation: 'accentPulse 2s ease-in-out infinite' }}
                />
                <span className="font-mono text-[0.52rem] tracking-[0.2em] text-white/40 uppercase">
                  Próximo partido · LaLiga EA Sports
                </span>
              </div>

              {/* Equipos */}
              <div className="flex items-center justify-between mb-4">

                {/* Girona */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                    style={{ background: '#000' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset('/girona.png')} alt="Girona FC" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-mono text-[0.48rem] text-white/50 tracking-wide uppercase">Girona FC</span>
                </div>

                {/* VS */}
                <div className="flex flex-col items-center gap-1 px-3 flex-shrink-0">
                  <span className="font-display text-xl leading-none" style={{ color: 'rgba(201,168,76,0.3)' }}>VS</span>
                </div>

                {/* Elche */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-10 h-10 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset('/elche.png')} alt="Elche CF" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-mono text-[0.48rem] tracking-wide uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Elche CF</span>
                </div>

              </div>

              {/* Separador */}
              <div className="h-px w-full mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Info partido */}
              <div className="flex items-center justify-between">
                {[
                  { icon: 'cal', txt: 'Sáb. 23 mayo' },
                  { icon: 'clk', txt: '21:00 h' },
                  { icon: 'pin', txt: 'Montilivi' },
                ].map(d => (
                  <div key={d.txt} className="flex items-center gap-1.5">
                    {d.icon === 'cal' && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/35 flex-shrink-0">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    )}
                    {d.icon === 'clk' && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/35 flex-shrink-0">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    )}
                    {d.icon === 'pin' && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/35 flex-shrink-0">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    )}
                    <span className="font-mono text-[0.52rem] text-white/50 tracking-wide">{d.txt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="hero-enter" style={{ animationDelay: '0.46s' }}>
            <a
              href="#perfil"
              onClick={e => {
                e.preventDefault()
                document.querySelector('#perfil')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="cta-wrap group inline-flex items-center gap-4"
            >
              <div
                className="w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{ borderColor: 'rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.08)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
              <div>
                <span className="font-display text-xl tracking-widest block leading-none" style={{ color: 'var(--accent)' }}>
                  Conoce mi historia
                </span>
                <span className="font-mono text-[0.52rem] tracking-[0.18em] text-white/35 uppercase">
                  Scroll para descubrir
                </span>
              </div>
            </a>
          </div>

          {/* Club actual */}
          <div className="hero-enter" style={{ animationDelay: '0.56s' }}>
            <div className="glass rounded-full px-4 py-2 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full block" style={{ background: 'var(--accent)' }} />
              <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-white/50">
                Elche CF · LaLiga EA Sports · 2026
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #08060C, transparent)' }}
      />
    </section>
  )
}
