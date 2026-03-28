import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiDownload } from 'react-icons/fi'
import './About.css'

const BUBBLES = Array.from({ length: 10 }, (_, i) => ({
  id: i, x: Math.random() * 100, size: Math.random() * 55 + 18,
  dur: Math.random() * 13 + 7, delay: Math.random() * 8, opacity: Math.random() * 0.055 + 0.015,
}))

function LanyardCard({ sectionVisible }) {
  const wrapRef    = useRef(null)
  const cardRef    = useRef(null)
  const [pos, setPos]           = useState({ x: 0, y: 0 })
  const [flipped, setFlipped]   = useState(false)
  const [dragging, setDragging] = useState(false)
  const [swingAngle, setSwingAngle] = useState(0)
  const velRef     = useRef({ x: 0, y: 0 })
  const posRef     = useRef({ x: 0, y: 0 })
  const startRef   = useRef({ x: 0, y: 0 })
  const rafRef     = useRef(null)
  const swingRef   = useRef(null)
  const didDragRef = useRef(false)
  const swingT     = useRef(0)
  const [origin, setOrigin] = useState({ x: 130, y: 0 })

  /* Update origin on resize */
  useEffect(() => {
    const upd = () => { if (wrapRef.current) setOrigin({ x: wrapRef.current.offsetWidth / 2, y: 0 }) }
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  /* Flip back when section leaves view */
  useEffect(() => {
    if (!sectionVisible) setFlipped(false)
  }, [sectionVisible])

  /* Continuous swing animation — faster speed (0.045 vs 0.025) */
  useEffect(() => {
    const tick = () => {
      if (!dragging) {
        swingT.current += 0.045  // increased speed
        setSwingAngle(Math.sin(swingT.current) * 5)
      }
      swingRef.current = requestAnimationFrame(tick)
    }
    swingRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(swingRef.current)
  }, [dragging])

  const springBack = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const step = () => {
      const dx = -posRef.current.x, dy = -posRef.current.y
      velRef.current.x = velRef.current.x * 0.76 + dx * 0.09
      velRef.current.y = velRef.current.y * 0.76 + dy * 0.09
      posRef.current.x += velRef.current.x
      posRef.current.y += velRef.current.y
      setPos({ x: posRef.current.x, y: posRef.current.y })
      if (Math.abs(posRef.current.x) + Math.abs(posRef.current.y) > 0.15 ||
          Math.abs(velRef.current.x) + Math.abs(velRef.current.y) > 0.15) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        posRef.current = { x: 0, y: 0 }
        setPos({ x: 0, y: 0 })
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }, [])

  const onPointerDown = (e) => {
    e.preventDefault()
    setDragging(true)
    didDragRef.current = false
    cancelAnimationFrame(rafRef.current)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    startRef.current = { x: clientX - posRef.current.x, y: clientY - posRef.current.y }
    if (cardRef.current && e.pointerId !== undefined) {
      try { cardRef.current.setPointerCapture(e.pointerId) } catch(_) {}
    }
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const nx = clientX - startRef.current.x
    const ny = clientY - startRef.current.y
    if (Math.abs(nx - posRef.current.x) + Math.abs(ny - posRef.current.y) > 5) didDragRef.current = true
    posRef.current = { x: nx, y: ny }
    setPos({ ...posRef.current })
  }

  const onPointerUp = () => {
    setDragging(false)
    if (!didDragRef.current) setFlipped(f => !f)
    velRef.current = { x: posRef.current.x * 0.04, y: posRef.current.y * 0.04 }
    springBack()
  }

  /* String control points — always computed relative to wrapper top */
  const stringEndX = origin.x + pos.x
  const stringEndY = 95 + pos.y   // 95 = padding-top of lc-outer (string ends at card top)
  const cp1x = origin.x + pos.x * 0.2
  const cp1y = 50 + pos.y * 0.12
  const cp2x = stringEndX - pos.x * 0.08
  const cp2y = stringEndY - 35

  /* Card rotation: swing when idle, lean when dragging */
  const cardRot = dragging
    ? Math.max(-22, Math.min(22, pos.x * 0.06))
    : swingAngle

  return (
    <div className="lc-outer" ref={wrapRef}>
      {/* Wooden stick */}
      <div className="lc-stick">
        <div className="lc-stick-bar" />
        <div className="lc-stick-nail" style={{ left: `calc(${origin.x}px - 4px)` }} />
      </div>

      {/* SVG string — ALWAYS rendered, covers full lc-outer height */}
      <svg
        className="lc-svg"
        style={{
          position:'absolute', top:0, left:0,
          width:'100%', height:'100%',
          pointerEvents:'none', overflow:'visible', zIndex:2,
        }}
      >
        <defs>
          <linearGradient id="lanyardG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6914"/>
            <stop offset="35%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#06b6d4"/>
          </linearGradient>
        </defs>
        {/* Shadow */}
        <path
          d={`M${origin.x} 20 C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${stringEndX} ${stringEndY}`}
          stroke="rgba(0,0,0,.45)" strokeWidth="7" fill="none" strokeLinecap="round"
          transform="translate(2,3)"
        />
        {/* Main cord */}
        <path
          d={`M${origin.x} 20 C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${stringEndX} ${stringEndY}`}
          stroke="url(#lanyardG)" strokeWidth="5.5" fill="none" strokeLinecap="round"
        />
        {/* Shine */}
        <path
          d={`M${origin.x} 20 C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${stringEndX} ${stringEndY}`}
          stroke="rgba(255,255,255,.2)" strokeWidth="1.8" fill="none" strokeLinecap="round"
        />
      </svg>

      {/* Card */}
      <div
        ref={cardRef}
        className={`lc-card-wrap${flipped ? ' flipped' : ''}${dragging ? ' dragging' : ''}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) rotate(${cardRot}deg)`,
          cursor: dragging ? 'grabbing' : 'grab',
          position: 'relative', zIndex: 10,
          transformOrigin: 'top center',
          touchAction: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {/* Clip */}
        <div className="lc-clip"><div className="lc-clip-hole" /></div>

        <div className="lc-flip-inner">
          {/* ── FRONT: Photo ── */}
          <div className="lc-side lc-front">
            <div className="lc-stripe">
              <span className="lc-company">LOYOLA UNIV · CHI</span>
              <span className="lc-year">2026</span>
            </div>
            <div className="lc-photo-area">
              <div className="lc-photo">
                {/*
                  Replace the SVG below with your actual photo:
                  <img src="/photo.jpg" alt="Salmanuddin Talha Mohd"
                    style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>
                */}
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <defs>
                    <linearGradient id="av4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed"/>
                      <stop offset="100%" stopColor="#06b6d4"/>
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="38" r="22" fill="url(#av4)"/>
                  <ellipse cx="50" cy="80" rx="30" ry="22" fill="url(#av4)"/>
                </svg>
              </div>
              <div className="lc-photo-ring" />
            </div>
            <div className="lc-name" style={{fontSize:'.82rem',padding:'0 .5rem',textAlign:'center'}}>SALMANUDDIN TALHA MOHD</div>
            <div className="lc-role-text">Software Engineer</div>
            <div className="lc-flip-hint">Tap / click to view info ↩</div>
            <div className="lc-holo" />
          </div>

          {/* ── BACK: Info ── */}
          <div className="lc-side lc-back">
            <div className="lc-stripe lc-stripe-b">
              <span className="lc-company">PORTFOLIO · INFO</span>
              <span className="lc-year">2026</span>
            </div>
            <div className="lc-info-block">
              {[
                ['UNIV',  'Loyola University Chicago'],
                ['DEG',   'MS Software Engineering'],
                ['GPA',   '3.83 / 4.0'],
                ['SPEC',  'Full Stack & Cybersecurity'],
                ['AVAIL', '✓ Open to work'],
              ].map(([label, value]) => (
                <div className="lc-info-row" key={label}>
                  <span className="lc-il">{label}</span>
                  <span className={`lc-iv${label === 'AVAIL' ? ' lc-green' : ''}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="lc-barcode">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="lc-bar" style={{ height: (Math.sin(i) * .42 + .6) * 22 + 'px' }} />
              ))}
            </div>
            <div className="lc-barcode-txt">*SALMANUDDIN-TALHA-MOHD-2026*</div>
            <div className="lc-flip-hint">Tap / click to view photo ↩</div>
            <div className="lc-holo" />
          </div>
        </div>
      </div>

      <p className="lc-drag-hint">✦ Drag anywhere · Tap to flip</p>
    </div>
  )
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.07, triggerOnce: true })
  const { ref: visRef, inView: sectionVisible } = useInView({ threshold: 0.1 })

  return (
    <section
      className="section about-section"
      id="about"
      ref={el => { ref(el); visRef(el) }}
    >
      <div className="about-bubbles" aria-hidden>
        {BUBBLES.map(b => (
          <div key={b.id} className="about-bubble" style={{
            left: b.x + '%', width: b.size + 'px', height: b.size + 'px',
            opacity: b.opacity, animationDuration: b.dur + 's', animationDelay: b.delay + 's',
          }} />
        ))}
      </div>

      <div className="container about-grid">
        <div className={`about-left${inView ? ' in-view' : ''}`}>
          <div className="section-label">About Me</div>
          <h2 className="about-heading">
            Turning ideas into{' '}
            <span className="gradient-text">digital reality</span>
          </h2>
          <p className="about-text">
            I'm a Full Stack Developer and MS Software Engineering student at Loyola University
            Chicago (GPA 3.83/4.0), specialising in software engineering and cybersecurity.
          </p>
          <p className="about-text">
            My approach blends technical precision with thoughtful design — from building secure
            APIs to crafting immersive 3D web experiences with React, Node.js, and WebGL.
          </p>
          <p className="about-text">
            Outside of code I contribute to open source, explore generative art, and enjoy
            competitive chess online.
          </p>
          <a href="/resume.pdf" className="btn btn-primary" download="Salmanuddin_Talha_Mohd_Resume.pdf"
            style={{ marginTop: '2rem', width: 'fit-content' }}>
            <FiDownload /> Download Resume
          </a>
        </div>

        <div className={`about-right${inView ? ' in-view' : ''}`}>
          <LanyardCard sectionVisible={sectionVisible} />
        </div>
      </div>
    </section>
  )
}
