import { motion } from 'framer-motion'
import { reveal, staggerContainer } from '../animations/variants'
import { resume } from '../data/resumeData'

export default function About() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={reveal(0)} className="text-3xl md:text-4xl font-poppins font-semibold">About</motion.h2>
          <motion.p variants={reveal(0.1)} className="mt-4 text-slate-300 leading-relaxed">
            I'm a software developer focused on building immersive frontends and scalable cloud-native systems.
            I thrive at the intersection of React, DevOps, and AWS—crafting delightful experiences powered by robust infra.
          </motion.p>

          <motion.div variants={reveal(0.2)} className="mt-8 grid md:grid-cols-2 gap-4">
            {resume.education.map((e) => (
              <div key={e.school} className="glass rounded-xl p-4">
                <div className="font-semibold">{e.school}</div>
                <div className="text-sm text-slate-400">{e.degree}</div>
                <div className="text-sm text-slate-400">{e.meta}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
