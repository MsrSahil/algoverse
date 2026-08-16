import { ArrowRight, Shuffle, Search, Database, Link2, TreePine, Network, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  { icon: Shuffle, title: 'Sorting', count: '12 Algorithms' },
  { icon: Search, title: 'Searching', count: '8 Algorithms' },
  { icon: Database, title: 'Stack & Queue', count: '10 Algorithms' },
  { icon: Link2, title: 'Linked List', count: '15 Algorithms' },
  { icon: TreePine, title: 'Trees', count: '20 Algorithms' },
  { icon: Network, title: 'Graphs', count: '18 Algorithms' },
  { icon: Zap, title: 'Dynamic Programming', count: '25 Algorithms' },
  { icon: Search, title: 'Greedy', count: '12 Algorithms' }
]

const CategoriesSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Explore
          </p>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            All Algorithm Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, idx) => {
            const Icon = category.icon
            return (
              <Link
                to="/algorithms"
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 cursor-pointer"
              >
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-transparent to-purple-500/0 opacity-0 transition group-hover:opacity-10" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="mb-3 inline-flex rounded-xl bg-cyan-400/10 p-3 text-cyan-300 transition group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{category.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">{category.count}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-2 group-hover:text-cyan-300" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
