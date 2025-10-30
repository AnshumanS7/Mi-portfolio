import { motion } from 'framer-motion'
import { staggerContainer, reveal } from '../animations/variants'
import { resume } from '../data/resumeData'

function Pill({ children }) {
  return <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">{children}</span>
}

export default function Skills() {
  const s = resume.skills
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.h2 variants={reveal(0)} className="text-3xl md:text-4xl font-poppins font-semibold">Skills</motion.h2>
          <motion.div variants={reveal(0.1)} className="mt-6 grid sm:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-5">
              <div className="font-semibold">Languages</div>
              <div className="mt-3 flex flex-wrap gap-2">{s.languages.map(x => <Pill key={x}>{x}</Pill>)}</div>
            </div>
            <div className="glass rounded-xl p-5">
              <div className="font-semibold">Frameworks</div>
              <div className="mt-3 flex flex-wrap gap-2">{s.frameworks.map(x => <Pill key={x}>{x}</Pill>)}</div>
            </div>
            <div className="glass rounded-xl p-5">
              <div className="font-semibold">DevOps</div>
              <div className="mt-3 flex flex-wrap gap-2">{s.devops.map(x => <Pill key={x}>{x}</Pill>)}</div>
            </div>
            <div className="glass rounded-xl p-5">
              <div className="font-semibold">Databases</div>
              <div className="mt-3 flex flex-wrap gap-2">{s.databases.map(x => <Pill key={x}>{x}</Pill>)}</div>
            </div>
            <div className="glass rounded-xl p-5">
              <div className="font-semibold">Tools</div>
              <div className="mt-3 flex flex-wrap gap-2">{s.tools.map(x => <Pill key={x}>{x}</Pill>)}</div>
            </div>
            <div className="glass rounded-xl p-5">
              <div className="font-semibold">Styling</div>
              <div className="mt-3 flex flex-wrap gap-2">{s.styling.map(x => <Pill key={x}>{x}</Pill>)}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
