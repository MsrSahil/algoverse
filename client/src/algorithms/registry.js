import { STEP_TYPES } from '../components/visualizer/visualizationTypes.js'
import { createVisualizationStep } from '../components/visualizer/visualizationUtils.js'
import { generateBubbleSortSteps } from './sorting/bubbleSort.js'
import { generateSelectionSortSteps } from './sorting/selectionSort.js'

/**
 * Central registry mapping algorithm slugs to pure step generator functions.
 * Every algorithm visualizer registers its generator function here.
 */
export const algorithmGenerators = {
  'bubble-sort': generateBubbleSortSteps,
  'selection-sort': generateSelectionSortSteps
  // Future algorithms will be added here:
  // 'insertion-sort': generateInsertionSortSteps,
  // 'merge-sort': generateMergeSortSteps,
  // 'quick-sort': generateQuickSortSteps,
  // 'linear-search': generateLinearSearchSteps,
  // 'binary-search': generateBinarySearchSteps,
  // etc.
}


/**
 * Retrieves the step generator for a given algorithm slug.
 *
 * @param {string} slug
 * @returns {Function|null} Step generator function or null if not registered yet
 */
export const getAlgorithmGenerator = (slug) => {
  if (!slug || typeof slug !== 'string') return null
  return algorithmGenerators[slug] || null
}

/**
 * Checks whether an algorithm generator is registered for the slug.
 *
 * @param {string} slug
 * @returns {boolean}
 */
export const hasAlgorithmGenerator = (slug) => {
  return Boolean(getAlgorithmGenerator(slug))
}

/**
 * Creates an isolated demo step sequence for testing the generic visualization engine.
 *
 * @param {number[]} initialArray
 * @returns {Array} List of VisualizationStep objects
 */
export const createDemoSteps = (initialArray = [50, 30, 80, 10, 60]) => {
  const arr = Array.isArray(initialArray) && initialArray.length > 0 ? [...initialArray] : [50, 30, 80, 10, 60]

  const steps = [
    createVisualizationStep({
      stepIndex: 0,
      type: STEP_TYPES.START,
      arrayState: [...arr],
      indices: [],
      title: 'Initial Array State',
      explanation: 'Array is loaded and ready for visualization.'
    })
  ]

  if (arr.length >= 2) {
    steps.push(
      createVisualizationStep({
        stepIndex: 1,
        type: STEP_TYPES.COMPARE,
        arrayState: [...arr],
        indices: [0, 1],
        title: `Comparing elements at index 0 (${arr[0]}) and index 1 (${arr[1]})`,
        explanation: `Checking condition between ${arr[0]} and ${arr[1]}.`
      })
    )

    const copy = [...arr]
    const swapped = copy[0] > copy[1]
    if (swapped) {
      const temp = copy[0]
      copy[0] = copy[1]
      copy[1] = temp
    }

    steps.push(
      createVisualizationStep({
        stepIndex: 2,
        type: swapped ? STEP_TYPES.SWAP : STEP_TYPES.HIGHLIGHT,
        arrayState: [...copy],
        indices: [0, 1],
        title: swapped ? `Swapped index 0 and index 1` : `Elements in correct relative order`,
        explanation: swapped
          ? `Swapped ${copy[1]} with ${copy[0]} because ${copy[1]} was greater.`
          : `No swap needed for indices 0 and 1.`
      })
    )

    const lastIdx = copy.length - 1
    steps.push(
      createVisualizationStep({
        stepIndex: 3,
        type: STEP_TYPES.SORTED,
        arrayState: [...copy],
        indices: [lastIdx],
        sortedIndices: [lastIdx],
        title: `Element at index ${lastIdx} placed`,
        explanation: `The element ${copy[lastIdx]} is in its finalized position.`
      })
    )

    steps.push(
      createVisualizationStep({
        stepIndex: 4,
        type: STEP_TYPES.COMPLETE,
        arrayState: [...copy],
        indices: [],
        sortedIndices: Array.from({ length: copy.length }, (_, i) => i),
        title: 'Demo Walkthrough Completed',
        explanation: 'The generic visualization engine demo sequence has completed.'
      })
    )
  }

  return steps
}
