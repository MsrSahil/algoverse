import { STEP_TYPES } from './visualizationTypes.js'

/**
 * Creates a normalized visualization step object.
 *
 * @param {Object} options
 * @param {number} options.stepIndex - 0-based index of the step
 * @param {string} options.type - One of STEP_TYPES
 * @param {Array} [options.arrayState] - Array snapshot for array-based visualizers
 * @param {number[]} [options.indices] - Primary indices involved (e.g., [i, j])
 * @param {number[]} [options.sortedIndices] - Indices known to be permanently sorted/placed
 * @param {number[]} [options.highlightedIndices] - Secondary or focus indices (e.g., pivot)
 * @param {string[]} [options.nodeIds] - Node identifiers for tree/graph visualizers
 * @param {string[]} [options.edgeIds] - Edge identifiers for graph visualizers
 * @param {string} [options.title] - Short title for the step
 * @param {string} [options.explanation] - Detailed explanation of what happened
 * @param {Object} [options.metadata] - Extra metadata (comparison count, swap count, etc.)
 * @returns {Object} Normalized step object
 */
export const createVisualizationStep = ({
  stepIndex = 0,
  type = STEP_TYPES.START,
  arrayState = [],
  indices = [],
  sortedIndices = [],
  highlightedIndices = [],
  selectedIndices = [],
  nodeIds = [],
  edgeIds = [],
  title = '',
  explanation = '',
  metadata = {}
} = {}) => {
  return {
    stepIndex,
    type,
    arrayState: Array.isArray(arrayState) ? [...arrayState] : [],
    indices: Array.isArray(indices) ? [...indices] : [],
    sortedIndices: Array.isArray(sortedIndices) ? [...sortedIndices] : [],
    highlightedIndices: Array.isArray(highlightedIndices) ? [...highlightedIndices] : [],
    selectedIndices: Array.isArray(selectedIndices) ? [...selectedIndices] : [],
    nodeIds: Array.isArray(nodeIds) ? [...nodeIds] : [],
    edgeIds: Array.isArray(edgeIds) ? [...edgeIds] : [],
    title: title || getStepDefaultTitle(type, indices),
    explanation: explanation || 'Executing step.',
    metadata: { ...metadata }
  }
}

/**
 * Returns a fallback default title if not explicitly provided.
 */
const getStepDefaultTitle = (type, indices = []) => {
  switch (type) {
    case STEP_TYPES.START:
      return 'Initial State'
    case STEP_TYPES.COMPARE:
      return indices.length >= 2 ? `Comparing elements at [${indices.join(', ')}]` : 'Comparing elements'
    case STEP_TYPES.SWAP:
      return indices.length >= 2 ? `Swapping elements at [${indices.join(', ')}]` : 'Swapping elements'
    case STEP_TYPES.OVERWRITE:
      return indices.length > 0 ? `Overwriting element at index ${indices[0]}` : 'Updating element'
    case STEP_TYPES.SELECT:
      return indices.length > 0 ? `Selecting element at index ${indices[0]}` : 'Selecting candidate element'
    case STEP_TYPES.SORTED:
      return indices.length > 0 ? `Element at index ${indices[0]} sorted` : 'Element placed in sorted position'
    case STEP_TYPES.HIGHLIGHT:
      return 'Inspecting element'
    case STEP_TYPES.CHECK:
      return 'Checking element condition'
    case STEP_TYPES.FOUND:
      return 'Target element found'
    case STEP_TYPES.NOT_FOUND:
      return 'Target element not found'
    case STEP_TYPES.VISIT:
      return 'Visiting node'
    case STEP_TYPES.PARTITION:
      return 'Partitioning subarray'
    case STEP_TYPES.MERGE:
      return 'Merging subarrays'
    case STEP_TYPES.COMPLETE:
      return 'Algorithm Completed'
    default:
      return 'Algorithm Step'
  }
}


/**
 * Parses and validates user array input.
 * Supports comma, space, or semicolon separated numbers.
 *
 * @param {string} inputString
 * @param {Object} [options]
 * @param {number} [options.minLength=2]
 * @param {number} [options.maxLength=15]
 * @param {number} [options.minValue=-999]
 * @param {number} [options.maxValue=999]
 * @returns {{ success: boolean, data: number[], error: string | null }}
 */
