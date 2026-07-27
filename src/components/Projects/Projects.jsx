import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import { featuredProjects } from '../../data/portfolio'
import './Projects.css'

export default function Projects() {
  const [hovered, setHovered] = useState(null)
  const [ref, inView] = useInView({ threshold:.08, triggerOnce:true })

  return (
    <section id="projects" className="section projects" ref={ref}
      style={{ '--section-accent':'var(--c-pink)' }}>
      <div className="container">
        <motion.div className="projects__header"
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:.6 }}>
          <span className="section-label">Featured Work</span>
          <h2 className="section-heading font-syne">
            What I've <span>Built</span>
          </h2>
          <p className="section-sub">Hand-picked projects I'm proud of</p>
        </motion.div>

        {/* Bento grid */}
        <div className="projects__bento">
          {featuredProjects.map((p, i) => (
            <motion.div key={p.id}
              className={`proj-card proj-card--${i}`}
              style={{ '--pc': p.color }}
              initial={{ opacity:0, y:50 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:.6, delay:i*.13, ease:[.16,1,.3,1] }}
              onHoverStart={() => setHovered(p.id)}
              onHoverEnd={() => setHovered(null)}>

              {/* Background gradient wash */}
              <div className="proj-card__wash" />

              {/* Number */}
              <span className="proj-card__num font-mono">0{i+1}</span>

              {/* Icon */}
              <motion.div className="proj-card__icon"
                animate={hovered===p.id ? { scale:1.2, rotate:10 } : { scale:1, rotate:0 }}
                transition={{ type:'spring', stiffness:300 }}>
                {p.icon}
              </motion.div>

              <div className="proj-card__body">
                <div className="proj-card__cat pill"
                  style={{ background:`color-mix(in srgb,${p.color} 12%,transparent)`,
                           color:p.color, border:`1px solid color-mix(in srgb,${p.color} 25%,transparent)` }}>
                  {p.category}
                </div>
                <h3 className="proj-card__title">{p.title}</h3>
                <p className="proj-card__desc">{p.description}</p>

                <div className="proj-card__tech">
                  {p.tech.slice(0,4).map((t,j) => (
                    <span key={j} className="proj-card__tech-tag font-mono">{t}</span>
                  ))}
                  {p.tech.length > 4 &&
                    <span className="proj-card__tech-tag font-mono">+{p.tech.length-4}</span>}
                </div>
              </div>

              <div className="proj-card__links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="proj-card__link">
                    <FiGithub size={14}/> Code
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"
                    className="proj-card__link proj-card__link--live">
                    <FiExternalLink size={14}/> Live
                  </a>
                )}
              </div>

              {/* Arrow indicator */}
              <AnimatePresence>
                {hovered === p.id && (
                  <motion.div className="proj-card__arrow"
                    initial={{ opacity:0, scale:.5, x:10, y:-10 }}
                    animate={{ opacity:1, scale:1, x:0, y:0 }}
                    exit={{ opacity:0, scale:.5 }}>
                    <FiArrowUpRight size={18}/>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom color bar */}
              <motion.div className="proj-card__bar"
                animate={hovered===p.id ? { scaleX:1 } : { scaleX:0 }}
                style={{ background:p.color }}
                transition={{ duration:.3 }}/>
            </motion.div>
          ))}
        </div>

        <motion.div className="projects__cta"
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
          transition={{ delay:.8 }}>
          <a href="https://github.com/gowthamraj016" target="_blank"
            rel="noopener noreferrer" className="btn btn-ghost">
            <FiGithub size={17}/> View All Repositories
            <FiArrowUpRight size={14}/>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
