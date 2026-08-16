import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  // Dedicated boot/loading state for session check. Route guards rely on this.
  const [authLoading, setAuthLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = useCallback(async () => {
    setAuthLoading(true)
    try {
      const response = await authService.getCurrentUser()
      if (response.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch {
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setAuthLoading(false)
    }
  }, [])

  // Check for an existing session when the app loads
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

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

  // UPDATED: Added rememberMe parameter
  const login = useCallback(async (email, password, rememberMe = false) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(email, password, rememberMe)
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
    authLoading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    checkAuth,
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