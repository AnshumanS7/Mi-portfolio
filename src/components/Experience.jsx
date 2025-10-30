import { motion } from 'framer-motion'
import { reveal, staggerContainer } from '../animations/variants'
import { resume } from '../data/resumeData'

export default function Experience() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={reveal(0)} className="text-3xl md:text-4xl font-poppins font-semibold">Experience</motion.h2>
          {resume.experience.map((exp) => (
            <motion.div key={exp.company} variants={reveal(0.1)} className="mt-6 glass rounded-xl p-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-semibold">{exp.role}</div>
                <div className="text-slate-400">· {exp.company}</div>
                <div className="ml-auto text-sm text-slate-400">{exp.period}</div>
              </div>
              <ul className="mt-4 grid gap-2 list-disc list-inside text-slate-300">
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
