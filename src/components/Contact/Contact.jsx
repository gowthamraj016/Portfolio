import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './Contact.css'

const contactLinks = [
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#6366f1',
  },
  {
    icon: <FiGithub size={20} />,
    label: 'GitHub',
    value: '@gowthamraj016',
    href: personalInfo.github,
    color: '#8b5cf6',
  },
  {
    icon: <FiLinkedin size={20} />,
    label: 'LinkedIn',
    value: 'D. Naga Gowtham Raj',
    href: personalInfo.linkedin,
    color: '#06b6d4',
  },
  {
    icon: <FiMapPin size={20} />,
    label: 'Location',
    value: 'Bengaluru, Karnataka, India',
    href: null,
    color: '#10b981',
  },
]

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')
    // Simulate form submission (replace with your backend/Formspree/EmailJS)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <div className="section-divider" />
          <p>Have a project in mind or want to connect? Drop a message!</p>
        </motion.div>

        <div className="contact__grid">
          {/* Left: Info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="contact__info-heading">Let's work together</h3>
            <p className="contact__info-text">
              I'm currently open to internship opportunities, collaborative projects, and full-time roles.
              Whether you have a question or just want to say hi — my inbox is always open!
            </p>

            <div className="contact__links">
              {contactLinks.map((item, i) => (
                <motion.div
                  key={i}
                  className="contact__link-item"
                  style={{ '--link-color': item.color }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="contact__link-icon">{item.icon}</div>
                  <div>
                    <p className="contact__link-label">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="contact__link-value">
                        {item.value}
                      </a>
                    ) : (
                      <p className="contact__link-value">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact__social">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                <FiGithub size={20} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                <FiLinkedin size={20} />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="contact__social-btn">
                <FiMail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form className="contact__form card" onSubmit={handleSubmit} noValidate>
              <h3 className="contact__form-title">Send a Message</h3>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    autoComplete="name"
                  />
                  {errors.name && <span className="contact__error">{errors.name}</span>}
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    autoComplete="email"
                  />
                  {errors.email && <span className="contact__error">{errors.email}</span>}
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Internship Opportunity / Collaboration..."
                  value={form.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="contact__error">{errors.subject}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Hi Gowtham, I'd like to discuss..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="contact__error">{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                className={`btn btn-primary contact__submit ${status}`}
                disabled={status === 'sending' || status === 'sent'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {status === 'idle' && <><FiSend size={16} /> Send Message</>}
                {status === 'sending' && <>Sending...</>}
                {status === 'sent' && <><FiCheck size={16} /> Message Sent!</>}
                {status === 'error' && <>Failed. Try again.</>}
              </motion.button>

              {status === 'sent' && (
                <motion.p
                  className="contact__success"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  🎉 Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
