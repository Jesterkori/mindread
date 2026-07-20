import { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data/questions'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { glassCard } from '../styles/theme'

const CARD_COLORS = {
  student:              { border: '#22c55e', bg: 'rgba(34,197,94,0.12)',   icon: '📚' },
  'young-adult':        { border: '#0d9488', bg: 'rgba(13,148,136,0.12)',  icon: '🎓' },
  married:              { border: '#f97316', bg: 'rgba(249,115,22,0.12)',  icon: '💍' },
  divorced:             { border: '#e879f9', bg: 'rgba(232,121,249,0.12)', icon: '💼' },
  older:                { border: '#a855f7', bg: 'rgba(168,85,247,0.12)',  icon: '🌟' },
  'single-mother':      { border: '#ec4899', bg: 'rgba(236,72,153,0.12)', icon: '🤝' },
  'single-father':      { border: '#0ea5e9', bg: 'rgba(14,165,233,0.12)', icon: '🤝' },
  'counselling-10th':   { border: '#f97316', bg: 'rgba(249,115,22,0.12)', icon: '📖' },
  'counselling-12th':   { border: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  icon: '🏫' },
}

export default function Register() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', category: '', institution: 'none' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [institutions, setInstitutions] = useState([])

  useEffect(() => {
    fetch('/api/institutions')
      .then(r => r.json())
      .then(d => { if (d.ok) setInstitutions(d.institutions) })
      .catch(() => {})
  }, [])

  if (user) {
    let dest = '/dashboard'
    if (user.role === 'admin') dest = '/admin'
    else if (user.service === 'career_fit') dest = '/career/dashboard'
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
    if (!form.category)                 return setError('Please select your category.')
    if (form.institution !== 'none' && !form.institution) return setError('Please select an institution from the dropdown.')
    if (form.password.length < 6)       return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        form.name.trim(),
          email:       form.email.trim().toLowerCase(),
          password:    form.password,
          category:    form.category,
          institution: form.institution === 'none' ? null : form.institution,
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
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">MindCheck</h1>
          <p className="text-white/55 text-sm mt-1">Create your account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-2xl" style={glassCard}>
          <h2 className="text-lg font-bold text-white mb-1">Register</h2>
          <p className="text-white/45 text-sm mb-6">
            Fill in your details to create your account.
          </p>

          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                 style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full name',        name: 'name',     type: 'text',     placeholder: 'Alex Smith',           autoComplete: 'name' },
              { label: 'Email address',    name: 'email',    type: 'email',    placeholder: 'you@example.com',      autoComplete: 'email' },
              { label: 'Password',         name: 'password', type: 'password', placeholder: 'At least 6 characters', autoComplete: 'new-password' },
              { label: 'Confirm password', name: 'confirm',  type: 'password', placeholder: '••••••••',             autoComplete: 'new-password' },
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

            {/* Institution */}
            <div>
              <p className="text-sm font-medium text-white/70 mb-2">Are you part of an institution?</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: 'none', icon: '👤', label: 'None',        sub: 'Individual / Independent' },
                  { val: 'join', icon: '🏫', label: 'Institution', sub: 'College or School' },
                ].map(({ val, icon, label, sub }) => {
                  const sel = val === 'none' ? form.institution === 'none' : form.institution !== 'none'
                  return (
                    <button key={val} type="button"
                      onClick={() => setForm(f => ({ ...f, institution: val === 'none' ? 'none' : '' }))}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                      style={{
                        border: `2px solid ${sel ? 'rgba(74,222,128,0.7)' : 'rgba(255,255,255,0.12)'}`,
                        background: sel ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.04)',
                      }}>
                      <span className="text-2xl">{icon}</span>
                      <span className="text-sm font-semibold text-white/90">{label}</span>
                      <span className="text-xs text-white/45">{sub}</span>
                      {sel && <span className="text-xs font-bold text-green-400">✓</span>}
                    </button>
                  )
                })}
              </div>
              {form.institution !== 'none' && (
                <div className="mt-2">
                  <select
                    value={form.institution}
                    onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
                    style={{ background: 'rgb(10,30,60)', border: '1.5px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }}>
                    <option value="">— Select your institution —</option>
                    {institutions.map(i => <option key={i.id ?? i.name} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <p className="text-sm font-medium text-white/70 mb-2">Select your category</p>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
                style={{ background: 'rgb(10,30,60)', border: '1.5px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }}>
                <option value="">— Select a category —</option>
                {CATEGORIES.map(cat => {
                  const meta = CARD_COLORS[cat.id] ?? { icon: cat.icon }
                  return (
                    <option key={cat.id} value={cat.id}>{meta.icon} {cat.label}</option>
                  )
                })}
              </select>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white tracking-wide transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 mt-2"
              style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)' }}>
              {loading ? 'Submitting…' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/45 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 font-semibold hover:text-green-300 transition-colors">Sign in</Link>
        </p>
      </div>
      </div>
      <Footer />
    </div>
  )
}
