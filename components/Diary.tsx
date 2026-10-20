import Reveal from './Reveal'
import { bookings, site } from '@/lib/site'

function CalendarIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="3" />
      <path d="M3 9.5h18M8 3v3M16 3v3" strokeLinecap="round" />
      <circle cx="8" cy="13.5" r=".6" fill="currentColor" />
      <circle cx="12" cy="13.5" r=".6" fill="currentColor" />
      <circle cx="16" cy="13.5" r=".6" fill="currentColor" />
      <circle cx="8" cy="17" r=".6" fill="currentColor" />
      <circle cx="12" cy="17" r=".6" fill="currentColor" />
    </svg>
  )
}

export default function Diary() {
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = bookings.filter((b) => b.date >= today).sort((a, b) => a.date.localeCompare(b.date))

  const groups = new Map<string, typeof upcoming>()
  for (const b of upcoming) {
    const key = b.date.slice(0, 7)
    groups.set(key, [...(groups.get(key) ?? []), b])
  }

  return (
    <section id="diary" className="section bg-deep">
      <div className="container">
        <Reveal>
          <div className="diary-head">
            <div>
              <p className="eyebrow">{site.artist} · Performance Diary</p>
              <h2 className="h2">Upcoming Performances.</h2>
              <p className="lead">A journey of music and celebrations across India.</p>
            </div>
            <span className="diary-icon">
              <CalendarIcon />
            </span>
          </div>
        </Reveal>

        {upcoming.length === 0 ? (
          <Reveal delay={80}>
            <div className="empty-card">
              <h4>New dates are being added.</h4>
              <p>
                Confirmed performances will appear here. Check the calendar below to see which dates are open, then send
                an enquiry.
              </p>
              <a href="/#calendar" className="btn btn-gold">
                Find your date
              </a>
            </div>
          </Reveal>
        ) : (
          [...groups.entries()].map(([key, list]) => {
            const [y, m] = key.split('-').map(Number)
            const label = new Date(y, m - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
            return (
              <Reveal key={key}>
                <div className="month-row">
                  <span>{label}</span>
                  <span>
                    {list.length} {list.length === 1 ? 'booking' : 'bookings'}
                  </span>
                </div>
                {list.map((b) => {
                  const [yy, mm, dd] = b.date.split('-').map(Number)
                  const dt = new Date(yy, mm - 1, dd)
                  return (
                    <div className="booking" key={b.date + b.city}>
                      <div className="booking-date">
                        <b>{dd}</b>
                        <span>{dt.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                      </div>
                      <div>
                        <small>CONFIRMED BOOKING</small>
                        <h4>{b.city}</h4>
                        <p>Private celebration · Details confidential</p>
                      </div>
                    </div>
                  )
                })}
              </Reveal>
            )
          })
        )}
      </div>
    </section>
  )
}
