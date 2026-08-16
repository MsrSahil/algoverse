import { Check } from 'lucide-react'

const TermsCheckbox = ({ checked, onChange, error, name }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className="mt-1">
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-lg border-2 transition duration-200 ${
              checked
                ? 'border-cyan-400 bg-cyan-400/20'
                : 'border-white/10 bg-white/5 hover:border-cyan-400/50'
            }`}
          >
            {checked && <Check className="h-3 w-3 text-cyan-300" />}
          </div>
        </div>
        <span className="text-sm text-slate-300">
          I agree to the{' '}
          <span className="text-cyan-300">
            Terms & Conditions
          </span>
          {' '}and{' '}
          <span className="text-cyan-300">
            Privacy Policy
          </span>
        </span>
      </label>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export default TermsCheckbox
