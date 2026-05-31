import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AuthContext = createContext(null)

const TOKEN_KEY = 'mindcheck_token'
const USER_KEY  = 'mindcheck_user'

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function authHeader() {
  const t = localStorage.getItem(TOKEN_KEY)
  return t ? { Authorization: `Bearer ${t}` } : {}
}

const INACTIVITY_MS = 30 * 60 * 1000 // 30 minutes

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const timerRef = useRef(null)

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  function resetTimer() {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(clearSession, INACTIVITY_MS)
  }

  useEffect(() => {
    if (!user) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }))
    resetTimer()
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  function persist(userData, jwt) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    localStorage.setItem(TOKEN_KEY, jwt)
    setUser(userData)
  }

  async function login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) return { ok: false, error: data.error }
    persist(data.user, data.token)
    return { ok: true, role: data.user.role }
  }

  function logout() {
    clearSession()
  }

  const value = useMemo(
    () => ({ user, login, logout, authHeader }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
