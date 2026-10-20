import type { Metadata } from 'next'
import Booking from '@/components/Booking'

export const metadata: Metadata = {
  title: 'Book Malhar Live | Solo, Duo, Trio & Band',
  description:
    'Choose your evening with Malhar Live: Solo singer-guitarist, Duo with keyboard, Trio with drums, or a bigger band. Watch live videos, listen, check dates and enquire.',
}

export default function BookPage() {
  return <Booking />
}
