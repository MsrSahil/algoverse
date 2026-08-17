import { ELEMENT_STATE, getElementStyleConfig } from './elementStates.js'

/**
 * ArrayElement — Bubble visualization node
 *
 * Renders a single array value as a circular bubble object.
 * State (normal / comparing / swapping / sorted / complete) is communicated
 * through the bubble's gradient, glow, shadow, scale, and lift.
 *
 * This component is GENERIC — it receives a pre-computed state enum
 * and has no knowledge of which algorithm is running.
 *
 * ── Two orthogonal size concepts ─────────────────────────────────────────
 *
 *  1. VALUE SIZE  (bubblePx prop)
 *     Permanent visual representation of magnitude.
 *     Computed by the parent from the dataset's min/max range.
 *     Applied as inline width/height so it belongs to the value, not the slot.
 *
 *  2. ACTIVE STATE SCALE  (cfg.wrapper — CSS scale/translate transforms)
 *     Temporary emphasis when comparing / swapping.
 *     Applied as a CSS transform multiplier on top of the base size.
 *     A 50px bubble at scale-110 → ~55px, a 80px bubble → ~88px.
 *     The larger bubble always remains visibly larger. ✓
 *
 * Props:
 *   value     {number|string}  - The displayed value
 *   index     {number}         - Logical array index (shown below bubble)
 *   state     {string}         - One of ELEMENT_STATE.*
 *   stableId  {string}         - data-* attribute for DOM identification
 *   bubblePx  {number|null}    - Explicit bubble diameter in px (value-proportional).
 *                                When null, falls back to size-based Tailwind classes.
 *   size      {string}         - Fallback sizing tier: 'sm' | 'md' (default 'md')
 */
const ArrayElement = ({
  value,
  index,
  state = ELEMENT_STATE.NORMAL,
  stableId,
  bubblePx = null,
  size = 'md'
}) => {
  const cfg = getElementStyleConfig(state)

  // ── Value font size — scales with bubble diameter ─────────────────────
  // Chosen to ensure the label fits comfortably for values like "-999".
  const valueFontCls = (() => {
    if (bubblePx === null) {
      return size === 'sm' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl lg:text-2xl'
    }
    if (bubblePx < 48) return 'text-xs'
    if (bubblePx < 58) return 'text-sm'
    if (bubblePx < 70) return 'text-base'
    if (bubblePx < 82) return 'text-lg'
    return 'text-xl'
  })()

  // ── Bubble dimensions ─────────────────────────────────────────────────
  // If bubblePx is provided use inline styles; otherwise fall back to Tailwind.
  const bubbleSizeCls = bubblePx === null
    ? (size === 'sm'
        ? 'w-11 h-11 sm:w-12 sm:h-12'
        : 'w-14 h-14 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem]')
    : ''

  const bubbleSizeStyle = bubblePx !== null
    ? { width: bubblePx, height: bubblePx, flexShrink: 0 }
    : {}

  return (
    <div
      className="flex flex-col items-center gap-2"
      role="listitem"
      aria-label={`Value ${value} at index ${index}, state ${state}`}
      data-stable-id={stableId}
    >
      {/* Badge row — fixed height prevents layout jump when badge appears/disappears */}
      <div className="flex h-6 items-center justify-center">
        {cfg.badge ? (
          <span
            className={`
              inline-flex items-center rounded-full px-2 py-0.5
              text-[9px] uppercase tracking-widest
              transition-all duration-200
              ${cfg.badge.cls}
            `}
          >
            {cfg.badge.text}
          </span>
        ) : (
          <span className="select-none text-[9px] opacity-0" aria-hidden="true">—</span>
        )}
      </div>

      {/*
        Bubble wrapper — handles ACTIVE STATE SCALE + lift transforms.
        Transition is applied here so transforms animate smoothly.

        The FLIP animation on the parent slot div uses translateX.
        The active-state scale lives here as a CSS transform.
        The base size lives on the inner bubble div as inline width/height.
        All three are orthogonal and do not conflict.
      */}
      <div
        className={`transition-transform duration-300 ease-out ${cfg.wrapper}`}
      >
        {/* Circular bubble body — VALUE SIZE applied here via inline style */}
        <div
          className={`
            relative flex items-center justify-center
            rounded-full select-none
            transition-all duration-350 ease-out
            ${bubbleSizeCls}
            ${cfg.bubble}
          `}
          style={bubbleSizeStyle}
        >
          {/* Specular highlight — top-left inner shine for depth illusion */}
          <span
            className="pointer-events-none absolute left-[18%] top-[14%] h-[28%] w-[28%] rounded-full bg-white/20 blur-[2px]"
            aria-hidden="true"
          />

          {/* Value label */}
          <span className={`relative z-10 leading-none tabular-nums ${valueFontCls} ${cfg.valueCls}`}>
            {value}
          </span>
        </div>
      </div>

      {/* Index label */}
      <span className={`text-[11px] leading-none transition-colors duration-200 ${cfg.indexCls}`}>
        [{index}]
      </span>
    </div>
  )
}

export default ArrayElement
