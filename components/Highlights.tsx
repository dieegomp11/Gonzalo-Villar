'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { asset } from '@/lib/asset'

const VIDEOS = [
  { src: '/golgranada.mp4',  label: 'Gol con el Granada CF',        tag: 'LaLiga'     },
  { src: '/golgranada2.mp4', label: 'Gol con el Granada CF',        tag: 'LaLiga'     },
  { src: '/roma.mp4',        label: 'Calidad con AS Roma',          tag: 'Serie A'    },
  { src: '/jugadas.mp4',     label: 'Mejores jugadas profesionales', tag: 'Highlights' },
]

function VideoTile({ src, label, tag, visible, delay, isActive, onPlay }: {
  src: string; label: string; tag: string; visible: boolean; delay: string
  isActive: boolean; onPlay: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasFile, setHasFile] = useState(false)
  const [showBtn, setShowBtn] = useState(true)

  useEffect(() => {
    fetch(asset(src), { method: 'HEAD' })
      .then(r => { if (r.ok) setHasFile(true) })
      .catch(() => {})
  }, [src])

  // Cuando otro tile se activa, pausar este
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (!isActive && !v.paused) {
      v.pause()
      setShowBtn(true)
    }
  }, [isActive])

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v || !hasFile) return
    if (v.paused) {
      onPlay()           // notifica al padre: este es el activo
      v.play()
      setTimeout(() => setShowBtn(false), 1800)
    } else {
      v.pause()
      onPlay()           // sigue siendo el activo pero pausado — ok
      setShowBtn(true)
    }
  }, [hasFile, onPlay])

  const playing = isActive && !(videoRef.current?.paused ?? true)

  return (
    <div
      className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0"
      style={{
        aspectRatio: '9/16',
        background: 'linear-gradient(160deg, #141020 0%, #0c0a16 100%)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}`,
      }}
      onClick={toggle}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => { if (isActive && videoRef.current && !videoRef.current.paused) setShowBtn(false) }}
    >
      {hasFile && (
        <video
          ref={videoRef}
          src={asset(src)}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          preload="metadata"
          onEnded={() => setShowBtn(true)}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'rgba(8,6,12,0.45)', opacity: (isActive && !showBtn) ? 0 : 1 }}
      />

      {/* Placeholder */}
      {!hasFile && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ border: '1px dashed rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'rgba(201,168,76,0.35)' }}>
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <span className="font-mono text-[0.48rem] text-white/25 uppercase tracking-widest text-center px-4">
            Vídeo próximamente
          </span>
        </div>
      )}

      {/* Botón play/pause */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: showBtn ? 1 : 0 }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(8,6,12,0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(201,168,76,0.4)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {(isActive && videoRef.current && !videoRef.current.paused) ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent)' }}>
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent)', marginLeft: '2px' }}>
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </div>
      </div>

      {/* Etiquetas */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3.5 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,6,12,0.9) 0%, transparent 100%)' }}
      >
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 mb-1.5"
          style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          <span className="font-mono text-[0.44rem] tracking-[0.12em] uppercase" style={{ color: 'var(--accent)' }}>
            {tag}
          </span>
        </div>
        <p className="font-mono text-[0.5rem] text-white/65 leading-snug tracking-wide">{label}</p>
      </div>

      {/* Borde hover */}
      <div
        className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: '1px solid rgba(201,168,76,0.3)' }}
      />
    </div>
  )
}

export default function Highlights() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [visible,   setVisible]   = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="highlights" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-8 h-px" style={{ background: 'var(--accent)' }} />
              <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/40 uppercase">08 · Highlights</span>
            </div>
            <h2 className="font-display leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', color: 'white' }}>
              Los mejores<br /><span style={{ color: 'var(--accent)' }}>momentos</span>
            </h2>
          </div>
          <p className="font-body text-white/45 max-w-xs text-sm leading-relaxed md:text-right">
            Goles, asistencias y jugadas destacadas a lo largo de su carrera profesional.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {VIDEOS.map((v, i) => (
            <VideoTile
              key={v.src}
              {...v}
              visible={visible}
              delay={`${i * 0.08}s`}
              isActive={activeIdx === i}
              onPlay={() => setActiveIdx(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
