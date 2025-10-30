import { motion } from 'framer-motion'
import { staggerContainer, reveal } from '../animations/variants'
import { resume } from '../data/resumeData'

export default function Certifications() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.h2 variants={reveal(0)} className="text-3xl md:text-4xl font-poppins font-semibold">Certifications</motion.h2>
          <motion.ul variants={reveal(0.1)} className="mt-6 grid gap-3">
            {resume.certs.map((c, i) => (
              <li key={i} className="glass rounded-lg p-4">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neon-blue hover:underline"
                >
                  {c.title} →
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
