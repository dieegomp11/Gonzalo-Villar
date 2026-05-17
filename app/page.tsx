import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Perfil from '@/components/Perfil'
import Trayectoria from '@/components/Trayectoria'
import Stats from '@/components/Stats'
import Momentos from '@/components/Momentos'
import Seleccion from '@/components/Seleccion'
import Habilidades from '@/components/Habilidades'
import Highlights from '@/components/Highlights'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="grain-overlay">
      <Navbar />
      <Hero />
      <Perfil />
      <Trayectoria />
      <Stats />
      <Momentos />
      <Seleccion />
      <Habilidades />
      <Highlights />
      <Footer />
    </main>
  )
}
