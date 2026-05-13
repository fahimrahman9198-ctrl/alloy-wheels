'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Calendar, MessageSquare, Phone, Clock, MapPin, User, Truck, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

interface BookingData {
  name: string
  email: string
  phone: string
  address: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  date: string
  time: string
}

export default function BookConfirmedPage() {
  const [booking, setBooking] = useState<BookingData | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('book_confirmed')
    if (data) setBooking(JSON.parse(data))
  }, [])

  const TIME_LABEL: Record<string, string> = {
    morning_1: '8:00 AM',
    morning_2: '10:00 AM',
    afternoon_1: '12:00 PM',
    afternoon_2: '2:00 PM',
    afternoon_3: '4:00 PM',
  }

  const BOOKING_DETAILS = [
    { icon: <User size={15} />, label: 'Technician', value: 'Mike Johnson' },
    { icon: <Truck size={15} />, label: 'Vehicle', value: 'AWC-04' },
    { icon: <Calendar size={15} />, label: 'Date', value: booking?.date ?? 'TBD' },
    { icon: <Clock size={15} />, label: 'Time', value: booking ? TIME_LABEL[booking.time] ?? booking.time : 'TBD' },
    { icon: <MapPin size={15} />, label: 'Address', value: booking?.address ?? 'TBD' },
  ]

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full text-center"
      >
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 rounded-full bg-[#4CAF50]/15 border border-[#4CAF50]/40 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-[#4CAF50]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Badge variant="success" size="md" className="mb-4">Booking Confirmed</Badge>
          <h1 className="font-montserrat font-black text-4xl text-white mb-3">
            You're All Set!
          </h1>
          <p className="text-[#B0B0B0] mb-8">
            We've sent a confirmation to{' '}
            <span className="text-white font-medium">{booking?.email ?? 'your email'}</span>.
            Your technician will arrive at the scheduled time.
          </p>

          {/* Booking details card */}
          <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 mb-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">Booking Details</h2>
              <span className="font-mono text-xs text-[#FF5722]">AWC-2411</span>
            </div>
            <div className="space-y-3">
              {BOOKING_DETAILS.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#2A2A2A] flex items-center justify-center text-[#707070] shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-[#707070]">{item.label}</span>
                    <span className="text-sm font-medium text-white">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {booking && (
              <div className="mt-4 pt-4 border-t border-[#3A3A3A]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#2A2A2A] flex items-center justify-center text-[#707070]">
                    <User size={15} />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-[#707070]">Vehicle</span>
                    <span className="text-sm font-medium text-white">
                      {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* $50 deposit badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex-1 h-px bg-[#3A3A3A]" />
            <span className="text-sm text-[#707070] px-3">$50 deposit charged · Remainder due at service</span>
            <div className="flex-1 h-px bg-[#3A3A3A]" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button variant="secondary" size="md" className="flex-1">
              <Calendar size={15} />
              Add to Calendar
            </Button>
            <Button variant="secondary" size="md" className="flex-1">
              <MessageSquare size={15} />
              SMS Reminder
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button variant="ghost" size="md" className="flex-1">
              <RotateCcw size={15} />
              Reschedule
            </Button>
            <Button variant="danger" size="md" className="flex-1">
              Cancel Booking
            </Button>
          </div>

          {/* Call */}
          <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-4 flex items-center justify-between">
            <div className="text-sm text-[#707070]">Questions? Call us directly</div>
            <a href="tel:6042317698" className="flex items-center gap-2 text-[#FF5722] font-mono font-semibold hover:text-[#FF7043] transition-colors">
              <Phone size={14} />
              604-231-7698
            </a>
          </div>

          <div className="mt-6">
            <Link href="/">
              <Button variant="ghost" size="md">Return to Home</Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
