import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

const Toast = ({ type = 'success', message, onDismiss, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  const bgColor = type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
  const textColor = type === 'success' ? 'text-emerald-300' : 'text-red-300'
  const Icon = type === 'success' ? CheckCircle : AlertCircle

  return (
    <div className={`fixed top-4 right-4 rounded-xl border ${bgColor} p-4 shadow-lg backdrop-blur-xl z-50 flex items-start gap-3 max-w-md animate-fade-in`}>
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${textColor}`} />
      <div className="flex-1">
        <p className={`text-sm font-semibold ${textColor}`}>{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-300 transition"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Toast
