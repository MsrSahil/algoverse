const AlgorithmOverview = ({ overview, fallbackDescription, keyIdea }) => {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-labelledby="algorithm-overview-title">
      <h2 id="algorithm-overview-title" className="sr-only">
        Algorithm Overview
      </h2>

      <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">What is it?</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">{overview?.whatIsIt || fallbackDescription}</p>
      </article>

      <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">When should you use it?</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {overview?.whenToUse || 'Use this technique when its assumptions fit your data and you need predictable behavior.'}
        </p>
      </article>

      <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Key idea</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {overview?.keyIdea || keyIdea || 'Understand the core operation pattern, then repeat it until the objective is reached.'}
        </p>
      </article>
    </section>
  )
}

export default AlgorithmOverview
