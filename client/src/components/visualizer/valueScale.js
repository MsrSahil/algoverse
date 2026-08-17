/**
 * valueScale.js — Algorithm-agnostic value → visual size mapping.
 *
 * Maps numeric array values to bubble pixel diameters using a deterministic
 * linear normalization. Reusable across Bubble Sort, Selection Sort,
 * Insertion Sort, Quick Sort, Merge Sort, and any future array visualizer.
 *
 * Guarantees:
 *   ✓  Equal values  →  identical px (no random variation, ever)
 *   ✓  Negative values work correctly — no negative CSS dimensions
 *   ✓  All-equal arrays  →  sensible midpoint (not collapsed to minimum)
 *   ✓  Single-element arrays  →  sensible midpoint (no divide-by-zero)
 *   ✓  Output is always clamped to [minPx, maxPx]
 *   ✓  Pure functions — no side effects, no state
 *
 * Two concepts are intentionally kept separate:
 *   VALUE SIZE   = permanent diameter from getBubbleSizePx()   ← this file
 *   STATE SCALE  = temporary CSS transform in elementStates.js ← not this file
 */

/**
 * Pixel diameter ranges per responsive breakpoint.
 * The ratio between min and max defines how strongly size differences are shown.
 * Chosen so that:
 *   - Even a 2-element array has a clearly visible size difference.
 *   - Active-state scale (5%) cannot flip the order of similarly-sized bubbles.
 */
export const SIZE_PRESETS = {
  /** mobile  — viewport width < 640px  */
  sm: { minPx: 34, maxPx: 70 },
  /** tablet  — viewport width 640–1023px */
  md: { minPx: 38, maxPx: 80 },
  /** desktop — viewport width >= 1024px  */
  lg: { minPx: 42, maxPx: 88 },
}

/**
 * Picks the correct SIZE_PRESET for the current viewport.
 * Safe to call on initial render (SSR fallback -> lg).
 *
 * @returns {{ minPx: number, maxPx: number }}
 */
export const getPresetForViewport = () => {
  if (typeof window === 'undefined') return SIZE_PRESETS.lg
  if (window.innerWidth < 640) return SIZE_PRESETS.sm
  if (window.innerWidth < 1024) return SIZE_PRESETS.md
  return SIZE_PRESETS.lg
}

/**
 * Derives { min, max } from a numeric array in a single O(n) pass.
 * Returns { min: 0, max: 0 } for empty or non-array input.
 *
 * @param {number[]} data
 * @returns {{ min: number, max: number }}
 */
export const getValueRange = (data) => {
  if (!Array.isArray(data) || data.length === 0) return { min: 0, max: 0 }
  let min = data[0]
  let max = data[0]
  for (let i = 1; i < data.length; i++) {
    if (data[i] < min) min = data[i]
    if (data[i] > max) max = data[i]
  }
  return { min, max }
}

/**
 * Maps a single numeric value to an integer bubble diameter in pixels.
 *
 * Algorithm:
 *   t = (value - min) / (max - min)   -> 0..1 (handles negatives correctly)
 *   px = round(minPx + t * (maxPx - minPx))
 *   clamped to [minPx, maxPx]
 *
 * Edge cases:
 *   min === max  ->  midpoint (all-equal arrays look uniform, not invisible)
 *   t slightly outside 0..1 (float rounding)  ->  clamp prevents overflow
 *
 * @param {number} value  - The element's value (may be negative or fractional)
 * @param {number} min    - Dataset minimum from getValueRange()
 * @param {number} max    - Dataset maximum from getValueRange()
 * @param {number} minPx  - Minimum output diameter in px
 * @param {number} maxPx  - Maximum output diameter in px
 * @returns {number}      - Integer pixel diameter
 */
export const getBubbleSizePx = (value, min, max, minPx, maxPx) => {
  // Resolve to desktop defaults when caller omits size preset
  const lo = minPx ?? SIZE_PRESETS.lg.minPx
  const hi = maxPx ?? SIZE_PRESETS.lg.maxPx

  // All-equal / single-value: midpoint, never the minimum
  if (min === max) {
    return Math.round((lo + hi) / 2)
  }

  const t = (value - min) / (max - min)  // 0..1
  const raw = lo + t * (hi - lo)
  return Math.round(Math.min(hi, Math.max(lo, raw)))
}
