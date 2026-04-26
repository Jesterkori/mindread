import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ThankYou() {
  const { logout } = useAuth()
  const navigate   = useNavigate()
  useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-10">
      <div className="w-full max-w-xl mx-auto">

        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-lg">🧠</span>
            </div>
            <p className="font-semibold text-slate-800 text-sm">MindCheck</p>
          </div>
          <button
            onClick={() => { logout(); navigate('/login', { replace: true }) }}
            className="text-sm text-slate-400 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </header>

        <div className="card shadow-sm text-center py-10 px-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Assessment Submitted</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
            Thank you for completing the assessment. Our team will review your responses and
            release your personalised results shortly.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            You'll be able to view your results from your dashboard once they've been reviewed.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-primary flex-1">
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  )
}
