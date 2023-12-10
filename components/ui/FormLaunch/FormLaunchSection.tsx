import mergeTW from '@/utils/mergeTW'
import { ReactNode } from 'react'

export const FormLaunchSection = ({
  children,
  className = '',
  number,
  title,
  description,
}: {
  children: ReactNode
  className?: string
  number: number
  title: string
  description?: string
}) => (
  <li className={`flex items-start space-x-4 mt-4 ${mergeTW(className)}`}>
    <div className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-black font-medium text-sm">
      {number}
    </div>
    <div className="w-full">
      <div>
        <h3 className="text-lg text-black">{title}</h3>
        <p className="text-sm text-black mt-1">{description}</p>
      </div>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  </li>
)
