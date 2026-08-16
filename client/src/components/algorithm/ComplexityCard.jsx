const ComplexityCard = ({ timeComplexity, spaceComplexity }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5" aria-labelledby="complexity-title">
      <h3 id="complexity-title" className="text-lg font-bold text-white">
        Complexity Analysis
      </h3>

      <div className="mt-4 space-y-2 text-sm text-slate-200">
        <p className="font-semibold text-white">Time Complexity</p>
        <p>
          <span className="text-slate-400">Best:</span> {timeComplexity?.best || 'N/A'}
        </p>
        <p>
          <span className="text-slate-400">Average:</span> {timeComplexity?.average || 'N/A'}
        </p>
        <p>
          <span className="text-slate-400">Worst:</span> {timeComplexity?.worst || 'N/A'}
        </p>

        <div className="pt-2">
          <p className="font-semibold text-white">Space Complexity</p>
          <p className="mt-1">{spaceComplexity || 'N/A'}</p>
        </div>
      </div>
    </section>
  )
}

export default ComplexityCard
