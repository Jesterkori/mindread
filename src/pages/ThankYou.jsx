import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { bgStyle, glassCard } from '../styles/theme'

export default function ThankYou() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [paymentQr, setPaymentQr] = useState('')
  const [paymentNote, setPaymentNote] = useState('')

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(d => {
        if (d.ok && d.config.payment_qr_base64) {
          setPaymentQr(d.config.payment_qr_base64)
          setPaymentNote(d.config.payment_instructions || '')
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={bgStyle}>
      <CircuitBackground opacity={0.05} />

      <Navbar />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md text-center">

          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
            style={{ background: 'rgba(74,222,128,0.15)', border: '2px solid rgba(74,222,128,0.4)' }}>
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-3">Assessment Submitted</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
            Thank you for completing the assessment.
          </p>

          {/* Payment card */}
          {paymentQr ? (
            <div className="mt-8 rounded-2xl p-6 text-center" style={glassCard}>
              <h2 className="text-base font-extrabold text-white mb-1">Scan to Pay</h2>
              <p className="text-white/50 text-xs mb-5">
                Once your payment is confirmed, our team will release your results.
              </p>
              <div className="mx-auto mb-5 rounded-xl p-3 inline-block" style={{ background: 'white' }}>
                <img src={paymentQr} alt="Payment QR code" style={{ width: 200, height: 200, objectFit: 'contain' }} />
              </div>
              {paymentNote && (
                <p className="text-white/65 text-sm leading-relaxed whitespace-pre-line text-left">{paymentNote}</p>
              )}
            </div>
          ) : (
            <p className="mt-8 text-xs text-white/35">
              Our team will review your responses and release your results shortly. You'll be able to view them from your dashboard once they've been reviewed.
            </p>
          )}

          <button
            onClick={() => navigate(user?.service === 'career_fit' ? '/career/dashboard' : '/dashboard')}
            className="mt-6 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
