import { getStepTypeBadgeConfig } from '../visualizer/visualizationUtils.js'
import { STEP_TYPES } from '../visualizer/visualizationTypes.js'

/**
 * Step Explanation Component
 *
 * Displays human-readable narrative, active step type, and contextual
 * "why" information derived from step metadata.
 *
 * This component reads only generic step fields and the metadata object.
 * It does NOT contain algorithm-specific logic.
 */
const StepExplanation = ({
  step = null,
  currentStep = 0,
  totalSteps = 0,
  isCompleted = false
}) => {
  const hasStep = Boolean(step)
  const type = step?.type || STEP_TYPES.START
  const badge = getStepTypeBadgeConfig(type)
  const stepNumber = totalSteps > 0 ? currentStep + 1 : 0
  const metadata = step?.metadata ?? {}

  // ── Comparison context: inline reason why two values are compared ──
  const hasComparisonContext =
    type === STEP_TYPES.COMPARE &&
    metadata.leftValue !== undefined &&
    metadata.rightValue !== undefined

  // ── Swap context ──
  const hasSwapContext = type === STEP_TYPES.SWAP

  // ── Pass context ──
  const hasPassContext = metadata.pass > 0 && !isCompleted

  return (
    <section
      className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
      aria-labelledby="step-explanation-title"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="step-explanation-title" className="text-lg font-bold text-white">
          Step Explanation
        </h3>

        {hasStep && (
          <div className="flex items-center gap-2">
            {hasPassContext && (
              <span className="rounded-full border border-cyan-400/25 bg-cyan-950/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                Pass {metadata.pass}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badge.bgColor} ${badge.borderColor} ${badge.textColor}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${badge.dotColor}`} />
              {badge.label}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {hasStep ? (
          <>
            {/* Step counter */}
            <div className="flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-slate-950/50 px-4 py-2.5">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Step {stepNumber} of {totalSteps}
              </span>
              {step.indices && step.indices.length > 0 && (
                <span className="text-xs text-slate-400">
                  Indices:&nbsp;
                  <span className="font-mono text-slate-200">
                    [{step.indices.join(', ')}]
                  </span>
                </span>
              )}
            </div>

            {/* Title + explanation */}
            <div className="rounded-xl border border-white/8 bg-slate-950/60 p-4">
              <p className="text-sm font-bold text-white">{step.title || 'Step in progress'}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {step.explanation || 'No detailed description for this step.'}
              </p>
            </div>

            {/* ── Comparison "why" panel ── */}
            {hasComparisonContext && (
              <div className="rounded-xl border border-amber-400/20 bg-amber-950/25 p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-amber-400/70">
                  Comparison
                </p>
                <div className="flex items-center gap-3">
                  {/* Left value */}
                  <span className="rounded-lg border border-amber-400/30 bg-amber-950/50 px-3 py-1.5 font-mono text-base font-black text-amber-200">
                    {metadata.leftValue}
                  </span>
                  {/* Operator */}
                  <span className="text-sm font-black text-amber-300">
                    {metadata.willSwap ? '>' : metadata.leftValue === metadata.rightValue ? '=' : '<'}
                  </span>
                  {/* Right value */}
                  <span className="rounded-lg border border-amber-400/30 bg-amber-950/50 px-3 py-1.5 font-mono text-base font-black text-amber-200">
                    {metadata.rightValue}
                  </span>
                  {/* Outcome verdict */}
                  <span
                    className={`
                      ml-auto rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wide
                      ${metadata.willSwap
                        ? 'border-rose-400/40 bg-rose-950/50 text-rose-300'
                        : 'border-slate-600/40 bg-slate-900/60 text-slate-400'
                      }
                    `}
                  >
                    {metadata.willSwap ? 'Will Swap' : 'No Swap'}
                  </span>
                </div>
              </div>
            )}

            {/* ── Swap context panel ── */}
            {hasSwapContext && metadata.leftValue !== undefined && (
              <div className="rounded-xl border border-rose-400/20 bg-rose-950/20 p-4">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-rose-400/70">
                  Swap Complete
                </p>
                <p className="text-sm text-rose-200">
                  Elements at indices [{step.indices?.join('] and [')}] have exchanged positions.
                  The larger value is now one step closer to its final sorted position.
                </p>
              </div>
            )}

            {/* ── Completion banner ── */}
            {isCompleted && (
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-900/20 p-4">
                <p className="text-sm font-semibold text-emerald-300">
                  ✦ Algorithm complete.{' '}
                  {metadata.totalComparisons !== undefined && (
                    <>
                      Finished in {metadata.totalComparisons} comparison{metadata.totalComparisons !== 1 ? 's' : ''} and {metadata.totalSwaps} swap{metadata.totalSwaps !== 1 ? 's' : ''}.
                    </>
                  )}
                </p>
              </div>
            )}
          </>
        ) : (
          /* ── Idle state ── */
          <div className="rounded-xl border border-white/8 bg-slate-950/60 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Ready
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              No active step
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Press Play or use Next to start the visualization.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default StepExplanation
