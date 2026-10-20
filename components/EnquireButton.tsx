'use client'

import type { ReactNode } from 'react'
import { enquire, whatsappUrl, type EnquiryDetail } from '@/lib/enquire'

/**
 * Opens WhatsApp with the enquiry pre-written. Rendered as a real link rather
 * than a scripted window.open, which browsers block as a pop-up.
 */
export default function EnquireButton({
  children,
  className,
  ...detail
}: EnquiryDetail & { children: ReactNode; className?: string }) {
  const href = whatsappUrl(detail)
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button className={className} onClick={() => enquire(detail)}>
      {children}
    </button>
  )
}
