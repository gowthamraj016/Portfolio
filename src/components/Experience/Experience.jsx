import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiCalendar, FiAward, FiCheckCircle } from 'react-icons/fi'
import { experience, certifications } from '../../data/portfolio'
import './Experience.css'

export default function Experience() {
  const [ref, inView] = useInView({ threshold:.08, triggerOnce:true })

  return (
    <section id="experience" className="section experience" ref={ref}
      style={{ '--section-accent':'var(--c-amber)' }}>
      <div className="container">

        <motion.div className="exp__header"
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:.6 }}>
          <span className="section-label">Journey</span>
          <h2 className="section-heading font-syne">
            Experience &amp; <span>Certifications</span>
          </h2>
          <p className="section-sub">Professional milestones and achievements</p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="exp__timeline">
          {experience.map((exp, i) => (
            <motion.div key={exp.id} className="tl-item"
              initial={{ opacity:0, x:-50 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:.65, delay:.2 }}>

              {/* Vertical connector */}
              <div className="tl-item__track">
                <div className="tl-item__node" style={{ background:exp.color, boxShadow:`0 0 16px ${exp.color}` }}>
                  <span>{exp.icon}</span>
                </div>
                <div className="tl-item__line" />
              </div>

              {/* Content */}
              <div className="tl-item__card">
                {/* Glow border */}
                <div className="tl-item__glow-edge" style={{ background:exp.color }} />

                <div className="tl-item__top">
                  <div>
                    <h3 className="tl-item__role">{exp.role}</h3>
                    <div className="tl-item__meta">
                      <span className="tl-item__company">
                        <FiBriefcase size={13}/> {exp.company}
                      </span>
                      <span className="tl-item__badge"
                        style={{ background:`color-mix(in srgb,var(--c-cyan) 10%,transparent)`,
                                 color:'var(--c-cyan)', border:`1px solid color-mix(in srgb,var(--c-cyan) 22%,transparent)` }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <div className="tl-item__dates">
                    <span className="tl-item__period">
                      <FiCalendar size={12}/> {exp.duration}
                    </span>
                    <span className="tl-item__length">{exp.period}</span>
                  </div>
                </div>

                <ul className="tl-item__points">
                  {exp.description.map((pt, j) => (
                    <motion.li key={j}
                      initial={{ opacity:0, x:-10 }}
                      animate={inView ? { opacity:1, x:0 } : {}}
                      transition={{ delay:.4+j*.07 }}>
                      <FiCheckCircle size={14} style={{ color:exp.color, flexShrink:0, marginTop:2 }}/>
                      <span>{pt}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="tl-item__tags">
                  {exp.skills.map((s,j) => (
                    <span key={j} className="tag" style={{ '--section-accent':exp.color }}>{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Certifications ── */}
        <motion.div className="exp__certs"
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ delay:.5 }}>
          <h3 className="exp__certs-heading">
            <FiAward size={20}/> Certifications
          </h3>
          <div className="exp__certs-grid">
            {certifications.map((c, i) => (
              <motion.div key={c.id} className="cert-card"
                style={{ '--cc': c.color }}
                initial={{ opacity:0, scale:.9 }}
                animate={inView ? { opacity:1, scale:1 } : {}}
                transition={{ delay:.6+i*.09 }}
                whileHover={{ scale:1.04, y:-4 }}>
                {/* Corner glow */}
                <div className="cert-card__corner" />

                <div className="cert-card__icon">{c.icon}</div>
                <div className="cert-card__info">
                  <h4 className="cert-card__title">{c.title}</h4>
                  <p className="cert-card__issuer">{c.issuer}</p>
                  <span className="cert-card__date">{c.date}</span>
                </div>
                <span className="cert-card__type"
                  style={{ background:`color-mix(in srgb,${c.color} 12%,transparent)`,
                           color:c.color, border:`1px solid color-mix(in srgb,${c.color} 25%,transparent)` }}>
                  {c.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
