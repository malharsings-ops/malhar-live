import Hero from '@/components/Hero'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Watch from '@/components/Watch'
import Releases from '@/components/Releases'
import Artist from '@/components/Artist'
import Calendar from '@/components/Calendar'
import Globe from '@/components/Globe'
import Journal from '@/components/Journal'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Watch />
      <Releases />
      <Artist />
      <Calendar
        id="shows"
        showsOnly
        eyebrow="Catch Malhar live"
        title="Where you can hear him next."
        lead="Upcoming shows. Come for an evening of original songs."
      />
      <Globe />
      <Journal />
      <Contact />
    </>
  )
}
