import { useMemo } from 'react'
import { STEP_TYPES } from './visualizationTypes.js'

/**
 * Visual element state types for styling
 */
const ELEMENT_STATE = {
  NORMAL: 'normal',
  COMPARING: 'comparing',
  SWAPPING: 'swapping',
  SORTED: 'sorted',
  HIGHLIGHTED: 'highlighted'
}

/**
 * Returns the state of an array element at a given index based on generic step data.
 */
const getElementState = (index, step) => {
  if (!step) return ELEMENT_STATE.NORMAL

  const { type, indices = [], sortedIndices = [], highlightedIndices = [] } = step

  if (type === STEP_TYPES.COMPLETE) {
    return ELEMENT_STATE.SORTED
  }

  if (sortedIndices.includes(index)) {
    return ELEMENT_STATE.SORTED
  }

  if (type === STEP_TYPES.SORTED && indices.includes(index)) {
    return ELEMENT_STATE.SORTED
  }

  if ((type === STEP_TYPES.SWAP || type === STEP_TYPES.OVERWRITE) && indices.includes(index)) {
    return ELEMENT_STATE.SWAPPING
  }

  if ((type === STEP_TYPES.COMPARE || type === STEP_TYPES.CHECK) && indices.includes(index)) {
    return ELEMENT_STATE.COMPARING
  }

  if (highlightedIndices.includes(index) || (type === STEP_TYPES.HIGHLIGHT && indices.includes(index))) {
    return ELEMENT_STATE.HIGHLIGHTED
  }

  return ELEMENT_STATE.NORMAL
}

/**
 * Returns Tailwind CSS class names according to element state.
 */
const getStateStyles = (state) => {
  switch (state) {
    case ELEMENT_STATE.COMPARING:
      return {
        cardBorder: 'border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.25)]',
        cardBg: 'bg-amber-950/40',
        barGradient: 'from-amber-500 to-yellow-400',
        badgeBg: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
        badgeText: 'CMP',
        textColor: 'text-amber-200 font-bold'
      }
    case ELEMENT_STATE.SWAPPING:
      return {
        cardBorder: 'border-rose-400/80 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
        cardBg: 'bg-rose-950/40',
        barGradient: 'from-rose-500 to-red-400 scale-105',
        badgeBg: 'bg-rose-400/20 text-rose-300 border-rose-400/40',
        badgeText: 'SWAP',
        textColor: 'text-rose-200 font-bold'
      }
    case ELEMENT_STATE.SORTED:
      return {
        cardBorder: 'border-emerald-400/70 shadow-[0_0_12px_rgba(52,211,153,0.2)]',
        cardBg: 'bg-emerald-950/30',
        barGradient: 'from-emerald-500 to-teal-400',
        badgeBg: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
        badgeText: '✓',
        textColor: 'text-emerald-200 font-semibold'
      }
    case ELEMENT_STATE.HIGHLIGHTED:
      return {
        cardBorder: 'border-violet-400/80 shadow-[0_0_15px_rgba(167,139,250,0.25)]',
        cardBg: 'bg-violet-950/40',
        barGradient: 'from-violet-500 to-indigo-400',
        badgeBg: 'bg-violet-400/20 text-violet-300 border-violet-400/40',
        badgeText: 'FOCUS',
        textColor: 'text-violet-200 font-bold'
      }
    case ELEMENT_STATE.NORMAL:
    default:
      return {
        cardBorder: 'border-white/10 hover:border-cyan-400/40',
        cardBg: 'bg-slate-900/60',
        barGradient: 'from-cyan-500/80 to-emerald-400/85',
        badgeBg: '',
        badgeText: '',
        textColor: 'text-slate-200 font-medium'
      }
  }
}

/**
 * Generic Array Visualizer Component
 *
 * Renders array items as scalable, interactive vertical bars/cards
 * with animated transitions and state feedback.
 */
const ArrayVisualizer = ({
  step = null,
  fallbackArray = [],
  isComingSoon = false,
  minHeight = 32,
  maxHeight = 200
}) => {
  // Determine the active array snapshot to render
  const arrayData = useMemo(() => {
    if (step && Array.isArray(step.arrayState) && step.arrayState.length > 0) {
      return step.arrayState
    }
    if (Array.isArray(fallbackArray) && fallbackArray.length > 0) {
      return fallbackArray
    }
    return []
  }, [step, fallbackArray])

  const maxValue = useMemo(() => {
    if (arrayData.length === 0) return 1
    const max = Math.max(...arrayData.map(Number).filter((n) => !Number.isNaN(n)))
    return max > 0 ? max : 1
  }, [arrayData])

  if (isComingSoon && arrayData.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center">
        <p className="text-sm font-medium text-slate-300">
          Interactive visualization for this algorithm is currently under development.
        </p>
        <span className="mt-2 text-xs text-slate-500">
          Stay tuned for upcoming visualizer modules.
        </span>
      </div>
    )
  }

  if (arrayData.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
        No array data available to visualize. Use custom input to provide numbers.
      </div>
    )
  }

  return (
    <div
      className="flex min-h-60 w-full items-end justify-center gap-3 overflow-x-auto px-4 py-6 scrollbar-thin"
      role="list"
      aria-label="Array visualization elements"
    >
      {arrayData.map((value, index) => {
        const state = getElementState(index, step)
        const styles = getStateStyles(state)
        const numericValue = typeof value === 'number' ? value : Number(value) || 0
        const barHeight = Math.max(
          minHeight,
          Math.min(maxHeight, (numericValue / maxValue) * maxHeight)
        )

        return (
          <div
            key={`arr-elem-${index}-${value}`}
            className="group flex flex-col items-center gap-2 transition-transform duration-200"
            role="listitem"
            aria-label={`Index ${index}, value ${value}, status ${state}`}
          >
            {/* Status indicator tag */}
            <div className="h-5 flex items-center justify-center">
              {styles.badgeText ? (
                <span
                  className={`rounded-full border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${styles.badgeBg}`}
                >
                  {styles.badgeText}
                </span>
              ) : (
                <span className="opacity-0 text-[10px]">—</span>
              )}
            </div>

            {/* Visual bar element */}
            <div
              className={`flex w-12 sm:w-14 flex-col justify-end items-center rounded-2xl border p-1.5 transition-all duration-300 ${styles.cardBorder} ${styles.cardBg}`}
              style={{ minHeight: `${maxHeight + 20}px` }}
            >
              <div
                className={`w-full rounded-xl bg-linear-to-t transition-all duration-300 flex items-center justify-center ${styles.barGradient}`}
                style={{ height: `${barHeight}px` }}
              >
                <span className={`text-xs drop-shadow-md text-slate-950 font-bold select-none ${numericValue > 20 ? 'opacity-90' : 'opacity-0'}`}>
                  {value}
                </span>
              </div>
            </div>

            {/* Value display */}
            <span className={`text-sm tracking-tight transition-colors duration-200 ${styles.textColor}`}>
              {value}
            </span>

            {/* Index label */}
            <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono text-slate-400">
              [{index}]
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default ArrayVisualizer
