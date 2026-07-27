import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiStar, FiFolder } from 'react-icons/fi'
import { featuredProjects } from '../../data/portfolio'
import './Projects.css'

const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    className="project-card card"
    style={{ '--project-color': project.color }}
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ y: -6 }}
  >
    {/* Top bar with featured tag */}
    <div className="project-card__top">
      <span className="project-card__featured-badge">Featured</span>
      <span className="badge">{project.category}</span>
    </div>

    {/* Icon and title */}
    <div className="project-card__header">
      <div className="project-card__icon">{project.icon}</div>
      <div>
        <h3 className="project-card__title">{project.title}</h3>
      </div>
    </div>

    {/* Description */}
    <p className="project-card__desc">{project.description}</p>

    {/* Tech stack */}
    <div className="project-card__tech">
      {project.tech.map((t, i) => (
        <span key={i} className="project-card__tech-tag">{t}</span>
      ))}
    </div>

    {/* Links */}
    <div className="project-card__links">
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
          <FiGithub size={15} /> Source Code
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-card__link project-card__link--demo">
          <FiExternalLink size={15} /> Live Demo
        </a>
      )}
    </div>

    {/* Colored bottom border */}
    <div className="project-card__accent" />
  </motion.div>
)

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Projects</h2>
          <div className="section-divider" />
          <p>Hand-picked projects I'm proud of</p>
        </motion.div>

        <div className="projects__grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </div>

        <motion.div
          className="projects__more"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p>Want to see more?</p>
          <a
            href="https://github.com/gowthamraj016"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <FiGithub size={18} /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
