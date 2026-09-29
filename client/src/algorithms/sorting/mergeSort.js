import { STEP_TYPES, BOUNDARY_DIRECTIONS } from '../../components/visualizer/visualizationTypes.js'
import { createVisualizationStep } from '../../components/visualizer/visualizationUtils.js'

/**
 * Educational step durations (ms) for Merge Sort.
 */
const STEP_DURATIONS = {
  START:          1200,
  SPLIT:          1500,
  SINGLE:         1200,
  MERGE_START:    1300,
  COMPARE:        1300,
  TAKE_ELEMENT:   1300,
  EXHAUSTED:      1200,
  MERGE_COMPLETE: 1600,
  COMPLETE:       2200
}

/**
 * Helper to compute recursive split hierarchy levels
 */
const buildSplitHierarchy = (arr) => {
  const n = arr.length
  if (n <= 1) {
    return [[{ id: 'g-0-0', range: [0, n - 1], values: [...arr] }]]
  }

  const levels = []
  let currentLevel = [{ id: 'g-0-0', range: [0, n - 1], values: [...arr] }]
  levels.push(currentLevel)

  while (true) {
    const nextLevel = []
    let hasSplits = false

    currentLevel.forEach((grp, grpIdx) => {
      const [start, end] = grp.range
      if (start < end) {
        hasSplits = true
        const mid = Math.floor((start + end) / 2)
        nextLevel.push({
          id: `g-${levels.length}-${grpIdx * 2}`,
          range: [start, mid],
          values: arr.slice(start, mid + 1),
          parentId: grp.id
        })
        nextLevel.push({
          id: `g-${levels.length}-${grpIdx * 2 + 1}`,
          range: [mid + 1, end],
          values: arr.slice(mid + 1, end + 1),
          parentId: grp.id
        })
      } else {
        nextLevel.push({
          id: `g-${levels.length}-${nextLevel.length}`,
          range: [start, end],
          values: [arr[start]],
          parentId: grp.id
        })
      }
    })

    if (!hasSplits) break
    levels.push(nextLevel)
    currentLevel = nextLevel
  }

  return levels
}

/**
 * Pure, deterministic Merge Sort visualization step generator.
 *
 * Full-array global context preserved at every step.
 *
 * @param {number[]} input - Array of numbers to sort
 * @param {Object} [_options] - Additional generator options
 * @returns {Array} List of VisualizationStep objects
 */
