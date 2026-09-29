import { describe, expect, it } from 'vitest'
import { STEP_TYPES } from '../src/components/visualizer/visualizationTypes.js'
import { generateBubbleSortSteps } from '../src/algorithms/sorting/bubbleSort.js'
import { generateSelectionSortSteps } from '../src/algorithms/sorting/selectionSort.js'
import { generateInsertionSortSteps } from '../src/algorithms/sorting/insertionSort.js'
import { generateMergeSortSteps } from '../src/algorithms/sorting/mergeSort.js'

const generators = [
  ['Bubble Sort', generateBubbleSortSteps],
  ['Selection Sort', generateSelectionSortSteps],
  ['Insertion Sort', generateInsertionSortSteps],
  ['Merge Sort', generateMergeSortSteps]
]

const cases = [
  ['empty', []],
  ['single element', [7]],
  ['duplicates', [3, 1, 3, 2, 1]],
  ['already sorted', [1, 2, 3, 4, 5]],
  ['reverse sorted', [5, 4, 3, 2, 1]]
]

describe.each(generators)('%s generator', (name, generateSteps) => {
  it.each(cases)('sorts the %s input without mutating the input', (_caseName, input) => {
    const original = [...input]
    const steps = generateSteps(input)
    const finalStep = steps.at(-1)

    expect(input).toEqual(original)
    expect(steps.length).toBeGreaterThan(0)
    expect(finalStep.type).toBe(STEP_TYPES.COMPLETE)
    expect(finalStep.arrayState).toEqual([...input].sort((left, right) => left - right))
  })

  it('emits the required visualization step contract', () => {
    const steps = generateSteps([4, 2, 3])

    for (const [index, step] of steps.entries()) {
      expect(step).toMatchObject({
        stepIndex: index,
        type: expect.any(String),
        arrayState: expect.any(Array),
        indices: expect.any(Array),
        sortedIndices: expect.any(Array),
        title: expect.any(String),
        explanation: expect.any(String)
      })
    }
  })
})
