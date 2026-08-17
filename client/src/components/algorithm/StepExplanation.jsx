import { STEP_TYPES } from '../visualizer/visualizationTypes.js'
import { getStepTypeBadgeConfig } from '../visualizer/visualizationUtils.js'

/**
 * Step Explanation Component — V3
 *
 * Concise, punchy explanations. The DecisionPanel in ArrayVisualizer
 * handles the primary visual teaching on the simulation stage. This panel
 * provides the secondary narrative and step counter.
 *
 * Reads only generic step fields and metadata. Zero algorithm logic.
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

  const hasComparisonContext =
    type === STEP_TYPES.COMPARE &&
    metadata.leftValue !== undefined &&
    metadata.rightValue !== undefined

  return (
    <section
      className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
      aria-labelledby="step-explanation-title"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="step-explanation-title" className="text-base font-bold text-white">
          Step Detail
        </h3>

        {hasStep && (
          <div className="flex items-center gap-2">
            {metadata.pass > 0 && !isCompleted && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Pass {metadata.pass}
                {metadata.totalPasses ? ` / ${metadata.totalPasses}` : ''}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badge.bgColor} ${badge.borderColor} ${badge.textColor}`}
            >
              <span className={`h-1 w-1 rounded-full ${badge.dotColor}`} />
              {badge.label}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-3">
        {hasStep ? (
          <>
            {/* Step counter — small, secondary */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Step {stepNumber} / {totalSteps}
              </span>
              {step.indices && step.indices.length > 0 && (
                <span className="text-[10px] text-slate-600">
                  idx [{step.indices.join(', ')}]
                </span>
              )}
            </div>

            {/* Title — bold, concise */}
            <p className="text-sm font-bold text-white">{step.title || 'Step in progress'}</p>

            {/* Explanation — concise educational narrative */}
            <p className="text-xs leading-relaxed text-slate-400">
              {step.explanation || ''}
            </p>

            {/* ── COMPARE: inline decision recap ── */}
            {hasComparisonContext && (
              <div className="rounded-xl border border-amber-400/15 bg-amber-950/15 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black text-amber-200">
                    {metadata.leftValue}
                  </span>
                  <span className="text-sm font-black text-amber-400">
                    {metadata.willSwap ? '>' : metadata.leftValue === metadata.rightValue ? '=' : '<'}
                  </span>
                  <span className="font-mono text-sm font-black text-amber-200">
                    {metadata.rightValue}
                  </span>
                  <span
                    className={`ml-auto rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                      metadata.willSwap
                        ? 'border-rose-400/30 bg-rose-950/40 text-rose-300'
                        : 'border-slate-700 bg-slate-900/60 text-slate-500'
                    }`}
                  >
                    {metadata.willSwap ? 'Swap' : 'Keep'}
                  </span>
                </div>
              </div>
            )}

            {/* ── Completion banner ── */}
            {isCompleted && (
              <div className="rounded-xl border border-emerald-400/25 bg-emerald-900/15 p-3">
                <p className="text-xs font-semibold text-emerald-300">
                  ✦ Complete —{' '}
                  {metadata.totalComparisons !== undefined && (
                    <>
                      {metadata.totalComparisons} comparison{metadata.totalComparisons !== 1 ? 's' : ''},{' '}
                      {metadata.totalSwaps} swap{metadata.totalSwaps !== 1 ? 's' : ''}.
                    </>
                  )}
                </p>
              </div>
            )}
          </>
        ) : (
          /* ── Idle state ── */
          <div className="rounded-xl border border-white/8 bg-slate-950/60 p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Ready</p>
            <p className="mt-1.5 text-sm font-semibold text-white">Press Play to begin</p>
            <p className="mt-1 text-xs text-slate-500">or use Next to step through manually</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default StepExplanation
