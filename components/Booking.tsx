'use client'

import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import Sparkles from './Sparkles'
import VideoGrid from './VideoGrid'
import TrackSlider from './TrackSlider'
import Calendar from './Calendar'
import MalharShowcase from './MalharShowcase'
import Contact from './Contact'
import { formats, site, type FormatId } from '@/lib/site'
import { enquire } from '@/lib/enquire'

const TABS = [
  ['watch', 'Watch'],
  ['listen', 'Listen'],
  ['stories', 'Stories'],
  ['live', 'Catch us live'],
  ['meet', 'Meet Malhar'],
  ['contact', 'Enquire'],
] as const

export default function Booking() {
  const [fid, setFid] = useState<FormatId>('solo')

  // Allow a shareable link such as /book?f=duo
  useEffect(() => {
    try {
      const f = new URLSearchParams(window.location.search).get('f')
      if (f && formats.some((x) => x.id === f)) setFid(f as FormatId)
    } catch {
      /* ignore */
    }
  }, [])

  const choose = (id: FormatId) => {
    setFid(id)
    try {
      window.history.replaceState(null, '', `/book?f=${id}`)
    } catch {
      /* ignore */
    }
  }

  const f = formats.find((x) => x.id === fid) ?? formats[0]

  return (
    <>
      <section className="book-hero">
        {site.bookImage && (
          <div className="hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.bookImage} alt="" fetchPriority="high" />
          </div>
        )}
        <Sparkles count={16} />
        <div className="container book-left" style={{ position: 'relative' }}>
          <p className="eyebrow">Book Malhar Live</p>
          <h1 className="h1 book-h1">Choose your evening.</h1>
          <p className="lead">
            Pick the lineup that suits your celebration. Watch it live, hear the songs, check dates, then send an
            enquiry. Malhar replies personally.
          </p>

          <div className="fmt-grid" role="radiogroup" aria-label="Choose a lineup">
            {formats.map((x) => (
              <button
                key={x.id}
                role="radio"
                aria-checked={x.id === fid}
                className={`fmt ${x.id === fid ? 'on' : ''}`}
                onClick={() => choose(x.id)}
              >
                <span className="fmt-no">{x.number}</span>
                <span className="fmt-name">{x.name}</span>
                <span className="fmt-who">{x.who}</span>
                <span className="fmt-tick" aria-hidden="true">
                  {x.id === fid ? '✦' : '○'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <nav className="dash-tabs" aria-label="On this page">
        <div className="dash-tabs-in">
          {TABS.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div key={f.id} className="fmt-panel">
        <section id="watch" className="section bg-ink">
          <div className="container">
            <Reveal>
              <p className="eyebrow">
                {f.number} — {f.name}
              </p>
              <h2 className="h2">{f.headline}</h2>
              <p className="lead">{f.tagline}</p>
              <div className="lineup" aria-label="Lineup">
                {f.lineup.map((l) => (
                  <span key={l}>{l}</span>
                ))}
                <span className="lineup-time">{f.hours}</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="sub-h">Watch it live</h3>
              <VideoGrid videos={f.videos} />
              {f.custom && (
                <div className="band-cta">
                  <p>Planning something bigger? Tell us the occasion, the stage and the feel, and we will shape a lineup.</p>
                  <button className="btn btn-gold" onClick={() => enquire({ format: f.name })}>
                    Enquire for a bigger band ↗
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <section id="listen" className="section bg-deep">
          <Sparkles count={20} />
          <div className="container center" style={{ position: 'relative' }}>
            <Reveal>
              <p className="eyebrow">Hear the songs</p>
              <h2 className="h2">Original songs, played your way.</h2>
              <p className="lead">The same songs travel with every lineup. Slide through and press play.</p>
            </Reveal>
            <Reveal delay={100}>
              <TrackSlider />
            </Reveal>
          </div>
        </section>

        <section id="stories" className="section bg-ink">
          <div className="container">
            <Reveal>
              <p className="eyebrow">Kind words · {f.name}</p>
              <h2 className="h2">From the people who booked.</h2>
              <p className="lead">Short video messages from clients who had {f.name === 'Bigger Band' ? 'a band' : `a ${f.name}`} evening.</p>
            </Reveal>
            <Reveal delay={80}>
              <VideoGrid videos={f.testimonials} />
            </Reveal>
          </div>
        </section>
      </div>

      <Calendar
        id="live"
        showLive
        eyebrow="Catch us live"
        title="See Malhar on stage."
        lead="Find a show near you, or pick any open date to plan your own evening."
      />

      <MalharShowcase />

      <Contact />

      <div className="pick-bar" role="region" aria-label="Your selection">
        <span>
          <small>Your pick</small>
          <b>{f.name}</b>
        </span>
        <button className="btn btn-gold" onClick={() => enquire({ format: f.name })}>
          Enquire ↗
        </button>
      </div>
    </>
  )
}
