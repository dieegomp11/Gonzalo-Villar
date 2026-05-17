import type { Metadata } from 'next'
import {
  Bebas_Neue,
  Outfit,
  JetBrains_Mono,
  Cormorant_Garamond,
} from 'next/font/google'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gonzalo Villar · Centrocampista Profesional',
  description:
    'Página oficial de Gonzalo Villar del Fraile — Centrocampista. AS Roma, Granada CF, Elche CF. Internacional absoluto con España.',
  keywords: ['Gonzalo Villar', 'futbolista', 'AS Roma', 'Granada CF', 'selección española', 'centrocampista'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebas.variable} ${outfit.variable} ${jetbrains.variable} ${cormorant.variable}`}>
      <body className="bg-ink text-white antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
