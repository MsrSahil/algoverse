import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  name,
  icon: Icon,
  showPasswordToggle = false,
  onPasswordToggle,
  autoComplete // Added this prop
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleToggle = () => {
    setShowPassword(!showPassword)
    onPasswordToggle?.(!showPassword)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          type={showPasswordToggle && showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete} // Applied here
          className={`w-full rounded-xl border-2 bg-white/5 py-3 px-4 text-white placeholder-slate-500 transition duration-200 focus:outline-none ${
            Icon ? 'pl-12' : 'pl-4'
          } ${
            error
              ? 'border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
          }`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export default InputField