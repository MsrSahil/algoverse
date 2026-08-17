import { ELEMENT_STATE, getElementStyleConfig } from './elementStates.js'

/**
 * ArrayElement — Bubble visualization node
 *
 * Renders a single array value as a circular bubble.
 * State (normal / comparing / swapping / sorted / complete) drives
 * gradient, glow, shadow, scale, and lift.
 *
 * ── Two orthogonal size concepts ─────────────────────────────────────────
 *
 *  1. VALUE SIZE  (bubblePx prop)
 *     Permanent visual diameter representing magnitude.
 *     Computed by the parent via valueScale.getBubbleSizePx().
 *     Applied as inline width/height — belongs to the value, not the slot.
 *     Transitions smoothly on input change; stable during algorithm steps
 *     (bubble sort only rearranges, never changes values, so min/max and
 *     therefore all sizes remain constant throughout a run).
 *
 *  2. ACTIVE STATE SCALE  (cfg.wrapper — CSS transform: scale())
 *     Temporary 5% emphasis when comparing / swapping.
 *     Applied as a CSS transform multiplier on top of the base size.
 *     At max scale-[1.05]: a 42px bubble → ~44px, an 88px bubble → ~92px.
 *     The larger bubble always stays visibly larger. ✓
 *
 * Props:
 *   value     {number|string}  - Displayed value
 *   index     {number}         - Logical array index (shown below bubble)
 *   state     {string}         - One of ELEMENT_STATE.*
 *   stableId  {string}         - data-* attribute for DOM identification
 *   bubblePx  {number|null}    - Diameter in px from valueScale (value-proportional).
 *                                null → falls back to Tailwind size-tier classes.
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

  // ── Value font size ───────────────────────────────────────────────────
  // Two axes: bubble diameter AND string length (e.g. "-999" is 4 chars).
  // Goal: text always fits within the circle without overflow.
  const valueFontCls = (() => {
    if (bubblePx === null) {
      // Tailwind fallback path — fixed tier sizing
      return size === 'sm' ? 'text-sm sm:text-base' : 'text-base sm:text-lg lg:text-xl'
    }

    const charLen = String(value).length

    // 4+ chars: e.g. "-999", "1000", "-100"
    if (charLen >= 4) {
      if (bubblePx < 52) return 'text-[9px]'
      if (bubblePx < 66) return 'text-[11px]'
      if (bubblePx < 80) return 'text-xs'
      return 'text-sm'
    }

    // 3 chars: e.g. "-99", "100", "-10"
    if (charLen === 3) {
      if (bubblePx < 48) return 'text-[10px]'
      if (bubblePx < 60) return 'text-xs'
      if (bubblePx < 74) return 'text-sm'
      if (bubblePx < 84) return 'text-base'
      return 'text-lg'
    }

    // 1–2 chars: e.g. "5", "-5", "50"
    if (bubblePx < 46) return 'text-xs'
    if (bubblePx < 58) return 'text-sm'
    if (bubblePx < 70) return 'text-base'
    if (bubblePx < 82) return 'text-lg'
    return 'text-xl'
  })()

  // ── Bubble dimensions ─────────────────────────────────────────────────
  // bubblePx → explicit inline style (value-proportional path)
  // null     → Tailwind responsive classes (fallback path)
  const bubbleSizeCls = bubblePx === null
    ? (size === 'sm'
        ? 'w-11 h-11 sm:w-12 sm:h-12'
        : 'w-14 h-14 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem]')
    : ''

  // Smooth width/height transition for input-array changes only.
  // During a bubble sort run, min/max never changes (only positions swap),
  // so these will be stable — the transition is just insurance for the
  // "Apply Input" action. Explicit transition-property avoids triggering
  // gradient/shadow transitions unintentionally.
  const bubbleSizeStyle = bubblePx !== null
    ? {
        width: bubblePx,
        height: bubblePx,
        flexShrink: 0,
        transition: 'width 280ms ease-out, height 280ms ease-out'
      }
    : {}

  return (
    <div
      className="flex flex-col items-center gap-2"
      role="listitem"
      aria-label={`Value ${value} at index ${index}, state ${state}`}
      data-stable-id={stableId}
    >
      {/* Badge row — fixed height prevents layout jump on badge appear/disappear */}
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
        Bubble wrapper — owns ACTIVE STATE SCALE (5%) + lift transforms.
        Transition here animates the scale/translate smoothly.

        Layer order (outermost → innermost):
          slot div          →  FLIP translateX  (position animation)
          this wrapper div  →  scale-[1.05]     (active-state emphasis)
          bubble div        →  width/height px   (value magnitude)

        All three layers are orthogonal; none interferes with the others.
      */}
      <div className={`transition-transform duration-300 ease-out ${cfg.wrapper}`}>

        {/* ── Circular bubble body ── VALUE SIZE via inline style ── */}
        <div
          className={`
            relative flex items-center justify-center
            rounded-full select-none overflow-hidden
            transition-[box-shadow,border-color,background] duration-300 ease-out
            ${bubbleSizeCls}
            ${cfg.bubble}
          `}
          style={bubbleSizeStyle}
        >
          {/* Specular highlight — top-left inner shine for depth */}
          <span
            className="pointer-events-none absolute left-[18%] top-[14%] h-[28%] w-[28%] rounded-full bg-white/20 blur-[2px]"
            aria-hidden="true"
          />

          {/* Value label — primary visual element */}
          <span
            className={`
              relative z-10 leading-none tabular-nums font-bold
              max-w-full px-[6%] text-center truncate
              ${valueFontCls}
              ${cfg.valueCls}
            `}
          >
            {value}
          </span>
        </div>
      </div>

      {/* Index label — visually secondary */}
      <span className={`text-[10px] leading-none font-mono transition-colors duration-200 ${cfg.indexCls}`}>
        [{index}]
      </span>
    </div>
  )
}


export default ArrayElement
