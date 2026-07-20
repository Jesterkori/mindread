import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CareerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const bgStyle = { background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }

  return (
    <div className="min-h-screen flex flex-col" style={bgStyle}>
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold text-amber-300"
               style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
            🎓 Student Career Fit Evaluation Platform
          </div>

          <h1 className="text-4xl font-extrabold text-white mb-3">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-white/55 text-sm mb-2">
            {user?.grade ? `Counselling for ${user.grade} Grade` : 'Career Fit Assessment'}
          </p>

          <div className="rounded-2xl p-10 mt-8 shadow-2xl"
               style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}>
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-xl font-bold text-white mb-2">Coming Soon</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Your career assessment dashboard is being built. Check back soon for personalized career guidance and evaluations.
            </p>
          </div>

          <button onClick={handleLogout}
            className="mt-8 px-6 py-2.5 rounded-xl font-semibold text-sm text-white/80 transition-all hover:text-white hover:brightness-110 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
            Sign out
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
