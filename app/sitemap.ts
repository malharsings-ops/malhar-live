import type { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'

const base = 'https://malhar-live.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/journal`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...posts.map((p) => ({
      url: `${base}/journal/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    })),
  ]
}
