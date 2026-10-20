export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string[]
}

/** Add new journal entries at the top of this list. */
export const posts: Post[] = [
  {
    slug: 'welcome-to-the-journal',
    title: 'Welcome to the Malhar Live journal',
    date: '2026-10-20',
    excerpt:
      'A new home for stories from the stage: new songs, behind-the-scenes moments and performance updates.',
    body: [
      'This is the new home of Malhar Live. Alongside upcoming dates and new music, this journal will collect stories from the stage, notes on the songs, and moments from the places Malhar performs.',
      'If you are planning a wedding, a private celebration or an evening at your venue, check the calendar to see which dates are open and send an enquiry. Every booking starts with a conversation.',
      'More stories coming soon.',
    ],
  },
]

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
