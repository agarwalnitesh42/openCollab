import mergeTW from '@/utils/mergeTW'
import { type ReactNode } from 'react'

export const StatItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={mergeTW(`flex items-center gap-x-2 text-black text-sm ${className}`)}>{children}</div>
)
