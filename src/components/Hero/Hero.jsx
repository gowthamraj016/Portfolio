import React from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './Hero.css'

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const typeSequence = personalInfo.taglines.flatMap(tag => [tag, 2000]).flat()

  return (
    <section id="hero" className="hero">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          {/* Badge */}
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="glow-dot" />
            <span>{personalInfo.availability}</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Hi, I'm <br />
            <span className="hero__name-highlight">{personalInfo.name}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="hero__typewriter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="hero__typewriter-prefix">{'> '}</span>
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="hero__typewriter-text"
            />
            <span className="hero__typewriter-cursor" />
          </motion.div>

          {/* Summary */}
          <motion.p
            className="hero__summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            B.Tech CSE (AI) @ Amrita Vishwa Vidyapeetham · Building intelligent software,
            scalable systems, and ML-powered applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero__buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero__btn"
            >
              <FiGithub size={18} /> View GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero__btn"
            >
              <FiLinkedin size={18} /> LinkedIn
            </a>
            <a
              href={personalInfo.resumeLink}
              className="btn btn-primary hero__btn"
              download
            >
              <FiDownload size={18} /> Download Resume
            </a>
            <a
              href="#contact"
              className="btn btn-outline hero__btn"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <FiMail size={18} /> Contact Me
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { value: '4+', label: 'Projects' },
              { value: '5+', label: 'Certifications' },
              { value: '1', label: 'Internship' },
              { value: '7.37', label: 'CGPA' },
            ].map((stat, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Profile Visual */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero__avatar-wrapper">
            <div className="hero__avatar-ring hero__avatar-ring--outer" />
            <div className="hero__avatar-ring hero__avatar-ring--inner" />
            <div className="hero__avatar">
              <span className="hero__avatar-initials">GR</span>
              <div className="hero__avatar-glow" />
            </div>

            {/* Floating badges */}
            <motion.div
              className="hero__float-badge hero__float-badge--tl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            >
              <span>🤖</span> AI / ML
            </motion.div>
            <motion.div
              className="hero__float-badge hero__float-badge--tr"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            >
              <span>⚛️</span> React
            </motion.div>
            <motion.div
              className="hero__float-badge hero__float-badge--bl"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <span>☁️</span> AWS
            </motion.div>
            <motion.div
              className="hero__float-badge hero__float-badge--br"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: 0.3 }}
            >
              <span>🐍</span> Python
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll"
        onClick={scrollToAbout}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <FiArrowDown size={20} />
      </motion.button>
    </section>
  )
}

export default Hero
