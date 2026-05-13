'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { DAMAGE_TYPES, WHEEL_SIZES, FINISH_TYPES } from '@/lib/constants'
import { calculateEstimate, type WheelInput } from '@/lib/pricing'

const POSITIONS = ['FL', 'FR', 'RL', 'RR'] as const
type Pos = (typeof POSITIONS)[number]

export default function QuoteDetailsPage() {
  const router = useRouter()
  const [activeWheels, setActiveWheels] = useState<Pos[]>(['FL'])
  const [damageTypes, setDamageTypes] = useState<string[]>([])
  const [wheelSize, setWheelSize] = useState(18)
  const [finish, setFinish] = useState('silver')
  const [severities, setSeverities] = useState<Record<Pos, number>>({ FL: 40, FR: 40, RL: 40, RR: 40 })

  const fmt = (n: number) => `$${n.toFixed(0)}`

  const wheels: WheelInput[] = activeWheels.map((pos) => ({
    position: pos,
    severity: severities[pos] / 100,
    size: wheelSize,
    finish,
  }))

  const estimate = calculateEstimate({
    wheels,
    region: 'metro_vancouver',
    serviceType: 'mobile',
    isTradeAccount: false,
    isRepeatCustomer: false,
  })

  const handleNext = () => {
    sessionStorage.setItem('quote_details', JSON.stringify({ activeWheels, damageTypes, wheelSize, finish, severities }))
    sessionStorage.setItem('quote_estimate', JSON.stringify(estimate))
    router.push('/quote/location')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Damage Details</h1>
      <p className="text-[#707070] mb-8">Tell us about each wheel so we can estimate the repair cost.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-7">
          {/* Wheel selection */}
          <section>
            <h2 className="font-semibold text-white mb-3">Wheels Needing Repair</h2>
            <div className="grid grid-cols-4 gap-2">
              {POSITIONS.map((pos) => {
                const active = activeWheels.includes(pos)
                return (
                  <button
                    key={pos}
                    onClick={() => setActiveWheels((prev) => active ? (prev.length > 1 ? prev.filter((p) => p !== pos) : prev) : [...prev, pos])}
                    className={['py-2.5 rounded-lg border text-sm font-semibold transition-all', active ? 'border-[#FF5722] bg-[#FF5722]/10 text-[#FF5722]' : 'border-[#3A3A3A] bg-[#1A1A1A] text-[#707070] hover:border-[#FF5722]/40'].join(' ')}
                  >
                    {pos}
                  </button>
                )
              })}
            </div>
            {activeWheels.length > 1 && <p className="text-xs text-[#4CAF50] mt-2">10% multi-wheel discount applied</p>}
          </section>

          {/* Severity per wheel */}
          {activeWheels.map((pos) => {
            const sev = severities[pos]
            const sevLabel = sev < 34 ? 'Minimal' : sev < 67 ? 'Moderate' : 'Severe'
            const sevColor = sev < 34 ? '#4CAF50' : sev < 67 ? '#FFC107' : '#F44336'
            return (
              <section key={pos} className="p-4 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-white">Wheel {pos} Severity</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: sevColor, backgroundColor: `${sevColor}20`, border: `1px solid ${sevColor}40` }}>
                    {sevLabel}
                  </span>
                </div>
                <input
                  type="range" min={0} max={100} value={sev}
                  onChange={(e) => setSeverities((p) => ({ ...p, [pos]: Number(e.target.value) }))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #FF5722 ${sev}%, #3A3A3A ${sev}%)`, accentColor: '#FF5722' }}
                />
                <div className="flex justify-between text-xs text-[#707070] mt-1">
                  <span>Light scuffs</span><span>Moderate</span><span>Structural</span>
                </div>
              </section>
            )
          })}

          {/* Damage types */}
          <section>
            <h2 className="font-semibold text-white mb-3">Damage Types</h2>
            <div className="flex flex-wrap gap-2">
              {DAMAGE_TYPES.map((dt) => {
                const on = damageTypes.includes(dt.id)
                return (
                  <button key={dt.id} onClick={() => setDamageTypes((p) => on ? p.filter((d) => d !== dt.id) : [...p, dt.id])}
                    className={['px-4 py-2 rounded-full text-sm font-medium border transition-all', on ? 'bg-[#FF5722] border-[#FF5722] text-white' : 'border-[#3A3A3A] bg-[#1A1A1A] text-[#707070] hover:border-[#FF5722]/40'].join(' ')}
                  >
                    {dt.label}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Size & Finish */}
          <section className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Wheel Size</label>
              <select value={wheelSize} onChange={(e) => setWheelSize(Number(e.target.value))}
                className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none">
                {WHEEL_SIZES.map((s) => <option key={s} value={s}>{s}"</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Finish Type</label>
              <select value={finish} onChange={(e) => setFinish(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none">
                {FINISH_TYPES.map((ft) => <option key={ft.id} value={ft.id}>{ft.label}</option>)}
              </select>
            </div>
          </section>
        </div>

        {/* Live Estimate */}
        <div>
          <div className="sticky top-40 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
              Live Estimate
            </h3>
            {estimate.errors.length > 0 ? (
              <p className="text-sm text-[#707070]">Select wheels above to see estimate.</p>
            ) : (
              <div className="space-y-2 text-sm">
                {estimate.wheelBreakdowns.map((wb) => (
                  <div key={wb.position} className="flex justify-between text-[#B0B0B0]">
                    <span>Wheel {wb.position}</span>
                    <span className="font-mono">{fmt(wb.total)}</span>
                  </div>
                ))}
                <div className="border-t border-[#3A3A3A] pt-2 mt-2 space-y-1.5">
                  {estimate.multiWheelDiscount > 0 && (
                    <div className="flex justify-between text-[#4CAF50]">
                      <span>Multi-wheel (10%)</span>
                      <span className="font-mono">-{fmt(estimate.multiWheelDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#B0B0B0]">
                    <span>GST (5%)</span>
                    <span className="font-mono">{fmt(estimate.gst)}</span>
                  </div>
                </div>
                <div className="border-t border-[#3A3A3A] pt-2">
                  <div className="flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span className="font-mono text-[#FF5722]">{fmt(estimate.total)}</span>
                  </div>
                  <p className="text-xs text-[#707070] mt-1">Range: {fmt(estimate.estimatedRange.low)} – {fmt(estimate.estimatedRange.high)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="primary" size="lg" disabled={damageTypes.length === 0} onClick={handleNext}>
          Continue to Location <ChevronRight size={18} />
        </Button>
      </div>
    </motion.div>
  )
}
