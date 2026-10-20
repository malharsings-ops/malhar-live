import type { Metadata } from 'next'
import { posts, formatDate } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Journal | Malhar Live',
  description: 'Stories, new songs and performance updates from Malhar Live.',
}

export default function JournalIndex() {
  return (
    <div className="article" style={{ maxWidth: 1000 }}>
      <p className="eyebrow">The Journal</p>
      <h1 className="h1" style={{ fontSize: 'clamp(2.6rem,7vw,4.2rem)' }}>
        Stories worth sharing.
      </h1>
      <div className="post-grid" style={{ marginTop: 48 }}>
        {posts.map((p) => (
          <a key={p.slug} href={`/journal/${p.slug}`} className="post-card">
            <small>{formatDate(p.date)}</small>
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 40 }}>
        <a href="/" className="btn btn-ghost">
          ← Back to Malhar Live
        </a>
      </div>
    </div>
  )
}
