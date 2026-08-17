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

export const SPEED_CONFIG = {
  '0.5x': 1400,
  '1x': 700,
  '1.5x': 400,
  '2x': 200
}

export const DEFAULT_SPEED = '1x'

export const VISUALIZER_TYPES = {
  ARRAY: 'array',
  SEARCH: 'search',
  TREE: 'tree',
  GRAPH: 'graph',
  STACK: 'stack',
  QUEUE: 'queue'
}
