import { motion } from 'framer-motion'
import { reveal } from '../animations/variants'
import ProjectDeck from './ProjectDeck'

export default function Projects() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={reveal(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-poppins font-bold">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-slate-400 mt-4">Pick a card to explore</p>
        </motion.div>

        <ProjectDeck />
      </div>
    </section>
  )
}
