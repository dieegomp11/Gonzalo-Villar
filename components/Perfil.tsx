'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const DATA_PILLS = [
  { label: 'Nacimiento', val: '23 mar. 1998' },
  { label: 'Ciudad',     val: 'Murcia, España' },
  { label: 'Posición',   val: 'Mediocentro' },
  { label: 'Altura',     val: '1,81 m' },
  { label: 'Pie',        val: 'Diestro' },
  { label: 'Dorsal',     val: '6 · 8' },
]

export default function Perfil() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const [visible,  setVisible]  = useState(false)
  const [playing,  setPlaying]  = useState(false)
  const [showBtn,  setShowBtn]  = useState(true)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
      // Ocultar botón a los 2s si sigue reproduciendo
      setTimeout(() => setShowBtn(false), 2000)
    } else {
      v.pause()
      setPlaying(false)
      setShowBtn(true)
    }
  }, [])

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

  const revealX = (delay: string) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(40px)',
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  })

  return (
    <section
      ref={sectionRef}
      id="perfil"
      className="relative bg-profile overflow-hidden py-24 md:py-36 bg-stripe-dark"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-16 md:mb-24">

        {/* Label */}
        <div className="flex items-center gap-4 mb-12" style={reveal('0s')}>
          <span className="block w-8 h-px" style={{ background: 'var(--accent)' }} />
          <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/40 uppercase">01 · Perfil</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-start">

          {/* LEFT — texto */}
          <div>
            <div style={reveal('0.1s')}>
              <h2
                className="font-display leading-none mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 8rem)', color: 'white' }}
              >
                <span style={{ color: 'var(--accent)' }}>El Cerebro</span>
                <br />de Murcia
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5 mb-10" style={reveal('0.2s')}>
              {DATA_PILLS.map(p => (
                <div key={p.label} className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="font-mono text-[0.5rem] tracking-[0.15em] text-white/40 uppercase">{p.label}</span>
                  <span className="font-mono text-[0.62rem] tracking-wide font-medium" style={{ color: 'var(--accent)' }}>
                    {p.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-5 max-w-lg" style={reveal('0.3s')}>
              <p className="font-body text-white/65 leading-relaxed">
                Nacido en Murcia en 1998, Gonzalo descubrió el fútbol desde niño en la cantera del
                Real Murcia. Su inteligencia táctica y su visión de juego lo llevaron a formarse en el
                Elche CF y más tarde en la academia del Valencia CF, donde disputó la UEFA Youth League.
              </p>
              <p className="font-body text-white/65 leading-relaxed">
                Con apenas 22 años dio el salto a la <span className="text-white font-medium">AS Roma</span>,
                uno de los grandes de la Serie A, donde se convirtió en pieza habitual de un equipo que
                alcanzó las semifinales de Europa League. Estudioso, comprometido y con una personalidad
                tranquila dentro y fuera del campo.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4" style={reveal('0.4s')}>
              <div
                className="h-px flex-1 max-w-[60px]"
                style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
              />
              <span className="font-cormorant italic text-2xl" style={{ color: 'var(--accent)', opacity: 0.7 }}>
                Gonzalo Villar
              </span>
            </div>
          </div>

          {/* RIGHT — grid de fotos reales */}
          <div className="grid grid-cols-2 gap-3">

            {/* Roma — foto grande vertical */}
            <div
              className="relative rounded-3xl overflow-hidden aspect-[3/4] col-span-1"
              style={revealX('0.15s')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/villarroma.jpg"
                alt="Gonzalo Villar con la AS Roma"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,6,12,0.7), transparent)' }} />
              <div className="absolute bottom-3 left-4">
                <span className="font-mono text-[0.5rem] tracking-[0.15em] text-white/70 uppercase">AS Roma</span>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-3">

              {/* Selección */}
              <div
                className="relative rounded-3xl overflow-hidden aspect-square"
                style={revealX('0.25s')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/villarseleccion.jpg"
                  alt="Gonzalo Villar con la Selección Española"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(8,6,12,0.7), transparent)' }} />
                <div className="absolute bottom-2.5 left-3">
                  <span className="font-mono text-[0.48rem] tracking-[0.15em] text-white/70 uppercase">Selección</span>
                </div>
              </div>

              {/* Granada */}
              <div
                className="relative rounded-3xl overflow-hidden aspect-square"
                style={revealX('0.35s')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/villargranada.jpg"
                  alt="Gonzalo Villar con el Granada CF"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(8,6,12,0.7), transparent)' }} />
                <div className="absolute bottom-2.5 left-3">
                  <span className="font-mono text-[0.48rem] tracking-[0.15em] text-white/70 uppercase">Granada CF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video */}
      <div className="max-w-7xl mx-auto px-5 md:px-10" style={reveal('0.45s')}>
        <div
          className="relative rounded-3xl overflow-hidden aspect-video bg-black cursor-pointer group"
          onClick={togglePlay}
          onMouseEnter={() => setShowBtn(true)}
          onMouseLeave={() => { if (playing) setShowBtn(false) }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/video.mp4"
            playsInline
            preload="metadata"
            onEnded={() => { setPlaying(false); setShowBtn(true) }}
          />

          {/* Overlay oscuro al pausar */}
          <div
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'rgba(8,6,12,0.35)', opacity: playing ? 0 : 1 }}
          />

          {/* Botón play/pause central */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
            style={{ opacity: showBtn ? 1 : 0 }}
          >
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-200 group-active:scale-95"
              style={{
                background: 'rgba(8,6,12,0.55)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201,168,76,0.45)',
                boxShadow: '0 0 40px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {playing ? (
                /* Pause icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent)' }}>
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                /* Play icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent)', marginLeft: '3px' }}>
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
            </div>
          </div>

          {/* Badge marca */}
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <div className="glass rounded-full px-3 py-1.5 inline-flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full block"
                style={{
                  background: 'var(--accent)',
                  animation: playing ? 'accentPulse 2s ease-in-out infinite' : 'none',
                  opacity: playing ? 1 : 0.4,
                }}
              />
              <span className="font-mono text-[0.52rem] tracking-[0.15em] text-white/60 uppercase">
                {playing ? 'Reproduciendo' : 'Highlights'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
