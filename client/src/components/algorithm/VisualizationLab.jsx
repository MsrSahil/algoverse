import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react'
import ArrayVisualizer from '../visualizer/ArrayVisualizer.jsx'
import { STEP_TYPES } from '../visualizer/visualizationTypes.js'
import { SPEED_OPTIONS } from '../visualizer/visualizationTypes.js'

/* ═══════════════════════════════════════════════════════════════════════════
   VISUALIZATION LAB
   ═══════════════════════════════════════════════════════════════════════════
   A single self-contained component that replaces VisualizationWorkspace +
   VisualizationControls + StepExplanation with a stable, three-zone layout.

   Zone 1 — SIMULATION STAGE   min-h fixed, never reflows on content change
   Zone 2 — LEARNING INSIGHT   fixed-height strip, content swaps in-place
   Zone 3 — CONTROL DOCK       fixed-height dock, never jumps

   The canonical layout shift cause: conditional rendering of DecisionPanel /
   PassHeader / completion messages each at different heights → DOM reflow.
   Solution: every variant of Zone 1 content occupies the same reserved space.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── SPEED BUTTON ─────────────────────────────────────────────────────── */
const SpeedBtn = ({ label, active, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={active}
    aria-label={`Set speed to ${label}`}
    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 ${
      active
        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
        : 'text-slate-500 hover:text-slate-300 disabled:opacity-40'
    }`}
  >
    {label}
  </button>
)

/* ─── CONTROL BUTTON ────────────────────────────────────────────────────── */
const CtrlBtn = ({ onClick, disabled, ariaLabel, title, children, variant = 'base' }) => {
  const cls =
    variant === 'primary'
      ? 'inline-flex items-center justify-center gap-1.5 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.25)] transition-all duration-200 hover:from-cyan-400 hover:to-emerald-400 hover:shadow-[0_0_22px_rgba(34,211,238,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none'
      : 'inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/70 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-slate-700/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-40'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className={cls}
    >
      {children}
    </button>
  )
}

/* ─── LEARNING INSIGHT STRIP ────────────────────────────────────────────── */
/*
 * This is a FIXED-HEIGHT strip (h-[5rem]).
 * All possible content variants (COMPARE / SWAP / SORTED / COMPLETE / idle)
 * render inside the same container — the container never changes height.
 */
const LearningInsight = ({ step, isCompleted }) => {
  const type = step?.type
  const meta = step?.metadata ?? {}

  /* ── COMPLETE ── */
  if (isCompleted || type === STEP_TYPES.COMPLETE) {
    return (
      <div className="flex h-full items-center justify-center gap-6 px-6">
        <span className="text-emerald-400 text-lg font-black">✦</span>
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-widest text-emerald-300">
            {meta.completeTitle || 'Sorting Complete'}
          </p>
          {meta.totalComparisons !== undefined && (
            <p className="mt-0.5 text-xs text-slate-500">
              {meta.totalComparisons} comparisons · {meta.totalSwaps} swaps
            </p>
          )}
        </div>
      </div>
    )
  }

  /* ── SWAP ── */
  if (type === STEP_TYPES.SWAP || type === STEP_TYPES.OVERWRITE) {
    const mRight = meta.swapDetail?.movedRight ?? '?'
    const mLeft = meta.swapDetail?.movedLeft ?? '?'
    const swapLabel = meta.swapLabel || 'Swapping'
    const swapDescription = meta.movementText || (
      meta.swapDetail?.movedRight !== undefined ? (
        <>
          <span className="font-semibold text-rose-300">{mRight}</span> moves right ·{' '}
          <span className="font-semibold text-rose-300">{mLeft}</span> moves left
        </>
      ) : (
        <>
          <span className="font-semibold text-rose-300">{mRight}</span> ↔{' '}
          <span className="font-semibold text-rose-300">{mLeft}</span>
        </>
      )
    )

    return (
      <div className="flex h-full items-center justify-center gap-5 px-6">
        <div className="flex items-center gap-3">
          <span className="rounded-lg border border-rose-400/40 bg-rose-950/60 px-3 py-1.5 font-mono text-base font-black text-rose-200">
            {mRight}
          </span>
          <span className="text-base font-black text-rose-400">↔</span>
          <span className="rounded-lg border border-rose-400/40 bg-rose-950/60 px-3 py-1.5 font-mono text-base font-black text-rose-200">
            {mLeft}
          </span>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-rose-400/80">
            {swapLabel}
          </p>
          <p className="text-xs text-slate-400">
            {swapDescription}
          </p>
        </div>
      </div>
    )
  }

  /* ── SORTED: pass complete ── */
  if (type === STEP_TYPES.SORTED && meta.passComplete) {
    const nextPass = (meta.pass ?? 0) + 1
    const passLabel = meta.passHeaderLabel || `Pass ${meta.pass} Complete`
    const passDetail = meta.passDescription || (
      meta.finalizedValue !== undefined
        ? `${meta.finalizedValue} reached its final position`
        : 'Element placed in final position'
    )

    return (
      <div className="flex h-full items-center justify-center gap-4 px-6">
        <span className="text-sm font-black text-emerald-400">✓</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            {passLabel}
          </p>
          <p className="text-xs text-slate-400">
            {passDetail}
            {nextPass <= (meta.totalPasses ?? 99) ? ` · Pass ${nextPass} next` : ''}
          </p>
        </div>
      </div>
    )
  }

  /* ── SORTED: early termination ── */
  if (type === STEP_TYPES.SORTED && meta.earlyTermination) {
    return (
      <div className="flex h-full items-center justify-center gap-4 px-6">
        <span className="text-sm font-black text-emerald-400">✓</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            {meta.earlyExitLabel || 'Early Exit'}
          </p>
          <p className="text-xs text-slate-400">
            {meta.earlyExitHeadline || 'No swaps this pass — array is already sorted.'}
          </p>
        </div>
      </div>
    )
  }

  /* ── COMPARE ── */
  if (type === STEP_TYPES.COMPARE && meta.leftValue !== undefined) {
    const isSwap = meta.willSwap === true
    const isEqual = meta.decision === 'equal'
    const operator = isSwap ? '>' : isEqual ? '=' : '<'

    const decisionBadge = meta.decisionBadge || (
      isSwap ? '⚠ Swap Required' : isEqual ? '✓ No Swap' : '✓ No Swap'
    )

    const decisionReason = meta.decisionReason || (
      isSwap
        ? `${meta.leftValue} is larger — must move right.`
        : isEqual
          ? 'Equal values — already in order.'
          : `${meta.leftValue} is smaller — correct order.`
    )

    return (
      <div className="flex h-full items-center justify-center gap-5 px-6">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-lg border px-3 py-1.5 font-mono text-base font-black ${
              isSwap
                ? 'border-amber-400/50 bg-amber-950/60 text-amber-200'
                : 'border-slate-600/40 bg-slate-900/60 text-slate-200'
            }`}
          >
            {meta.leftValue}
          </span>
          <span
            className={`text-lg font-black tabular-nums ${
              isSwap ? 'text-amber-400' : 'text-slate-500'
            }`}
          >
            {operator}
          </span>
          <span
            className={`rounded-lg border px-3 py-1.5 font-mono text-base font-black ${
              isSwap
                ? 'border-amber-400/50 bg-amber-950/60 text-amber-200'
                : 'border-slate-600/40 bg-slate-900/60 text-slate-200'
            }`}
          >
            {meta.rightValue}
          </span>
        </div>
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              isSwap ? 'text-rose-400' : 'text-slate-400'
            }`}
          >
            {decisionBadge}
          </p>
          <p className="text-xs text-slate-500">
            {decisionReason}
          </p>
        </div>
      </div>
    )
  }

  /* ── SELECT / HIGHLIGHT / CHECK ── */
  if (type === STEP_TYPES.SELECT || type === STEP_TYPES.HIGHLIGHT || type === STEP_TYPES.CHECK) {
    const isSelect = type === STEP_TYPES.SELECT
    return (
      <div className="flex h-full items-center justify-center gap-4 px-6">
        <span className={`text-sm font-black ${isSelect ? 'text-cyan-400' : 'text-violet-400'}`}>
          ●
        </span>
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              isSelect ? 'text-cyan-400' : 'text-violet-400'
            }`}
          >
            {meta.actionLabel || (isSelect ? 'Candidate Selected' : 'Inspecting')}
          </p>
          <p className="text-xs text-slate-300">
            {step.title || 'Evaluating element'}
          </p>
        </div>
      </div>
    )
  }

  /* ── START / idle ── */
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Ready</p>
        <p className="mt-1 text-sm font-semibold text-slate-300">Press Play to begin</p>
        <p className="mt-0.5 text-xs text-slate-600">or step through manually</p>
      </div>
    </div>
  )
}


/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */
const VisualizationLab = ({
  /* algorithm meta */
  algorithm,
  /* viz engine state */
  currentStepData,
  currentStep,
  totalSteps,
  progressPercentage,
  isPlaying,
  isCompleted,
  speed,
  /* viz engine actions */
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onRestart,
  onSpeedChange,
  onGoToStep,
  /* input */
  customArray,
  /* other */
  disabled = false,
  isComingSoon = false,
}) => {
  const previewArray =
    Array.isArray(customArray) && customArray.length > 0
      ? customArray
      : Array.isArray(algorithm?.visualizationPreview) && algorithm.visualizationPreview.length > 0
        ? algorithm.visualizationPreview
        : [50, 30, 80, 10, 60]

  const type = currentStepData?.type
  const meta = currentStepData?.metadata ?? {}
  const pass = meta.pass ?? 0
  const totalPasses = meta.totalPasses
  const isPassComplete = type === STEP_TYPES.SORTED && meta.passComplete
  const hasSteps = totalSteps > 0
  const maxIndex = Math.max(0, totalSteps - 1)
  const displayStep = hasSteps ? currentStep + 1 : 0

  const handlePlayPause = () => {
    if (isPlaying) onPause?.()
    else onPlay?.()
  }

  /* Playability flags */
  const canPlay = !isPlaying && hasSteps && currentStep < totalSteps - 1
  const canPause = isPlaying
  const canPrevious = hasSteps && currentStep > 0
  const canNext = hasSteps && currentStep < totalSteps - 1
  const canRestart = hasSteps && (currentStep > 0 || isCompleted)

  /* Pass status label */
  const passLabel =
    isCompleted
      ? null
      : pass > 0
        ? isPassComplete
          ? `Pass ${pass} Complete`
          : `Pass ${pass}${totalPasses ? ` / ${totalPasses}` : ''}`
        : null

  return (
    <div
      className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950"
      role="region"
      aria-label={`${algorithm?.title ?? 'Algorithm'} visualization laboratory`}
    >
      {/* ══ ZONE 1 — SIMULATION STAGE ══════════════════════════════════════
          Fixed minimum height. All step-type content (START / COMPARE / SWAP /
          SORTED / COMPLETE) occupies the same outer box — only the inner
          ArrayVisualizer changes. Because ArrayVisualizer itself has a stable
          internal layout (fixed-height DecisionPanel zone + bubble row), this
          zone never changes document height.
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[26rem] sm:min-h-[28rem] lg:min-h-[30rem] bg-slate-950/80">

        {/* Stage chrome: pass indicator (top-left) + step counter (top-right) */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-4 sm:px-7">
          {/* Pass pill */}
          <div className="h-6 flex items-center">
            {passLabel && (
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.22em] ${
                  isPassComplete ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {isPassComplete && <span className="mr-1">✓</span>}
                {passLabel}
              </span>
            )}
          </div>

          {/* Step counter */}
          <div className="h-6 flex items-center">
            {hasSteps && (
              <span className="font-mono text-[10px] text-slate-600">
                {displayStep} / {totalSteps}
              </span>
            )}
          </div>
        </div>

        {/* Status dot row — algorithm title + playback state */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-center pt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-slate-600">
              {algorithm?.title ?? 'Visualization'}
            </span>
            {isPlaying && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" aria-hidden="true" />
            )}
            {isCompleted && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Array visualizer — hero content */}
        <div className="flex h-full min-h-[inherit] items-center justify-center px-4 pt-12 pb-4 sm:px-6 lg:px-10">
          <div className="w-full">
            <ArrayVisualizer
              step={currentStepData}
              fallbackArray={previewArray}
              isComingSoon={isComingSoon}
            />
          </div>
        </div>

        {/* Coming-soon overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-950/70 backdrop-blur-[2px]">
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 px-6 py-4 text-center">
              <p className="text-sm font-semibold text-amber-200">
                Interactive visualizer coming soon.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ══ ZONE 2 — LEARNING INSIGHT STRIP ═══════════════════════════════
          Fixed height (h-20 = 5rem). Content swaps in-place; the container
          dimensions never change. This eliminates the "comparison message
          pushes controls down" layout shift.
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="h-20 border-t border-white/8 bg-slate-900/60"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        <LearningInsight step={currentStepData} isCompleted={isCompleted} />
      </div>

      {/* ══ ZONE 3 — CONTROL DOCK ══════════════════════════════════════════
          Fixed height. Two rows: (1) navigation buttons, (2) scrubber + speed.
          No conditional element can change the dock's height.
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="border-t border-white/8 bg-slate-900/80 px-4 py-4 sm:px-6"
        aria-label="Playback controls"
      >
        {/* Row 1: Previous · Restart · ▶ PLAY · Next */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <CtrlBtn
            onClick={onPrevious}
            disabled={disabled || isComingSoon || !canPrevious}
            ariaLabel="Previous step"
            title="Previous step"
          >
            <SkipBack className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </CtrlBtn>

          <CtrlBtn
            onClick={onRestart}
            disabled={disabled || isComingSoon || !canRestart}
            ariaLabel="Restart from beginning"
            title="Restart"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </CtrlBtn>

          {/* Primary Play/Pause button */}
          <CtrlBtn
            onClick={handlePlayPause}
            disabled={disabled || isComingSoon || (isPlaying ? !canPause : !canPlay)}
            ariaLabel={isPlaying ? 'Pause playback' : isCompleted ? 'Replay' : 'Play'}
            title={isPlaying ? 'Pause' : isCompleted ? 'Replay' : 'Play'}
            variant="primary"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
            <span>{isPlaying ? 'Pause' : isCompleted ? 'Replay' : 'Play'}</span>
          </CtrlBtn>

          <CtrlBtn
            onClick={onNext}
            disabled={disabled || isComingSoon || !canNext}
            ariaLabel="Next step"
            title="Next step"
          >
            <span className="hidden sm:inline">Next</span>
            <SkipForward className="h-3.5 w-3.5" />
          </CtrlBtn>
        </div>

        {/* Row 2: Scrubber + speed + step counter — always rendered, stable height */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          {/* Scrubber + step counter */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {/* Progress bar (always visible) */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-[width] duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Scrubber input */}
            <input
              id="step-scrubber"
              type="range"
              min="0"
              max={maxIndex}
              value={currentStep}
              disabled={disabled || isComingSoon || !hasSteps || totalSteps <= 1}
              onChange={(e) => onGoToStep?.(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-transparent accent-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Seek to step"
            />

            {/* Step counter */}
            <span className="font-mono text-[10px] text-slate-600">
              {hasSteps ? `Step ${displayStep} of ${totalSteps}` : 'No steps loaded'}
              {progressPercentage > 0 && ` · ${progressPercentage}%`}
            </span>
          </div>

          {/* Speed selector */}
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Speed
            </span>
            <div className="flex items-center rounded-lg border border-white/8 bg-slate-950/70 p-0.5">
              {SPEED_OPTIONS.map((opt) => (
                <SpeedBtn
                  key={opt}
                  label={opt}
                  active={speed === opt}
                  onClick={() => onSpeedChange?.(opt)}
                  disabled={disabled || isComingSoon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualizationLab
