import { ReactNode } from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  children: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30',
  secondary: 'bg-[#3A3A3A] text-[#B0B0B0] border border-[#3A3A3A]',
  success: 'bg-[#4CAF50]/15 text-[#4CAF50] border border-[#4CAF50]/30',
  warning: 'bg-[#FFC107]/15 text-[#FFC107] border border-[#FFC107]/30',
  danger: 'bg-[#F44336]/15 text-[#F44336] border border-[#F44336]/30',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export default function Badge({
  variant = 'secondary',
  size = 'sm',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
