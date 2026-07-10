import { Check, X } from 'lucide-react'

const PasswordStrength = ({ password }) => {
  const requirements = [
    {
      label: 'Minimum 8 characters',
      met: password.length >= 8
    },
    {
      label: 'Uppercase letter',
      met: /[A-Z]/.test(password)
    },
    {
      label: 'Lowercase letter',
      met: /[a-z]/.test(password)
    },
    {
      label: 'Number',
      met: /\d/.test(password)
    },
    {
      label: 'Special character',
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  ]

  const metRequirements = requirements.filter((r) => r.met).length
  const strength = Math.ceil((metRequirements / requirements.length) * 100)

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500'
    if (strength < 70) return 'bg-yellow-500'
    return 'bg-emerald-500'
  }

  const getStrengthLabel = () => {
    if (strength < 40) return 'Weak'
    if (strength < 70) return 'Fair'
    return 'Strong'
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">Password Strength</span>
          <span className="text-xs font-semibold text-slate-300">{getStrengthLabel()}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <X className="h-4 w-4 text-slate-500" />
            )}
            <span className={req.met ? 'text-slate-300' : 'text-slate-500'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordStrength
