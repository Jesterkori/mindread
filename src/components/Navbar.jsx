import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PreflexLogo from './PreflexLogo'

const NAV_LINKS = [
  { label: 'Home',     to: '/'           },
  { label: 'About',    to: '/#about'     },
  { label: 'Features', to: '/#features'  },
  { label: 'Contact',  to: '/#contact'   },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate  = useNavigate()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Left — brand */}
        <Link to="/" className="flex-shrink-0">
          <PreflexLogo height={40} />
        </Link>

        {/* Centre — nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.to}
               className="text-sm font-medium text-slate-700 transition-colors hover:text-green-500">
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="text-sm font-medium text-slate-700 hover:text-green-500 transition-colors">
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
                    className="text-sm font-medium text-slate-700 hover:text-green-500 transition-colors">
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
                className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100">
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
