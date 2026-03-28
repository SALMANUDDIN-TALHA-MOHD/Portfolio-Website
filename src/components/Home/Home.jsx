import React, { useEffect, useRef, useState, useCallback } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiTwitter, FiExternalLink } from 'react-icons/fi'
import './Home.css'

/* ── Floating particles ─────────────────────────── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.25 + 0.06,
}))

/* ── Terminal component ──────────────────────────── */
function Terminal({ isVisible }) {
  const outRef   = useRef(null)
  const inputRef = useRef(null)
  const tidRef   = useRef(null)
  const [inputVal, setInputVal]       = useState('')
  const [hackPct, setHackPct]         = useState(0)
  const [hackLayer, setHackLayer]     = useState('LOCKED')
  const [showBlocked, setShowBlocked] = useState(false)
  const hackRef  = useRef(0)
  const histRef  = useRef([])
  const hIdxRef  = useRef(-1)
  const [flashRed, setFlashRed] = useState(false)

  const LAYERS = [
    { min: 0,  label: 'LOCKED',       color: '#4a1818' },
    { min: 15, label: 'FE-LAYER',     color: '#7c3a00' },
    { min: 40, label: 'BE-LAYER',     color: '#0e4a2a' },
    { min: 65, label: 'DB-LAYER',     color: '#0e2a4a' },
    { min: 90, label: 'ROOT ACCESS ✓',color: '#22c55e' },
  ]

  const getLayer = (v) => {
    for (let i = LAYERS.length - 1; i >= 0; i--) {
      if (v >= LAYERS[i].min) return LAYERS[i]
    }
    return LAYERS[0]
  }

  /* Reset when section hidden */
  useEffect(() => {
    if (!isVisible) {
      clearTimeout(tidRef.current)
      hackRef.current = 0
      setHackPct(0)
      setHackLayer('LOCKED')
    }
  }, [isVisible])

  const addLine = useCallback((cls, txt) => {
    if (!outRef.current) return
    const p = document.createElement('p')
    p.className = 'tl ' + cls
    p.textContent = txt
    outRef.current.appendChild(p)
    outRef.current.scrollTop = outRef.current.scrollHeight
  }, [])

  const divider = useCallback(() => addLine('dm', '─'.repeat(48)), [addLine])

  const typeLines = useCallback((lines, i = 0) => {
    if (i >= lines.length) return
    addLine(lines[i][0], lines[i][1])
    tidRef.current = setTimeout(() => typeLines(lines, i + 1), 52 + Math.random() * 28)
  }, [addLine])

  const setHack = useCallback((v) => {
    if (v <= hackRef.current) return
    hackRef.current = v
    setHackPct(v)
    const l = getLayer(v)
    setHackLayer(l.label)
    if (v >= 100) {
      setTimeout(() => setShowBlocked(true), 600)
    }
  }, [])

  const flash = useCallback(() => {
    setFlashRed(true)
    setTimeout(() => setFlashRed(false), 500)
  }, [])

  const CMDS = {
    whoami: () => {
      divider(); addLine('g', '> Resolving identity...')
      typeLines([
        ['gc', '  ╔════════════════════════════════════╗'],
        ['gc', '  ║  IDENTITY CARD · CLEARANCE LVL 5  ║'],
        ['gc', '  ╚════════════════════════════════════╝'],
        ['wh', '  Name    : Salmanuddin Talha Mohd'],
        ['wh', '  Role    : MS Software Engineering'],
        ['wh', '  Uni     : Loyola University Chicago'],
        ['cy', '  GPA     : 3.83 / 4.0  ██████████ ✓'],
        ['wh', '  Stack   : React · Node.js · Python · Java'],
        ['mg', '  Spec    : Full Stack + Cybersecurity'],
        ['yw', '  Loc     : Chicago, Illinois, USA'],
        ['g',  '  Status  : [ OPEN TO WORK ] ✓'],
      ])
      setHack(20)
    },
    skills: () => {
      divider(); addLine('g', '> Scanning /skills directory...')
      typeLines([
        ['cy', '  drwxr-xr-x  frontend/'],
        ['wh', '    React.js · Next.js · TypeScript · Tailwind'],
        ['cy', '  drwxr-xr-x  backend/'],
        ['wh', '    Node.js · Express · Java · Springboot · FastAPI'],
        ['cy', '  drwxr-xr-x  cybersecurity/'],
        ['wh', '    Snort IDS · Wireshark · Linux · Bash · Nmap'],
        ['cy', '  drwxr-xr-x  database/'],
        ['wh', '    PostgreSQL · MongoDB · MySQL · Redis · Firebase'],
        ['cy', '  drwxr-xr-x  devops/'],
        ['wh', '    Docker · AWS · Azure · GitHub Actions · CI/CD'],
        ['yw', '  5 directories · 22 technologies detected.'],
      ])
      setHack(35)
    },
    projects: () => {
      divider(); addLine('g', '> Reading projects.log...')
      typeLines([
        ['yw', '  ── AutoLuxe Platform ─────────────────────────'],
        ['wh', '     React · Node · MongoDB · AI chatbot'],
        ['gc', '     100+ req/min · <250ms · 60% cost reduction'],
        ['yw', '  ── Human Activity Recognition ────────────────'],
        ['wh', '     ResNet-34 · OpenCV · Transfer Learning'],
        ['gc', '     96.95% accuracy · 98.2% precision · 30fps'],
        ['yw', '  ── IDS Threat Intelligence ────────────────────'],
        ['wh', '     Snort · 6337 events · 50+ countries'],
        ['gc', '     99.5% detection · 13 custom signatures'],
        ['cy', '  → 6 projects total. Run [exploit] next.'],
      ])
      setHack(50)
    },
    exploit: () => {
      divider(); flash(); addLine('rd', '> Initiating penetration test...')
      typeLines([
        ['yw', '  [PHASE 1] Scanning frontend layer...'],
        ['g',  '  [PASS ✓] XSS protection · headers hardened'],
        ['g',  '  [PASS ✓] React strict · no unsafe renders'],
        ['yw', '  [PHASE 2] Scanning backend layer...'],
        ['g',  '  [PASS ✓] JWT hardened · exp + iss validated'],
        ['g',  '  [PASS ✓] SQL injection blocked · parameterised'],
        ['g',  '  [PASS ✓] Rate limiting · 429 on abuse'],
        ['yw', '  [PHASE 3] Scanning database layer...'],
        ['g',  '  [PASS ✓] Encrypted at rest · AES-256'],
        ['g',  '  [PASS ✓] RBAC enforced · least privilege'],
        ['rd', '  ──────────────────────────────────────────────'],
        ['gc', '  RESULT: 0 critical · 0 high · 0 medium · 0 low'],
        ['g',  '  System hardened. Penetration test PASSED ✓'],
      ])
      setHack(62)
    },
    snort: () => {
      divider(); addLine('rd', '> Snort IDS · activating rule engine...')
      typeLines([
        ['wh', '  Loading 13 custom signatures...'],
        ['wh', '  Interface: eth0 · Promiscuous mode: ON'],
        ['yw', '  [ALERT] Port scan · src: 203.45.12.8'],
        ['yw', '  [ALERT] SQL injection attempt · blocked'],
        ['yw', '  [ALERT] Brute-force SSH · 47 attempts · banned'],
        ['yw', '  [ALERT] ICMP flood · 2400 pkt/s · dropped'],
        ['g',  '  ─────────────────────────────────────────────'],
        ['gc', '  Events analysed   : 6,337'],
        ['gc', '  Attack sources    : 1,250 across 50+ countries'],
        ['gc', '  Detection accuracy: 99.5%'],
        ['gc', '  False positive    : 5.0%'],
        ['g',  '  Network secured. All threats neutralised ✓'],
      ])
      setHack(75)
    },
    decrypt: () => {
      divider(); addLine('mg', '> Decrypting hidden message...')
      const scrambles = ['X7#@K!2mPqR','R3$nQ!7aLvB','Gh4*Wz!9TkM','Bv2#Kp!5NjX']
      scrambles.forEach((s, i) => {
        setTimeout(() => addLine('dm', '  [' + s + ']'), 110 * (i + 1))
      })
      setTimeout(() => {
        typeLines([
          ['mg', '  ─── DECRYPTION COMPLETE ──────────────────────'],
          ['pw', ''],
          ['pw', "  \"I don't just write code —"],
          ['pw', "   I engineer solutions that are"],
          ['pw', "   fast, secure, and built to last.\""],
          ['pw', ''],
          ['mg', '             — Salmanuddin Talha Mohd'],
          ['mg', '  ─────────────────────────────────────────────'],
        ])
      }, 580)
      setHack(88)
    },
    'sudo hire-me': () => {
      divider(); flash()
      addLine('yw', '> [sudo] password for recruiter: ********')
      setTimeout(() => {
        addLine('g', '> Authentication successful.')
        setTimeout(() => {
          typeLines([
            ['gc', ''],
            ['gc', '  ╔══════════════════════════════════════════╗'],
            ['gc', '  ║   ACCESS GRANTED · CLEARANCE: RECRUITER  ║'],
            ['gc', '  ╚══════════════════════════════════════════╝'],
            ['wh', ''],
            ['cy', '  Salmanuddin Talha Mohd is available for:'],
            ['g',  '  ✓ Full-time SWE / Security Engineering'],
            ['g',  '  ✓ US-authorised · Chicago / Remote'],
            ['g',  '  ✓ Freelance web development projects'],
            ['wh', ''],
            ['cy', '  Email    : stalha@luc.edu'],
            ['cy', '  LinkedIn : linkedin.com/in/mohd-salmanuddin-talha'],
            ['cy', '  GitHub   : github.com/SALMANUDDIN-TALHA-MOHD'],
            ['wh', ''],
            ['gc', '  You just unlocked the portfolio. Good choice.'],
          ])
          setHack(100)
        }, 300)
      }, 600)
    },
    clear: () => {
      clearTimeout(tidRef.current)
      if (outRef.current) {
        outRef.current.innerHTML = ''
        outRef.current.scrollTop = 0
      }
      hackRef.current = 0
      setHackPct(0)
      setHackLayer('LOCKED')
      setShowBlocked(false)
      addLine('dm', 'Terminal cleared.')
      addLine('g', 'Commands: whoami · skills · projects · exploit · snort · decrypt · sudo hire-me')
    },
  }

  const runCmd = useCallback((cmd) => {
    clearTimeout(tidRef.current)
    const t = cmd.trim().toLowerCase()
    if (!t) return
    histRef.current.unshift(t)
    hIdxRef.current = -1
    divider()
    addLine('dm', 'salman@portfolio:~$ ' + t)
    const key = Object.keys(CMDS).find(k => t === k) ||
                Object.keys(CMDS).find(k => t.startsWith(k.split(' ')[0]))
    if (key) {
      CMDS[key]()
    } else {
      flash()
      addLine('rd', '  bash: ' + t + ': command not found')
      addLine('yw', '  try: whoami · skills · projects · exploit · snort · decrypt · sudo hire-me · clear')
    }
  }, [divider, addLine, typeLines, setHack, flash])

  /* Boot sequence */
  useEffect(() => {
    const t = setTimeout(() => {
      addLine('dm', '╔══════════════════════════════════════════════════╗')
      addLine('dm', '║  PORTFOLIO OS · CYBERSEC EDITION · v3.1.0        ║')
      addLine('dm', '╚══════════════════════════════════════════════════╝')
      setTimeout(() => {
        addLine('wh', '  Mounting filesystems...              [ OK ]')
        addLine('wh', '  Loading IDS signatures (13)...       [ OK ]')
        addLine('wh', '  Establishing encrypted tunnel...     [ OK ]')
        addLine('g',  '  System ready. All services nominal.')
        addLine('cy', '  Click a command below or type and press Enter.')
        addLine('yw', '  Try: whoami · exploit · decrypt · sudo hire-me')
      }, 400)
    }, 200)
    return () => clearTimeout(t)
  }, [addLine])

  const handleKey = (e) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      runCmd(inputVal); setInputVal('')
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(hIdxRef.current + 1, histRef.current.length - 1)
      hIdxRef.current = idx
      setInputVal(histRef.current[idx] || '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(hIdxRef.current - 1, -1)
      hIdxRef.current = idx
      setInputVal(idx >= 0 ? histRef.current[idx] : '')
    }
  }

  const PILLS = ['whoami','skills','projects','exploit','snort','decrypt','sudo hire-me','clear']
  const layer = getLayer(hackPct)

  const handleClearPopup = () => {
    CMDS.clear && CMDS.clear()
    // directly call clear logic inline since CMDS is defined above
    clearTimeout(tidRef.current)
    if (outRef.current) { outRef.current.innerHTML = ''; outRef.current.scrollTop = 0 }
    hackRef.current = 0; setHackPct(0); setHackLayer('LOCKED'); setShowBlocked(false)
    addLine('dm', 'Terminal cleared.')
    addLine('g', 'Commands: whoami · skills · projects · exploit · snort · decrypt · sudo hire-me')
  }

  return (
    <div className="term-root">
      {/* Red flash overlay */}
      {flashRed && <div className="term-flash" />}

      {/* 🚨 BLOCKED popup — shown at 100% breach */}
      {showBlocked && (
        <div className="term-blocked-overlay">
          <div className="term-blocked-box">
            <div className="term-blocked-icon">⚠</div>
            <div className="term-blocked-title">ACCESS BLOCKED</div>
            <div className="term-blocked-msg">
              Maximum breach level reached.<br/>
              System has locked all terminal inputs.<br/>
              Clear the terminal to reset and continue.
            </div>
            <button className="term-blocked-btn" onClick={handleClearPopup}>
              Clear &amp; Reset Terminal
            </button>
          </div>
        </div>
      )}

      {/* Title bar */}
      <div className="term-tbar">
        <span className="tdot td-r"/><span className="tdot td-y"/><span className="tdot td-g"/>
        <span className="term-title">salman@portfolio — terminal v3.1 — CYBERSEC EDITION</span>
      </div>

      {/* Breach bar */}
      <div className="term-hbar">
        <span className="hbl">BREACH</span>
        <div className="htrack">
          <div className="hfill" style={{ width: hackPct + '%' }}/>
        </div>
        <span className="hpct">{hackPct}%</span>
        <span className="hlayer" style={{ color: layer.color }}>[{hackLayer}]</span>
      </div>

      {/* Output */}
      <div className="term-body">
        <div className="term-out" ref={outRef}/>
        {/* Input row — shown on ALL devices */}
        <div className="term-input-row">
          <span className="term-prompt">salman@portfolio:~$&nbsp;</span>
          <input
            ref={inputRef}
            className="term-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            placeholder="type command, press Enter..."
            autoComplete="off"
            spellCheck="false"
            disabled={showBlocked}
          />
          <span className="term-caret"/>
        </div>
      </div>

      {/* Quick command pills — shown on ALL devices */}
      <div className="term-hints">
        <span className="hints-label">QUICK:</span>
        {PILLS.map(p => (
          <button key={p} className="hpill" onClick={() => runCmd(p)} disabled={showBlocked}>{p}</button>
        ))}
      </div>
    </div>
  )
}

