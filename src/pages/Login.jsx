import { useState } from 'react'
import { useNavigate, Link, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { bgStyle, glassCard } from '../styles/theme'

export default function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const registered = location.state?.registered

  if (user && user.service !== 'career_fit') {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(form.email.trim(), form.password)
    setLoading(false)
    if (result.ok) {
      if (result.service === 'career_fit') {
        setError('This account belongs to Career Fit. Please use the Career Fit login page.')
        return
      }
      navigate(result.role === 'admin' ? '/admin' : '/dashboard', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={bgStyle}
    >
      <Navbar />
      <CircuitBackground />

      {/* Sparkles */}
      <span className="absolute top-12 left-8 text-yellow-300 text-2xl opacity-40 select-none">✦</span>
      <span className="absolute top-1/3 left-6 text-cyan-300 text-lg opacity-30 select-none">✦</span>
      <span className="absolute top-16 right-10 text-yellow-300 text-xl opacity-35 select-none">✦</span>
      <span className="absolute bottom-24 right-8 text-green-300 text-2xl opacity-25 select-none">⚙</span>
      <span className="absolute bottom-12 left-12 text-purple-300 text-xl opacity-25 select-none">⚙</span>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">MindCheck</h1>
          <p className="text-white/60 text-sm mt-1">Mental Wellness Assessment Tool</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-2xl" style={glassCard}>

          <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-white/50 text-sm mb-6">Sign in to continue your assessment</p>

          {registered && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                 style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)', color: '#86efac' }}>
              Registration submitted! Verify your email OTP, then wait for admin approval.
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                 style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-white/70 mb-1.5">Email address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all
                         hover:brightness-110 active:scale-95 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', color: '#fff' }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/45 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-green-400 font-semibold hover:text-green-300 transition-colors">
            Register here
          </Link>
        </p>
      </div>
      </div>
      <Footer />
    </div>
  )
}
