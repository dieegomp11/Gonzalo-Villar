import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#08060C',
        profile: '#0C0A12',
        cream: '#f0ede8',
        gold: '#C9A84C',
        'murcia-red': '#9B1B30',
        midnight: '#0d0b1e',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      backgroundImage: {
        'stripe-dark': 'repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(201,168,76,0.04) 119px, rgba(201,168,76,0.04) 120px)',
      },
    },
  },
  plugins: [],
}

export default config
