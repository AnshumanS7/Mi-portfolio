import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Aperture({ onOpen, onOpenStart, onShakeEnd }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isGone, setIsGone] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
        if (onOpenStart) onOpenStart()

        // Stop shaking after 3s (initial impact)
        setTimeout(() => {
            if (onShakeEnd) onShakeEnd()
        }, 3000)

        setTimeout(() => {
            setIsGone(true)
            if (onOpen) onOpen()
        }, 10000) // Match 10s animation exactly
    }

    if (isGone) return null

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center ${isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}>

            {/* Northern Triangle */}
            <motion.div
                animate={isOpen ? { y: '-100%' } : { y: 0 }}
                transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-900 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(77,213,255,0.1))]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)', zIndex: 51 }}
            />

            {/* Eastern Triangle */}
            <motion.div
                animate={isOpen ? { x: '100%' } : { x: 0 }}
                transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-900 bg-[linear-gradient(to_left,rgba(0,0,0,0),rgba(167,139,250,0.1))]"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)', zIndex: 52 }}
            />

            {/* Southern Triangle */}
            <motion.div
                animate={isOpen ? { y: '100%' } : { y: 0 }}
                transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-900 bg-[linear-gradient(to_top,rgba(0,0,0,0),rgba(255,106,213,0.1))]"
                style={{ clipPath: 'polygon(100% 100%, 0 100%, 50% 50%)', zIndex: 53 }}
            />

            {/* Western Triangle */}
            <motion.div
                animate={isOpen ? { x: '-100%' } : { x: 0 }}
                transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-900 bg-[linear-gradient(to_right,rgba(0,0,0,0),rgba(77,213,255,0.1))]"
                style={{ clipPath: 'polygon(0 100%, 0 0, 50% 50%)', zIndex: 54 }}
            />

            {/* Central Trigger Button */}
            {!isOpen && (
                <div className="absolute z-[60] flex items-center justify-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute bottom-24 md:bottom-32 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 font-bold text-2xl md:text-5xl tracking-wider uppercase drop-shadow-[0_0_10px_rgba(77,213,255,0.5)] whitespace-nowrap"
                        style={{ fontFamily: '"Europa Grotesk SH", sans-serif' }}
                    >
                        Press <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, color: ['#67e8f9', '#d8b4fe', '#67e8f9'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="inline-block mx-2"
                        >ENTER</motion.span> to see my world
                    </motion.p>

                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleOpen}
                        className="relative w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center cursor-pointer group shadow-[0_0_50px_rgba(77,213,255,0.2)]"
                    >
                        <div className="absolute inset-0 rounded-full border-2 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin" />
                        <span className="text-xs font-bold tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                            ENTER
                        </span>
                    </motion.button>
                </div>
            )}

        </div>
    )
}
