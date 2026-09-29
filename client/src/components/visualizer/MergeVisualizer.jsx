import React, { useMemo } from 'react'
import { getBubbleSizePx } from './valueScale.js'
import { STEP_TYPES } from './visualizationTypes.js'

/**
 * Compact BubbleItem tailored for multi-group hierarchy view
 */
const CompactBubble = ({
  value,
  minVal,
  maxVal,
  isActive = false,
  isTaken = false,
  isSorted = false,
  isSingle = false,
  pointerLabel = null,
  pointerColor = 'cyan', // 'cyan' | 'amber' | 'emerald'
  sizeTier = 'md' // 'sm' | 'md'
}) => {
  const bubblePx = useMemo(() => {
    const rawPx = getBubbleSizePx(value, minVal, maxVal, 28, 54)
    return sizeTier === 'sm' ? Math.round(rawPx * 0.85) : rawPx
  }, [value, minVal, maxVal, sizeTier])

  const bubbleStyle = {
    width: bubblePx,
    height: bubblePx,
    flexShrink: 0
  }

  // Pointer styles
  const pointerPillCls =
    pointerColor === 'amber'
      ? 'border-amber-400/70 bg-amber-950/90 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.4)]'
      : pointerColor === 'emerald'
        ? 'border-emerald-400/70 bg-emerald-950/90 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.4)]'
        : 'border-cyan-400/70 bg-cyan-950/90 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.4)]'

  // Bubble background & border
  let bubbleCls = 'border border-slate-700 bg-slate-900 text-slate-200'
  if (isTaken) {
    bubbleCls = 'border border-dashed border-slate-800 bg-slate-950/30 text-slate-600 opacity-30 scale-90'
  } else if (isActive) {
    bubbleCls =
      pointerColor === 'amber'
        ? 'border-2 border-amber-400 bg-[radial-gradient(ellipse_at_30%_30%,_#fef3c7_0%,_#d97706_55%,_#78350f_100%)] text-amber-50 shadow-[0_0_18px_rgba(251,191,36,0.6)] scale-105'
        : 'border-2 border-cyan-400 bg-[radial-gradient(ellipse_at_30%_30%,_#cffafe_0%,_#0891b2_55%,_#164e63_100%)] text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.6)] scale-105'
  } else if (isSorted || isSingle) {
    bubbleCls =
      'border border-emerald-400 bg-[radial-gradient(ellipse_at_30%_30%,_#d1fae5_0%,_#059669_55%,_#064e3b_100%)] text-emerald-50 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
  }

  return (
    <div className="relative flex flex-col items-center gap-1 transition-all duration-300">
      {/* Pointer badge above bubble */}
      <div className="h-3.5 flex items-center justify-center">
        {pointerLabel && !isTaken ? (
          <span
            className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider ${pointerPillCls}`}
          >
            {pointerLabel}
          </span>
        ) : (
          <span className="select-none text-[7px] opacity-0" aria-hidden="true">—</span>
        )}
      </div>

      {/* Bubble body */}
      <div
        className={`relative flex items-center justify-center rounded-full select-none overflow-hidden transition-all duration-300 ${bubbleCls}`}
        style={bubbleStyle}
      >
        {!isTaken && (
          <span
            className="pointer-events-none absolute left-[18%] top-[14%] h-[28%] w-[28%] rounded-full bg-white/25 blur-[1px]"
            aria-hidden="true"
          />
        )}
        <span
          className={`relative z-10 font-bold tabular-nums leading-none ${
            bubblePx < 36 ? 'text-[11px]' : 'text-xs sm:text-sm'
          } ${isTaken ? 'line-through' : ''}`}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

/**
 * GroupCard — renders a single group box in the hierarchy row
 */
const GroupCard = ({
  group,
  minVal,
  maxVal,
  activeRole = null, // 'left' | 'right' | 'merged' | 'idle'
  leftPointer = null,
  rightPointer = null,
  isExhausted = false,
  sizeTier = 'md'
}) => {
  const { values = [], status = 'idle', label } = group
  const isActiveLeft = activeRole === 'left' || status === 'active-left'
  const isActiveRight = activeRole === 'right' || status === 'active-right'
  const isMerged = activeRole === 'merged' || status === 'merged'
  const isInactive = status === 'inactive' || status === 'idle'

  let cardBorder = 'border-white/10 bg-slate-900/60'
  let labelCls = 'text-slate-400'

  if (isActiveLeft) {
    cardBorder = 'border-cyan-400/80 bg-cyan-950/30 shadow-[0_0_20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/50'
    labelCls = 'text-cyan-300 font-bold'
  } else if (isActiveRight) {
    cardBorder = 'border-amber-400/80 bg-amber-950/30 shadow-[0_0_20px_rgba(251,191,36,0.25)] ring-1 ring-amber-400/50'
    labelCls = 'text-amber-300 font-bold'
  } else if (isMerged) {
    cardBorder = 'border-emerald-400/80 bg-emerald-950/30 shadow-[0_0_18px_rgba(16,185,129,0.25)]'
    labelCls = 'text-emerald-300 font-bold'
  } else if (isInactive) {
    cardBorder = 'border-slate-800/80 bg-slate-950/40 opacity-60 hover:opacity-80 transition-opacity'
    labelCls = 'text-slate-500'
  }

  const defaultTitle = isActiveLeft
    ? 'Left Group'
    : isActiveRight
      ? 'Right Group'
      : isMerged
        ? '✓ Merged'
        : label || `Group (${values.length})`

  return (
    <div
      className={`flex flex-col items-center rounded-2xl border px-3 py-2 transition-all duration-300 backdrop-blur-sm ${cardBorder}`}
    >
      {/* Header bar */}
      <div className="mb-1.5 flex w-full items-center justify-between gap-2 px-0.5">
        <span className={`text-[9px] uppercase tracking-wider ${labelCls}`}>
          {defaultTitle}
        </span>
        {isExhausted && (
          <span className="text-[8px] font-bold text-slate-500 uppercase">
            (Empty)
          </span>
        )}
      </div>

      {/* Bubble row */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {values.map((val, idx) => {
          const isTaken = (isActiveLeft && idx < leftPointer) || (isActiveRight && idx < rightPointer)
          const isPointerActive = (isActiveLeft && idx === leftPointer && !isExhausted) || (isActiveRight && idx === rightPointer && !isExhausted)
          const pointerColor = isActiveLeft ? 'cyan' : isActiveRight ? 'amber' : isMerged ? 'emerald' : 'cyan'
          const pointerText = isActiveLeft ? 'LEFT' : isActiveRight ? 'RIGHT' : null

          return (
            <CompactBubble
              key={`grp-val-${idx}-${val}`}
              value={val}
              minVal={minVal}
              maxVal={maxVal}
              isTaken={isTaken}
              isActive={isPointerActive}
              isSorted={isMerged}
              pointerLabel={isPointerActive ? pointerText : null}
              pointerColor={pointerColor}
              sizeTier={sizeTier}
            />
          )
        })}
      </div>
    </div>
  )
}

/**
 * MergeVisualizer — Single Stable Canvas Merge Sort Visualization Stage
 */
export const MergeVisualizer = ({ step = null, fallbackArray = [] }) => {
  const arrayData = useMemo(() => {
    if (step && Array.isArray(step.arrayState) && step.arrayState.length > 0) {
      return step.arrayState
    }
    return fallbackArray
  }, [step, fallbackArray])

  const { minVal, maxVal } = useMemo(() => {
    const valid = arrayData.filter((v) => typeof v === 'number' && !isNaN(v))
    if (valid.length === 0) return { minVal: 0, maxVal: 0 }
    return {
      minVal: Math.min(...valid),
      maxVal: Math.max(...valid)
    }
  }, [arrayData])

  const meta = step?.metadata ?? {}
  const phase = meta.phase ?? 'start'
  const mergePhase = meta.mergePhase
  const treeLevels = meta.treeLevels ?? []
  const activeLevel = meta.activeLevel ?? 0
  const allGroups = meta.allGroups ?? []
  const isComplete = phase === 'complete' || step?.type === STEP_TYPES.COMPLETE

  // ─────────────────────────────────────────────────────────────────────────
  // VIEW 1: SPLIT HIERARCHY / DIVIDE PHASE (Levels 0..N)
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'start' || phase === 'split' || phase === 'single') {
    const visibleLevels = treeLevels.length > 0
      ? treeLevels.slice(0, activeLevel + 1)
      : [[{ id: 'root', range: [0, arrayData.length - 1], values: arrayData }]]

    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 py-2">
        {/* Phase Header Pill */}
        <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-300 shadow-sm">
          <span>✂</span>
          <span>Divide Phase · {phase === 'single' ? 'Single Elements' : `Split Level ${activeLevel}`}</span>
        </div>

        {/* Tree Hierarchy Stack */}
        <div className="flex w-full flex-col items-center justify-center gap-3.5">
          {visibleLevels.map((lvlGroups, lvlIdx) => {
            const isCurrentLvl = lvlIdx === activeLevel
            const isBaseLevel = lvlIdx === treeLevels.length - 1 && phase === 'single'

            return (
              <div key={`split-lvl-${lvlIdx}`} className="flex flex-col items-center gap-2">
                {/* Level Connector Arrow */}
                {lvlIdx > 0 && (
                  <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold">
                    <span>↓</span>
                    <span className="text-[8px] uppercase tracking-widest text-slate-600">Split</span>
                    <span>↓</span>
                  </div>
                )}

                {/* Groups in this level */}
                <div
                  className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 transition-all duration-300 ${
                    isCurrentLvl ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                  }`}
                >
                  {lvlGroups.map((grp, grpIdx) => (
                    <GroupCard
                      key={`lvl-${lvlIdx}-grp-${grpIdx}`}
                      group={{
                        ...grp,
                        status: isCurrentLvl ? (isBaseLevel ? 'merged' : 'split') : 'idle',
                        label: isBaseLevel
                          ? `[${grp.values[0]}] (Sorted)`
                          : lvlIdx === 0
                            ? 'Full Array'
                            : `Subarray ${grpIdx + 1}`
                      }}
                      minVal={minVal}
                      maxVal={maxVal}
                      sizeTier={lvlGroups.length > 4 ? 'sm' : 'md'}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // VIEW 2: MERGE WORKBENCH / CONQUER PHASE (Progressive Multi-Group Canvas)
  // ─────────────────────────────────────────────────────────────────────────
  const leftPointer = meta.leftGroup?.pointer ?? 0
  const rightPointer = meta.rightGroup?.pointer ?? 0
  const outputValues = meta.outputGroup?.values ?? []
  const targetLength = meta.outputGroup?.targetLength ?? 0
  const remainingSlots = Math.max(0, targetLength - outputValues.length)

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-2">
      {/* Phase Header Pill */}
      <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300 shadow-sm">
        <span>⮀</span>
        <span>
          {isComplete
            ? '✓ Merge Sort Complete — Sorted Array'
            : mergePhase === 'complete'
              ? '✓ Subarray Merge Complete'
              : 'Conquer Phase · Active Merge Workbench'}
        </span>
      </div>

      {/* ── ROW 1: Full Array Partition (All sibling groups visible) ── */}
      <div className="flex w-full flex-col items-center">
        <span className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Complete Array State ({allGroups.length} Subarrays)
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {allGroups.map((grp, grpIdx) => {
            const isLeft = grp.status === 'active-left'
            const isRight = grp.status === 'active-right'
            return (
              <GroupCard
                key={`all-grp-${grpIdx}-${grp.id || grpIdx}`}
                group={grp}
                minVal={minVal}
                maxVal={maxVal}
                activeRole={isLeft ? 'left' : isRight ? 'right' : grp.status}
                leftPointer={isLeft ? leftPointer : null}
                rightPointer={isRight ? rightPointer : null}
                isExhausted={isLeft ? meta.leftGroup?.isExhausted : isRight ? meta.rightGroup?.isExhausted : false}
                sizeTier={allGroups.length > 4 ? 'sm' : 'md'}
              />
            )
          })}
        </div>
      </div>

      {/* ── ROW 2: Active Comparison & Output Construction Stage ── */}
      {!isComplete && mergePhase !== 'complete' && (
        <div className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-xl backdrop-blur-sm">
          {/* Decision / Action Callout */}
          <div className="mb-2 flex h-8 items-center justify-center">
            {mergePhase === 'compare' && meta.leftValue !== undefined && meta.rightValue !== undefined && (
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/80 px-3.5 py-1 shadow-sm">
                <span className="font-mono text-xs font-black text-cyan-300">{meta.leftValue}</span>
                <span className="text-[10px] font-black text-slate-400">{meta.operator || 'vs'}</span>
                <span className="font-mono text-xs font-black text-amber-300">{meta.rightValue}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                  {meta.decisionBadge || 'Take Smaller'}
                </span>
              </div>
            )}

            {mergePhase === 'take' && meta.takenValue !== undefined && (
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300 shadow-sm">
                <span>{meta.takenValue}</span>
                <span>➔</span>
                <span>MERGED OUTPUT</span>
              </div>
            )}

            {mergePhase === 'exhausted' && (
              <div className="flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-950/80 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-300 shadow-sm">
                <span>{meta.exhaustedSide === 'left' ? 'Left' : 'Right'} Group Empty · Copying Remaining</span>
              </div>
            )}

            {mergePhase === 'start' && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Compare front elements of both groups
              </span>
            )}
          </div>

          {/* Merged Output Accumulator Container */}
          <div className="flex w-full flex-col items-center rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-2.5">
            <div className="mb-1.5 flex w-full items-center justify-between px-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                Merged Subarray Building
              </span>
              <span className="font-mono text-[8px] text-emerald-400/70">
                {outputValues.length} / {targetLength}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 min-h-[44px]">
              {outputValues.map((val, idx) => (
                <CompactBubble
                  key={`out-accum-${idx}-${val}`}
                  value={val}
                  minVal={minVal}
                  maxVal={maxVal}
                  isSorted={true}
                  sizeTier="sm"
                />
              ))}

              {Array.from({ length: remainingSlots }).map((_, slotIdx) => (
                <div
                  key={`slot-empty-${slotIdx}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-slate-700/60 bg-slate-950/30 text-[8px] font-mono text-slate-600 select-none"
                >
                  —
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MergeVisualizer
