import { STEP_TYPES, BOUNDARY_DIRECTIONS } from '../../components/visualizer/visualizationTypes.js'
import { createVisualizationStep } from '../../components/visualizer/visualizationUtils.js'

/**
 * Educational step durations (ms) for Insertion Sort.
 *
 * Configured so that learners have ample time to perceive:
 * - START: Initial setup
 * - SELECT_KEY: Picking up and elevating the key
 * - COMPARE: Comparing key with sorted elements
 * - SHIFT: Moment a larger sorted element shifts right into the gap
 * - GAP_FOUND: Moment the correct insertion slot is identified
 * - INSERT: Key dropping into the gap
 * - SORTED: Expansion of the sorted prefix
 * - COMPLETE: Full algorithm celebration
 */
const STEP_DURATIONS = {
  START:       1200,
  SELECT_KEY:  1200,
  COMPARE:     1300,
  SHIFT:       1400,
  GAP_FOUND:   1200,
  INSERT:      1600,
  SORTED:      1400,
  COMPLETE:    2000
}

/**
 * Pure, deterministic Insertion Sort visualization step generator.
 *
 * Teaches:
 * PICK KEY → COMPARE → SHIFT LARGER VALUES → CREATE GAP → INSERT KEY
 *
 * @param {number[]} input - Array of numbers to sort
 * @param {Object} [_options] - Additional generator options
 * @returns {Array} List of VisualizationStep objects
 */
