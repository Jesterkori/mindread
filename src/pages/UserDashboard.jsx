import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data/questions'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LEVEL_STYLES = {
  healthy:  { border: 'rgba(74,222,128,0.5)',  badge: 'rgba(74,222,128,0.15)',  badgeText: '#4ade80', dot: '#4ade80'  },
  moderate: { border: 'rgba(251,191,36,0.5)',  badge: 'rgba(251,191,36,0.15)',  badgeText: '#fbbf24', dot: '#fbbf24' },
  high:     { border: 'rgba(248,113,113,0.5)', badge: 'rgba(248,113,113,0.15)', badgeText: '#f87171', dot: '#f87171' },
}

function levelKey(level = '') {
  const l = level.toLowerCase()
  if (l.includes('healthy')) return 'healthy'
  if (l.includes('high'))    return 'high'
  return 'moderate'
}

function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id
}

const bgStyle = { background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }
const glassCard = {
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(16px)',
  border: '1.5px solid rgba(255,255,255,0.12)',
}

export default function UserDashboard() {
  const { user, authHeader } = useAuth()
  const navigate = useNavigate()

  const [results, setResults]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    fetch('/api/user/results', { headers: authHeader() })
      .then((r) => r.json())
      .then((d) => { if (d.ok) setResults(d.results) })
      .catch(() => {})
      .finally(() => setLoading(false))
  // authHeader is stable (reads localStorage directly)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden" style={bgStyle}>
      {/* Circuit background */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05, pointerEvents: 'none' }}>
        <defs>
          <pattern id="circ-db" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M15 60 H45 M45 60 V25 M45 25 H80 M80 25 V60 M80 60 H105" stroke="#4ade80" strokeWidth="1" fill="none"/>
            <circle cx="45" cy="60" r="3" fill="#4ade80"/><circle cx="80" cy="25" r="3" fill="#4ade80"/>
            <path d="M25 95 H60 M60 95 V108" stroke="#60a5fa" strokeWidth="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circ-db)"/>
      </svg>

      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-12 space-y-6">

        {/* Welcome strip */}
        <div className="rounded-2xl p-6" style={glassCard}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white">Welcome back, {user?.name}</h1>
              <p className="text-white/55 text-sm mt-0.5">
                Category: <span className="text-white/80 font-medium">{categoryLabel(user?.category)}</span>
                {user?.institution && (
                  <> &middot; <span className="text-green-400 font-medium">{user.institution}</span></>
                )}
              </p>
            </div>
            <button
              onClick={() => navigate('/questionnaire')}
              className="shrink-0 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
            >
              Take Assessment
            </button>
          </div>
          <p className="text-white/40 text-xs mt-3">
            Your results will be reviewed by our team before being released to you.
          </p>
        </div>

        {/* Previous Results */}
        <div>
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3 px-1">
            My Assessments
          </h2>

          {loading && (
            <div className="rounded-2xl p-8 text-center" style={glassCard}>
              <div className="w-7 h-7 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-white/40 text-sm">Loading your results…</p>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="rounded-2xl p-10 text-center" style={glassCard}>
              <p className="text-4xl mb-3">📋</p>
              <p className="text-white/70 font-medium">No assessments yet</p>
              <p className="text-white/40 text-sm mt-1">Complete an assessment above to get started.</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              {results.map((r) => {
                if (!r.result_released) {
                  return (
                    <div key={r.id} className="rounded-2xl p-4" style={{ ...glassCard, borderColor: 'rgba(96,165,250,0.4)' }}>
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-blue-400 shrink-0 animate-pulse" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm">Assessment Submitted</p>
                          <p className="text-xs text-white/45">
                            {categoryLabel(r.category)} &middot;{' '}
                            {new Date(r.submitted_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ background: 'rgba(96,165,250,0.2)', color: '#93c5fd' }}>
                          In Review
                        </span>
                      </div>
                      <p className="text-xs text-white/35 mt-3 ml-6">
                        Our team is reviewing your responses. You will see your result here once released.
                      </p>
                    </div>
                  )
                }

                const key   = levelKey(r.level)
                const style = LEVEL_STYLES[key]
                const isOpen = expanded === r.id

                return (
                  <div key={r.id} className="rounded-2xl p-4 transition-all"
                    style={{ ...glassCard, borderColor: style.border }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full mt-0.5 shrink-0" style={{ background: style.dot }} />
                        <div>
                          <p className="font-semibold text-white text-sm">{r.label}</p>
                          <p className="text-xs text-white/45">
                            {categoryLabel(r.category)} &middot;{' '}
                            {new Date(r.released_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: style.badge, color: style.badgeText }}>
                          {r.score}/{r.total * 4}
                        </span>
                        <button
                          onClick={() => setExpanded(isOpen ? null : r.id)}
                          className="text-xs font-medium text-green-400 hover:text-green-300 transition-colors"
                        >
                          {isOpen ? 'Hide' : 'Details'}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-4 pt-4 space-y-4"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>

                        {r.admin_action && (
                          <div>
                            <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">Result</p>
                            <p className="text-sm text-white/80 leading-relaxed">{r.admin_action}</p>
                          </div>
                        )}

                        {r.ai_analysis && (
                          <div>
                            <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">
                              Personalised Assessment
                            </p>
                            <div className="space-y-3">
                              {r.ai_analysis.split('\n\n').filter(Boolean).map((para) => (
                                <p key={para.slice(0, 40)} className="text-sm text-white/70 leading-relaxed">{para}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        {r.admin_notes && (
                          <div className="rounded-xl p-3"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">
                              Note from our team
                            </p>
                            <p className="text-sm text-white/70">{r.admin_notes}</p>
                          </div>
                        )}

                        <p className="text-xs text-white/30 leading-relaxed">
                          This assessment is an informal screening tool and is not a substitute for professional diagnosis.
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
