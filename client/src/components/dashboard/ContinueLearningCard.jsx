import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getDifficultyStyles } from './difficultyStyles'

const ContinueLearningCard = ({ current }) => {
  if (!current) {
    return (
      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8" aria-labelledby="continue-learning-title">
        <h2 id="continue-learning-title" className="text-xl font-bold text-white sm:text-2xl">
          Continue Learning
        </h2>
        <p className="mt-3 text-slate-300">Start your DSA journey by exploring an algorithm.</p>
        <Link
          to="/algorithms"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
        >
          Explore Algorithms
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8" aria-labelledby="continue-learning-title">
      <h2 id="continue-learning-title" className="text-xl font-bold text-white sm:text-2xl">
        Continue Learning
      </h2>

      <article className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{current.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">{current.category}</span>
              <span className={`rounded-full border px-3 py-1 ${getDifficultyStyles(current.difficulty)}`}>
                {current.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                <Clock3 className="h-3.5 w-3.5" />
                {current.estimatedTime}
              </span>
            </div>
          </div>
          <p className="text-sm font-semibold text-cyan-300">Progress: {current.progress}%</p>
        </div>

        <div className="mt-4 h-2.5 rounded-full bg-white/10" role="progressbar" aria-valuenow={current.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${current.title} progress`}>
          <div className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-all duration-700" style={{ width: `${current.progress}%` }} />
        </div>

        <Link
          to={`/algorithm/${current.slug}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:shadow-lg hover:shadow-cyan-400/30"
        >
          Continue Learning
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>
    </section>
  )
}

export default ContinueLearningCard
