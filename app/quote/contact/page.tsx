'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { quoteContactSchema, type QuoteContactFormData } from '@/lib/validation'

export default function QuoteContactPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isDealer, setIsDealer] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<QuoteContactFormData>({
    resolver: zodResolver(quoteContactSchema),
    defaultValues: { isDealer: false, marketingOptIn: false, smsOptIn: false },
  })

  const onSubmit = async (data: QuoteContactFormData) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    sessionStorage.setItem('quote_contact', JSON.stringify(data))
    router.push('/quote/confirmed')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Contact Information</h1>
      <p className="text-[#707070] mb-8">We'll send your quote and follow up to schedule service.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Jane Smith" error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" placeholder="jane@example.com" error={errors.email?.message} {...register('email')} />
          <Input label="Phone" type="tel" placeholder="604-555-0100" error={errors.phone?.message} {...register('phone')} />
        </div>

        {/* Dealer toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer p-4 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl hover:border-[#FF5722]/40 transition-colors">
            <div
              className={['w-5 h-5 rounded border-2 flex items-center justify-center transition-colors', isDealer ? 'border-[#FF5722] bg-[#FF5722]' : 'border-[#3A3A3A]'].join(' ')}
              onClick={() => {
                const next = !isDealer
                setIsDealer(next)
                setValue('isDealer', next)
              }}
            >
              {isDealer && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <div>
              <p className="font-medium text-white text-sm">I represent a dealership or fleet account</p>
              <p className="text-xs text-[#707070]">Access trade pricing, Net-30 invoicing and priority dispatch</p>
            </div>
          </label>

          {isDealer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-3 grid sm:grid-cols-2 gap-4"
            >
              <Input label="Dealership Name" placeholder="Destination BMW" error={errors.dealerName?.message} {...register('dealerName')} />
              <Input label="Contact Name / Position" placeholder="Jason T. — Pre-Owned Manager" error={errors.dealerContact?.message} {...register('dealerContact')} />
            </motion.div>
          )}
        </div>

        {/* Opt-ins */}
        <div className="space-y-3">
          {[
            { key: 'marketingOptIn', label: 'Email me with promotions and seasonal offers', sub: 'Max 1 per month' },
            { key: 'smsOptIn', label: 'Send appointment reminders via SMS', sub: 'Standard rates apply' },
          ].map((opt) => {
            const watched = watch(opt.key as keyof QuoteContactFormData)
            return (
              <label key={opt.key} className="flex items-center gap-3 cursor-pointer">
                <div
                  className={['w-4.5 h-4.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors w-5 h-5', watched ? 'border-[#FF5722] bg-[#FF5722]' : 'border-[#3A3A3A]'].join(' ')}
                  onClick={() => setValue(opt.key as keyof QuoteContactFormData, !watched as boolean)}
                >
                  {watched && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <div>
                  <p className="text-sm text-[#B0B0B0]">{opt.label}</p>
                  <p className="text-xs text-[#707070]">{opt.sub}</p>
                </div>
              </label>
            )
          })}
        </div>

        <p className="text-xs text-[#707070]">
          By submitting you agree to our{' '}
          <a href="/privacy" className="text-[#FF5722] hover:underline">Privacy Policy</a>. We never share your data.
        </p>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" loading={loading}>
            Get My Quote <ChevronRight size={18} />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
