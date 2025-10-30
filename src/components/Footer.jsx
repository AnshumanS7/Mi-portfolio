export default function Footer() {
  return (
    <footer className="relative z-10 py-10 text-center text-sm text-slate-400">
      <div className="max-w-5xl mx-auto px-6">
        <div>© {new Date().getFullYear()} Anshuman Singh. Built with React, Tailwind, Framer Motion.</div>
      </div>
    </footer>
  )
}
