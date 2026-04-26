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
          <h2 className="text-base font-semibold text-slate-700 mb-3">Previous Test Results</h2>

          {loading && (
            <div className="card shadow-sm text-center text-slate-400 py-8">
              Loading your results…
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="card shadow-sm text-center py-10">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-slate-600 font-medium">No results yet</p>
              <p className="text-slate-400 text-sm mt-1">
                Complete an assessment and wait for your results to be reviewed.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              {results.map((r) => {
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

                        {r.safety_flag && (
                          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                            <p className="text-xs font-semibold text-red-700 mb-1">⚠️ Safety Note</p>
                            <p className="text-xs text-red-600 leading-relaxed">
                              Your responses indicated possible distress. Please speak with a trusted adult or counsellor.
                              iCall: 9152987821 | Vandrevala Foundation: 1860-2662-345
                            </p>
                          </div>
                        )}

                        {r.ai_analysis && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                              Your Personalised Assessment
                            </p>
                            <div className="space-y-3">
                              {r.ai_analysis.split('\n\n').filter(Boolean).map((para) => (
                                <p key={para.slice(0, 40)} className="text-sm text-slate-700 leading-relaxed">{para}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {!r.ai_analysis && r.action && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                              Recommendation
                            </p>
                            <p className="text-sm text-slate-700">{r.action}</p>
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
