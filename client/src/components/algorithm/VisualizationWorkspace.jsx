import ArrayVisualizer from '../visualizer/ArrayVisualizer.jsx'
import VisualizationProgress from '../visualizer/VisualizationProgress.jsx'

/**
 * Visualization Workspace Component
 *
 * Hosts the visual canvas, progress scrubber, and algorithm renderer.
 * Passes through all engine state to sub-components without interpreting it.
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
      className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8"
      aria-labelledby="visualization-workspace-title"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="visualization-workspace-title" className="text-2xl font-bold text-white">
            {algorithm?.title ?? 'Visualization Workspace'}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {isComingSoon
              ? 'Interactive visualization will appear here when available.'
              : 'Step through the algorithm — watch it physically operate on the data.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Simulation Lab
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

      {/* Main Visualizer Canvas */}
      <div className="mt-5 min-h-[17rem] rounded-2xl border border-white/8 bg-slate-950/80 shadow-inner">
        {/*
          Inner padding is intentionally generous on desktop so the bubble
          elements have breathing room. On mobile we keep it tight.
        */}
        <div className="p-4 sm:p-6 lg:p-8">
          <ArrayVisualizer
            step={currentStepData}
            fallbackArray={previewArray}
            isComingSoon={isComingSoon}
          />
        </div>
      </div>

      {/* Footer notice */}
      {isComingSoon ? (
        <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          Interactive visualizer for {algorithm?.title || 'this algorithm'} is coming soon.
        </div>
      ) : totalSteps <= 1 ? (
        <p className="mt-4 text-xs text-slate-500">
          Press Play to begin, or use Custom Input to choose your own array.
        </p>
      ) : (
        <p className="mt-4 text-xs text-slate-500">
          Tip: drag the step scrubber to inspect any moment, or press Previous to revisit a step.
        </p>
      )}
    </section>
  )
}

export default VisualizationWorkspace