/* ── Home section ────────────────────────────────── */
export default function Home() {
  const heroRef  = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = heroRef.current; if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 })
    io.observe(el); return () => io.disconnect()
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section home-section" id="home" ref={heroRef}>
      <div className="home-grid-bg"/>
      <div className="home-orb orb-a"/>
      <div className="home-orb orb-b"/>

      <div className="particles-wrap" aria-hidden>
        {PARTICLES.map(p => (
          <div key={p.id} className="particle" style={{
            left: p.x + '%', top: p.y + '%',
            width: p.size + 'px', height: p.size + 'px',
            opacity: p.opacity,
            animationDuration: p.duration + 's',
            animationDelay: -p.delay + 's',
          }}/>
        ))}
      </div>

      <div className="container home-layout">

        {/* ── LEFT: text content ── */}
        <div className="home-left">
          <p className="home-greeting animate-up" style={{'--delay':'0.05s'}}>Hi, I'm</p>
          <h1 className="home-name animate-up" style={{'--delay':'0.12s'}}>Salmanuddin Mohd</h1>
          <div className="home-role animate-up" style={{'--delay':'0.2s'}}>
            <TypeAnimation
              sequence={['Full Stack Developer',2000,'Software Engineer',2000,'Cybersecurity Grad',2000,'Creative Coder',2000]}
              wrapper="span" speed={50} repeat={Infinity}
            />
          </div>
          <p className="home-desc animate-up" style={{'--delay':'0.28s'}}>
            MS Software Engineering student at Loyola University Chicago (GPA&nbsp;3.83).
            I build secure, scalable web applications and love crafting immersive digital experiences.
          </p>
          <div className="home-actions animate-up" style={{'--delay':'0.36s'}}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View My Work <span className="btn-arrow">→</span>
              <span className="btn-ripple-el"/>
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              Get in Touch
            </button>
          </div>
          {/* Socials row under buttons */}
          <div className="home-socials animate-up" style={{'--delay':'0.44s'}}>
            <a href="https://github.com/SALMANUDDIN-TALHA-MOHD" target="_blank" rel="noopener noreferrer" className="soc-link" title="GitHub"><FiGithub /></a>
            <a href="https://www.linkedin.com/in/mohd-salmanuddin-talha/" target="_blank" rel="noopener noreferrer" className="soc-link" title="LinkedIn"><FiLinkedin /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="soc-link" title="Twitter (Coming Soon)"><FiTwitter /></a>
          </div>
        </div>

        {/* ── RIGHT: curved ultrawide monitor ── */}
        <div className="home-right animate-fade" style={{'--delay':'0.4s'}}>
          {/* Heading above monitor */}
          <div className="mon-heading">
            <h3 className="mon-heading-title">Try the Terminal</h3>
            <p className="mon-heading-sub">Type commands or click the pills.</p>
          </div>
          {/* Monitor outer plastic frame */}
          <div className="mon-body">
            <div className="mon-frame">
              {/* Camera dot */}
              <div className="mon-cam"/>
              {/* Screen area */}
              <div className="mon-screen">
                <Terminal isVisible={visible}/>
              </div>
              {/* Bottom chin bar */}
              <div className="mon-chin">
                <span className="mon-led"/>
                <span className="mon-chin-label">ROG · PORTFOLIO EDITION</span>
              </div>
            </div>
            {/* Stand */}
            <div className="mon-neck"/>
            <div className="mon-base"/>
          </div>
        </div>

      </div>

      {/* Fixed left socials (desktop) */}
      <div className="side-socials animate-fade" style={{'--delay':'0.9s'}}>
        <a href="https://github.com/SALMANUDDIN-TALHA-MOHD"          target="_blank" rel="noopener noreferrer" className="side-soc-link" title="GitHub"><FiGithub/></a>
        <a href="https://www.linkedin.com/in/mohd-salmanuddin-talha/" target="_blank" rel="noopener noreferrer" className="side-soc-link" title="LinkedIn"><FiLinkedin/></a>
        <a href="#"                                                    target="_blank" rel="noopener noreferrer" className="side-soc-link" title="Twitter (Coming Soon)"><FiTwitter/></a>
        <div className="side-soc-line"/>
      </div>

      <button className="scroll-indicator" onClick={() => scrollTo('about')} aria-label="Scroll down">
        <div className="scroll-mouse"><div className="scroll-wheel"/></div>
        <span className="scroll-label">SCROLL</span>
      </button>
    </section>
  )
}
