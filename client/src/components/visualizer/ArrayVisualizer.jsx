import { useRef, useLayoutEffect, useMemo } from 'react'
import { STEP_TYPES, BOUNDARY_DIRECTIONS } from './visualizationTypes.js'
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

   Curve: cubic-bezier(0.25, 0.46, 0.45, 0.94) — smooth easeOutQuad.
   Slightly longer duration for a more physical, weighted feel.
   ─────────────────────────────────────────────────────────────────────────*/
const SWAP_ANIM_MS = 800

/* ─────────────────────────────────────────────────────────────────────────
   VALUE-PROPORTIONAL BUBBLE SIZING
   ─────────────────────────────────────────────────────────────────────────
   Bubbles are sized to visually represent each element's RELATIVE MAGNITUDE
   within the current array snapshot.

   Rules enforced here:
   ① Size belongs to the VALUE, not the index slot.
      When value 50 moves from index 0 → index 1, it keeps the same px size.
   ② Equal values → identical px size (no random variation).
   ③ Negative values are handled via linear normalization across [min, max].
      Example: [-5, 10, -2, 20]  min=-5 max=20
        -5  → BUBBLE_MIN_PX  (42px)
        -2  → slightly larger
        10  → larger
        20  → BUBBLE_MAX_PX  (88px)
   ④ All-equal arrays (e.g. [5, 5, 5]) render at the midpoint size.
   ⑤ Single-element arrays render at midpoint size.

   Value size  ≠  Active-state scale.
   Active-state scale (scale-105, -translate-y-2, etc.) is a CSS transform
   multiplier applied on top. A 42px bubble at scale-105 → ~44px.
   An 88px bubble at scale-105 → ~92px. Larger always stays larger. ✓
   ─────────────────────────────────────────────────────────────────────────*/
const BUBBLE_MIN_PX = 42
const BUBBLE_MAX_PX = 88

/**
 * Linear interpolation: maps a value from [minVal, maxVal] → [BUBBLE_MIN_PX, BUBBLE_MAX_PX].
 * When all values are identical (range = 0), returns the midpoint diameter.
 *
 * @param {number} value   - The element's numeric value
 * @param {number} minVal  - Dataset minimum (may be negative)
 * @param {number} maxVal  - Dataset maximum
 * @returns {number}       - Bubble diameter in px (integer)
 */
const computeBubblePx = (value, minVal, maxVal) => {
  if (minVal === maxVal) {
    return Math.round((BUBBLE_MIN_PX + BUBBLE_MAX_PX) / 2)
  }
  const t = (value - minVal) / (maxVal - minVal)   // 0..1
  return Math.round(BUBBLE_MIN_PX + t * (BUBBLE_MAX_PX - BUBBLE_MIN_PX))
}

/* ─────────────────────────────────────────────────────────────────────────
   DECISION PANEL
   The single teaching centerpiece that changes per step type.
   Reads only from step metadata and properties — zero algorithm calculation.
   ─────────────────────────────────────────────────────────────────────────*/
