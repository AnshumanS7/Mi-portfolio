import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Avatar({ src, srcPleads, alt = "Avatar" }) {
    const [isPleading, setIsPleading] = useState(false);
    return (
        <motion.div
            onClick={() => setIsPleading(!isPleading)}
            className="relative w-80 h-80 md:w-96 md:h-96 cursor-pointer z-50"
            whileHover={{ scale: 1.1 }} // Scale parent for reliable zoom
            whileTap={{ scale: 0.95 }}
        >
            {/* Content Container */}
            <div className="relative w-full h-full group">
                {/* Glow Effect - Adjusted to be behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-full" />

                {/* Happy Effect Overlay (Sun/Sparkles) */}
                {!isPleading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 rounded-full"
                    >
                        {/* Rotating Sun Rays */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-20%] bg-gradient-to-tr from-yellow-400/10 via-orange-400/5 to-transparent rounded-full blur-xl opacity-60"
                            style={{
                                background: "conic-gradient(from 0deg at 50% 50%, rgba(255, 215, 0, 0.2) 0deg, transparent 60deg, rgba(255, 215, 0, 0.2) 120deg, transparent 180deg, rgba(255, 215, 0, 0.2) 240deg, transparent 300deg, rgba(255, 215, 0, 0.2) 360deg)"
                            }}
                        />
                        {/* Occasional Sparkles */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`sparkle-${i}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                    y: [Math.random() * 200 - 100, Math.random() * 200 - 100]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 2,
                                    delay: Math.random() * 2
                                }}
                                className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-200 rounded-full blur-[1px] shadow-[0_0_10px_rgba(255,255,0,0.8)]"
                            />
                        ))}
                    </motion.div>
                )}

                {/* The Image */}
                <motion.img
                    key={isPleading ? 'plead' : 'normal'}
                    src={isPleading && srcPleads ? srcPleads : src}
                    alt={alt}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover rounded-full drop-shadow-[0_0_15px_rgba(77,213,255,0.4)]"
                />

                {/* Rain Effect Overlay */}
                {isPleading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 pointer-events-none rounded-full overflow-hidden"
                    >
                        {/* Raindrops */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -20, x: Math.random() * 300, opacity: 0 }}
                                animate={{
                                    y: 400,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 0.8 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: Math.random() * 1,
                                    ease: "linear"
                                }}
                                className="absolute top-0 w-[1px] h-4 bg-blue-200/60"
                            />
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Prompt Cloud (Before Click) */}
            {!isPleading && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute -top-4 -left-2 pointer-events-none"
                >
                    <div className="relative bg-slate-900/90 backdrop-blur-xl text-cyan-100 px-3 py-1.5 rounded-lg border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] text-[10px] font-bold tracking-wide uppercase whitespace-nowrap z-10">
                        Hi, Click me!
                    </div>
                    {/* Cloud Bubbles Tail */}
                    <div className="absolute -bottom-1 right-3 w-1.5 h-1.5 bg-slate-900/90 rounded-full border border-cyan-500/50 z-0" />
                    <div className="absolute -bottom-2 right-2 w-1 h-1 bg-slate-900/90 rounded-full border border-cyan-500/50 z-0" />
                </motion.div>
            )}

            {/* Thinking Cloud (After Click) */}
            {isPleading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0, y: 20, x: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 10 }}
                    className="absolute -top-12 right-0 md:-top-6 md:-right-4 pointer-events-none w-full flex justify-end pr-4 md:block md:w-auto md:pr-0"
                >
                    <div className="relative bg-slate-900/90 backdrop-blur-xl text-cyan-300 px-3 py-2 rounded-lg border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] font-bold text-xs tracking-wide uppercase whitespace-nowrap z-10">
                        Please Hire me!
                    </div>
                    {/* Cloud Bubbles Tail - Mobile Right vs Desktop Right */}
                    <div className="absolute -bottom-1 right-8 md:left-4 md:right-auto w-2 h-2 bg-slate-900/90 rounded-full border border-cyan-400 z-0" />
                    <div className="absolute -bottom-3 right-10 md:left-3 md:right-auto w-1 h-1 bg-slate-900/90 rounded-full border border-cyan-400 z-0" />
                </motion.div>
            )}
        </motion.div>
    );
}
