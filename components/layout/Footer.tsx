import Link from 'next/link'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'

const QUICK_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/contact', label: 'Contact' },
  { href: '/book/region', label: 'Book Appointment' },
  { href: '/quote/upload', label: 'Get a Quote' },
]

const REGIONS = [
  { name: 'Metro Vancouver', phone: '604-231-7698', href: 'tel:6042317698' },
  { name: 'Fraser Valley', phone: '604-889-0032', href: 'tel:6048890032' },
  { name: 'Vancouver Island', phone: '250-555-0199', href: 'tel:2505550199' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#3A3A3A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="#FF5722" strokeWidth="2.5" />
                <circle cx="16" cy="16" r="4" fill="#FF5722" />
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                  const rad = (deg * Math.PI) / 180
                  const x2 = 16 + 10 * Math.sin(rad)
                  const y2 = 16 - 10 * Math.cos(rad)
                  return (
                    <line
                      key={deg}
                      x1="16"
                      y1="16"
                      x2={x2}
                      y2={y2}
                      stroke="#FF5722"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )
                })}
              </svg>
              <span className="font-black text-xl text-white tracking-widest font-montserrat">
                <span className="text-[#FF5722]">A</span>WR
              </span>
            </div>
            <p className="text-sm text-[#707070] leading-relaxed mb-4 max-w-xs">
              BC's most trusted alloy wheel repair and refinishing specialists. ICBC accredited, Red Seal certified, serving Metro Vancouver, Fraser Valley, and Vancouver Island since 2003.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#707070]">
              <Clock size={13} />
              <span>Mon–Fri 7:30 AM – 6:00 PM · Sat 8:00 AM – 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#707070] mt-2">
              <Mail size={13} />
              <a href="mailto:info@awrbc.ca" className="hover:text-[#FF5722] transition-colors">
                info@awrbc.ca
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#707070] hover:text-[#FF5722] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Regions */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Service Regions
            </h3>
            <ul className="space-y-4">
              {REGIONS.map((region) => (
                <li key={region.name}>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium">{region.name}</p>
                      <a
                        href={region.href}
                        className="text-sm text-[#FF5722] hover:text-[#FF7043] transition-colors font-mono"
                      >
                        {region.phone}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-[#3A3A3A]">
              <p className="text-xs text-[#707070] mb-1">ICBC Accredited Repair Facility</p>
              <p className="text-xs text-[#707070]">Red Seal Certified Technicians</p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-1 text-xs bg-[#2A2A2A] border border-[#3A3A3A] rounded text-[#B0B0B0]">
                  ICBC ✓
                </span>
                <span className="px-2 py-1 text-xs bg-[#2A2A2A] border border-[#3A3A3A] rounded text-[#B0B0B0]">
                  Red Seal ✓
                </span>
                <span className="px-2 py-1 text-xs bg-[#2A2A2A] border border-[#3A3A3A] rounded text-[#B0B0B0]">
                  22 Years ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#3A3A3A] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#707070]">
            © 2026 Alloy Wheel Repair Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-[#707070] hover:text-[#FF5722] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#707070] hover:text-[#FF5722] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