export const parseArrayInput = (
  inputString = '',
  { minLength = 2, maxLength = 15, minValue = -999, maxValue = 999 } = {}
) => {
  if (!inputString || typeof inputString !== 'string' || !inputString.trim()) {
    return {
      success: false,
      data: [],
      error: 'Please enter a non-empty sequence of numbers.'
    }
  }

  const tokens = inputString
    .replace(/[,;]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (tokens.length < minLength) {
    return {
      success: false,
      data: [],
      error: `Please enter at least ${minLength} numbers.`
    }
  }

  if (tokens.length > maxLength) {
    return {
      success: false,
      data: [],
      error: `Please enter at most ${maxLength} numbers for optimal visualization.`
    }
  }

  const parsedNumbers = []

  for (const token of tokens) {
    const num = Number(token)
    if (Number.isNaN(num)) {
      return {
        success: false,
        data: [],
        error: `"${token}" is not a valid number.`
      }
    }

    if (!Number.isInteger(num)) {
      return {
        success: false,
        data: [],
        error: `All numbers must be integers. Received "${token}".`
      }
    }

    if (num < minValue || num > maxValue) {
      return {
        success: false,
        data: [],
        error: `Values must be between ${minValue} and ${maxValue}. Received ${num}.`
      }
    }

    parsedNumbers.push(num)
  }

  return {
    success: true,
    data: parsedNumbers,
    error: null
  }
}

/**
 * Generates a random array of integers within a given range.
 */
export const generateRandomArray = (length = 6, min = 10, max = 99) => {
  const result = []
  for (let i = 0; i < length; i += 1) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min
    result.push(val)
  }
  return result
}

/**
 * Returns visual color tokens and badge metadata for a given step type.
 */
export const getStepTypeBadgeConfig = (type) => {
  switch (type) {
    case STEP_TYPES.COMPARE:
    case STEP_TYPES.CHECK:
      return {
        label: 'Compare',
        bgColor: 'bg-amber-500/15',
        borderColor: 'border-amber-400/40',
        textColor: 'text-amber-300',
        dotColor: 'bg-amber-400'
      }
    case STEP_TYPES.SWAP:
    case STEP_TYPES.OVERWRITE:
      return {
        label: 'Swap / Move',
        bgColor: 'bg-rose-500/15',
        borderColor: 'border-rose-400/40',
        textColor: 'text-rose-300',
        dotColor: 'bg-rose-400'
      }
    case STEP_TYPES.SORTED:
    case STEP_TYPES.FOUND:
    case STEP_TYPES.COMPLETE:
      return {
        label: type === STEP_TYPES.COMPLETE ? 'Completed' : 'Sorted / Placed',
        bgColor: 'bg-emerald-500/15',
        borderColor: 'border-emerald-400/40',
        textColor: 'text-emerald-300',
        dotColor: 'bg-emerald-400'
      }
    case STEP_TYPES.HIGHLIGHT:
    case STEP_TYPES.PARTITION:
    case STEP_TYPES.MERGE:
      return {
        label: 'Focus / Partition',
        bgColor: 'bg-violet-500/15',
        borderColor: 'border-violet-400/40',
        textColor: 'text-violet-300',
        dotColor: 'bg-violet-400'
      }
    case STEP_TYPES.SELECT:
      return {
        label: 'Selected',
        bgColor: 'bg-cyan-500/15',
        borderColor: 'border-cyan-400/40',
        textColor: 'text-cyan-300',
        dotColor: 'bg-cyan-400'
      }
    case STEP_TYPES.VISIT:
    case STEP_TYPES.QUEUE:
    case STEP_TYPES.DEQUEUE:
    case STEP_TYPES.PUSH:
    case STEP_TYPES.POP:
      return {
        label: 'Operation',
        bgColor: 'bg-cyan-500/15',
        borderColor: 'border-cyan-400/40',
        textColor: 'text-cyan-300',
        dotColor: 'bg-cyan-400'
      }

    case STEP_TYPES.NOT_FOUND:
      return {
        label: 'Not Found',
        bgColor: 'bg-red-500/15',
        borderColor: 'border-red-400/40',
        textColor: 'text-red-300',
        dotColor: 'bg-red-400'
      }
    case STEP_TYPES.START:
    default:
      return {
        label: 'Initial',
        bgColor: 'bg-slate-800/80',
        borderColor: 'border-slate-700',
        textColor: 'text-slate-300',
        dotColor: 'bg-cyan-400'
      }
  }
}
