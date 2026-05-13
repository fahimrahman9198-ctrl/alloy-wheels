'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#FF5722] hover:bg-[#FF7043] active:bg-[#E64A19] text-white border-transparent hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(255,87,34,0.45)] active:translate-y-0',
  secondary:
    'bg-transparent border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722]/10 hover:-translate-y-0.5',
  tertiary:
    'bg-transparent border border-[#3A3A3A] text-[#B0B0B0] hover:border-[#FF5722] hover:text-white hover:-translate-y-0.5',
  ghost:
    'bg-transparent border-transparent text-[#B0B0B0] hover:text-white hover:bg-white/5',
  danger:
    'bg-[#F44336] hover:bg-[#E53935] active:bg-[#C62828] text-white border-transparent hover:-translate-y-0.5',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-lg gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-semibold tracking-wide border transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F]',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
