const VisualizationWorkspace = ({ algorithm }) => {
  const hasPreview = Array.isArray(algorithm.visualizationPreview) && algorithm.visualizationPreview.length > 0
  const maxValue = hasPreview ? Math.max(...algorithm.visualizationPreview) : 1
  const isComingSoon = algorithm.status === 'coming-soon'

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8" aria-labelledby="visualization-workspace-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="visualization-workspace-title" className="text-2xl font-bold text-white">
            Visualization Workspace
          </h2>
          <p className="mt-1 text-sm text-slate-300">Interactive visualization will appear here.</p>
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Visualization Engine
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
        {hasPreview ? (
          <div className="flex min-h-52 items-end justify-center gap-3 overflow-x-auto px-2 pb-2">
            {algorithm.visualizationPreview.map((value, index) => (
              <div key={`${value}-${index}`} className="flex min-w-12 flex-col items-center gap-2">
                <div
                  className="w-12 rounded-t-xl bg-linear-to-t from-cyan-500/80 to-emerald-400/85 transition duration-300 hover:from-cyan-400 hover:to-emerald-300"
                  style={{ height: `${Math.max(24, (value / maxValue) * 180)}px` }}
                />
                <span className="text-xs font-semibold text-slate-300">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 text-center text-sm text-slate-400">
            Visualization preview for this algorithm will be available soon.
          </div>
        )}
      </div>

      {isComingSoon ? (
        <p className="mt-4 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          Interactive visualization coming soon.
        </p>
      ) : (
        <p className="mt-4 text-sm text-slate-300">
          This preview mirrors the upcoming visualizer layout and is ready for engine integration.
        </p>
      )}
    </section>
  )
}

export default VisualizationWorkspace
