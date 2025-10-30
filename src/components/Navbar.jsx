import { useState } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'try', label: 'Try This' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[880px] lg:w-[1040px]"
    >
      <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between shadow-glow">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-violet shadow-glow"></span>
          <span className="font-poppins font-semibold tracking-wide">Anshuman</span>
        </button>

        <nav className="hidden md:flex items-center gap-2">
          {sections.map(s => (
            <Link
              key={s.id}
              to={s.id}
              smooth
              offset={-80}
              duration={600}
              spy
              activeClass="bg-white/10 text-white"
              className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          <div className="w-6 h-0.5 bg-slate-300 mb-1"></div>
          <div className="w-6 h-0.5 bg-slate-300 mb-1"></div>
          <div className="w-6 h-0.5 bg-slate-300"></div>
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 glass rounded-xl p-3">
          <div className="grid grid-cols-2 gap-2">
            {sections.map(s => (
              <Link
                key={s.id}
                to={s.id}
                smooth
                offset={-80}
                duration={600}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  )
}