export const generateInsertionSortSteps = (input = [], _options = {}) => {
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
        explanation: 'No elements provided to sort.',
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
        title: 'Insertion Sort Complete',
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
        sortedIndices: [0],
        title: 'Starting Insertion Sort',
        explanation: 'The single element is already considered sorted.',
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
        explanation: `${arr[0]} is already in place.`,
        metadata: {
          suggestedDuration: STEP_DURATIONS.SORTED,
          pass: 1,
          totalPasses: 1,
          finalizedIndex: 0,
          finalizedValue: arr[0],
          passComplete: true,
          boundaryDirection: BOUNDARY_DIRECTIONS.LEFT,
          boundaryLabel: 'sorted →',
          passHeadline: `${arr[0]} is already in place`,
          passDescription: 'Single element array is trivially sorted.'
        }
      }),
      createVisualizationStep({
        stepIndex: 2,
        type: STEP_TYPES.COMPLETE,
        arrayState: [...arr],
        indices: [],
        sortedIndices: [0],
        title: 'Insertion Sort Complete',
        explanation: 'Every element is in its final position.',
        metadata: {
          suggestedDuration: STEP_DURATIONS.COMPLETE,
          totalComparisons: 0,
          totalShifts: 0,
          totalInsertions: 0,
          finalArray: [...arr],
          completeTitle: 'Insertion Sort Complete',
          completeDescription: 'Every element is in its final position.',
          boundaryDirection: BOUNDARY_DIRECTIONS.LEFT
        }
      })
    ]
  }

  const steps = []
  const sortedIndices = [0] // Index 0 starts as the initial sorted prefix
  let totalComparisons = 0
  let totalShifts = 0
  let totalInsertions = 0

  const addStep = (type, {
    arrayState = arr,
    indices = [],
    selectedIndices = [],
    highlightedIndices = [],
    title,
    explanation,
    metadata = {}
  }) => {
    steps.push(
      createVisualizationStep({
        stepIndex: steps.length,
        type,
        arrayState: [...arrayState],
        indices,
        selectedIndices,
        highlightedIndices,
        sortedIndices: [...sortedIndices],
        title,
        explanation,
        metadata: {
          totalComparisons,
          totalShifts,
          totalInsertions,
          boundaryDirection: BOUNDARY_DIRECTIONS.LEFT,
          boundaryLabel: 'sorted →',
          suggestedDuration: STEP_DURATIONS[type] ?? STEP_DURATIONS.START,
          ...metadata
        }
      })
    )
  }

  // 1. Initial START step
  addStep(STEP_TYPES.START, {
    arrayState: [...arr],
    indices: [],
    title: 'Starting Insertion Sort',
    explanation: 'The first element is already sorted. We will pick unsorted keys one by one and insert them into their correct position.',
    metadata: {
      suggestedDuration: STEP_DURATIONS.START,
      pass: 0,
      totalElements: n,
      totalPasses: n - 1,
      startTitle: 'Insertion Sort',
      startExplanation: 'Pick key → Compare with sorted elements → Shift larger values right → Insert key into gap.'
    }
  })

  // 2. Outer insertion passes (i = 1 to n - 1)
  for (let i = 1; i < n; i += 1) {
    const passNumber = i
    const key = arr[i]
    let j = i - 1

    // A. SELECT KEY: Elevate and mark key at slot i
    addStep(STEP_TYPES.SELECT, {
      arrayState: [...arr],
      indices: [i],
      selectedIndices: [i],
      title: `Pass ${passNumber}: Pick Key ${key}`,
      explanation: `${key} is the current key. Compare it with the sorted region to find where it belongs.`,
      metadata: {
        suggestedDuration: STEP_DURATIONS.SELECT_KEY,
        pass: passNumber,
        totalPasses: n - 1,
        keyIndex: i,
        keyValue: key,
        elementBadges: {
          [i]: { text: 'KEY', cls: 'bg-violet-950/90 text-violet-200 border border-violet-400/60 font-black' }
        },
        actionLabel: `KEY: ${key}`
      }
    })

    // Working array state to track gaps and shifted elements during this pass
    let gapIndex = i
    const workingArray = [...arr]

    // B. Scan sorted elements from right to left
    while (j >= 0) {
      totalComparisons += 1
      const sortedVal = workingArray[j]
      const needsShift = sortedVal > key

      if (needsShift) {
        // B1. COMPARE: Key is smaller than sortedVal -> Shift required!
        addStep(STEP_TYPES.COMPARE, {
          arrayState: [...workingArray],
          indices: [j, gapIndex],
          selectedIndices: [gapIndex],
          title: `Compare Key ${key} with ${sortedVal}`,
          explanation: `${key} < ${sortedVal}, so ${sortedVal} must shift right.`,
          metadata: {
            suggestedDuration: STEP_DURATIONS.COMPARE,
            pass: passNumber,
            totalPasses: n - 1,
            leftValue: key,
            rightValue: sortedVal,
            operator: '<',
            leftLabel: 'Key',
            rightLabel: 'Sorted',
            compareLabel: 'Comparing Key with Sorted Element',
            willSwap: false,
            isShift: true,
            decisionBadge: `➔ SHIFT ${sortedVal} RIGHT`,
            decisionReason: `${sortedVal} is larger than ${key}. Shift ${sortedVal} right to create a gap.`
          }
        })

        // B2. SHIFT: sortedVal moves from slot j to j + 1, opening gap at slot j
        totalShifts += 1
        workingArray[j + 1] = sortedVal
        workingArray[j] = null // Gap created at slot j
        gapIndex = j

        addStep(STEP_TYPES.OVERWRITE, {
          arrayState: [...workingArray],
          indices: [j, j + 1],
          selectedIndices: [],
          title: `Shift ${sortedVal} Right`,
          explanation: `${sortedVal} is larger than ${key}. Shift ${sortedVal} one position right to create a gap.`,
          metadata: {
            suggestedDuration: STEP_DURATIONS.SHIFT,
            pass: passNumber,
            totalPasses: n - 1,
            isShift: true,
            shiftedValue: sortedVal,
            fromIndex: j,
            toIndex: j + 1,
            gapIndex: j,
            keyValue: key,
            swapLabel: 'Shifting Element',
            swapExplanation: `${sortedVal} shifts right into slot [${j + 1}] · Gap created at [${j}]`,
            movementText: `${sortedVal} shifts right to slot [${j + 1}] · Gap opens at [${j}]`,
            swapDetail: {
              movedRight: sortedVal,
              movedLeft: 'GAP'
            },
            movement: {
              arrows: { [j + 1]: '→' }
            }
          }
        })

        j -= 1
      } else {
        // B3. COMPARE: Key >= sortedVal -> Gap found, stop scanning!
        addStep(STEP_TYPES.COMPARE, {
          arrayState: [...workingArray],
          indices: [j, gapIndex],
          selectedIndices: [gapIndex],
          title: `Compare Key ${key} with ${sortedVal}`,
          explanation: `${key} ≥ ${sortedVal}. Gap found. Insert ${key} here.`,
          metadata: {
            suggestedDuration: STEP_DURATIONS.GAP_FOUND,
            pass: passNumber,
            totalPasses: n - 1,
            leftValue: sortedVal,
            rightValue: key,
            operator: sortedVal === key ? '=' : '<',
            leftLabel: 'Sorted',
            rightLabel: 'Key',
            compareLabel: 'Comparing Key with Sorted Element',
            willSwap: false,
            isShift: false,
            decisionBadge: '✓ GAP FOUND',
            decisionReason: `${key} is greater than or equal to ${sortedVal}. Insert ${key} here.`
          }
        })
        break
      }
    }

    // C. INSERT KEY INTO GAP
    totalInsertions += 1
    workingArray[gapIndex] = key
    for (let k = 0; k < n; k += 1) {
      if (workingArray[k] !== null) {
        arr[k] = workingArray[k]
      }
    }

    addStep(STEP_TYPES.OVERWRITE, {
      arrayState: [...arr],
      indices: [gapIndex],
      selectedIndices: [gapIndex],
      title: `Insert ${key} into the gap`,
      explanation: `Gap found. Insert ${key} here.`,
      metadata: {
        suggestedDuration: STEP_DURATIONS.INSERT,
        pass: passNumber,
        totalPasses: n - 1,
        isInsert: true,
        insertedValue: key,
        insertedIndex: gapIndex,
        actionLabel: '✓ Key Inserted',
        elementBadges: {
          [gapIndex]: { text: 'INSERT', cls: 'bg-emerald-950/90 text-emerald-200 border border-emerald-400/60 font-black' }
        },
        swapLabel: 'Inserting Key',
        swapExplanation: `Key ${key} dropped into slot [${gapIndex}].`,
        movementText: `Key ${key} placed into slot [${gapIndex}]`
      }
    })

    // D. SORTED: Pass complete, expand sorted prefix boundary
    if (!sortedIndices.includes(i)) {
      sortedIndices.push(i)
    }
    sortedIndices.sort((a, b) => a - b)

    addStep(STEP_TYPES.SORTED, {
      arrayState: [...arr],
      indices: [gapIndex],
      selectedIndices: [],
      title: `${key} is now permanently sorted`,
      explanation: `${key} is now in the correct position. The sorted region has grown.`,
      metadata: {
        suggestedDuration: STEP_DURATIONS.SORTED,
        pass: passNumber,
        totalPasses: n - 1,
        passComplete: true,
        finalizedIndex: gapIndex,
        finalizedValue: key,
        passHeaderLabel: `✓ Pass ${passNumber} Complete`,
        passHeadline: `${key} is now in the sorted region.`,
        passDescription: `The sorted region on the left now contains ${sortedIndices.length} element${sortedIndices.length !== 1 ? 's' : ''}.`,
        nextPassMessage: i + 1 < n ? `Pass ${passNumber + 1} will insert key ${arr[i + 1]}.` : 'All elements sorted!'
      }
    })
  }

  // 3. Final COMPLETE step
  addStep(STEP_TYPES.COMPLETE, {
    arrayState: [...arr],
    indices: [],
    selectedIndices: [],
    title: 'Insertion Sort Complete',
    explanation: 'Every element is in its final position.',
    metadata: {
      suggestedDuration: STEP_DURATIONS.COMPLETE,
      totalComparisons,
      totalShifts,
      totalInsertions,
      finalArray: [...arr],
      completeTitle: 'Insertion Sort Complete',
      completeDescription: 'Every element is in its final position.'
    }
  })

  return steps
}

export default generateInsertionSortSteps
