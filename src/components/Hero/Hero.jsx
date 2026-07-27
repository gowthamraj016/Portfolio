import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './Hero.css'

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const NUM = 90
    const pts = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .5,
    }))

    const COLORS = ['#7c6ff7','#f472b6','#22d3ee','#34d399','#fbbf24']

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = COLORS[Math.floor(p.r * 2) % COLORS.length]
        ctx.globalAlpha = .35
        ctx.fill()
      })
      // lines between close particles
      for (let i = 0; i < NUM; i++) {
        for (let j = i + 1; j < NUM; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = '#7c6ff7'
            ctx.globalAlpha = (1 - d/110) * .12
            ctx.lineWidth = .6
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="hero__canvas" />
}

/* ── Magnetic button ── */
function MagneticBtn({ children, className, href, target, rel, onClick, download }) {
  const ref = useRef(null)
  const handleMove = (e) => {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top  + rect.height / 2)
    el.style.transform = `translate(${dx * .22}px, ${dy * .22}px)`
  }
  const handleLeave = () => { ref.current.style.transform = '' }
  return (
    <a ref={ref} href={href} target={target} rel={rel} onClick={onClick}
       download={download}
       className={className}
       onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </a>
  )
}

/* ── Animated counter ── */
function Counter({ to, suffix='' }) {
  const ref = useRef(null)
  useEffect(() => {
    let start = 0
    const val = parseFloat(to)
    const step = val / 40
    const timer = setInterval(() => {
      start += step
      if (start >= val) { start = val; clearInterval(timer) }
      if (ref.current) ref.current.textContent = Number.isInteger(val)
        ? Math.floor(start) + suffix
        : start.toFixed(2) + suffix
    }, 30)
    return () => clearInterval(timer)
  }, [to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

const Hero = () => {
  const typeSeq = personalInfo.taglines.flatMap(t => [t, 2000]).flat()

  return (
    <section id="hero" className="hero">
      <ParticleCanvas />

      {/* Noise overlay */}
      <div className="hero__noise" />

      {/* Big gradient orbs */}
      <div className="hero__orb hero__orb--a" />
      <div className="hero__orb hero__orb--b" />
      <div className="hero__orb hero__orb--c" />

      <div className="container hero__container">
        {/* ── LEFT CONTENT ── */}
        <div className="hero__content">

          {/* Status pill */}
          <motion.div className="hero__status"
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:.5, delay:.1 }}>
            <span className="glow-dot" />
            <span>{personalInfo.availability}</span>
          </motion.div>

          {/* Glitch name */}
          <motion.h1 className="hero__name font-syne"
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.7, delay:.2 }}>
            <span className="hero__hi">Hi, I'm</span>
            <span className="hero__glitch" data-text={personalInfo.name}>
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Terminal typewriter */}
          <motion.div className="hero__terminal"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.4 }}>
            <span className="hero__terminal-dot hero__terminal-dot--r" />
            <span className="hero__terminal-dot hero__terminal-dot--y" />
            <span className="hero__terminal-dot hero__terminal-dot--g" />
            <div className="hero__terminal-body font-mono">
              <span className="hero__prompt">~/gowtham</span>
              <span className="hero__caret"> $ </span>
              <TypeAnimation sequence={typeSeq} wrapper="span" speed={55}
                repeat={Infinity} className="hero__type" />
              <span className="hero__cursor" />
            </div>
          </motion.div>

          {/* Summary */}
          <motion.p className="hero__summary"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.5 }}>
            B.Tech CSE (AI) @ Amrita Vishwa Vidyapeetham · Crafting intelligent
            systems, ML pipelines, and full-stack applications.
          </motion.p>

          {/* CTA buttons */}
          <motion.div className="hero__btns"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.65 }}>
            <MagneticBtn href={personalInfo.github} target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost">
              <FiGithub size={17}/> GitHub
            </MagneticBtn>
            <MagneticBtn href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost">
              <FiLinkedin size={17}/> LinkedIn
            </MagneticBtn>
            <MagneticBtn href={personalInfo.resumeLink} download className="btn btn-primary">
              <FiDownload size={17}/> Resume
            </MagneticBtn>
            <MagneticBtn href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }) }}
              className="btn btn-ghost">
              <FiMail size={17}/> Contact
            </MagneticBtn>
          </motion.div>

          {/* Animated stats */}
          <motion.div className="hero__stats"
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:.9 }}>
            {[
              { to:'4', suffix:'+', label:'Projects' },
              { to:'5', suffix:'+', label:'Certs' },
              { to:'1',  suffix:'',  label:'Internship' },
              { to:'7.37', suffix:'', label:'CGPA' },
            ].map((s,i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-val font-syne">
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="hero__stat-lbl">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT VISUAL ── */}
        <motion.div className="hero__visual"
          initial={{ opacity:0, scale:.85 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:.9, delay:.3, ease:[.16,1,.3,1] }}>

          <div className="hero__ring-wrap">
            {/* Orbiting dots */}
            {[
              { color:'#7c6ff7', delay:0 },
              { color:'#f472b6', delay:'1.5s' },
              { color:'#22d3ee', delay:'3s' },
            ].map((o,i) => (
              <div key={i} className="hero__orbit" style={{ animationDelay: o.delay }}>
                <div className="hero__orbit-dot" style={{ background: o.color,
                  boxShadow:`0 0 8px ${o.color}` }} />
              </div>
            ))}

            {/* Outer ring */}
            <div className="hero__ring hero__ring--outer" />
            <div className="hero__ring hero__ring--mid"   />

            {/* Avatar hexagon */}
            <div className="hero__hex">
              <div className="hero__hex-inner">
                <span className="hero__initials font-syne">GR</span>
              </div>
              <div className="hero__hex-glow" />
            </div>
          </div>

          {/* Floating skill chips */}
          {[
            { label:'🤖 AI / ML',    pos:'tl', delay:0 },
            { label:'⚛️ React',      pos:'tr', delay:.4 },
            { label:'☁️ Kubernetes', pos:'bl', delay:.8 },
            { label:'🐍 Python',     pos:'br', delay:.2 },
          ].map((c,i) => (
            <motion.div key={i} className={`hero__chip hero__chip--${c.pos}`}
              animate={{ y: i%2===0 ? [0,-10,0] : [0,10,0] }}
              transition={{ duration:3+i*.5, repeat:Infinity, delay:c.delay }}>
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button className="hero__scroll"
        animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior:'smooth' })}
        aria-label="Scroll down">
        <FiArrowDown size={18}/>
      </motion.button>
    </section>
  )
}

export default Hero
