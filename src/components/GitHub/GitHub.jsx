import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import {
  FiGithub, FiStar, FiGitBranch, FiExternalLink,
  FiSearch, FiLoader, FiAlertCircle, FiClock
} from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import './GitHub.css'

const LANGUAGE_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  default: '#8b949e',
}

const RepoCard = ({ repo, index, inView }) => {
  const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short', year: 'numeric'
  })

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
    >
      <div className="repo-card__header">
        <FiGithub size={16} className="repo-card__icon" />
        <span className="repo-card__name">{repo.name}</span>
        <FiExternalLink size={14} className="repo-card__external" />
      </div>

      <p className="repo-card__desc">
        {repo.description || 'No description provided.'}
      </p>

      <div className="repo-card__footer">
        {repo.language && (
          <span className="repo-card__lang">
            <span className="repo-card__lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="repo-card__stat">
            <FiStar size={12} /> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="repo-card__stat">
            <FiGitBranch size={12} /> {repo.forks_count}
          </span>
        )}
        <span className="repo-card__date">
          <FiClock size={12} /> {updatedDate}
        </span>
      </div>
    </motion.a>
  )
}

const GitHub = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [filterLang, setFilterLang] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `https://api.github.com/users/${personalInfo.githubUsername}/repos?per_page=100&sort=updated`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        )
        setRepos(res.data)
      } catch (err) {
        setError('Could not fetch repositories. Check your connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const languages = useMemo(() => {
    const langs = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))]
    return langs
  }, [repos])

  const filtered = useMemo(() => {
    return repos.filter(repo => {
      const matchSearch = repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description || '').toLowerCase().includes(search.toLowerCase())
      const matchLang = filterLang === 'All' || repo.language === filterLang
      return matchSearch && matchLang && !repo.fork
    })
  }, [repos, search, filterLang])

  const displayed = showAll ? filtered : filtered.slice(0, 9)

  return (
    <section id="github" className="section github" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>GitHub Repositories</h2>
          <div className="section-divider" />
          <p>My open source work and public projects</p>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="github__profile-link"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <FiGithub size={20} />
          <span>@{personalInfo.githubUsername}</span>
          <span className="github__profile-count">{repos.length} repositories</span>
          <FiExternalLink size={14} />
        </motion.a>

        {/* Filters */}
        <motion.div
          className="github__filters"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="github__search">
            <FiSearch size={16} className="github__search-icon" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="github__search-input"
            />
          </div>

          <div className="github__lang-filters">
            {languages.slice(0, 8).map(lang => (
              <button
                key={lang}
                className={`github__lang-btn ${filterLang === lang ? 'active' : ''}`}
                onClick={() => setFilterLang(lang)}
              >
                {lang !== 'All' && (
                  <span
                    className="github__lang-dot"
                    style={{ background: LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default }}
                  />
                )}
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {loading && (
          <div className="github__loading">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <FiLoader size={28} />
            </motion.div>
            <span>Fetching repositories...</span>
          </div>
        )}

        {error && (
          <div className="github__error">
            <FiAlertCircle size={24} />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="github__results-info">
              Showing {displayed.length} of {filtered.length} repositories
            </div>

            <div className="github__grid">
              {displayed.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} inView={inView} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="github__empty">
                <FiGithub size={40} />
                <p>No repositories found matching your search.</p>
              </div>
            )}

            {filtered.length > 9 && (
              <div className="github__show-more">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowAll(!showAll)}
                >
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

export default GitHub
