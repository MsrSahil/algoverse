import { Bookmark, CheckCircle2 } from 'lucide-react'

const actionButtonClassName =
  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-slate-100 transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'

const LearningActions = ({
  isFavorite,
  isComplete,
  onToggleFavorite,
  onToggleComplete,
  canComplete = true,
  completionLoading = false,
  progressLoading = false,
  completionError = null
}) => {
  const completionLabel = progressLoading
    ? 'Loading progress...'
    : completionLoading
      ? 'Saving...'
      : isComplete
        ? 'Completed ✓'
        : 'Mark as Complete'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onToggleFavorite}
        className={actionButtonClassName}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-cyan-300 text-cyan-300' : 'text-slate-300'}`} />
        {isFavorite ? 'Saved' : 'Save'}
      </button>

      <button
        type="button"
        onClick={onToggleComplete}
        disabled={progressLoading || completionLoading || isComplete || !canComplete}
        className={`${actionButtonClassName} disabled:cursor-not-allowed disabled:opacity-50`}
        aria-label={isComplete ? 'Marked as complete' : 'Mark algorithm as complete'}
      >
        <CheckCircle2 className={`h-4 w-4 ${isComplete ? 'text-emerald-300' : 'text-slate-300'}`} />
        {completionLabel}
      </button>

      <span className="min-h-5 basis-full text-right text-xs text-slate-400" role="status" aria-live="polite">
        {completionError || (!progressLoading && isComplete ? 'Completed ✓' : '')}
      </span>
    </div>
  )
}

export default LearningActions
