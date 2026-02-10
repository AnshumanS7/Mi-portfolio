import { useMemo, useState } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'
import { reveal } from '../animations/variants'
import { resume } from '../data/resumeData'
import SpotlightCard from './SpotlightCard'

export default function Projects() {
  const projects = resume.projects
  const [hovered, setHovered] = useState(null)
  const [locked, setLocked] = useState(null)
  const [time, setTime] = useState(0)

  const nodes = useMemo(() => {
    const N = projects.length
    const radius = 220 // single ring radius px
    const speed = 0.0002 // radians per ms; clockwise
    return projects.map((p, i) => {
      const base = (2 * Math.PI * i) / N - Math.PI / 2
      const angle = base - time * speed
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle) * 0.92 // slight ellipse for depth
      return { ...p, i, x, y, base, angle }
    })
  }, [projects, time])

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2 variants={reveal(0)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="text-3xl md:text-4xl font-poppins font-semibold">Projects</motion.h2>

        <div className="mt-10 grid place-items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[420px] h-[420px] md:w-[500px] md:h-[500px]"
          >
            {useAnimationFrame((t, delta) => {
              const paused = hovered != null || locked != null
              if (!paused) {
                setTime((prev) => prev + delta)
              }
            })}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(77,213,255,0.18), 0 0 50px rgba(167,139,250,0.14)',
                  '0 0 50px rgba(77,213,255,0.28), 0 0 80px rgba(167,139,250,0.22)',
                  '0 0 30px rgba(77,213,255,0.18), 0 0 50px rgba(167,139,250,0.14)'
                ],
                scale: [1, 1.01, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-10 rounded-full border-2 border-white/20"
              animate={{
                boxShadow: [
                  '0 0 26px rgba(77,213,255,0.16), 0 0 44px rgba(167,139,250,0.12)',
                  '0 0 44px rgba(77,213,255,0.26), 0 0 70px rgba(167,139,250,0.2)',
                  '0 0 26px rgba(77,213,255,0.16), 0 0 44px rgba(167,139,250,0.12)'
                ],
                scale: [1, 1.012, 1]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
            <motion.div
              className="absolute inset-20 rounded-full border-2 border-white/20"
              animate={{
                boxShadow: [
                  '0 0 22px rgba(77,213,255,0.14), 0 0 38px rgba(167,139,250,0.1)',
                  '0 0 38px rgba(77,213,255,0.22), 0 0 60px rgba(167,139,250,0.18)',
                  '0 0 22px rgba(77,213,255,0.14), 0 0 38px rgba(167,139,250,0.1)'
                ],
                scale: [1, 1.008, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />

            {nodes.map((n) => {
              const isActive = hovered === n.i || locked === n.i
              return (
                <motion.button
                  key={n.name}
                  onMouseEnter={() => setHovered(n.i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setLocked((prev) => prev === n.i ? null : n.i)}
                  animate={{ scale: isActive ? 1.18 : 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `calc(50% + ${n.x}px)`, top: `calc(50% + ${n.y}px)` }}
                  aria-label={n.name}
                >
                  <div className="absolute -inset-4 rounded-full blur-2xl" style={{
                    background: isActive ? 'radial-gradient(circle, rgba(77,213,255,0.26) 0%, rgba(167,139,250,0.2) 40%, rgba(0,0,0,0) 70%)' : 'transparent'
                  }} />
                  <div className={`relative size-14 md:size-16 rounded-full grid place-items-center border ${isActive ? 'bg-gradient-to-br from-neon-blue/30 to-neon-violet/30 border-white/20 shadow-glow' : 'bg-white/5 border-white/10'} transition`}>
                    <span className="w-2 h-2 rounded-full bg-neon-blue/80" />
                  </div>
                  {(() => {
                    const len = Math.hypot(n.x, n.y) || 1
                    const ox = (n.x / len) * 10
                    const oy = (n.y / len) * 10
                    return (
                      <div
                        className={`mt-2 text-xs md:text-sm text-center w-28 -ml-7 ${isActive ? 'text-white' : 'text-slate-400'}`}
                        style={{ transform: `translate(${ox}px, ${oy}px)` }}
                      >
                        {n.name}
                      </div>
                    )
                  })()}
                </motion.button>
              )
            })}

            {/* Orbit line removed per request */}

            {/* Center detail card (pinned when locked, otherwise on hover) */}
            {(locked != null || hovered != null) && (
              <SpotlightCard
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-4 w-[260px] md:w-[300px] text-center"
                animate={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                {(() => {
                  const idx = locked != null ? locked : hovered
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {locked != null && (
                            <span className="inline-flex items-center gap-1 text-neon-blue text-xs">
                              {/* Pin icon */}
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 3l7 7-2 2-2-2-5 5 2 2-2 2-6-6 2-2 2 2 5-5-2-2 2-2z" fill="currentColor" />
                              </svg>
                              Pinned
                            </span>
                          )}
                        </div>
                        {locked != null && (
                          <button
                            onClick={() => setLocked(null)}
                            className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white"
                            aria-label="Close pinned card"
                            title="Unpin"
                          >
                            {/* Close (X) icon */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="font-semibold">{projects[idx].name}</div>
                      <div className="mt-1 text-xs text-slate-400">{projects[idx].desc}</div>
                      <div className="mt-3 flex flex-wrap gap-1 justify-center">
                        {projects[idx].stack.map(s => (
                          <span key={s} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10">{s}</span>
                        ))}
                      </div>
                      <a
                        href={projects[idx].url || resume.contact.links.github}
                        target="_blank" rel="noreferrer"
                        className="inline-block mt-3 text-neon-blue text-xs hover:underline"
                      >
                        View on GitHub →
                      </a>
                    </div>
                  )
                })()}
              </SpotlightCard>
            )}
          </motion.div>
          {hovered == null && (
            <div className="mt-10 text-center text-slate-400/60 text-sm">Hover a node to preview</div>
          )}
        </div>
      </div>
    </section>
  )
}
