export type EnquiryDetail = { date?: string; format?: string }

/** Pre-fills the enquiry form and scrolls to it. */
export function enquire(detail: EnquiryDetail = {}) {
  window.dispatchEvent(new CustomEvent<EnquiryDetail>('malhar:enquire', { detail }))
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
