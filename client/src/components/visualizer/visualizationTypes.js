/**
 * Visualization Step Types and Playback Constants
 *
 * Defines the contract of actions that algorithm step generators produce
 * and generic visualizer renderers consume.
 */

export const STEP_TYPES = {
  START: 'START',
  COMPARE: 'COMPARE',
  SWAP: 'SWAP',
  OVERWRITE: 'OVERWRITE',
  HIGHLIGHT: 'HIGHLIGHT',
  SELECT: 'SELECT',
  SORTED: 'SORTED',
  CHECK: 'CHECK',
  FOUND: 'FOUND',
  NOT_FOUND: 'NOT_FOUND',
  VISIT: 'VISIT',
  QUEUE: 'QUEUE',
  DEQUEUE: 'DEQUEUE',
  PUSH: 'PUSH',
  POP: 'POP',
  PARTITION: 'PARTITION',
  MERGE: 'MERGE',
  COMPLETE: 'COMPLETE'
}

export const SPEED_OPTIONS = ['0.5x', '1x', '1.5x', '2x']

/**
 * Base playback delay in ms per speed tier.
 *
 * These are the MINIMUM time each step is shown. When a step provides
 * metadata.suggestedDuration the engine uses whichever is larger,
 * so critical educational steps (COMPARE, SWAP) always get enough time.
 *
 * Educational goal at 1x: learner can read the comparison, observe the swap,
 * understand the outcome — without pausing manually.
 */
export const SPEED_CONFIG = {
  '0.5x': 2400,   // Very slow / deep learning
  '1x':   1400,   // Recommended learning speed
  '1.5x':  800,   // Fast review
  '2x':    350    // Quick revision
}

export const DEFAULT_SPEED = '1x'

/**
 * Visualizer type identifiers.
 *
 * Algorithm generators declare their expected renderer type via this enum.
 * The workspace selects the appropriate renderer component accordingly.
 * Only ARRAY is implemented today; others are reserved for future visualizers.
 */
export const VISUALIZER_TYPES = {
  ARRAY: 'array',
  TREE: 'tree',
  GRAPH: 'graph',
  STACK: 'stack',
  QUEUE: 'queue',
  LINKED_LIST: 'linked-list'
}

/**
 * Generic sorted boundary direction identifiers for array visualizers.
 *
 * - RIGHT: Sorted region builds from the right end (e.g. Bubble Sort)
 * - LEFT:  Sorted region builds from the left end (e.g. Selection Sort, Insertion Sort)
 * - NONE:  No sorted boundary (e.g. Linear Search, Binary Search)
 */
export const BOUNDARY_DIRECTIONS = {
  RIGHT: 'right',
  LEFT: 'left',
  NONE: 'none'
}

