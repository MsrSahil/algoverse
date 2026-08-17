import { useRef, useLayoutEffect, useMemo } from 'react'
import { STEP_TYPES } from './visualizationTypes.js'
import { getElementState } from './elementStates.js'
import ArrayElement from './ArrayElement.jsx'

/* ─────────────────────────────────────────────────────────────────────────
   FLIP SWAP ANIMATION
   ─────────────────────────────────────────────────────────────────────────
   The generator emits a SWAP step where arrayState already reflects the
   post-swap order. We detect this transition, record DOM positions of the
   two swapping slots BEFORE the new paint, apply inverse translateX to
   hold them in their pre-swap visual positions, force a reflow, then
   animate them to zero — achieving a smooth physical exchange.

   Curve: cubic-bezier(0.34, 1.56, 0.64, 1) — slight overshoot at the end
   for a natural "settle" feel without being cartoonish.
   ─────────────────────────────────────────────────────────────────────────*/
const SWAP_ANIM_MS = 700

/* ─────────────────────────────────────────────────────────────────────────
   INTERNAL SUB-COMPONENTS
   ─────────────────────────────────────────────────────────────────────────*/

/**
 * ComparisonPanel
 * Shows the relation between compared values and whether a swap will happen.
 * Reads only from step metadata — no algorithm logic.
 */
const ComparisonPanel = ({ leftVal, rightVal, willSwap }) => {
  const relation = willSwap ? '>' : leftVal === rightVal ? '=' : '<'

  const outcome = willSwap
    ? `${leftVal} is greater — these elements will swap.`
    : leftVal === rightVal
      ? `Both elements are equal — no swap needed.`
      : `${leftVal} is smaller — no swap needed.`

  return (
    <div
      className="flex flex-col items-center gap-3 py-2"
      aria-label={`Comparing ${leftVal} ${relation} ${rightVal}. ${outcome}`}
    >
      {/* Relation chip */}
      <div className="flex items-center gap-3">
        <span
          className={`
            rounded-full border px-3 py-1 font-mono text-lg font-black tabular-nums
            ${willSwap
              ? 'border-amber-400/60 bg-amber-950/70 text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.3)]'
              : 'border-slate-600/50 bg-slate-900/70 text-slate-300'
            }
          `}
          aria-hidden="true"
        >
          {leftVal} {relation} {rightVal}
        </span>
      </div>

      {/* Outcome sentence */}
      <p
        className={`
          text-xs font-semibold leading-snug
          ${willSwap ? 'text-amber-300' : 'text-slate-400'}
        `}
      >
        {outcome}
      </p>
    </div>
  )
}

/**
 * PassIndicator
 * Shows which pass is currently active and its progress.
 */
const PassIndicator = ({ pass, totalElements, sortedCount, earlyTermination }) => {
  const totalPasses = totalElements - 1
  const passLabel = pass > 0 ? `Pass ${pass} of ${totalPasses}` : 'Initialising'

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-950/30 px-3.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
          {passLabel}
        </span>
      </div>
      {earlyTermination && (
        <span className="text-xs font-semibold text-emerald-400">
          Early termination ✓
        </span>
      )}
      {sortedCount > 0 && (
        <span className="text-xs text-slate-500">
          {sortedCount} element{sortedCount !== 1 ? 's' : ''} finalized
        </span>
      )}
    </div>
  )
}

/**
 * StatsRow
 * Compact comparisons / swaps counters from step metadata.
 * Secondary info — never distracts from the main visualization.
 */
const StatsRow = ({ totalComparisons, totalSwaps }) => {
  if (totalComparisons === undefined && totalSwaps === undefined) return null
  return (
    <div
      className="flex items-center gap-4 text-xs text-slate-500"
      aria-label="Algorithm statistics"
    >
      <span className="h-px w-5 bg-slate-700/60" aria-hidden="true" />
      {totalComparisons !== undefined && (
        <span>
          <span className="font-semibold text-slate-400">{totalComparisons}</span>
          {' '}comparison{totalComparisons !== 1 ? 's' : ''}
        </span>
      )}
      {totalComparisons !== undefined && totalSwaps !== undefined && (
        <span className="text-slate-700" aria-hidden="true">·</span>
      )}
      {totalSwaps !== undefined && (
        <span>
          <span className="font-semibold text-slate-400">{totalSwaps}</span>
          {' '}swap{totalSwaps !== 1 ? 's' : ''}
        </span>
      )}
      <span className="h-px w-5 bg-slate-700/60" aria-hidden="true" />
    </div>
  )
}



/* ─────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ─────────────────────────────────────────────────────────────────────────*/

/**
 * ArrayVisualizer — educational bubble sort renderer
 *
 * Reads generic VisualizationStep fields ONLY:
 *   step.type, step.arrayState, step.indices,
 *   step.sortedIndices, step.metadata
 *
 * Contains NO algorithm logic. Derives element states from elementStates.js.
 * Runs CSS FLIP animation on SWAP steps using stable slot refs.
 */
