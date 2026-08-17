import { STEP_TYPES } from '../../components/visualizer/visualizationTypes.js'
import { createVisualizationStep } from '../../components/visualizer/visualizationUtils.js'

/**
 * Pure, deterministic Bubble Sort visualization step generator.
 *
 * Simulates Bubble Sort step-by-step and produces a sequence of immutable
 * visualization step snapshots (START, COMPARE, SWAP, SORTED, COMPLETE)
 * for the generic visualization engine.
 *
 * @param {number[]} input - Array of numbers to sort
 * @param {Object} [options] - Additional generator options
 * @returns {Array} List of VisualizationStep objects
 */
export const generateBubbleSortSteps = (input = [], _options = {}) => {
  // Edge Case: Empty or invalid input
  if (!Array.isArray(input) || input.length === 0) {
    return [
      createVisualizationStep({
        stepIndex: 0,
        type: STEP_TYPES.START,
        arrayState: [],
        indices: [],
        sortedIndices: [],
        title: 'Empty Array',
        explanation: 'No elements provided to sort.'
      }),
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.COMPLETE,
        arrayState: [],
        indices: [],
        sortedIndices: [],
        title: 'Bubble Sort Complete',
        explanation: 'The empty array is trivially sorted.'
      })
    ]
  }

  // Clone input to guarantee caller data is never mutated
  const arr = [...input]
  const n = arr.length

  // Edge Case: Single element array
  if (n === 1) {
    return [
      createVisualizationStep({
        stepIndex: 0,
        type: STEP_TYPES.START,
        arrayState: [...arr],
        indices: [],
        sortedIndices: [],
        title: 'Starting Bubble Sort',
        explanation:
          'Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.'
      }),
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.SORTED,
        arrayState: [...arr],
        indices: [0],
        sortedIndices: [0],
        title: 'Single Element Sorted',
        explanation: `The array has only one element (${arr[0]}), which is already in its sorted position.`
      }),
      createVisualizationStep({
        stepIndex: 2,
        type: STEP_TYPES.COMPLETE,
        arrayState: [...arr],
        indices: [],
        sortedIndices: [0],
        title: 'Bubble Sort Complete',
        explanation: 'The array is fully sorted. Bubble Sort has finished.'
      })
    ]
  }

  const steps = []
  const sortedIndices = []
  let totalComparisons = 0
  let totalSwaps = 0

  const addStep = (type, { indices = [], title, explanation, metadata = {} }) => {
    steps.push(
      createVisualizationStep({
        stepIndex: steps.length,
        type,
        arrayState: [...arr],
        indices,
        sortedIndices: [...sortedIndices],
        highlightedIndices: [],
        title,
        explanation,
        metadata: {
          totalComparisons,
          totalSwaps,
          ...metadata
        }
      })
    )
  }

  // 1. Initial START step
  addStep(STEP_TYPES.START, {
    indices: [],
    title: 'Starting Bubble Sort',
    explanation:
      'Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.',
    metadata: { pass: 0, totalElements: n }
  })

  // 2. Outer sorting passes
  for (let i = 0; i < n - 1; i += 1) {
    let swapped = false
    const passNumber = i + 1

    for (let j = 0; j < n - 1 - i; j += 1) {
      const leftVal = arr[j]
      const rightVal = arr[j + 1]
      totalComparisons += 1

      // A. COMPARE step
      let compareExplanation = ''
      if (leftVal > rightVal) {
        compareExplanation = `Comparing ${leftVal} at index ${j} and ${rightVal} at index ${j + 1}. Since ${leftVal} is greater than ${rightVal}, these elements need to be swapped.`
      } else if (leftVal === rightVal) {
        compareExplanation = `Comparing ${leftVal} at index ${j} and ${rightVal} at index ${j + 1}. Both elements are equal (${leftVal}), so no swap is needed.`
      } else {
        compareExplanation = `Comparing ${leftVal} at index ${j} and ${rightVal} at index ${j + 1}. No swap is needed because ${leftVal} is smaller than ${rightVal}.`
      }

      addStep(STEP_TYPES.COMPARE, {
        indices: [j, j + 1],
        title: `Comparing index ${j} (${leftVal}) and index ${j + 1} (${rightVal})`,
        explanation: compareExplanation,
        metadata: {
          pass: passNumber,
          comparisonIndex: j,
          leftValue: leftVal,
          rightValue: rightVal,
          willSwap: leftVal > rightVal
        }
      })

      // B. SWAP step (only if left > right)
      if (leftVal > rightVal) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        swapped = true
        totalSwaps += 1

        addStep(STEP_TYPES.SWAP, {
          indices: [j, j + 1],
          title: `Swapped ${temp} and ${arr[j]}`,
          explanation: `Swapped ${temp} and ${arr[j]} because ${temp} was greater than ${arr[j]}.`,
          metadata: {
            pass: passNumber,
            comparisonIndex: j,
            leftValue: arr[j],
            rightValue: arr[j + 1]
          }
        })
      }
    }

    // End of pass: the largest remaining unsorted element has bubbled to the end
    const lastUnsortedIndex = n - 1 - i
    if (!sortedIndices.includes(lastUnsortedIndex)) {
      sortedIndices.push(lastUnsortedIndex)
      sortedIndices.sort((a, b) => a - b)
    }

    addStep(STEP_TYPES.SORTED, {
      indices: [lastUnsortedIndex],
      title: `Element ${arr[lastUnsortedIndex]} finalized at index ${lastUnsortedIndex}`,
      explanation: `Pass ${passNumber} complete. The largest unsorted element (${arr[lastUnsortedIndex]}) has bubbled to its final position at index ${lastUnsortedIndex}.`,
      metadata: {
        pass: passNumber,
        finalizedIndex: lastUnsortedIndex,
        finalizedValue: arr[lastUnsortedIndex]
      }
    })

    // Early termination optimization: if no swaps occurred during the entire pass
    if (!swapped) {
      for (let k = 0; k < n; k += 1) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k)
        }
      }
      sortedIndices.sort((a, b) => a - b)

      if (i < n - 2) {
        addStep(STEP_TYPES.SORTED, {
          indices: [],
          title: `Early Termination: Array Already Sorted`,
          explanation: `No swaps were performed during Pass ${passNumber}. This guarantees that all remaining elements are already sorted.`,
          metadata: {
            pass: passNumber,
            earlyTermination: true
          }
        })
      }
      break
    }
  }

  // Ensure all indices are marked sorted at conclusion
  for (let k = 0; k < n; k += 1) {
    if (!sortedIndices.includes(k)) {
      sortedIndices.push(k)
    }
  }
  sortedIndices.sort((a, b) => a - b)

  // 3. Final COMPLETE step
  addStep(STEP_TYPES.COMPLETE, {
    indices: [],
    title: 'Bubble Sort Complete',
    explanation: `The array is fully sorted. Bubble Sort finished in ${totalComparisons} comparisons and ${totalSwaps} swaps.`,
    metadata: {
      finalArray: [...arr],
      totalComparisons,
      totalSwaps
    }
  })

  return steps
}

export default generateBubbleSortSteps
