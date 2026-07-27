import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../../data/portfolio'
import './Skills.css'

/* 3D tilt card */
function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const handleMove = (e) => {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - .5) * 16
    const y = ((e.clientY - rect.top)  / rect.height - .5) * -16
    el.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateZ(6px)`
    el.style.setProperty('--mx', `${(e.clientX - rect.left)}px`)
    el.style.setProperty('--my', `${(e.clientY - rect.top)}px`)
  }
  const handleLeave = () => {
    ref.current.style.transform = ''
  }
  return (
    <div ref={ref} className={className} style={style}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

const SECTION_COLORS = [
  { accent:'var(--c-violet)', grad:'var(--grad-violet)' },
  { accent:'var(--c-cyan)',   grad:'var(--grad-cyan)' },
  { accent:'var(--c-pink)',   grad:'var(--grad-pink)' },
  { accent:'var(--c-green)',  grad:'var(--grad-green)' },
  { accent:'var(--c-amber)',  grad:'var(--grad-amber)' },
  { accent:'var(--c-blue)',   grad:'var(--grad-blue)' },
]

export default function Skills() {
  const [ref, inView] = useInView({ threshold:.08, triggerOnce:true })

  return (
    <section id="skills" className="section skills" ref={ref}
      style={{ '--section-accent':'var(--c-cyan)' }}>
      <div className="container">
        <motion.div className="skills__header"
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:.6 }}>
          <span className="section-label">
            <span className="font-mono">&lt;</span> Skills <span className="font-mono">/&gt;</span>
          </span>
          <h2 className="section-heading font-syne">
            Tech <span>Arsenal</span>
          </h2>
          <p className="section-sub">Tools and technologies I build with</p>
        </motion.div>

        <div className="skills__grid">
          {skills.map((g, i) => {
            const col = SECTION_COLORS[i % SECTION_COLORS.length]
            return (
              <motion.div key={g.category}
                initial={{ opacity:0, y:40, scale:.97 }}
                animate={inView ? { opacity:1, y:0, scale:1 } : {}}
                transition={{ duration:.55, delay:i*.1 }}>
                <TiltCard className="skill-card"
                  style={{ '--sk-accent': col.accent, '--sk-grad': col.grad }}>
                  {/* Spotlight */}
                  <div className="skill-card__spot" />
                  {/* Top line accent */}
                  <div className="skill-card__topbar" />

                  <div className="skill-card__head">
                    <div className="skill-card__icon-box">
                      <span>{g.icon}</span>
                    </div>
                    <h3 className="skill-card__title">{g.category}</h3>
                  </div>

                  <div className="skill-card__tags">
                    {g.items.map((s, j) => (
                      <motion.span key={j} className="skill-tag"
                        initial={{ opacity:0, scale:.8 }}
                        animate={inView ? { opacity:1, scale:1 } : {}}
                        transition={{ delay:i*.1+j*.04+.25 }}
                        whileHover={{ scale:1.08 }}>
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
