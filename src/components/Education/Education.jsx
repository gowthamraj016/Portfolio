import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi'
import { education } from '../../data/portfolio'
import './Education.css'

const EducationCard = ({ edu, index, inView }) => (
  <motion.div
    className="edu-card card"
    style={{ '--edu-color': edu.color }}
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    whileHover={{ y: -4 }}
  >
    <div className="edu-card__icon-wrap">
      <span className="edu-card__icon">{edu.icon}</span>
    </div>

    <div className="edu-card__body">
      <span className="edu-card__type">{edu.type}</span>
      <h3 className="edu-card__degree">
        {edu.degree}
        {edu.specialization && (
          <span className="edu-card__specialization"> {edu.specialization}</span>
        )}
      </h3>
      <h4 className="edu-card__institution">{edu.institution}</h4>

      <div className="edu-card__meta">
        <span className="edu-card__meta-item">
          <FiMapPin size={12} /> {edu.location}
        </span>
        <span className="edu-card__meta-item">
          <FiCalendar size={12} /> {edu.duration}
        </span>
        {edu.grade && (
          <span className="edu-card__grade">
            <FiAward size={12} /> {edu.grade}
          </span>
        )}
      </div>
    </div>

    <div className="edu-card__accent" />
  </motion.div>
)

const Education = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="education" className="section education" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Education</h2>
          <div className="section-divider" />
          <p>My academic background and qualifications</p>
        </motion.div>

        <div className="education__grid">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
