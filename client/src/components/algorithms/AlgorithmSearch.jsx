const AlgorithmSearch = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="algorithm-search" className="mb-2 block text-sm font-semibold text-slate-200">
        Search
      </label>
      <input
        id="algorithm-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search algorithms..."
        className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
      />
    </div>
  )
}

export default AlgorithmSearch
