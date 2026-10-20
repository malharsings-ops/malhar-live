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
  /** Portrait crop (used in the Meet Malhar section). */
  heroImage: '/images/malhar-hero.jpg',
  /** Wide full-bleed hero photo. */
  heroWide: '/images/malhar-hero-wide.jpg',
  /** Wide photo for the /book page hero. */
  bookImage: '/images/malhar-book.jpg',
  spotifyArtist: '',
}

export type Track = { id: string; title: string }

export const tracks: Track[] = [
  { id: '4eyKW8RTPKcDHIfx3eZbKx', title: 'Original Song 01' },
  { id: '2SfnaN396Y8dv7jN522JVv', title: 'Original Song 02' },
  { id: '18CZPRe60TkvepSP68Uo7t', title: 'Original Song 03' },
]

export type Video = { title: string; youtubeId?: string }

export type FormatId = 'solo' | 'duo' | 'trio' | 'band'

export type Format = {
  id: FormatId
  number: string
  name: string
  /** Short label for the selector tile. */
  who: string
  headline: string
  line: string
  tagline: string
  hours: string
  lineup: string[]
  /** True for the bespoke option: shown as "enquire" rather than a fixed format. */
  custom?: boolean
  videos: Video[]
  testimonials: Video[]
}

/** Replace `youtubeId` with the id from a YouTube link (youtube.com/watch?v=THIS_PART). No pricing is shown anywhere. */
export const formats: Format[] = [
  {
    id: 'solo',
    number: '01',
    name: 'Solo',
    who: 'Singer cum guitarist',
    headline: 'Just a voice and a guitar.',
    line: 'Singer cum guitarist',
    tagline: 'An intimate, unplugged evening with a light setup. Malhar sings and plays, and the room does the rest.',
    hours: '2–3 hours',
    lineup: ['Vocals', 'Acoustic guitar'],
    videos: [
      { title: 'Solo — Live Performance 1' },
      { title: 'Solo — Live Performance 2' },
      { title: 'Solo — Live Performance 3' },
    ],
    testimonials: [
      { title: 'Client story 1 · Solo' },
      { title: 'Client story 2 · Solo' },
      { title: 'Client story 3 · Solo' },
    ],
  },
  {
    id: 'duo',
    number: '02',
    name: 'Duo',
    who: 'Singer, guitarist & keyboard',
    headline: 'Two musicians, a fuller sound.',
    line: 'Singer-guitarist with keyboard',
    tagline: 'Keys add warmth and depth under the vocals, for longer, livelier evenings.',
    hours: '3–4 hours',
    lineup: ['Vocals', 'Acoustic guitar', 'Keyboard'],
    videos: [
      { title: 'Duo — Live Performance 1' },
      { title: 'Duo — Live Performance 2' },
      { title: 'Duo — Live Performance 3' },
    ],
    testimonials: [
      { title: 'Client story 1 · Duo' },
      { title: 'Client story 2 · Duo' },
      { title: 'Client story 3 · Duo' },
    ],
  },
  {
    id: 'trio',
    number: '03',
    name: 'Trio',
    who: 'Adds drums',
    headline: 'The band experience.',
    line: 'Singer-guitarist, keyboard and drums',
    tagline: 'Drums bring the energy up. A complete live sound for stages, celebrations and big nights.',
    hours: '4–5 hours',
    lineup: ['Vocals', 'Acoustic guitar', 'Keyboard', 'Drums'],
    videos: [
      { title: 'Trio — Live Performance 1' },
      { title: 'Trio — Live Performance 2' },
      { title: 'Trio — Live Performance 3' },
    ],
    testimonials: [
      { title: 'Client story 1 · Trio' },
      { title: 'Client story 2 · Trio' },
      { title: 'Client story 3 · Trio' },
    ],
  },
  {
    id: 'band',
    number: '04',
    name: 'Bigger Band',
    who: 'Enquire for a bigger band',
    headline: 'Something bigger? Let us build it.',
    line: 'Custom lineup',
    tagline: 'Festivals, weddings and large stages. Tell us the occasion and we will shape a lineup around it.',
    hours: 'Planned with you',
    lineup: ['Custom lineup', 'Added instruments', 'Sound planning'],
    custom: true,
    videos: [
      { title: 'Full band — Live Performance 1' },
      { title: 'Full band — Live Performance 2' },
      { title: 'Full band — Live Performance 3' },
    ],
    testimonials: [
      { title: 'Client story 1 · Band' },
      { title: 'Client story 2 · Band' },
      { title: 'Client story 3 · Band' },
    ],
  },
]

export type Show = { date: string; venue: string; city: string }

const SAMPLE_VENUES: [string, string][] = [
  ['The Acoustic Room (sample)', 'Pune'],
  ['Lakeside Terrace (sample)', 'Lonavala'],
  ['Sunset Deck (sample)', 'Mumbai'],
  ['The Garden Courtyard (sample)', 'Pune'],
  ['Hilltop Lounge (sample)', 'Mahabaleshwar'],
  ['Heritage Haveli (sample)', 'Udaipur'],
]

/**
 * Placeholder "catch us live" dates: the next six Saturdays with sample venues.
 * Replace with real dates by filling `liveShows` below; while it is empty these samples appear.
 */
export const liveShows: Show[] = []

export function sampleShows(from: Date): Show[] {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7))
  return SAMPLE_VENUES.map(([venue, city], i) => {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i * 7)
    const date = `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`
    return { date, venue, city }
  })
}

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
  { name: 'Delhi', country: 'India', lat: 28.6139, lng: 77.209 },
  { name: 'Jim Corbett', country: 'India', lat: 29.5300, lng: 78.7747 },
  { name: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lng: 47.9774 },
  { name: 'Accra', country: 'Ghana · West Africa', lat: 5.6037, lng: -0.187 },
]

export type Booking = { date: string; city: string }

/** Add confirmed dates as { date: '2026-12-12', city: 'Pune' }. They show on the diary and lock on the calendar. */
export const bookings: Booking[] = []

export const stats = [
  { value: '2250+', label: 'Live shows', note: 'Performed to date' },
  { value: '3', label: 'Countries', note: 'India, Kuwait & Ghana' },
  { value: 'Original', label: 'Songs', note: 'Written & performed live' },
]
