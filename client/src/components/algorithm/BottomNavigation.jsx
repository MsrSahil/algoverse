import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinkClassName =
  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10'

const BottomNavigation = ({ previousAlgorithm, nextAlgorithm }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {previousAlgorithm ? (
          <Link to={`/algorithm/${previousAlgorithm.slug}`} className={navLinkClassName}>
            <ArrowLeft className="h-4 w-4" />
            {previousAlgorithm.title}
          </Link>
        ) : (
          <div />
        )}

        <Link to="/algorithms" className={navLinkClassName}>
          Back to Algorithms
        </Link>

        {nextAlgorithm ? (
          <Link to={`/algorithm/${nextAlgorithm.slug}`} className={navLinkClassName}>
            {nextAlgorithm.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  )
}

export default BottomNavigation
