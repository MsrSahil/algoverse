import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react'
import { SPEED_OPTIONS } from '../visualizer/visualizationTypes.js'

const baseButtonClassName =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2.5 text-sm font-semibold text-slate-200 transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-slate-800/80 disabled:hover:text-slate-200'

const primaryButtonClassName =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-linear-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.25)] transition duration-200 hover:from-cyan-400 hover:to-emerald-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none'

/**
 * Interactive Visualization Controls Panel
 *
 * Provides playback actions (Play, Pause, Next, Previous, Restart)
 * and speed adjustments for the visualization engine.
 */
const VisualizationControls = ({
  isPlaying = false,
  isCompleted = false,
  canPlay = false,
  canPause = false,
  canPrevious = false,
  canNext = false,
  canRestart = false,
  speed = '1x',
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onRestart,
  onSpeedChange,
  disabled = false,
  isComingSoon = false
}) => {
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.()
    } else {
      onPlay?.()
    }
  }

  return (
    <section
      className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
      aria-labelledby="visualization-controls-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="visualization-controls-title" className="text-lg font-bold text-white">
          Visualization Controls
        </h3>
        {isComingSoon ? (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
            Coming Soon
          </span>
        ) : isCompleted ? (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Finished
          </span>
        ) : isPlaying ? (
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            Playing
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        {/* Playback Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Previous Step */}
          <button
            type="button"
            disabled={disabled || isComingSoon || !canPrevious}
            onClick={onPrevious}
            className={baseButtonClassName}
            aria-label="Previous step"
            title="Previous step"
          >
            <SkipBack className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {/* Play / Pause Toggle */}
          {isPlaying ? (
            <button
              type="button"
              disabled={disabled || isComingSoon || !canPause}
              onClick={handlePlayPause}
              className={primaryButtonClassName}
              aria-label="Pause playback"
              title="Pause playback"
            >
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={disabled || isComingSoon || !canPlay}
              onClick={handlePlayPause}
              className={primaryButtonClassName}
              aria-label={isCompleted ? 'Replay algorithm' : 'Play algorithm'}
              title={isCompleted ? 'Replay algorithm' : 'Play algorithm'}
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{isCompleted ? 'Replay' : 'Play'}</span>
            </button>
          )}

          {/* Next Step */}
          <button
            type="button"
            disabled={disabled || isComingSoon || !canNext}
            onClick={onNext}
            className={baseButtonClassName}
            aria-label="Next step"
            title="Next step"
          >
            <span>Next</span>
            <SkipForward className="h-4 w-4" />
          </button>

          {/* Restart */}
          <button
            type="button"
            disabled={disabled || isComingSoon || !canRestart}
            onClick={onRestart}
            className={baseButtonClassName}
            aria-label="Restart from step 0"
            title="Restart from step 0"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart</span>
          </button>
        </div>

        {/* Playback Speed Selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="speed-select" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Speed:
          </label>
          <div className="flex items-center rounded-xl border border-white/10 bg-slate-950/70 p-1">
            {SPEED_OPTIONS.map((speedOption) => {
              const isSelected = speed === speedOption
              return (
                <button
                  key={speedOption}
                  type="button"
                  disabled={disabled || isComingSoon}
                  onClick={() => onSpeedChange?.(speedOption)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 disabled:opacity-40'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Set speed to ${speedOption}`}
                >
                  {speedOption}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisualizationControls
