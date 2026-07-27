import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiCheck, FiArrowUpRight } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './Contact.css'

const links = [
  { icon:<FiMail size={18}/>,    label:'Email',    val:personalInfo.email,
    href:`mailto:${personalInfo.email}`, color:'var(--c-violet)' },
  { icon:<FiGithub size={18}/>,  label:'GitHub',   val:'@gowthamraj016',
    href:personalInfo.github, color:'var(--c-cyan)' },
  { icon:<FiLinkedin size={18}/>,label:'LinkedIn',  val:'D. Naga Gowtham Raj',
    href:personalInfo.linkedin, color:'var(--c-blue)' },
  { icon:<FiMapPin size={18}/>,  label:'Location',  val:'Bengaluru, India',
    href:null, color:'var(--c-green)' },
]

export default function Contact() {
  const [ref, inView] = useInView({ threshold:.1, triggerOnce:true })
  const [form, setForm]   = useState({ name:'', email:'', subject:'', message:'' })
  const [errs, setErrs]   = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.name.trim())   e.name    = 'Required'
    if (!form.email.trim())  e.email   = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.subject.trim()) e.subject = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const change = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]:value }))
    if (errs[name]) setErrs(p => ({ ...p, [name]:'' }))
  }

  const submit = async e => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name:'', email:'', subject:'', message:'' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="section contact" ref={ref}
      style={{ '--section-accent':'var(--c-violet)' }}>
      <div className="container">
        <motion.div className="contact__header"
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:.6 }}>
          <span className="section-label">Contact</span>
          <h2 className="section-heading font-syne">
            Let's <span>Connect</span>
          </h2>
          <p className="section-sub">Open to internships, collaborations and exciting projects</p>
        </motion.div>

        <div className="contact__grid">
          {/* Left */}
          <motion.div className="contact__left"
            initial={{ opacity:0, x:-40 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:.7, delay:.2 }}>

            <div className="contact__availability">
              <span className="glow-dot"/>
              <span>Currently available for new opportunities</span>
            </div>

            <p className="contact__blurb">
              I'm actively looking for internships and full-time roles in software development,
              AI/ML, and full-stack engineering. Have something in mind? Let's chat!
            </p>

            <div className="contact__links">
              {links.map((l,i) => (
                <motion.div key={i} className="contact__link-row"
                  style={{ '--lc': l.color }}
                  initial={{ opacity:0, x:-18 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ delay:.3+i*.1 }}
                  whileHover={{ x:4 }}>
                  <div className="contact__link-icon">{l.icon}</div>
                  <div className="contact__link-text">
                    <span className="contact__link-label">{l.label}</span>
                    {l.href
                      ? <a href={l.href} target={l.href.startsWith('mailto')?undefined:'_blank'}
                          rel="noopener noreferrer" className="contact__link-val">
                          {l.val} <FiArrowUpRight size={11}/>
                        </a>
                      : <span className="contact__link-val">{l.val}</span>
                    }
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact__socials">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="contact__social" aria-label="GitHub">
                <FiGithub size={18}/>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="contact__social" aria-label="LinkedIn">
                <FiLinkedin size={18}/>
              </a>
              <a href={`mailto:${personalInfo.email}`}
                className="contact__social" aria-label="Email">
                <FiMail size={18}/>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form className="contact__form"
            onSubmit={submit} noValidate
            initial={{ opacity:0, x:40 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:.7, delay:.3 }}>

            {/* Shimmer top */}
            <div className="contact__form-strip" />

            <h3 className="contact__form-title">Send a Message</h3>

            <div className="contact__row">
              {[
                { name:'name',  type:'text',  label:'Your Name',      ph:'John Doe' },
                { name:'email', type:'email', label:'Email Address',   ph:'john@example.com' },
              ].map(f => (
                <div key={f.name} className="contact__field">
                  <label htmlFor={f.name}>{f.label}</label>
                  <input id={f.name} name={f.name} type={f.type}
                    placeholder={f.ph} value={form[f.name]} onChange={change}
                    className={errs[f.name]?'err':''} autoComplete={f.name}/>
                  {errs[f.name] && <span className="contact__err">{errs[f.name]}</span>}
                </div>
              ))}
            </div>

            <div className="contact__field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text"
                placeholder="Internship / Collaboration..." value={form.subject}
                onChange={change} className={errs.subject?'err':''}/>
              {errs.subject && <span className="contact__err">{errs.subject}</span>}
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5}
                placeholder="Hi Gowtham, I'd like to discuss..." value={form.message}
                onChange={change} className={errs.message?'err':''}/>
              {errs.message && <span className="contact__err">{errs.message}</span>}
            </div>

            <motion.button type="submit"
              className={`contact__submit btn btn-primary ${status}`}
              disabled={status==='sending'||status==='sent'}
              whileHover={status==='idle'?{scale:1.02}:{}}
              whileTap={status==='idle'?{scale:.97}:{}}>
              {status==='idle'   && <><FiSend size={15}/> Send Message</>}
              {status==='sending'&& <>Sending…</>}
              {status==='sent'   && <><FiCheck size={15}/> Sent! 🎉</>}
            </motion.button>

            {status==='sent' &&
              <motion.p className="contact__success"
                initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}>
                Thanks! I'll get back to you soon.
              </motion.p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
