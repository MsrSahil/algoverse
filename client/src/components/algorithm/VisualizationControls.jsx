const baseButtonClassName =
  'rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-50'

const VisualizationControls = ({ disabled, isComingSoon }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5" aria-labelledby="visualization-controls-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="visualization-controls-title" className="text-lg font-bold text-white">
          Visualization Controls
        </h3>
        {isComingSoon && (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
            Coming Soon
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" disabled={disabled} className={baseButtonClassName}>Previous Step</button>
        <button type="button" disabled={disabled} className={baseButtonClassName}>Play</button>
        <button type="button" disabled={disabled} className={baseButtonClassName}>Pause</button>
        <button type="button" disabled={disabled} className={baseButtonClassName}>Next Step</button>
        <button type="button" disabled={disabled} className={baseButtonClassName}>Restart</button>
      </div>

      <div className="mt-4 max-w-xs">
        <label htmlFor="speed" className="text-sm font-semibold text-slate-200">
          Speed
        </label>
        <select
          id="speed"
          disabled={disabled}
          defaultValue="1x"
          className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none transition duration-200 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option>0.5x</option>
          <option>1x</option>
          <option>1.5x</option>
          <option>2x</option>
        </select>
      </div>
    </section>
  )
}

export default VisualizationControls
