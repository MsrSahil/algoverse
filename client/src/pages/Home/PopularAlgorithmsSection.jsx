import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const algorithms = [
  { name: 'Bubble Sort', category: 'Sorting', difficulty: 'Easy', time: '5 min' },
  { name: 'Merge Sort', category: 'Sorting', difficulty: 'Medium', time: '10 min' },
  { name: 'Quick Sort', category: 'Sorting', difficulty: 'Hard', time: '12 min' },
  { name: 'Binary Search', category: 'Searching', difficulty: 'Easy', time: '5 min' },
  { name: 'Depth-First Search', category: 'Graphs', difficulty: 'Medium', time: '8 min' },
  { name: 'Breadth-First Search', category: 'Graphs', difficulty: 'Medium', time: '8 min' }
]

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20'
    case 'Medium':
      return 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20'
    case 'Hard':
      return 'bg-red-400/10 text-red-300 border-red-400/20'
    default:
      return 'bg-slate-400/10 text-slate-300'
  }
}

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const PopularAlgorithmsSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Popular
            </p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">
              Most Viewed Algorithms
            </h2>
          </div>
          <Link to="/algorithms" className="group w-fit rounded-full border border-cyan-400/30 bg-cyan-400/5 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/60 hover:bg-cyan-400/15">
            View All
            <ArrowRight className="ml-2 inline h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {algorithms.map((algo, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400">{algo.category}</p>
                  <h3 className="mt-1 text-lg font-bold text-white">{algo.name}</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-2 group-hover:text-cyan-300" />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyColor(algo.difficulty)}`}>
                  {algo.difficulty}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  {algo.time}
                </span>
              </div>

              <Link
                to={`/algorithm/${toSlug(algo.name)}`}
                className="block w-full rounded-lg bg-cyan-400/10 py-2 text-center text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20 hover:text-cyan-200"
              >
                Learn Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularAlgorithmsSection
