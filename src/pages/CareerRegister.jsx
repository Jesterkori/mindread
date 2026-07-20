import { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { glassCard } from '../styles/theme'

export default function CareerRegister() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', grade: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {}, [])

  if (user) {
    let dest = '/career/dashboard'
    if (user.role === 'admin') dest = '/admin'
    else if (user.service === 'mindcheck') dest = '/dashboard'
    return <Navigate to={dest} replace />
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name.trim())              return setError('Please enter your full name.')
    if (!form.email.trim())             return setError('Please enter your email address.')
    if (!form.grade)                    return setError('Please select your counselling level (10th or 12th).')
    if (form.password.length < 6)       return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     form.name.trim(),
          email:    form.email.trim().toLowerCase(),
          password: form.password,
          service:  'career_fit',
          grade:    form.grade,
        }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.detail || data.error || 'Registration failed.')
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  const bgStyle = { background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={bgStyle}>
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
               style={{ background: 'rgba(74,222,128,0.2)', border: '2px solid rgba(74,222,128,0.5)' }}>
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Registration Submitted!</h2>
          <p className="text-white/70 mb-2">
            Your account is <strong className="text-green-400">pending admin approval</strong>.
          </p>
          <p className="text-white/50 text-sm mb-8">
            You will be notified at <strong className="text-white/70">{form.email}</strong> once approved.
          </p>
          <button onClick={() => navigate('/login')}
            className="px-8 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)' }}>
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={bgStyle}>
      <Navbar />
      <CircuitBackground />
      <span className="absolute top-12 left-8 text-yellow-300 text-2xl opacity-40 select-none">✦</span>
      <span className="absolute top-16 right-10 text-yellow-300 text-xl opacity-35 select-none">✦</span>
      <span className="absolute bottom-12 left-12 text-purple-300 text-xl opacity-25 select-none">⚙</span>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 text-xs font-semibold text-amber-300"
                 style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
              🎓 Student Career Fit
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide">Career Fit Platform</h1>
            <p className="text-white/55 text-sm mt-1">Create your account to get started</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-8 shadow-2xl" style={glassCard}>
            <h2 className="text-lg font-bold text-white mb-1">Register</h2>
            <p className="text-white/45 text-sm mb-6">
              Fill in your details to create your career assessment account.
            </p>

            {error && (
              <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                   style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Full name',        name: 'name',     type: 'text',     placeholder: 'Alex Smith',            autoComplete: 'name' },
                { label: 'Email address',    name: 'email',    type: 'email',    placeholder: 'you@example.com',       autoComplete: 'email' },
                { label: 'Password',         name: 'password', type: 'password', placeholder: 'At least 6 characters', autoComplete: 'new-password' },
                { label: 'Confirm password', name: 'confirm',  type: 'password', placeholder: '••••••••',              autoComplete: 'new-password' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">{f.label}</label>
                  <input {...f} value={form[f.name]} onChange={handleChange} required
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
              ))}

              {/* Grade / Counselling level */}
              <div>
                <p className="text-sm font-medium text-white/70 mb-2">Counselling for</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: '10th', icon: '📖', label: '10th Grade', sub: 'Ages 15–16' },
                    { val: '12th', icon: '🏫', label: '12th Grade', sub: 'Ages 17–18' },
                  ].map(({ val, icon, label, sub }) => {
                    const sel = form.grade === val
                    return (
                      <button key={val} type="button"
                        onClick={() => setForm(f => ({ ...f, grade: val }))}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                        style={{
                          border: `2px solid ${sel ? 'rgba(251,191,36,0.7)' : 'rgba(255,255,255,0.12)'}`,
                          background: sel ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.04)',
                        }}>
                        <span className="text-2xl">{icon}</span>
                        <span className="text-sm font-semibold text-white/90">{label}</span>
                        <span className="text-xs text-white/45">{sub}</span>
                        {sel && <span className="text-xs font-bold text-amber-400">✓</span>}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white tracking-wide transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 mt-2"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                {loading ? 'Submitting…' : 'Create Account'}
              </button>
            </form>
          </div>

          <p className="text-center text-white/45 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">Sign in</Link>
          </p>
          <p className="text-center text-white/30 text-xs mt-2">
            Looking for MindCheck mental wellness?{' '}
            <Link to="/register" className="text-green-400 hover:text-green-300 transition-colors">Register here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
