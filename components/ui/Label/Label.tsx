import mergeTW from '@/utils/mergeTW'
import { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  className?: string
  htmlFor?: string
}

export default ({ children, className, ...props }: Props) => (
  <label {...props} className={mergeTW(`text-sm text-black font-medium ${className}`)}>
    {children}
  </label>
)
