import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const GuestRoute = () => {
  const { isAuthenticated, authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-800 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default GuestRoute
