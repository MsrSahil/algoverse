import { useMemo, useState } from 'react'
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

const defaultStep = {
  label: 'Step 0',
  title: 'Initial array',
  description: 'Ready to start the visualization.'
}

const AlgorithmDetailsPage = () => {
  const { slug } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const algorithm = algorithmLookupBySlug[slug]

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

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AlgorithmHeader
          algorithm={algorithm}
          isFavorite={isFavorite}
          isComplete={isComplete}
          onToggleFavorite={() => setIsFavorite((previous) => !previous)}
          onToggleComplete={() => setIsComplete((previous) => !previous)}
        />

        <AlgorithmOverview
          overview={algorithm.overview}
          fallbackDescription={algorithm.description}
          keyIdea={algorithm.keyIdea}
        />

        <VisualizationWorkspace algorithm={algorithm} />

        <VisualizationControls disabled={true} isComingSoon={isComingSoon} />

        <CustomInputPanel disabled={true} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <StepExplanation step={defaultStep} />
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
