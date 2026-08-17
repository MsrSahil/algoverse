import { STEP_TYPES } from '../../components/visualizer/visualizationTypes.js'
import { createVisualizationStep } from '../../components/visualizer/visualizationUtils.js'

/**
 * Educational step durations (ms) for Bubble Sort.
 *
 * These are HINTS passed as metadata.suggestedDuration. The generic engine
 * uses Math.max(speedConfigDelay, suggestedDuration) when playing, so these
 * values only take effect when the base speed is faster than the hint.
 *
 * At 1x (1400ms base) most steps are already long enough. At 1.5x / 2x
 * these hints ensure critical moments (COMPARE, SWAP, PASS COMPLETE) still
 * have enough time for the learner to perceive what happened.
 */
const STEP_DURATIONS = {
  START:    1200,
  COMPARE:  1400,   // enough time to read comparison + decision
  SWAP:     1600,   // swap animation ~800ms; keep dwell at 1600ms
  SORTED:   1800,   // pass completion pause — learner needs to register this
  COMPLETE: 2200    // satisfying ending
}

/**
 * Pure, deterministic Bubble Sort visualization step generator.
 *
 * Simulates Bubble Sort step-by-step and produces a sequence of immutable
 * visualization step snapshots (START, COMPARE, SWAP, SORTED, COMPLETE)
 * for the generic visualization engine.
 *
 * @param {number[]} input - Array of numbers to sort
 * @param {Object} [_options] - Additional generator options (reserved)
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
        explanation: 'No elements provided to sort.',
        metadata: { suggestedDuration: STEP_DURATIONS.START }
      }),
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.COMPLETE,
        arrayState: [],
        indices: [],
        sortedIndices: [],
        title: 'Bubble Sort Complete',
        explanation: 'The empty array is trivially sorted.',
        metadata: { suggestedDuration: STEP_DURATIONS.COMPLETE }
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
          'Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.',
        metadata: { suggestedDuration: STEP_DURATIONS.START, pass: 0, totalElements: n, totalPasses: 1 }
      }),
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.SORTED,
        arrayState: [...arr],
        indices: [0],
        sortedIndices: [0],
        title: 'Single Element Sorted',
        explanation: `The array has only one element (${arr[0]}), which is already in its sorted position.`,
        metadata: {
          suggestedDuration: STEP_DURATIONS.SORTED,
          pass: 1,
          totalPasses: 1,
          finalizedIndex: 0,
          finalizedValue: arr[0],
          passComplete: true,
          bubbleMessage: `${arr[0]} is already in its final position`
        }
      }),
      createVisualizationStep({
        stepIndex: 2,
        type: STEP_TYPES.COMPLETE,
        arrayState: [...arr],
        indices: [],
        sortedIndices: [0],
        title: 'Bubble Sort Complete',
        explanation: 'The array is fully sorted. Bubble Sort has finished.',
        metadata: {
          suggestedDuration: STEP_DURATIONS.COMPLETE,
          totalComparisons: 0,
          totalSwaps: 0,
          finalArray: [...arr]
        }
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
          suggestedDuration: STEP_DURATIONS[type] ?? STEP_DURATIONS.START,
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
      'Bubble Sort works by repeatedly comparing adjacent elements and swapping them if they are in the wrong order. Each pass "bubbles" the largest unsorted value to its final position at the end.',
    metadata: { pass: 0, totalElements: n, totalPasses: n - 1 }
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
      const decision = leftVal > rightVal ? 'swap' : leftVal === rightVal ? 'equal' : 'no-swap'
      let compareExplanation = ''
      if (leftVal > rightVal) {
        compareExplanation = `${leftVal} is greater than ${rightVal}, so these two elements must swap. The larger value will move one step closer to its final position.`
      } else if (leftVal === rightVal) {
        compareExplanation = `Both elements equal ${leftVal}. Equal elements do not need to swap — they are already in relative order.`
      } else {
        compareExplanation = `${leftVal} is less than ${rightVal}, so no swap is needed. These two are already in the correct relative order.`
      }

      addStep(STEP_TYPES.COMPARE, {
        indices: [j, j + 1],
        title: `Comparing ${leftVal} and ${rightVal}`,
        explanation: compareExplanation,
        metadata: {
          pass: passNumber,
          totalPasses: n - 1,
          comparisonIndex: j,
          leftValue: leftVal,
          rightValue: rightVal,
          willSwap: leftVal > rightVal,
          decision
        }
      })

      // B. SWAP step (only if left > right)
      if (leftVal > rightVal) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        swapped = true
        totalSwaps += 1

        // At this point: arr[j] = rightVal (smaller, moved left), arr[j+1] = temp (larger, moved right)
        addStep(STEP_TYPES.SWAP, {
          indices: [j, j + 1],
          title: `Swapped ${temp} ↔ ${arr[j]}`,
          explanation: `${temp} moved right and ${arr[j]} moved left. The larger value (${temp}) continues bubbling toward its final position.`,
          metadata: {
            pass: passNumber,
            totalPasses: n - 1,
            comparisonIndex: j,
            leftValue: arr[j],
            rightValue: arr[j + 1],
            swapDetail: {
              movedRight: temp,   // the larger value that moved right
              movedLeft: arr[j]   // the smaller value that moved left
            }
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
      title: `${arr[lastUnsortedIndex]} is in its final position`,
      explanation: `Pass ${passNumber} complete. ${arr[lastUnsortedIndex]} has bubbled all the way to index ${lastUnsortedIndex} — it will not move again. The sorted region has grown by one element.`,
      metadata: {
        pass: passNumber,
        totalPasses: n - 1,
        finalizedIndex: lastUnsortedIndex,
        finalizedValue: arr[lastUnsortedIndex],
        passComplete: true,
        bubbleMessage: `${arr[lastUnsortedIndex]} bubbled to its final position`
      }
    })

    // Early termination optimization
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
          title: 'Early Termination — Already Sorted',
          explanation: `No swaps occurred during Pass ${passNumber}. This proves all remaining elements are already in their correct positions. Bubble Sort exits early.`,
          metadata: {
            pass: passNumber,
            totalPasses: n - 1,
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
    explanation: `Every element has reached its final position. Bubble Sort finished with ${totalComparisons} comparison${totalComparisons !== 1 ? 's' : ''} and ${totalSwaps} swap${totalSwaps !== 1 ? 's' : ''}.`,
    metadata: {
      finalArray: [...arr],
      totalComparisons,
      totalSwaps
    }
  })

  return steps
}

export default generateBubbleSortSteps
