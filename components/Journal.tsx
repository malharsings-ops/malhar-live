import Reveal from './Reveal'
import { posts, formatDate } from '@/lib/posts'

export default function Journal() {
  const latest = posts.slice(0, 3)
  return (
    <section id="journal" className="section bg-deep">
      <div className="container">
        <Reveal>
          <p className="eyebrow">The Journal</p>
          <h2 className="h2">Stories worth sharing.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="post-grid">
            {latest.map((p) => (
              <a key={p.slug} href={`/journal/${p.slug}`} className="post-card">
                <small>{formatDate(p.date)}</small>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <a href="/journal" className="btn btn-ghost">
              View all stories ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
