import { motion } from "framer-motion";

export default function RobotTrigger({ onClick }) {
    return (
        <motion.div
            className="absolute top-20 -right-20 md:-right-32 z-50 cursor-pointer group"
            onClick={onClick}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Robot Head SVG */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800/80 backdrop-blur-md rounded-2xl border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] relative overflow-hidden">
                {/* Antenna */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-400">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                </div>

                {/* Eyes */}
                <div className="flex gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-blink" />
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-blink" />
                </div>

                {/* Mouth */}
                <div className="absolute bottom-3 w-6 h-1 bg-white/50 rounded-full" />
            </div>

            {/* Chatting? Bubble */}
            <motion.div
                className="absolute -top-12 -left-4 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="relative bg-white text-slate-900 px-3 py-1.5 rounded-xl rounded-br-none shadow-lg border border-cyan-400/50 text-xs font-bold whitespace-nowrap">
                    Chatting? 🤖
                </div>
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white rounded-full" />
            </motion.div>

        </motion.div>
    );
}
