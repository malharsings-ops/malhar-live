'use client'

import { useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal'
import { bookings, liveShows, sampleShows, site, type Show } from '@/lib/site'
import EnquireButton from './EnquireButton'
import { shortDate } from '@/lib/enquire'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const key = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3c.8 5.2 3.8 8.2 9 9-5.2.8-8.2 3.8-9 9-.8-5.2-3.8-8.2-9-9 5.2-.8 8.2-3.8 9-9Z" strokeLinejoin="round" />
    </svg>
  )
}
function Lock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" strokeLinecap="round" />
    </svg>
  )
}

type Props = {
  id?: string
  eyebrow?: string
  title?: string
  lead?: string
  /** Show the "catch us live" markers and the upcoming-shows grid. */
  showLive?: boolean
  /** Homepage mode: just the upcoming shows, no availability grid. */
  showsOnly?: boolean
}

export default function Calendar({
  id = 'calendar',
  eyebrow = 'Malhar Live · Dates',
  title = 'Dates and availability.',
  lead = 'Browse the calendar and pick a date to see where it stands.',
  showLive = false,
  showsOnly = false,
}: Props = {}) {
  const [today, setToday] = useState<Date | null>(null)
  const [view, setView] = useState<{ y: number; m: number } | null>(null)
  const [filter, setFilter] = useState<'all' | 'weekends'>('all')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const d = new Date()
    setToday(d)
    setView({ y: d.getFullYear(), m: d.getMonth() })
  }, [])

  const booked = useMemo(() => new Set(bookings.map((b) => b.date)), [])
  const shows: Show[] = useMemo(() => {
    if (!(showLive || showsOnly) || !today) return []
    return liveShows.length ? liveShows : sampleShows(today)
  }, [showLive, today])
  const sample = (showLive || showsOnly) && !liveShows.length
  const showByDate = useMemo(() => new Map(shows.map((x) => [x.date, x])), [shows])

  const cells = useMemo(() => {
    if (!view) return []
    const first = new Date(view.y, view.m, 1).getDay()
    const days = new Date(view.y, view.m + 1, 0).getDate()
    return [...Array.from({ length: first }, () => 0), ...Array.from({ length: days }, (_, i) => i + 1)]
  }, [view])

  if (!today || !view) {
    return (
      <section id={id} className="section bg-ink">
        <div className="container">
          <div className="cal-card cal-skeleton" aria-busy="true" />
        </div>
      </section>
    )
  }

  const todayKey = key(today.getFullYear(), today.getMonth(), today.getDate())
  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const atCurrent = view.y === today.getFullYear() && view.m === today.getMonth()

  const shift = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1)
    setView({ y: d.getFullYear(), m: d.getMonth() })
  }

  const selDate = selected
    ? (() => {
        const [y, m, d] = selected.split('-').map(Number)
        return new Date(y, m - 1, d)
      })()
    : null
  const selLabel = selDate?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const selBooked = selected ? booked.has(selected) : false
  const selShow = selected ? showByDate.get(selected) : undefined

  if (showsOnly) {
    return (
      <section id={id} className="section bg-ink">
        <div className="container">
          <Reveal>
            <div className="shows-head">
              <div>
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="h2">{title}</h2>
                <p className="lead" style={{ marginLeft: 0 }}>
                  {lead}
                </p>
              </div>
              <a className="btn btn-ghost" href="/book#live">
                Full calendar <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            {sample && <p className="sample-tag">Sample listing · real dates coming soon</p>}
            <div className="shows-list">
              {shows.map((x) => {
                const d = new Date(`${x.date}T00:00:00`)
                return (
                  <div className="show-row" key={x.date}>
                    <span className="show-date">
                      <b>{d.getDate()}</b>
                      {d.toLocaleDateString('en-IN', { month: 'short' })}
                    </span>
                    <span className="show-info">
                      <b>{x.venue}</b>
                      <small>
                        {x.city} · {d.toLocaleDateString('en-IN', { weekday: 'long' })}
                      </small>
                    </span>
                    <span className="show-city">{x.city}</span>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="section bg-ink">
      <div className="container">
        <Reveal className="center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
          <p className="lead">{lead}</p>
        </Reveal>

        <Reveal delay={80} className="cal-layout">
          <div className="cal-card">
            <div className="cal-top">
              <div>
                <p className="eyebrow">Performance &amp; Booking Calendar</p>
                <h3 className="cal-month">{monthLabel}</h3>
              </div>
              <div className="cal-nav">
                <button aria-label="Previous month" onClick={() => shift(-1)} disabled={atCurrent}>
                  ‹
                </button>
                <button aria-label="Next month" onClick={() => shift(1)}>
                  ›
                </button>
              </div>
            </div>

            <div className="chips" role="group" aria-label="Date filter">
              <button className={`chip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>
                All dates
              </button>
              <button className={`chip ${filter === 'weekends' ? 'on' : ''}`} onClick={() => setFilter('weekends')}>
                Weekends
              </button>
            </div>

            <div className="legend">
              <span>
                <i style={{ background: '#d9826a' }} />
                Booked
              </span>
              {showLive && (
                <span>
                  <i style={{ background: '#bf8155' }} />
                  Catch us live
                </span>
              )}
              <span>
                <i style={{ border: '2px solid #bf8155' }} />
                Popular weekend
              </span>
              <span>
                <i style={{ background: '#9cab92' }} />
                Open for enquiries
              </span>
            </div>

            <div className="dow" aria-hidden="true">
              {DOW.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="days">
              {cells.map((d, i) => {
                if (!d) return <span key={`e${i}`} className="day empty" />
                const k = key(view.y, view.m, d)
                const dow = new Date(view.y, view.m, d).getDay()
                const weekend = dow === 0 || dow === 6
                const isBooked = booked.has(k)
                const live = showByDate.has(k)
                const past = k < todayKey
                const dim = filter === 'weekends' && !weekend
                return (
                  <button
                    key={k}
                    className={[
                      'day',
                      weekend ? 'weekend' : '',
                      isBooked ? 'booked' : '',
                      live ? 'live' : '',
                      past ? 'past' : '',
                      dim ? 'dim' : '',
                      k === todayKey ? 'today' : '',
                      k === selected ? 'selected' : '',
                    ].join(' ')}
                    disabled={past}
                    aria-pressed={k === selected}
                    aria-label={`${d} ${monthLabel}${isBooked ? ', booked' : live ? ', live show' : weekend ? ', weekend' : ''}`}
                    onClick={() => setSelected(k)}
                  >
                    {d}
                    {isBooked ? <Lock /> : weekend && !past ? <Sparkle /> : null}
                  </button>
                )
              })}
            </div>
            <p className="cal-note">
              Weekends go first, so ask early. Select any date to see where it stands.
            </p>
          </div>
          <div className="date-panel">
            <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="15" rx="3" />
              <path d="M8 3v4M16 3v4M3.5 10h17" strokeLinecap="round" />
            </svg>
            {selected && selLabel ? (
              <>
                <p className="eyebrow">Date details</p>
                <span className={`status ${selBooked ? 'full' : 'open'}`}>
                  {selBooked ? 'Already booked' : selShow ? 'Catch us live' : 'Open for enquiries'}
                </span>
                <h3 className="h3">{selLabel}</h3>
                {selShow && (
                  <p className="lead" style={{ marginTop: 14 }}>
                    Malhar is playing at {selShow.venue}, {selShow.city}. Come and hear the songs live.
                  </p>
                )}
                <p className="lead" style={{ marginTop: 14 }}>
                  {selBooked
                    ? 'This date is taken. Pick another date, or message Malhar about nearby days.'
                    : 'This date is currently open. Send Malhar a WhatsApp and he will confirm it himself.'}
                </p>
                <div className="panel-actions">
                  {!selBooked && (
                    <EnquireButton className="btn btn-gold" date={selected}>
                      Enquire for {shortDate(selected)} <span aria-hidden="true">↗</span>
                    </EnquireButton>
                  )}
                  <a
                    className="btn btn-ghost"
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry for ${selLabel}`)}`}
                  >
                    Email Malhar ↗
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="eyebrow">Date details</p>
                <h3 className="h3">A date worth remembering.</h3>
                <p className="lead" style={{ marginTop: 14 }}>
                  Select any date from the calendar to check its status and enquire with Malhar Live.
                </p>
              </>
            )}
            <div className="panel-foot">
              <small>Managed by Malhar Live</small>
              <a href="#contact">Contact management ↗</a>
            </div>
          </div>
        </Reveal>

        {showLive && shows.length > 0 && (
          <Reveal delay={140}>
            <div className="show-head">
              <p className="eyebrow">Upcoming live shows</p>
              {sample && <span className="sample-tag">Sample listing · real dates coming soon</span>}
            </div>
            <div className="show-grid">
              {shows.map((x) => {
                const d = new Date(`${x.date}T00:00:00`)
                return (
                  <button
                    key={x.date}
                    className="show-card"
                    onClick={() => {
                      const [y, m] = x.date.split('-').map(Number)
                      setView({ y, m: m - 1 })
                      setSelected(x.date)
                    }}
                  >
                    <span className="show-date">
                      <b>{d.getDate()}</b>
                      {d.toLocaleDateString('en-IN', { month: 'short' })}
                    </span>
                    <span className="show-info">
                      <b>{x.venue}</b>
                      <small>
                        {x.city} · {d.toLocaleDateString('en-IN', { weekday: 'long' })}
                      </small>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
