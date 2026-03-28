import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/Cursor'
import Loader from './components/Loader'

function useSectionReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section')
    sections.forEach(s => { if (!s.classList.contains('section-fade')) s.classList.add('section-fade') })
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useSectionReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <Loader />

  return (
    <div className="page-wrapper">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
