import { STEP_TYPES } from './visualizationTypes.js'

/**
 * Visual element state constants consumed by ArrayElement.
 * Derived from generic step types — no algorithm-specific logic.
 */
export const ELEMENT_STATE = {
  NORMAL: 'normal',
  COMPARING: 'comparing',
  SWAPPING: 'swapping',
  SORTED: 'sorted',
  HIGHLIGHTED: 'highlighted',
  COMPLETE: 'complete'
}

/**
 * Derive the visual state of an array element at a given index
 * from the current generic visualization step.
 *
 * Algorithm-agnostic — reads only standard step schema fields:
 *   type, indices, sortedIndices, highlightedIndices
 */
export const getElementState = (index, step) => {
  if (!step) return ELEMENT_STATE.NORMAL

  const {
    type,
    indices = [],
    sortedIndices = [],
    highlightedIndices = []
  } = step

  if (type === STEP_TYPES.COMPLETE) {
    return ELEMENT_STATE.COMPLETE
  }

  if (sortedIndices.includes(index)) {
    return ELEMENT_STATE.SORTED
  }

  if (type === STEP_TYPES.SORTED && indices.includes(index)) {
    return ELEMENT_STATE.SORTED
  }

  if ((type === STEP_TYPES.SWAP || type === STEP_TYPES.OVERWRITE) && indices.includes(index)) {
    return ELEMENT_STATE.SWAPPING
  }

  if ((type === STEP_TYPES.COMPARE || type === STEP_TYPES.CHECK) && indices.includes(index)) {
    return ELEMENT_STATE.COMPARING
  }

  if (highlightedIndices.includes(index) || (type === STEP_TYPES.HIGHLIGHT && indices.includes(index))) {
    return ELEMENT_STATE.HIGHLIGHTED
  }

  return ELEMENT_STATE.NORMAL
}

/**
 * Returns the style configuration for a given element visual state.
 *
 * Bubble metaphor: elements are circular objects with depth, shadow, and glow.
 * The shape is enforced by the ArrayElement component (rounded-full).
 * This module only produces class strings — no layout decisions.
 */
export const getElementStyleConfig = (state) => {
  switch (state) {
    case ELEMENT_STATE.COMPARING:
      return {
        // Amber: "attention, look here"
        wrapper: 'scale-110 -translate-y-2',   // lift upward
        bubble: [
          'border-2 border-amber-400/90',
          'bg-[radial-gradient(ellipse_at_30%_30%,_#fef3c7_0%,_#b45309_60%,_#78350f_100%)]',
          'shadow-[0_0_28px_rgba(251,191,36,0.55),_0_8px_24px_rgba(0,0,0,0.6)]'
        ].join(' '),
        valueCls: 'text-amber-50 font-black drop-shadow-md',
        indexCls: 'text-amber-400/90 font-mono font-semibold',
        badge: { text: 'CMP', cls: 'bg-amber-950/80 text-amber-300 border border-amber-400/50 font-bold' }
      }

    case ELEMENT_STATE.SWAPPING:
      return {
        // Rose: "movement, exchange"
        wrapper: 'scale-115',
        bubble: [
          'border-2 border-rose-400/90',
          'bg-[radial-gradient(ellipse_at_30%_30%,_#fce7f3_0%,_#be123c_55%,_#4c0519_100%)]',
          'shadow-[0_0_32px_rgba(244,63,94,0.6),_0_8px_24px_rgba(0,0,0,0.6)]'
        ].join(' '),
        valueCls: 'text-rose-50 font-black drop-shadow-md',
        indexCls: 'text-rose-400/90 font-mono font-semibold',
        badge: { text: 'SWAP', cls: 'bg-rose-950/80 text-rose-300 border border-rose-400/50 font-bold' }
      }

    case ELEMENT_STATE.SORTED:
      return {
        // Emerald: "finalized, locked in"
        wrapper: '',
        bubble: [
          'border-2 border-emerald-500/70',
          'bg-[radial-gradient(ellipse_at_30%_30%,_#d1fae5_0%,_#047857_55%,_#022c22_100%)]',
          'shadow-[0_0_18px_rgba(52,211,153,0.35),_0_4px_16px_rgba(0,0,0,0.5)]'
        ].join(' '),
        valueCls: 'text-emerald-100 font-bold drop-shadow-sm',
        indexCls: 'text-emerald-500/80 font-mono',
        badge: { text: '✓', cls: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold' }
      }

    case ELEMENT_STATE.COMPLETE:
      return {
        // Bright emerald: "everything done"
        wrapper: '',
        bubble: [
          'border-2 border-emerald-400/80',
          'bg-[radial-gradient(ellipse_at_30%_30%,_#ecfdf5_0%,_#059669_55%,_#022c22_100%)]',
          'shadow-[0_0_22px_rgba(52,211,153,0.45),_0_4px_16px_rgba(0,0,0,0.5)]'
        ].join(' '),
        valueCls: 'text-emerald-50 font-bold drop-shadow-sm',
        indexCls: 'text-emerald-400/80 font-mono',
        badge: { text: '✓', cls: 'bg-emerald-950/80 text-emerald-200 border border-emerald-400/50 font-bold' }
      }

    case ELEMENT_STATE.HIGHLIGHTED:
      return {
        // Violet: "focus / pivot"
        wrapper: 'scale-110',
        bubble: [
          'border-2 border-violet-400/80',
          'bg-[radial-gradient(ellipse_at_30%_30%,_#ede9fe_0%,_#6d28d9_55%,_#1e0938_100%)]',
          'shadow-[0_0_24px_rgba(167,139,250,0.45),_0_4px_16px_rgba(0,0,0,0.5)]'
        ].join(' '),
        valueCls: 'text-violet-100 font-bold drop-shadow-sm',
        indexCls: 'text-violet-400/80 font-mono',
        badge: { text: '●', cls: 'bg-violet-950/80 text-violet-300 border border-violet-400/40 font-bold' }
      }

    case ELEMENT_STATE.NORMAL:
    default:
      return {
        // Slate: resting state
        wrapper: '',
        bubble: [
          'border border-white/15',
          'bg-[radial-gradient(ellipse_at_30%_30%,_#334155_0%,_#0f172a_70%,_#020617_100%)]',
          'shadow-[0_4px_20px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.08)]'
        ].join(' '),
        valueCls: 'text-slate-100 font-bold',
        indexCls: 'text-slate-500 font-mono',
        badge: null
      }
  }
}