export const generateMergeSortSteps = (input = [], _options = {}) => {
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
          isMergeSort: true,
          phase: 'start',
          allGroups: [],
          treeLevels: [],
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
        title: 'Merge Sort Complete',
        explanation: 'The empty array is trivially sorted.',
        metadata: {
          isMergeSort: true,
          phase: 'complete',
          allGroups: [],
          treeLevels: [],
          suggestedDuration: STEP_DURATIONS.COMPLETE,
          boundaryDirection: BOUNDARY_DIRECTIONS.NONE
        }
      })
    ]
  }

  const arr = [...input]
  const n = arr.length

  // Edge Case: Single element array
  if (n === 1) {
    const singleGroup = [{ id: 'g-0', range: [0, 0], values: [arr[0]], status: 'sorted' }]
    return [
      createVisualizationStep({
        stepIndex: 0,
        type: STEP_TYPES.START,
        arrayState: [...arr],
        indices: [],
        sortedIndices: [0],
        title: 'Starting Merge Sort',
        explanation: 'The single element is already considered sorted.',
        metadata: {
          isMergeSort: true,
          phase: 'start',
          allGroups: singleGroup,
          treeLevels: [singleGroup],
          suggestedDuration: STEP_DURATIONS.START
        }
      }),
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.HIGHLIGHT,
        arrayState: [...arr],
        indices: [0],
        sortedIndices: [0],
        title: `Single Element [${arr[0]}]`,
        explanation: 'A group with 1 element is already sorted.',
        metadata: {
          isMergeSort: true,
          phase: 'single',
          allGroups: singleGroup,
          treeLevels: [singleGroup],
          singleValue: arr[0],
          actionLabel: '✓ SINGLE ELEMENT',
          suggestedDuration: STEP_DURATIONS.SINGLE
        }
      }),
      createVisualizationStep({
        stepIndex: 2,
        type: STEP_TYPES.COMPLETE,
        arrayState: [...arr],
        indices: [],
        sortedIndices: [0],
        title: 'Merge Sort Complete',
        explanation: 'Every group has been merged. The array is sorted.',
        metadata: {
          isMergeSort: true,
          phase: 'complete',
          allGroups: singleGroup,
          treeLevels: [singleGroup],
          totalComparisons: 0,
          finalArray: [...arr],
          completeTitle: 'Merge Sort Complete',
          completeDescription: 'Every group has been merged. The array is sorted.',
          suggestedDuration: STEP_DURATIONS.COMPLETE
        }
      })
    ]
  }

  const steps = []
  let totalComparisons = 0
  let splitCount = 0
  let mergeCount = 0

  const treeLevels = buildSplitHierarchy(arr)

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
        sortedIndices: [],
        title,
        explanation,
        metadata: {
          isMergeSort: true,
          treeLevels,
          totalComparisons,
          splitCount,
          mergeCount,
          suggestedDuration: STEP_DURATIONS[type] ?? STEP_DURATIONS.START,
          ...metadata
        }
      })
    )
  }

  // 1. Initial START step: Full Array
  const rootGroups = [{ id: 'root', range: [0, n - 1], values: [...arr], status: 'active' }]
  addStep(STEP_TYPES.START, {
    arrayState: [...arr],
    indices: [],
    title: 'Starting Merge Sort',
    explanation: 'The full array starts as one complete group. We will recursively divide it into smaller groups.',
    metadata: {
      phase: 'start',
      activeLevel: 0,
      allGroups: rootGroups,
      rootGroup: { id: 'root', values: [...arr], label: 'Initial Array' },
      actionLabel: 'FULL ARRAY',
      startTitle: 'Merge Sort',
      startExplanation: 'Split array into smaller groups until single elements remain. Then merge sorted groups back together.'
    }
  })

  // 2. Progressive Split Hierarchy Steps (Level by Level)
  for (let lvl = 1; lvl < treeLevels.length; lvl += 1) {
    splitCount += 1
    const currentGroups = treeLevels[lvl].map((g) => ({ ...g, status: 'split' }))
    const isSingleLevel = lvl === treeLevels.length - 1

    addStep(STEP_TYPES.PARTITION, {
      arrayState: [...arr],
      indices: [0, n - 1],
      title: isSingleLevel
        ? `Base Case: Split into ${n} Single Elements`
        : `Split Level ${lvl}: Divide into ${currentGroups.length} Subarrays`,
      explanation: isSingleLevel
        ? 'Every group now contains 1 element. Single elements are already sorted.'
        : `Divide each subarray of size > 1 into smaller halves.`,
      metadata: {
        phase: isSingleLevel ? 'single' : 'split',
        activeLevel: lvl,
        allGroups: currentGroups,
        splitLevel: lvl,
        actionLabel: isSingleLevel ? '✓ SINGLE ELEMENTS' : `SPLIT (LEVEL ${lvl})`,
        suggestedDuration: isSingleLevel ? STEP_DURATIONS.SINGLE : STEP_DURATIONS.SPLIT
      }
    })
  }

  // 3. Bottom-Up Merge Phase
  // We maintain the active partition of the array across all indices [0...n-1]
  let currentPartition = treeLevels[treeLevels.length - 1].map((g, idx) => ({
    id: `p-base-${idx}`,
    range: [...g.range],
    values: [...g.values],
    status: 'idle'
  }))

  /**
   * Helper to execute merge between two subarray ranges [start..mid] and [mid+1..end]
   */
  const mergeSubarrays = (start, mid, end, depth = 0) => {
    mergeCount += 1
    const leftSlice = arr.slice(start, mid + 1)
    const rightSlice = arr.slice(mid + 1, end + 1)
    const mergedResult = []
    let i = 0
    let j = 0

    // Find the matching groups in currentPartition to highlight them as active-left and active-right
    const getPartitionWithActive = (statusOverrides = {}) => {
      return currentPartition.map((grp) => {
        const [gStart, gEnd] = grp.range
        if (gStart === start && gEnd === mid) {
          return { ...grp, status: 'active-left', ...statusOverrides.left }
        }
        if (gStart === mid + 1 && gEnd === end) {
          return { ...grp, status: 'active-right', ...statusOverrides.right }
        }
        return { ...grp, status: 'inactive' }
      })
    }


    // A. MERGE START Step
    addStep(STEP_TYPES.MERGE, {
      arrayState: [...arr],
      indices: [start, end],
      title: `Merge [${leftSlice.join(', ')}] and [${rightSlice.join(', ')}]`,
      explanation: 'Compare the front elements of both sorted groups and place the smaller one into the merged group.',
      metadata: {
        phase: 'merge',
        mergePhase: 'start',
        depth,
        allGroups: getPartitionWithActive(),
        leftGroup: { values: [...leftSlice], pointer: 0, label: 'Left Group', range: [start, mid] },
        rightGroup: { values: [...rightSlice], pointer: 0, label: 'Right Group', range: [mid + 1, end] },
        outputGroup: { values: [], targetLength: leftSlice.length + rightSlice.length, label: 'Merged Output' },
        actionLabel: 'ACTIVE MERGE',
        suggestedDuration: STEP_DURATIONS.MERGE_START
      }
    })

    // B. Compare and Take Loop
    while (i < leftSlice.length && j < rightSlice.length) {
      totalComparisons += 1
      const leftVal = leftSlice[i]
      const rightVal = rightSlice[j]
      const isLeftSmaller = leftVal <= rightVal
      const chosenVal = isLeftSmaller ? leftVal : rightVal
      const chosenSide = isLeftSmaller ? 'left' : 'right'

      // COMPARE Step
      addStep(STEP_TYPES.COMPARE, {
        arrayState: [...arr],
        indices: [start + i, mid + 1 + j],
        title: `Compare ${leftVal} vs ${rightVal}`,
        explanation: isLeftSmaller
          ? `${leftVal} ≤ ${rightVal}. Take ${leftVal} from the left group.`
          : `${rightVal} < ${leftVal}. Take ${rightVal} from the right group.`,
        metadata: {
          phase: 'merge',
          mergePhase: 'compare',
          depth,
          allGroups: getPartitionWithActive(),
          leftGroup: { values: [...leftSlice], pointer: i, activeIndex: i, label: 'Left Group', range: [start, mid] },
          rightGroup: { values: [...rightSlice], pointer: j, activeIndex: j, label: 'Right Group', range: [mid + 1, end] },
          outputGroup: { values: [...mergedResult], targetLength: leftSlice.length + rightSlice.length, label: 'Merged Output' },
          leftValue: leftVal,
          rightValue: rightVal,
          operator: isLeftSmaller ? '≤' : '>',
          leftLabel: 'Left Group',
          rightLabel: 'Right Group',
          compareLabel: 'Comparing Front Elements',
          decisionBadge: isLeftSmaller ? `➔ TAKE LEFT: ${leftVal}` : `➔ TAKE RIGHT: ${rightVal}`,
          decisionReason: isLeftSmaller
            ? `${leftVal} is smaller or equal. Place into merged group.`
            : `${rightVal} is smaller. Place into merged group.`,
          suggestedDuration: STEP_DURATIONS.COMPARE
        }
      })

      // TAKE ELEMENT Step
      mergedResult.push(chosenVal)
      if (isLeftSmaller) {
        i += 1
      } else {
        j += 1
      }

      addStep(STEP_TYPES.OVERWRITE, {
        arrayState: [...arr],
        indices: [start + mergedResult.length - 1],
        title: `Place ${chosenVal} into Merged Group`,
        explanation: `${chosenVal} is smaller, so place it into the output.`,
        metadata: {
          phase: 'merge',
          mergePhase: 'take',
          depth,
          allGroups: getPartitionWithActive(),
          takenValue: chosenVal,
          takenFrom: chosenSide,
          leftGroup: { values: [...leftSlice], pointer: i, label: 'Left Group', range: [start, mid] },
          rightGroup: { values: [...rightSlice], pointer: j, label: 'Right Group', range: [mid + 1, end] },
          outputGroup: { values: [...mergedResult], targetLength: leftSlice.length + rightSlice.length, label: 'Merged Output' },
          actionLabel: `${chosenVal} ➔ OUTPUT`,
          swapLabel: 'Output Placed',
          swapExplanation: `${chosenVal} placed into position [${mergedResult.length - 1}].`,
          movementText: `${chosenVal} moved into merged output`,
          suggestedDuration: STEP_DURATIONS.TAKE_ELEMENT
        }
      })
    }

    // C. Group Exhaustion and Remaining Copies
    if (i < leftSlice.length) {
      const remaining = leftSlice.slice(i)
      addStep(STEP_TYPES.HIGHLIGHT, {
        arrayState: [...arr],
        indices: [mid + 1 + j],
        title: 'Right Group Empty',
        explanation: `Right group is empty. Move remaining element${remaining.length > 1 ? 's' : ''} [${remaining.join(', ')}] into output.`,
        metadata: {
          phase: 'merge',
          mergePhase: 'exhausted',
          depth,
          exhaustedSide: 'right',
          allGroups: getPartitionWithActive(),
          remainingValues: [...remaining],
          leftGroup: { values: [...leftSlice], pointer: i, label: 'Left Group', range: [start, mid] },
          rightGroup: { values: [...rightSlice], pointer: j, isExhausted: true, label: 'Right Group', range: [mid + 1, end] },
          outputGroup: { values: [...mergedResult], targetLength: leftSlice.length + rightSlice.length, label: 'Merged Output' },
          actionLabel: 'COPY REMAINING',
          suggestedDuration: STEP_DURATIONS.EXHAUSTED
        }
      })

      while (i < leftSlice.length) {
        const val = leftSlice[i]
        mergedResult.push(val)
        i += 1
        addStep(STEP_TYPES.OVERWRITE, {
          arrayState: [...arr],
          indices: [start + mergedResult.length - 1],
          title: `Copy ${val} into Merged Group`,
          explanation: `${val} copied directly into output.`,
          metadata: {
            phase: 'merge',
            mergePhase: 'take',
            depth,
            allGroups: getPartitionWithActive(),
            takenValue: val,
            takenFrom: 'left',
            leftGroup: { values: [...leftSlice], pointer: i, label: 'Left Group', range: [start, mid] },
            rightGroup: { values: [...rightSlice], pointer: j, isExhausted: true, label: 'Right Group', range: [mid + 1, end] },
            outputGroup: { values: [...mergedResult], targetLength: leftSlice.length + rightSlice.length, label: 'Merged Output' },
            actionLabel: `${val} ➔ OUTPUT`,
            suggestedDuration: STEP_DURATIONS.TAKE_ELEMENT
          }
        })
      }
    } else if (j < rightSlice.length) {
      const remaining = rightSlice.slice(j)
      addStep(STEP_TYPES.HIGHLIGHT, {
        arrayState: [...arr],
        indices: [start + i],
        title: 'Left Group Empty',
        explanation: `Left group is empty. Move remaining element${remaining.length > 1 ? 's' : ''} [${remaining.join(', ')}] into output.`,
        metadata: {
          phase: 'merge',
          mergePhase: 'exhausted',
          depth,
          exhaustedSide: 'left',
          allGroups: getPartitionWithActive(),
          remainingValues: [...remaining],
          leftGroup: { values: [...leftSlice], pointer: i, isExhausted: true, label: 'Left Group', range: [start, mid] },
          rightGroup: { values: [...rightSlice], pointer: j, label: 'Right Group', range: [mid + 1, end] },
          outputGroup: { values: [...mergedResult], targetLength: leftSlice.length + rightSlice.length, label: 'Merged Output' },
          actionLabel: 'COPY REMAINING',
          suggestedDuration: STEP_DURATIONS.EXHAUSTED
        }
      })

      while (j < rightSlice.length) {
        const val = rightSlice[j]
        mergedResult.push(val)
        j += 1
        addStep(STEP_TYPES.OVERWRITE, {
          arrayState: [...arr],
          indices: [start + mergedResult.length - 1],
          title: `Copy ${val} into Merged Group`,
          explanation: `${val} copied directly into output.`,
          metadata: {
            phase: 'merge',
            mergePhase: 'take',
            depth,
            allGroups: getPartitionWithActive(),
            takenValue: val,
            takenFrom: 'right',
            leftGroup: { values: [...leftSlice], pointer: i, isExhausted: true, label: 'Left Group', range: [start, mid] },
            rightGroup: { values: [...rightSlice], pointer: j, label: 'Right Group', range: [mid + 1, end] },
            outputGroup: { values: [...mergedResult], targetLength: leftSlice.length + rightSlice.length, label: 'Merged Output' },
            actionLabel: `${val} ➔ OUTPUT`,
            suggestedDuration: STEP_DURATIONS.TAKE_ELEMENT
          }
        })
      }
    }

    // Write merged result back into array arr
    for (let k = 0; k < mergedResult.length; k += 1) {
      arr[start + k] = mergedResult[k]
    }

    // Update currentPartition: replace left and right groups with new merged group
    const newPartition = []
    currentPartition.forEach((grp) => {
      const [gStart, gEnd] = grp.range
      if (gStart === start && gEnd === mid) {
        // First half -> insert merged group
        newPartition.push({
          id: `p-merged-${start}-${end}`,
          range: [start, end],
          values: [...mergedResult],
          status: 'merged'
        })
      } else if (gStart === mid + 1 && gEnd === end) {
        // Second half -> skip since merged group already inserted
      } else {
        newPartition.push({ ...grp, status: 'idle' })
      }
    })
    currentPartition = newPartition


    // D. MERGE COMPLETE Step
    addStep(STEP_TYPES.SORTED, {
      arrayState: [...arr],
      indices: Array.from({ length: mergedResult.length }, (_, k) => start + k),
      title: `Merged [${mergedResult.join(', ')}] Complete`,
      explanation: 'Both groups are now combined into one sorted group.',
      metadata: {
        phase: 'merge',
        mergePhase: 'complete',
        depth,
        allGroups: [...currentPartition],
        mergedGroup: { values: [...mergedResult], range: [start, end] },
        passHeaderLabel: '✓ MERGE COMPLETE',
        passHeadline: `[${mergedResult.join(', ')}] is now sorted.`,
        passDescription: 'Both groups are combined into one sorted group.',
        actionLabel: '✓ MERGE COMPLETE',
        suggestedDuration: STEP_DURATIONS.MERGE_COMPLETE
      }
    })

    return mergedResult
  }

  /**
   * Recursive divide and conquer caller that drives the merge order
   */
  const recursiveSort = (start, end, depth = 0) => {
    if (start >= end) return [arr[start]]
    const mid = Math.floor((start + end) / 2)
    recursiveSort(start, mid, depth + 1)
    recursiveSort(mid + 1, end, depth + 1)
    return mergeSubarrays(start, mid, end, depth)
  }

  recursiveSort(0, n - 1, 0)

  // 4. Final COMPLETE Step
  const finalGroup = [{ id: 'final', range: [0, n - 1], values: [...arr], status: 'complete' }]
  addStep(STEP_TYPES.COMPLETE, {
    arrayState: [...arr],
    indices: [],
    title: 'Merge Sort Complete',
    explanation: 'Every group has been merged. The entire array is sorted.',
    metadata: {
      phase: 'complete',
      allGroups: finalGroup,
      totalComparisons,
      splitCount,
      mergeCount,
      finalArray: [...arr],
      completeTitle: 'Merge Sort Complete',
      completeDescription: 'Every group has been merged. The entire array is sorted.',
      actionLabel: '✓ SORTED',
      suggestedDuration: STEP_DURATIONS.COMPLETE
    }
  })

  return steps
}

export default generateMergeSortSteps
