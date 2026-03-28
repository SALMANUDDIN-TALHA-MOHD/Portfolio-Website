import React, { useRef, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import './Projects.css'

const BUBBLES = Array.from({ length: 10 }, (_, i) => ({
  id: i, x: Math.random() * 100, size: Math.random() * 55 + 20,
  dur: Math.random() * 13 + 7, delay: Math.random() * 8, opacity: Math.random() * 0.055 + 0.015,
}))

const projects = [
  {
    id:1, title:'AutoLuxe Platform',        tag:'Full Stack', emoji:'🚗',
    color:'#7c3aed',
    image:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80&auto=format',
    description:'Full-stack car dealership platform with React.js, Node.js and MongoDB. Handles 100+ req/min with <250ms API response times. Integrated AI chatbot reducing customer workload by 60–75%.',
    tech:['React.js','Node.js','MongoDB','Springboot','Vercel','AI API'],
    live:'https://example.com', github:'https://github.com',
  },
  {
    id:2, title:'Human Activity Recognition', tag:'AI / ML', emoji:'🤖',
    color:'#06b6d4',
    image:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format',
    description:'ResNet-34 model achieving 96.95% accuracy and 98.2% precision across 5+ activity classes. Real-time 30fps OpenCV frame extraction with <50ms latency.',
    tech:['Python','OpenCV','NumPy','Tkinter','Transfer Learning'],
    live:'https://example.com', github:'https://github.com',
  },
  {
    id:3, title:'Android Timer App',          tag:'Mobile', emoji:'⏱️',
    color:'#f59e0b',
    image:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80&auto=format',
    description:'Android timer app managing 100+ concurrent operations with 95% crash-free rate through clean architecture design and optimised state management.',
    tech:['Java','Android SDK','IntelliJ IDEA','Gradle','XML'],
    live:'https://example.com', github:'https://github.com',
  },
  {
    id:4, title:'IDS Threat Intelligence',    tag:'Cybersecurity', emoji:'🛡️',
    color:'#10b981',
    image:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&auto=format',
    description:'Analyzed 6,337 auth events, identified 1,250 attack sources across 50+ countries. Developed 13 custom Snort IDS signatures achieving 99.5% detection accuracy.',
    tech:['Snort','Linux','Bash','Wireshark','Python'],
    live:'https://example.com', github:'https://github.com',
  },
  {
    id:5, title:'3D Portfolio Builder',       tag:'Creative Dev', emoji:'🎨',
    color:'#ec4899',
    image:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format',
    description:'Drag-and-drop portfolio builder with Three.js animations, GSAP transitions, and live preview mode exported as a static site.',
    tech:['Three.js','React','GSAP','Vite','Tailwind'],
    live:'https://example.com', github:'https://github.com',
  },
  {
    id:6, title:'E-Commerce Platform',        tag:'Web Dev', emoji:'🛒',
    color:'#8b5cf6',
    image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format',
    description:'Scalable e-commerce website for a local grocery shop. Improved website performance by 40% through code splitting, lazy loading and caching strategies.',
    tech:['React.js','Tailwind CSS','MongoDB','Netlify','Firebase'],
    live:'https://example.com', github:'https://github.com',
  },
]

function ProjectCard({ project, index, inView, sectionVisible }) {
  const [flipped, setFlipped] = useState(false)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x:0, y:0 })

  /* Flip back when section scrolls away */
  useEffect(() => {
    if (!sectionVisible && flipped) setFlipped(false)
  }, [sectionVisible])

  const onMouseMove = (e) => {
    if (flipped || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    setTilt({ x:((e.clientY-r.top)/r.height-.5)*-10, y:((e.clientX-r.left)/r.width-.5)*10 })
  }
  const onLeave = () => { if (!flipped) setTilt({x:0,y:0}) }

  return (
    <div className={`pj-wrap${inView?' in-view':''}`} style={{'--delay':`${index*0.1}s`}}>
      <div
        ref={cardRef}
        className={`pj-card${flipped?' flipped':''}`}
        style={{
          transform: flipped
            ? 'perspective(900px) rotateY(180deg)'
            : `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          '--cc': project.color,
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onLeave}
      >
        {/* ── FRONT ── */}
        <div className="pj-side pj-front">
          {/* Image area */}
          <div className="pj-img-wrap">
            <img src={project.image} alt={project.title} className="pj-img" loading="lazy"
              onError={e=>{ e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}/>
            <div className="pj-img-fallback" style={{background:`linear-gradient(135deg,${project.color}33,${project.color}0a)`,display:'none'}}>
              <span style={{fontSize:'3rem'}}>{project.emoji}</span>
            </div>
            <div className="pj-img-overlay" style={{background:`linear-gradient(to top,${project.color}88 0%,transparent 55%)`}}/>
            <div className="pj-img-topline" style={{background:project.color}}/>
          </div>

          {/* Footer: title + tag + Code/Live buttons + Details */}
          <div className="pj-front-footer">
            <div className="pj-front-meta">
              <span className="pj-tag chip" style={{borderColor:project.color+'40',color:project.color,background:project.color+'12'}}>{project.tag}</span>
              <h3 className="pj-title">{project.title}</h3>
            </div>
            {/* ── Code & Live Demo on the front ── */}
            <div className="pj-front-actions">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="pj-front-btn pj-btn-code"
                onClick={e=>e.stopPropagation()}>
                <FiGithub size={12}/> Code
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="pj-front-btn pj-btn-live"
                style={{borderColor:project.color+'55',color:project.color,background:project.color+'18'}}
                onClick={e=>e.stopPropagation()}>
                <FiExternalLink size={12}/> Live Demo
              </a>
              <button className="pj-front-btn pj-btn-details"
                style={{borderColor:project.color+'55',color:project.color}}
                onClick={()=>setFlipped(true)}>
                Details →
              </button>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="pj-side pj-back">
          <div className="pj-back-glow" style={{background:`radial-gradient(circle at 80% 10%,${project.color}22 0%,transparent 60%)`}}/>
          <div className="pj-back-top">
            <span className="pj-tag chip" style={{borderColor:project.color+'40',color:project.color,background:project.color+'12'}}>{project.tag}</span>
            <button className="pj-close" onClick={()=>setFlipped(false)}>✕</button>
          </div>
          <h3 className="pj-back-title">{project.title}</h3>
          <p className="pj-back-desc">{project.description}</p>
          <div className="pj-back-tech">
            {project.tech.map(t=>(
              <span key={t} className="pj-tech-pill" style={{borderColor:project.color+'40',color:project.color}}>{t}</span>
            ))}
          </div>
          <div className="pj-back-actions">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="pj-btn pj-btn-ghost"><FiGithub/> Code</a>
            <a href={project.live}   target="_blank" rel="noopener noreferrer" className="pj-btn"
              style={{background:project.color+'20',borderColor:project.color+'55',color:project.color}}><FiExternalLink/> Live Demo</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView }               = useInView({ threshold:0.05, triggerOnce:true })
  const { ref:visRef, inView:secVis } = useInView({ threshold:0.05 })

  return (
    <section className="section projects-section" id="projects"
      ref={el=>{ ref(el); visRef(el) }}>
      <div className="pj-bubbles" aria-hidden>
        {BUBBLES.map(b=>(
          <div key={b.id} className="pj-bubble" style={{
            left:b.x+'%',width:b.size+'px',height:b.size+'px',
            opacity:b.opacity,animationDuration:b.dur+'s',animationDelay:b.delay+'s',
          }}/>
        ))}
      </div>
      <div className="container">
        <div className={`pj-header${inView?' in-view':''}`}>
          <div className="section-label">My Work</div>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="pj-sub">Code &amp; Live Demo on every card · Click <strong>Details</strong> to flip for full info.</p>
        </div>
        <div className="pj-grid">
          {projects.map((p,i)=>(
            <ProjectCard key={p.id} project={p} index={i} inView={inView} sectionVisible={secVis}/>
          ))}
        </div>
        <div className={`pj-footer-row${inView?' in-view':''}`}>
          <a href="https://github.com/salmantalha" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <FiGithub/> View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
