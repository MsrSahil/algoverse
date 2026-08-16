import {
  ArrowRight,
  ArrowUpDown,
  Clock3,
  GitBranch,
  Layers,
  List,
  Link as LinkIcon,
  Network,
  Search,
  Share2,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getDifficultyStyles } from '../dashboard/difficultyStyles'

const categoryIconMap = {
  sorting: ArrowUpDown,
  searching: Search,
  stack: Layers,
  queue: List,
  'linked-list': LinkIcon,
  trees: GitBranch,
  graphs: Share2,
  'data-structures': Network
}

const statusStyles = {
  available: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'coming-soon': 'border-amber-400/30 bg-amber-400/10 text-amber-300'
}

const statusLabel = {
  available: 'Available',
  'coming-soon': 'Coming Soon'
}

const formatComplexity = (complexity) => {
  if (!complexity) {
    return 'N/A'
  }

  return `${complexity.best} / ${complexity.average} / ${complexity.worst}`
}

const AlgorithmCard = ({ algorithm }) => {
  const CategoryIcon = categoryIconMap[algorithm.category] || Sparkles
  const isAvailable = algorithm.status === 'available'

  return (
    <article className="group rounded-3xl border border-white/10 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-cyan-500/10 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300 transition duration-300 group-hover:scale-110">
            <CategoryIcon className="h-4.5 w-4.5" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{algorithm.categoryLabel}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[algorithm.status] || statusStyles['coming-soon']}`}>
          {statusLabel[algorithm.status] || 'Coming Soon'}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-white">{algorithm.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{algorithm.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyStyles(algorithm.difficulty)}`}>
          {algorithm.difficulty}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <Clock3 className="h-3.5 w-3.5" />
          {algorithm.estimatedTime}
        </span>
      </div>

      <dl className="mt-5 space-y-2 text-xs text-slate-300">
        <div className="flex items-start justify-between gap-3">
          <dt className="font-semibold uppercase tracking-[0.18em] text-slate-400">Time</dt>
          <dd className="text-right">{formatComplexity(algorithm.timeComplexity)}</dd>
        </div>
        <div className="flex items-start justify-between gap-3">
          <dt className="font-semibold uppercase tracking-[0.18em] text-slate-400">Space</dt>
          <dd>{algorithm.spaceComplexity}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {algorithm.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6">
        {isAvailable ? (
          <Link
            to={`/algorithm/${algorithm.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-200 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            Start Learning
            <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 opacity-90"
            aria-label={`${algorithm.title} is coming soon`}
          >
            Coming Soon
          </button>
        )}
      </div>
    </article>
  )
}

export default AlgorithmCard
