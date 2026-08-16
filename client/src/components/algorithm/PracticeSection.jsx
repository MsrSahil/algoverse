import { ExternalLink } from 'lucide-react'

const PracticeSection = ({ practiceProblems = [] }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5" aria-labelledby="practice-title">
      <h3 id="practice-title" className="text-lg font-bold text-white">
        Practice Problems
      </h3>

      {practiceProblems.length === 0 ? (
        <p className="mt-3 text-sm text-slate-300">Practice problems for this algorithm will be added soon.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {practiceProblems.map((problem) => {
            const hasUrl = Boolean(problem.url)
            return (
              <article key={`${problem.platform}-${problem.title}`} className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm font-semibold text-white">{problem.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                  {problem.platform} • {problem.difficulty}
                </p>
                <p className="mt-2 text-sm text-slate-300">{problem.description}</p>

                {hasUrl ? (
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
                  >
                    Practice
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="mt-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-200">
                    Coming Soon
                  </span>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default PracticeSection
