const ProgressCard = ({ progress }) => {
  const percentage = Math.max(0, Math.min(100, Number(progress?.percentage || 0)))
  const completed = progress?.completedAlgorithms || 0
  const total = progress?.totalAlgorithms || 0

  return (
    <section aria-labelledby="progress-title" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <h2 id="progress-title" className="text-xl font-bold text-white sm:text-2xl">
        Your DSA Progress
      </h2>

      <p className="mt-3 text-4xl font-black text-cyan-300">{percentage}% Complete</p>

      <div className="mt-5 h-3 rounded-full bg-white/10" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label="Overall DSA progress">
        <div
          className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-300">
        Completed: <span className="font-semibold text-white">{completed}</span> / {total} algorithms
      </p>
      <p className="mt-2 text-sm text-slate-400">{progress?.message || 'Start your first algorithm to begin tracking progress.'}</p>
    </section>
  )
}

export default ProgressCard
