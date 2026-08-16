const AlgorithmEmptyState = ({ onClearFilters }) => {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center sm:p-10">
      <h3 className="text-2xl font-bold text-white">No algorithms found</h3>
      <p className="mt-2 text-sm text-slate-300">Try changing your search or filters.</p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
      >
        Clear Filters
      </button>
    </section>
  )
}

export default AlgorithmEmptyState
