'use client'

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, leftIcon, rightIcon, fullWidth = true, className = '', id, ...props },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#B0B0B0] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707070] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full bg-[#1A1A1A] border rounded-lg px-4 py-2.5 text-white placeholder-[#707070] text-sm',
              'transition-all duration-200 outline-none',
              error
                ? 'border-[#F44336] focus:border-[#F44336] focus:shadow-[0_0_0_3px_rgba(244,67,54,0.15)]'
                : 'border-[#3A3A3A] focus:border-[#FF5722] focus:shadow-[0_0_0_3px_rgba(255,87,34,0.15)]',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              className,
            ].join(' ')}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707070]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-[#F44336]">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-[#707070]">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
