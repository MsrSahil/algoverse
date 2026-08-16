import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const RecentActivity = ({ activity = [] }) => {
  return (
    <section aria-labelledby="recent-activity-title" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <h2 id="recent-activity-title" className="text-xl font-bold text-white sm:text-2xl">
        Recent Activity
      </h2>

      {activity.length === 0 ? (
        <div className="mt-5">
          <p className="text-sm text-slate-300">Your learning activity will appear here.</p>
          <Link
            to="/algorithms"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
          >
            Explore Algorithms
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <ol className="mt-5 space-y-4">
          {activity.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.periodLabel}</p>
                <Link to={`/algorithm/${item.slug}`} className="mt-1 block text-sm text-slate-100 hover:text-cyan-300">
                  {item.action}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default RecentActivity
