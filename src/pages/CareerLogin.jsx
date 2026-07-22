import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { glassCard } from '../styles/theme'

export default function CareerLogin() {
  const { login, user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    if (user.service === 'career_fit') return <Navigate to="/career/dashboard" replace />
    return <Navigate to="/dashboard" replace />
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(form.email.trim(), form.password)
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    if (result.service !== 'career_fit') {
      setError('This account belongs to MindCheck. Please use the MindCheck login page.')
      return
    }
    navigate('/career/dashboard', { replace: true })
  }

  const bgStyle = { background: 'linear-gradient(135deg, #1c1404 0%, #2d1a00 40%, #0c1f3a 100%)' }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={bgStyle}>
      <Navbar />
      <CircuitBackground />

      <span className="absolute top-12 left-8 text-yellow-300 text-2xl opacity-40 select-none">✦</span>
      <span className="absolute top-40 right-10 text-amber-300 text-lg opacity-35 select-none">✦</span>
      <span className="absolute bottom-24 right-8 text-amber-300 text-2xl opacity-20 select-none">⚙</span>
      <span className="absolute bottom-12 left-12 text-yellow-300 text-xl opacity-20 select-none">⚙</span>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 text-xs font-semibold text-amber-300"
                 style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
              🎓 Student Career Fit
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide">Career Fit Platform</h1>
            <p className="text-white/55 text-sm mt-1">Sign in to your career assessment account</p>
          </div>

          <div className="rounded-2xl p-8 shadow-2xl" style={glassCard}>
            <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
            <p className="text-white/50 text-sm mb-6">Continue your career assessment journey</p>

            {error && (
              <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                   style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Email address</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required autoComplete="email"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(251,191,36,0.6)')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
                <input
                  type="password" name="password" value={form.password} onChange={handleChange}
                  placeholder="••••••••" required autoComplete="current-password"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(251,191,36,0.6)')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff' }}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>

          <p className="text-center text-white/45 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/career/register" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
              Register here
            </Link>
          </p>
          <p className="text-center text-white/30 text-xs mt-2">
            Looking for MindCheck mental wellness?{' '}
            <Link to="/login" className="text-green-400 hover:text-green-300 transition-colors">Sign in here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
