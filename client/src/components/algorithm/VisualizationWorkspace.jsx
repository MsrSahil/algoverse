import ArrayVisualizer from '../visualizer/ArrayVisualizer.jsx'
import VisualizationProgress from '../visualizer/VisualizationProgress.jsx'

/**
 * Visualization Workspace Component
 *
 * Hosts the visual canvas, progress scrubber, and algorithm renderer.
 * The visualization is the hero — minimal chrome around it.
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
  const previewArray =
    Array.isArray(customArray) && customArray.length > 0
      ? customArray
      : Array.isArray(algorithm?.visualizationPreview) && algorithm.visualizationPreview.length > 0
        ? algorithm.visualizationPreview
        : [50, 30, 80, 10, 60]

  return (
    <section
      className="rounded-3xl border border-white/10 bg-slate-900/60"
      aria-labelledby="visualization-workspace-title"
    >
      {/* Minimal header */}
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 sm:px-8">
        <h2 id="visualization-workspace-title" className="text-lg font-bold text-white">
          {algorithm?.title ?? 'Visualization'}
        </h2>
        <span className="text-xs text-slate-500">
          {isComingSoon
            ? 'Coming soon'
            : totalSteps > 1
              ? `${totalSteps} steps`
              : 'Ready'}
        </span>
      </div>

      {/* Main Visualizer Canvas — the hero */}
      <div className="min-h-[22rem] bg-slate-950/70">
        <div className="p-4 sm:p-6 lg:p-10">
          <ArrayVisualizer
            step={currentStepData}
            fallbackArray={previewArray}
            isComingSoon={isComingSoon}
          />
        </div>
      </div>

      {/* Progress scrubber — below the canvas */}
      <div className="border-t border-white/8 px-6 py-4 sm:px-8">
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

      {isComingSoon && (
        <div className="border-t border-white/8 px-6 pb-4 sm:px-8">
          <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            Interactive visualizer for {algorithm?.title || 'this algorithm'} is coming soon.
          </div>
        </div>
      )}
    </section>
  )
}

export default VisualizationWorkspace
