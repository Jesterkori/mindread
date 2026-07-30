import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import CareerDashboard from './pages/CareerDashboard'
import CareerProtectedRoute from './components/CareerProtectedRoute'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Questionnaire from './pages/Questionnaire'
import ThankYou from './pages/ThankYou'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/questionnaire"
        element={
          <ProtectedRoute>
            <Questionnaire />
          </ProtectedRoute>
        }
      />
      <Route
        path="/thankyou"
        element={
          <ProtectedRoute>
            <ThankYou />
          </ProtectedRoute>
        }
      />

      {/* Career Fit pages */}
      <Route path="/career/register" element={<Navigate to="/register?service=career_fit" replace />} />
      <Route path="/career/login" element={<Navigate to="/login" replace />} />
      <Route
        path="/career/dashboard"
        element={
          <CareerProtectedRoute>
            <CareerDashboard />
          </CareerProtectedRoute>
        }
      />
      <Route
        path="/career/questionnaire"
        element={
          <CareerProtectedRoute>
            <Questionnaire />
          </CareerProtectedRoute>
        }
      />
      <Route
        path="/career/thankyou"
        element={
          <CareerProtectedRoute>
            <ThankYou />
          </CareerProtectedRoute>
        }
      />

      {/* Admin pages */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
