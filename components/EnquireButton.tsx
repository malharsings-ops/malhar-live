'use client'

import type { ReactNode } from 'react'
import { enquire, type EnquiryDetail } from '@/lib/enquire'

export default function EnquireButton({
  children,
  className,
  ...detail
}: EnquiryDetail & { children: ReactNode; className?: string }) {
  return (
    <button className={className} onClick={() => enquire(detail)}>
      {children}
    </button>
  )
}
