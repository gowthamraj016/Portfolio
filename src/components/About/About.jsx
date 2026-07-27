import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiCpu, FiCloud, FiLayers, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './About.css'

const interests = [
  { icon: <FiCode size={20} />, label: 'Software Engineering', color: '#6366f1' },
  { icon: <FiCpu size={20} />, label: 'Artificial Intelligence', color: '#8b5cf6' },
  { icon: <FiLayers size={20} />, label: 'Machine Learning', color: '#06b6d4' },
  { icon: <FiCloud size={20} />, label: 'Cloud Computing', color: '#10b981' },
]

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <div className="section-divider" />
          <p>Get to know me a little better</p>
        </motion.div>

        <div className="about__grid">
          {/* Left: Avatar Card */}
          <motion.div
            className="about__avatar-side"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about__avatar-card card">
              <div className="about__avatar">
                <span>GR</span>
                <div className="about__avatar-ring" />
              </div>
              <h3 className="about__name">{personalInfo.name}</h3>
              <p className="about__role">B.Tech CSE (AI) · Amrita Vishwa Vidyapeetham</p>

              <div className="about__social">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="about__social-btn">
                  <FiGithub size={18} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="about__social-btn">
                  <FiLinkedin size={18} />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="about__social-btn">
                  <FiMail size={18} />
                </a>
              </div>

              <div className="about__quick-info">
                {[
                  { label: 'CGPA', value: '7.37 / 10' },
                  { label: 'Location', value: 'Bengaluru, India' },
                  { label: 'Status', value: 'Open to Work' },
                ].map((item, i) => (
                  <div key={i} className="about__info-row">
                    <span className="about__info-label">{item.label}</span>
                    <span className="about__info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            className="about__bio-side"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="about__bio-heading">
              Hello! I'm <span className="about__bio-name">Naga Gowtham Raj</span> 👋
            </h3>

            {personalInfo.about.split('\n\n').map((para, i) => (
              <p key={i} className="about__bio-text">{para}</p>
            ))}

            {/* Interests */}
            <div className="about__interests">
              <h4 className="about__interests-title">Core Interests</h4>
              <div className="about__interests-grid">
                {interests.map((item, i) => (
                  <motion.div
                    key={i}
                    className="about__interest-item"
                    style={{ '--interest-color': item.color }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <span className="about__interest-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="about__ctas">
              <a href={personalInfo.resumeLink} className="btn btn-primary" download>
                Download Resume
              </a>
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
