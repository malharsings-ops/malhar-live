/**
 * Single place to edit all site content.
 * Anything left empty ('' or []) is hidden or shown as "coming soon" automatically.
 */

export const site = {
  name: 'Malhar Live',
  artist: 'Malhar Divekar',
  city: 'Pune',
  email: 'malharsings@gmail.com',
  instagram: 'https://www.instagram.com/malharsings',
  instagramHandle: '@malharsings',
  /** Add a number like '919876543210' to show a WhatsApp button. */
  whatsapp: '',
  /** Add a path like '/images/malhar-hero.jpg' (file in /public) to replace the hero artwork. */
  heroImage: '',
  spotifyArtist: '',
}

export type Track = { id: string; title: string }

export const tracks: Track[] = [
  { id: '4eyKW8RTPKcDHIfx3eZbKx', title: 'Original Song 01' },
  { id: '2SfnaN396Y8dv7jN522JVv', title: 'Original Song 02' },
  { id: '18CZPRe60TkvepSP68Uo7t', title: 'Original Song 03' },
]

export type Video = { title: string; youtubeId?: string }

export type Format = {
  id: 'solo' | 'duo' | 'trio'
  number: string
  name: string
  headline: string
  line: string
  tagline: string
  hours: string
  price: string
  videos: Video[]
}

export const formats: Format[] = [
  {
    id: 'solo',
    number: '01',
    name: 'Solo',
    headline: 'Just a voice and a guitar.',
    line: 'Voice + acoustic guitar',
    tagline: 'An intimate, unplugged evening with a light setup and no tech crew.',
    hours: '2–3 hours',
    price: 'From ₹15,000',
    videos: [
      { title: 'Solo — Live Performance 1' },
      { title: 'Solo — Live Performance 2' },
      { title: 'Solo — Live Performance 3' },
    ],
  },
  {
    id: 'duo',
    number: '02',
    name: 'Duo',
    headline: 'Two voices, a fuller sound.',
    line: 'Singer + musician',
    tagline: 'Harmonies and a richer arrangement for longer, livelier evenings.',
    hours: '3–4 hours',
    price: '₹25,000 – ₹35,000',
    videos: [
      { title: 'Duo — Live Performance 1' },
      { title: 'Duo — Live Performance 2' },
      { title: 'Duo — Live Performance 3' },
    ],
  },
  {
    id: 'trio',
    number: '03',
    name: 'Trio',
    headline: 'The full band experience.',
    line: 'Drums, bass & harmony',
    tagline: 'A complete live band sound for stages, celebrations and big nights.',
    hours: '4–5 hours',
    price: 'Custom quote',
    videos: [
      { title: 'Trio — Live Performance 1' },
      { title: 'Trio — Live Performance 2' },
      { title: 'Trio — Live Performance 3' },
    ],
  },
]

export type Photo = { src?: string; alt: string }

/** Replace with real photos: { src: '/images/photo-01.jpg', alt: 'Malhar live at …' } */
export const gallery: Photo[] = [
  { alt: 'Performance photo 1' },
  { alt: 'Performance photo 2' },
  { alt: 'Performance photo 3' },
  { alt: 'Performance photo 4' },
  { alt: 'Performance photo 5' },
  { alt: 'Performance photo 6' },
  { alt: 'Performance photo 7' },
]

export type Destination = { name: string; country: string; lat: number; lng: number; home?: boolean }

export const destinations: Destination[] = [
  { name: 'Pune', country: 'India', lat: 18.5204, lng: 73.8567, home: true },
  { name: 'Mumbai', country: 'India', lat: 19.076, lng: 72.8777 },
  { name: 'Lonavala', country: 'India', lat: 18.7546, lng: 73.4062 },
  { name: 'Mahabaleshwar', country: 'India', lat: 17.9237, lng: 73.6586 },
  { name: 'Nashik', country: 'India', lat: 19.9975, lng: 73.7898 },
  { name: 'Goa', country: 'India', lat: 15.2993, lng: 74.124 },
  { name: 'Bengaluru', country: 'India', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', country: 'India', lat: 17.385, lng: 78.4867 },
  { name: 'Ahmedabad', country: 'India', lat: 23.0225, lng: 72.5714 },
  { name: 'Udaipur', country: 'India', lat: 24.5854, lng: 73.7125 },
  { name: 'Jaipur', country: 'India', lat: 26.9124, lng: 75.7873 },
  { name: 'Delhi', country: 'India', lat: 28.6139, lng: 77.209 },
]

export type Booking = { date: string; city: string }

/** Add confirmed dates as { date: '2026-12-12', city: 'Pune' }. They show on the diary and lock on the calendar. */
export const bookings: Booking[] = []

export const stats = [
  { value: '3', label: 'Performance formats', note: 'Solo, Duo & Trio' },
  { value: 'Pune', label: 'Home base', note: 'Available across India' },
  { value: 'Original', label: 'Songs', note: 'Written & performed live' },
]
