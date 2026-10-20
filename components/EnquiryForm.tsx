'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { site } from '@/lib/site'
import type { EnquiryDetail } from '@/lib/enquire'

const EVENTS = ['Wedding', 'Sangeet / Reception', 'Private celebration', 'Corporate event', 'Venue / Restaurant', 'Other']
const FORMATS = ['Not sure yet', 'Solo', 'Duo', 'Trio']

export default function EnquiryForm() {
  const [date, setDate] = useState('')
  const [format, setFormat] = useState('Not sure yet')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<EnquiryDetail>).detail
      if (d?.date) setDate(d.date)
      if (d?.format) setFormat(d.format)
      setSent(false)
    }
    window.addEventListener('malhar:enquire', handler)
    return () => window.removeEventListener('malhar:enquire', handler)
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const v = (k: string) => String(f.get(k) ?? '').trim()
    const body = [
      `Name: ${v('name')}`,
      `Phone / WhatsApp: ${v('phone')}`,
      `Event type: ${v('event')}`,
      `Format: ${v('format')}`,
      `Date: ${v('date') || 'Not decided'}`,
      `City / venue: ${v('city')}`,
      '',
      v('message'),
    ].join('\n')
    const subject = `Enquiry — ${v('event')} — ${v('date') || 'date TBD'}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <p className="eyebrow">Send an enquiry</p>
      <div className="form-grid">
        <div className="form-grid two">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" required autoComplete="name" placeholder="Full name" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone / WhatsApp</label>
            <input id="phone" name="phone" required type="tel" autoComplete="tel" placeholder="+91 …" />
          </div>
        </div>
        <div className="form-grid two">
          <div className="field">
            <label htmlFor="event">Event type</label>
            <select id="event" name="event" defaultValue={EVENTS[0]}>
              {EVENTS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="format">Format</label>
            <select id="format" name="format" value={format} onChange={(e) => setFormat(e.target.value)}>
              {FORMATS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-grid two">
          <div className="field">
            <label htmlFor="date">Event date</label>
            <input id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="city">City / venue</label>
            <input id="city" name="city" placeholder="Pune, venue name…" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">Tell us about your event</label>
          <textarea id="message" name="message" rows={4} placeholder="Guests, timings, the feel you want…" />
        </div>
        <button className="btn btn-gold btn-block" type="submit">
          Send enquiry ↗
        </button>
      </div>
      <p className="form-note" role="status">
        {sent
          ? 'Your email app should now open with the enquiry ready to send. If it did not, write to ' + site.email + '.'
          : 'This opens your email app with the details filled in. No account needed.'}
      </p>
    </form>
  )
}
