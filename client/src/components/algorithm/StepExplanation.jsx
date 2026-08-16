const StepExplanation = ({ step }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5" aria-labelledby="step-explanation-title">
      <h3 id="step-explanation-title" className="text-lg font-bold text-white">
        Current Step Explanation
      </h3>
      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">{step.label}</p>
        <p className="mt-2 text-base font-semibold text-white">{step.title}</p>
        <p className="mt-1 text-sm text-slate-300">{step.description}</p>
      </div>
    </section>
  )
}

export default StepExplanation
