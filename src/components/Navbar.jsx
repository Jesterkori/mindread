import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/* Preflex Solutions Pvt.Ltd. logo mark — teardrop shape, 3 colour zones */
function PreflexLogo({ size = 38 }) {
  // Teardrop/location-pin: orange-red (left) · navy-indigo (right) · cyan (tip)
  const dots = [
    // outer left arc — orange/red (large)
    ['ol0', 16,  4, 2.5, '#f97316'],
    ['ol1',  9, 13, 2.5, '#f87171'],
    ['ol2',  5, 23, 2.4, '#ef4444'],
    ['ol3',  5, 34, 2.4, '#dc2626'],
    ['ol4', 10, 44, 2.3, '#dc2626'],
    ['ol5', 18, 52, 2.1, '#22d3ee'],
    // top — orange centre
    ['ot0', 24,  2, 2.5, '#f97316'],
    // outer right arc — dark navy/indigo (large)
    ['or0', 34,  2, 2.4, '#1e3a8a'],
    ['or1', 43,  6, 2.4, '#1e3a8a'],
    ['or2', 50, 14, 2.3, '#1e40af'],
    ['or3', 53, 24, 2.3, '#3730a3'],
    ['or4', 52, 35, 2.2, '#4338ca'],
    ['or5', 46, 45, 2.1, '#6d28d9'],
    ['or6', 37, 52, 2.0, '#7c3aed'],
    // inner left arc — red (medium)
    ['il0', 23,  9, 2.1, '#f97316'],
    ['il1', 15, 18, 2.1, '#ef4444'],
    ['il2', 12, 28, 2.0, '#dc2626'],
    ['il3', 13, 39, 1.9, '#ef4444'],
    ['il4', 19, 49, 1.8, '#0ea5e9'],
    // inner right arc — purple (medium)
    ['ir0', 33,  9, 2.0, '#1e40af'],
    ['ir1', 41, 16, 1.9, '#3730a3'],
    ['ir2', 44, 26, 1.9, '#4338ca'],
    ['ir3', 42, 37, 1.8, '#6d28d9'],
    ['ir4', 35, 46, 1.7, '#7c3aed'],
    // centre fill (small)
    ['c0',  28, 14, 1.7, '#f97316'],
    ['c1',  36, 20, 1.5, '#4338ca'],
    ['c2',  37, 30, 1.4, '#6d28d9'],
    ['c3',  31, 39, 1.4, '#0ea5e9'],
    ['c4',  25, 47, 1.3, '#06b6d4'],
    // bottom tip — cyan (tapering)
    ['t0',  26, 56, 1.7, '#0ea5e9'],
    ['t1',  27, 62, 1.4, '#06b6d4'],
    ['t2',  26, 68, 1.2, '#22d3ee'],
    ['t3',  27, 74, 1.0, '#67e8f9'],
  ]
  return (
    <svg width={size} height={Math.round(size * 1.5)} viewBox="0 0 58 78" fill="none">
      {dots.map(([key, cx, cy, r, fill]) => (
        <circle key={key} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
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
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <PreflexLogo size={30} />
          <div className="leading-tight">
            <p className={`font-extrabold text-sm tracking-tight ${logoText}`}>Preflex Solutions Pvt.Ltd.</p>
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
