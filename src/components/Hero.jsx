import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import { resume } from '../data/resumeData'
import { fadeInUp, staggerContainer, reveal } from '../animations/variants'
import { Link, scroller } from 'react-scroll'

export default function Hero() {
  const [showHi, setShowHi] = useState(false)
  const [showRocket, setShowRocket] = useState(false)
  const [rocketStart, setRocketStart] = useState({ x: 0, y: 0 })
  const [rocketTravel, setRocketTravel] = useState(0)
  const [rocketDuration, setRocketDuration] = useState(1200)
  const [startScroll, setStartScroll] = useState(0)
  const [endScroll, setEndScroll] = useState(1)
  const [trailPathD, setTrailPathD] = useState('')
  const { scrollY } = useScroll()
  // progress from 0 to 1 across the scroll segment
  const prog = useTransform(scrollY, [startScroll, endScroll], [0, 1])
  // add spring lag to slow down relative to scroll
  const progLag = useSpring(prog, { stiffness: 18, damping: 22, mass: 1.8 })
  // base linear motion
  const xBase = useTransform(progLag, [0, 1], [0, 80])
  const yBase = useTransform(progLag, (t) => rocketTravel * t)
  // curved path offset (sine arch)
  const xCurve = useTransform(progLag, (t) => Math.sin(t * Math.PI) * 120)
  const xRaw = useTransform([xBase, xCurve], ([xb, xc]) => rocketStart.x + xb + xc)
  const yRaw = useTransform(yBase, (y) => rocketStart.y + y)
  // add spring lag to feel slower than scroll
  const xMv = useSpring(xRaw, { stiffness: 45, damping: 22, mass: 1.2 })
  const yMv = useSpring(yRaw, { stiffness: 45, damping: 22, mass: 1.2 })
  const oMv = useTransform(progLag, [0, 0.9, 1], [1, 1, 0])
  // precompute glow offsets (avoid calling hooks inside render conditionally)
  const xGlow = useTransform(xMv, (v) => v - 12)
  const yGlow = useTransform(yMv, (v) => v - 8)
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 shadow-glow relative overflow-hidden grid md:grid-cols-2 gap-8 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <motion.span variants={reveal(0)} className="text-sm text-slate-400">INTRO</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold font-poppins mt-2 leading-tight">
              <span className="gradient-text">{resume.name}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl mt-4 text-slate-300">
              {resume.title}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3 relative">
              {/* View Projects with hover glow and rocket launch */}
              <div className="pointer-events-auto relative">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    // compute starting screen position and travel distance to projects
                    const btnRect = e.currentTarget.getBoundingClientRect()
                    const startX = btnRect.right + 8
                    const startY = btnRect.top + btnRect.height / 2
                    const targetEl = document.querySelector('[name="projects"]')
                    const currentY = window.scrollY
                    let delta = 800 // default travel fallback
                    if (targetEl) {
                      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - 80
                      delta = Math.max(100, targetTop - currentY)
                    }
                    setRocketStart({ x: startX, y: startY })
                    setRocketTravel(delta)
                    setStartScroll(currentY)
                    setEndScroll(currentY + delta)
                    // Build a curved quadratic path from start to end for the trail
                    const endX = startX + 80
                    const endY = startY + delta
                    const cx = (startX + endX) / 2 + 120 // curve outward on x
                    const cy = (startY + endY) / 2 - 80  // arch upward a bit
                    setTrailPathD(`M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`)
                    const duration = 1200
                    setRocketDuration(duration)
                    setShowRocket(true)
                    scroller.scrollTo('projects', { smooth: 'linear', offset: -80, duration })
                    setTimeout(() => setShowRocket(false), duration + 150)
                  }}
                  whileHover={{ boxShadow: '0 0 30px rgba(77,213,255,0.35), 0 0 50px rgba(167,139,250,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-violet text-black font-semibold ring-0 focus:outline-none"
                >
                  View Projects
                </motion.button>

                {/* Rocket moved to top-level */}
              </div>
              {/* Resume link button */}
              <a href={resume.contact.links.resume || resume.contact.links.linkedin} target="_blank" rel="noreferrer" className="pointer-events-auto">
                <button aria-label="Resume" title="Resume" className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition grid place-items-center">
                  {/* File/Resume icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/90">
                    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 13h6M9 16h6M9 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </a>
              <Link to="contact" smooth offset={-80} duration={700} className="pointer-events-auto">
                <button className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
                  Contact Me
                </button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center gap-4"
            >
              <a
                href={resume.contact.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group p-2 rounded-xl glass hover:shadow-glow transition inline-flex"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.983 3.5C4.983 4.60457 4.08757 5.5 2.983 5.5C1.87843 5.5 0.983002 4.60457 0.983002 3.5C0.983002 2.39543 1.87843 1.5 2.983 1.5C4.08757 1.5 4.983 2.39543 4.983 3.5Z" fill="#0A66C2"/>
                  <path d="M1.25 8.25H4.75V22.25H1.25V8.25Z" fill="currentColor" className="text-slate-300 group-hover:text-neon-blue"/>
                  <path d="M8.25 8.25H11.6V10.02H11.65C12.12 9.13 13.31 8.19 15.09 8.19C18.79 8.19 19.5 10.63 19.5 14.02V22.25H16V14.97C16 13.26 15.97 11.07 13.77 11.07C11.55 11.07 11.2 12.93 11.2 14.85V22.25H7.7V8.25H8.25Z" fill="currentColor" className="text-slate-300 group-hover:text-neon-blue"/>
                </svg>
              </a>
              <a
                href={resume.contact.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="group p-2 rounded-xl glass hover:shadow-glow transition inline-flex"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 1.75C6.615 1.75 2.25 6.115 2.25 11.5C2.25 15.77 5.005 19.37 8.84 20.69C9.34 20.78 9.52 20.47 9.52 20.21C9.52 19.98 9.51 19.36 9.51 18.59C7 19.1 6.35 17.66 6.35 17.66C5.9 16.51 5.2 16.2 5.2 16.2C4.24 15.54 5.27 15.56 5.27 15.56C6.33 15.64 6.88 16.66 6.88 16.66C7.83 18.3 9.38 17.83 10 17.57C10.09 16.88 10.37 16.42 10.68 16.18C8.6 15.94 6.41 15.09 6.41 11.6C6.41 10.6 6.77 9.79 7.37 9.17C7.27 8.93 6.95 7.99 7.47 6.69C7.47 6.69 8.23 6.44 9.51 7.41C10.23 7.2 11 7.09 11.77 7.09C12.54 7.09 13.31 7.2 14.03 7.41C15.31 6.44 16.07 6.69 16.07 6.69C16.59 7.99 16.27 8.93 16.17 9.17C16.77 9.79 17.13 10.6 17.13 11.6C17.13 15.1 14.94 15.94 12.86 16.17C13.26 16.48 13.61 17.09 13.61 18.01C13.61 19.28 13.59 20.16 13.59 20.21C13.59 20.47 13.77 20.78 14.27 20.69C18.105 19.37 20.86 15.77 20.86 11.5C20.86 6.115 16.495 1.75 11.11 1.75H12Z" fill="currentColor" className="text-slate-300 group-hover:text-neon-violet"/>
                </svg>
              </a>
              <a
                href={resume.contact.links.leetcode}
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode"
                className="group p-2 rounded-xl glass hover:shadow-glow transition inline-flex"
              >
                <img
                  src="https://simpleicons.org/icons/leetcode.svg"
                  alt="LeetCode"
                  width="26"
                  height="26"
                  className="opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
              </a>
            </motion.div>
          </div>

          <div className="relative justify-self-center">
            {resume.avatar ? (
              <div className="relative">
                {/* Rotating neon ring with stronger glow */}
                <motion.svg
                  className="absolute -inset-6 md:-inset-7 pointer-events-none"
                  viewBox="0 0 120 120"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 360, opacity: 1 }}
                  transition={{ rotate: { duration: 18, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.6 } }}
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4dd5ff" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#ff6ad5" stopOpacity="0.95" />
                    </linearGradient>
                    <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
                      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#ringGlow)">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="url(#ringGrad)" strokeWidth="1.2" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="url(#ringGrad)" strokeOpacity="0.28" strokeWidth="4" />
                  </g>
                </motion.svg>

                <motion.img
                  key={resume.avatar}
                  src={new URL(`../assets/${resume.avatar}`, import.meta.url).href}
                  alt="Profile photo"
                  className="relative z-10 cursor-pointer w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border border-white/10 shadow-glow"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                  whileHover={{ scale: 1.18, rotate: 2 }}
                  onHoverStart={() => setShowHi(true)}
                  onHoverEnd={() => setShowHi(false)}
                />

                {showHi && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="absolute -top-6 -right-6 z-20 px-4 py-1.5 rounded-full text-sm md:text-base font-semibold bg-gradient-to-r from-neon-blue/80 to-neon-violet/80 text-black shadow-glow"
                  >
                    Hi!
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-dashed border-white/15 grid place-items-center text-slate-400">
                Add your photo
              </div>
            )}
            <div className="pointer-events-none absolute -z-10 -inset-6 rounded-[28px] bg-gradient-to-tr from-neon-blue/20 to-neon-violet/20 blur-2xl" />
          </div>

          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-tr from-neon-blue/30 to-neon-violet/30 rounded-full blur-3xl" />
        </motion.div>

        {showRocket && createPortal(
          (
            <motion.div
              style={{ x: xMv, y: yMv, opacity: oMv }}
              className="fixed left-0 top-0 pointer-events-none z-[9999]"
              aria-hidden
            >
              <div className="absolute -left-2 top-2">
                {[...Array(16)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute block rounded-full"
                    style={{
                      width: 7,
                      height: 7,
                      background: i % 2 === 0 ? '#4dd5ff' : '#a78bfa',
                      boxShadow: i % 2 === 0 ? '0 0 14px rgba(77,213,255,0.8), 0 0 22px rgba(77,213,255,0.5)'
                                             : '0 0 14px rgba(167,139,250,0.8), 0 0 22px rgba(167,139,250,0.5)'
                    }}
                    initial={{ x: 0, y: 0, opacity: 0.95, scale: 1 }}
                    animate={{ x: [-8 - i * 5, -22 - i * 7], y: [-6 - i * 1.4, -24 - i * 2.4], opacity: [0.95, 0], scale: [1, 0] }}
                    transition={{ duration: 1.2, delay: i * 0.04, ease: 'easeOut' }}
                  />
                ))}
              </div>
              {/* soft glow trail blob right behind astronaut */}
              <motion.div
                style={{ x: xGlow, y: yGlow, opacity: oMv }}
                className="absolute w-14 h-8 rounded-full blur-2xl"
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(77,213,255,0.6), rgba(167,139,250,0.35), rgba(0,0,0,0))',
                    boxShadow: '0 0 30px rgba(77,213,255,0.45), 0 0 50px rgba(167,139,250,0.35)'
                  }}
                />
              </motion.div>
              {/* Astronaut (running) */}
              <motion.svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="18" r="10" fill="#0ea5e9" opacity="0.2" />
                <circle cx="32" cy="18" r="8" fill="#0b1220" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="1.5" />
                <rect x="27" y="15" width="10" height="6" rx="3" fill="#4dd5ff" opacity="0.95" />
                <rect x="38" y="20" width="8" height="12" rx="3" fill="#a78bfa" opacity="0.9" />
                <path d="M24 28c4-2 16-2 20 0l-2 8H26l-2-8z" fill="#e5e7eb" stroke="#cbd5e1" />
                <motion.g style={{ originX: 26, originY: 28 }} animate={{ rotate: [20, -10, 20] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
                  <path d="M24 28c-4 2-6 6-6 10h6l4-6" fill="#e5e7eb" stroke="#cbd5e1" />
                </motion.g>
                <motion.g style={{ originX: 44, originY: 28 }} animate={{ rotate: [-20, 10, -20] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
                  <path d="M44 28c4 2 6 6 6 10h-6l-4-6" fill="#e5e7eb" stroke="#cbd5e1" />
                </motion.g>
                <motion.g style={{ originX: 28, originY: 40 }} animate={{ rotate: [-25, 10, -25] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
                  <path d="M28 36l-6 10h8l4-6" fill="#e5e7eb" stroke="#cbd5e1" />
                </motion.g>
                <motion.g style={{ originX: 40, originY: 40 }} animate={{ rotate: [25, -10, 25] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
                  <path d="M40 36l6 10h-8l-4-6" fill="#e5e7eb" stroke="#cbd5e1" />
                </motion.g>
              </motion.svg>
            </motion.div>
          ), document.body)}
      </div>
    </section>
  )
}
