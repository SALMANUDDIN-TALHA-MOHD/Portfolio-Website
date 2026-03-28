import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiTwitter, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import './Contact.css'

const BUBBLES = Array.from({ length: 9 }, (_, i) => ({
  id: i, x: Math.random() * 100, size: Math.random() * 50 + 18,
  dur: Math.random() * 13 + 7, delay: Math.random() * 8, opacity: Math.random() * 0.05 + 0.015,
}))

const socials = [
  { icon:<FiGithub />,       label:'GitHub',   href:'https://github.com/SALMANUDDIN-TALHA-MOHD',              handle:'@SALMANUDDIN-TALHA-MOHD' },
  { icon:<FiLinkedin />,     label:'LinkedIn', href:'https://www.linkedin.com/in/mohd-salmanuddin-talha/',    handle:'/in/mohd-salmanuddin-talha' },
  { icon:<FiTwitter />,      label:'Twitter',  href:'#',                                                      handle:'Coming Soon' },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold:0.07, triggerOnce:true })
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())               e.name    = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email   = 'Valid email required'
    if (!form.subject.trim())            e.subject  = 'Required'
    if (form.message.trim().length < 10) e.message  = 'At least 10 characters'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]:value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]:'' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res  = await fetch('https://formspree.io/f/xnjggkyd', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, subject: form.subject, message: form.message,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm({ name:'', email:'', subject:'', message:'' })
        setTimeout(() => setStatus('idle'), 5000)
      } else { setStatus('error'); setTimeout(() => setStatus('idle'), 4000) }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 4000) }
  }

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      {/* Bubbles */}
      <div className="ct-bubbles" aria-hidden>
        {BUBBLES.map(b => (
          <div key={b.id} className="ct-bubble" style={{
            left:b.x+'%', width:b.size+'px', height:b.size+'px',
            opacity:b.opacity, animationDuration:b.dur+'s', animationDelay:b.delay+'s',
          }} />
        ))}
      </div>

      <div className="container">
        {/* ── Section heading ── */}
        <div className={`ct-heading${inView?' in-view':''}`}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="ct-heading-sub">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="ct-grid">
          {/* Info card */}
          <div className={`ct-info${inView?' in-view':''}`}>
            <div className="ct-info-glow" />
            <div className="ct-profile">
              <div className="ct-avatar">
                <svg viewBox="0 0 60 60" width="56" height="56">
                  <defs><linearGradient id="ctG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs>
                  <circle cx="30" cy="22" r="12" fill="url(#ctG)"/>
                  <ellipse cx="30" cy="48" rx="18" ry="12" fill="url(#ctG)"/>
                </svg>
              </div>
              <div>
                <div className="ct-pname">Salmanuddin Talha Mohd</div>
                <div className="ct-prole">Software Engineer</div>
                <div className="ct-avail"><span className="ct-dot"/> Available for work</div>
              </div>
            </div>

            <div className="ct-divider"/>

            <div className="ct-contact-rows">
              {[
                { icon:<FiMail />,   label:'Email',    val:'stalha@luc.edu', href:'mailto:stalha@luc.edu' },
                { icon:<FiMapPin />, label:'Location', val:'Chicago, Illinois, USA',  href:null },
              ].map(item => (
                <div className="ct-row" key={item.label}>
                  <div className="ct-row-icon">{item.icon}</div>
                  <div>
                    <div className="ct-row-label">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="ct-row-val ct-link">{item.val}</a>
                      : <span className="ct-row-val">{item.val}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="ct-divider"/>

            <div className="ct-socials-label">Find me online</div>
            <div className="ct-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ct-social">
                  <div className="ct-social-icon">{s.icon}</div>
                  <div>
                    <div className="ct-social-name">{s.label}</div>
                    <div className="ct-social-handle">{s.handle}</div>
                  </div>
                  <div className="ct-social-arrow">→</div>
                </a>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className={`ct-form-card${inView?' in-view':''}`}>
            <div className="ct-form-head">
              <h3>Send a Message</h3>
              <p>I'll reply within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} noValidate className="ct-form">
              <div className="ct-form-row">
                <div className={`ct-field${errors.name?' err':''}`}>
                  <label>Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange}/>
                  {errors.name && <span className="ct-err">{errors.name}</span>}
                </div>
                <div className={`ct-field${errors.email?' err':''}`}>
                  <label>Email</label>
                  <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange}/>
                  {errors.email && <span className="ct-err">{errors.email}</span>}
                </div>
              </div>
              <div className={`ct-field${errors.subject?' err':''}`}>
                <label>Subject</label>
                <input type="text" name="subject" placeholder="Project Inquiry" value={form.subject} onChange={handleChange}/>
                {errors.subject && <span className="ct-err">{errors.subject}</span>}
              </div>
              <div className={`ct-field${errors.message?' err':''}`}>
                <label>Message</label>
                <textarea name="message" rows={5} placeholder="Tell me about your project…" value={form.message} onChange={handleChange}/>
                {errors.message && <span className="ct-err">{errors.message}</span>}
              </div>
              <button
                type="submit"
                className={`ct-submit${status==='loading'?' ct-loading':status==='success'?' ct-success':''}`}
                disabled={status==='loading'||status==='success'}
              >
                {status==='idle'    && <><FiSend/> Send Message</>}
                {status==='loading' && <><span className="ct-spinner"/> Sending…</>}
                {status==='success' && <><FiCheck/> Message Sent!</>}
                {status==='error'   && <><FiAlertCircle/> Failed — Try Again</>}
              </button>
              {status==='success' && <p className="ct-ok">✓ Thanks! I'll be in touch soon.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
