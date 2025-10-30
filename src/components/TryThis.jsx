import { motion } from 'framer-motion'
import { reveal, staggerContainer } from '../animations/variants'

export default function TryThis() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={reveal(0)} className="text-3xl md:text-4xl font-poppins font-semibold">Try this in your terminal:</motion.h2>
          <motion.div variants={reveal(0.1)} className="mt-6 glass rounded-xl p-5">
            <pre className="whitespace-pre-wrap text-neon-blue text-sm md:text-base select-all">
{`npx anshuman`}
            </pre>
            <div className="mt-3 text-slate-400 text-sm">Runs an interactive CLI portfolio in your terminal.</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
