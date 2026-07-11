import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import InputField from '../Register/InputField'
import SocialLogin from '../Register/SocialLogin'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  const { login, loading, error: authError, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Clear context errors on unmount or initial load
  useEffect(() => {
    clearError()
  }, [clearError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (authError) clearError()
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email format'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      // Error is handled by AuthContext, we don't need to do anything here
      console.error('Login failed')
    }
  }

  return (
    <div className="flex w-full items-center justify-center lg:justify-end">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue your DSA learning journey.
          </p>
        </div>

        {/* Global Auth Error */}
        {authError && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            error={validationErrors.email}
            autoComplete="email"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            error={validationErrors.password}
            showPasswordToggle={true}
            autoComplete="current-password"
          />

          {/* Options Row */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer h-4 w-4 appearance-none rounded-md border border-slate-500 bg-slate-800/50 checked:border-cyan-500 checked:bg-cyan-500 transition-all cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
            </label>

            <a href="#" className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8">
          <SocialLogin />
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm