import { useState } from 'react'
import { Shuffle, RotateCcw, ArrowRight, AlertCircle } from 'lucide-react'
import { parseArrayInput, generateRandomArray } from '../visualizer/visualizationUtils.js'

/**
 * Custom Input Panel Component
 *
 * Allows users to provide custom numerical arrays or generate random datasets
 * to feed into algorithm step generators.
 */
const CustomInputPanel = ({
  initialArray = [50, 30, 80, 10, 60],
  onApplyArray,
  onResetDefault,
  disabled = false,
  isComingSoon = false
}) => {
  const defaultText = Array.isArray(initialArray) ? initialArray.join(', ') : '50, 30, 80, 10, 60'
  const [inputText, setInputText] = useState(defaultText)
  const [errorMessage, setErrorMessage] = useState('')

  const handleApply = (textToApply = inputText) => {
    if (disabled || isComingSoon) return

    const parsed = parseArrayInput(textToApply, {
      minLength: 2,
      maxLength: 15,
      minValue: -999,
      maxValue: 999
    })

    if (!parsed.success) {
      setErrorMessage(parsed.error || 'Invalid input.')
      return
    }

    setErrorMessage('')
    onApplyArray?.(parsed.data)
  }

  const handleRandomize = () => {
    if (disabled || isComingSoon) return
    const randomArray = generateRandomArray(6, 10, 95)
    const randomString = randomArray.join(', ')
    setInputText(randomString)
    setErrorMessage('')
    onApplyArray?.(randomArray)
  }

  const handleReset = () => {
    if (disabled || isComingSoon) return
    setInputText(defaultText)
    setErrorMessage('')
    if (onResetDefault) {
      onResetDefault()
    } else {
      const parsed = parseArrayInput(defaultText)
      if (parsed.success) {
        onApplyArray?.(parsed.data)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleApply()
    }
  }

  return (
    <section
      className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
      aria-labelledby="custom-input-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 id="custom-input-title" className="text-lg font-bold text-white">
            Custom Input
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Enter 2–15 comma-separated integers (−999 to 999) or generate a random dataset.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled || isComingSoon}
            onClick={handleRandomize}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
            title="Generate random array"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>Random</span>
          </button>

          <button
            type="button"
            disabled={disabled || isComingSoon}
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/20 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            title="Reset to default array"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            disabled={disabled || isComingSoon}
            onChange={(e) => {
              setInputText(e.target.value)
              if (errorMessage) setErrorMessage('')
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 50, 30, 80, 10, 60"
            className={`w-full rounded-xl border bg-slate-950/70 px-4 py-2.5 font-mono text-sm text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errorMessage
                ? 'border-red-500/70 focus:border-red-400 focus:ring-red-400/30'
                : 'border-white/10 focus:border-cyan-400/60 focus:ring-cyan-400/30'
            }`}
            aria-label="Enter array values"
          />
        </div>

        <button
          type="button"
          disabled={disabled || isComingSoon}
          onClick={() => handleApply()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-linear-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.2)] transition hover:from-cyan-400 hover:to-emerald-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Apply Input</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {errorMessage && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </section>
  )
}

export default CustomInputPanel
