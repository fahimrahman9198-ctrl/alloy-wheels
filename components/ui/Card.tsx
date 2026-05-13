import { ReactNode, HTMLAttributes } from 'react'

type CardVariant = 'default' | 'elevated' | 'interactive'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-[#1A1A1A] border border-[#3A3A3A]',
  elevated: 'bg-[#2A2A2A] border border-[#3A3A3A] shadow-xl',
  interactive:
    'bg-[#1A1A1A] border border-[#3A3A3A] cursor-pointer hover:-translate-y-1 hover:border-[#FF5722] hover:shadow-[0_8px_32px_rgba(255,87,34,0.2)] transition-all duration-300',
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-xl transition-all duration-300',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
