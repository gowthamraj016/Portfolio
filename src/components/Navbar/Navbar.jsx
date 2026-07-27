import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX, FiCode } from 'react-icons/fi'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map(l => l.href.replace('#', ''))
      const offsets = sections.map(id => {
        const el = document.getElementById(id)
        return el ? { id, top: el.getBoundingClientRect().top } : null
      }).filter(Boolean)

      const current = offsets.reduce((prev, curr) => {
        return Math.abs(curr.top - 80) < Math.abs(prev.top - 80) ? curr : prev
      }, offsets[0])

      if (current) setActiveSection(current.id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar__container">
        {/* Logo */}
        <a className="navbar__logo" href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}>
          <div className="navbar__logo-icon">
            <FiCode size={18} />
          </div>
          <span className="navbar__logo-text">Gowtham<span className="navbar__logo-accent">.</span>dev</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.span className="navbar__link-dot" layoutId="navDot" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="navbar__actions">
          <motion.button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>

          <motion.a
            href="#contact"
            className="navbar__cta btn btn-primary"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.a>

          {/* Mobile Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
