import React from 'react'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import './Footer.css'

const NAV = [
  { label:'Home',       id:'home' },
  { label:'About',      id:'about' },
  { label:'Skills',     id:'skills' },
  { label:'Projects',   id:'projects' },
  { label:'Experience', id:'experience' },
  { label:'Contact',    id:'contact' },
]

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <button className="footer-logo" onClick={() => scrollTo('home')}>
              <span className="logo-bracket">&lt;</span>
              <span className="logo-name">SUTM</span>
              <span className="logo-bracket">/&gt;</span>
            </button>
            <p className="footer-tagline">
              Building secure, scalable digital experiences.<br/>
              Open to full-time &amp; freelance roles.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/SALMANUDDIN-TALHA-MOHD"          target="_blank" rel="noopener noreferrer" className="footer-social" title="GitHub"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/mohd-salmanuddin-talha/" target="_blank" rel="noopener noreferrer" className="footer-social" title="LinkedIn"><FiLinkedin /></a>
              <a href="#"                                                    target="_blank" rel="noopener noreferrer" className="footer-social" title="Twitter (Coming Soon)"><FiTwitter /></a>
            </div>
          </div>

          {/* Nav */}
          <div className="footer-nav-col">
            <div className="footer-col-label">Navigation</div>
            <ul>
              {NAV.map(n => (
                <li key={n.id}>
                  <button className="footer-link" onClick={() => scrollTo(n.id)}>{n.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="footer-nav-col">
            <div className="footer-col-label">Built With</div>
            <ul>
              {['React + Vite','CSS3 Animations','3D Terminal','Web3Forms','Vercel'].map(t => (
                <li key={t}><span className="footer-tech">{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