const ArrayVisualizer = ({
  step = null,
  fallbackArray = [],
  isComingSoon = false
}) => {
  // ── 1. Active array snapshot ──────────────────────────────────────────
  const arrayData = useMemo(() => {
    if (step && Array.isArray(step.arrayState) && step.arrayState.length > 0) {
      return step.arrayState
    }
    if (Array.isArray(fallbackArray) && fallbackArray.length > 0) {
      return fallbackArray
    }
    return []
  }, [step, fallbackArray])

  const n = arrayData.length

  // ── 2. Slot refs for FLIP animation ───────────────────────────────────
  const slotRefs = useRef([])
  const prevStepRef = useRef(null)

  // ── 3. FLIP layout effect ─────────────────────────────────────────────
  useLayoutEffect(() => {
    const currentType = step?.type
    const prevType = prevStepRef.current?.type
    const indices = step?.indices ?? []

    // Detect fresh entry into a SWAP step (not staying in SWAP)
    const isSwapEntry =
      currentType === STEP_TYPES.SWAP &&
      prevType !== STEP_TYPES.SWAP &&
      indices.length === 2

    if (isSwapEntry) {
      const [idxA, idxB] = indices
      const nodeA = slotRefs.current[idxA]
      const nodeB = slotRefs.current[idxB]

      if (nodeA && nodeB) {
        // "First" — post-render positions (values have already swapped in arrayData)
        const rectA = nodeA.getBoundingClientRect()
        const rectB = nodeB.getBoundingClientRect()

        // "Invert" — push visually back to where they were
        const deltaA = rectB.left - rectA.left   // A must start at B's position → shift right
        const deltaB = rectA.left - rectB.left   // B must start at A's position → shift left

        nodeA.style.transition = 'none'
        nodeB.style.transition = 'none'
        nodeA.style.transform = `translateX(${deltaA}px)`
        nodeB.style.transform = `translateX(${deltaB}px)`

        // Force reflow so the instant transform is applied before we add the animation
        void nodeA.offsetWidth
        void nodeB.offsetWidth

        // "Play" — animate back to natural positions with spring-like easing
        requestAnimationFrame(() => {
          const easing = `transform ${SWAP_ANIM_MS}ms cubic-bezier(0.34,1.56,0.64,1)`
          nodeA.style.transition = easing
          nodeB.style.transition = easing
          nodeA.style.transform = 'translateX(0)'
          nodeB.style.transform = 'translateX(0)'
        })
      }
    } else {
      // Any non-swap step: clear residual transforms instantly
      slotRefs.current.forEach((node) => {
        if (node) {
          node.style.transition = 'none'
          node.style.transform = 'translateX(0)'
        }
      })
    }

    prevStepRef.current = step
  }, [step])

  // ── 4. Derived state ──────────────────────────────────────────────────
  const isComplete = step?.type === STEP_TYPES.COMPLETE
  const metadata = step?.metadata ?? {}
  const sortedIndices = step?.sortedIndices ?? []
  const sortedCount = sortedIndices.length
  const unsortedCount = n - sortedCount

  // Comparison bridge — only when type is COMPARE
  const bridge = useMemo(() => {
    if (step?.type !== STEP_TYPES.COMPARE) return null
    const [idxA, idxB] = step.indices ?? []
    if (idxA === undefined || idxB === undefined) return null
    const meta = step.metadata ?? {}
    return {
      idxA,
      idxB,
      leftVal: meta.leftValue ?? arrayData[idxA],
      rightVal: meta.rightValue ?? arrayData[idxB],
      willSwap: meta.willSwap ?? false
    }
  }, [step, arrayData])

  // Swap step active — for swap-specific labels
  const isSwapStep = step?.type === STEP_TYPES.SWAP
  const swapIndices = isSwapStep ? (step?.indices ?? []) : []

  // ── Empty / coming-soon states ─────────────────────────────────────────
  if (isComingSoon && n === 0) {
    return (
      <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-6 text-center">
        <span className="text-3xl" aria-hidden="true">🔧</span>
        <p className="mt-3 text-sm font-medium text-slate-300">
          Interactive visualization for this algorithm is under development.
        </p>
        <span className="mt-1.5 text-xs text-slate-500">
          Stay tuned for upcoming visualizer modules.
        </span>
      </div>
    )
  }

  if (n === 0) {
    return (
      <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
        No array data to visualize. Enter values in the Custom Input panel below.
      </div>
    )
  }

  // ── Main render ────────────────────────────────────────────────────────
  return (
    <div className="flex w-full flex-col items-center gap-4 py-2">

      {/* ── Pass indicator (only while algorithm is running, not on START) ── */}
      {metadata.pass !== undefined && metadata.pass > 0 && !isComplete && (
        <div className="flex w-full flex-wrap items-center justify-between gap-2 px-1">
          <PassIndicator
            pass={metadata.pass}
            totalElements={n}
            sortedCount={sortedCount}
            earlyTermination={metadata.earlyTermination ?? false}
          />
          <StatsRow
            totalComparisons={metadata.totalComparisons}
            totalSwaps={metadata.totalSwaps}
          />
        </div>
      )}

      {/* ── Completion banner ── */}
      {isComplete && (
        <div
          role="status"
          aria-live="polite"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-400/35 bg-emerald-900/15 px-5 py-3"
        >
          <span className="text-emerald-400" aria-hidden="true">✦</span>
          <span className="text-sm font-bold text-emerald-300">
            Array fully sorted — Bubble Sort complete
          </span>
          <span className="text-emerald-400" aria-hidden="true">✦</span>
        </div>
      )}

      {/* ── Comparison panel ── */}
      {bridge && (
        <div
          className="w-full rounded-xl border border-amber-400/20 bg-amber-950/25 px-4 py-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ComparisonPanel
            leftVal={bridge.leftVal}
            rightVal={bridge.rightVal}
            willSwap={bridge.willSwap}
          />
        </div>
      )}

      {/* ── Swap step label ── */}
      {isSwapStep && swapIndices.length === 2 && (
        <div
          className="flex items-center gap-2 rounded-lg border border-rose-400/25 bg-rose-950/25 px-4 py-2"
          aria-live="polite"
        >
          <span className="text-sm font-bold text-rose-300">
            ↔ Swapping positions {swapIndices[0]} and {swapIndices[1]}
          </span>
        </div>
      )}

      {/* ── SORTED finalization annotation ── */}
      {step?.type === STEP_TYPES.SORTED && metadata.finalizedValue !== undefined && (
        <div
          className="flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-950/25 px-4 py-2"
          aria-live="polite"
        >
          <span className="text-sm font-semibold text-emerald-300">
            {metadata.finalizedValue} has bubbled to its final position at index {metadata.finalizedIndex}
          </span>
        </div>
      )}

      {/* ── EARLY TERMINATION annotation ── */}
      {step?.type === STEP_TYPES.SORTED && metadata.earlyTermination && (
        <div
          className="flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-950/25 px-4 py-2"
          aria-live="polite"
        >
          <span className="text-sm font-semibold text-emerald-300">
            No swaps in this pass — the array is already sorted. Early exit.
          </span>
        </div>
      )}

      {/* ── Main visualization row ── */}
      <div
        className="relative w-full overflow-x-auto py-4"
        aria-label="Array visualization"
      >
        {/*
          Horizontal scroll container ensures large arrays remain on one line.
          The inner flex row is min-w-max so elements never wrap.
        */}
        <div
          className="flex min-w-max items-end justify-start gap-4 sm:gap-5 px-4 sm:justify-center"
          role="list"
        >
          {arrayData.map((value, slotIndex) => {
            const state = getElementState(slotIndex, step)
            const isSorted = sortedIndices.includes(slotIndex) || isComplete
            const isComparingSlot = bridge && (bridge.idxA === slotIndex || bridge.idxB === slotIndex)
            const isSwappingSlot = isSwapStep && swapIndices.includes(slotIndex)

            // Show region divider before the first sorted element
            const firstSortedIndex = n - sortedCount
            const showDivider = !isComplete && sortedCount > 0 && slotIndex === firstSortedIndex

            return (
              <div key={`slot-${slotIndex}`} className="flex items-end">
                {/* Region divider — rendered BEFORE the first sorted slot */}
                {showDivider && (
                  <div
                    className="mr-3 sm:mr-4 flex flex-col items-center self-stretch justify-center gap-1"
                    aria-hidden="true"
                  >
                    {/* Dashed vertical separator */}
                    <div className="flex h-full flex-col justify-center gap-[3px]">
                      {Array.from({ length: 9 }).map((_, di) => (
                        <span key={di} className="block h-1.5 w-px bg-emerald-500/25" />
                      ))}
                    </div>
                    {/* "SORTED →" label */}
                    <span
                      className="mt-1 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-500/40"
                    >
                      ← sorted
                    </span>
                  </div>
                )}

                {/* Slot wrapper — receives FLIP translateX, isolated from bubble transforms */}
                <div
                  ref={(el) => { slotRefs.current[slotIndex] = el }}
                  className="relative flex flex-col items-center"
                  style={{ willChange: 'transform' }}
                >
                  {/* Comparing connector dot above the two compared slots */}
                  {isComparingSlot && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Swapping indicator dot */}
                  {isSwappingSlot && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-rose-400/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                      aria-hidden="true"
                    />
                  )}

                  {/* "SORTED" lock label below sorted bubbles */}
                  {isSorted && !isComplete && (
                    <span
                      className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-wider text-emerald-500/60"
                      aria-hidden="true"
                    >
                      final
                    </span>
                  )}

                  <ArrayElement
                    value={value}
                    index={slotIndex}
                    state={state}
                    stableId={`slot-${slotIndex}`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Region legend (only when sorted region exists) ── */}
      {!isComplete && sortedCount > 0 && (
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-600" aria-hidden="true" />
            <span>Unsorted ({unsortedCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" aria-hidden="true" />
            <span>Sorted / Final ({sortedCount})</span>
          </div>
        </div>
      )}

      {/* ── Completion stats ── */}
      {isComplete && metadata.totalComparisons !== undefined && (
        <StatsRow
          totalComparisons={metadata.totalComparisons}
          totalSwaps={metadata.totalSwaps}
        />
      )}
    </div>
  )
}

export default ArrayVisualizer