const DecisionPanel = ({ step, arrayData }) => {
  if (!step) return null

  const { type, metadata = {}, indices = [] } = step
  const {
    leftValue,
    rightValue,
    willSwap,
    decision,
    swapDetail,
    passComplete,
    earlyTermination,
    finalizedValue,
    pass,
    totalPasses,
    totalComparisons,
    totalSwaps
  } = metadata

  // ── COMPLETE ──
  if (type === STEP_TYPES.COMPLETE) {
    const completeTitle = metadata.completeTitle || 'Sorting Complete'
    const completeDescription = metadata.completeDescription || 'Every element is in its final position.'

    return (
      <div
        className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-950/30 px-6 py-5 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="text-xl font-black tracking-widest text-emerald-300" aria-hidden="true">✦</span>
        <p className="text-base font-black uppercase tracking-widest text-emerald-300">
          {completeTitle}
        </p>
        <p className="text-sm text-emerald-500">
          {completeDescription}
        </p>
        {totalComparisons !== undefined && (
          <p className="mt-1 text-xs text-slate-500">
            {totalComparisons} comparison{totalComparisons !== 1 ? 's' : ''} · {totalSwaps} swap{totalSwaps !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    )
  }

  // ── SORTED: pass complete ──
  if (type === STEP_TYPES.SORTED && passComplete) {
    const nextPass = (pass ?? 0) + 1
    const isLastPass = nextPass > (totalPasses ?? 1)
    const passHeaderLabel = metadata.passHeaderLabel || `✓ Pass ${pass} Complete`
    const headline = metadata.passHeadline || (
      finalizedValue !== undefined
        ? `${finalizedValue} reached its final position.`
        : 'Element reached its final position.'
    )
    const passDescription = metadata.passDescription || (
      finalizedValue !== undefined
        ? (metadata.bubbleExplanation || 'The largest unsorted value bubbled to the end.')
        : 'This element will not move again.'
    )

    return (
      <div
        className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-950/25 px-6 py-5 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
          {passHeaderLabel}
        </p>
        <p className="text-base font-bold text-white">
          {headline}
        </p>
        <p className="text-sm text-slate-400">
          {passDescription}
        </p>
        {!isLastPass && (
          <p className="mt-1 text-xs font-semibold text-cyan-400">
            {metadata.nextPassMessage || `Unsorted region shrinks → Pass ${nextPass} begins.`}
          </p>
        )}
      </div>
    )
  }

  // ── SORTED: early termination ──
  if (type === STEP_TYPES.SORTED && earlyTermination) {
    return (
      <div
        className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-950/20 px-6 py-5 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          {metadata.earlyExitLabel || '✓ Early Exit'}
        </p>
        <p className="text-base font-bold text-white">
          {metadata.earlyExitHeadline || 'No swaps occurred this pass.'}
        </p>
        <p className="text-sm text-slate-400">
          {metadata.earlyExitDescription || 'The array is already fully sorted.'}
        </p>
      </div>
    )
  }

  // ── SORTED: single element ──
  if (type === STEP_TYPES.SORTED && finalizedValue !== undefined) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-950/15 px-5 py-4"
        role="status"
        aria-live="polite"
      >
        <span className="text-emerald-400 text-sm font-black">✓</span>
        <p className="text-sm font-semibold text-emerald-300">
          {metadata.singleSortedMessage || `${finalizedValue} is in its final position.`}
        </p>
      </div>
    )
  }

  // ── SWAP / MOVE ──
  if (type === STEP_TYPES.SWAP || type === STEP_TYPES.OVERWRITE) {
    const mRight = swapDetail?.movedRight ?? (indices.length === 2 ? arrayData[indices[1]] : '?')
    const mLeft = swapDetail?.movedLeft ?? (indices.length === 2 ? arrayData[indices[0]] : '?')
    const swapLabel = metadata.swapLabel || 'Swapping'

    const swapExplanation = metadata.swapExplanation || (
      swapDetail?.movedRight !== undefined ? (
        <>
          <span className="font-bold">{mRight}</span> moves right ·{' '}
          <span className="font-bold">{mLeft}</span> moves left
        </>
      ) : (
        <>
          <span className="font-bold">{mRight}</span> ↔{' '}
          <span className="font-bold">{mLeft}</span>
        </>
      )
    )

    return (
      <div
        className="flex flex-col items-center gap-2 rounded-2xl border border-rose-400/25 bg-rose-950/20 px-6 py-4 text-center"
        role="status"
        aria-live="polite"
        aria-label={`Swapping: ${mRight} and ${mLeft}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-rose-400/70">
          {swapLabel}
        </p>
        <div className="flex items-center gap-4">
          <span className="rounded-xl border border-rose-400/40 bg-rose-950/60 px-4 py-2 font-mono text-xl font-black text-rose-200">
            {mRight}
          </span>
          <span className="text-lg font-black text-rose-400" aria-hidden="true">↔</span>
          <span className="rounded-xl border border-rose-400/40 bg-rose-950/60 px-4 py-2 font-mono text-xl font-black text-rose-200">
            {mLeft}
          </span>
        </div>
        <p className="text-xs text-rose-300/80">
          {swapExplanation}
        </p>
      </div>
    )
  }

  // ── COMPARE ──
  if (type === STEP_TYPES.COMPARE && leftValue !== undefined && rightValue !== undefined) {
    const isSwap = willSwap === true
    const isEqual = decision === 'equal'
    const operator = metadata.operator || (isSwap ? '>' : isEqual ? '=' : '<')
    const compareLabel = metadata.compareLabel || 'Comparing'

    const defaultSwapReason = `${leftValue} is larger — it must move right.`
    const defaultEqualReason = 'Equal values — already in order.'
    const defaultNoSwapReason = `${leftValue} is smaller — already in correct order.`

    const decisionBadge = metadata.decisionBadge || (
      isSwap ? '⚠ Swap Required' : isEqual ? '✓ No Swap' : '✓ No Swap'
    )

    const decisionReason = metadata.decisionReason || (
      isSwap ? defaultSwapReason : isEqual ? defaultEqualReason : defaultNoSwapReason
    )

    return (
      <div
        className="flex flex-col items-center gap-3 rounded-2xl border bg-slate-950/60 px-6 py-4 text-center"
        style={{
          borderColor: isSwap ? 'rgba(251, 191, 36, 0.3)' : 'rgba(100, 116, 139, 0.2)'
        }}
        role="status"
        aria-live="polite"
        aria-label={`Comparing ${leftValue} and ${rightValue}. ${isSwap ? 'Swap required' : 'No swap needed'}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
          {compareLabel}
        </p>

        {/* Value comparison row */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            {metadata.leftLabel && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                {metadata.leftLabel}
              </span>
            )}
            <span
              className={`rounded-xl border px-4 py-2 font-mono text-xl font-black ${
                isSwap
                  ? 'border-amber-400/50 bg-amber-950/60 text-amber-200'
                  : 'border-slate-600/40 bg-slate-900/60 text-slate-200'
              }`}
            >
              {leftValue}
            </span>
          </div>

          <span
            className={`text-xl font-black tabular-nums ${
              isSwap ? 'text-amber-400' : 'text-slate-500'
            }`}
            aria-hidden="true"
          >
            {operator}
          </span>

          <div className="flex flex-col items-center gap-1">
            {metadata.rightLabel && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                {metadata.rightLabel}
              </span>
            )}
            <span
              className={`rounded-xl border px-4 py-2 font-mono text-xl font-black ${
                isSwap
                  ? 'border-amber-400/50 bg-amber-950/60 text-amber-200'
                  : 'border-slate-600/40 bg-slate-900/60 text-slate-200'
              }`}
            >
              {rightValue}
            </span>
          </div>
        </div>

        {/* Decision */}
        {isSwap ? (
          <div className="flex flex-col items-center gap-1">
            <span className="rounded-full border border-rose-400/40 bg-rose-950/50 px-3 py-0.5 text-xs font-black uppercase tracking-widest text-rose-300">
              {decisionBadge}
            </span>
            <p className="text-xs text-amber-300/80">
              {decisionReason}
            </p>
          </div>
        ) : isEqual ? (
          <div className="flex flex-col items-center gap-1">
            <span className="rounded-full border border-slate-600/40 bg-slate-900/60 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-slate-400">
              {decisionBadge}
            </span>
            <p className="text-xs text-slate-500">
              {decisionReason}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="rounded-full border border-emerald-600/30 bg-emerald-950/30 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
              {decisionBadge}
            </span>
            <p className="text-xs text-slate-400">
              {decisionReason}
            </p>
          </div>
        )}
      </div>
    )
  }


  // ── SELECT / HIGHLIGHT / CHECK ──
  if (type === STEP_TYPES.SELECT || type === STEP_TYPES.HIGHLIGHT || type === STEP_TYPES.CHECK) {
    const isSelect = type === STEP_TYPES.SELECT
    const actionLabel = metadata.actionLabel || (isSelect ? 'Candidate Selected' : 'Inspecting Element')

    return (
      <div
        className={`flex flex-col items-center gap-2 rounded-2xl border px-6 py-4 text-center ${
          isSelect
            ? 'border-cyan-400/30 bg-cyan-950/25'
            : 'border-violet-400/25 bg-violet-950/20'
        }`}
        role="status"
        aria-live="polite"
      >
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.25em] ${
            isSelect ? 'text-cyan-400' : 'text-violet-400/80'
          }`}
        >
          {actionLabel}
        </p>
        <p className="text-base font-bold text-white">
          {step.title || 'Evaluating element'}
        </p>
        {step.explanation && (
          <p className="text-xs text-slate-400">
            {step.explanation}
          </p>
        )}
      </div>
    )
  }

  // ── START ──
  if (type === STEP_TYPES.START) {
    const startTitle = metadata.startTitle || step.title || 'Algorithm Initialized'
    const startExplanation = metadata.startExplanation || step.explanation || 'Ready to begin execution.'

    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-slate-900/50 px-6 py-5 text-center">
        <p className="text-sm font-bold text-white">{startTitle}</p>
        <p className="text-xs leading-relaxed text-slate-400">
          {startExplanation}
        </p>
      </div>
    )
  }

  return null
}

/* ─────────────────────────────────────────────────────────────────────────
   PASS HEADER
   Minimal pass counter — part of the narrative, not a dashboard badge.
   ─────────────────────────────────────────────────────────────────────────*/
const PassHeader = ({ pass, totalPasses, isPassComplete, label }) => {
  if (!pass || pass <= 0) return null

  const displayLabel = label || (
    isPassComplete
      ? `✓ Pass ${pass} of ${totalPasses ?? '?'} Complete`
      : `Pass ${pass} of ${totalPasses ?? '?'}`
  )

  return (
    <div className="flex items-center justify-center">
      <span
        className={`text-xs uppercase tracking-[0.2em] ${
          isPassComplete ? 'font-bold text-emerald-400' : 'font-semibold text-slate-500'
        }`}
      >
        {displayLabel}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ─────────────────────────────────────────────────────────────────────────*/

/**
 * ArrayVisualizer — generic, algorithm-agnostic array renderer
 *
 * Reads VisualizationStep fields:
 *   step.type, step.arrayState, step.indices,
 *   step.sortedIndices, step.highlightedIndices,
 *   step.selectedIndices, step.metadata
 *
 * Contains NO hardcoded algorithm-specific calculations.
 * Derives element states from elementStates.js.
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

  // ── 2. Bubble size normalization ──────────────────────────────────────
  // Derive dataset min/max once per arrayData change.
  // computeBubblePx() uses these to map each value → a diameter in px.
  // Size travels with the VALUE — when a swap moves value 50 to index 1,
  // arrayData[1] is now 50, so that slot gets the large diameter. ✓
  const { minVal, maxVal } = useMemo(() => {
    if (n === 0) return { minVal: 0, maxVal: 0 }
    return {
      minVal: Math.min(...arrayData),
      maxVal: Math.max(...arrayData)
    }
  }, [arrayData, n])

  // ── 3. Slot refs for FLIP animation ───────────────────────────────────
  const slotRefs = useRef([])
  const prevStepRef = useRef(null)

  // ── 4. FLIP layout effect ─────────────────────────────────────────────
  useLayoutEffect(() => {
    const currentType = step?.type
    const prevType = prevStepRef.current?.type
    const indices = step?.indices ?? []

    // Detect fresh entry into a SWAP step (not staying in SWAP)
    const isSwapEntry =
      (currentType === STEP_TYPES.SWAP || currentType === STEP_TYPES.OVERWRITE) &&
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
        const deltaA = rectB.left - rectA.left
        const deltaB = rectA.left - rectB.left

        nodeA.style.transition = 'none'
        nodeB.style.transition = 'none'
        nodeA.style.transform = `translateX(${deltaA}px)`
        nodeB.style.transform = `translateX(${deltaB}px)`

        // Force reflow
        void nodeA.offsetWidth
        void nodeB.offsetWidth

        // "Play" — smooth easeOutQuad, weighted physical feel
        requestAnimationFrame(() => {
          const easing = `transform ${SWAP_ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94)`
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

  // ── 5. Derived state ──────────────────────────────────────────────────
  const type = step?.type
  const isComplete = type === STEP_TYPES.COMPLETE
  const isSwapStep = type === STEP_TYPES.SWAP || type === STEP_TYPES.OVERWRITE
  const isSortedStep = type === STEP_TYPES.SORTED
  const metadata = step?.metadata ?? {}
  const sortedIndices = useMemo(() => step?.sortedIndices ?? [], [step?.sortedIndices])
  const sortedCount = sortedIndices.length
  const unsortedCount = n - sortedCount
  const swapIndices = isSwapStep ? (step?.indices ?? []) : []
  const isPassComplete = isSortedStep && (metadata.passComplete === true)

  // ── 6. Data-driven Boundary Direction & Region Divider ───────────────
  const boundaryDirection = useMemo(() => {
    if (metadata.boundaryDirection) {
      return metadata.boundaryDirection
    }
    // Backward-compatible inference:
    // If sorted indices form a suffix containing the last element -> RIGHT (Bubble Sort)
    // If sorted indices form a prefix containing index 0 -> LEFT (Selection Sort)
    if (sortedIndices.length > 0 && sortedIndices.length < n) {
      const hasRightEnd = sortedIndices.includes(n - 1)
      const hasLeftEnd = sortedIndices.includes(0)
      if (hasRightEnd && !hasLeftEnd) return BOUNDARY_DIRECTIONS.RIGHT
      if (hasLeftEnd && !hasRightEnd) return BOUNDARY_DIRECTIONS.LEFT
    }
    return BOUNDARY_DIRECTIONS.RIGHT
  }, [metadata.boundaryDirection, sortedIndices, n])

  const { boundaryIndex, boundaryLabel } = useMemo(() => {
    if (isComplete || sortedCount === 0 || sortedCount >= n) {
      return { boundaryIndex: -1, boundaryLabel: '' }
    }

    if (boundaryDirection === BOUNDARY_DIRECTIONS.RIGHT) {
      // Divider goes immediately BEFORE the first sorted element in the right region
      const minSortedIndex = Math.min(...sortedIndices)
      return {
        boundaryIndex: minSortedIndex,
        boundaryLabel: metadata.boundaryLabel || '← sorted'
      }
    }

    if (boundaryDirection === BOUNDARY_DIRECTIONS.LEFT) {
      // Divider goes immediately AFTER the last sorted element in the left region (before maxSortedIndex + 1)
      const maxSortedIndex = Math.max(...sortedIndices)
      return {
        boundaryIndex: maxSortedIndex + 1,
        boundaryLabel: metadata.boundaryLabel || 'sorted →'
      }
    }

    return { boundaryIndex: -1, boundaryLabel: '' }
  }, [boundaryDirection, isComplete, sortedCount, n, sortedIndices, metadata.boundaryLabel])


  // ── 7. Data-driven Movement & Swap Indicators ─────────────────────────
  const getSwapIndicator = (slotIndex) => {
    if (!isSwapStep || !swapIndices.includes(slotIndex)) return null

    // 1. Explicit directional arrows provided in metadata
    if (metadata.movement?.arrows?.[slotIndex]) {
      return { type: 'arrow', text: metadata.movement.arrows[slotIndex] }
    }

    // 2. Explicit role labels provided in metadata
    if (metadata.roles?.[slotIndex] || metadata.movement?.labels?.[slotIndex]) {
      return {
        type: 'label',
        text: metadata.roles?.[slotIndex] || metadata.movement?.labels?.[slotIndex]
      }
    }

    // 3. Fallback / Default indicators:
    if (swapIndices.length === 2) {
      // Bubble Sort: higher index slot moved right
      if (metadata.swapDetail?.movedRight !== undefined) {
        if (slotIndex === swapIndices[1]) {
          return { type: 'arrow', text: '→' }
        }
        return { type: 'dot' }
      }

      // Left-growing sorted region (e.g. Selection Sort: minimum moved left to lower index)
      if (boundaryDirection === BOUNDARY_DIRECTIONS.LEFT) {
        if (slotIndex === swapIndices[0]) {
          return { type: 'arrow', text: '←' }
        }
        return { type: 'dot' }
      }

      // Default right-growing: higher index moved right
      if (slotIndex === swapIndices[1]) {
        return { type: 'arrow', text: '→' }
      }
      return { type: 'dot' }
    }

    return { type: 'dot' }
  }

  // Bridge: active comparison pair
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

      {/* ── Pass header ── */}
      {metadata.pass !== undefined && metadata.pass > 0 && !isComplete && (
        <PassHeader
          pass={metadata.pass}
          totalPasses={metadata.totalPasses}
          isPassComplete={isPassComplete}
          label={metadata.passHeaderLabel}
        />
      )}

      {/* ── Decision Panel — the teaching centerpiece ── */}
      <div className="w-full max-w-lg mx-auto">
        <DecisionPanel step={step} arrayData={arrayData} />
      </div>

      {/* ── Main visualization row ── */}
      <div
        className="relative w-full overflow-x-auto py-6"
        aria-label="Array visualization"
      >
        <div
          className="flex min-w-max items-end justify-start gap-4 sm:gap-5 px-4 sm:justify-center"
          role="list"
        >
          {arrayData.map((value, slotIndex) => {
            const state = getElementState(slotIndex, step)
            const isSorted = sortedIndices.includes(slotIndex) || isComplete
            const isComparingSlot = bridge && (bridge.idxA === slotIndex || bridge.idxB === slotIndex)
            const swapIndicator = getSwapIndicator(slotIndex)

            // Region divider — rendered before the designated boundary index
            const showDivider = boundaryIndex >= 0 && slotIndex === boundaryIndex

            return (
              <div key={`slot-${slotIndex}`} className="flex items-end">
                {/* Region divider — rendered BEFORE the designated boundary slot */}
                {showDivider && (
                  <div
                    className="mr-3 sm:mr-4 flex flex-col items-center self-stretch justify-center gap-1"
                    aria-hidden="true"
                  >
                    {/* Dashed vertical separator */}
                    <div className="flex h-full flex-col justify-center gap-0.75">
                      {Array.from({ length: 9 }).map((_, di) => (
                        <span key={di} className="block h-1.5 w-px bg-emerald-500/25" />
                      ))}
                    </div>
                    {/* Directional sorted region label */}
                    <span
                      className="mt-1 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-500/40"
                    >
                      {boundaryLabel}
                    </span>
                  </div>
                )}

                {/* Slot wrapper — receives FLIP translateX */}
                <div
                  ref={(el) => { slotRefs.current[slotIndex] = el }}
                  className="relative flex flex-col items-center"
                  style={{ willChange: 'transform' }}
                >
                  {/* Comparison connector dot */}
                  {isComparingSlot && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Swapping indicator / directional arrow */}
                  {swapIndicator?.type === 'arrow' && (
                    <span
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-black text-rose-400/80 select-none"
                      aria-hidden="true"
                    >
                      {swapIndicator.text}
                    </span>
                  )}

                  {swapIndicator?.type === 'label' && (
                    <span
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-rose-300 select-none uppercase"
                      aria-hidden="true"
                    >
                      {swapIndicator.text}
                    </span>
                  )}

                  {swapIndicator?.type === 'dot' && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-rose-400/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                      aria-hidden="true"
                    />
                  )}

                  {/* "final" lock label below sorted bubbles */}
                  {isSorted && !isComplete && (
                    <span
                      className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-wider text-emerald-500/60"
                      aria-hidden="true"
                    >
                      {metadata.sortedSlotLabel || 'final'}
                    </span>
                  )}

                  <ArrayElement
                    value={value}
                    index={slotIndex}
                    state={state}
                    stableId={`slot-${slotIndex}`}
                    bubblePx={computeBubblePx(value, minVal, maxVal)}
                    customBadge={metadata.elementBadges?.[slotIndex]}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Region legend ── */}
      {!isComplete && sortedCount > 0 && (
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-600" aria-hidden="true" />
            <span>{metadata.unsortedLabel || 'Unsorted'} ({unsortedCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" aria-hidden="true" />
            <span>{metadata.sortedLabel || 'Final'} ({sortedCount})</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArrayVisualizer

