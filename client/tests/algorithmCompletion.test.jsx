import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { STEP_TYPES } from '../src/components/visualizer/visualizationTypes.js'
import AlgorithmDetailsPage from '../src/pages/AlgorithmDetails/AlgorithmDetailsPage.jsx'
import { useAuth } from '../src/context/AuthContext.jsx'
import { progressService } from '../src/services/progressService.js'

const visualizationState = vi.hoisted(() => ({
  currentStep: 0,
  currentStepData: { type: 'START' },
  totalSteps: 2,
  isCompleted: false,
  isPlaying: false,
  speed: '1x',
  progressPercentage: 0,
  play: vi.fn(),
  pause: vi.fn(),
  next: vi.fn(),
  previous: vi.fn(),
  restart: vi.fn(),
  goToStep: vi.fn(),
  setSpeed: vi.fn()
}))

vi.mock('../src/context/AuthContext.jsx', () => ({
  useAuth: vi.fn()
}))

vi.mock('../src/services/progressService.js', () => ({
  progressService: {
    getAll: vi.fn(),
    complete: vi.fn()
  }
}))

vi.mock('../src/components/visualizer/useVisualizationEngine.js', () => ({
  useVisualizationEngine: vi.fn(() => visualizationState)
}))

vi.mock('../src/components/algorithm/AlgorithmOverview.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/VisualizationLab.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/CustomInputPanel.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/ComplexityCard.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/AlgorithmExplanation.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/CodeSection.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/DryRunSection.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/PracticeSection.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/RelatedAlgorithms.jsx', () => ({ default: () => null }))
vi.mock('../src/components/algorithm/BottomNavigation.jsx', () => ({ default: () => null }))

const renderAlgorithm = (slug) => render(
  <MemoryRouter initialEntries={[`/algorithm/${slug}`]}>
    <Routes>
      <Route path="/algorithm/:slug" element={<AlgorithmDetailsPage />} />
    </Routes>
  </MemoryRouter>
)

const setVisualizationState = (completed) => {
  visualizationState.isCompleted = completed
  visualizationState.currentStep = completed ? 1 : 0
  visualizationState.currentStepData = {
    type: completed ? STEP_TYPES.COMPLETE : STEP_TYPES.START
  }
}

describe('algorithm completion flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ isAuthenticated: true, authLoading: false })
    progressService.getAll.mockResolvedValue({ data: { progress: [] } })
    progressService.complete.mockResolvedValue({
      data: {
        progress: {
          algorithmSlug: 'bubble-sort',
          completed: true
        }
      }
    })
    setVisualizationState(false)
  })

  it('keeps Bubble Sort locked before the COMPLETE step and unlocks it at the final step', async () => {
    const view = renderAlgorithm('bubble-sort')
    const button = await screen.findByRole('button', { name: 'Mark algorithm as complete' })

    expect(button).toBeDisabled()

    setVisualizationState(true)
    view.rerender(
      <MemoryRouter initialEntries={['/algorithm/bubble-sort']}>
        <Routes>
          <Route path="/algorithm/:slug" element={<AlgorithmDetailsPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByRole('button', { name: 'Mark algorithm as complete' })).toBeEnabled()
  })

  it('saves Bubble Sort explicitly and shows saving then completed state', async () => {
    let resolveCompletion
    progressService.complete.mockReturnValue(new Promise((resolve) => {
      resolveCompletion = resolve
    }))
    setVisualizationState(true)
    renderAlgorithm('bubble-sort')

    const user = userEvent.setup()
    const button = await screen.findByRole('button', { name: 'Mark algorithm as complete' })
    await user.click(button)

    expect(progressService.complete).toHaveBeenCalledWith('bubble-sort', expect.any(Number))
    expect(screen.getByText('Saving...')).toBeInTheDocument()

    resolveCompletion({ data: { progress: { completed: true } } })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Marked as complete' })).toHaveTextContent('✓ Completed')
    })
  })

  it('loads existing completed progress without requiring another completion', async () => {
    progressService.getAll.mockResolvedValue({
      data: {
        progress: [{ algorithmSlug: 'bubble-sort', completed: true }]
      }
    })

    renderAlgorithm('bubble-sort')

    const completedButton = await screen.findByRole('button', { name: 'Marked as complete' })
    expect(completedButton).toBeDisabled()
    expect(progressService.complete).not.toHaveBeenCalled()
  })

  it('uses the same completion flow for Selection Sort', async () => {
    setVisualizationState(true)
    renderAlgorithm('selection-sort')

    const user = userEvent.setup()
    await user.click(await screen.findByRole('button', { name: 'Mark algorithm as complete' }))

    expect(progressService.complete).toHaveBeenCalledWith('selection-sort', expect.any(Number))
  })
})
