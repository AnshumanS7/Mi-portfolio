import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { reveal, staggerContainer } from '../animations/variants'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // TODO: Replace placeholders with your EmailJS values
      // Create a .env file in project root with:
      // VITE_EMAILJS_SERVICE=...
      // VITE_EMAILJS_TEMPLATE=...
      // VITE_EMAILJS_PUBLIC=...
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        {
          name: e.target.name.value,          // matches {{name}}
          email: e.target.email.value,        // you can use this for Reply-To
          message: e.target.message.value,    // matches {{message}}
          time: new Date().toLocaleString(),  // matches {{time}}
        },
        import.meta.env.VITE_EMAILJS_PUBLIC
      )
      setSent(true)
      e.target.reset()
    } catch (err) {
      alert('Failed to send. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.h2 variants={reveal(0)} className="text-3xl md:text-4xl font-poppins font-semibold">Contact</motion.h2>
          <motion.p variants={reveal(0.05)} className="mt-2 text-slate-400">Have an opportunity or idea? Let's build it.</motion.p>
          <motion.form variants={reveal(0.1)} onSubmit={onSubmit} className="mt-6 glass rounded-2xl p-6 grid gap-4">
            <input name="name" placeholder="Your name" required className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none" />
            <input type="email" name="email" placeholder="Your email" required className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none" />
            <textarea name="message" placeholder="Your message" rows="5" required className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none" />
            <button disabled={loading} className="px-5 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-violet text-black font-semibold disabled:opacity-60">
              {loading ? 'Sending…' : sent ? 'Sent! ✅' : 'Send Message'}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
