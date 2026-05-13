'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

const STEPS = [
  { label: 'Photos', path: '/quote/upload' },
  { label: 'Details', path: '/quote/details' },
  { label: 'Location', path: '/quote/location' },
  { label: 'Contact', path: '/quote/contact' },
  { label: 'Quote', path: '/quote/confirmed' },
]

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const stepIndex = STEPS.findIndex((s) => pathname.startsWith(s.path))
  const isConfirmed = pathname.startsWith('/quote/confirmed')
  const stepNumber = stepIndex === -1 ? 0 : stepIndex

  if (isConfirmed) return <div className="min-h-screen bg-[#0F0F0F]">{children}</div>

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <div className="sticky top-16 z-20 bg-[#1A1A1A] border-b border-[#3A3A3A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => stepNumber > 0 ? router.push(STEPS[stepNumber - 1].path) : router.push('/')}
              className="flex items-center gap-1.5 text-sm text-[#707070] hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />Back
            </button>
            <span className="text-xs text-[#707070] font-mono">Step {stepNumber + 1} of {STEPS.length}</span>
          </div>
          <div className="flex items-center gap-0 mb-3">
            {STEPS.map((step, i) => {
              const isActive = i === stepNumber
              const isDone = i < stepNumber
              return (
                <div key={step.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={['w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all', isDone ? 'bg-[#4CAF50] text-white' : isActive ? 'bg-[#FF5722] text-white' : 'bg-[#2A2A2A] text-[#707070]'].join(' ')}>
                      {isDone ? '✓' : i + 1}
                    </div>
                    <span className={['text-xs mt-1 hidden sm:block', isActive ? 'text-white font-medium' : isDone ? 'text-[#4CAF50]' : 'text-[#707070]'].join(' ')}>{step.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="flex-1 h-px mx-2 transition-colors" style={{ backgroundColor: i < stepNumber ? '#4CAF50' : '#3A3A3A' }} />}
                </div>
              )
            })}
          </div>
          <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#FF5722] rounded-full" initial={false} animate={{ width: `${((stepNumber + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">{children}</div>
    </div>
  )
}
