import AlgorithmCard from '../algorithms/AlgorithmCard'

const RelatedAlgorithms = ({ algorithms = [] }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5" aria-labelledby="related-algorithms-title">
      <h3 id="related-algorithms-title" className="text-lg font-bold text-white">
        Related Algorithms
      </h3>

      {algorithms.length === 0 ? (
        <p className="mt-3 text-sm text-slate-300">Related algorithms will appear here soon.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3">
          {algorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RelatedAlgorithms
