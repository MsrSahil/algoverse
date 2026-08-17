import { getStepTypeBadgeConfig } from '../visualizer/visualizationUtils.js'
import { STEP_TYPES } from '../visualizer/visualizationTypes.js'

/**
 * Step Explanation Component
 *
 * Displays human-readable narrative, active step type, and context for the current step.
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

  return (
    <section
      className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
      aria-labelledby="step-explanation-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="step-explanation-title" className="text-lg font-bold text-white">
          Current Step Explanation
        </h3>

        {hasStep && (
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badge.bgColor} ${badge.borderColor} ${badge.textColor}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${badge.dotColor}`} />
              {badge.label}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-5">
        {hasStep ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Step {stepNumber} of {totalSteps}
              </span>

              {step.indices && step.indices.length > 0 && (
                <span className="text-xs text-slate-400">
                  Target indices: <span className="font-mono text-slate-200">[{step.indices.join(', ')}]</span>
                </span>
              )}
            </div>

            <p className="text-base font-semibold text-white">
              {step.title || 'Step in progress'}
            </p>

            <p className="text-sm leading-relaxed text-slate-300">
              {step.explanation || 'No detailed description for this step.'}
            </p>

            {isCompleted && (
              <div className="mt-3 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                🎉 Algorithm execution has completed successfully.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Ready
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              No active step
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Start the visualization or choose custom input to see step-by-step explanations.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default StepExplanation
