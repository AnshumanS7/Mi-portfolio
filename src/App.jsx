import { useEffect } from 'react'
import { Element, scroller } from 'react-scroll'
import { ReactLenis } from '@studio-freight/react-lenis'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import TryThis from './components/TryThis.jsx'
import Skills from './components/Skills.jsx'
import Certifications from './components/Certifications.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'

function App() {
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '')
    if (hash) {
      scroller.scrollTo(hash, { smooth: true, duration: 700, offset: -80 })
    }
  }, [])

  return (
    <ReactLenis root>
      <div className="relative min-h-screen bg-grid-glow">
        <div className="noise-overlay" />
        <BackgroundFX />
        <Navbar />
        <main className="relative z-10">
          <Element name="home"><Hero /></Element>
          <Element name="about"><About /></Element>
          <Element name="experience"><Experience /></Element>
          <Element name="projects"><Projects /></Element>
          <Element name="try"><TryThis /></Element>
          <Element name="skills"><Skills /></Element>
          <Element name="certifications"><Certifications /></Element>
          <Element name="contact"><Contact /></Element>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
