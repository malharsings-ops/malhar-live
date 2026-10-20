import { site } from './site'

export type EnquiryDetail = {
  date?: string
  format?: string
  /** Extra lines from the full enquiry form. */
  lines?: string[]
}

/** "2026-10-22" → "Thursday, 22 October 2026", the way it reads in a message. */
export function prettyDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** "22 October" — short enough to sit inside a button label. */
export function shortDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })
}

function message({ date, format, lines }: EnquiryDetail) {
  const out = [`Hi Malhar, I want to know your availability${date ? ` for ${prettyDate(date)}` : ''}.`]
  if (format && format !== 'Not sure yet') out.push(`I'm looking at the ${format} lineup.`)
  if (lines?.length) out.push(lines.join('\n'))
  return out.join('\n\n')
}

/**
 * A WhatsApp deep link with the enquiry already written out. Used as a plain
 * href so the browser never treats it as a blocked pop-up.
 */
export function whatsappUrl(detail: EnquiryDetail = {}) {
  if (!site.whatsapp) return ''
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message(detail))}`
}

/** Fallback for when no WhatsApp number is configured: fill in the on-page form. */
export function enquire(detail: EnquiryDetail = {}) {
  window.dispatchEvent(new CustomEvent<EnquiryDetail>('malhar:enquire', { detail }))
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
