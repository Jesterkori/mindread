import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CATEGORIES } from '../data/questions'

const CARD_COLORS = {
  student:       { border: '#22c55e', bg: 'rgba(34,197,94,0.12)',  icon: '📚' },
  'young-adult': { border: '#0d9488', bg: 'rgba(13,148,136,0.12)', icon: '🎓' },
  married:       { border: '#f97316', bg: 'rgba(249,115,22,0.12)', icon: '💍' },
  divorced:      { border: '#e879f9', bg: 'rgba(232,121,249,0.12)',icon: '🌱' },
  older:         { border: '#a855f7', bg: 'rgba(168,85,247,0.12)', icon: '🌟' },
}

function PageShell({ children }) {
  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.07, pointerEvents: 'none' }}>
        <defs>
          <pattern id="circuit2" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M15 60 H45 M45 60 V25 M45 25 H80 M80 25 V60 M80 60 H105"
                  stroke="#4ade80" strokeWidth="1" fill="none" />
            <circle cx="45" cy="60" r="3" fill="#4ade80" />
            <circle cx="80" cy="25" r="3" fill="#4ade80" />
            <circle cx="80" cy="60" r="2" fill="#4ade80" />
            <path d="M25 95 H60 M60 95 V108" stroke="#60a5fa" strokeWidth="1" fill="none" />
            <circle cx="60" cy="95" r="2" fill="#60a5fa" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit2)" />
      </svg>
      <span className="absolute top-12 left-8 text-yellow-300 text-2xl opacity-40 select-none">✦</span>
      <span className="absolute top-1/3 left-6 text-cyan-300 text-lg opacity-30 select-none">✦</span>
      <span className="absolute top-16 right-10 text-yellow-300 text-xl opacity-35 select-none">✦</span>
      <span className="absolute bottom-24 right-8 text-green-300 text-2xl opacity-25 select-none">⚙</span>
      <span className="absolute bottom-12 left-12 text-purple-300 text-xl opacity-25 select-none">⚙</span>
      <div className="relative z-10 w-full max-w-lg">
        {children}
      </div>
    </div>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl p-8 shadow-2xl ${className}`}
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(255,255,255,0.15)',
      }}
    >
      {children}
    </div>
  )
}

function GlassInput({ label, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: `1.5px solid ${focused ? 'rgba(74,222,128,0.6)' : 'rgba(255,255,255,0.15)'}`,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function ErrorBox({ msg }) {
  if (!msg) return null
  return (
    <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
         style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }}>
      {msg}
    </div>
  )
}

// ─── step = done ──────────────────────────────────────────────────────────────
function StepDone({ email, onLogin }) {
  return (
    <PageShell>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
             style={{ background: 'rgba(74,222,128,0.2)', border: '2px solid rgba(74,222,128,0.5)' }}>
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">Email Verified!</h2>
        <p className="text-white/70 mb-2">
          Your registration is now <strong className="text-green-400">pending admin approval</strong>.
        </p>
        <p className="text-white/50 text-sm mb-8">
          You'll receive an email at <strong className="text-white/70">{email}</strong> once approved.
          This usually takes up to 24 hours.
        </p>
        <button
          onClick={onLogin}
          className="px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all
                     hover:brightness-110 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', color: '#fff' }}
        >
          Back to Login
        </button>
      </div>
    </PageShell>
  )
}

// ─── step = otp ───────────────────────────────────────────────────────────────
function StepOtp({ email, onVerify, onResend, loading, error }) {
  const [otp, setOtp] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onVerify(otp)
  }

  return (
    <PageShell>
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
             style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.25)' }}>
          <span className="text-2xl">📧</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Check your email</h1>
        <p className="text-white/55 text-sm mt-1">
          We sent a 6-digit code to <strong className="text-white/80">{email}</strong>
        </p>
      </div>

      <GlassCard>
        <ErrorBox msg={error} />
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Verification code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              required
              className="w-full rounded-xl px-4 py-4 text-center text-3xl font-mono font-bold tracking-[0.5em]
                         text-white placeholder-white/20 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(74,222,128,0.4)',
                letterSpacing: '0.5em',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all
                       hover:brightness-110 active:scale-95 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', color: '#fff' }}
          >
            {loading ? 'Verifying…' : 'Verify Email'}
          </button>
        </form>

        <p className="text-center text-white/45 text-sm mt-5">
          Didn&apos;t receive it?{' '}
          <button
            onClick={onResend}
            disabled={loading}
            className="text-green-400 font-semibold hover:text-green-300 transition-colors disabled:opacity-50"
          >
            Resend OTP
          </button>
        </p>
      </GlassCard>
    </PageShell>
  )
}

// ─── step = form ──────────────────────────────────────────────────────────────
function StepForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', category: '',
  })

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <PageShell>
      {/* Logo */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
             style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.25)' }}>
          <span className="text-2xl">🧠</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-wide">MindCheck</h1>
        <p className="text-white/55 text-sm mt-1">Create your account</p>
      </div>

      <GlassCard>
        <h2 className="text-lg font-bold text-white mb-1">Register</h2>
        <p className="text-white/45 text-sm mb-6">
          Fill in your details. Your account will be reviewed by an admin after email verification.
        </p>

        <ErrorBox msg={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput label="Full name" type="text" name="name" value={form.name}
            onChange={handleChange} placeholder="Alex Smith" required autoComplete="name" />

          <GlassInput label="Email address" type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="you@example.com" required autoComplete="email" />

          <GlassInput label="Password" type="password" name="password" value={form.password}
            onChange={handleChange} placeholder="At least 6 characters" required autoComplete="new-password" />

          <GlassInput label="Confirm password" type="password" name="confirm" value={form.confirm}
            onChange={handleChange} placeholder="••••••••" required autoComplete="new-password" />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Select your category</label>
            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
              {CATEGORIES.map(cat => {
                const meta = CARD_COLORS[cat.id] ?? { border: '#60a5fa', bg: 'rgba(96,165,250,0.12)', icon: cat.icon }
                const selected = form.category === cat.id
                return (
                  <label
                    key={cat.id}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                    style={{
                      border: `2px solid ${selected ? meta.border : 'rgba(255,255,255,0.12)'}`,
                      background: selected ? meta.bg : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <input type="radio" name="category" value={cat.id} checked={selected}
                           onChange={handleChange} className="sr-only" />
                    <span className="text-xl">{meta.icon}</span>
                    <span className="text-sm font-medium text-white/85">{cat.label}</span>
                    {selected && <span className="ml-auto text-xs font-bold" style={{ color: meta.border }}>✓</span>}
                  </label>
                )
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all
                       hover:brightness-110 active:scale-95 disabled:opacity-50 mt-2"
            style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', color: '#fff' }}
          >
            {loading ? 'Submitting…' : 'Create Account & Send OTP'}
          </button>
        </form>
      </GlassCard>

      <p className="text-center text-white/45 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-green-400 font-semibold hover:text-green-300 transition-colors">
          Sign in
        </Link>
      </p>
    </PageShell>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState('form')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(form) {
    setError('')
    if (!form.name.trim())           return setError('Please enter your full name.')
    if (!form.email.trim())          return setError('Please enter your email address.')
    if (!form.category)              return setError('Please select your category.')
    if (form.password.length < 6)   return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          category: form.category,
        }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setEmail(form.email.trim().toLowerCase())
      setStep('otp')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp(otp) {
    setError('')
    if (otp.length !== 6) return setError('Please enter the 6-digit code.')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setStep('done')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') return <StepDone email={email} onLogin={() => navigate('/login')} />

  if (step === 'otp') {
    return (
      <StepOtp
        email={email}
        onVerify={handleVerifyOtp}
        onResend={handleResend}
        loading={loading}
        error={error}
      />
    )
  }

  return <StepForm onSubmit={handleRegister} loading={loading} error={error} />
}
