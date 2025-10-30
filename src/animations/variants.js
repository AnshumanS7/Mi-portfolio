// Motion variants used across sections
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}

export const reveal = (delay = 0) => ({
  hidden: { opacity: 0, filter: 'blur(6px)', y: 12 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
})

export const scaleHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { type: 'spring', stiffness: 250, damping: 18 } },
}
