import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { User, Mail, Lock } from 'lucide-react'
import InputField from './InputField.jsx'
import PasswordStrength from './PasswordStrength.jsx'
import TermsCheckbox from './TermsCheckbox.jsx'
import SocialLogin from './SocialLogin.jsx'
import Toast from '../../components/common/Toast.jsx'

const RegisterForm = () => {
  const navigate = useNavigate()
  const { register, loading, error: authError, clearError } = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState(null)

  // Clear auth error when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  // Show toast for auth errors
  useEffect(() => {
    if (authError) {
      setToast({ type: 'error', message: authError })
    }
  }, [authError])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain an uppercase letter'
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain a lowercase letter'
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain a number'
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      newErrors.password = 'Password must contain a special character'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    try {
      await register(
        formData.fullName,
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword
      )

      setToast({
        type: 'success',
        message: 'Account created successfully! Redirecting to login...'
      })

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      console.error('Registration error:', err)
    }
  }

  const dismissToast = () => {
    setToast(null)
  }

  return (
    <div className="flex flex-col justify-center">
      {toast && <Toast type={toast.type} message={toast.message} onDismiss={dismissToast} />}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-emerald-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20">
              DSA
            </div>
          </div>
          <h1 className="text-3xl font-black text-white">Create your account</h1>
          <p className="mt-2 text-slate-400">
            Start learning Data Structures & Algorithms visually.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            name="fullName"
            error={errors.fullName}
            icon={User}
          />

          <InputField
            label="Username"
            placeholder="johndoe"
            value={formData.username}
            onChange={handleChange}
            name="username"
            error={errors.username}
            icon={User}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            name="email"
            error={errors.email}
            icon={Mail}
          />

          <div className="space-y-4">
            <InputField
              label="Password"
              type="password"
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              error={errors.password}
              icon={Lock}
              showPasswordToggle
              onPasswordToggle={setShowPassword}
            />
            {formData.password && <PasswordStrength password={formData.password} />}
          </div>

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            error={errors.confirmPassword}
            icon={Lock}
          />

          <TermsCheckbox
            checked={formData.termsAccepted}
            onChange={handleChange}
            name="termsAccepted"
            error={errors.termsAccepted}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <SocialLogin />

          <div className="text-center text-sm">
            <span className="text-slate-400">Already have an account? </span>
            <a href="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
