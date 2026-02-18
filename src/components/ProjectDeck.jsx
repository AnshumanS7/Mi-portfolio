import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resume } from '../data/resumeData'

export default function ProjectDeck() {
    const [selectedIndex, setSelectedIndex] = useState(null)
    const projects = resume.projects

    return (
        <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center">
            {/* Click backdrop to close */}
            {selectedIndex !== null && (
                <div
                    className="absolute inset-0 z-40 bg-black/20"
                    onClick={() => setSelectedIndex(null)}
                />
            )}

            <div className="relative w-full max-w-4xl flex justify-center items-center">
                <AnimatePresence>
                    {projects.map((project, index) => {
                        const isSelected = selectedIndex === index
                        const isOtherSelected = selectedIndex !== null && selectedIndex !== index

                        // Fan calculations
                        const center = (projects.length - 1) / 2
                        const dist = index - center
                        const rotate = dist * 5
                        const x = dist * (window.innerWidth < 768 ? 20 : 40)
                        const y = Math.abs(dist) * 10

                        return (
                            <motion.div
                                key={project.name}
                                layoutId={`card-${project.name}`}
                                onClick={() => setSelectedIndex(isSelected ? null : index)}
                                initial={false}
                                animate={{
                                    x: isSelected ? 0 : x,
                                    y: isSelected ? 0 : y,
                                    rotate: isSelected ? 0 : rotate,
                                    scale: isSelected ? 1.1 : (isOtherSelected ? 0.9 : 1),
                                    zIndex: isSelected ? 50 : index,
                                    opacity: isOtherSelected ? 0.3 : 1
                                }}
                                whileHover={!isSelected && !isOtherSelected ? {
                                    y: y - 30,
                                    rotate: rotate,
                                    scale: 1.1,
                                    zIndex: 40,
                                    transition: { duration: 0.2 }
                                } : {}}
                                className={`absolute cursor-pointer w-56 h-80 md:w-80 md:h-[450px] rounded-2xl p-6 border transition-shadow duration-300
                    ${isSelected
                                        ? 'bg-slate-900/95 border-neon-blue shadow-[0_0_50px_rgba(77,213,255,0.3)]'
                                        : 'bg-slate-800/80 border-white/10 shadow-xl hover:shadow-glow hover:border-white/30 backdrop-blur-sm'
                                    }
                `}
                                style={{
                                    transformOrigin: 'bottom center'
                                }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
                                    <img
                                        src={new URL(`../assets/${project.img}`, import.meta.url).href}
                                        alt={project.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                                    />
                                    <div className={`absolute inset-0 ${isSelected ? 'bg-slate-900/80' : 'bg-slate-900/60 group-hover:bg-slate-900/40'} transition-colors`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                                </div>

                                {/* Content Container */}
                                <div className="relative z-10 h-full flex flex-col items-center text-center pt-8 p-6">

                                    <h3 className={`font-bold font-poppins text-xl mb-2 ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                                        {project.name}
                                    </h3>

                                    {/* Tech Stack (Compact) */}
                                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                                        {project.stack.slice(0, 3).map(s => (
                                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                                                {s}
                                            </span>
                                        ))}
                                        {project.stack.length > 3 && <span className="text-[10px] text-slate-500">+{project.stack.length - 3}</span>}
                                    </div>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                                                    {project.desc}
                                                </p>

                                                <a
                                                    href={project.url || resume.contact.links.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-violet text-black font-bold text-sm hover:shadow-glow transition-transform hover:scale-105"
                                                >
                                                    View Project
                                                </a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Hint when collapsed */}
                                    {!isSelected && (
                                        <div className="mt-auto text-xs text-slate-500 font-mono">
                                            TAP TO VIEW
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    )
}
