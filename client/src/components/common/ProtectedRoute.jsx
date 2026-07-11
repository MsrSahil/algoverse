import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  // Display a dark, professional loading spinner while checking the session
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-800 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If they are authenticated, render the requested page
  return <Outlet />
}

export default ProtectedRoute