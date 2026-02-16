import { motion } from 'framer-motion'
import { staggerContainer, reveal } from '../animations/variants'
import { resume } from '../data/resumeData'
import SkillsGalaxy from './SkillsGalaxy'

export default function Skills() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.h2 variants={reveal(0)} className="text-3xl md:text-4xl font-poppins font-semibold">Skills Galaxy</motion.h2>
          <motion.p variants={reveal(0.1)} className="mt-2 text-slate-400">
            Explore the technologies I use. Drag to rotate.
          </motion.p>

          <motion.div variants={reveal(0.2)}>
            <SkillsGalaxy />
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
