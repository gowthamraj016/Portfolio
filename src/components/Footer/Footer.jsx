import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { TbCode } from 'react-icons/tb'
import { personalInfo } from '../../data/portfolio'
import './Footer.css'

const qLinks = [
  { label:'About',      href:'#about' },
  { label:'Skills',     href:'#skills' },
  { label:'Projects',   href:'#projects' },
  { label:'Experience', href:'#experience' },
  { label:'Education',  href:'#education' },
  { label:'Contact',    href:'#contact' },
]

export default function Footer() {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })

  return (
    <footer className="footer">
      {/* Top gradient line */}
      <div className="footer__topline" />

      <div className="container footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon"><TbCode size={17}/></div>
            <span className="font-syne footer__logo-text">
              GR<span className="footer__logo-dot">.</span>dev
            </span>
          </div>
          <p className="footer__tagline">
            Building intelligent software, one line at a time.
            Open to internships and exciting opportunities.
          </p>
          <div className="footer__socials">
            {[
              { href:personalInfo.github,            icon:<FiGithub size={16}/>, label:'GitHub' },
              { href:personalInfo.linkedin,           icon:<FiLinkedin size={16}/>, label:'LinkedIn' },
              { href:`mailto:${personalInfo.email}`,  icon:<FiMail size={16}/>, label:'Email' },
            ].map((s,i) => (
              <motion.a key={i} href={s.href}
                target={s.href.startsWith('mailto')?undefined:'_blank'}
                rel="noopener noreferrer"
                className="footer__social" aria-label={s.label}
                whileHover={{ scale:1.15, y:-3 }} whileTap={{ scale:.9 }}>
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="footer__col-title">Navigation</h4>
          <ul className="footer__links">
            {qLinks.map(l => (
              <li key={l.href}>
                <a href={l.href}
                  onClick={e => { e.preventDefault(); go(l.href) }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="footer__col-title">Get In Touch</h4>
          <div className="footer__contact">
            {[
              { icon:<FiMail size={13}/>,    val:personalInfo.email,           href:`mailto:${personalInfo.email}` },
              { icon:<FiGithub size={13}/>,  val:'github.com/gowthamraj016',    href:personalInfo.github },
              { icon:<FiLinkedin size={13}/>,val:'LinkedIn Profile',             href:personalInfo.linkedin },
            ].map((c,i) => (
              <a key={i} href={c.href}
                target={c.href.startsWith('mailto')?undefined:'_blank'}
                rel="noopener noreferrer" className="footer__contact-item">
                {c.icon} <span>{c.val}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} D. Naga Gowtham Raj · All rights reserved
          </p>
          <p className="footer__made">
            Built with <FiHeart size={12} className="footer__heart"/> React &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
