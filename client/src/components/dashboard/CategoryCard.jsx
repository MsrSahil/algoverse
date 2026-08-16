import { ArrowRight, Braces, Cable, Database, GitBranch, ListOrdered, Network, Search, Shuffle, TextCursorInput, Trees } from 'lucide-react'
import { Link } from 'react-router-dom'

const iconMap = {
  sorting: Shuffle,
  searching: Search,
  arrays: Database,
  strings: TextCursorInput,
  stack: ListOrdered,
  queue: Cable,
  linkedList: Braces,
  trees: Trees,
  graphs: Network,
  dp: GitBranch
}

const CategoryCard = ({ category }) => {
  const Icon = iconMap[category.icon] || Database

  return (
    <Link
      to={`/algorithms?category=${encodeURIComponent(category.id)}`}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      aria-label={`Open ${category.name} algorithms`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-xl bg-cyan-400/10 p-2.5 text-cyan-300 transition duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="h-4.5 w-4.5 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-cyan-300" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-white">{category.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{category.description}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {category.totalAlgorithms} Algorithms
      </p>
    </Link>
  )
}

export default CategoryCard
