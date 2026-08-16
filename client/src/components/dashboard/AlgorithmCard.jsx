import { Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getDifficultyStyles } from './difficultyStyles'

const AlgorithmCard = ({ algorithm }) => {
  const isAvailable = algorithm.status === 'available'

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">{algorithm.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{algorithm.category}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyStyles(algorithm.difficulty)}`}>
          {algorithm.difficulty}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{algorithm.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />
          {algorithm.estimatedTime}
        </span>

        {isAvailable ? (
          <Link
            to={`/algorithm/${algorithm.slug}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
          >
            Learn
          </Link>
        ) : (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
            Coming Soon
          </span>
        )}
      </div>
    </article>
  )
}

export default AlgorithmCard
