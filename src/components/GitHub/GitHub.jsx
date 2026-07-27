import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import { FiGithub, FiStar, FiGitBranch, FiExternalLink,
         FiSearch, FiLoader, FiAlertCircle, FiClock } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './GitHub.css'

const LANG_COLORS = {
  Python:'#3572A5', JavaScript:'#f1e05a', TypeScript:'#3178c6',
  Java:'#b07219', 'C++':'#f34b7d', HTML:'#e34c26', CSS:'#563d7c',
  Go:'#00ADD8', Rust:'#dea584', Shell:'#89e051',
  'Jupyter Notebook':'#DA5B0B', default:'#8b949e',
}

function RepoCard({ repo, i, inView }) {
  const color = LANG_COLORS[repo.language] || LANG_COLORS.default
  const date  = new Date(repo.updated_at).toLocaleDateString('en-US',{ month:'short', year:'numeric' })
  return (
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="repo-card card"
      initial={{ opacity:0, y:24 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:.45, delay:i*.06 }}
      whileHover={{ y:-4 }}>

      <div className="repo-card__header">
        <FiGithub size={14} className="repo-card__icon"/>
        <span className="repo-card__name">{repo.name}</span>
        <FiExternalLink size={12} className="repo-card__ext"/>
      </div>

      <p className="repo-card__desc">{repo.description || 'No description provided.'}</p>

      <div className="repo-card__foot">
        {repo.language &&
          <span className="repo-card__lang">
            <span className="repo-card__lang-dot" style={{ background:color }}/>
            {repo.language}
          </span>}
        {repo.stargazers_count > 0 &&
          <span className="repo-card__stat"><FiStar size={11}/>{repo.stargazers_count}</span>}
        {repo.forks_count > 0 &&
          <span className="repo-card__stat"><FiGitBranch size={11}/>{repo.forks_count}</span>}
        <span className="repo-card__date"><FiClock size={11}/>{date}</span>
      </div>
    </motion.a>
  )
}

export default function GitHub() {
  const [repos, setRepos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)
  const [search, setSearch] = useState('')
  const [lang, setLang]     = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [ref, inView]       = useInView({ threshold:.08, triggerOnce:true })

  useEffect(() => {
    axios.get(`https://api.github.com/users/${personalInfo.githubUsername}/repos?per_page=100&sort=updated`)
      .then(r => setRepos(r.data))
      .catch(() => setError('Could not load repositories.'))
      .finally(() => setLoading(false))
  }, [])

  const langs = useMemo(() =>
    ['All', ...new Set(repos.map(r => r.language).filter(Boolean))], [repos])

  const filtered = useMemo(() => repos.filter(r => {
    const q = search.toLowerCase()
    return !r.fork &&
      (r.name.toLowerCase().includes(q) || (r.description||'').toLowerCase().includes(q)) &&
      (lang === 'All' || r.language === lang)
  }), [repos, search, lang])

  const displayed = showAll ? filtered : filtered.slice(0, 9)

  return (
    <section id="github" className="section github" ref={ref}
      style={{ '--section-accent':'var(--c-cyan)' }}>
      <div className="container">
        <motion.div className="github__header"
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:.6 }}>
          <span className="section-label">Open Source</span>
          <h2 className="section-heading font-syne">
            GitHub <span>Repositories</span>
          </h2>
          <p className="section-sub">My public work and open source contributions</p>
        </motion.div>

        <motion.a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
          className="github__profile"
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
          transition={{ delay:.2 }}>
          <FiGithub size={18}/>
          <span>@{personalInfo.githubUsername}</span>
          <span className="github__repo-count">{repos.length} repos</span>
          <FiExternalLink size={13}/>
        </motion.a>

        <motion.div className="github__filters"
          initial={{ opacity:0, y:10 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ delay:.3 }}>
          <div className="github__search">
            <FiSearch size={15} className="github__search-icon"/>
            <input type="text" placeholder="Search repositories…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="github__search-input"/>
          </div>
          <div className="github__langs">
            {langs.slice(0,10).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`github__lang-btn ${lang===l?'on':''}`}>
                {l !== 'All' &&
                  <span className="github__lang-dot"
                    style={{ background: LANG_COLORS[l]||LANG_COLORS.default }}/>}
                {l}
              </button>
            ))}
          </div>
        </motion.div>

        {loading && (
          <div className="github__loading">
            <motion.div animate={{ rotate:360 }}
              transition={{ duration:1, repeat:Infinity, ease:'linear' }}>
              <FiLoader size={26}/>
            </motion.div>
            Fetching repositories…
          </div>
        )}

        {error && (
          <div className="github__error">
            <FiAlertCircle size={24}/> {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="github__info">
              Showing <span>{displayed.length}</span> of <span>{filtered.length}</span> repositories
            </p>
            <div className="github__grid">
              {displayed.map((r,i) => <RepoCard key={r.id} repo={r} i={i} inView={inView}/>)}
            </div>
            {filtered.length === 0 &&
              <div className="github__empty"><FiGithub size={36}/><p>No results found.</p></div>}
            {filtered.length > 9 && (
              <div className="github__more">
                <button className="btn btn-ghost" onClick={() => setShowAll(!showAll)}>
                  {showAll ? 'Show Less' : `Show All ${filtered.length} Repos`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
