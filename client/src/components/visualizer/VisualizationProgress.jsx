/**
 * Visualization Progress & Step Scrubber Component
 *
 * Displays current step progression, percentage bar, and an interactive scrubber
 * to allow direct step navigation.
 */
const VisualizationProgress = ({
  currentStep = 0,
  totalSteps = 0,
  progressPercentage = 0,
  isCompleted = false,
  isPlaying = false,
  onGoToStep,
  disabled = false
}) => {
  const hasSteps = totalSteps > 0
  const maxIndex = Math.max(0, totalSteps - 1)
  const displayStep = hasSteps ? currentStep + 1 : 0

  const handleSliderChange = (e) => {
    if (disabled || !onGoToStep) return
    const step = Number(e.target.value)
    onGoToStep(step)
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-4">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Progress:</span>
          <span className="font-mono font-bold text-cyan-300">
            {hasSteps ? `Step ${displayStep} of ${totalSteps}` : 'No steps loaded'}
          </span>
          <span className="text-slate-500">({progressPercentage}%)</span>
        </div>

        <div>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Completed
            </span>
          ) : isPlaying ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              Playing
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
              {hasSteps ? 'Ready' : 'Idle'}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-linear-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Interactive Step Scrubber Slider */}
      {hasSteps && totalSteps > 1 && (
        <div className="mt-1 flex items-center gap-3">
          <label htmlFor="step-scrubber" className="sr-only">
            Step Scrubber
          </label>
          <input
            id="step-scrubber"
            type="range"
            min="0"
            max={maxIndex}
            value={currentStep}
            disabled={disabled}
            onChange={handleSliderChange}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Seek to algorithm step"
          />
        </div>
      )}
    </div>
  )
}

export default VisualizationProgress
