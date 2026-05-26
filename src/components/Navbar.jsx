import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/* Preflex Solutions dot-globe logo — dots on transparent, no solid fill */
function PreflexLogo({ size = 36 }) {
  // Dots arranged in concentric rings to approximate the Preflex sphere mark
  const outer = [
    [20,3],[27,6],[33,12],[36,20],[33,28],[27,34],[20,37],[13,34],[7,28],[4,20],[7,12],[13,6],
  ]
  const mid = [
    [20,9],[25,11],[29,17],[29,23],[25,29],[20,31],[15,29],[11,23],[11,17],[15,11],
  ]
  const inner = [
    [20,15],[24,18],[25,22],[22,26],[17,26],[15,22],[15,18],
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {outer.map(([cx,cy],i) => <circle key={`o${i}`} cx={cx} cy={cy} r={2.1} fill="#dc2626" opacity="0.9"/>)}
      {mid.map(([cx,cy],i)   => <circle key={`m${i}`} cx={cx} cy={cy} r={1.7} fill="#e11d48" opacity="0.85"/>)}
      {inner.map(([cx,cy],i) => <circle key={`i${i}`} cx={cx} cy={cy} r={1.3} fill="#f43f5e" opacity="0.8"/>)}
      <circle cx="20" cy="20" r="1.9" fill="#dc2626" opacity="0.9"/>
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Home',     to: '/'           },
  { label: 'About',    to: '/#about'     },
  { label: 'Features', to: '/#features'  },
  { label: 'Contact',  to: '/#contact'   },
]

export default function Navbar({ transparent = false }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate  = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLanding = location.pathname === '/'
  const useDark   = transparent && isLanding && !scrolled

  const bg     = useDark ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'
  const text   = useDark ? 'text-white'     : 'text-slate-700'
  const subtext = useDark ? 'text-white/70' : 'text-slate-500'
  const border  = useDark ? 'border-white/20' : 'border-slate-200'
  const logoText = useDark ? 'text-white'   : 'text-slate-800'

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${bg} ${border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Left — brand */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <PreflexLogo size={34} />
          <div className="leading-tight">
            <p className={`font-extrabold text-sm tracking-tight ${logoText}`}>Preflex Solutions</p>
            <p className={`text-xs ${subtext}`}>MindCheck Platform</p>
          </div>
        </Link>

        {/* Centre — nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.to}
               className={`text-sm font-medium transition-colors hover:text-green-500 ${text}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className={`text-sm font-medium ${text} hover:text-green-500 transition-colors`}>
                {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </Link>
              <button onClick={handleLogout}
                      className="text-sm px-4 py-2 rounded-xl font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                      style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                    className={`text-sm font-medium ${text} hover:text-green-500 transition-colors`}>
                Sign In
              </Link>
              <Link to="/register"
                    className="text-sm px-4 py-2 rounded-xl font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)}
                className={`md:hidden p-2 rounded-lg ${text}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-lg">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.to} onClick={() => setOpen(false)}
               className="block text-sm font-medium text-slate-700 hover:text-green-500 transition-colors py-1">
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setOpen(false)}
                      className="text-sm font-medium text-slate-700">
                  {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <button onClick={handleLogout}
                        className="text-sm px-4 py-2 rounded-xl font-semibold text-white text-left"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}
                      className="text-sm font-medium text-slate-700">Sign In</Link>
                <Link to="/register" onClick={() => setOpen(false)}
                      className="text-sm px-4 py-2 rounded-xl font-semibold text-white text-center"
                      style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
