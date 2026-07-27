import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi'
import { education } from '../../data/portfolio'
import './Education.css'

export default function Education() {
  const [ref, inView] = useInView({ threshold:.12, triggerOnce:true })

  return (
    <section id="education" className="section education" ref={ref}
      style={{ '--section-accent':'var(--c-blue)' }}>
      <div className="container">
        <motion.div className="edu__header"
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:.6 }}>
          <span className="section-label">Academic</span>
          <h2 className="section-heading font-syne">
            My <span>Education</span>
          </h2>
          <p className="section-sub">Where the journey began and continues</p>
        </motion.div>

        <div className="edu__track">
          {education.map((edu, i) => (
            <motion.div key={edu.id}
              className={`edu-item ${i===0?'edu-item--featured':''}`}
              style={{ '--ec': edu.color }}
              initial={{ opacity:0, y:40 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:.6, delay:i*.15, ease:[.16,1,.3,1] }}
              whileHover={{ y:-5 }}>

              {/* Diagonal accent */}
              <div className="edu-item__slash" />

              {/* Step number */}
              <div className="edu-item__step font-syne">
                {String(education.length - i).padStart(2,'0')}
              </div>

              <div className="edu-item__icon-wrap">
                <span className="edu-item__icon">{edu.icon}</span>
              </div>

              <div className="edu-item__body">
                <span className="edu-item__type">{edu.type}</span>
                <h3 className="edu-item__degree">
                  {edu.degree}
                  {edu.specialization &&
                    <span className="edu-item__spec"> {edu.specialization}</span>}
                </h3>
                <h4 className="edu-item__inst">{edu.institution}</h4>

                <div className="edu-item__meta">
                  <span><FiMapPin size={12}/> {edu.location}</span>
                  <span><FiCalendar size={12}/> {edu.duration}</span>
                  {edu.grade &&
                    <span className="edu-item__grade"><FiAward size={12}/> {edu.grade}</span>}
                </div>
              </div>

              {/* Animated border */}
              <div className="edu-item__border-anim" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
