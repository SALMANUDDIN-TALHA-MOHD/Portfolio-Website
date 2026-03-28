import React, { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import './Experience.css'

const BUBBLES = Array.from({ length: 8 }, (_, i) => ({
  id: i, x: Math.random() * 100, size: Math.random() * 50 + 18,
  dur: Math.random() * 13 + 7, delay: Math.random() * 8, opacity: Math.random() * 0.05 + 0.015,
}))

const experiences = [
  {
    id: 1,
    role: 'Graduate Assistant',
    company: 'Loyola University Chicago — The Graduate School',
    period: 'Aug 2025 – Present',
    duration: '8 months', type: 'Part-time · On-site', location: 'Illinois, USA',
    color: '#7c3aed', icon: '🎓',
    tags: ['Student Services', 'Accommodate', 'Kurzweil 3000', 'Proctoring'],
    bullets: [
      'Support the Student Accessibility Center (SAC) by coordinating comprehensive exam accommodation services using the Accommodate management system.',
      'Manage end-to-end testing logistics including scheduling, check-in, proctoring and alternate format materials.',
      'Oversee high-volume testing periods with 40+ students while ensuring appropriate accommodations.',
      'Train and mentor new graduate and undergraduate assistants on departmental processes.',
    ],
  },
  {
    id: 2,
    role: 'Information Technology Services (ITS) Assistant',
    company: 'Loyola University Chicago',
    period: 'May 2025 – Aug 2025',
    duration: '4 months', type: 'Full-time · On-site', location: 'Illinois, USA',
    color: '#06b6d4', icon: '💻',
    tags: ['IT Support', 'TeamDynamix', 'AV Systems', 'Networking'],
    bullets: [
      'Provided front-line technical support to professors and staff, resolving real-time issues with classroom systems, network connectivity and AV equipment.',
      'Installed, configured and updated software on faculty computers ensuring security compliance.',
      'Contributed to IT asset tracking, equipment audits and documentation updates.',
      'Assisted in implementing upgraded teaching technologies and projection systems.',
    ],
  },
  {
    id: 3,
    role: 'IT Support Services Intern',
    company: 'Loyola University Chicago',
    period: 'Feb 2025 – Apr 2025',
    duration: '3 months', type: 'Part-time', location: 'USA',
    color: '#10b981', icon: '🔧',
    tags: ['TeamDynamix', 'Windows', 'macOS', 'AV Systems'],
    bullets: [
      'Joined ITS team during MS Software Engineering degree, gaining hands-on exposure to university IT operations.',
      'Assisted with basic troubleshooting involving hardware setups, network connectivity and classroom equipment.',
      'Navigated ticketing systems for logging, tracking and escalating support tickets.',
      'Assisted with Bi-Amps setups, AV connections and desktop configurations.',
    ],
  },
  {
    id: 4,
    role: 'Web Developer',
    company: 'VegalTech Pvt. Ltd.',
    period: 'Jan 2024 – Jul 2024',
    duration: '7 months', type: 'Internship · Remote', location: 'India',
    color: '#f59e0b', icon: '⚛️',
    tags: ['React.js', 'Tailwind CSS', 'MongoDB', 'Netlify', 'Git'],
    bullets: [
      'Engineered responsive, scalable interfaces using React.js, Tailwind CSS and MongoDB.',
      'Improved website performance by 40% through code splitting, lazy loading and caching strategies.',
      'Deployed production-ready applications using Netlify with cross-browser compatibility.',
      'Collaborated in Agile sprints using Git and GitHub for version control and code reviews.',
    ],
  },
  {
    id: 5,
    role: 'Operations Associate — FasTag Services',
    company: 'Bank of Baroda',
    period: 'Nov 2022 – Dec 2023',
    duration: '1 yr 2 months', type: 'Part-time', location: 'India',
    color: '#ec4899', icon: '🏦',
    tags: ['MySQL', 'HubSpot', 'Jira', 'Mixpanel'],
    bullets: [
      'Supported back-end team to monitor queries and validate failures ensuring seamless data flow across payment platforms.',
      'Worked on the UPI interface developed by National Payment Corporation of India.',
      'Diagnosed and resolved system issues; analysed back-end queries for smooth payment gateway processing.',
    ],
  },
  {
    id: 6,
    role: 'Machine Learning Intern',
    company: 'Lasya Infotech',
    period: 'Apr 2022 – Jun 2022',
    duration: '3 months', type: 'Internship · On-site', location: 'India',
    color: '#8b5cf6', icon: '🤖',
    tags: ['Python', 'NumPy', 'Scikit-Learn', 'CNN', 'Django'],
    bullets: [
      'Gained hands-on experience with ML, collecting and preprocessing large datasets for model development.',
      'Designed, implemented and trained ML models using supervised and unsupervised learning techniques.',
      'Evaluated model performance using accuracy, precision, recall and F1 score metrics.',
      'Integrated ML models with other system components alongside the data science team.',
    ],
  },
  {
    id: 7,
    role: 'Frontend Web Developer',
    company: 'The Sparks Foundation',
    period: 'Mar 2021 – May 2021',
    duration: '3 months', type: 'Internship · Remote', location: 'India',
    color: '#f97316', icon: '🌐',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub', 'Netlify'],
    bullets: [
      'Developed and deployed frontend web projects using HTML5, CSS3 and JavaScript.',
      'Collaborated via GitHub for version control and deployed applications through Netlify.',
    ],
  },
]

function ExperienceCard({ exp, index, isActive, onClick, scrollingDown, isLast }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false })
  const cardRef = useRef(null)
  const isEven = index % 2 === 0

  /* Auto-close ONLY the last card when it scrolls out of view */
  useEffect(() => {
    if (isLast && !inView && isActive) onClick()
  }, [inView])

  const showAnim = inView && scrollingDown

  return (
    <div
      className={`exp-item${showAnim ? ' in-view' : inView ? ' in-view no-anim' : ''}${isActive ? ' active' : ''}${isEven ? ' even' : ' odd'}`}
      style={{ '--delay': `${index * 0.08}s`, '--cc': exp.color }}
      ref={(el) => { ref(el) }}
    >
      {/* Timeline dot + connector */}
      <div className="exp-dot-col">
        <div
          className="exp-dot"
          style={{ background: exp.color, boxShadow: `0 0 20px ${exp.color}70` }}
          onClick={onClick}
          role="button"
          tabIndex={0}
        >
          <span className="exp-icon">{exp.icon}</span>
        </div>
        {index < experiences.length - 1 && (
          <div className="exp-connector">
            <div className="exp-connector-line" style={{ background: `linear-gradient(to bottom, ${exp.color}, ${experiences[index+1].color})` }} />
          </div>
        )}
      </div>

      {/* Card */}
      <div
        className={`exp-card${isActive ? ' exp-card-open' : ''}`}
        style={{ borderColor: isActive ? exp.color : 'rgba(255,255,255,.07)' }}
      >
        {/* Glow */}
        {isActive && (
          <div className="exp-card-glow" style={{ background: `radial-gradient(circle at 0% 0%, ${exp.color}18 0%, transparent 60%)` }} />
        )}

        {/* Header — always visible */}
        <div className="exp-card-header" onClick={onClick}>
          <div className="exp-header-left">
            <div className="exp-period" style={{ color: exp.color }}>{exp.period}</div>
            <h3 className="exp-role">{exp.role}</h3>
            <div className="exp-company">{exp.company}</div>
            <div className="exp-meta">
              <span className="exp-type">{exp.type}</span>
              <span className="exp-sep">·</span>
              <span className="exp-loc">📍 {exp.location}</span>
            </div>
            <div className="exp-tags-row">
              {exp.tags.slice(0, 3).map(t => (
                <span key={t} className="exp-tag" style={{ borderColor: exp.color + '40', color: exp.color }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="exp-header-right">
            <button
              className={`exp-view-btn${isActive ? ' active' : ''}`}
              style={{ borderColor: exp.color + '50', color: isActive ? '#fff' : exp.color, background: isActive ? exp.color : 'transparent' }}
            >
              {isActive ? '▲ Hide' : '▼ Details'}
            </button>
            <div className={`exp-chevron${isActive ? ' open' : ''}`} style={{ color: exp.color }}>›</div>
          </div>
        </div>

        {/* Expandable detail bullets */}
        <div className={`exp-body${isActive ? ' exp-body-open' : ''}`}>
          <ul className="exp-bullets">
            {exp.bullets.map((b, i) => (
              <li key={i} className="exp-bullet" style={{ '--bi': i }}>
                <span className="exp-bullet-dot" style={{ background: exp.color }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="exp-all-tags">
            {exp.tags.map(t => (
              <span key={t} className="exp-tag" style={{ borderColor: exp.color + '40', color: exp.color }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: false })
  const [activeId, setActiveId] = useState(1)
  const [scrollingDown, setScrollingDown] = useState(true)
  const lastScrollY = useRef(window.scrollY)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setScrollingDown(current > lastScrollY.current)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Toggle: open clicked card, close everything else */
  const toggle = (id) => setActiveId(prev => prev === id ? null : id)

  return (
    <section className="section exp-section" id="experience" ref={ref}>
      <div className="exp-bubbles" aria-hidden>
        {BUBBLES.map(b => (
          <div key={b.id} className="exp-bubble" style={{
            left: b.x + '%', width: b.size + 'px', height: b.size + 'px',
            opacity: b.opacity, animationDuration: b.dur + 's', animationDelay: b.delay + 's',
          }} />
        ))}
      </div>

      <div className="container">
        <div className={`exp-header${inView ? ' in-view' : ''}`}>
          <div className="section-label">Career</div>
          <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
          <p className="exp-sub">Click any card or the <strong>Details</strong> button to expand.</p>
        </div>

        <div className="exp-timeline">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              isActive={activeId === exp.id}
              onClick={() => toggle(exp.id)}
              scrollingDown={scrollingDown}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
