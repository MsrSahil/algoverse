const DryRunSection = ({ dryRun = [] }) => {
  if (!dryRun.length) {
    return (
      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6" aria-labelledby="dry-run-title">
        <h3 id="dry-run-title" className="text-2xl font-bold text-white">
          Example Dry Run
        </h3>
        <p className="mt-3 text-sm text-slate-300">Dry run examples for this algorithm will be added soon.</p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6" aria-labelledby="dry-run-title">
      <h3 id="dry-run-title" className="text-2xl font-bold text-white">
        Example Dry Run
      </h3>

      <ol className="mt-4 space-y-3">
        {dryRun.map((item) => (
          <li key={`${item.step}-${item.title}`} className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">{item.step}</p>
            <p className="mt-1 font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default DryRunSection
