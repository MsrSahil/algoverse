const LearningJourney = ({ journey }) => {
  const steps = journey?.steps || []
  const currentTopic = journey?.currentTopic

  return (
    <section aria-labelledby="learning-journey-title" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <h2 id="learning-journey-title" className="text-xl font-bold text-white sm:text-2xl">
        Learning Journey
      </h2>

      {steps.length === 0 ? (
        <p className="mt-4 text-sm text-slate-300">Choose an algorithm and start learning to begin your roadmap.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const isCurrent = step === currentTopic
            return (
              <div
                key={step}
                className={`rounded-2xl border px-4 py-3 text-sm transition duration-200 ${
                  isCurrent
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                    : 'border-white/10 bg-white/5 text-slate-200'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Step {index + 1}</p>
                <p className="mt-1 font-semibold">{step}</p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default LearningJourney
