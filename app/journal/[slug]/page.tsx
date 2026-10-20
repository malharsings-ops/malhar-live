import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts, formatDate } from '@/lib/posts'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} | Malhar Live`, description: post.excerpt }
}

export default async function Post({ params }: Params) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <article className="article">
      <p className="eyebrow">{formatDate(post.date)}</p>
      <h1 className="h1">{post.title}</h1>
      {post.body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a href="/journal" className="btn btn-ghost">
          ← All stories
        </a>
        <a href="/#contact" className="btn btn-gold">
          Book Malhar
        </a>
      </div>
    </article>
  )
}
