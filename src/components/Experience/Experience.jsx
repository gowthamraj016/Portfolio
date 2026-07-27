import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi'
import { experience, certifications } from '../../data/portfolio'
import './Experience.css'

const CertCard = ({ cert, index, inView }) => (
  <motion.div
    className="cert-card card"
    style={{ '--cert-color': cert.color }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="cert-card__icon">{cert.icon}</div>
    <div>
      <h4 className="cert-card__title">{cert.title}</h4>
      <p className="cert-card__issuer">{cert.issuer}</p>
      <span className="cert-card__date">{cert.date}</span>
    </div>
    <span className="cert-card__badge">{cert.category}</span>
  </motion.div>
)

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Experience & Certifications</h2>
          <div className="section-divider" />
          <p>Professional experience and achievements</p>
        </motion.div>

        {/* Timeline */}
        <div className="experience__timeline">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Timeline line */}
              <div className="timeline-item__line">
                <div className="timeline-item__dot" style={{ background: exp.color }}>
                  <span>{exp.icon}</span>
                </div>
                <div className="timeline-item__connector" />
              </div>

              {/* Content */}
              <div className="timeline-item__content card">
                <div className="timeline-item__header">
                  <div>
                    <h3 className="timeline-item__role">{exp.role}</h3>
                    <div className="timeline-item__meta">
                      <span className="timeline-item__company">
                        <FiBriefcase size={13} /> {exp.company}
                      </span>
                      <span className="timeline-item__type">{exp.type}</span>
                    </div>
                  </div>
                  <div className="timeline-item__duration">
                    <span className="timeline-item__period">
                      <FiCalendar size={13} /> {exp.duration}
                    </span>
                    <span className="timeline-item__length">{exp.period}</span>
                  </div>
                </div>

                <ul className="timeline-item__points">
                  {exp.description.map((point, i) => (
                    <li key={i}>
                      <span className="timeline-item__bullet" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="timeline-item__skills">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="badge">{skill}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className="experience__certs-section"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="experience__certs-title">
            <FiAward size={20} /> Certifications & Simulations
          </h3>
          <div className="experience__certs-grid">
            {certifications.map((cert, index) => (
              <CertCard key={cert.id} cert={cert} index={index} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
