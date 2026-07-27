import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../../data/portfolio'
import './Skills.css'

const SkillCard = ({ category, icon, color, items, index, inView }) => (
  <motion.div
    className="skill-card card"
    style={{ '--skill-color': color }}
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="skill-card__header">
      <div className="skill-card__icon-wrap">
        <span className="skill-card__icon">{icon}</span>
      </div>
      <h3 className="skill-card__title">{category}</h3>
    </div>
    <div className="skill-card__tags">
      {items.map((skill, i) => (
        <motion.span
          key={i}
          className="skill-tag"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.1 + i * 0.05 + 0.2 }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
)

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Technical Skills</h2>
          <div className="section-divider" />
          <p>Technologies and tools I work with</p>
        </motion.div>

        <div className="skills__grid">
          {skills.map((skillGroup, index) => (
            <SkillCard
              key={skillGroup.category}
              {...skillGroup}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
