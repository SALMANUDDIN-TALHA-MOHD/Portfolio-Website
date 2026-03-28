import React, { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import './Skills.css'

/* ── Inline SVG logos ─────────────────────────────── */
function Logo({ name, size = 36 }) {
  const s = size
  const logos = {
    'React.js': <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="4" fill="#61DAFB"/><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2"/><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60,20,20)"/><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(-60,20,20)"/></svg>,
    'Node.js':  <svg width={s} height={s} viewBox="0 0 40 40"><path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12Z" fill="#3c873a"/><text x="11" y="25" fontSize="11" fill="white" fontWeight="bold" fontFamily="monospace">JS</text></svg>,
    'Python':   <svg width={s} height={s} viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="6" fill="#3776AB"/><text x="8" y="27" fontSize="14" fill="#FFD43B" fontWeight="bold" fontFamily="monospace">Py</text></svg>,
    'Java':     <svg width={s} height={s} viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="6" fill="#ED8B00"/><text x="6" y="27" fontSize="13" fill="white" fontWeight="bold" fontFamily="monospace">Ja</text></svg>,
    'MongoDB':  <svg width={s} height={s} viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="6" fill="#13AA52"/><path d="M20 8C20 8 14 18 14 24A6 6 0 0 0 20 30A6 6 0 0 0 26 24C26 18 20 8 20 8Z" fill="white"/></svg>,
    'PostgreSQL':<svg width={s} height={s} viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="6" fill="#336791"/><text x="7" y="26" fontSize="10" fill="white" fontWeight="bold" fontFamily="monospace">PG</text></svg>,
    'Docker':   <svg width={s} height={s} viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="36" rx="6" fill="#2496ED"/><rect x="8" y="18" width="5" height="5" rx="1" fill="white"/><rect x="15" y="18" width="5" height="5" rx="1" fill="white"/><rect x="22" y="18" width="5" height="5" rx="1" fill="white"/><rect x="15" y="11" width="5" height="5" rx="1" fill="white"/><rect x="22" y="11" width="5" height="5" rx="1" fill="white"/></svg>,
    'Linux':    <svg width={s} height={s} viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="6" fill="#FCC624"/><text x="7" y="27" fontSize="12" fill="#000" fontWeight="bold" fontFamily="monospace">Lnx</text></svg>,
    'AWS':      <svg width={s} height={s} viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="36" rx="6" fill="#FF9900"/><text x="5" y="26" fontSize="11" fill="white" fontWeight="bold" fontFamily="sans-serif">AWS</text></svg>,
    'Snort':    <svg width={s} height={s} viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="6" fill="#d00"/><text x="5" y="26" fontSize="12" fill="white" fontWeight="bold" fontFamily="monospace">IDS</text></svg>,
    'TypeScript':<svg width={s} height={s} viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="36" rx="4" fill="#3178C6"/><text x="4" y="28" fontSize="15" fill="white" fontWeight="bold" fontFamily="monospace">TS</text></svg>,
    'React.js2': <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="4" fill="#61DAFB"/><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2"/><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60,20,20)"/><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(-60,20,20)"/></svg>,
  }
  return logos[name] || (
    <svg width={s} height={s} viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="6" fill="#7c3aed"/>
      <text x="7" y="27" fontSize="12" fill="white" fontWeight="bold" fontFamily="monospace">{name.slice(0,3)}</text>
    </svg>
  )
}

const BUBBLES = Array.from({ length: 12 }, (_, i) => ({
  id: i, x: Math.random() * 100, size: Math.random() * 60 + 20,
  dur: Math.random() * 14 + 8, delay: Math.random() * 8, opacity: Math.random() * 0.06 + 0.02,
}))

const skills = [
  { title:'Frontend Dev',    color:'#7c3aed', level:90, primaryLogo:'React.js',   tags:['React.js','HTML5','CSS3','Tailwind CSS'], desc:'Building pixel-perfect, responsive UIs with React.js, modern CSS and rich animation libraries.' },
  { title:'Backend Dev',     color:'#06b6d4', level:85, primaryLogo:'Node.js',    tags:['Node.js','Express.js','Java','Springboot'], desc:'Designing scalable APIs and microservices with robust authentication and security.' },
  { title:'Languages',       color:'#f59e0b', level:88, primaryLogo:'Python',     tags:['Python','Java','JavaScript','C/C++'], desc:'Fluent across paradigms — scripting, OOP, systems-level and data-science workflows.' },
  { title:'Databases',       color:'#10b981', level:82, primaryLogo:'MongoDB',    tags:['MongoDB','MySQL','PostgreSQL','Firebase'], desc:'Architecting efficient data models, query optimisation and caching strategies.' },
  { title:'Cybersecurity',   color:'#ef4444', level:78, primaryLogo:'Snort',      tags:['Snort IDS','Linux','Bash','Wireshark'], desc:'IDS signature development, threat intelligence, forensics and network security analysis.' },
  { title:'DevOps & Cloud',  color:'#8b5cf6', level:74, primaryLogo:'Docker',     tags:['Docker','AWS','Azure','GitHub Actions'], desc:'Containerising apps, automating CI/CD pipelines and managing cloud infrastructure.' },
]

function SkillCard({ skill, index, inView }) {
  const cardRef = useRef(null)
  const [tilt, setTilt]   = useState({ x:0, y:0 })
  const [glow, setGlow]   = useState({ x:50, y:50 })
  const [hovered, setHov] = useState(false)
  // Individual card observer so bar resets per-card when scrolled out
  const { ref: cardObsRef, inView: cardVisible } = useInView({ threshold:0.2, triggerOnce:false })
  const isVisible = inView || cardVisible

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top)  / r.height
    setTilt({ x:(y-.5)*-18, y:(x-.5)*18 })
    setGlow({ x:x*100, y:y*100 })
  }
  const onLeave = () => { setTilt({x:0,y:0}); setHov(false) }

  return (
    <div
      ref={cardObsRef}
      className={`sk-card-wrap${isVisible?' in-view':''}`}
      style={{'--delay':`${index*0.1}s`}}
    >
      <div
        ref={cardRef}
        className={`sk-card${hovered?' hovered':''}`}
        style={{
          transform:`perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered?'translateZ(8px) scale(1.03)':''}`,
          '--cc': skill.color, '--gx': glow.x+'%', '--gy': glow.y+'%',
        }}
        onMouseMove={onMouseMove}
        onMouseEnter={()=>setHov(true)}
        onMouseLeave={onLeave}
      >
        <div className="sk-glow"/>
        <div className="sk-top">
          <div className="sk-logo-wrap" style={{background:skill.color+'18',borderColor:skill.color+'30'}}>
            <Logo name={skill.primaryLogo} size={34}/>
          </div>
          <span className="sk-level" style={{color:skill.color,background:skill.color+'12',borderColor:skill.color+'30'}}>{skill.level}%</span>
        </div>
        <h3 className="sk-title">{skill.title}</h3>
        <p className="sk-desc">{skill.desc}</p>
        <div className="sk-prog-track">
          <div className="sk-prog-fill" style={{background:skill.color,'--prog':skill.level+'%'}}/>
        </div>
        <div className="sk-tags">
          {skill.tags.map(t=><span key={t} className="sk-tag" style={{borderColor:skill.color+'40',color:skill.color}}>{t}</span>)}
        </div>
        <div className="sk-corner"/>
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold:0.05, triggerOnce:false })
  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="sk-bubbles" aria-hidden>
        {BUBBLES.map(b=>(
          <div key={b.id} className="sk-bubble" style={{
            left:b.x+'%',width:b.size+'px',height:b.size+'px',
            opacity:b.opacity,animationDuration:b.dur+'s',animationDelay:b.delay+'s',
          }}/>
        ))}
      </div>
      <div className="container">
        <div className={`sk-header${inView?' in-view':''}`}>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">Skills &amp; <span className="gradient-text">Expertise</span></h2>
          <p className="sk-sub">Hover cards for 3D tilt effects. Real skills from real projects.</p>
        </div>
        <div className="sk-grid">
          {skills.map((s,i)=><SkillCard key={s.title} skill={s} index={i} inView={inView}/>)}
        </div>
      </div>
    </section>
  )
}
