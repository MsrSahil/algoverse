import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useVisualizationEngine from '../src/components/visualizer/useVisualizationEngine.js'
import { STEP_TYPES } from '../src/components/visualizer/visualizationTypes.js'

const createSteps = (values) => values.map((value, index) => ({
  stepIndex: index,
  type: index === values.length - 1 ? STEP_TYPES.COMPLETE : STEP_TYPES.START,
  arrayState: [value],
  indices: [],
  sortedIndices: [],
  title: `Step ${index}`,
  explanation: `Explanation ${index}`
}))

describe('useVisualizationEngine', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts at the initial step and moves forward/backward/restarts', () => {
    const steps = createSteps([1, 2, 3])
    const { result } = renderHook(() => useVisualizationEngine({ steps }))

    expect(result.current.currentStep).toBe(0)
    expect(result.current.isCompleted).toBe(false)

    act(() => result.current.next())
    expect(result.current.currentStep).toBe(1)

    act(() => result.current.previous())
    expect(result.current.currentStep).toBe(0)

    act(() => result.current.restart())
    expect(result.current.currentStep).toBe(0)
  })

  it('plays through every step and reports completion at the final step', () => {
    vi.useFakeTimers()
    const steps = createSteps([1, 2, 3])
    const { result } = renderHook(() => useVisualizationEngine({ steps }))

    act(() => result.current.play())
    expect(result.current.isPlaying).toBe(true)

    act(() => vi.advanceTimersByTime(1400))
    expect(result.current.currentStep).toBe(1)
    expect(result.current.isPlaying).toBe(true)

    act(() => vi.advanceTimersByTime(1400))
    expect(result.current.currentStep).toBe(2)
    expect(result.current.isCompleted).toBe(true)
    expect(result.current.currentStepData.type).toBe(STEP_TYPES.COMPLETE)
    expect(result.current.isPlaying).toBe(false)
  })

  it('pauses playback and resets when the input steps change', () => {
    vi.useFakeTimers()
    const initialSteps = createSteps([1, 2, 3])
    const { result, rerender } = renderHook(
      ({ steps }) => useVisualizationEngine({ steps }),
      { initialProps: { steps: initialSteps } }
    )

    act(() => {
      result.current.next()
      result.current.play()
    })
    expect(result.current.isPlaying).toBe(true)

    rerender({ steps: createSteps([9, 8]) })

    expect(result.current.currentStep).toBe(0)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentStepData.arrayState).toEqual([9])
  })
})
