import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { bgStyle, glassCard } from '../styles/theme'

export default function ThankYou() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={bgStyle}>
      <CircuitBackground opacity={0.05} />

      <Navbar />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
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
            Thank you for completing the assessment. Our team will review your responses and
            release your personalised results shortly.
          </p>
          <p className="mt-3 text-xs text-white/35">
            You'll be able to view your results from your dashboard once they've been reviewed.
          </p>

          {/* Card */}
          <div className="mt-8 rounded-2xl p-5 text-left space-y-3"
            style={glassCard}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(74,222,128,0.15)' }}>
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Responses recorded</p>
                <p className="text-white/40 text-xs mt-0.5">Your answers have been securely saved.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(96,165,250,0.15)' }}>
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Under expert review</p>
                <p className="text-white/40 text-xs mt-0.5">Our team will analyse your results soon.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(251,191,36,0.15)' }}>
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Results on your dashboard</p>
                <p className="text-white/40 text-xs mt-0.5">Check back anytime to see your results.</p>
              </div>
            </div>
          </div>

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
