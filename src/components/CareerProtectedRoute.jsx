import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CareerProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user || user.service !== 'career_fit') {
    return <Navigate to="/career/login" state={{ from: location }} replace />
  }

  return children
}
