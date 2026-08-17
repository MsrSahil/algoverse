import ArrayVisualizer from '../visualizer/ArrayVisualizer.jsx'
import VisualizationProgress from '../visualizer/VisualizationProgress.jsx'

/**
 * Visualization Workspace Component
 *
 * Hosts the visual canvas, progress scrubber, and algorithm renderer.
 */
const VisualizationWorkspace = ({
  algorithm,
  currentStepData = null,
  currentStep = 0,
  totalSteps = 0,
  progressPercentage = 0,
  isPlaying = false,
  isCompleted = false,
  onGoToStep,
  customArray = null
}) => {
  const isComingSoon = algorithm?.status === 'coming-soon'
  const previewArray = Array.isArray(customArray) && customArray.length > 0
    ? customArray
    : Array.isArray(algorithm?.visualizationPreview) && algorithm.visualizationPreview.length > 0
      ? algorithm.visualizationPreview
      : [50, 30, 80, 10, 60]

  return (
    <section
      className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8"
      aria-labelledby="visualization-workspace-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="visualization-workspace-title" className="text-2xl font-bold text-white">
            Visualization Workspace
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            {isComingSoon
              ? 'Interactive visualization will appear here when available.'
              : 'Step-by-step interactive algorithm execution canvas.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Visualization Engine
          </span>
        </div>
      </div>

      {/* Progress & Step Scrubber */}
      <div className="mt-5">
        <VisualizationProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          progressPercentage={progressPercentage}
          isPlaying={isPlaying}
          isCompleted={isCompleted}
          onGoToStep={onGoToStep}
          disabled={isComingSoon || totalSteps <= 1}
        />
      </div>

      {/* Main Visualizer Render Canvas */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-6 shadow-inner">
        <ArrayVisualizer
          step={currentStepData}
          fallbackArray={previewArray}
          isComingSoon={isComingSoon}
        />
      </div>

      {/* Status Notice Footer */}
      {isComingSoon ? (
        <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          Interactive visualizer for {algorithm?.title || 'this algorithm'} is coming soon.
        </div>
      ) : totalSteps === 0 ? (
        <p className="mt-4 text-xs text-slate-400">
          Visualization engine is ready. Algorithm generator will plug in to stream steps.
        </p>
      ) : (
        <p className="mt-4 text-xs text-slate-400">
          Tip: Use the playback controls or drag the step scrubber above to inspect transitions.
        </p>
      )}
    </section>
  )
}

export default VisualizationWorkspace
