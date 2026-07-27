import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { TbCode } from 'react-icons/tb'
import './Navbar.css'

const links = [
  { label:'About',       href:'#about' },
  { label:'Skills',      href:'#skills' },
  { label:'Projects',    href:'#projects' },
  { label:'GitHub',      href:'#github' },
  { label:'Experience',  href:'#experience' },
  { label:'Education',   href:'#education' },
  { label:'Contact',     href:'#contact' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('hero')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = ['hero','about','skills','projects','github','experience','education','contact']
      let cur = 'hero'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 100) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <motion.nav className={`nav ${scrolled ? 'nav--solid' : ''}`}
      initial={{ y:-80 }} animate={{ y:0 }}
      transition={{ duration:.55, ease:[.16,1,.3,1] }}>

      <div className="nav__inner">
        {/* Logo */}
        <a className="nav__logo" href="#hero"
          onClick={e => { e.preventDefault(); go('#hero') }}>
          <div className="nav__logo-mark">
            <TbCode size={17}/>
          </div>
          <span className="nav__logo-text font-syne">GR<span className="nav__dot">.</span></span>
        </a>

        {/* Links */}
        <ul className="nav__links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className={`nav__link ${active === l.href.slice(1) ? 'nav__link--on' : ''}`}
                onClick={e => { e.preventDefault(); go(l.href) }}>
                {l.label}
                {active === l.href.slice(1) &&
                  <motion.span className="nav__pip" layoutId="pip"/>}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="nav__right">
          <motion.button className="nav__theme" onClick={toggleTheme}
            whileHover={{ scale:1.12, rotate:20 }} whileTap={{ scale:.9 }}
            aria-label="Toggle theme">
            {theme==='dark' ? <FiSun size={17}/> : <FiMoon size={17}/>}
          </motion.button>

          <motion.a href="#contact"
            className="nav__cta btn btn-primary"
            onClick={e => { e.preventDefault(); go('#contact') }}
            whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}>
            Hire Me
          </motion.a>

          <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu">
            {menuOpen ? <FiX size={21}/> : <FiMenu size={21}/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="nav__mobile"
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:'auto' }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:.28 }}>
            {links.map((l,i) => (
              <motion.a key={l.href} href={l.href}
                className={`nav__mob-link ${active===l.href.slice(1)?'on':''}`}
                onClick={e => { e.preventDefault(); go(l.href) }}
                initial={{ opacity:0, x:-16 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay:i*.04 }}>
                <span className="nav__mob-num font-mono">0{i+1}.</span>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
