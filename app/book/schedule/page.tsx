'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight, ChevronLeft, CreditCard, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { contactSchema, type ContactFormData } from '@/lib/validation'
import { VEHICLES, REGIONS } from '@/lib/constants'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const TIME_SLOTS = [
  { id: 'morning_1', label: '8:00 AM', period: 'Morning' },
  { id: 'morning_2', label: '10:00 AM', period: 'Morning' },
  { id: 'afternoon_1', label: '12:00 PM', period: 'Afternoon' },
  { id: 'afternoon_2', label: '2:00 PM', period: 'Afternoon' },
  { id: 'afternoon_3', label: '4:00 PM', period: 'Afternoon' },
]

function Calendar({ selectedDate, onSelect }: { selectedDate: string | null; onSelect: (d: string) => void }) {
  const today = new Date(2026, 4, 13) // May 13, 2026
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => (i < firstDay ? null : i - firstDay + 1))

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) } else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) } else setViewMonth(m => m + 1)
  }

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    return d < today || d.getDay() === 0 // closed Sundays
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg text-[#707070] hover:text-white hover:bg-white/10 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <span className="font-semibold text-white text-sm">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg text-[#707070] hover:text-white hover:bg-white/10 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-center text-xs text-[#707070] font-medium py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const disabled = isDisabled(day)
          const selected = selectedDate === dateStr
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={[
                'aspect-square text-sm rounded-lg transition-all duration-150 font-medium',
                disabled ? 'text-[#3A3A3A] cursor-not-allowed' : '',
                selected ? 'bg-[#FF5722] text-white' : !disabled ? 'text-[#B0B0B0] hover:bg-[#2A2A2A] hover:text-white' : '',
              ].join(' ')}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function BookSchedulePage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [depositOption, setDepositOption] = useState<'now' | 'hold'>('now')
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [loading, setLoading] = useState(false)
  const [estimate, setEstimate] = useState<{ total: number } | null>(null)

  useEffect(() => {
    const est = sessionStorage.getItem('book_estimate')
    if (est) setEstimate(JSON.parse(est))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: 2022,
    },
  })

  const makes = Object.keys(VEHICLES)
  const models = selectedMake ? Object.keys(VEHICLES[selectedMake] ?? {}) : []
  const years = selectedMake && selectedModel ? (VEHICLES[selectedMake]?.[selectedModel] ?? []) : []

  const onSubmit = async (data: ContactFormData) => {
    if (!selectedDate || !selectedTime) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    sessionStorage.setItem('book_confirmed', JSON.stringify({ ...data, date: selectedDate, time: selectedTime }))
    router.push('/book/confirmed')
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Schedule & Contact</h1>
        <p className="text-[#707070] mb-8">Pick a date, time, and provide your contact details.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Calendar */}
          <section>
            <h2 className="font-semibold text-white mb-4">Select Date</h2>
            <div className="max-w-xs">
              <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
            </div>
          </section>

          {/* Time Slots */}
          <section>
            <h2 className="font-semibold text-white mb-4">Select Time</h2>
            <div className="flex flex-wrap gap-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedTime(slot.id)}
                  className={[
                    'px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200',
                    selectedTime === slot.id
                      ? 'border-[#FF5722] bg-[#FF5722]/10 text-[#FF5722]'
                      : 'border-[#3A3A3A] bg-[#1A1A1A] text-[#707070] hover:border-[#FF5722]/40 hover:text-[#B0B0B0]',
                  ].join(' ')}
                >
                  {slot.label}
                  <span className="block text-xs font-normal opacity-70">{slot.period}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="space-y-4">
            <h2 className="font-semibold text-white">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" error={errors.name?.message} placeholder="Jane Smith" {...register('name')} />
              <Input label="Email" type="email" error={errors.email?.message} placeholder="jane@example.com" {...register('email')} />
              <Input label="Phone" type="tel" error={errors.phone?.message} placeholder="604-555-0100" {...register('phone')} />
              <Input label="Service Address" error={errors.address?.message} placeholder="123 Main St, Vancouver" {...register('address')} />
            </div>
          </section>

          {/* Vehicle */}
          <section className="space-y-4">
            <h2 className="font-semibold text-white">Vehicle Information</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Make</label>
                <select
                  {...register('vehicleMake')}
                  onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel('') }}
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none"
                >
                  <option value="">Select make</option>
                  {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.vehicleMake && <p className="text-xs text-[#F44336] mt-1">{errors.vehicleMake.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Model</label>
                <select
                  {...register('vehicleModel')}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedMake}
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none disabled:opacity-40"
                >
                  <option value="">Select model</option>
                  {models.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Year</label>
                <select
                  {...register('vehicleYear', { valueAsNumber: true })}
                  disabled={!selectedModel}
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none disabled:opacity-40"
                >
                  <option value="">Select year</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Deposit */}
          <section>
            <h2 className="font-semibold text-white mb-4">Deposit Option</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {[
                { id: 'now', label: '$50 Deposit Now', sub: 'Secure your appointment immediately. Remainder due at service.' },
                { id: 'hold', label: 'Hold Card on File', sub: 'No charge today. Card charged if cancellation < 24h notice.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDepositOption(opt.id as 'now' | 'hold')}
                  className={[
                    'text-left p-4 rounded-xl border transition-all duration-200',
                    depositOption === opt.id
                      ? 'border-[#FF5722] bg-[#FF5722]/8'
                      : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/40',
                  ].join(' ')}
                >
                  <p className="font-semibold text-white text-sm">{opt.label}</p>
                  <p className="text-xs text-[#707070] mt-1">{opt.sub}</p>
                </button>
              ))}
            </div>

            {/* Card Input (visual only) */}
            <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                  <CreditCard size={16} className="text-[#FF5722]" />
                  Card Details
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#4CAF50]">
                  <Lock size={12} />
                  Secure
                </div>
              </div>
              <Input label="Card Number" placeholder="4242 4242 4242 4242" type="text" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry" placeholder="MM / YY" />
                <Input label="CVC" placeholder="123" />
              </div>
              <Input label="Name on Card" placeholder="Jane Smith" />
              <p className="text-xs text-[#707070]">
                Visual only — no real payment processing in this demo.
              </p>
            </div>
          </section>

          {/* Summary & Submit */}
          {estimate && (
            <div className="bg-[#1A1A1A] border border-[#FF5722]/30 rounded-xl p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-[#B0B0B0]">Estimated Total</p>
                  <p className="text-2xl font-bold text-[#FF5722] font-mono">${estimate.total.toFixed(0)}</p>
                </div>
                <div className="text-right text-xs text-[#707070]">
                  <p>Deposit due today: <span className="text-white font-semibold">$50</span></p>
                  <p>Remainder at completion</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Booking <ChevronRight size={18} />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
