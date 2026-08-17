import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AlgorithmHeader from '../../components/algorithm/AlgorithmHeader'
import AlgorithmOverview from '../../components/algorithm/AlgorithmOverview'
import VisualizationWorkspace from '../../components/algorithm/VisualizationWorkspace'
import VisualizationControls from '../../components/algorithm/VisualizationControls'
import CustomInputPanel from '../../components/algorithm/CustomInputPanel'
import StepExplanation from '../../components/algorithm/StepExplanation'
import ComplexityCard from '../../components/algorithm/ComplexityCard'
import AlgorithmExplanation from '../../components/algorithm/AlgorithmExplanation'
import CodeSection from '../../components/algorithm/CodeSection'
import DryRunSection from '../../components/algorithm/DryRunSection'
import PracticeSection from '../../components/algorithm/PracticeSection'
import RelatedAlgorithms from '../../components/algorithm/RelatedAlgorithms'
import BottomNavigation from '../../components/algorithm/BottomNavigation'
import NotFound from '../NotFound/index'
import { algorithms, algorithmLookupBySlug } from '../../data/algorithms'
import { useVisualizationEngine } from '../../components/visualizer/useVisualizationEngine'
import { getAlgorithmGenerator } from '../../algorithms/registry'
import { createVisualizationStep } from '../../components/visualizer/visualizationUtils'
import { STEP_TYPES } from '../../components/visualizer/visualizationTypes'

const DEFAULT_ARRAY = [50, 30, 80, 10, 60]

const AlgorithmDetailsPage = () => {
  const { slug } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const algorithm = algorithmLookupBySlug[slug]

  // Determine initial input array for this algorithm
  const defaultAlgorithmArray = useMemo(() => {
    if (Array.isArray(algorithm?.visualizationPreview) && algorithm.visualizationPreview.length > 0) {
      return [...algorithm.visualizationPreview]
    }
    return DEFAULT_ARRAY
  }, [algorithm])

  const [customArray, setCustomArray] = useState(defaultAlgorithmArray)

  // Reset custom array when changing algorithm slug
  useEffect(() => {
    if (Array.isArray(algorithm?.visualizationPreview) && algorithm.visualizationPreview.length > 0) {
      setCustomArray([...algorithm.visualizationPreview])
    } else {
      setCustomArray(DEFAULT_ARRAY)
    }
  }, [slug, algorithm])

  // Look up registered step generator from algorithm registry
  const generator = useMemo(() => {
    return getAlgorithmGenerator(slug)
  }, [slug])

  // Compute steps from generator if registered; otherwise provide an initial baseline snapshot
  const steps = useMemo(() => {
    if (!algorithm) return []

    if (generator && typeof generator === 'function') {
      try {
        const generated = generator(customArray)
        if (Array.isArray(generated) && generated.length > 0) {
          return generated
        }
      } catch (err) {
        console.error(`Failed to generate steps for ${slug}:`, err)
      }
    }

    // Baseline step when generator is pending (to display static preview in visualizer canvas)
    return [
      createVisualizationStep({
        stepIndex: 0,
        type: STEP_TYPES.START,
        arrayState: [...customArray],
        title: 'Initial Array State',
        explanation: 'Ready to begin algorithm execution. Step generator will plug in here.'
      })
    ]
  }, [algorithm, generator, customArray, slug])

  // Initialize generic visualization engine
  const {
    currentStep,
    currentStepData,
    totalSteps,
    isPlaying,
    isCompleted,
    canPlay,
    canPause,
    canPrevious,
    canNext,
    canRestart,
    speed,
    progressPercentage,
    play,
    pause,
    next,
    previous,
    restart,
    goToStep,
    setSpeed
  } = useVisualizationEngine({
    steps,
    defaultSpeed: '1x'
  })

  const relatedAlgorithms = useMemo(() => {
    if (!algorithm?.relatedAlgorithms?.length) {
      return []
    }

    return algorithm.relatedAlgorithms
      .map((relatedSlug) => algorithmLookupBySlug[relatedSlug])
      .filter(Boolean)
  }, [algorithm])

  const currentIndex = useMemo(() => {
    if (!algorithm) {
      return -1
    }

    return algorithms.findIndex((item) => item.slug === algorithm.slug)
  }, [algorithm])

  const previousAlgorithm = currentIndex > 0 ? algorithms[currentIndex - 1] : null
  const nextAlgorithm = currentIndex >= 0 && currentIndex < algorithms.length - 1 ? algorithms[currentIndex + 1] : null

  if (!algorithm) {
    return <NotFound />
  }

  const isComingSoon = algorithm.status === 'coming-soon'

  const handleApplyArray = (newArray) => {
    setCustomArray(newArray)
  }

  const handleResetArray = () => {
    setCustomArray(defaultAlgorithmArray)
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AlgorithmHeader
          algorithm={algorithm}
          isFavorite={isFavorite}
          isComplete={isComplete}
          onToggleFavorite={() => setIsFavorite((previousState) => !previousState)}
          onToggleComplete={() => setIsComplete((previousState) => !previousState)}
        />

        <AlgorithmOverview
          overview={algorithm.overview}
          fallbackDescription={algorithm.description}
          keyIdea={algorithm.keyIdea}
        />

        {/* Visualization Workspace */}
        <VisualizationWorkspace
          algorithm={algorithm}
          currentStepData={currentStepData}
          currentStep={currentStep}
          totalSteps={totalSteps}
          progressPercentage={progressPercentage}
          isPlaying={isPlaying}
          isCompleted={isCompleted}
          onGoToStep={goToStep}
          customArray={customArray}
        />

        {/* Visualization Controls */}
        <VisualizationControls
          isPlaying={isPlaying}
          isCompleted={isCompleted}
          canPlay={canPlay}
          canPause={canPause}
          canPrevious={canPrevious}
          canNext={canNext}
          canRestart={canRestart}
          speed={speed}
          onPlay={play}
          onPause={pause}
          onPrevious={previous}
          onNext={next}
          onRestart={restart}
          onSpeedChange={setSpeed}
          disabled={isComingSoon || totalSteps <= 1}
          isComingSoon={isComingSoon}
        />

        {/* Custom Input Panel */}
        <CustomInputPanel
          initialArray={customArray}
          onApplyArray={handleApplyArray}
          onResetDefault={handleResetArray}
          disabled={isComingSoon}
          isComingSoon={isComingSoon}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <StepExplanation
              step={currentStepData}
              currentStep={currentStep}
              totalSteps={totalSteps}
              isCompleted={isCompleted}
            />
            <AlgorithmExplanation algorithm={algorithm} />
            <CodeSection codeImplementations={algorithm.codeImplementations} />
            <DryRunSection dryRun={algorithm.dryRun} />
          </div>

          <aside className="space-y-6 xl:col-span-4">
            <ComplexityCard
              timeComplexity={algorithm.timeComplexity}
              spaceComplexity={algorithm.spaceComplexity}
            />
            <PracticeSection practiceProblems={algorithm.practiceProblems} />
            <RelatedAlgorithms algorithms={relatedAlgorithms} />
          </aside>
        </div>

        <BottomNavigation
          previousAlgorithm={previousAlgorithm}
          nextAlgorithm={nextAlgorithm}
        />
      </div>
    </section>
  )
}

export default AlgorithmDetailsPage
