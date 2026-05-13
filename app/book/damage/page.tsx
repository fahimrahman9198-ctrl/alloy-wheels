'use client'

import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Upload, X, Camera } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { DAMAGE_TYPES, WHEEL_SIZES, FINISH_TYPES } from '@/lib/constants'
import { calculateEstimate, type WheelInput } from '@/lib/pricing'

const WHEEL_POSITIONS = [
  { id: 'FL', label: 'Front Left' },
  { id: 'FR', label: 'Front Right' },
  { id: 'RL', label: 'Rear Left' },
  { id: 'RR', label: 'Rear Right' },
] as const

type Position = 'FL' | 'FR' | 'RL' | 'RR'

interface PhotoData {
  preview: string
  name: string
}

export default function BookDamagePage() {
  const router = useRouter()
  const [selectedDamage, setSelectedDamage] = useState<string[]>([])
  const [wheelSize, setWheelSize] = useState<number>(18)
  const [finish, setFinish] = useState<string>('silver')
  const [severity, setSeverity] = useState<number>(40)
  const [notes, setNotes] = useState<string>('')
  const [photos, setPhotos] = useState<Partial<Record<Position, PhotoData>>>({})
  const [dragOver, setDragOver] = useState<Position | null>(null)
  const fileInputRefs = useRef<Partial<Record<Position, HTMLInputElement | null>>>({})
  const [activeWheels, setActiveWheels] = useState<Position[]>(['FL'])
  const [region, setRegion] = useState('metro_vancouver')
  const [serviceType, setServiceType] = useState<'mobile' | 'shop_dropoff'>('mobile')

  useEffect(() => {
    const r = sessionStorage.getItem('book_region') ?? 'metro_vancouver'
    const s = sessionStorage.getItem('book_service') ?? 'mobile'
    setRegion(r)
    setServiceType(s as 'mobile' | 'shop_dropoff')

    const saved = sessionStorage.getItem('book_damage')
    if (saved) {
      try {
        const d = JSON.parse(saved)
        if (d.selectedDamage) setSelectedDamage(d.selectedDamage)
        if (d.wheelSize) setWheelSize(d.wheelSize)
        if (d.finish) setFinish(d.finish)
        if (d.severity !== undefined) setSeverity(d.severity)
        if (d.notes) setNotes(d.notes)
        if (d.activeWheels) setActiveWheels(d.activeWheels)
      } catch { /* ignore */ }
    }
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, pos: Position) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const preview = URL.createObjectURL(file)
      setPhotos((p) => ({ ...p, [pos]: { preview, name: file.name } }))
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, pos: Position) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const preview = URL.createObjectURL(file)
      setPhotos((p) => ({ ...p, [pos]: { preview, name: file.name } }))
    }
  }

  const removePhoto = (pos: Position) => {
    setPhotos((p) => {
      const next = { ...p }
      if (next[pos]) URL.revokeObjectURL(next[pos]!.preview)
      delete next[pos]
      return next
    })
    if (fileInputRefs.current[pos]) fileInputRefs.current[pos]!.value = ''
  }

  const toggleDamage = (id: string) => {
    setSelectedDamage((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  const toggleWheel = (pos: Position) => {
    setActiveWheels((prev) =>
      prev.includes(pos) ? (prev.length > 1 ? prev.filter((p) => p !== pos) : prev) : [...prev, pos]
    )
  }

  const wheels: WheelInput[] = activeWheels.map((pos) => ({
    position: pos,
    severity: severity / 100,
    size: wheelSize,
    finish,
  }))

  const estimate = calculateEstimate({ wheels, region, serviceType, isTradeAccount: false, isRepeatCustomer: false })

  const fmt = (n: number) => `$${n.toFixed(0)}`

  const handleNext = () => {
    sessionStorage.setItem(
      'book_damage',
      JSON.stringify({ selectedDamage, wheelSize, finish, severity, notes, activeWheels })
    )
    sessionStorage.setItem('book_estimate', JSON.stringify(estimate))
    router.push('/book/schedule')
  }

  const severityLabel = severity < 34 ? 'Minimal' : severity < 67 ? 'Moderate' : 'Severe'
  const severityColor = severity < 34 ? '#4CAF50' : severity < 67 ? '#FFC107' : '#F44336'

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Damage Details</h1>
        <p className="text-[#707070] mb-8">Tell us about the damage so we can give you an accurate estimate.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Config */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Upload */}
            <section>
              <h2 className="font-semibold text-white mb-4">Upload Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WHEEL_POSITIONS.map((pos) => {
                  const photo = photos[pos.id as Position]
                  const isOver = dragOver === pos.id
                  return (
                    <div key={pos.id} className="flex flex-col gap-2">
                      <input
                        ref={(el) => { fileInputRefs.current[pos.id as Position] = el }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, pos.id as Position)}
                      />
                      <div
                        onClick={() => !photo && fileInputRefs.current[pos.id as Position]?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(pos.id as Position) }}
                        onDragLeave={() => setDragOver(null)}
                        onDrop={(e) => handleDrop(e, pos.id as Position)}
                        className={[
                          'relative aspect-square rounded-xl border-2 border-dashed overflow-hidden transition-all duration-200',
                          photo
                            ? 'border-[#4CAF50]'
                            : isOver
                            ? 'border-[#FF5722] bg-[#FF5722]/10 scale-105'
                            : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/50 cursor-pointer',
                        ].join(' ')}
                      >
                        <AnimatePresence mode="wait">
                          {photo ? (
                            <motion.div
                              key="photo"
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0"
                            >
                              <img src={photo.preview} alt={pos.id} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <button
                                onClick={(e) => { e.stopPropagation(); removePhoto(pos.id as Position) }}
                                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center hover:bg-[#F44336] transition-colors"
                                aria-label="Remove photo"
                              >
                                <X size={12} className="text-white" />
                              </button>
                              <span className="absolute bottom-2 left-2 text-[10px] text-white/80 font-medium">{pos.label}</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                            >
                              <Camera size={20} className="text-[#707070]" />
                              <span className="text-xs text-[#707070]">Click or drop</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="text-xs text-center text-[#B0B0B0]">{pos.label}</span>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-[#707070] mt-2">Click or drag & drop photos — real previews shown instantly</p>
            </section>

            {/* Wheels to repair */}
            <section>
              <h2 className="font-semibold text-white mb-4">Wheels to Repair</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WHEEL_POSITIONS.map((pos) => {
                  const isActive = activeWheels.includes(pos.id)
                  return (
                    <button
                      key={pos.id}
                      onClick={() => toggleWheel(pos.id)}
                      className={[
                        'py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'border-[#FF5722] bg-[#FF5722]/10 text-[#FF5722]'
                          : 'border-[#3A3A3A] bg-[#1A1A1A] text-[#707070] hover:border-[#FF5722]/40',
                      ].join(' ')}
                    >
                      {pos.id}
                      <span className="block text-xs font-normal mt-0.5">{pos.label.split(' ')[0]}</span>
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-[#707070] mt-2">{activeWheels.length} wheel{activeWheels.length > 1 ? 's' : ''} selected · 10% multi-wheel discount applies</p>
            </section>

            {/* Damage Types */}
            <section>
              <h2 className="font-semibold text-white mb-4">Damage Type</h2>
              <div className="flex flex-wrap gap-2">
                {DAMAGE_TYPES.map((dt) => {
                  const isOn = selectedDamage.includes(dt.id)
                  return (
                    <button
                      key={dt.id}
                      onClick={() => toggleDamage(dt.id)}
                      className={[
                        'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                        isOn
                          ? 'bg-[#FF5722] border-[#FF5722] text-white'
                          : 'border-[#3A3A3A] bg-[#1A1A1A] text-[#707070] hover:border-[#FF5722]/40 hover:text-[#B0B0B0]',
                      ].join(' ')}
                    >
                      {isOn && <X size={12} className="inline mr-1.5" />}
                      {dt.label}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Wheel Size & Finish */}
            <section className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-2">Wheel Size</label>
                <select
                  value={wheelSize}
                  onChange={(e) => setWheelSize(Number(e.target.value))}
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,87,34,0.15)]"
                >
                  {WHEEL_SIZES.map((s) => (
                    <option key={s} value={s}>{s}"</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-2">Current Finish</label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,87,34,0.15)]"
                >
                  {FINISH_TYPES.map((ft) => (
                    <option key={ft.id} value={ft.id}>{ft.label}</option>
                  ))}
                </select>
              </div>
            </section>

            {/* Severity Slider */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-white">Damage Severity</h2>
                <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${severityColor}20`, color: severityColor, border: `1px solid ${severityColor}40` }}>
                  {severityLabel} ({severity}%)
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF5722 ${severity}%, #3A3A3A ${severity}%)`,
                    accentColor: '#FF5722',
                  }}
                />
                <div className="flex justify-between text-xs text-[#707070] mt-1.5">
                  <span>Minimal (light scratches)</span>
                  <span>Moderate</span>
                  <span>Severe (structural)</span>
                </div>
              </div>
            </section>

            {/* Notes */}
            <section>
              <label className="block text-sm font-medium text-[#B0B0B0] mb-2">Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any other details about the damage, your vehicle, access instructions..."
                rows={3}
                className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white text-sm placeholder-[#707070] focus:border-[#FF5722] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,87,34,0.15)] resize-none"
              />
            </section>
          </div>

          {/* Right: Live Estimate */}
          <div className="lg:col-span-1">
            <div className="sticky top-40">
              <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
                  Live Estimate
                </h3>

                {estimate.errors.length > 0 ? (
                  <p className="text-sm text-[#707070]">Add wheel details above.</p>
                ) : (
                  <motion.div
                    key={estimate.total}
                    initial={{ opacity: 0.6, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2.5 text-sm"
                  >
                    {estimate.wheelBreakdowns.map((wb) => (
                      <div key={wb.position} className="flex justify-between text-[#B0B0B0]">
                        <span>Wheel {wb.position}</span>
                        <span className="font-mono">{fmt(wb.total)}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#3A3A3A] pt-2.5 mt-2.5 space-y-2">
                      <div className="flex justify-between text-[#B0B0B0]">
                        <span>Subtotal</span>
                        <span className="font-mono">{fmt(estimate.subtotalWheels)}</span>
                      </div>
                      {estimate.multiWheelDiscount > 0 && (
                        <div className="flex justify-between text-[#4CAF50]">
                          <span>Multi-wheel (10%)</span>
                          <span className="font-mono">-{fmt(estimate.multiWheelDiscount)}</span>
                        </div>
                      )}
                      {estimate.serviceFee > 0 && (
                        <div className="flex justify-between text-[#B0B0B0]">
                          <span>Service fee</span>
                          <span className="font-mono">{fmt(estimate.serviceFee)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#B0B0B0]">
                        <span>GST (5%)</span>
                        <span className="font-mono">{fmt(estimate.gst)}</span>
                      </div>
                    </div>
                    <div className="border-t border-[#3A3A3A] pt-2.5">
                      <div className="flex justify-between font-bold text-white text-base">
                        <span>Total</span>
                        <motion.span
                          key={estimate.total}
                          initial={{ scale: 1.15, color: '#FF9800' }}
                          animate={{ scale: 1, color: '#FF5722' }}
                          transition={{ duration: 0.3 }}
                          className="font-mono"
                        >
                          {fmt(estimate.total)}
                        </motion.span>
                      </div>
                      <p className="text-xs text-[#707070] mt-1">
                        Range: {fmt(estimate.estimatedRange.low)} – {fmt(estimate.estimatedRange.high)}
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="mt-4 p-3 rounded-lg bg-[#2A2A2A] text-xs text-[#707070]">
                  $50 deposit due now. Remainder collected at service completion.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="primary" size="lg" disabled={selectedDamage.length === 0} onClick={handleNext}>
            Continue to Schedule <ChevronRight size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
