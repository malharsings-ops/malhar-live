import Hero from '@/components/Hero'
import FeaturedMusic from '@/components/FeaturedMusic'
import ServiceSelector from '@/components/ServiceSelector'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedMusic />
      <ServiceSelector />
      <Gallery />
      <Testimonials />
      <CTA />
    </div>
  )
}
