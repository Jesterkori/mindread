import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'

export default function CareerDashboard() {
  const { user, logout, authHeader } = useAuth()
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user/results', { headers: authHeader() })
      .then(r => r.json())
      .then(d => setResults(d.ok ? d.results : []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleLogout() {
    logout()
    navigate('/')
  }

  const bgStyle = { background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }
  const cardStyle = { background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }

  function renderStatusCard() {
    if (loading) {
      return (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <div className="text-white/40 text-sm">Loading your assessment status…</div>
        </div>
      )
    }

    const latest = results?.[0]

    if (!latest) {
      return (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <div className="text-6xl mb-5">🧭</div>
          <h2 className="text-xl font-bold text-white mb-2">Start Your Career Assessment</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            Answer 50 thoughtfully crafted questions to discover the career path that best matches your strengths and interests.
          </p>
          <button
            onClick={() => navigate('/career/questionnaire')}
            className="px-10 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 0 20px rgba(251,191,36,0.3)' }}>
            Take Career Assessment →
          </button>
        </div>
      )
    }

    if (!latest.result_released) {
      return (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <div className="text-6xl mb-5">⏳</div>
          <h2 className="text-xl font-bold text-white mb-2">Assessment Under Review</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-2 max-w-sm mx-auto">
            You completed the assessment on{' '}
            <span className="text-white/70">
              {new Date(latest.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>.
          </p>
          <p className="text-white/40 text-xs max-w-xs mx-auto">
            Our team is reviewing your responses. Your personalised career report will appear here once released.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#f59e0b' }} />
            <span className="text-amber-300 text-sm font-medium">Results pending expert review</span>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="rounded-2xl p-8" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                 style={{ background: 'rgba(251,191,36,0.2)', border: '1.5px solid rgba(251,191,36,0.4)' }}>
              🎯
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest">Your Career Result</p>
              <h2 className="text-lg font-bold text-white">{latest.label || 'Assessment Complete'}</h2>
            </div>
          </div>

          {latest.ai_analysis && (
            <div className="rounded-xl p-5 mb-4"
                 style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-2">Career Guidance</p>
              <p className="text-white/75 text-sm leading-relaxed whitespace-pre-line">{latest.ai_analysis}</p>
            </div>
          )}

          {latest.admin_notes && (
            <div className="rounded-xl p-5"
                 style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.2)' }}>
              <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-2">Counsellor Notes</p>
              <p className="text-white/70 text-sm leading-relaxed">{latest.admin_notes}</p>
            </div>
          )}

          {latest.released_at && (
            <p className="text-white/30 text-xs mt-5 text-right">
              Released on {new Date(latest.released_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={bgStyle}>
      <CircuitBackground opacity={0.04} />
      <Navbar />

      <div className="relative z-10 flex-1 px-4 py-16 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 text-xs font-semibold text-amber-300"
               style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
            🎓 Student Career Fit Evaluation Platform
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {user?.grade ? `Grade ${user.grade} • Career Assessment` : 'Career Assessment'}
          </p>
        </div>

        {/* Status card */}
        {renderStatusCard()}

        {/* Sign out */}
        <div className="mt-10 text-center">
          <button onClick={handleLogout}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white/60 transition-all hover:text-white hover:brightness-110 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
            Sign out
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
