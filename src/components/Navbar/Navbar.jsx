import React, { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('home')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = ['home','about','skills','projects','experience','contact']
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(ids[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner container">
        <button className="nav-logo" onClick={() => handleNav('#home')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">SUTM</span>
          <span className="logo-bracket">/&gt;</span>
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <button
                className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
                onClick={() => handleNav(link.href)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button className="btn btn-primary nav-cta" onClick={() => handleNav('#contact')}>
              Hire Me
            </button>
          </li>
        </ul>

        <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
