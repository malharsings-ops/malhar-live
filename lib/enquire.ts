import { site } from './site'

export type EnquiryDetail = { date?: string; format?: string }

/** "2026-10-22" → "Thursday, 22 October 2026", the way it reads in a message. */
function pretty(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function message({ date, format }: EnquiryDetail) {
  const lines = [`Hi Malhar, I want to know your availability${date ? ` for ${pretty(date)}` : ''}.`]
  if (format) lines.push(`I'm looking at the ${format} lineup.`)
  lines.push('(Sent from malharlive)')
  return lines.join('\n\n')
}

/**
 * Opens WhatsApp with the enquiry already written out — the channel Malhar's
 * clients actually use. Without a number it falls back to the on-page form.
 */
export function enquire(detail: EnquiryDetail = {}) {
  if (site.whatsapp) {
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message(detail))}`, '_blank', 'noopener')
    return
  }
  window.dispatchEvent(new CustomEvent<EnquiryDetail>('malhar:enquire', { detail }))
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
