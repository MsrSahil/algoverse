import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const DashboardCTA = ({ continueSlug }) => {
  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-linear-to-r from-cyan-500/10 via-slate-900/60 to-emerald-500/10 p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Ready to master your next algorithm?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Keep practicing and turn difficult concepts into patterns you can understand.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/algorithms"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
          >
            Explore Algorithms
          </Link>
          <Link
            to={continueSlug ? `/algorithm/${continueSlug}` : '/algorithms'}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:shadow-lg hover:shadow-cyan-400/30"
          >
            Continue Learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default DashboardCTA
