import { STEP_TYPES, BOUNDARY_DIRECTIONS } from '../../components/visualizer/visualizationTypes.js'
import { createVisualizationStep } from '../../components/visualizer/visualizationUtils.js'

/**
 * Educational step durations (ms) for Selection Sort.
 *
 * Configured so that learners have ample time to perceive:
 * - START: Initial setup
 * - SELECT_INITIAL: Establishing the candidate minimum for the pass
 * - COMPARE: Comparing candidate minimum with scanned element
 * - NEW_MINIMUM: Moment a smaller element is discovered
 * - SCAN_COMPLETE: Moment search in unsorted slice concludes
 * - SWAP: Physical movement of the minimum into position
 * - SORTED: Permanent lock-in of the element
 * - COMPLETE: Full algorithm celebration
 */
const STEP_DURATIONS = {
  START:          1200,
  SELECT_INITIAL: 1000,
  COMPARE:        1200,
  NEW_MINIMUM:    1400,
  SCAN_COMPLETE:  1700,
  SWAP:           1600,
  SORTED:         1400,
  COMPLETE:       2000
}

/**
 * Pure, deterministic Selection Sort visualization step generator.
 *
 * Teaches:
 * SCAN → REMEMBER MINIMUM → FINISH SCAN → SWAP ONCE → FIX POSITION
 *
 * @param {number[]} input - Array of numbers to sort
 * @param {Object} [_options] - Additional generator options
 * @returns {Array} List of VisualizationStep objects
 */
