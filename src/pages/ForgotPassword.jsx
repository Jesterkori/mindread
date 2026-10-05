import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { bgStyle, glassCard } from '../styles/theme'

const inputStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1.5px solid rgba(255,255,255,0.15)',
}

export default function ForgotPassword() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep]         = useState('email') // 'email' | 'reset'
  const [email, setEmail]       = useState('')
  const [otp, setOtp]           = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')
  const [info, setInfo]         = useState('')
  const [loading, setLoading]   = useState(false)

  if (user) {
    let dest = user.service === 'career_fit' ? '/career/dashboard' : '/dashboard'
    if (user.role === 'admin') dest = '/admin'
    return <Navigate to={dest} replace />
  }

  async function requestCode(e) {
    e.preventDefault()
    setError('')
    if (!email.trim()) return setError('Please enter your email address.')
    setLoading(true)
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
    } catch {
      // Still move to the next step — we never reveal whether the email exists.
    }
    setLoading(false)
    setInfo('If that email is registered with us, a reset code is on its way. Check your inbox (and spam folder).')
    setStep('reset')
  }

  async function resetPassword(e) {
    e.preventDefault()
    setError('')
    if (!otp.trim())              return setError('Please enter the code we emailed you.')
    if (password.length < 6)      return setError('Password must be at least 6 characters.')
    if (password !== confirm)     return setError('Passwords do not match.')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp: otp.trim(), newPassword: password }),
      })
      const data = await res.json()
      setLoading(false)
      if (!res.ok || !data.ok) {
        setError(data.error || 'That code is invalid or has expired.')
        return
      }
      navigate('/login', { replace: true, state: { passwordReset: true } })
    } catch {
      setLoading(false)
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={bgStyle}>
      <Navbar />
      <CircuitBackground />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-wide">MindCheck</h1>
            <p className="text-white/60 text-sm mt-1">Mental Wellness Assessment Tool</p>
          </div>

          <div className="rounded-2xl p-8 shadow-2xl" style={glassCard}>
            {step === 'email' ? (
              <>
                <h2 className="text-xl font-bold text-white mb-1">Forgot password?</h2>
                <p className="text-white/50 text-sm mb-6">
                  Enter the email on your account and we&apos;ll send you a code to reset your password.
                </p>

                {error && (
                  <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={requestCode} className="space-y-5">
                  <div>
                    <label htmlFor="fp-email" className="block text-sm font-medium text-white/70 mb-1.5">Email address</label>
                    <input
                      id="fp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      autoFocus
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all
                               hover:brightness-110 active:scale-95 disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', color: '#fff' }}
                  >
                    {loading ? 'Sending…' : 'Send reset code'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white mb-1">Enter your reset code</h2>
                <p className="text-white/50 text-sm mb-6">
                  We emailed a 6-digit code to <span className="text-white/80 font-medium">{email}</span>.
                  It expires in 15 minutes.
                </p>

                {info && (
                  <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)', color: '#86efac' }}>
                    {info}
                  </div>
                )}

                {error && (
                  <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)', color: '#fca5a5' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={resetPassword} className="space-y-5">
                  <div>
                    <label htmlFor="fp-otp" className="block text-sm font-medium text-white/70 mb-1.5">6-digit code</label>
                    <input
                      id="fp-otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      required
                      autoFocus
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all tracking-[0.3em] text-center font-semibold"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    />
                  </div>

                  <div>
                    <label htmlFor="fp-password" className="block text-sm font-medium text-white/70 mb-1.5">New password</label>
                    <input
                      id="fp-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    />
                  </div>

                  <div>
                    <label htmlFor="fp-confirm" className="block text-sm font-medium text-white/70 mb-1.5">Confirm new password</label>
                    <input
                      id="fp-confirm"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all
                               hover:brightness-110 active:scale-95 disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', color: '#fff' }}
                  >
                    {loading ? 'Resetting…' : 'Reset password'}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => { setStep('email'); setOtp(''); setPassword(''); setConfirm(''); setError(''); setInfo('') }}
                  className="w-full text-center text-white/45 text-sm mt-4 hover:text-white/70 transition-colors"
                >
                  Use a different email or resend code
                </button>
              </>
            )}
          </div>

          <p className="text-center text-white/45 text-sm mt-6">
            Remembered your password?{' '}
            <Link to="/login" className="text-green-400 font-semibold hover:text-green-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
