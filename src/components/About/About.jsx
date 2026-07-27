import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi'
import { BsRobot, BsCloud, BsCodeSlash, BsLayers } from 'react-icons/bs'
import { personalInfo } from '../../data/portfolio'
import './About.css'

const interests = [
  { icon:<BsCodeSlash size={18}/>, label:'Software Engineering', color:'var(--c-violet)' },
  { icon:<BsRobot size={18}/>,     label:'Artificial Intelligence', color:'var(--c-cyan)' },
  { icon:<BsLayers size={18}/>,    label:'Machine Learning', color:'var(--c-pink)' },
  { icon:<BsCloud size={18}/>,     label:'Cloud & DevOps', color:'var(--c-green)' },
]

const facts = [
  { label:'University',  value:'Amrita Vishwa Vidyapeetham' },
  { label:'Degree',      value:'B.Tech CSE (AI)' },
  { label:'CGPA',        value:'7.37 / 10' },
  { label:'Location',    value:'Bengaluru, India' },
  { label:'Status',      value:'Open to Opportunities' },
  { label:'Email',       value:personalInfo.email },
]

export default function About() {
  const [ref, inView] = useInView({ threshold:.12, triggerOnce:true })

  return (
    <section id="about" className="section about" ref={ref}
      style={{ '--section-accent':'var(--c-green)' }}>
      <div className="container about__wrap">

        {/* ── Left: info card ── */}
        <motion.div className="about__card-col"
          initial={{ opacity:0, x:-50 }}
          animate={inView ? { opacity:1, x:0 } : {}}
          transition={{ duration:.7, delay:.15 }}>

          <div className="about__id-card">
            {/* Shimmer top strip */}
            <div className="about__id-strip" />

            <div className="about__id-avatar">
              <span className="font-syne">GR</span>
              <div className="about__id-avatar-ring" />
            </div>

            <h3 className="about__id-name font-syne">{personalInfo.name}</h3>
            <p className="about__id-role">CSE (AI) · Amrita Vishwa Vidyapeetham</p>

            <div className="about__id-socials">
              {[
                { href:personalInfo.github,  icon:<FiGithub size={16}/> },
                { href:personalInfo.linkedin,icon:<FiLinkedin size={16}/> },
                { href:`mailto:${personalInfo.email}`, icon:<FiMail size={16}/> },
              ].map((s,i) => (
                <motion.a key={i} href={s.href} target={s.href.startsWith('mailto')?undefined:'_blank'}
                  rel="noopener noreferrer" className="about__social-btn"
                  whileHover={{ scale:1.15, rotate:8 }} whileTap={{ scale:.9 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>

            <div className="about__facts">
              {facts.map((f,i) => (
                <motion.div key={i} className="about__fact"
                  initial={{ opacity:0, x:-15 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ delay:.3+i*.07 }}>
                  <span className="about__fact-label">{f.label}</span>
                  <span className="about__fact-value">{f.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right: bio ── */}
        <motion.div className="about__bio-col"
          initial={{ opacity:0, x:50 }}
          animate={inView ? { opacity:1, x:0 } : {}}
          transition={{ duration:.7, delay:.2 }}>

          <span className="section-label">Who I Am</span>
          <h2 className="section-heading font-syne">
            Building the <span>Future</span> with Code
          </h2>

          {personalInfo.about.split('\n\n').map((p,i) => (
            <motion.p key={i} className="about__bio-text"
              initial={{ opacity:0, y:16 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:.4+i*.12 }}>
              {p}
            </motion.p>
          ))}

          {/* Interest chips */}
          <div className="about__interests">
            {interests.map((it,i) => (
              <motion.div key={i} className="about__interest"
                style={{ '--ic': it.color }}
                initial={{ opacity:0, y:12 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ delay:.6+i*.08 }}
                whileHover={{ scale:1.05, y:-3 }}>
                <span className="about__interest-icon">{it.icon}</span>
                {it.label}
              </motion.div>
            ))}
          </div>

          <div className="about__actions">
            <a href={personalInfo.resumeLink} className="btn btn-primary" download>
              Download Resume
            </a>
            <a href="#contact"
              className="btn btn-ghost"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }) }}>
              Let's Talk <FiArrowUpRight size={15}/>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