export const generateSelectionSortSteps = (input = [], _options = {}) => {
  // Edge Case: Empty input
  if (!Array.isArray(input) || input.length === 0) {
    return [
      createVisualizationStep({
        stepIndex: 0,
        type: STEP_TYPES.START,
        arrayState: [],
        indices: [],
        sortedIndices: [],
        title: 'Empty Array',
        explanation: 'Find the smallest value in the unsorted region.',
        metadata: {
          suggestedDuration: STEP_DURATIONS.START,
          boundaryDirection: BOUNDARY_DIRECTIONS.NONE
        }
      }),
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.COMPLETE,
        arrayState: [],
        indices: [],
        sortedIndices: [],
        title: 'Selection Sort Complete',
        explanation: 'The empty array is trivially sorted.',
        metadata: {
          suggestedDuration: STEP_DURATIONS.COMPLETE,
          boundaryDirection: BOUNDARY_DIRECTIONS.NONE
        }
      })
    ]
  }

  // Clone input to ensure pure immutability
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
        title: 'Starting Selection Sort',
        explanation: 'Find the smallest value in the unsorted region.',
        metadata: {
          suggestedDuration: STEP_DURATIONS.START,
          pass: 0,
          totalElements: n,
          totalPasses: 1,
          boundaryDirection: BOUNDARY_DIRECTIONS.LEFT,
          boundaryLabel: 'sorted →'
        }
      }),
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.SORTED,
        arrayState: [...arr],
        indices: [0],
        sortedIndices: [0],
        title: `${arr[0]} is now permanently sorted`,
        explanation: `${arr[0]} is now permanently sorted.`,
        metadata: {
          suggestedDuration: STEP_DURATIONS.SORTED,
          pass: 1,
          totalPasses: 1,
          finalizedIndex: 0,
          finalizedValue: arr[0],
          passComplete: true,
          boundaryDirection: BOUNDARY_DIRECTIONS.LEFT,
          boundaryLabel: 'sorted →',
          passHeadline: `${arr[0]} is now permanently sorted.`,
          passDescription: 'Single element array is trivially sorted.'
        }
      }),
      createVisualizationStep({
        stepIndex: 2,
        type: STEP_TYPES.COMPLETE,
        arrayState: [...arr],
        indices: [],
        sortedIndices: [0],
        title: 'Selection Sort Complete',
        explanation: 'Every element is in its final position.',
        metadata: {
          suggestedDuration: STEP_DURATIONS.COMPLETE,
          totalComparisons: 0,
          totalSwaps: 0,
          finalArray: [...arr],
          completeTitle: 'Selection Sort Complete',
          completeDescription: 'Every element is in its final position.',
          boundaryDirection: BOUNDARY_DIRECTIONS.LEFT
        }
      })
    ]
  }

  const steps = []
  const sortedIndices = []
  let totalComparisons = 0
  let totalSwaps = 0

  const addStep = (type, { indices = [], selectedIndices = [], highlightedIndices = [], title, explanation, metadata = {} }) => {
    steps.push(
      createVisualizationStep({
        stepIndex: steps.length,
        type,
        arrayState: [...arr],
        indices,
        selectedIndices,
        highlightedIndices,
        sortedIndices: [...sortedIndices],
        title,
        explanation,
        metadata: {
          totalComparisons,
          totalSwaps,
          boundaryDirection: BOUNDARY_DIRECTIONS.LEFT,
          boundaryLabel: 'sorted →',
          suggestedDuration: STEP_DURATIONS[type] ?? STEP_DURATIONS.START,
          ...metadata
        }
      })
    )
  }

  // 1. START step
  addStep(STEP_TYPES.START, {
    indices: [],
    title: 'Starting Selection Sort',
    explanation: 'Find the smallest value in the unsorted region.',
    metadata: {
      suggestedDuration: STEP_DURATIONS.START,
      pass: 0,
      totalElements: n,
      totalPasses: n - 1,
      startTitle: 'Selection Sort',
      startExplanation: 'Find the smallest value in the unsorted region.'
    }
  })

  // 2. Outer sorting passes (i = 0 to n - 2)
  for (let i = 0; i < n - 1; i += 1) {
    const passNumber = i + 1
    let minIndex = i

    // A. SELECT: Set initial candidate minimum at slot i
    addStep(STEP_TYPES.SELECT, {
      indices: [i],
      selectedIndices: [i],
      title: `Pass ${passNumber}: ${arr[i]} is the current minimum`,
      explanation: `${arr[i]} is the current minimum.`,
      metadata: {
        suggestedDuration: STEP_DURATIONS.SELECT_INITIAL,
        pass: passNumber,
        totalPasses: n - 1,
        targetIndex: i,
        currentMin: arr[i],
        minIndex: i,
        actionLabel: 'Current Minimum'
      }
    })

    // B. Inner scan loop (j = i + 1 to n - 1)
    for (let j = i + 1; j < n; j += 1) {
      totalComparisons += 1
      const currentMinVal = arr[minIndex]
      const inspectedVal = arr[j]
      const isNewMinimum = inspectedVal < currentMinVal

      // B1. COMPARE step
      if (isNewMinimum) {
        addStep(STEP_TYPES.COMPARE, {
          indices: [minIndex, j],
          selectedIndices: [minIndex], // minIndex stays styled in cyan (MIN)
          title: `Compare ${currentMinVal} with ${inspectedVal}`,
          explanation: `Compare ${currentMinVal} with ${inspectedVal}.`,
          metadata: {
            suggestedDuration: STEP_DURATIONS.COMPARE,
            pass: passNumber,
            totalPasses: n - 1,
            leftValue: inspectedVal,
            rightValue: currentMinVal,
            operator: '<',
            leftLabel: 'Inspecting',
            rightLabel: 'Current Min',
            compareLabel: 'Comparing with Minimum',
            willSwap: false,
            isNewMinimum: true,
            decisionBadge: '★ NEW MINIMUM',
            decisionReason: `${inspectedVal} is smaller. It becomes the new minimum.`
          }
        })

        // B2. Transfer candidate indicator to new minimum (without swapping positions)
        minIndex = j
        addStep(STEP_TYPES.SELECT, {
          indices: [minIndex],
          selectedIndices: [minIndex],
          title: `${arr[minIndex]} is the new minimum`,
          explanation: `${arr[minIndex]} is smaller. It becomes the new minimum.`,
          metadata: {
            suggestedDuration: STEP_DURATIONS.NEW_MINIMUM,
            pass: passNumber,
            totalPasses: n - 1,
            targetIndex: i,
            currentMin: arr[minIndex],
            minIndex,
            actionLabel: 'New Minimum'
          }
        })
      } else {
        addStep(STEP_TYPES.COMPARE, {
          indices: [minIndex, j],
          selectedIndices: [minIndex], // minIndex stays styled in cyan (MIN)
          title: `Compare ${currentMinVal} with ${inspectedVal}`,
          explanation: `Compare ${currentMinVal} with ${inspectedVal}.`,
          metadata: {
            suggestedDuration: STEP_DURATIONS.COMPARE,
            pass: passNumber,
            totalPasses: n - 1,
            leftValue: currentMinVal,
            rightValue: inspectedVal,
            operator: currentMinVal === inspectedVal ? '=' : '<',
            leftLabel: 'Current Min',
            rightLabel: 'Inspecting',
            compareLabel: 'Comparing with Minimum',
            willSwap: false,
            isNewMinimum: false,
            decisionBadge: '✓ NO NEW MINIMUM',
            decisionReason: `${currentMinVal} is still smaller. Keep scanning.`
          }
        })
      }
    }

    // C. SCAN COMPLETE: Search in unsorted slice finished
    const finalMinVal = arr[minIndex]
    const requiresSwap = minIndex !== i

    addStep(STEP_TYPES.SELECT, {
      indices: [i, minIndex],
      selectedIndices: [minIndex],
      title: `Scan Complete — Minimum: ${finalMinVal}`,
      explanation: `${finalMinVal} is the smallest value found in this pass. ${requiresSwap ? 'Now place it in its final position.' : `${finalMinVal} is already in its final position.`}`,
      metadata: {
        suggestedDuration: STEP_DURATIONS.SCAN_COMPLETE,
        pass: passNumber,
        totalPasses: n - 1,
        scanComplete: true,
        actionLabel: '✓ SCAN COMPLETE'
      }
    })

    // D. SWAP step (if min is not already in target slot i)
    if (requiresSwap) {
      const originalTargetVal = arr[i]
      const temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
      totalSwaps += 1

      addStep(STEP_TYPES.SWAP, {
        indices: [i, minIndex],
        selectedIndices: [],
        title: `Move ${arr[i]} into its final position`,
        explanation: `${arr[i]} moves into the first position of the unsorted region.`,
        metadata: {
          suggestedDuration: STEP_DURATIONS.SWAP,
          pass: passNumber,
          totalPasses: n - 1,
          swapLabel: 'Placing Minimum',
          swapExplanation: `${arr[i]} moves into the first position of the unsorted region.`,
          movementText: `${arr[i]} placed into slot [${i}] · ${originalTargetVal} displaced to slot [${minIndex}]`,
          swapDetail: {
            movedLeft: arr[i],
            movedRight: originalTargetVal
          },
          movement: {
            arrows: { [i]: '←' }
          }
        }
      })
    }

    // E. SORTED step (pass complete, lock slot i into sorted prefix)
    sortedIndices.push(i)
    sortedIndices.sort((a, b) => a - b)

    addStep(STEP_TYPES.SORTED, {
      indices: [i],
      selectedIndices: [],
      title: `${arr[i]} is now permanently sorted`,
      explanation: `${arr[i]} is now permanently sorted.`,
      metadata: {
        suggestedDuration: STEP_DURATIONS.SORTED,
        pass: passNumber,
        totalPasses: n - 1,
        passComplete: true,
        finalizedIndex: i,
        finalizedValue: arr[i],
        passHeaderLabel: `✓ Pass ${passNumber} Complete`,
        passHeadline: `${arr[i]} is now permanently sorted.`,
        passDescription: `The sorted region now contains ${sortedIndices.length} element${sortedIndices.length !== 1 ? 's' : ''}.`,
        nextPassMessage: `Pass ${passNumber + 1} will find the minimum for slot [${i + 1}].`
      }
    })
  }

  // 3. Final element automatically locks into place
  for (let k = 0; k < n; k += 1) {
    if (!sortedIndices.includes(k)) {
      sortedIndices.push(k)
    }
  }
  sortedIndices.sort((a, b) => a - b)

  // 4. Final COMPLETE step
  addStep(STEP_TYPES.COMPLETE, {
    indices: [],
    selectedIndices: [],
    title: 'Selection Sort Complete',
    explanation: 'Every element is in its final position.',
    metadata: {
      suggestedDuration: STEP_DURATIONS.COMPLETE,
      totalComparisons,
      totalSwaps,
      finalArray: [...arr],
      completeTitle: 'Selection Sort Complete',
      completeDescription: 'Every element is in its final position.'
    }
  })

  return steps
}

export default generateSelectionSortSteps

