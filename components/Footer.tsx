'use client'

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

const NAV_FOOTER = [
  { label: 'Perfil',      href: '#perfil' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Stats',       href: '#stats' },
  { label: 'Momentos',    href: '#momentos' },
  { label: 'Selección',   href: '#seleccion' },
  { label: 'Highlights',  href: '#highlights' },
]

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="contacto" className="relative bg-ink border-t overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>

      {/* Aurora top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vw] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-start mb-16">

          {/* Left — brand */}
          <div>
            <div className="flex items-baseline gap-4 mb-6">
              <span
                className="font-cormorant font-700 leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--accent)' }}
              >
                Gonzalo
              </span>
              <span
                className="font-cormorant font-300 leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'white', opacity: 0.75 }}
              >
                Villar
              </span>
            </div>
            <p
              className="font-cormorant italic text-white/40 text-lg mb-8"
            >
              Orgullosamente murciano. Jugador de Europa.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-full w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — contact + nav */}
          <div className="space-y-10">
            {/* Contact */}
            <div>
              <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 uppercase mb-3">Contacto profesional</div>
              <a
                href="mailto:contacto@gonzalovillar.com"
                className="font-body text-white/60 hover:text-white transition-colors duration-300 text-sm"
              >
                contacto@gonzalovillar.com
              </a>
              <div className="font-mono text-[0.55rem] text-white/25 mt-1 tracking-wide">
                Agencias · Medios · Patrocinadores
              </div>
            </div>

            {/* Nav */}
            <nav>
              <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 uppercase mb-4">Navegación</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {NAV_FOOTER.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={e => handleClick(e, item.href)}
                    className="font-mono text-[0.6rem] text-white/40 hover:text-white/70 tracking-[0.1em] uppercase transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.55rem] text-white/25 tracking-wide">
              © 2026 · Gonzalo Villar del Fraile · Página oficial
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="font-mono text-[0.55rem] text-white/25 hover:text-white/50 tracking-wide transition-colors uppercase"
            >
              Privacidad
            </a>

            {/* Crafted with Fluentia */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.5rem] tracking-[0.15em] text-white/20 uppercase">Crafted with</span>
              <a
                href="https://fluentiatech.es"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-30 hover:opacity-70 transition-opacity duration-300"
                aria-label="Fluentia Tech"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/fluentia_clean.png"
                  alt="Fluentia"
                  style={{ height: '14px', width: 'auto' }}
                />
              </a>
              <span className="font-mono text-[0.5rem] tracking-[0.15em] text-white/20 uppercase">Precision</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
