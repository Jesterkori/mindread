import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { CATEGORIES } from '../data/questions'

const RECAPTCHA_SITE_KEY = '6LdyJp4sAAAAAC0eByPC1HgbfSoPHh9QT91HfVxZ'

// step: 'form' | 'otp' | 'done'
export default function Register() {
  const navigate = useNavigate()
  const captchaRef = useRef(null)

  const [step, setStep] = useState('form')
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', category: '',
  })
  const [otp, setOtp] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  // ── Step 1: submit registration form ────────────────────────────────────────
  async function handleRegister(e) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('Please enter your full name.')
    if (!form.email.trim()) return setError('Please enter your email address.')
    if (!form.category) return setError('Please select your category.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (!captchaToken) return setError('Please complete the CAPTCHA.')

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
          captchaToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        captchaRef.current?.reset()
        setCaptchaToken(null)
        return setError(data.error)
      }
      setStep('otp')
    } finally {
      setLoading(false)
    }
  }

  // ── Step 2: verify OTP ───────────────────────────────────────────────────────
  async function handleVerifyOtp(e) {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) return setError('Please enter the 6-digit code.')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim().toLowerCase(), otp }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setStep('done')
    } finally {
      setLoading(false)
    }
  }

  async function resendOtp() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim().toLowerCase() }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setError('')
      alert('A new OTP has been sent to your email.')
    } finally {
      setLoading(false)
    }
  }

  // ── Render: step = done ──────────────────────────────────────────────────────
  if (step === 'done') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Email Verified!</h2>
          <p className="text-slate-600 mb-2">
            Your registration is now <strong>pending admin approval</strong>.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            You will receive an email at <strong>{form.email}</strong> once your account is approved. This usually takes up to 24 hours.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  // ── Render: step = otp ───────────────────────────────────────────────────────
  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
              <span className="text-3xl">📧</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Check your email</h1>
            <p className="text-slate-500 text-sm mt-1">
              We sent a 6-digit code to <strong>{form.email}</strong>
            </p>
          </div>

          <div className="card shadow-md">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Verification code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replaceAll(/\D/gu, ''))}
                  className="input-field text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Verifying…' : 'Verify Email'}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-4">
              Didn&apos;t receive it?{' '}
              <button
                onClick={resendOtp}
                disabled={loading}
                className="text-blue-600 font-medium hover:underline disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Render: step = form ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">MindCheck</h1>
          <p className="text-slate-500 text-sm mt-1">Create your account</p>
        </div>

        <div className="card shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-1">Register</h2>
          <p className="text-slate-500 text-sm mb-6">
            Fill in your details and choose your category. Your registration will be reviewed by an admin.
          </p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Alex Smith"
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input-field"
                placeholder="At least 6 characters"
                required
                autoComplete="new-password"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm password</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select your category
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                      ${form.category === cat.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'}`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={form.category === cat.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CAPTCHA */}
            <div>
              <p className="block text-sm font-medium text-slate-700 mb-2">
                Verify you&apos;re human
              </p>
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-2"
              disabled={loading || !captchaToken}
            >
              {loading ? 'Submitting…' : 'Create Account & Send OTP'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
