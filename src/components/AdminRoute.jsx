import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // Check if user is admin (you can modify this logic based on your needs)
  // For now, we'll check if email contains 'admin' or user has admin role
  const isAdmin = user && (
    user.email?.includes('admin') || 
    user.role === 'admin' ||
    user.email === 'admin@university.edu'
  )

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default AdminRoute

