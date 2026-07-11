import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // Set initial loading to true so the app waits to check the session before rendering routes
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for an existing session when the app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authService.getCurrentUser()
        if (response.success) {
          setUser(response.data.user)
          setIsAuthenticated(true)
        }
      } catch (err) {
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const register = useCallback(async (fullName, username, email, password, confirmPassword) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(fullName, username, email, password, confirmPassword)
      if (response.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        return response.data
      }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(email, password)
      if (response.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        return response.data
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}