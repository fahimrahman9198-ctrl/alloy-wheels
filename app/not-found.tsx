import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Wheel graphic */}
        <div className="flex justify-center mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-30" aria-hidden="true">
            <circle cx="60" cy="60" r="54" stroke="#FF5722" strokeWidth="6" strokeDasharray="12 8" />
            <circle cx="60" cy="60" r="16" fill="#FF5722" fillOpacity="0.3" />
            {[0, 72, 144, 216, 288].map((deg) => {
              const rad = (deg * Math.PI) / 180
              const x2 = 60 + 36 * Math.cos(rad)
              const y2 = 60 + 36 * Math.sin(rad)
              return <line key={deg} x1="60" y1="60" x2={x2} y2={y2} stroke="#FF5722" strokeWidth="4" strokeLinecap="round" />
            })}
          </svg>
        </div>

        <p className="font-mono text-[#FF5722] text-sm font-bold uppercase tracking-widest mb-3">Error 404</p>

        <h1 className="font-montserrat font-black text-6xl sm:text-8xl text-white mb-4">
          4<span className="text-[#FF5722]">0</span>4
        </h1>

        <p className="text-xl text-white font-semibold mb-3">Wheel Not Found</p>
        <p className="text-[#707070] mb-10 max-w-sm mx-auto">
          Looks like this page took a wrong turn. Let's get you back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(255,87,34,0.45)]"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/quote/upload"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722]/10 font-semibold rounded-xl transition-all duration-200"
          >
            Get a Quote <ChevronRight size={18} />
          </Link>
        </div>

        <p className="mt-10 text-xs text-[#707070]">
          Need help?{' '}
          <a href="tel:6042317698" className="text-[#FF5722] hover:text-[#FF7043] transition-colors font-mono">
            604-231-7698
          </a>
        </p>
      </div>
    </div>
  )
}
