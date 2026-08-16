import AlgorithmCard from './AlgorithmCard'

const RecommendedAlgorithms = ({ algorithms = [] }) => {
  return (
    <section aria-labelledby="recommended-title">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Recommendations</p>
        <h2 id="recommended-title" className="mt-2 text-2xl font-bold text-white">
          Recommended for You
        </h2>
      </div>

      {algorithms.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          Recommended algorithms will appear here as you continue learning.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {algorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecommendedAlgorithms
