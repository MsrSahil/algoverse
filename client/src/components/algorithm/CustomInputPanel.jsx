const CustomInputPanel = ({ disabled }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5" aria-labelledby="custom-input-title">
      <h3 id="custom-input-title" className="text-lg font-bold text-white">
        Custom Input
      </h3>
      <p className="mt-1 text-sm text-slate-300">Enter array values to visualize custom data once the engine is connected.</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          defaultValue="50, 30, 80, 10, 60"
          disabled={disabled}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Enter array values"
        />
        <button
          type="button"
          disabled={disabled}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Visualize
        </button>
      </div>
    </section>
  )
}

export default CustomInputPanel
