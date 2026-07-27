import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './Footer.css'

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="var(--bg-primary)"/>
        </svg>
      </div>

      <div className="footer__content">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon"><FiCode size={18} /></div>
              <span>Gowtham<span className="footer__logo-accent">.</span>dev</span>
            </div>
            <p className="footer__tagline">
              Building intelligent software, one line at a time. Open to internships, collaborations, and exciting opportunities.
            </p>
            <div className="footer__social">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub size={18} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={18} />
              </a>
              <a href={`mailto:${personalInfo.email}`} aria-label="Email">
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__links-section">
            <h4 className="footer__section-title">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__contact-section">
            <h4 className="footer__section-title">Contact</h4>
            <div className="footer__contact-items">
              <a href={`mailto:${personalInfo.email}`} className="footer__contact-item">
                <FiMail size={14} />
                <span>{personalInfo.email}</span>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                <FiGithub size={14} />
                <span>github.com/gowthamraj016</span>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                <FiLinkedin size={14} />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <p className="footer__copy">
              © {year} D. Naga Gowtham Raj. All rights reserved.
            </p>
            <p className="footer__made">
              Made with <FiHeart size={13} className="footer__heart" /> using React & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
