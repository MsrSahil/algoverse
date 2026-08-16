import { Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getDifficultyStyles } from '../dashboard/difficultyStyles'
import LearningActions from './LearningActions'

const AlgorithmHeader = ({
  algorithm,
  isFavorite,
  isComplete,
  onToggleFavorite,
  onToggleComplete
}) => {
  return (
    <header className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
        <Link to="/algorithms" className="inline-flex items-center gap-2 text-cyan-300 transition hover:text-cyan-200">
          <span aria-hidden="true">&larr;</span>
          Back to Algorithms
        </Link>
      </div>

      <nav className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400" aria-label="Breadcrumb">
        <span>Algorithms</span>
        <span className="mx-2">/</span>
        <span>{algorithm.categoryLabel}</span>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{algorithm.title}</span>
      </nav>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{algorithm.categoryLabel}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{algorithm.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{algorithm.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyStyles(algorithm.difficulty)}`}>
              {algorithm.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <Clock3 className="h-3.5 w-3.5" />
              {algorithm.estimatedTime}
            </span>
            {algorithm.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <LearningActions
          isFavorite={isFavorite}
          isComplete={isComplete}
          onToggleFavorite={onToggleFavorite}
          onToggleComplete={onToggleComplete}
        />
      </div>
    </header>
  )
}

export default AlgorithmHeader
