import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data/questions'

const LEVEL_STYLES = {
  healthy:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  moderate: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  high:     { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700',       dot: 'bg-red-500'    },
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

export default function UserDashboard() {
  const { user, logout, authHeader } = useAuth()
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

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-lg">🧠</span>
            </div>
            <div>
              <p className="font-semibold text-slate-800 leading-none">MindCheck</p>
              <p className="text-xs text-slate-500 mt-0.5">Welcome, {user?.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Start Assessment card */}
        <div className="card shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Start Assessment</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Category: <span className="font-medium text-slate-700">{categoryLabel(user?.category)}</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Your results will be reviewed by our team before being released to you.
            </p>
          </div>
          <button
            onClick={() => navigate('/questionnaire')}
            className="btn-primary whitespace-nowrap shrink-0"
          >
            Take Assessment
          </button>
        </div>

        {/* Previous Results */}
        <div>
          <h2 className="text-base font-semibold text-slate-700 mb-3">My Assessments</h2>

          {loading && (
            <div className="card shadow-sm text-center text-slate-400 py-8">
              Loading your results…
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="card shadow-sm text-center py-10">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-slate-600 font-medium">No assessments yet</p>
              <p className="text-slate-400 text-sm mt-1">
                Complete an assessment above to get started.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              {results.map((r) => {
                // Unreleased — show "In Review" card
                if (!r.result_released) {
                  return (
                    <div
                      key={r.id}
                      className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-blue-400 shrink-0 animate-pulse" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 text-sm">Assessment Submitted</p>
                          <p className="text-xs text-slate-500">
                            {categoryLabel(r.category)} &middot;{' '}
                            {new Date(r.submitted_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })}
                          </p>
                        </div>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          In Review
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 ml-6">
                        Our team is reviewing your responses. You will see your result here once it has been released.
                      </p>
                    </div>
                  )
                }

                // Released — show full result card
                const key   = levelKey(r.level)
                const style = LEVEL_STYLES[key]
                const isOpen = expanded === r.id

                return (
                  <div
                    key={r.id}
                    className={`rounded-2xl border-2 p-4 ${style.bg} ${style.border} transition-all`}
                  >
                    {/* Summary row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${style.dot}`} />
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{r.label}</p>
                          <p className="text-xs text-slate-500">
                            {categoryLabel(r.category)} &middot;{' '}
                            {new Date(r.released_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
                          {r.score}/{r.total * 4}
                        </span>
                        <button
                          onClick={() => setExpanded(isOpen ? null : r.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {isOpen ? 'Hide' : 'Details'}
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">

                        {r.admin_action && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                              Result
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">{r.admin_action}</p>
                          </div>
                        )}

                        {r.ai_analysis && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                              Personalised Assessment
                            </p>
                            <div className="space-y-3">
                              {r.ai_analysis.split('\n\n').filter(Boolean).map((para) => (
                                <p key={para.slice(0, 40)} className="text-sm text-slate-700 leading-relaxed">{para}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        {r.admin_notes && (
                          <div className="bg-white rounded-xl p-3 border border-slate-200">
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                              Note from our team
                            </p>
                            <p className="text-sm text-slate-700">{r.admin_notes}</p>
                          </div>
                        )}

                        <p className="text-xs text-slate-400 leading-relaxed">
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
    </div>
  )
}
